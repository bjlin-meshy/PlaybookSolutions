/**
 * Scroll-Driven Animations
 * 滚动驱动动画初始化脚本
 * 支持 CSS Scroll-Driven Animations，并提供 JavaScript 回退方案
 */

(function() {
  'use strict';

  // 检查浏览器是否支持 animation-timeline
  const supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()');
  const supportsViewTimeline = CSS.supports('animation-timeline', 'view()');

  /**
   * 初始化滚动进度指示器
   */
  function initScrollProgress() {
    // 检查是否已存在进度条
    if (document.querySelector('.scroll-progress')) {
      return;
    }

    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // 如果不支持 CSS Scroll-Driven Animations，使用 JS 回退
    if (!supportsScrollTimeline) {
      function updateProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
      }

      // 使用 requestAnimationFrame 优化性能
      let ticking = false;
      function onScroll() {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateProgress();
            ticking = false;
          });
          ticking = true;
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      updateProgress(); // 初始更新
    }
  }

  /**
   * 初始化滚动淡入效果（回退方案）
   */
  function initScrollFadeIn() {
    // 如果支持 view() timeline，CSS 会自动处理，只需要添加类即可
    if (supportsViewTimeline) {
      // 为所有需要淡入的元素添加类
      const selectors = [
        '.workflow-step',
        '.workflow-step-mini',
        '.case-card',
        '.showcase-card',
        '.showcase-card-large',
        '.solution-item',
        '.case-grid > *',
        '.case-content',
        '.case-single',
        '.versus-container',
        '.versus-side'
      ];
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (!el.classList.contains('scroll-fade-in')) {
            el.classList.add('scroll-fade-in');
          }
        });
      });
      return;
    }

    // 回退方案：使用 Intersection Observer
    const fadeElements = document.querySelectorAll('.scroll-fade-in');
    if (fadeElements.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.5, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          // 一旦可见，可以停止观察以提升性能
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * 初始化视差效果
   */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.scroll-parallax-slow, .scroll-parallax-fast');
    if (parallaxElements.length === 0) return;

    let ticking = false;
    
    function updateParallax() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      document.documentElement.style.setProperty('--scroll-y', scrollY + 'px');
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax(); // 初始更新
  }

  /**
   * 主初始化函数
   */
  function initScrollEffects() {
    // 检查是否在减少动画模式下
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // 跳过所有滚动动画
    }

    initScrollProgress();
    initScrollFadeIn();
    initParallax();
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollEffects);
  } else {
    initScrollEffects();
  }

  // 页面可见性变化时重新初始化（处理 SPA 导航）
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(initScrollEffects, 100);
    }
  });
})();
