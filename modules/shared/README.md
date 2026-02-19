# Shared Design System

统一的 CSS 设计 token，供所有 Playbook Solutions 模块使用。

## 文件

```text
modules/shared/
└── css/
    └── design-system.css   ← 唯一权威 token 源
```

## 如何引入

在模块的 HTML 或 CSS 中引入：

```html
<link rel="stylesheet" href="../shared/css/design-system.css">
```

或在 CSS 中：

```css
@import url('../../../shared/css/design-system.css');
```

## 核心变量

| 变量 | 值 | 用途 |
|------|------|------|
| `--bg-core` | `#080808` | 主背景 |
| `--accent-primary` | `#CCFF00` | 品牌强调色 |
| `--text-main` | `#f0f0f0` | 主文字 |
| `--text-sub` | `#888888` | 辅助文字 |
| `--bg-card` | `#111111` | 卡片背景 |
| `--border` | `#222222` | 边框 |
| `--radius` | `12px` | 圆角 |
| `--font-sans` | Inter 系列 | 英文字体 |
| `--font-cn` | Noto Sans SC 系列 | 中文字体 |

## 主题覆盖

design-system.css 内置 5 个行业主题（通过 `data-theme` 属性切换）：

- `gaming` — 霓虹紫粉
- `film` — 电影金
- `3dprinting` — 技术蓝
- `interior` — 暖棕
- `manufacturing` — 工业钢蓝

## 模块级覆盖

各模块可在引入 design-system 后，用本地 CSS 覆盖特定变量。例如 website 模块的 `variables.css` 覆盖了 `--bg-core` 为 `#000000`。

## 已引入的模块

- 根 `index.html`（统一门户）
- `modules/website/`（通过 main.css @import）
- `modules/case-3dprinting/index.html`（入口页）
