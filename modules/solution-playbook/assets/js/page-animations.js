/**
 * Page Animations - Dynamic Background Effects Controller
 * Handles ambient animations, particle systems, and micro-interactions
 */

const PageAnimations = {
  initialized: false,
  particles: [],
  blobs: [],
  glowElements: [],
  
  /**
   * Initialize all page animations
   */
  init() {
    if (this.initialized) return;
    
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('[PageAnimations] Reduced motion detected, minimal animations');
      this.initMinimal();
      return;
    }
    
    this.detectTheme();
    this.createBackgroundElements();
    this.initMagneticButtons();
    this.initCardEffects();
    this.initScrollReveal();
    this.initMouseGlow();
    
    this.initialized = true;
    console.log('[PageAnimations] Initialized');
  },
  
  /**
   * Minimal initialization for reduced motion
   */
  initMinimal() {
    // Just ensure elements are visible without animations
    document.querySelectorAll('.scroll-reveal-up, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    this.initialized = true;
  },
  
  /**
   * Detect and apply theme from data attribute or page content
   */
  detectTheme() {
    // Check for existing theme
    if (document.documentElement.dataset.theme) return;
    
    // Auto-detect from URL or content
    const path = window.location.pathname.toLowerCase();
    let theme = 'default';
    
    if (path.includes('gaming')) theme = 'gaming';
    else if (path.includes('film')) theme = 'film';
    else if (path.includes('3dprinting') || path.includes('printing')) theme = '3dprinting';
    else if (path.includes('interior')) theme = 'interior';
    else if (path.includes('manufacturing')) theme = 'manufacturing';
    
    if (theme !== 'default') {
      document.documentElement.dataset.theme = theme;
    }
  },
  
  /**
   * Create dynamic background elements
   */
  createBackgroundElements() {
    // Find or create background container
    let bgContainer = document.querySelector('.theme-background');
    if (!bgContainer) {
      bgContainer = document.createElement('div');
      bgContainer.className = 'theme-background bg-gradient-flow';
      document.body.insertBefore(bgContainer, document.body.firstChild);
    }
    
    // Create floating blobs
    this.createBlobs(bgContainer);
    
    // Create glow pulses
    this.createGlowPulses(bgContainer);
    
    // Create particles
    this.createParticles(bgContainer);
    
    // Create grain overlay
    this.createGrainOverlay(bgContainer);
  },
  
  /**
   * Create morphing blob elements
   */
  createBlobs(container) {
    const blobCount = 3;
    
    for (let i = 1; i <= blobCount; i++) {
      const blob = document.createElement('div');
      blob.className = `floating-blob floating-blob-${i}`;
      container.appendChild(blob);
      this.blobs.push(blob);
    }
  },
  
  /**
   * Create corner glow pulse elements
   */
  createGlowPulses(container) {
    const positions = ['corner-tl', 'corner-br'];
    
    positions.forEach(pos => {
      const glow = document.createElement('div');
      glow.className = `glow-pulse glow-pulse-${pos}`;
      container.appendChild(glow);
      this.glowElements.push(glow);
    });
  },
  
  /**
   * Create floating particle elements
   */
  createParticles(container) {
    const particleCount = this.isMobile() ? 15 : 30;
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle' + (Math.random() > 0.5 ? ' glow' : '');
      
      // Random properties
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * 15;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.4 + 0.2;
      
      particle.style.cssText = `
        --particle-size: ${size}px;
        --particle-duration: ${duration}s;
        --particle-delay: -${delay}s;
        --particle-opacity: ${opacity};
        left: ${left}%;
        color: var(--theme-primary, #CCFF00);
        background: currentColor;
      `;
      
      particleContainer.appendChild(particle);
      this.particles.push(particle);
    }
    
    container.appendChild(particleContainer);
  },
  
  /**
   * Create grain overlay
   */
  createGrainOverlay(container) {
    const grain = document.createElement('div');
    grain.className = 'grain-overlay';
    container.appendChild(grain);
  },
  
  /**
   * Initialize magnetic button effect
   */
  initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic-btn, .btn-magnetic, [data-magnetic]');
    
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
        el.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
          el.style.transition = '';
        }, 300);
      });
    });
  },
  
  /**
   * Initialize card hover effects
   */
  initCardEffects() {
    // Add shine effect to cards
    const cards = document.querySelectorAll('.solution-item, .case-card, .showcase-card, [data-card-effect]');
    
    cards.forEach(card => {
      if (!card.classList.contains('card-shine')) {
        card.classList.add('card-shine', 'card-lift');
      }
    });
    
    // Add icon hover effect
    const icons = document.querySelectorAll('.solution-item i, .case-card i, [data-icon-effect]');
    
    icons.forEach(icon => {
      if (!icon.classList.contains('icon-hover-bounce')) {
        icon.classList.add('icon-hover-bounce');
      }
    });
  },
  
  /**
   * Initialize scroll reveal for browsers without native support
   */
  initScrollReveal() {
    // Check for native scroll-driven animation support
    if (CSS.supports('animation-timeline', 'view()')) {
      return; // Native support, CSS handles it
    }
    
    // Fallback with IntersectionObserver
    const revealElements = document.querySelectorAll(
      '.scroll-reveal-up, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );
    
    if (revealElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
      // Set initial hidden state
      el.style.opacity = '0';
      if (el.classList.contains('scroll-reveal-up')) el.style.transform = 'translateY(40px)';
      if (el.classList.contains('scroll-reveal-left')) el.style.transform = 'translateX(-40px)';
      if (el.classList.contains('scroll-reveal-right')) el.style.transform = 'translateX(40px)';
      if (el.classList.contains('scroll-reveal-scale')) el.style.transform = 'scale(0.9)';
      
      observer.observe(el);
    });
    
    // Add revealed state styles
    const style = document.createElement('style');
    style.textContent = `
      .scroll-reveal-up.revealed,
      .scroll-reveal-left.revealed,
      .scroll-reveal-right.revealed,
      .scroll-reveal-scale.revealed {
        opacity: 1 !important;
        transform: none !important;
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
    `;
    document.head.appendChild(style);
  },
  
  /**
   * Initialize mouse glow effect
   */
  initMouseGlow() {
    // Only on desktop
    if (this.isMobile()) return;
    
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--theme-glow, rgba(204,255,0,0.15)) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
    
    // Smooth follow with lerp
    const animate = () => {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animate);
    };
    animate();
  },
  
  /**
   * Check if device is mobile
   */
  isMobile() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  },
  
  /**
   * Cleanup animations (call on page unload if needed)
   */
  destroy() {
    this.particles.forEach(p => p.remove());
    this.blobs.forEach(b => b.remove());
    this.glowElements.forEach(g => g.remove());
    this.particles = [];
    this.blobs = [];
    this.glowElements = [];
    this.initialized = false;
  }
};

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PageAnimations.init());
} else {
  PageAnimations.init();
}

// Pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
  const bgContainer = document.querySelector('.theme-background');
  if (bgContainer) {
    bgContainer.style.animationPlayState = document.hidden ? 'paused' : 'running';
  }
});

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PageAnimations;
}
