# Playbook Solutions

> Meshy AI 行业解决方案 — 模块化统一平台

## 快速开始

**方式一：双击根目录 `激活并打开.bat`**  
会启动本地服务器并打开浏览器，访问 <http://localhost:5555>（端口 5555 避免本机权限限制）。

**方式二：直接打开 HTML**

```bash
# 打开统一入口（推荐）
start index.html

# 或直接打开完整 Playbook
start modules/solution-playbook/index.html

# 或打开精简网站版
start modules/website/index.html
```

## 项目结构

```
PlaybookSolutions/
├── index.html                  ← 统一入口门户
├── README.md                   ← 你正在读的文件
├── ARCHITECTURE.md             ← 模块化架构详解
│
├── modules/                    ← 7 个独立可运行模块
│   ├── solution-playbook/      ← 完整行业案例库（34+ 案例）
│   ├── website/                ← 精简版网站入口
│   ├── hub/                    ← 总控仪表板
│   ├── presentation/           ← React 交互式演示
│   ├── style-variants/         ← 10 种视觉风格变体
│   ├── case-3dprinting/        ← 3D 打印详细案例
│   └── design-variants/        ← 设计变体预览系统
│
├── tools/                      ← 转换工具（Python）
│   ├── html_to_pdf.py
│   ├── html_to_pdf_simple.py
│   ├── html_to_ppt.py
│   └── html_to_ppt_canva.py
│
├── modules/shared/             ← 共享资源（CSS 设计系统）
│
├── .cursor/rules/              ← AI 持续更新规则
│   └── playbook-module.mdc     ← 模块开发规范
│
└── _unrelated/                 ← 已分离的无关文件
```

## 模块说明

| 模块 | 类型 | 独立运行 | 说明 |
|------|------|---------|------|
| **solution-playbook** | HTML/CSS/JS | ✅ 直接打开 index.html | 最完整版本，34+ 个案例，高级视觉效果 |
| **website** | HTML/CSS/JS | ✅ 直接打开 index.html | 精简版，适合对外展示的入口网站 |
| **hub** | HTML | ✅ 直接打开 Playbooks.htm | 仪表板风格，侧边栏 + 嵌入查看器 |
| **presentation** | React/Vite | ⚠️ 需 `npm install && npm run dev` | 交互式幻灯片演示 |
| **style-variants** | HTML | ✅ 直接打开任意 .html | 10 种不同的视觉风格方案 |
| **case-3dprinting** | HTML | ✅ 直接打开 index.html | 8 页 PPT 式案例展示 |
| **design-variants** | HTML/Node.js | ✅ 预览 / ⚠️ 导出需 Node | 设计方案对比预览 |

## 覆盖行业

- 🎮 **Gaming** — 风格化资产、PBR 贴图、NPC 生成、白盒加速
- 🎬 **Film & Animation** — 预演、Kitbash、风格化、贴图
- 🏭 **Manufacturing** — 快速创意、CMF 探索、盲盒设计
- 🛋️ **Interior Design** — 虚拟样板间、定制家具、织物纹理
- 🖨️ **3D Printing** — 微缩模型定制、多色打印、人像扫描

## 文档导航

| 文档 | 内容 |
|------|------|
| 本文件 (`README.md`) | 速览：项目介绍、模块列表、如何运行 |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 深度：模块划分、设计原则、扩展规则 |
| [CURSOR-QUICKSTART.md](./CURSOR-QUICKSTART.md) | 开发者：Cursor 中如何上手开发 |
| `reviews/` | 历史审查报告（架构审查、优化建议） |
| `visual-fixes-log.md` | 视觉修复记录 |

## 同事克隆后如何运行

```bash
git clone <仓库地址>
cd PlaybookSolutions
```

然后任选其一即可运行：
- **推荐**：双击根目录 `激活并打开.bat`，浏览器会打开 http://localhost:5555
- 或直接双击根目录 `index.html` 用浏览器打开

无需安装依赖即可浏览所有 HTML 模块；仅 `modules/presentation` 需在该目录下执行 `npm install && npm run dev`。

## 如何新增模块

参见 [ARCHITECTURE.md](./ARCHITECTURE.md) 中的「新增模块流程」章节。

基本步骤：
1. 在 `modules/` 下创建新文件夹
2. 确保包含 `index.html` 作为入口
3. 在根 `index.html` 中添加模块卡片
4. 更新此 README 的模块说明表

## 来源追溯

本项目由以下三个项目合并而成：

| 原始文件夹 | 对应模块 |
|-----------|---------|
| `0125_PlaybookS` | solution-playbook, hub, tools, resources |
| `0131_PlaybookWebsite` | website |
| `0127_PlaybookSolutions` | presentation, style-variants, case-3dprinting, design-variants |

---

*Playbook Solutions v1.0 · Built with Meshy AI · 2026*
