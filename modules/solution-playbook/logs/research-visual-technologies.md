# 现代视觉交互技术研究报告

> 研究日期：2026-01-29
> 目标项目：Meshy Solution Playbook
> 研究范围：Scroll-Driven Animations、GSAP、Lottie、粒子效果、微交互、View Transitions

---

## 1. CSS Scroll-Driven Animations

### 1.1 技术概述

CSS 滚动驱动动画将动画进度与滚动位置绑定，而非时间驱动。这是原生 CSS 特性，无需 JavaScript。

### 1.2 浏览器支持 (2026)

| 浏览器 | 支持版本 |
|--------|----------|
| Chrome | 115+ ✅ |
| Edge | 115+ ✅ |
| Safari | 18+ ✅ |
| Firefox | 144+ ✅ |

**Safari 26 beta 已完整支持，生产环境可用。**

### 1.3 核心 API

```css
/* 基本滚动动画 */
.element {
  animation: fadeInUp 1s linear;
  animation-timeline: scroll();           /* 绑定滚动进度 */
  animation-range: entry 0% entry 100%;   /* 控制触发范围 */
}

/* 视口触发动画 */
.element {
  animation: slideIn 1s ease;
  animation-timeline: view();             /* 元素进入视口时触发 */
}

/* 滚动进度条 */
.progress-bar {
  animation: growWidth 1s linear;
  animation-timeline: scroll(root);       /* 绑定到根滚动容器 */
}

@keyframes growWidth {
  from { width: 0%; }
  to { width: 100%; }
}
```

### 1.4 关键属性

| 属性 | 用途 |
|------|------|
| `animation-timeline` | 指定时间线类型 (`scroll()`, `view()`) |
| `animation-range` | 定义动画触发范围 |
| `scroll-timeline` | 创建命名滚动时间线 |
| `view-timeline` | 创建命名视口时间线 |

### 1.5 最佳实践

1. **使用 `linear` 时间函数** - 滚动位置控制进度，非时间
2. **在合成器线程运行** - 比 JS scroll 事件性能更好 (60fps)
3. **Firefox 需要 `animation-duration`** - 兼容性考虑
4. **渐进增强** - 不支持的浏览器自动降级为静态

### 1.6 适用场景

- ✅ 滚动进度指示器
- ✅ 元素滚动淡入
- ✅ 视差背景效果
- ✅ 固定元素渐变

---

## 2. GSAP ScrollTrigger

### 2.1 技术概述

GSAP ScrollTrigger 是 GSAP 的滚动触发插件，提供比原生 CSS 更精细的控制能力。

### 2.2 安装方式

```html
<!-- CDN -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

```javascript
// NPM
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

### 2.3 核心功能

```javascript
// 基本触发动画
gsap.to(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",     // 元素顶部到达视口80%时开始
    end: "bottom 20%",    // 元素底部到达视口20%时结束
    toggleActions: "play none none reverse"
  },
  y: 100,
  opacity: 1
});

// Pinning 固定效果
gsap.to(".section", {
  scrollTrigger: {
    trigger: ".section",
    pin: true,            // 固定元素
    pinSpacing: true,
    start: "top top",
    end: "+=500"          // 滚动500px后解除
  }
});

// Scrubbing 擦洗效果
gsap.to(".parallax", {
  scrollTrigger: {
    trigger: ".container",
    scrub: 1,             // 1秒平滑跟随滚动
    start: "top bottom",
    end: "bottom top"
  },
  y: -200
});
```

### 2.4 常见错误与解决

| 问题 | 解决方案 |
|------|----------|
| 嵌套 ScrollTrigger 在 timeline 中 | ScrollTrigger 应用于整个 timeline，非单个 tween |
| 同元素多个 ScrollTrigger 冲突 | 使用 `.fromTo()` 或父级 timeline |
| 视口相关动画不准确 | 使用函数式 `start/end` 值 |
| 顺序动画属性覆盖 | 设置 `immediateRender: false` |

### 2.5 适用场景

- ✅ 高级 pinning 效果
- ✅ 复杂滚动叙事
- ✅ 精确 scrubbing 控制
- ✅ 需要 polyfill 的旧浏览器
- ✅ 与 React/Vue 集成

---

## 3. Lottie Animations

### 3.1 技术概述

Lottie 是 Airbnb 开源的动画库，可渲染 After Effects 导出的 JSON 动画。

### 3.2 实现方式

#### 方式一：lottie-player Web Component

```html
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

<lottie-player
  autoplay
  loop
  mode="normal"
  src="https://lottie.host/animation.json"
  style="width: 320px; height: 320px"
>
</lottie-player>
```

#### 方式二：dotLottie-web (新一代)

