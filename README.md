# 思维模式评估系统

## 项目概述

这是一个基于 Next.js 13+ 开发的思维模式评估系统。该系统允许用户完成思维模式问卷，并生成详细的分析报告。系统采用现代化的 UI 设计，支持响应式布局，并提供 PDF 导出功能。

## 技术栈

- **框架**: Next.js 13+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图表**: Recharts
- **图标**: Lucide React
- **PDF 导出**: html2canvas, jsPDF
- **字体**: Geist Font Family

## 项目结构

````
src/
├── app/                      # Next.js 应用主目录
│   ├── layout.tsx           # 根布局组件
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式
│   ├── mindset/            # 思维模式问卷模块
│   │   ├── page.tsx       # 问卷说明页
│   │   └── question/      # 问题模块
│   │       ├── page.tsx   # 问题页面
│   │       └── questionsData.ts  # 问题数据
│   └── result/             # 结果页面模块
│       └── page.tsx       # 结果展示页面
├── components/             # 共享组件
│   ├── common/            # 通用组件
│   │   └── Navbar.tsx    # 导航栏组件
│   ├── result/            # 结果相关组件
│   │   ├── config/       # 结果配置
│   │   │   ├── dimensions.ts   # 维度分析配置
│   │   │   └── types.ts        # 类型定义
│   │   ├── CustomAxisTick.tsx  # 自定义图表刻度组件
│   │   ├── DimensionPanel.tsx  # 维度面板组件
│   │   └── index.tsx           # 结果主组件
│   └── ExportButton.tsx   # PDF导出按钮组件
└── fonts/                  # 字体文件目录

## 核心功能模块

### 1. 问卷系统
- 多部分问题展示
- 实时进度跟踪
- 答案本地存储
- 分步导航

### 2. 结果分析
- 维度得分计算
- 雷达图可视化
- 详细分析报告
- 建议生成

### 3. 数据管理
- localStorage 数据持久化
- 答案数据结构化存储
- 结果数据处理和转换

### 4. 用户界面
- 响应式设计
- 进度指示
- 交互反馈
- PDF报告导出

## 关键数据结构

### 1. 问题数据结构
```typescript
interface Section {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: number;
  text: string;
}
````

### 2. 答案数据结构

```typescript
interface AnswerData {
  answers: Record<string, number>
  timestamp: string
  totalQuestions: number
  completedQuestions: number
}
```

### 3. 结果数据结构

```typescript
interface IAssessmentResults {
  dimensionScores: {
    growth: number
    coping: number
    selfAwareness: number
    openness: number
  }
  dimensionLevels: {
    growth: string
    coping: string
    selfAwareness: string
    openness: string
  }
  totalScore: number
  totalLevel: string
}
```

## 工作流程

1. **问卷流程**:

   - 用户从首页进入问卷
   - 阅读说明并开始答题
   - 逐题作答，支持前后导航
   - 完成后自动保存并跳转到结果页

2. **结果生成**:

   - 读取本地存储的答案数据
   - 计算各维度得分
   - 确定水平评级
   - 生成详细分析和建议

3. **报告导出**:
   - 用户点击导出按钮
   - 系统将页面转换为图片
   - 生成 PDF 文档
   - 自动下载到本地

## 部署要求

- Node.js 16+
- npm 或 yarn
- 现代浏览器支持

## 启动项目

```bash
# 安装依赖
npm install

# 开发环境运行
npm run dev

# 生产环境构建
npm run build

# 生产环境运行
npm start
```

## 配置说明

1. **问题配置**:

   - 在 `questionsData.ts` 中定义问题内容
   - 可自定义问题数量和类别

2. **维度配置**:

   - 在 `dimensions.ts` 中定义评估维度
   - 配置分数区间和对应的分析内容

3. **UI 配置**:
   - 通过 Tailwind CSS 类自定义样式
   - 可在 globals.css 中添加自定义样式

## 注意事项

1. **数据存储**:

   - 目前使用 localStorage 存储答案
   - 需注意浏览器存储限制

2. **性能优化**:

   - PDF 生成可能需要一定时间
   - 建议添加加载状态提示

3. **浏览器兼容**:
   - 确保目标浏览器支持 ES6+
   - 测试不同设备的响应式布局

## 后续开发建议

1. **功能扩展**:

   - 添加用户账号系统
   - 实现数据后端存储
   - 添加结果历史记录
   - 优化 PDF 导出样式

2. **性能优化**:

   - 实现组件懒加载
   - 优化大数据处理
   - 添加服务端渲染

3. **用户体验**:
   - 添加问卷进度保存
   - 优化移动端体验
   - 增加更多交互动画
   - 添加深色模式支持
