/**
 * Advanced Particle System with Mouse Interaction
 * Creates a canvas-based particle system with visual connections
 */

const ParticleSystem = {
  canvas: null,
  ctx: null,
  particles: [],
  mouse: { x: null, y: null },
  animationId: null,
  isPaused: false,
  lastFrameTime: 0,
  targetFPS: 60,
  frameInterval: 1000 / 60, // ~16.67ms per frame

  /**
   * Initialize the particle system
   */
  init() {
    const container = document.getElementById('particlesContainer');
    if (!container) {
      console.error('[ParticleSystem] Container #particlesContainer not found');
      return;
    }

    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particleCanvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.resize();

    // Determine particle count based on device
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const particleCount = isMobile ? 30 : Math.floor(Math.random() * 21) + 60; // 60-80 for desktop, 30 for mobile

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(this.createParticle());
    }

    console.log(`[ParticleSystem] Initialized with ${particleCount} particles`);

    // Event listeners
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.handleMouse(e));
    window.addEventListener('click', (e) => this.handleClick(e));
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Visibility API - pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.isPaused = true;
      } else {
        this.isPaused = false;
        this.lastFrameTime = performance.now();
        this.loop();
      }
    });

    // Start animation loop
    this.lastFrameTime = performance.now();
    this.loop();
  },

  /**
   * Resize canvas to match container
   */
  resize() {
    if (!this.canvas) return;
    
    const container = this.canvas.parentElement;
    const rect = container.getBoundingClientRect();
    
    // Set actual canvas size (not just CSS)
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    
    // Update particle boundaries if needed
    this.particles.forEach(particle => {
      if (particle.x > this.canvas.width) particle.x = this.canvas.width;
      if (particle.y > this.canvas.height) particle.y = this.canvas.height;
    });
  },

  /**
   * Create a new particle with random properties
   */
  createParticle() {
    const size = Math.random() * 4 + 2; // 2-6px
    const speed = Math.random() * 1.5 + 0.5; // 0.5-2 px/frame
    const angle = Math.random() * Math.PI * 2;
    
    // Mix of accent color and white with varying opacity
    const useAccent = Math.random() > 0.5;
    const opacity = Math.random() * 0.6 + 0.4; // 0.4-1.0
    const color = useAccent 
      ? `rgba(204, 255, 0, ${opacity})` 
      : `rgba(255, 255, 255, ${opacity * 0.6})`;

    return {
      x: Math.random() * (this.canvas?.width || window.innerWidth),
      y: Math.random() * (this.canvas?.height || window.innerHeight),
      size: size,
      speed: speed,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: color,
      baseColor: color,
      baseOpacity: opacity,
      glowRadius: size * 2
    };
  },

  /**
   * Update all particles
   */
  update() {
    if (!this.canvas) return;

    const width = this.canvas.width;
    const height = this.canvas.height;

    this.particles.forEach(particle => {
      // Mouse attraction (gentle pull)
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0 && distance < 200) {
          // Gentle attraction force
          const force = (200 - distance) / 200 * 0.02;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }

        // Glow effect near mouse
        if (distance < 100) {
          const glowIntensity = 1 - (distance / 100);
          particle.color = particle.baseColor.replace(
            /[\d\.]+\)$/,
            `${Math.min(1, parseFloat(particle.baseOpacity) + glowIntensity * 0.3)})`
          );
        } else {
          particle.color = particle.baseColor;
        }
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Add gentle drift
      particle.vx += (Math.random() - 0.5) * 0.05;
      particle.vy += (Math.random() - 0.5) * 0.05;

      // Damping to prevent infinite acceleration
      particle.vx *= 0.98;
      particle.vy *= 0.98;

      // Boundary handling with fade effect
      const fadeDistance = 50;
      
      if (particle.x < fadeDistance) {
        particle.x = fadeDistance;
        particle.vx *= -0.5;
      } else if (particle.x > width - fadeDistance) {
        particle.x = width - fadeDistance;
        particle.vx *= -0.5;
      }

      if (particle.y < fadeDistance) {
        particle.y = fadeDistance;
        particle.vy *= -0.5;
      } else if (particle.y > height - fadeDistance) {
        particle.y = height - fadeDistance;
        particle.vy *= -0.5;
      }

      // Edge fade opacity
      const edgeFade = Math.min(
        particle.x / fadeDistance,
        (width - particle.x) / fadeDistance,
        particle.y / fadeDistance,
        (height - particle.y) / fadeDistance
      );
      const fadeOpacity = Math.min(1, edgeFade);
      
      // Update color with edge fade
      const baseOpacity = parseFloat(particle.baseOpacity);
      particle.color = particle.baseColor.replace(
        /[\d\.]+\)$/,
        `${baseOpacity * fadeOpacity})`
      );
    });
  },

  /**
   * Draw particles and connections
   */
  draw() {
    if (!this.ctx || !this.canvas) return;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections first (behind particles)
    this.drawConnections();

    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.save();
      
      // Glow effect
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.glowRadius
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'transparent');
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.glowRadius, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Particle core
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.restore();
    });
  },

  /**
   * Draw lines between nearby particles
   */
  drawConnections() {
    const connectionDistance = 100;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          // Opacity based on distance (closer = more visible)
          const opacity = (1 - distance / connectionDistance) * 0.2;
          
          this.ctx.save();
          this.ctx.strokeStyle = `rgba(204, 255, 0, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  },

  /**
   * Handle mouse movement
   */
  handleMouse(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  },

  /**
   * Handle click - burst effect
   */
  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    this.particles.forEach(particle => {
      const dx = particle.x - clickX;
      const dy = particle.y - clickY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        // Repulsion force
        const force = (150 - distance) / 150 * 3;
        const angle = Math.atan2(dy, dx);
        
        particle.vx += Math.cos(angle) * force;
        particle.vy += Math.sin(angle) * force;
      }
    });
  },

  /**
   * Animation loop with FPS limiting
   */
  loop() {
    if (this.isPaused) return;

    const currentTime = performance.now();
    const elapsed = currentTime - this.lastFrameTime;

    // Limit to target FPS
    if (elapsed >= this.frameInterval) {
      this.update();
      this.draw();
      this.lastFrameTime = currentTime - (elapsed % this.frameInterval);
    }

    this.animationId = requestAnimationFrame(() => this.loop());
  },

  /**
   * Cleanup and destroy
   */
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', () => this.resize());
    window.removeEventListener('mousemove', (e) => this.handleMouse(e));
    window.removeEventListener('click', (e) => this.handleClick(e));
    if (this.canvas && this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ParticleSystem.init());
} else {
  ParticleSystem.init();
}
