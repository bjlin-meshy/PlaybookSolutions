# Playbook Solutions — 优化审查报告

**审查时间**: 2026-02  
**方法**: 结构扫描 + Code Review 清单 + 既有架构审查对照  
**目的**: 标出非常需要优化与建议优化项，便于按优先级执行

---

## 一、🔴 非常需要优化（建议优先修复）

### 1. 案例 HTML 中的字面量 `` `n `` 导致样式/脚本未加载

| 项目 | 说明 |
|------|------|
| **问题** | 多处 `<link>` 与 `<script>` 之间被写成了字面量 `` `n ``（应为换行），导致第二个标签被当成文本，**第二个 CSS/JS 未加载**。 |
| **影响** | `cursor-effects.css` / `cursor-effects.js` 在多数案例页未生效，动效与交互可能异常。 |
| **位置** | 约 18 个 case 文件，见下表。 |
| **修复** | 将 `` `n `` 改为实际换行（删除 `` `n ``，保留换行）。 |

**涉及文件（建议批量替换）**：

- `case-3dprinting-miniature.html`
- `case-gaming-asset-pipeline.html`
- `case-gaming-complete.html`
- `case-gaming-infinite-npc.html`
- `case-gaming-legacy-modernization.html`
- `case-gaming-stylized-variations.html`
- `case-gaming-stylized.html`
- `case-gaming-pbr.html`
- `case-gaming-pbr-texturing.html`
- `case-gaming-detail.html`
- `case-gaming-concept.html`
- `case-manufacturing-ideation.html`
- `case-manufacturing-cmf.html`
- `case-manufacturing-blindbox.html`
- `case-3dprinting-portrait.html`
- `case-3dprinting-scan.html`
- `case-3dprinting-multicolor.html`

**建议**：全局搜索 `` `n ``（或 `` >`n    < ``）替换为 `` >\n    < ``（真实换行），或使用脚本批量处理。

---

### 2. presentation 模块缺 favicon（/vite.svg 404）

| 项目 | 说明 |
|------|------|
| **问题** | `modules/presentation/index.html` 引用了 `/vite.svg`，仓库中无此文件，控制台 404。 |
| **影响** | 仅影响 favicon 显示，不影响功能。 |
| **修复** | 在 `presentation/public/` 下添加 `vite.svg`，或将 `index.html` 中 favicon 链接改为现有图标/移除。 |

---

### 3. sync-manifest 与“文博遗产”资源一致性与可发现性

| 项目 | 说明 |
|------|------|
| **问题** | `sync-manifest.json` 中 `manufacturing-heritage` 的 `resourceFolder` 已改为 `resources/lanting-museum`，但该目录下已无 `lanting-museum.html`（已删除），仅剩 `.md` 与设计文档。 |
| **影响** | 若同步/脚本依赖“该目录下存在可展示 HTML”会报错或行为不一致；若仅依赖 .md 则无影响。 |
| **修复** | 确认同步逻辑是否只读 .md；若需要“案例页”，则 canonical 为 `cases/case-manufacturing-heritage.html`，manifest 中可注明 `htmlFile` 为唯一展示入口，`resourceFolder` 仅作 Markdown 资源目录。 |

---

## 二、🟡 建议优化（结构 / 可发现性 / 一致性）

### 4. style-variants 无入口页，10 个风格仅 01 被门户链接

| 项目 | 说明 |
|------|------|
| **问题** | 根 `index.html` 只链接到 `01-cyberpunk.html`，02–10 未在门户暴露，用户难以发现。 |
| **建议** | 在 `modules/style-variants/` 增加 `index.html`，列出 01–10 的导航；根门户可改为链接到该 `index.html`（与 case-3dprinting 一致）。 |

---

### 5. design-variants 无 index.html，入口为 all-designs-preview.html

| 项目 | 说明 |
|------|------|
| **问题** | 与“模块入口尽量为 index.html”的约定不一致，但当前文档已说明，可接受。 |
| **建议** | 若希望统一，可增加 `index.html` 做重定向到 `all-designs-preview.html`，或保持现状并在 ARCHITECTURE 中明确“design-variants 入口为 all-designs-preview.html”。 |

---

### 6. hub 下的 online_viewer_net.htm 未从任何入口链接

| 项目 | 说明 |
|------|------|
| **问题** | 该文件为“孤儿页”，仅能通过直接 URL 访问。 |
| **建议** | 若仍在使用，在 hub 的 `Playbooks.htm` 或文档中增加说明/链接；若已废弃，可移入归档或删除。 |

---

### 7. solution-playbook 内重复 CSS 与内联样式（历史架构审查已指出）

| 项目 | 说明 |
|------|------|
| **问题** | `reviews/ARCHITECTURE_REVIEW_20250210.md` 已指出：多文件重复 `:root`、大量内联 `<style>`，修改品牌色需动 10+ 文件。 |
| **建议** | 中长期：为 solution-playbook 引入 `modules/shared/css/design-system.css` 或本模块统一 `variables.css`，案例页通过 `<link>` 引用，逐步抽离内联样式。可拆成多期做，先做 1–2 个案例试点。 |

---

### 8. case-gaming-stylized 与 case-gaming-stylized-variations 命名与 manifest 一致

| 项目 | 说明 |
|------|------|
| **问题** | sync-manifest 中 “Stylized Variations” 指向 `case-gaming-stylized-variations.html`，而 `case-gaming-solutions.html` 可能链到 `case-gaming-stylized.html`，两页内容不同（Mass Production vs Variations）。 |
| **建议** | 在 solution-playbook 内确认“行业入口→具体案例”的链接与 sync-manifest、README 描述一致，避免用户点进错误案例。 |

---

## 三、🟢 可选 / 后续优化

### 9. 孤儿资源（仅通过直接 URL 可访问）

- `modules/solution-playbook/assets/demos/stylized-production-animated.html`
- `modules/solution-playbook/assets/icons/icon-preview.html`
- `modules/style-variants/02-blueprint.html` … `10-neumorphism.html`（若已加 style-variants/index.html 则自然可发现）

**建议**：若需“全部页面可从门户或模块内导航到达”，再为 demos/icons 加入口或从文档说明用途。

---

### 10. presentation 性能与 Vite 配置（架构审查已提及）

- React 组件 inline styles、缺少 useMemo/useCallback 等（见 ARCHITECTURE_REVIEW）。
- Vite `base`、构建优化等可在后续迭代中补齐。

---

## 四、优先级建议（与 Superpowers / 分批执行思路一致）

| 优先级 | 项 | 说明 |
|--------|----|------|
| P0 | 1. 修复 `` `n `` 字面量 | 影响多案例页样式与脚本加载，批量替换即可，风险低。 |
| P1 | 2. presentation favicon | 小改动，消除 404。 |
| P1 | 3. sync-manifest / lanting-museum | 确认语义后更新文档或 manifest 注释。 |
| P2 | 4. style-variants 增加 index.html | 提升可发现性，与现有模块风格一致。 |
| P2 | 6. hub online_viewer_net 说明或归档 | 避免“未链接即视为废弃”的歧义。 |
| P2 | 8. 案例链接与 manifest 一致性 | 核对并统一入口。 |
| P3 | 5、7、9、10 | 结构统一、CSS 抽离、孤儿资源、React/Vite 优化，可按排期分步做。 |

---

## 五、可用的工具与流程建议

- **批量替换 `` `n ``**：用 Cursor 全局搜索 `>``n    <`（或按实际格式），在 `modules/solution-playbook/cases/` 下替换为换行。
- **验证**：修完后在浏览器中打开若干案例页，检查开发者工具 Network 中 `cursor-effects.css` / `cursor-effects.js` 是否 200 加载。
- **Context7**：若后续做 PWA、设计系统、Vite 等升级，可用 Context7 查最新文档与最佳实践。
- **Superpowers**：执行时可沿用「小批量任务 + 验收门控」；P0 做完可做一次 verification-before-completion 再收工。

---

*本报告由结构扫描 + Code Review 清单 + 既有 reviews 综合生成，便于按优先级推进优化。*
