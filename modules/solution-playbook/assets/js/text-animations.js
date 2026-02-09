/**
 * Text Animations Library for Meshy Solution Playbook
 * Provides typewriter, fade-in, glow pulse, and split text animations
 */

const TextAnimations = {
  /**
   * Initialize all text animations
   */
  init() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.log('[TextAnimations] Reduced motion detected, animations disabled');
      return;
    }

    this.initTypewriter();
    this.initFadeIn();
    this.initGlowPulse();
    this.initSplitText();
    
    console.log('[TextAnimations] Initialized');
  },

  /**
   * Typewriter effect for main title (h1)
   * Characters appear one by one with blinking cursor
   */
  initTypewriter() {
    const h1Elements = document.querySelectorAll('h1');
    
    h1Elements.forEach((h1) => {
      const originalText = h1.textContent.trim();
      const speed = 80; // ms per character
      
      // Clear the element
      h1.textContent = '';
      h1.classList.add('typewriter-text');
      
      let index = 0;
      
      const typeChar = () => {
        if (index < originalText.length) {
          h1.textContent += originalText[index];
          index++;
          setTimeout(typeChar, speed);
        } else {
          // Animation complete
          h1.classList.add('complete');
        }
      };
      
      // Start typing after a short delay
      setTimeout(() => {
        typeChar();
      }, 300);
    });
  },

  /**
   * Fade-in animation for subtitle and credits
   * Staggered fade-in from bottom with upward motion
   */
  initFadeIn() {
    // Find subtitle (usually h2 or .subtitle)
    const subtitle = document.querySelector('h2, .subtitle');
    if (subtitle) {
      subtitle.classList.add('fade-in-text', 'subtitle');
    }
    
    // Find credits (usually .credits or footer text)
    const credits = document.querySelector('.credits, footer p');
    if (credits) {
      credits.classList.add('fade-in-text', 'credits');
    }
  },

  /**
   * Glow pulse effect on hover for headings
   */
  initGlowPulse() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headings.forEach((heading) => {
      heading.classList.add('text-glow-pulse');
    });
  },

  /**
   * Split text animation for elements with .animate-text class
   * Each letter animates separately (scale + fade)
   */
  initSplitText() {
    const animateElements = document.querySelectorAll('.animate-text');
    
    animateElements.forEach((element) => {
      const text = element.textContent.trim();
      const chars = text.split('');
      
      // Clear and wrap each character
      element.textContent = '';
      element.classList.add('animate-text');
      
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
        
        if (char === ' ') {
          span.classList.add('space');
        }
        
        element.appendChild(span);
      });
      
      // Trigger animation
      requestAnimationFrame(() => {
        element.classList.add('animate');
      });
    });
  }
};

// Auto-initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    TextAnimations.init();
  });
} else {
  // DOM already loaded
  TextAnimations.init();
}
