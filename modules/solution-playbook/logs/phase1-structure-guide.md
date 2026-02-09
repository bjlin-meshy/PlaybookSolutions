# Phase 1 - 结构规范指南

**生成日期**: 2026-01-29  
**基于**: structure-audit-log.md 审核结果 + case-3dprinting-miniature.html 最佳实践  
**目标**: 为 Phase 2 行业专家 Agent 提供统一的结构标准

---

## 标准页面结构模板

所有案例页面必须遵循以下 **5 个核心 Slide** 结构：

### Slide 1: Cover（封面页）
**必需元素**:
- 大图标（`.section-big-icon`，80px，行业相关图标）
- 主标题（`.slide-title`，52px，中英文双语）
- 副标题（`.slide-desc`，24px，描述解决方案定位）
- 行业标签（带背景色和边框的徽章）

**示例结构**:
```html
<div class="slide active">
  <div class="section-big-icon"><i class="fa-solid fa-[行业图标]"></i></div>
  <h1>
    <span class="en">Solution Title</span>
    <span class="cn">解决方案标题</span>
  </h1>
  <p class="slide-desc">
    <span class="en">Brief description</span>
    <span class="cn">简短描述</span>
  </p>
  <div style="行业标签">
    <span class="en">INDUSTRY NAME</span>
    <span class="cn">行业名称</span>
  </div>
</div>
```

---

### Slide 2: Challenge vs Solution（痛点 vs 解决方案对比）
**必需元素**:
- Section Tag: "THE CHALLENGE" / "行业痛点"
- 主标题：描述核心挑战
- VS 对比布局（`.versus-container`）
  - 左侧：Pain Points（4 条，红色主题）
  - 中间：VS 徽章
  - 右侧：Meshy Solution（4 条，绿色/黄色主题）

**痛点格式要求**:
- 每条痛点包含：图标 + 标题 + 描述
- 标题：15px，加粗
- 描述：13px，灰色，解释具体问题

**解决方案格式要求**:
- 与痛点一一对应（4 对 4）
- 每条解决方案包含：图标 + 标题 + 描述
- 强调 Meshy 的具体能力

**示例结构**:
```html
<div class="versus-container">
  <div class="versus-side pain-side">
    <div class="versus-header">
      <div class="versus-icon pain-icon">❌</div>
      <h3>痛点标题</h3>
    </div>
    <div class="versus-items">
      <!-- 4条痛点 -->
      <div class="versus-item">
        <div class="item-icon">🎨</div>
        <div>
          <div class="item-title">痛点标题</div>
          <div class="item-desc">痛点描述</div>
        </div>
      </div>
    </div>
  </div>
  <div class="versus-divider"><div class="vs-badge">VS</div></div>
  <div class="versus-side sol-side">
    <!-- 4条解决方案，与痛点对应 -->
  </div>
</div>
```

---

### Slide 3: Business Value / Key Metrics（商业价值/量化指标）
**必需元素**:
- Section Tag: "BUSINESS VALUE" / "商业价值"
- 3-4 个量化指标（`.metric-box`）
- 每个指标包含：数值 + 标签 + 副标题

**量化指标格式规范**:
- 数值（`.metric-val`）：64px，加粗，使用 `var(--accent-primary)` 颜色
- 标签（`.metric-label`）：20px，白色，加粗
- 副标题（`.metric-sub`）：14px，灰色，提供上下文

**指标类型要求**:
1. **效率提升**：时间节省、速度提升（如 "10x"、"90%"）
2. **成本降低**：成本节省、零成本（如 "$0"、"↓80%"）
3. **业务验证**：真实案例数据（如 "$25K Kickstarter"、"3x 迭代速度"）
4. **能力扩展**：无限可能、规模化（如 "∞"、"100+变体"）

**避免模糊表述**:
- ❌ "Real-time" → ✅ "<5分钟生成" 或 "平均3分钟/资产"
- ❌ "∞" → ✅ "理论无限，实测100+变体/小时"
- ❌ "Fast" → ✅ "2x迭代速度" 或 "90%时间节省"

**示例结构**:
```html
<div class="cols-3-metrics" style="grid-template-columns: repeat(4, 1fr);">
  <div class="metric-box">
    <div class="metric-val">10x</div>
    <div class="metric-label">生产速度提升</div>
    <div class="metric-sub">单个模型从数天缩短到数分钟</div>
  </div>
  <!-- 其他3个指标 -->
</div>
```

---

