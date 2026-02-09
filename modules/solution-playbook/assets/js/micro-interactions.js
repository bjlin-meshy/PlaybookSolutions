// ============================================
// MICRO INTERACTIONS - JavaScript
// ============================================

const MicroInteractions = {
  // Ripple 效果
  initRipple() {
    document.querySelectorAll('.micro-ripple, .btn').forEach(el => {
      el.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--ripple-x', x + 'px');
        this.style.setProperty('--ripple-y', y + 'px');
        this.style.setProperty('--ripple-size', size * 2 + 'px');
        
        this.classList.remove('rippling');
        void this.offsetWidth;
        this.classList.add('rippling');
        
        setTimeout(() => {
          this.classList.remove('rippling');
        }, 600);
      });
    });
  },

  // Tilt 效果
  initTilt() {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    document.querySelectorAll('.micro-tilt, .industry-item, .case-card, .solution-item, .showcase-card, .showcase-card-large').forEach(el => {
      el.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = Math.max(-10, Math.min(10, (centerY - y) / 10));
        const tiltY = Math.max(-10, Math.min(10, (x - centerX) / 10));
        
        this.style.setProperty('--tilt-x', tiltX + 'deg');
        this.style.setProperty('--tilt-y', tiltY + 'deg');
      });
      
      el.addEventListener('mouseleave', function() {
        this.style.setProperty('--tilt-x', '0deg');
        this.style.setProperty('--tilt-y', '0deg');
      });
    });
  },

  // 数字计数动画
  initCounter() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.micro-counter, [data-count]').forEach(el => {
        const target = parseInt(el.dataset.count || el.textContent.replace(/[^\d]/g, ''));
        if (!isNaN(target)) {
          el.textContent = target;
        }
      });
      return;
    }

    const counters = document.querySelectorAll('.micro-counter, [data-count]');
    
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetText = el.dataset.count || el.textContent;
          const target = parseInt(targetText.replace(/[^\d]/g, ''));
          
          if (!isNaN(target) && target > 0) {
            this.animateCount(el, target, targetText);
            observer.unobserve(el);
          }
        }
      });
    }, { 
      threshold: 0.5,
      rootMargin: '50px'
    });
    
    counters.forEach(el => {
      if (!el.dataset.originalText) {
        el.dataset.originalText = el.textContent;
      }
      observer.observe(el);
    });
  },

  animateCount(el, target, originalText) {
    let current = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      current = Math.round(target * easeOutCubic);
      
      if (originalText && /[^\d]/.test(originalText)) {
        el.textContent = originalText.replace(/\d+/, current);
      } else {
        el.textContent = current;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (originalText && /[^\d]/.test(originalText)) {
          el.textContent = originalText.replace(/\d+/, target);
        } else {
          el.textContent = target;
        }
      }
    };
    
    requestAnimationFrame(animate);
  },

  init() {
    this.initRipple();
    this.initTilt();
    this.initCounter();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MicroInteractions.init());
} else {
  MicroInteractions.init();
}
