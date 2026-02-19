# 架构文档 · Architecture

## 设计原则

### 1. 模块独立性（Module Independence）

每个模块都是一个**自包含单元**，可以独立运行，也可以通过统一入口集成：

```
modules/
  ├── [module-name]/
  │   ├── index.html          ← 模块入口（必须）
  │   ├── README.md           ← 模块说明（可选）
  │   ├── assets/             ← 模块私有资源
  │   └── ...                 ← 其他文件
```

### 2. 零耦合集成（Zero-Coupling Integration）

模块之间**不相互引用**，统一入口 `index.html` 是唯一的「连接器」：
- 根 `index.html` → 链接到各模块的入口
- 模块之间无直接依赖
- 任何模块可独立删除/替换而不影响其他模块

### 2.1 共享设计系统（Shared Design System）

`modules/shared/css/design-system.css` 定义了统一的 CSS 变量（品牌色、背景色、文字色、间距、动画等）。模块可通过 `<link>` 引入以保持视觉一致性，但不强制依赖——各模块仍可独立运行并使用本地样式。

已引入 design-system 的模块：根 `index.html`、`website`。

### 3. 技术无关性（Tech Agnostic）

不限制模块使用的技术栈：
- Static HTML/CSS → solution-playbook, website, hub, style-variants
- React + Vite → presentation
- Node.js scripts → design-variants, tools
- Python scripts → tools

---

## 模块分类

### 📊 展示层（Presentation Layer）

用于向客户/团队**展示**解决方案的模块。

| 模块 | 适用场景 | 技术 |
|------|---------|------|
| solution-playbook | 深度展示，单个案例详解 | HTML + 高级 CSS 动效 |
| website | 快速浏览，行业导航入口 | HTML + Vanilla JS |
| presentation | 会议演示，幻灯片放映 | React + Tailwind |
| hub | 内部管理，仪表板概览（入口: `Playbooks.htm`） | HTML (单文件) |

### 🎨 设计层（Design Layer）

用于**设计探索**和视觉风格验证的模块。

| 模块 | 适用场景 | 技术 |
|------|---------|------|
| style-variants | 风格 A/B 测试，10 种视觉方案 | HTML (每个风格独立文件) |
| case-3dprinting | 详细案例模板，PPT 式 | HTML (每页独立文件) |
| design-variants | 设计方案对比预览 | HTML + Node.js |

### 🔧 工具层（Tooling Layer）

辅助转换和导出的工具。

| 工具 | 功能 | 技术 |
|------|------|------|
| html_to_pdf.py | HTML 案例 → PDF | Python |
| html_to_ppt.py | HTML 案例 → PPT | Python |
| html_to_ppt_canva.py | Canva 格式 PPT 导出 | Python |
| create-pptx.cjs | HTML 页面 → PPTX | Node.js (pptxgenjs) |

---

## 新增模块流程

### Step 1: 创建模块目录

```bash
mkdir modules/[new-module-name]
```

### Step 2: 创建模块入口

每个模块**必须**包含 `index.html`（或其他明确的入口文件）：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Module Name] | Playbook Solutions</title>
</head>
<body>
    <!-- 模块内容 -->
</body>
</html>
```

### Step 3: 注册到统一入口

在根 `index.html` 中添加模块卡片：

```html
<a href="modules/[new-module-name]/index.html" class="module-card">
    <div class="module-icon">[emoji]</div>
    <div class="module-title">[Module Name]</div>
    <div class="module-desc">[描述]</div>
    <div class="module-meta">
        <span class="tag">[标签]</span>
        <span class="tag tech">[技术栈]</span>
    </div>
</a>
```

### Step 4: 更新文档

- 更新 `README.md` 的模块说明表
- 如果是新行业，更新覆盖行业列表

---

## AI 持续更新机制

本项目内置了 `.cursor/rules/playbook-module.mdc` 规则文件，使 AI 在对话中能够：

1. **识别新解决方案** — 当用户讨论新的行业应用或案例时
2. **自动模块化** — 将方案转化为标准模块结构
3. **集成到系统** — 自动更新入口和文档

### AI 交互示例

```
用户: "我想给教育行业也做一个 Playbook"
AI: 
  1. 在 modules/ 下创建 case-education/
  2. 生成 index.html（使用已有的视觉风格）
  3. 在根 index.html 中注册新模块
  4. 更新 README.md
```

---

## 视觉风格统一

### 核心色板

```css
--bg-core: #080808;        /* 深色背景 */
--accent-primary: #CCFF00; /* 荧光黄绿（品牌色）*/
--text-main: #f0f0f0;      /* 主文字 */
--text-sub: #888888;        /* 辅助文字 */
```

### 字体系统

- 英文: `Inter` (400, 500, 600, 700, 800)
- 中文: `Noto Sans SC` / `Microsoft YaHei`

### 设计语言

- 深色主题 + 荧光色点缀
- 卡片式布局 + 悬停动效
- 双语支持（EN/CN 切换）
- 移动端响应式

---

## 文档角色说明

| 文档 | 角色 |
|------|------|
| `README.md` | 速览：项目介绍、模块列表、如何运行 |
| `ARCHITECTURE.md` | 深度：模块划分、设计原则、扩展规则 |
| `CURSOR-QUICKSTART.md` | 开发者：Cursor 中如何上手开发 |
| `.cursor/rules/playbook-module.mdc` | AI 规范：模块创建与更新规则 |

## 注意事项

- `modules/website/` 内含独立 `.git` 仓库，该子模块可独立克隆与部署。
- hub 模块入口为 `modules/hub/Playbooks.htm`（非 `index.html`），保留历史命名。
- 案例 HTML 中的占位符（`IMG_PLACEHOLDER`、`Video Placeholder` 等）由后续内容填充阶段统一处理。

---

*Architecture v1.1 · Playbook Solutions*
