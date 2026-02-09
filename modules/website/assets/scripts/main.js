/**
 * Main JavaScript
 * Playbook Website
 */

(function() {
    'use strict';

    // ============================================
    // 滚动动画
    // ============================================
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('[data-scroll-animate]').forEach(el => observer.observe(el));
    }

    // ============================================
    // 涟漪效果
    // ============================================
    function initRippleEffect() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-ripple], .btn');
            if (!target) return;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const rect = target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            target.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // ============================================
    // 卡片倾斜效果
    // ============================================
    function initTiltEffect() {
        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            });
        });
    }

    // ============================================
    // 语言切换
    // ============================================
    function initLanguageSwitch() {
        const langBtn = document.querySelector('[data-lang-toggle]');
        if (!langBtn) return;

        langBtn.addEventListener('click', () => {
            document.body.classList.toggle('lang-cn');
            const isChinese = document.body.classList.contains('lang-cn');
            langBtn.textContent = isChinese ? 'EN' : '中';
            localStorage.setItem('lang', isChinese ? 'cn' : 'en');
        });

        // 恢复语言偏好
        if (localStorage.getItem('lang') === 'cn') {
            document.body.classList.add('lang-cn');
            if (langBtn) langBtn.textContent = 'EN';
        }
    }

    // ============================================
    // 页面切换 Glitch 效果
    // ============================================
    function initGlitchTransition() {
        document.querySelectorAll('a[href]').forEach(link => {
            if (link.hostname !== window.location.hostname) return;
            
            link.addEventListener('click', (e) => {
                if (e.ctrlKey || e.metaKey) return;
                e.preventDefault();
                
                document.body.classList.add('glitch-effect');
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            });
        });
    }

    // ============================================
    // 初始化
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initRippleEffect();
        initTiltEffect();
        initLanguageSwitch();
        initGlitchTransition();
        
        // 初始化环境效果
        if (typeof initAmbientEffects === 'function') {
            initAmbientEffects('medium');
        }
        
        console.log('Playbook Website initialized');
    });
})();
