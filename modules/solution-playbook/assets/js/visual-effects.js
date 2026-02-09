/**
 * Visual Effects Library for Meshy Solution Playbook
 * 提供统一的视觉效果脚本
 */

const VisualEffects = {
  // 初始化所有效果
  init() {
    this.initCursor();
    this.initParallax();
    this.initMicrointeractions();
    this.initScrollAnimations();
    console.log('[VisualEffects] Initialized');
  },

  // 自定义光标效果
  initCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;

      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      cursorFollower.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // 磁性按钮效果
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  },

  // 视差效果
  initParallax() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  },

  // 微交互
  initMicrointeractions() {
    // Ripple effect for buttons
    document.querySelectorAll('.btn, [data-ripple]').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Card tilt effect
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // Number counter animation
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.counter);
      const duration = 2000;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let start = 0;
            const step = target / (duration / 16);
            const counter = setInterval(() => {
              start += step;
              if (start >= target) {
                el.textContent = target;
                clearInterval(counter);
              } else {
                el.textContent = Math.floor(start);
              }
            }, 16);
            observer.unobserve(el);
          }
        });
      });
      observer.observe(el);
    });
  },

  // 滚动动画
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-scroll-animate]').forEach(el => {
      observer.observe(el);
    });
  },

  // 粒子背景
  createParticles(container, count = 50) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.setProperty('--x', Math.random());
      particle.style.setProperty('--y', Math.random());
      particle.style.setProperty('--duration', (3 + Math.random() * 4) + 's');
      particle.style.setProperty('--delay', (Math.random() * 2) + 's');
      particleContainer.appendChild(particle);
    }
    
    container.appendChild(particleContainer);
  }
};

// Auto-init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  VisualEffects.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VisualEffects;
}