### Slide 4: Workflow Overview（工作流程概览）
**必需元素**:
- Section Tag: "WORKFLOW DEMO" / "落地工作流演示"
- 主标题：描述完整流程
- 工作流步骤导航（`.workflow-container`）
- 3-4 个步骤，每步包含：步骤编号 + 标题 + 简短描述

**工作流步骤格式**:
- 步骤编号：`.step-num`，12px，黄色，加粗
- 步骤标题：`.step-title`，16px，白色，加粗
- 步骤描述：`.step-desc`，12px，灰色，可换行

**示例结构**:
```html
<div class="workflow-container">
  <div class="workflow-step">
    <div class="step-num">STEP 01</div>
    <div class="step-title">步骤标题</div>
    <div class="step-desc">步骤描述</div>
  </div>
  <div class="workflow-arrow">→</div>
  <!-- 其他步骤 -->
</div>
```

---

### Slide 5-8: Workflow Steps（详细步骤展示）
**必需元素**:
- 工作流导航条（`.workflow-nav`）：显示当前步骤和进度
- 步骤内容（`.case-content`）：
  - 步骤徽章（`.case-step-badge`）
  - 步骤标题（`.case-title`）
  - 内容展示（`.showcase-card-large` 或 `.showcase-card`）

**工作流导航条格式**:
- 4 个步骤指示器（`.workflow-step-mini`）
- 当前步骤：`.active` 状态（黄色高亮）
- 已完成步骤：`.completed` 状态（带 ✓ 图标）
- 步骤间连接线（`.workflow-connector`）

**步骤数量要求**:
- 最少 3 步，最多 4 步
- 每步一个独立 Slide
- 最后一步后接 Final Result Slide

**示例结构**:
```html
<div class="workflow-nav">
  <div class="workflow-step-mini active" data-step="1">
    <div class="step-indicator">01</div>
    <div class="step-label">步骤名称</div>
  </div>
  <div class="workflow-connector"></div>
  <!-- 其他步骤 -->
</div>
<div class="case-content">
  <div class="case-header">
    <div class="case-step-badge">STEP 01: 步骤名称</div>
    <h2 class="case-title">步骤详细标题</h2>
  </div>
  <div class="case-single">
    <div class="showcase-card-large">
      <!-- 步骤内容 -->
    </div>
  </div>
</div>
```

---

### Slide 9: Final Result（最终成果展示）
**必需元素**:
- 工作流导航条：所有步骤标记为 `.completed`
- Final Result 徽章（`.case-step-badge.final`）：黄色背景，黑色文字
- 成果展示：2x2 网格或单一大卡片
- 展示内容：360° 旋转渲染、场景渲染、对比图等

**示例结构**:
```html
<div class="case-step-badge final">FINAL RESULT</div>
<h2 class="case-title">最终成果标题</h2>
<div class="case-grid">
  <div class="showcase-card">
    <div class="showcase-icon">图标</div>
    <div class="showcase-title">成果1</div>
    <div class="showcase-desc">描述</div>
  </div>
  <!-- 其他成果卡片 -->
</div>
```

---

## 量化指标规范

### 指标分类

#### 1. 效率指标
**格式**: `倍数` 或 `百分比`
- ✅ "10x"（10倍提升）
- ✅ "90%"（90%时间节省）
- ✅ "2x"（2倍迭代速度）
- ❌ "Fast"、"Quick"（模糊表述）

#### 2. 成本指标
**格式**: `$金额` 或 `↓百分比`
- ✅ "$0"（零成本）
- ✅ "↓80%"（成本降低80%）
- ✅ "$25K"（真实案例金额）
- ❌ "Cheap"、"Low cost"（模糊表述）

#### 3. 时间指标
**格式**: `具体时间` 或 `时间对比`
- ✅ "<5分钟生成"
- ✅ "Days → Minutes"（天数到分钟）
- ✅ "24h"（24小时）
- ❌ "Real-time"、"Instant"（模糊表述）

#### 4. 规模指标
**格式**: `具体数量` 或 `∞ + 说明`
- ✅ "100+变体/小时"
- ✅ "∞" + "理论无限，实测100+变体/小时"
- ✅ "10+"（10个以上）
- ❌ 单独的 "∞"（需配说明）

### 指标验证要求

每个指标必须满足以下之一：
1. **真实案例数据**：来自实际客户案例（如 "$25K Kickstarter"）
2. **可计算数据**：基于工作流时间对比（如 "10x" = 传统10天 vs Meshy 1天）
3. **行业标准对比**：与传统方法对比（如 "90%时间节省"）

---

## 最佳实践案例

### 参考文件
**`case-3dprinting-miniature.html`**（评分：10/10）

