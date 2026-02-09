/**
 * Ambient Effects - 环境动画效果生成器
 * Playbook Website
 */

(function() {
    'use strict';

    const CONFIG = {
        full: { sparkles: 8, shineLines: 2, particles: 5, smallSparkleRatio: 0.375 },
        medium: { sparkles: 4, shineLines: 1, particles: 3, smallSparkleRatio: 0.25 },
        minimal: { sparkles: 2, shineLines: 0, particles: 2, smallSparkleRatio: 0 }
    };

    function randomPosition() {
        return { top: Math.random() * 80 + 10, left: Math.random() * 80 + 10 };
    }

    function randomDelay(max = 2) {
        return (Math.random() * max).toFixed(1);
    }

    function createSparkle(isSmall = false) {
        const sparkle = document.createElement('div');
        sparkle.className = isSmall ? 'sparkle small' : 'sparkle';
        const pos = randomPosition();
        sparkle.style.top = pos.top + '%';
        sparkle.style.left = pos.left + '%';
        sparkle.style.animationDelay = randomDelay() + 's';
        return sparkle;
    }

    function createShineContainer(lineCount) {
        const container = document.createElement('div');
        container.className = 'shine-container';
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'shine-line';
            if (i > 0) line.style.animationDelay = (i * 3) + 's';
            container.appendChild(line);
        }
        return container;
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.bottom = (Math.random() * 20 + 15) + '%';
        particle.style.right = (Math.random() * 20 + 5) + '%';
        particle.style.animationDelay = randomDelay(2.5) + 's';
        return particle;
    }

    function initAmbientEffects(mode = 'full') {
        if (document.querySelector('.ambient-effects')) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const config = CONFIG[mode] || CONFIG.full;
        const container = document.createElement('div');
        container.className = 'ambient-effects';
        if (mode !== 'full') container.classList.add(mode);

        const smallCount = Math.floor(config.sparkles * config.smallSparkleRatio);
        for (let i = 0; i < config.sparkles; i++) {
            container.appendChild(createSparkle(i >= (config.sparkles - smallCount)));
        }

        if (config.shineLines > 0) {
            container.appendChild(createShineContainer(config.shineLines));
        }

        for (let i = 0; i < config.particles; i++) {
            container.appendChild(createParticle());
        }

        document.body.insertBefore(container, document.body.firstChild);
        console.log(`Ambient effects initialized (mode: ${mode})`);
    }

    function removeAmbientEffects() {
        const container = document.querySelector('.ambient-effects');
        if (container) container.remove();
    }

    function setAmbientMode(mode) {
        removeAmbientEffects();
        initAmbientEffects(mode);
    }

    document.addEventListener('DOMContentLoaded', function() {
        if (document.body.hasAttribute('data-ambient')) {
            initAmbientEffects(document.body.getAttribute('data-ambient') || 'full');
        }
    });

    window.initAmbientEffects = initAmbientEffects;
    window.removeAmbientEffects = removeAmbientEffects;
    window.setAmbientMode = setAmbientMode;
})();
