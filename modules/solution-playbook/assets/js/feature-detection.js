/**
 * Feature Detection & Fallback Module
 * 特性检测与降级方案
 * 
 * 检测现代 CSS/JS API 支持性，提供优雅降级
 */

const FeatureDetection = (function() {
  'use strict';

  // 特性支持状态缓存
  const features = {
    scrollTimeline: null,
    viewTransitions: null,
    containerQueries: null,
    cssHas: null,
    webAnimationsAPI: null,
    intersectionObserver: null,
    resizeObserver: null,
    mutationObserver: null,
    lottie: null,
    webgl: null,
    touchEvents: null,
    hoverCapable: null
  };

  // 检测结果回调
  const callbacks = [];

  /**
   * 检测 CSS Scroll-Driven Animations 支持性
   * @returns {boolean}
   */
  function detectScrollTimeline() {
    if (features.scrollTimeline !== null) return features.scrollTimeline;
    
    try {
      // 方法1: 检测 CSS.supports
      if (typeof CSS !== 'undefined' && CSS.supports) {
        const supported = CSS.supports('animation-timeline', 'scroll()') ||
                         CSS.supports('animation-timeline', 'view()');
        if (supported) {
          features.scrollTimeline = true;
          return true;
        }
      }
      
      // 方法2: 创建测试元素
      const testEl = document.createElement('div');
      testEl.style.cssText = 'animation-timeline: scroll()';
      features.scrollTimeline = testEl.style.animationTimeline !== '';
      
    } catch (e) {
      features.scrollTimeline = false;
    }
    
    return features.scrollTimeline;
  }

  /**
   * 检测 View Transitions API 支持性
   * @returns {boolean}
   */
  function detectViewTransitions() {
    if (features.viewTransitions !== null) return features.viewTransitions;
    
    features.viewTransitions = 'startViewTransition' in document;
    return features.viewTransitions;
  }

  /**
   * 检测 Container Queries 支持性
   * @returns {boolean}
   */
  function detectContainerQueries() {
    if (features.containerQueries !== null) return features.containerQueries;
    
    try {
      features.containerQueries = CSS.supports('container-type', 'inline-size');
    } catch (e) {
      features.containerQueries = false;
    }
    
    return features.containerQueries;
  }

  /**
   * 检测 :has() 选择器支持性
   * @returns {boolean}
   */
  function detectCssHas() {
    if (features.cssHas !== null) return features.cssHas;
    
    try {
      document.querySelector(':has(*)');
      features.cssHas = true;
    } catch (e) {
      features.cssHas = false;
    }
    
    return features.cssHas;
  }

  /**
   * 检测 Web Animations API 支持性
   * @returns {boolean}
   */
  function detectWebAnimationsAPI() {
    if (features.webAnimationsAPI !== null) return features.webAnimationsAPI;
    
    features.webAnimationsAPI = 'animate' in Element.prototype;
    return features.webAnimationsAPI;
  }

  /**
   * 检测 Intersection Observer 支持性
   * @returns {boolean}
   */
  function detectIntersectionObserver() {
    if (features.intersectionObserver !== null) return features.intersectionObserver;
    
    features.intersectionObserver = 'IntersectionObserver' in window;
    return features.intersectionObserver;
  }

  /**
   * 检测 WebGL 支持性
   * @returns {boolean}
   */
  function detectWebGL() {
    if (features.webgl !== null) return features.webgl;
    
    try {
      const canvas = document.createElement('canvas');
      features.webgl = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      features.webgl = false;
    }
    
    return features.webgl;
  }

  /**
   * 检测触摸事件支持性
   * @returns {boolean}
   */
  function detectTouchEvents() {
    if (features.touchEvents !== null) return features.touchEvents;
    
    features.touchEvents = 'ontouchstart' in window ||
                          navigator.maxTouchPoints > 0 ||
                          navigator.msMaxTouchPoints > 0;
    return features.touchEvents;
  }

  /**
   * 检测是否支持 hover（非触摸设备）
   * @returns {boolean}
   */
  function detectHoverCapable() {
    if (features.hoverCapable !== null) return features.hoverCapable;
    
    features.hoverCapable = window.matchMedia('(hover: hover)').matches;
    return features.hoverCapable;
  }

  /**
   * 运行所有检测
   * @returns {Object} 所有特性支持状态
   */
  function detectAll() {
    detectScrollTimeline();
    detectViewTransitions();
    detectContainerQueries();
    detectCssHas();
    detectWebAnimationsAPI();
    detectIntersectionObserver();
    detectWebGL();
    detectTouchEvents();
    detectHoverCapable();
    
    return { ...features };
  }

  /**
   * 应用 Fallback 类到 body
   */
  function applyFallbackClasses() {
    const body = document.body;
    
    // 运行所有检测
    detectAll();
    
    // 添加特性类
    if (!features.scrollTimeline) {
      body.classList.add('no-scroll-timeline');
    }
    
    if (!features.viewTransitions) {
      body.classList.add('no-view-transitions');
    }
    
    if (!features.webgl) {
      body.classList.add('no-webgl');
    }
    
    if (features.touchEvents && !features.hoverCapable) {
      body.classList.add('touch-device');
    }
    
    if (!features.hoverCapable) {
      body.classList.add('no-hover');
    }
    
    // 标记检测完成
    body.classList.add('features-detected');
    
    // 触发回调
    callbacks.forEach(cb => cb(features));
  }

  /**
   * Scroll Animation Fallback - 使用 Intersection Observer
   */
  function initScrollAnimationFallback() {
    if (features.scrollTimeline) return; // 原生支持，无需 fallback
    
    if (!features.intersectionObserver) {
      // 如果连 Intersection Observer 都不支持，直接显示所有元素
      document.querySelectorAll('[data-scroll]').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 可选：只触发一次
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('[data-scroll]').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * View Transitions Fallback - 使用 CSS 过渡
   * @param {Function} updateCallback - 更新 DOM 的回调
   * @param {Object} options - 过渡选项
   */
  function viewTransitionFallback(updateCallback, options = {}) {
    const { duration = 300, easing = 'ease-out' } = options;
    
    // 如果支持原生 View Transitions
    if (features.viewTransitions) {
      return document.startViewTransition(updateCallback);
    }
    
    // Fallback: 使用 opacity 过渡
    const container = document.body;
    
    return new Promise((resolve) => {
      // 淡出
      container.style.transition = `opacity ${duration / 2}ms ${easing}`;
      container.style.opacity = '0';
      
      setTimeout(() => {
        // 执行更新
        updateCallback();
        
        // 淡入
        setTimeout(() => {
          container.style.opacity = '1';
          
          setTimeout(() => {
            container.style.transition = '';
            container.style.opacity = '';
            resolve();
          }, duration / 2);
        }, 50);
      }, duration / 2);
    });
  }

  /**
   * Lottie Fallback - 静态图标回退
   * @param {HTMLElement} container - Lottie 容器
   * @param {string} fallbackIcon - 回退图标 HTML
   * @param {number} timeout - 加载超时时间 (ms)
   */
  function lottieLoadFallback(container, fallbackIcon, timeout = 5000) {
    if (!container) return;
    
    // 设置超时检测
    const timeoutId = setTimeout(() => {
      if (!container.querySelector('svg[data-lottie-loaded]')) {
        console.warn('Lottie animation load timeout, applying fallback');
        applyLottieFallback(container, fallbackIcon);
      }
    }, timeout);
    
    // 监听 lottie 加载成功
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeName === 'svg') {
            node.setAttribute('data-lottie-loaded', 'true');
            clearTimeout(timeoutId);
            observer.disconnect();
            return;
          }
        }
      }
    });
    
    observer.observe(container, { childList: true, subtree: true });
    
    // 错误处理
    container.addEventListener('lottie-error', () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      applyLottieFallback(container, fallbackIcon);
    });
  }

  /**
   * 应用 Lottie 回退图标
   */
  function applyLottieFallback(container, fallbackIcon) {
    container.innerHTML = fallbackIcon;
    container.classList.add('lottie-fallback');
  }

  /**
   * 数字计数动画 Fallback
   * @param {HTMLElement} element - 目标元素
   * @param {number} targetValue - 目标数值
   * @param {number} duration - 动画时长 (ms)
   */
  function counterAnimationFallback(element, targetValue, duration = 1500) {
    if (!element) return;
    
    // 如果支持 Web Animations API，使用更流畅的动画
    if (features.webAnimationsAPI) {
      const startValue = 0;
      const startTime = performance.now();
      
      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用 easeOutExpo 缓动
        const eased = 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * eased);
        
        element.textContent = formatNumber(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = formatNumber(targetValue);
        }
      }
      
      requestAnimationFrame(animate);
    } else {
      // 简单 fallback: 直接显示最终值
      element.textContent = formatNumber(targetValue);
    }
  }

  /**
   * 格式化数字（添加千分位分隔符）
   */
  function formatNumber(num) {
    return num.toLocaleString();
  }

  /**
   * 页面导航增强 - 带过渡效果
   * @param {string} href - 目标 URL
   * @param {Object} options - 选项
   */
  function navigateWithTransition(href, options = {}) {
    const { transitionType = 'fade' } = options;
    const transition = document.getElementById('pageTransition');
    
    if (features.viewTransitions) {
      // 使用原生 View Transitions API
      document.startViewTransition(() => {
        window.location.href = href;
      });
    } else if (transition) {
      // Fallback: 使用现有的过渡覆盖层
      transition.classList.add('active');
      
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    } else {
      // 最终 fallback: 直接跳转
      window.location.href = href;
    }
  }

  /**
   * 粒子效果 Fallback - 移动端/低性能设备降级
   * @param {HTMLElement} container - 粒子容器
   * @param {Object} options - 配置选项
   */
  function particlesFallback(container, options = {}) {
    if (!container) return;
    
    const {
      maxParticles = 30,
      mobileMaxParticles = 10,
      disableOnLowPerf = true
    } = options;
    
    // 检测是否需要降级
    const isMobile = features.touchEvents && !features.hoverCapable;
    const actualMax = isMobile ? mobileMaxParticles : maxParticles;
    
    // 低性能检测
    if (disableOnLowPerf) {
      // 检测设备内存 (如果可用)
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        container.style.display = 'none';
        return;
      }
      
      // 检测硬件并发数
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        container.style.display = 'none';
        return;
      }
    }
    
    // 限制现有粒子数量
    const particles = container.querySelectorAll('.particle');
    if (particles.length > actualMax) {
      for (let i = actualMax; i < particles.length; i++) {
        particles[i].remove();
      }
    }
  }

  /**
   * 磁性按钮 Fallback - 触摸设备禁用
   * @param {HTMLElement} element - 磁性按钮元素
   */
  function magneticButtonFallback(element) {
    if (!element) return;
    
    // 触摸设备或无 hover 能力时禁用
    if (!features.hoverCapable || features.touchEvents) {
      element.removeAttribute('data-magnetic');
      element.style.transform = '';
    }
  }

  /**
   * 注册特性检测完成回调
   * @param {Function} callback - 回调函数
   */
  function onDetectionComplete(callback) {
    if (typeof callback === 'function') {
      if (document.body.classList.contains('features-detected')) {
        callback(features);
      } else {
        callbacks.push(callback);
      }
    }
  }

  /**
   * 初始化所有 Fallback
   */
  function initAllFallbacks() {
    applyFallbackClasses();
    initScrollAnimationFallback();
    
    // 初始化 Lottie fallback（如果有 lottie 元素）
    document.querySelectorAll('[data-lottie-fallback]').forEach(el => {
      const fallbackIcon = el.getAttribute('data-lottie-fallback');
      lottieLoadFallback(el, fallbackIcon);
    });
    
    // 初始化计数器
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (!isNaN(target)) {
        counterAnimationFallback(el, target);
      }
    });
    
    // 初始化粒子降级
    document.querySelectorAll('.particles-container').forEach(container => {
      particlesFallback(container);
    });
    
    // 初始化磁性按钮降级
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      magneticButtonFallback(el);
    });
  }

  /**
   * 获取特性报告
   * @returns {Object} 特性支持报告
   */
  function getFeatureReport() {
    detectAll();
    
    return {
      summary: {
        scrollTimeline: features.scrollTimeline ? '✓ 支持' : '✗ 不支持 (使用 Intersection Observer)',
        viewTransitions: features.viewTransitions ? '✓ 支持' : '✗ 不支持 (使用 CSS 过渡)',
        webgl: features.webgl ? '✓ 支持' : '✗ 不支持 (粒子效果降级)',
        touchDevice: features.touchEvents && !features.hoverCapable ? '是' : '否',
        hoverCapable: features.hoverCapable ? '是' : '否'
      },
      raw: { ...features },
      userAgent: navigator.userAgent
    };
  }

  // DOM Ready 时自动初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllFallbacks);
  } else {
    // 延迟执行以确保其他脚本加载
    setTimeout(initAllFallbacks, 0);
  }

  // 公开 API
  return {
    // 检测方法
    detectScrollTimeline,
    detectViewTransitions,
    detectContainerQueries,
    detectCssHas,
    detectWebAnimationsAPI,
    detectIntersectionObserver,
    detectWebGL,
    detectTouchEvents,
    detectHoverCapable,
    detectAll,
    
    // Fallback 方法
    initScrollAnimationFallback,
    viewTransitionFallback,
    lottieLoadFallback,
    counterAnimationFallback,
    navigateWithTransition,
    particlesFallback,
    magneticButtonFallback,
    
    // 工具方法
    applyFallbackClasses,
    onDetectionComplete,
    getFeatureReport,
    
    // 特性状态 (只读)
    get features() { return { ...features }; }
  };
})();

// 如果使用模块系统，导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FeatureDetection;
}
