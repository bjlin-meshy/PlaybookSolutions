/**
 * Mobile Effects - Agent 11
 * 移动端适配脚本
 * 
 * 功能:
 * 1. 触摸手势检测 (swipe 切换页面)
 * 2. 设备能力检测
 * 3. 移动端性能优化
 * 4. 触摸反馈增强
 */

(function() {
    'use strict';

    // ============================================
    // 设备能力检测
    // ============================================
    
    const MobileDetect = {
        // 是否为触摸设备
        isTouchDevice: function() {
            return ('ontouchstart' in window) || 
                   (navigator.maxTouchPoints > 0) || 
                   (navigator.msMaxTouchPoints > 0);
        },
        
        // 是否支持 hover
        supportsHover: function() {
            return window.matchMedia('(hover: hover)').matches;
        },
        
        // 是否为粗指针 (手指而非鼠标)
        isCoarsePointer: function() {
            return window.matchMedia('(pointer: coarse)').matches;
        },
        
        // 是否为移动设备
        isMobile: function() {
            return this.isTouchDevice() && this.isCoarsePointer();
        },
        
        // 是否为 iOS
        isIOS: function() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        },
        
        // 是否为 Android
        isAndroid: function() {
            return /Android/.test(navigator.userAgent);
        },
        
        // 获取设备像素比
        getPixelRatio: function() {
            return window.devicePixelRatio || 1;
        },
        
        // 是否偏好减少动画
        prefersReducedMotion: function() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    };

    // ============================================
    // 触摸手势处理
    // ============================================
    
    const TouchGestures = {
        // 配置
        config: {
            swipeThreshold: 50,      // 滑动触发阈值 (px)
            swipeVelocity: 0.3,      // 滑动速度阈值 (px/ms)
            tapTimeout: 300,          // 点击超时 (ms)
            holdTimeout: 500,         // 长按超时 (ms)
        },
        
        // 状态
        state: {
            touchStartX: 0,
            touchStartY: 0,
            touchStartTime: 0,
            isSwiping: false,
            swipeDirection: null,
        },
        
        // 回调函数
        callbacks: {
            onSwipeLeft: null,
            onSwipeRight: null,
            onSwipeUp: null,
            onSwipeDown: null,
        },
        
        // 初始化
        init: function(callbacks) {
            if (!MobileDetect.isTouchDevice()) return;
            
            Object.assign(this.callbacks, callbacks);
            this.bindEvents();
            this.createSwipeHint();
        },
        
        // 绑定事件
        bindEvents: function() {
            const self = this;
            
            document.addEventListener('touchstart', function(e) {
                self.handleTouchStart(e);
            }, { passive: true });
            
            document.addEventListener('touchmove', function(e) {
                self.handleTouchMove(e);
            }, { passive: true });
            
            document.addEventListener('touchend', function(e) {
                self.handleTouchEnd(e);
            }, { passive: true });
        },
        
        // 处理触摸开始
        handleTouchStart: function(e) {
            const touch = e.touches[0];
            this.state.touchStartX = touch.clientX;
            this.state.touchStartY = touch.clientY;
            this.state.touchStartTime = Date.now();
            this.state.isSwiping = false;
            this.state.swipeDirection = null;
        },
        
        // 处理触摸移动
        handleTouchMove: function(e) {
            if (!this.state.touchStartX || !this.state.touchStartY) return;
            
            const touch = e.touches[0];
            const diffX = touch.clientX - this.state.touchStartX;
            const diffY = touch.clientY - this.state.touchStartY;
            
            // 更新滑动进度条
            this.updateSwipeProgress(Math.abs(diffX));
            
            // 检测主要滑动方向
            if (Math.abs(diffX) > Math.abs(diffY)) {
                this.state.swipeDirection = diffX > 0 ? 'right' : 'left';
            } else {
                this.state.swipeDirection = diffY > 0 ? 'down' : 'up';
            }
            
            if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
                this.state.isSwiping = true;
            }
        },
        
        // 处理触摸结束
        handleTouchEnd: function(e) {
            const touch = e.changedTouches[0];
            const diffX = touch.clientX - this.state.touchStartX;
            const diffY = touch.clientY - this.state.touchStartY;
            const duration = Date.now() - this.state.touchStartTime;
            const velocity = Math.abs(diffX) / duration;
            
            // 重置进度条
            this.resetSwipeProgress();
            
            // 检查是否达到滑动阈值
            if (Math.abs(diffX) > this.config.swipeThreshold && 
                velocity > this.config.swipeVelocity) {
                
                if (diffX > 0 && this.callbacks.onSwipeRight) {
                    this.callbacks.onSwipeRight();
                } else if (diffX < 0 && this.callbacks.onSwipeLeft) {
                    this.callbacks.onSwipeLeft();
                }
            }
            
            if (Math.abs(diffY) > this.config.swipeThreshold && 
                velocity > this.config.swipeVelocity) {
                
                if (diffY > 0 && this.callbacks.onSwipeDown) {
                    this.callbacks.onSwipeDown();
                } else if (diffY < 0 && this.callbacks.onSwipeUp) {
                    this.callbacks.onSwipeUp();
                }
            }
            
            // 重置状态
            this.state.touchStartX = 0;
            this.state.touchStartY = 0;
            this.state.isSwiping = false;
        },
        
        // 创建滑动提示
        createSwipeHint: function() {
            if (document.querySelector('.swipe-hint')) return;
            
            const hint = document.createElement('div');
            hint.className = 'swipe-hint';
            hint.innerHTML = '<i class="fa-solid fa-hand-pointer"></i><span class="cn">左右滑动导航</span><span class="en">Swipe to navigate</span>';
            document.body.appendChild(hint);
            
            // 首次显示提示
            setTimeout(function() {
                hint.classList.add('visible');
                setTimeout(function() {
                    hint.classList.remove('visible');
                }, 3000);
            }, 1000);
        },
        
        // 创建滑动进度条
        createSwipeProgress: function() {
            if (document.querySelector('.swipe-progress')) return;
            
            const progress = document.createElement('div');
            progress.className = 'swipe-progress';
            progress.innerHTML = '<div class="swipe-progress-bar"></div>';
            document.body.appendChild(progress);
        },
        
        // 更新滑动进度
        updateSwipeProgress: function(distance) {
            const progressBar = document.querySelector('.swipe-progress-bar');
            if (!progressBar) return;
            
            const progress = Math.min(distance / this.config.swipeThreshold * 100, 100);
            progressBar.style.width = progress + '%';
        },
        
        // 重置滑动进度
        resetSwipeProgress: function() {
            const progressBar = document.querySelector('.swipe-progress-bar');
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        }
    };

    // ============================================
    // 页面导航增强
    // ============================================
    
    const PageNavigation = {
        // 获取可导航的链接
        getNavigableLinks: function() {
            return Array.from(document.querySelectorAll('.industry-item, .solution-item'));
        },
        
        // 获取返回链接
        getBackLink: function() {
            return document.querySelector('.control-back .btn[href], .btn[href*="index"], .btn[href*=".."]');
        },
        
        // 导航到下一页 (滑动左)
        navigateNext: function() {
            const links = this.getNavigableLinks();
            if (links.length > 0) {
                // 模拟点击第一个链接
                const firstLink = links[0];
                if (firstLink && typeof window.navigateTo === 'function') {
                    window.navigateTo(new Event('click'), firstLink);
                } else if (firstLink) {
                    firstLink.click();
                }
            }
        },
        
        // 导航到上一页 (滑动右)
        navigateBack: function() {
            const backLink = this.getBackLink();
            if (backLink) {
                if (typeof window.navigateTo === 'function') {
                    window.navigateTo(new Event('click'), backLink);
                } else {
                    backLink.click();
                }
            }
        }
    };

    // ============================================
    // 性能优化
    // ============================================
    
    const PerformanceOptimizer = {
        init: function() {
            if (!MobileDetect.isMobile()) return;
            
            this.disableHeavyAnimations();
            this.optimizeScrolling();
            this.optimizeImages();
        },
        
        // 禁用重度动画
        disableHeavyAnimations: function() {
            if (MobileDetect.prefersReducedMotion()) {
                document.body.classList.add('reduced-motion');
            }
            
            // 为触摸设备添加标识类
            if (MobileDetect.isCoarsePointer()) {
                document.body.classList.add('touch-device');
            }
            
            // iOS 特定优化
            if (MobileDetect.isIOS()) {
                document.body.classList.add('ios-device');
            }
            
            // Android 特定优化
            if (MobileDetect.isAndroid()) {
                document.body.classList.add('android-device');
            }
        },
        
        // 优化滚动
        optimizeScrolling: function() {
            // 禁用弹性滚动在固定布局页面
            if (document.body.style.overflow === 'hidden') {
                document.addEventListener('touchmove', function(e) {
                    if (e.target.closest('.scroll-container')) return;
                    // 允许默认行为以保持页面交互
                }, { passive: true });
            }
        },
        
        // 优化图片加载
        optimizeImages: function() {
            // 延迟加载非关键图片
            const images = document.querySelectorAll('img[data-src]');
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    });
                });
                
                images.forEach(function(img) {
                    imageObserver.observe(img);
                });
            }
        }
    };

    // ============================================
    // 触觉反馈 (如果设备支持)
    // ============================================
    
    const HapticFeedback = {
        // 检查是否支持振动
        isSupported: function() {
            return 'vibrate' in navigator;
        },
        
        // 轻触反馈
        light: function() {
            if (this.isSupported()) {
                navigator.vibrate(10);
            }
        },
        
        // 中等反馈
        medium: function() {
            if (this.isSupported()) {
                navigator.vibrate(20);
            }
        },
        
        // 重度反馈
        heavy: function() {
            if (this.isSupported()) {
                navigator.vibrate(30);
            }
        },
        
        // 成功反馈
        success: function() {
            if (this.isSupported()) {
                navigator.vibrate([10, 50, 10]);
            }
        }
    };

    // ============================================
    // 初始化
    // ============================================
    
    function init() {
        // 性能优化
        PerformanceOptimizer.init();
        
        // 触摸手势
        TouchGestures.init({
            onSwipeLeft: function() {
                HapticFeedback.light();
                // 可以在这里添加页面切换逻辑
                // PageNavigation.navigateNext();
            },
            onSwipeRight: function() {
                HapticFeedback.light();
                PageNavigation.navigateBack();
            }
        });
        
        // 创建滑动进度条
        if (MobileDetect.isMobile()) {
            TouchGestures.createSwipeProgress();
        }
        
        // 为按钮添加触觉反馈
        document.querySelectorAll('.btn, .industry-item, .solution-item').forEach(function(el) {
            el.addEventListener('touchstart', function() {
                HapticFeedback.light();
            }, { passive: true });
        });
        
        // 调试信息 (开发时使用)
        if (window.location.search.includes('debug=mobile')) {
            console.log('Mobile Detection:', {
                isTouchDevice: MobileDetect.isTouchDevice(),
                supportsHover: MobileDetect.supportsHover(),
                isCoarsePointer: MobileDetect.isCoarsePointer(),
                isMobile: MobileDetect.isMobile(),
                isIOS: MobileDetect.isIOS(),
                isAndroid: MobileDetect.isAndroid(),
                pixelRatio: MobileDetect.getPixelRatio(),
                prefersReducedMotion: MobileDetect.prefersReducedMotion()
            });
        }
    }

    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 导出到全局 (可选)
    window.MobileEffects = {
        detect: MobileDetect,
        gestures: TouchGestures,
        navigation: PageNavigation,
        haptic: HapticFeedback,
        optimizer: PerformanceOptimizer
    };

})();
