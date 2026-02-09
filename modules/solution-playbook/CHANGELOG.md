# Changelog

All notable changes to the Meshy Solution Playbook will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Conventional Commits](https://www.conventionalcommits.org/).

---

## [Unreleased]

### Added
- Git version control workflow with conventional commits
- CHANGELOG.md for tracking project changes

---

## [1.3.0] - 2026-01-29

### Added - Phase 3: Visual Enhancement
- CSS 变量统一化：`--transition-fast`, `--transition-normal`, `--transition-slow`, `--ease-out`
- GPU 加速优化：`will-change` 属性应用到动画元素
- 按钮 hover/active 交互反馈（缩放效果）
- 语言切换按钮脉冲动画引导
- `prefers-reduced-motion` 无障碍支持
- 响应式布局：4 断点适配（1200px, 992px, 768px, 480px）
- 移动端性能优化：装饰元素隐藏

### Changed
- 文字颜色从 `#FFFFFF` 调整为 `#f0f0f0`（降低刺眼感）
- 统一动画时长，消除 0.2s-0.5s 混用问题
- 所有页面按钮增加 `scale(1.05)` hover 效果

### Fixed
- 动画帧率优化至稳定 60fps
- 移动端布局溢出问题

---

## [1.2.0] - 2026-01-29

### Added - Phase 2: Industry Expert Optimization
- Gaming 行业：12 个案例页面优化，2 个 WIP 页面完整重写
- Film 行业：5 个案例页面优化，新增痛点和解决方案
- Interior 行业：5 个案例页面优化，工作流程 Slide 新增
- 3D Printing 行业：5 个案例页面优化
- Manufacturing 行业：5 个案例页面优化

### Changed
- 量化指标：模糊的 "∞" 改为具体数值（如 "500+ 变体/周"）
- 术语统一：Whitebox/Demo → Whitebox
- 痛点解决方案：从 3对3 扩展为 4对4 结构
- 英文表达优化：符合行业术语规范

### Fixed
- HTML span 标签 class 属性修复
- 语言切换功能验证通过

---

## [1.1.0] - 2026-01-29

### Added - Phase 1: Content Audit & Analysis
- `phase1-copy-audit.md` - 文案审核报告
- `phase1-feishu-resources.md` - 飞书资源映射（311+ 行）
- `phase1-structure-guide.md` - 结构规范指南（540+ 行）
- 行业术语对照表

### Changed
- 识别并记录高优先级文案问题
- 建立中英文术语统一规范

---

## [1.0.0] - 2026-01-29

### Added
- 初始版本：Meshy Solution Playbook 原始版本
- 主页 `index.html`
- 5 大行业案例结构：
  - Gaming（游戏娱乐）
  - Film（影视动画）
  - 3D Printing（3D 打印）
  - Manufacturing（制造/潮玩）
  - Interior（室内设计）
- 35 个 HTML 页面
- 双语支持（中/英）
- Glitch 视觉主题

---

## Version Tags

| Version | Tag | Description |
|---------|-----|-------------|
| 1.0.0 | `v1.0.0` | 初始版本 |
| 1.1.0 | `v1.1.0` | Phase 1 - 基础分析完成 |
| 1.2.0 | `v1.2.0` | Phase 2 - 行业优化完成 |
| 1.3.0 | `v1.3.0` | Phase 3 - 视觉增强完成 |

---

*Generated: 2026-01-29*
