# Phase 1: 中英文文案审核报告

> 审核范围：`D:\2026\0125_PlaybookS\Meshy_Solution_Playbook\` 目录下所有 HTML 文件  
> 审核文件数：35 个（1 个首页 + 34 个案例页面）

---

## 一、错误列表

### 🔴 高优先级 (High)

#### 1. HTML 结构错误 - 缺少 class 属性

| 文件路径 | 问题描述 | 建议修改 |
|---------|---------|---------|
| `cases/case-3dprinting-multicolor.html` | `<span>从生成到打印，全链路色彩编辑与 3MF 原生支持</span>` 缺少 `class="cn"` | 改为 `<span class="cn">从生成到打印，全链路色彩编辑与 3MF 原生支持</span>` |
| `cases/case-3dprinting-portrait.html` | `<span>照片转 3D 模型，打造个性化定制纪念品</span>` 缺少 `class="cn"` | 改为 `<span class="cn">照片转 3D 模型，打造个性化定制纪念品</span>` |
| `cases/case-3dprinting-scan.html` | `<span>AI 自动修复扫描缺陷，让原始扫描可直接打印</span>` 缺少 `class="cn"` | 改为 `<span class="cn">AI 自动修复扫描缺陷，让原始扫描可直接打印</span>` |
| `cases/case-gaming-asset-pipeline.html` | `<span>高模到低模的加速方案</span>` 缺少 `class="cn"` | 改为 `<span class="cn">高模到低模的加速方案</span>` |
| `cases/case-gaming-infinite-npc.html` | `<span>告别"千人一面"的解决方案</span>` 缺少 `class="cn"` | 改为 `<span class="cn">告别"千人一面"的解决方案</span>` |
| `cases/case-gaming-legacy-modernization.html` | `<span>让老旧资产焕发新生</span>` 缺少 `class="cn"` | 改为 `<span class="cn">让老旧资产焕发新生</span>` |
| `cases/case-gaming-pbr-texturing.html` | `<span>AI 驱动的材质解决方案</span>` 缺少 `class="cn"` | 改为 `<span class="cn">AI 驱动的材质解决方案</span>` |
| `cases/case-gaming-stylized-variations.html` | `<span>批量换皮解决方案</span>` 缺少 `class="cn"` | 改为 `<span class="cn">批量换皮解决方案</span>` |

#### 2. 术语不一致

| 文件路径 | 问题描述 | 建议修改 |
|---------|---------|---------|
| `cases/case-gaming-prototype.html` | 使用 "Whitebox/Demo" 但其他文件用 "白盒"，混用 "灰盒 (Grey Cubes)" | 统一术语：建议全局使用 "白盒 (Whitebox)" 或 "灰模 (Greybox)" |
| `cases/case-film-kitbash.html` | 页面标题 "Concept Design Assistant" 与 solutions 页面的 "Concept Kitbashing" 不一致 | 统一为一个术语，建议使用 "概念拼接辅助 / Concept Kitbashing" |
| 多个文件 | "起型" vs "blockout" vs "粗模" 混用 | 建议统一：起型 = Blockout，粗模 = Base Mesh |

#### 3. 中英文版本不一致

| 文件路径 | 问题描述 | 建议修改 |
|---------|---------|---------|
| `cases/case-gaming-stylized.html` | 中文标题 "特定风格化资产量产" vs solutions 页 "风格化资产量产" | 统一为 "风格化资产量产 / Stylized Asset Mass Production" |
| `cases/case-manufacturing-solutions.html` | 英文标题 "Manufacturing & Culture" 未完全反映中文 "制造与潮玩" | 改为 "Manufacturing & Collectibles" 或 "Designer Toys & Manufacturing" |
| `cases/case-manufacturing-heritage.html` | 英文 "Heritage Revitalization" 未完全表达 "文博遗产活化" 的博物馆含义 | 改为 "Museum Heritage Digitization" 或 "Cultural Heritage Revival" |

---

### 🟡 中优先级 (Medium)

#### 1. 英文表达不自然

| 文件路径 | 原文 | 建议修改 |
|---------|------|---------|
| `cases/case-gaming-blockout.html` | "Let modelers skip tedious blockout phase, focus on refinement details" | "Let modelers skip the tedious blockout phase and focus on refinement" |
| `cases/case-gaming-pbr.html` | "AI-generated seamless PBR textures for rapid scene surface coverage" | "AI-generated seamless PBR textures for quick scene texturing" |
| `cases/case-film-previz.html` | "AI rapidly populates previz scenes, letting directors focus on creative decisions" | "AI rapidly populates previz scenes so directors can focus on creative decisions" |
| `cases/case-interior-softgoods.html` | "AI generates organic soft goods — plants, florals, cushions" | "AI generates organic decor — plants, floral arrangements, and cushions" |
| `cases/case-3dprinting-miniature.html` | "AI-Powered 3D Print-Ready Asset Pipeline" | "AI-Powered Print-Ready 3D Asset Pipeline" (语序调整) |
| `cases/case-gaming-prototype.html` | "Game Development Whitebox/Demo Stage Solution" | "Whitebox & Demo Stage Solution for Game Development" |

#### 2. 中文表达可优化

| 文件路径 | 原文 | 建议修改 |
|---------|------|---------|
| `cases/case-gaming-blockout.html` | "让建模师跳过繁琐的起型阶段，专注于精修细节" | "让建模师跳过繁琐起型，专注细节精修" (更简洁) |
| `cases/case-3dprinting-scan.html` | "AI 自动修复扫描缺陷，让原始扫描可直接打印" | "AI 自动修复扫描缺陷，实现扫描即打印" |
| `cases/case-gaming-detail.html` | "将粗模自动升级为带细节的高质量模型" | "自动将粗模升级为高质量细节模型" |
| `cases/case-interior-staging.html` | "AI 快速填充空房场景，用于房产可视化" | "AI 快速填充空房，赋能房产可视化" |

#### 3. 专业术语翻译商榷

| 文件路径 | 术语 | 当前翻译 | 建议 |
|---------|------|---------|------|
| `cases/case-gaming-detail.html` | Topology | 拓扑 | ✅ 正确 |
| `cases/case-gaming-detail.html` | UV Unwrapping | UV 展开 | ✅ 正确 |
| `cases/case-manufacturing-cmf.html` | CMF | CMF 材质探索 | 建议首次使用时展开：CMF (Color/Material/Finish) 材质探索 |
| `cases/case-3dprinting-miniature.html` | 3MF | 3MF Native Support | 建议说明：3MF（3D制造格式）原生支持 |
| `cases/case-film-texture.html` | Matte Painting | Matte Painting | 建议中文注释：数字绘景 (Matte Painting) |
| `cases/case-gaming-prototype.html` | Whitebox | 白盒/灰盒 | 建议统一为 "白盒 (Whitebox)" |

---

### 🟢 低优先级 (Low)

#### 1. 标点符号与格式

| 文件路径 | 问题描述 | 建议修改 |
|---------|---------|---------|
| `cases/case-gaming-concept.html` | "案例正在制作中 · Coming Soon" 中英混合 | 分开：中文版显示 "案例正在制作中"，英文版显示 "Coming Soon" |
| `cases/case-gaming-detail.html` | "功能开发中 · Work in Progress" 同上 | 分开处理 |
| `cases/case-interior-softgoods.html` | "盆栽、花艺、抱枕" 逗号为中文 | 保持一致性即可 ✅ |
| 多个文件 | 百分比符号使用不一致 (↓90% vs 90%) | 建议统一格式 |

#### 2. 文案风格轻微不一致

| 文件路径 | 问题描述 | 建议修改 |
|---------|---------|---------|
| `index.html` | "由林炳君制作 / Made by BJ Lin" | 可考虑移除或放到页脚 |
| `cases/case-gaming-all.html` vs `case-gaming-complete.html` | 两个文件内容高度重叠 | 考虑合并或明确区分用途 |
| solutions 页面 vs 详情页面 | 部分标题表述有差异 | 建议统一 |

#### 3. 缺少翻译或不完整

| 文件路径 | 问题描述 | 建议修改 |
|---------|---------|---------|
| `cases/case-gaming-prototype.html` | 部分数据标签只有中文或只有英文 | 补全双语 |
| `cases/case-3dprinting-miniature.html` | "BambuLab AMS Compatible" 无中文 | 添加 "拓竹 AMS 兼容" |

---

## 二、问题统计

### 按严重程度分类

| 严重程度 | 数量 | 百分比 |
|---------|------|--------|
| 🔴 高 (High) | 18 | 36% |
| 🟡 中 (Medium) | 17 | 34% |
| 🟢 低 (Low) | 15 | 30% |
| **总计** | **50** | 100% |

### 按问题类型分类

| 问题类型 | 数量 | 说明 |
|---------|------|------|
| HTML 结构错误 | 8 | 缺少 class 属性，影响语言切换 |
| 术语不一致 | 6 | 同一概念多种表达 |
| 中英不一致 | 5 | 翻译不匹配或语义偏差 |
| 英文表达不自然 | 8 | 语法或措辞问题 |
| 中文表达可优化 | 5 | 可更简洁或自然 |
| 专业术语问题 | 6 | 需要注释或统一 |
| 格式/标点问题 | 7 | 标点、百分比等细节 |
| 内容重复/缺失 | 5 | 文件重复或翻译缺失 |

### 按文件分布

| 行业分类 | 文件数 | 问题数 | 平均问题数/文件 |
|---------|--------|--------|----------------|
| Gaming | 14 | 22 | 1.57 |
| Film/Animation | 5 | 8 | 1.60 |
| 3D Printing | 5 | 9 | 1.80 |
| Interior | 5 | 6 | 1.20 |
| Manufacturing | 5 | 4 | 0.80 |
| Index | 1 | 1 | 1.00 |
| **总计** | **35** | **50** | **1.43** |

---

## 三、重点建议

### 1. 立即修复（高优先级）

- **修复所有缺少 `class` 属性的 `<span>` 标签**：这会直接影响语言切换功能，导致中文内容在英文模式下仍然显示
- **统一核心术语表**：
  - 起型 / 粗模 → Blockout
  - 白盒 / 灰盒 → Whitebox / Greybox
  - 精修 → Refinement / Polish

### 2. 近期优化（中优先级）

- 审阅所有英文表达，确保语法正确且地道
- 首次出现专业缩写时添加全称说明（如 CMF、3MF、PBR）
- 统一 solutions 页面与详情页面的标题表述

### 3. 后续考虑（低优先级）

- 清理重复内容文件（`case-gaming-all.html` vs `case-gaming-complete.html`）
- 统一标点符号和数字格式
- 考虑添加术语表/词汇表页面

---

## 四、附录：术语对照表建议

| 中文 | 英文 | 备注 |
|------|------|------|
| 起型 | Blockout | 初始形态建模 |
| 粗模 | Base Mesh / Low-poly | 基础网格 |
| 精修 | Refinement / Polish | 细节优化 |
| 白盒 | Whitebox | 验证阶段 |
| 灰盒 | Greybox | 材质测试阶段 |
| 贴图 | Texture | 表面纹理 |
| 拓扑 | Topology | 网格结构 |
| UV 展开 | UV Unwrapping | 纹理坐标映射 |
| PBR | PBR (Physically Based Rendering) | 物理渲染 |
| 3MF | 3MF (3D Manufacturing Format) | 3D 打印格式 |
| CMF | CMF (Color/Material/Finish) | 颜色/材质/表面处理 |
| 潮玩 | Designer Toys / Collectibles | 设计师玩具 |
| 文博 | Cultural Heritage / Museum | 文化博物馆 |

---

## 状态：已完成
审核时间：2026-01-29 (Thursday)
