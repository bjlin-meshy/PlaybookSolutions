# 动态图标库 - Meshy Solutions

## 概览

本目录包含 7 个动态 SVG 图标，用于 Meshy 解决方案展示。每个图标都包含内联 CSS 动画。

## 图标列表

### 荧光绿主题 (#C8FF00)

| 文件名 | 解决方案 | 动画效果 |
|--------|----------|----------|
| `icon-asset-blockout.svg` | 资产起型加速 | 脉冲、浮动、速度线 |
| `icon-stylized-production.svg` | 特定风格化资产量产 | 复制扩散、AI 核心 |
| `icon-stylized-props.svg` | 风格化道具设计 | 轨道粒子、星光闪烁 |
| `icon-film-previz.svg` | 影视预演加速 | 录制闪烁、快进动画 |
| `icon-concept-assist.svg` | 概念设计辅助 | 灵感爆发、形状旋转 |

### 金色主题 (#FFB800)

| 文件名 | 解决方案 | 动画效果 |
|--------|----------|----------|
| `icon-concept-to-3d.svg` | 从概念图到 3D | 箭头脉冲、魔法旋转 |
| `icon-auto-refinement.svg` | 粗模自动化精修 | 抛光闪光、升级浮动 |

## 使用方法

### HTML 内联

```html
<img src="assets/icons/icon-asset-blockout.svg" alt="资产起型加速" width="64" height="64">
```

### 使用 object 标签（保留动画）

```html
<object type="image/svg+xml" data="assets/icons/icon-asset-blockout.svg" width="64" height="64">
  资产起型加速
</object>
```

### React 组件

```tsx
import AssetBlockoutIcon from './assets/icons/icon-asset-blockout.svg?react';

const MyComponent = () => (
  <AssetBlockoutIcon className="w-16 h-16" />
);
```

### CSS 背景

```css
.icon-blockout {
  width: 64px;
  height: 64px;
  background: url('./assets/icons/icon-asset-blockout.svg') center/contain no-repeat;
}
```

## 动画说明

每个 SVG 都包含以下内联动画类型：

- **pulse** - 脉冲呼吸效果
- **float** - 上下浮动
- **orbit** - 环绕轨道
- **sparkle** - 星光闪烁
- **shine** - 光线扫过

动画使用 CSS `@keyframes` 定义，无需额外 JavaScript。

## 预览

打开 `icon-preview.html` 可以在浏览器中预览所有图标及其动画效果。

## 颜色变量

如需修改主题色，替换以下值：

| 主题 | 主色 | 亮色 | 暗色 |
|------|------|------|------|
| 荧光绿 | `#C8FF00` | `#EEFF88` | `#9ACC00` |
| 金色 | `#FFB800` | `#FFD060` | `#CC9200` |

## 更新日志

- **2026-01-31**: 初始创建，包含 7 个动态图标
