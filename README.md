# Playbook Solutions

> Meshy AI 行业解决方案 — 模块化统一平台

## 快速开始

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
├── resources/                  ← 共享资源（Markdown 内容）
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
| **case-3dprinting** | HTML | ✅ 直接打开 01-cover.html | 8 页 PPT 式案例展示 |
| **design-variants** | HTML/Node.js | ✅ 预览 / ⚠️ 导出需 Node | 设计方案对比预览 |

## 覆盖行业

- 🎮 **Gaming** — 风格化资产、PBR 贴图、NPC 生成、白盒加速
- 🎬 **Film & Animation** — 预演、Kitbash、风格化、贴图
- 🏭 **Manufacturing** — 快速创意、CMF 探索、盲盒设计
- 🛋️ **Interior Design** — 虚拟样板间、定制家具、织物纹理
- 🖨️ **3D Printing** — 微缩模型定制、多色打印、人像扫描

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
