// ============================================
// ADVANCED INTERACTIONS - JavaScript
// ============================================

const AdvancedInteractions = {
  glowCanvas: null,
  glowCtx: null,
  glowX: 0,
  glowY: 0,
  targetGlowX: 0,
  targetGlowY: 0,
  magneticButtons: [],
  tiltCards: [],

  init() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.log('[AdvancedInteractions] Reduced motion detected, skipping animations');
      return;
    }

    this.initMagneticButtons();
    this.initGlowTracking();
    this.initPageTransitions();
    this.initEnhancedTilt();
    this.initEnhancedRipple();
    console.log('[AdvancedInteractions] Initialized');
  },

  // 1. Magnetic Button Effect
  initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn, .industry-item');
    this.magneticButtons = Array.from(buttons);

    buttons.forEach(btn => {
      btn.style.willChange = 'transform';
      btn.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const distanceX = mouseX - centerX;
        const distanceY = mouseY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Only activate within 100px
        if (distance < 100) {
          const strength = 1 - (distance / 100); // 0 to 1
          const maxDisplacement = 15;
          
          const moveX = (distanceX / distance) * maxDisplacement * strength;
          const moveY = (distanceY / distance) * maxDisplacement * strength;
          
          btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  },

  // 2. Mouse Glow Tracking
  initGlowTracking() {
    // Create canvas overlay
    this.glowCanvas = document.createElement('canvas');
    this.glowCanvas.id = 'mouse-glow-canvas';
    this.glowCanvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(this.glowCanvas);

    this.glowCtx = this.glowCanvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.targetGlowX = e.clientX;
      this.targetGlowY = e.clientY;
      this.glowCanvas.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      this.glowCanvas.style.opacity = '0';
    });

    // Smooth lerping animation
    this.animateGlow();
  },

  resizeCanvas() {
    this.glowCanvas.width = window.innerWidth;
    this.glowCanvas.height = window.innerHeight;
  },

  animateGlow() {
    // Lerp towards target position
    const lerpFactor = 0.1;
    this.glowX += (this.targetGlowX - this.glowX) * lerpFactor;
    this.glowY += (this.targetGlowY - this.glowY) * lerpFactor;

    // Clear canvas
    this.glowCtx.clearRect(0, 0, this.glowCanvas.width, this.glowCanvas.height);

    // Draw radial gradient
    const gradient = this.glowCtx.createRadialGradient(
      this.glowX, this.glowY, 0,
      this.glowX, this.glowY, 100
    );
    gradient.addColorStop(0, 'rgba(204, 255, 0, 0.15)');
    gradient.addColorStop(0.5, 'rgba(204, 255, 0, 0.08)');
    gradient.addColorStop(1, 'rgba(204, 255, 0, 0)');

    this.glowCtx.fillStyle = gradient;
    this.glowCtx.fillRect(0, 0, this.glowCanvas.width, this.glowCanvas.height);

    requestAnimationFrame(() => this.animateGlow());
  },

  // 3. Enhanced Page Transition
  initPageTransitions() {
    // Find all navigation links
    const links = document.querySelectorAll('a[onclick*="navigateTo"], a[href]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const onclick = link.getAttribute('onclick');
        
        // Skip if it's a hash link or no href
        if (href && href.startsWith('#')) return;
        if (!href && !onclick) return;

        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          z-index: 99999;
          opacity: 0;
          pointer-events: none;
        `;
        document.body.appendChild(overlay);

        // Add scanline effect
        const scanline = document.createElement('div');
        scanline.className = 'scanline';
        scanline.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(204, 255, 0, 0.8);
          box-shadow: 0 0 10px rgba(204, 255, 0, 0.5);
          animation: scanlineMove 0.3s linear;
        `;
        overlay.appendChild(scanline);

        // Add CSS animation if not exists
        if (!document.getElementById('scanline-style')) {
          const style = document.createElement('style');
          style.id = 'scanline-style';
          style.textContent = `
            @keyframes scanlineMove {
              0% { top: 0; opacity: 1; }
              100% { top: 100%; opacity: 0; }
            }
            @keyframes glitchFlash {
              0%, 100% { opacity: 0; }
              10%, 90% { opacity: 1; }
              20%, 80% { opacity: 0.3; }
              30%, 70% { opacity: 0.8; }
              40%, 60% { opacity: 0.1; }
              50% { opacity: 1; }
            }
          `;
          document.head.appendChild(style);
        }

        // Trigger glitch effect
        overlay.style.animation = 'glitchFlash 0.3s ease-out';
        overlay.style.opacity = '1';

        // Navigate after transition
        setTimeout(() => {
          if (onclick && onclick.includes('navigateTo')) {
            // Extract navigateTo call
            const match = onclick.match(/navigateTo\(['"]([^'"]+)['"]\)/);
            if (match) {
              window.location.href = match[1];
            }
          } else if (href) {
            window.location.href = href;
          }
        }, 300);
      });
    });
  },

  // 4. Enhanced Card 3D Tilt
  initEnhancedTilt() {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const cards = document.querySelectorAll('.industry-item, .case-card');
    this.tiltCards = Array.from(cards);

    cards.forEach(card => {
      card.style.willChange = 'transform';
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.1s ease-out';

      // Create shine element
      const shine = document.createElement('div');
      shine.className = 'card-shine';
      shine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          transparent 0%,
          rgba(255, 255, 255, 0.1) 45%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.1) 55%,
          transparent 100%
        );
        opacity: 0;
        pointer-events: none;
        transform: translateX(-100%) translateY(-100%) rotate(45deg);
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1;
      `;
      card.style.position = 'relative';
      card.appendChild(shine);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt
        const tiltX = ((centerY - y) / centerY) * 15;
        const tiltY = ((x - centerX) / centerX) * 15;

        card.style.setProperty('--tilt-x', `${Math.max(-15, Math.min(15, tiltX))}deg`);
        card.style.setProperty('--tilt-y', `${Math.max(-15, Math.min(15, tiltY))}deg`);
        card.style.transform = `perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))`;

        // Update shine position
        const shineX = (x / rect.width) * 100;
        const shineY = (y / rect.height) * 100;
        shine.style.transform = `translateX(${shineX - 50}%) translateY(${shineY - 50}%) rotate(45deg)`;
        shine.style.opacity = '1';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        shine.style.opacity = '0';
      });
    });
  },

  // 5. Enhanced Ripple Effect
  initEnhancedRipple() {
    const rippleElements = document.querySelectorAll('.industry-item, .case-card, .magnetic-btn, .btn');
    
    rippleElements.forEach(el => {
      el.style.position = 'relative';
      el.style.overflow = 'hidden';

      el.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create multiple ripples
        for (let i = 0; i < 3; i++) {
          const ripple = document.createElement('div');
          ripple.className = 'enhanced-ripple';
          ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(204, 255, 0, 0.4);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
            animation: enhancedRipple ${0.8 + i * 0.2}s ease-out;
            z-index: 10;
          `;
          this.appendChild(ripple);

          setTimeout(() => {
            ripple.remove();
          }, 1000 + i * 200);
        }
      });
    });

    // Add animation if not exists
    if (!document.getElementById('enhanced-ripple-style')) {
      const style = document.createElement('style');
      style.id = 'enhanced-ripple-style';
      style.textContent = `
        @keyframes enhancedRipple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AdvancedInteractions.init());
} else {
  AdvancedInteractions.init();
}
