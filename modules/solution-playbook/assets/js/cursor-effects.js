// 光标效果系统
const CursorEffects = {
  cursor: { x: 0, y: 0 },
  cursorSmooth: { x: 0, y: 0 },
  
  init() {
    // 仅在桌面端启用
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      this.createCursor();
      this.bindEvents();
      this.animate();
      document.body.classList.add('cursor-enabled');
    }
  },

  createCursor() {
    this.dot = document.createElement('div');
    this.dot.className = 'cursor-dot';
    this.outline = document.createElement('div');
    this.outline.className = 'cursor-outline';
    document.body.appendChild(this.dot);
    document.body.appendChild(this.outline);
    
    // 创建拖尾
    this.trails = [];
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = 0.15 - (i * 0.03);
      document.body.appendChild(trail);
      this.trails.push({ el: trail, x: 0, y: 0 });
    }
  },

  bindEvents() {
    document.addEventListener('mousemove', e => {
      this.cursor.x = e.clientX;
      this.cursor.y = e.clientY;
    });

    // Hover 效果
    document.querySelectorAll('a, button, .btn, .industry-item, .case-card, [onclick]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.dot.classList.add('cursor-hover');
        this.outline.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        this.dot.classList.remove('cursor-hover');
        this.outline.classList.remove('cursor-hover');
      });
    });

    // 点击效果
    document.addEventListener('mousedown', () => this.dot.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => this.dot.classList.remove('cursor-click'));

    // 磁性效果
    document.querySelectorAll('.btn, .cursor-magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  },

  animate() {
    // 平滑跟随
    this.cursorSmooth.x += (this.cursor.x - this.cursorSmooth.x) * 0.15;
    this.cursorSmooth.y += (this.cursor.y - this.cursorSmooth.y) * 0.15;

    this.dot.style.left = this.cursor.x + 'px';
    this.dot.style.top = this.cursor.y + 'px';
    this.outline.style.left = this.cursorSmooth.x + 'px';
    this.outline.style.top = this.cursorSmooth.y + 'px';

    // 更新拖尾
    let prevX = this.cursor.x;
    let prevY = this.cursor.y;
    this.trails.forEach((trail, i) => {
      trail.x += (prevX - trail.x) * (0.15 - i * 0.02);
      trail.y += (prevY - trail.y) * (0.15 - i * 0.02);
      trail.el.style.left = trail.x + 'px';
      trail.el.style.top = trail.y + 'px';
      prevX = trail.x;
      prevY = trail.y;
    });

    requestAnimationFrame(() => this.animate());
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CursorEffects.init());
} else {
  CursorEffects.init();
}