### 核心亮点

#### 1. 痛点 vs 解决方案（4 对 4 完美对应）
```
痛点1: 单色模型需手工上色
  ↓
解决方案1: 全彩直出，无需上色

痛点2: 模型破面无法打印
  ↓
解决方案2: 3MF 格式原生支持

痛点3: 切片软件修复繁琐
  ↓
解决方案3: BambuLab AMS 完美适配

痛点4: 单件成本高
  ↓
解决方案4: 可规模化定制
```

#### 2. 量化指标（4 个，含真实案例）
- **10x**：生产速度提升（Days → Minutes）
- **$0**：上色成本（Full-color prints directly from AI）
- **$25K**：Kickstarter Success（Thorn's Tavern: $25K in 7 days）✅ 真实案例
- **∞**：定制选项（Any prompt = unique product）

#### 3. 工作流程（4 步清晰）
1. Customer Input（客户输入）
2. Meshy Generation（AI 生成）⭐ 核心步骤
3. ZBrush Polish（精修，可选）
4. Print & Ship（打印发货）

#### 4. 双语支持
- 所有文本元素都有 `<span class="en">` 和 `<span class="cn">`
- 语言切换功能完整（`.control-lang`）
- 字体自动切换（`body.lang-cn` 使用 Noto Sans SC）

#### 5. 视觉流程
- 工作流导航条交互完整
- 步骤间有连接线和状态指示
- 最终成果展示清晰（360° 旋转 + 场景渲染）

---

## 待改进页面清单

### 评分低于 9 分的页面（需优先完善）

#### 评分 8 分（框架完整，待补充细节）
**游戏行业**:
- `case-gaming-pbr.html` - 需补充完整量化数据

**电影行业**:
- `case-film-stylized.html`
- `case-film-kitbash.html`
- `case-film-texture.html`

**3D打印行业**:
- `case-3dprinting-portrait.html`
- `case-3dprinting-scan.html`
- `case-3dprinting-multicolor.html`

**室内设计行业**:
- `case-interior-softgoods.html`
- `case-interior-decor.html`
- `case-interior-fabric.html`
- `case-interior-staging.html`

**制造/潮玩行业**:
- `case-manufacturing-heritage.html`
- `case-manufacturing-ideation.html`
- `case-manufacturing-cmf.html`

**改进要求**:
- [ ] 补充完整的痛点 vs 解决方案（4 对 4）
- [ ] 添加具体量化指标（避免模糊表述）
- [ ] 完善工作流程步骤（3-4 步）
- [ ] 替换占位符为真实视觉内容

#### 评分 7 分（WIP 状态，需尽快完善）
- `case-gaming-concept.html` - Coming Soon 页面
- `case-gaming-detail.html` - 待验证内容

**改进要求**:
- [ ] 参照 `case-3dprinting-miniature.html` 补全所有结构
- [ ] 优先完成内容填充

---

## 后续 Agent 须遵循规则

### Phase 2 行业专家 Agent 工作流程

#### 1. 页面结构检查清单
在开始编写任何案例页面前，必须确认：
- [ ] 5 个核心 Slide 结构完整
- [ ] Slide 2 痛点与解决方案一一对应（4 对 4）
- [ ] Slide 3 包含 3-4 个具体量化指标
- [ ] Slide 4 工作流程清晰（3-4 步）
- [ ] 所有文本元素包含中英文双语

#### 2. 量化指标编写规则

**必须遵循**:
1. **具体数值优先**：使用 "10x"、"90%"、"$25K" 等具体数字
2. **避免模糊表述**：不使用 "Fast"、"Real-time"、"∞"（除非配说明）
3. **真实案例优先**：优先使用实际客户案例数据
4. **可验证性**：每个指标必须可追溯或可计算

**指标格式模板**:
```html
<div class="metric-box">
  <div class="metric-val">[具体数值]</div>
  <div class="metric-label">[指标名称]</div>
  <div class="metric-sub">[上下文说明]</div>
</div>
```

#### 3. 痛点 vs 解决方案对应规则

**必须遵循**:
1. **数量对应**：痛点数量 = 解决方案数量（推荐 4 对 4）
2. **逻辑对应**：每个解决方案必须直接解决对应的痛点
3. **格式统一**：使用相同的图标风格和描述长度

**对应关系检查**:
```
痛点1: [问题描述]
  ↓ 必须对应
解决方案1: [Meshy如何解决]

痛点2: [问题描述]
  ↓ 必须对应
解决方案2: [Meshy如何解决]
```

#### 4. 工作流程编写规则

