# Playbook Solutions - Quick Start

> 统一入口：`D:\2026\PlaybookSolutions\index.html`

## 项目结构

```text
PlaybookSolutions/                    ← 主项目目录
├── 📁 modules/                        ← 7个独立模块
│   ├── 📁 solution-playbook/          ← 完整行业案例库
│   ├── 📁 website/                    ← 精简版入口网站
│   ├── 📁 hub/                        ← 仪表板总控
│   ├── 📁 presentation/                 ← React交互演示
│   ├── 📁 style-variants/             ← 10种视觉风格
│   ├── 📁 case-3dprinting/            ← 3D打印详细案例
│   └── 📁 design-variants/            ← 设计变体预览
├── 📁 tools/                          ← 转换工具
├── 📁 modules/shared/                 ← 共享资源（CSS 设计系统）
├── 📄 ARCHITECTURE.md                 ← 模块化架构文档
└── 📄 index.html                      ← 统一入口门户
```

## 如何使用 Cursor 继续开发

```bash
# 在 Cursor 中打开主项目
cd D:\2026\PlaybookSolutions
cursor .
```

### 新增 Playbook 方法

1. 在 `modules/` 下创建新目录
2. 包含 `index.html` 作为入口
3. 在根 `index.html` 添加模块卡片
4. 更新 `README.md`

### 关于案例占位符

案例 HTML 中的 `IMG_PLACEHOLDER`、`Video Placeholder`、`placeholder-label` 等均为内容占位符，将在后续内容填充阶段由真实素材替换，开发时无需处理。

## Playbook Solutions 文档

- **README.md** - 项目速览与模块列表
- **ARCHITECTURE.md** - 模块架构与扩展规则
- **reviews/** - 历史审查报告（架构审查、优化建议）
- **visual-fixes-log.md** - 视觉修复记录

---

*Reorganized: 2026-02-10 · Using Technical Co-Founder workflow*