```javascript
import { DotLottie } from '@lottiefiles/dotlottie-web';

const animation = new DotLottie({
  canvas: document.querySelector('#canvas'),
  autoplay: true,
  loop: true,
  src: "https://lottie.host/animation.lottie"
});

// 控制播放
animation.play();
animation.pause();
animation.stop();
animation.setSpeed(2);
```

### 3.3 播放控制 API

```javascript
const player = document.querySelector('lottie-player');

// 事件监听
player.addEventListener('ready', () => console.log('Animation loaded'));
player.addEventListener('complete', () => console.log('Animation finished'));

// 方法调用
player.play();
player.pause();
player.stop();
player.seek(50);        // 跳转到50%位置
player.setDirection(-1); // 反向播放
```

### 3.4 动画资源

- **LottieFiles**: https://lottiefiles.com/free-animations
- **IconScout Lottie**: https://iconscout.com/lottie-animations
- **LordIcon**: https://lordicon.com/

### 3.5 适用场景

- ✅ 替代静态图标 (hover 动画)
- ✅ 加载/成功/错误状态
- ✅ 引导动画
- ✅ 品牌动效
- ❌ 大量同时播放 (性能考虑)

---

## 4. 粒子效果

### 4.1 方案对比

| 方案 | 性能 | 包大小 | 复杂度 | 推荐场景 |
|------|------|--------|--------|----------|
| Pure CSS + SVG | ⭐⭐⭐⭐⭐ | 0kb | 低 | 轻量装饰 |
| Canvas 2D 自定义 | ⭐⭐⭐⭐ | <5kb | 中 | 中等效果 |
| tsParticles | ⭐⭐⭐ | ~150kb | 低 | 功能丰富 |
| JParticles | ⭐⭐⭐⭐ | ~30kb | 低 | 轻量替代 |
| PixiJS ParticleContainer | ⭐⭐⭐⭐⭐ | ~100kb | 高 | 海量粒子 |

### 4.2 轻量 CSS 方案

```css
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent-primary);
  border-radius: 50%;
  animation: float var(--duration) ease-in-out infinite;
  left: calc(var(--x) * 100%);
  opacity: 0.6;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { 
    transform: translateY(-20vh) scale(1);
    opacity: 0;
  }
}
```

```javascript
// 生成粒子
function createParticles(container, count = 20) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.setProperty('--x', Math.random());
    particle.style.setProperty('--duration', (3 + Math.random() * 4) + 's');
    particle.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(particle);
  }
}
```

### 4.3 Canvas 2D 方案

```javascript
class ParticleSystem {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.count = options.count || 50;
    this.color = options.color || '#CCFF00';
    this.init();
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      // 边界检测
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      // 绘制
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba');
      this.ctx.fill();
    });
    requestAnimationFrame(() => this.animate());
  }
}
```

### 4.4 tsParticles 快速使用

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js"></script>

<div id="tsparticles"></div>

<script>
tsParticles.load("tsparticles", {
  particles: {
    number: { value: 50 },
    color: { value: "#CCFF00" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    move: { enable: true, speed: 1 }
  }
});
</script>
```

### 4.5 性能优化

1. **移动端降级** - 减少粒子数量或禁用
2. **使用 `requestAnimationFrame`** - 避免 setInterval
3. **离屏 Canvas** - 复杂场景使用双缓冲
4. **对象池** - 复用粒子对象避免 GC

---

## 5. 微交互 (Microinteractions)

### 5.1 按钮 Ripple 效果

```css
.btn {
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  top: 50%;
  left: 50%;
  transform: scale(0);
  opacity: 1;
}

.btn:active::after {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
```

```javascript
// JS 版本 - 从点击位置开始
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
```

### 5.2 卡片 3D Tilt 效果

```css
.card-tilt {
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.card-tilt:hover {
  transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
}

.card-tilt .content {
  transform: translateZ(30px);
}
```

```javascript
document.querySelectorAll('.card-tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.setProperty('--rx', rotateX + 'deg');
    card.style.setProperty('--ry', rotateY + 'deg');
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});
```

### 5.3 图标 Bounce 效果

```css
.icon-bounce {
  transition: transform 0.3s var(--ease-bounce);
}

.icon-bounce:hover {
  transform: scale(1.2) translateY(-5px);
}

/* 或使用动画 */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.icon-bounce:hover {
  animation: bounce 0.5s ease infinite;
}
```

### 5.4 数字计数动画

```javascript
function animateNumber(element, target, duration = 1000) {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.floor(start + (target - start) * easeProgress);
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// 使用 Intersection Observer 触发
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateNumber(entry.target, target);
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
```

---

## 6. 自定义光标效果

### 6.1 基本光标跟随

```css
.cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  border: 2px solid var(--accent-primary);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease, width 0.2s, height 0.2s;
  z-index: 9999;
  mix-blend-mode: difference;
}

.cursor.hover {
  width: 40px;
  height: 40px;
  background: rgba(204, 255, 0, 0.1);
}
```

```javascript
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Hover 放大
document.querySelectorAll('a, button, .clickable').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
```

### 6.2 磁性按钮效果

```javascript
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});
```

### 6.3 GSAP 增强版磁性效果

```javascript
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  });
});
```

---

## 7. View Transitions API

### 7.1 浏览器支持 (2026)

- Chrome 111+ ✅
- Edge 111+ ✅  
- Safari 18+ ✅
- Firefox 144+ ✅ (2025.10)

**已成为 Baseline Newly Available**

### 7.2 同文档过渡

```javascript
// 基本用法
document.startViewTransition(() => {
  // 更新 DOM
  updateContent();
});