**必须遵循**:
1. **步骤数量**：3-4 步（最少 3 步，最多 4 步）
2. **核心步骤突出**：Meshy 生成步骤必须存在且高亮（`.highlight`）
3. **步骤命名**：使用 "STEP 01"、"STEP 02" 格式
4. **导航条同步**：工作流导航条必须与详细步骤 Slide 同步

**工作流模板**:
```
STEP 01: [输入/准备]
  ↓
STEP 02: Meshy Generation ⭐ 核心
  ↓
STEP 03: [可选精修/优化]
  ↓
STEP 04: [输出/交付]
```

#### 5. 双语支持规则

**必须遵循**:
1. **所有文本元素**：标题、描述、按钮、标签都必须双语
2. **格式统一**：使用 `<span class="en">` 和 `<span class="cn">`
3. **语言切换**：确保 `.control-lang` 按钮功能正常
4. **字体适配**：中文使用 Noto Sans SC，英文使用 Inter/Urbanist

**双语格式模板**:
```html
<h2>
  <span class="en">English Title</span>
  <span class="cn">中文标题</span>
</h2>
```

#### 6. 视觉内容要求

**当前状态**:
- 所有页面使用占位符（"Image Placeholder" / "Video Placeholder"）

**Phase 2 要求**:
- [ ] 优先补充 3D 模型渲染图
- [ ] 添加 Meshy 生成过程录屏
- [ ] 使用真实案例截图
- [ ] 替换所有占位符

**占位符格式**:
```html
<div class="placeholder-label">
  <span class="en">Image Placeholder</span>
  <span class="cn">图片占位</span>
</div>
```

#### 7. 代码质量要求

**必须遵循**:
1. **HTML 结构**：使用语义化标签，保持缩进一致
2. **CSS 类名**：使用现有样式类，不创建新类（除非必要）
3. **JavaScript**：复用现有脚本逻辑，确保导航和语言切换正常
4. **响应式**：确保在不同屏幕尺寸下正常显示

#### 8. 审核自检清单

在提交页面前，Agent 必须自检：
- [ ] 5 个核心 Slide 结构完整
- [ ] 痛点与解决方案一一对应（4 对 4）
- [ ] 量化指标具体且可验证（3-4 个）
- [ ] 工作流程清晰（3-4 步）
- [ ] 所有文本双语支持
- [ ] 工作流导航条功能正常
- [ ] 语言切换功能正常
- [ ] 键盘导航正常（方向键、空格键、L 键、ESC）
- [ ] 点击导航正常（左右点击切换）

#### 9. 参考优先级

**第一优先级**（必须参考）:
- `case-3dprinting-miniature.html` - 10/10 标杆案例

**第二优先级**（可参考结构）:
- `case-gaming-prototype.html` - 9/10
- `case-gaming-blockout.html` - 9/10
- `case-gaming-stylized.html` - 9/10
- `case-film-previz.html` - 9/10
- `case-manufacturing-blindbox.html` - 9/10

#### 10. 禁止事项

**严格禁止**:
- ❌ 创建 "Coming Soon" 页面（必须完整内容）
- ❌ 使用模糊量化指标（"Fast"、"Real-time" 等）
- ❌ 痛点与解决方案不对应
- ❌ 缺少双语支持
- ❌ 工作流程少于 3 步或多于 4 步
- ❌ 跳过核心结构 Slide

---

## 评分标准参考

### 10 分标准（完美）
- ✅ 所有结构完整
- ✅ 量化指标具体，有真实案例/数据支撑
- ✅ 痛点与解决方案完美对应（4 对 4）
- ✅ 工作流程清晰完整
- ✅ 双语支持完整
- ✅ 视觉内容真实（无占位符）

### 9 分标准（优秀）
- ✅ 结构完整
- ✅ 量化指标明确
- ⚠️ 占位符待替换
- ✅ 其他要求满足

### 8 分标准（良好）
- ✅ 结构框架存在
- ⚠️ 需补充具体内容
- ⚠️ 量化指标可更具体
- ⚠️ 部分内容待验证

### 7 分标准（待完善）
- ⚠️ WIP 状态
- ⚠️ 基础框架待完善
- ❌ 内容缺失

---

## 状态：已完成

**生成时间**: 2026-01-29  
**基于文件**: 
- `logs/structure-audit-log.md`
- `cases/case-3dprinting-miniature.html`

**后续行动**:
- Phase 2 行业专家 Agent 应严格遵循本指南
- 优先完善评分 7-8 分的页面
- 所有新页面必须达到 9 分以上标准
