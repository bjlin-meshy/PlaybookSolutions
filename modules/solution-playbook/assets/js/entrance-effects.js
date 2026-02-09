/**
 * Entrance Effects - GSAP-powered entrance animations
 * Agent 3 - Meshy Solution Playbook
 */

const EntranceEffects = {
  /**
   * Initialize all entrance animations
   */
  init() {
    if (typeof gsap === 'undefined') {
      console.warn('[EntranceEffects] GSAP not loaded, using CSS fallback');
      return this.initCSSFallback();
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Run animations when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.runAnimations();
      });
    } else {
      this.runAnimations();
    }
    
    console.log('[EntranceEffects] Initialized with GSAP');
  },

  /**
   * Run all animation methods
   */
  runAnimations() {
    this.heroAnimation();
    this.cardStagger();
    this.scrollReveal();
    this.counterAnimation();
  },

  /**
   * Hero section animation on page load
   * - Icon: Scale from 0 + rotate 360deg
   * - Title: Fade up with slight bounce
   * - Subtitle: Fade up (delayed 0.3s)
   * - Credits: Fade up (delayed 0.5s)
   */
  heroAnimation() {
    const hero = document.querySelector('.hero-section, .hero, [class*="hero"]');
    if (!hero) return;

    const icon = hero.querySelector('.hero-icon, .icon, [class*="icon"]');
    const title = hero.querySelector('h1, .hero-title, [class*="title"]');
    const subtitle = hero.querySelector('.subtitle, p, [class*="subtitle"]');
    const credits = hero.querySelector('.credits, [class*="credit"]');

    // Icon animation: scale from 0 + rotate 360deg
    if (icon) {
      gsap.fromTo(icon, 
        { 
          scale: 0, 
          rotation: 0,
          opacity: 0 
        },
        { 
          scale: 1, 
          rotation: 360,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }
      );
    }

    // Title animation: fade up with bounce
    if (title) {
      gsap.fromTo(title,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'back.out(1.2)'
        }
      );
    }

    // Subtitle animation: fade up (delayed 0.3s)
    if (subtitle) {
      gsap.fromTo(subtitle,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'power2.out'
        }
      );
    }

    // Credits animation: fade up (delayed 0.5s)
    if (credits) {
      gsap.fromTo(credits,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.7,
          ease: 'power2.out'
        }
      );
    }
  },

  /**
   * Industry cards stagger animation
   * Cards fly in from bottom with stagger
   * Each card: scale(0.8) + translateY(50px) → normal
   * Stagger delay: 0.1s between cards
   */
  cardStagger() {
    // Use correct selectors for this project's HTML structure
    const cardContainer = document.querySelector('.industries-list, .industry-cards, .cards-grid');
    if (!cardContainer) return;

    // Query for .industry-item or .entrance-card elements
    const cards = cardContainer.querySelectorAll('.industry-item, .entrance-card, .card');
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      {
        scale: 0.8,
        y: 50,
        opacity: 0
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardContainer,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  },

  /**
   * Scroll-triggered animations for elements with .scroll-reveal class
   * Animate when 20% visible
   * Effects: fade-up, fade-left, fade-right, zoom-in
   */
  scrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length === 0) return;

    revealElements.forEach(element => {
      // Determine animation type from data attribute or class
      const animationType = element.dataset.animation || 
                           (element.classList.contains('fade-left') ? 'fade-left' :
                            element.classList.contains('fade-right') ? 'fade-right' :
                            element.classList.contains('zoom-in') ? 'zoom-in' : 'fade-up');

      let fromVars = { opacity: 0 };
      let toVars = { opacity: 1, duration: 0.8, ease: 'power2.out' };

      switch (animationType) {
        case 'fade-left':
          fromVars.x = -50;
          toVars.x = 0;
          break;
        case 'fade-right':
          fromVars.x = 50;
          toVars.x = 0;
          break;
        case 'zoom-in':
          fromVars.scale = 0.8;
          toVars.scale = 1;
          break;
        case 'fade-up':
        default:
          fromVars.y = 30;
          toVars.y = 0;
          break;
      }

      gsap.fromTo(element, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  },

  /**
   * Number counter animation
   * For elements with [data-count] attribute
   * Count from 0 to target number
   * Duration: 1.5s with ease-out
   */
  counterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    counters.forEach(counter => {
      const targetValue = parseFloat(counter.dataset.count);
      if (isNaN(targetValue)) return;

      const obj = { value: 0 };
      
      gsap.to(obj, {
        value: targetValue,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          // Format number (handle decimals if needed)
          const decimals = counter.dataset.decimals || 0;
          const formatted = decimals > 0 
            ? obj.value.toFixed(decimals)
            : Math.floor(obj.value);
          
          // Check if element has a suffix/prefix
          const suffix = counter.dataset.suffix || '';
          const prefix = counter.dataset.prefix || '';
          
          counter.textContent = prefix + formatted + suffix;
        }
      });
    });
  },

  /**
   * CSS fallback for browsers without GSAP
   */
  initCSSFallback() {
    const elements = document.querySelectorAll('.hero-section, .hero, [class*="hero"]');
    elements.forEach(el => {
      const icon = el.querySelector('.hero-icon, .icon, [class*="icon"]');
      const title = el.querySelector('h1, .hero-title, [class*="title"]');
      const subtitle = el.querySelector('.subtitle, p, [class*="subtitle"]');
      const credits = el.querySelector('.credits, [class*="credit"]');

      if (icon) icon.classList.add('entrance-scale-rotate');
      if (title) title.classList.add('entrance-fade-up');
      if (subtitle) subtitle.classList.add('entrance-fade-up', 'entrance-delay-300');
      if (credits) credits.classList.add('entrance-fade-up', 'entrance-delay-500');
    });

    const cards = document.querySelectorAll('.card, [class*="card"]:not([class*="container"])');
    cards.forEach((card, index) => {
      card.classList.add('entrance-card-stagger');
      card.style.animationDelay = `${index * 0.1}s`;
    });

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => {
      const animationType = el.dataset.animation || 
                           (el.classList.contains('fade-left') ? 'fade-left' :
                            el.classList.contains('fade-right') ? 'fade-right' :
                            el.classList.contains('zoom-in') ? 'zoom-in' : 'fade-up');
      el.classList.add(`entrance-${animationType}`);
    });

    console.log('[EntranceEffects] CSS fallback initialized');
  }
};

// Auto-initialize when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    EntranceEffects.init();
  });
} else {
  EntranceEffects.init();
}

// Export for manual initialization if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EntranceEffects;
}