// 带类型
document.startViewTransition({
  update: () => updateContent(),
  types: ['slide-left']
});
```

### 7.3 CSS 过渡样式

```css
/* 默认淡入淡出 */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}

/* 滑动效果 */
:root:active-view-transition-type(slide-left) {
  &::view-transition-old(root) {
    animation: slide-out-left 0.3s ease;
  }
  &::view-transition-new(root) {
    animation: slide-in-right 0.3s ease;
  }
}

@keyframes slide-out-left {
  to { transform: translateX(-100%); opacity: 0; }
}

@keyframes slide-in-right {
  from { transform: translateX(100%); opacity: 0; }
}

/* 缩放效果 */
:root:active-view-transition-type(zoom) {
  &::view-transition-old(root) {
    animation: zoom-out 0.4s ease;
  }
  &::view-transition-new(root) {
    animation: zoom-in 0.4s ease;
  }
}
```

### 7.4 命名视图过渡

```css
.hero-image {
  view-transition-name: hero;
}

/* 单独控制 hero 的过渡 */
::view-transition-group(hero) {
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
}
```

### 7.5 渐进增强

```javascript
function navigateTo(url) {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      window.location.href = url;
    });
  } else {
    window.location.href = url;
  }
}
```

---

## 8. 项目适配建议

### 8.1 现有项目分析

Meshy Solution Playbook 项目特点：
- 已有 CSS 变量系统 (`--accent-primary`, `--transition-*`)
- 已有 glitch 动画效果
- 使用 FontAwesome 图标
- 幻灯片式页面切换

### 8.2 推荐优先级

| 优先级 | 技术 | 原因 |
|--------|------|------|
| ⭐⭐⭐ | CSS Scroll-Driven | 原生、性能好、易集成 |
| ⭐⭐⭐ | 微交互 (Ripple/Tilt) | 提升交互感、代码量小 |
| ⭐⭐ | View Transitions | 增强页面切换、兼容现有架构 |
| ⭐⭐ | 自定义光标 | 视觉亮点、符合设计风格 |
| ⭐ | Lottie | 替换静态图标、需资源准备 |
| ⭐ | 粒子效果 | 锦上添花、需注意性能 |

### 8.3 CDN 依赖清单

```html
<!-- GSAP (如需高级滚动控制) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>

<!-- Lottie Player -->
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

<!-- tsParticles (可选) -->
<script src="https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js"></script>
```

---

## 9. 性能考量

### 9.1 动画性能准则

1. **优先使用 CSS 动画** - 在合成器线程运行
2. **只动画 `transform` 和 `opacity`** - 避免 layout/paint
3. **使用 `will-change`** - 但不要滥用
4. **移动端降级** - 减少效果或禁用

### 9.2 检测与降级

```javascript
// 检测减少动画偏好
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 检测移动设备
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// 条件初始化
if (!prefersReducedMotion && !isMobile) {
  initParticles();
  initCustomCursor();
}
```

---

## 10. 参考资源

### 官方文档
- [MDN: CSS Scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [LottieFiles Developer Docs](https://developers.lottiefiles.com/)
- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

### 教程与示例
- [WebKit: A guide to Scroll-driven Animations](https://webkit.org/blog/17101/)
- [Chrome: View Transitions 2025 Update](https://developer.chrome.com/blog/view-transitions-in-2025)
- [GSAP: ScrollTrigger tips & mistakes](https://gsap.com/resources/st-mistakes/)

### 动画资源
- [LottieFiles Free Animations](https://lottiefiles.com/free-animations)
- [tsParticles Presets](https://particles.js.org/samples/)
- [Cuberto Cursor Effects](https://cuberto.com/blog/cursor-magnetic-js-component)
