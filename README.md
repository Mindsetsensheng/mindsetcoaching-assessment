# 思维模式与心理弹性评估系统

## 项目概述

这是一个基于 Next.js 13+ 开发的综合评估系统，包含思维模式和心理弹性两个评估模块。系统采用现代化的 UI 设计，支持响应式布局，并提供图片格式的报告导出功能。

## 技术栈

- **框架**: Next.js 13+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件**: Headless UI
- **图表**: Recharts
- **图标**: Lucide React
- **图片导出**: html2canvas
- **字体**: Geist Font Family

## 评估体系

### 思维模式评估

- 成长型思维
- 应对方式
- 自我认知
- 开放性思维

### 心理弹性评估

- 压力应对
- 情绪调节
- 适应能力
- 问题解决
- 社会支持网络

## 项目结构

src/
├── app/ # Next.js 应用主目录
│ ├── layout.tsx # 根布局组件
│ ├── page.tsx # 首页
│ ├── globals.css # 全局样式
│ ├── mindset/ # 思维模式问卷模块
│ │ ├── page.tsx # 问卷说明页
│ │ ├── question/ # 问题模块
│ │ │ ├── page.tsx # 问题页面
│ │ │ └── questionsData.ts # 问题数据
│ │ └── result/ # 结果页面模块
│ │ └── page.tsx # 结果展示页面
│ ├── resilience/ # 心理弹性问卷模块
│ │ ├── page.tsx # 问卷说明页
│ │ ├── question/ # 问题模块
│ │ │ ├── page.tsx # 问题页面
│ │ │ └── questionsData.ts # 问题数据
│ │ └── result/ # 结果页面模块
│ │ └── page.tsx # 结果展示页面
│ └── result/ # 通用结果页面
│ └── page.tsx # 结果页面组件
├── components/ # 共享组件
│ ├── common/ # 通用组件
│ │ ├── Navbar.tsx # 导航栏组件
│ │ ├── SupportModal.tsx # 支持模态框
│ │ └── QRCodeModal.tsx # 二维码模态框
│ ├── result/ # 结果相关组件
│ │ ├── config/ # 结果配置
│ │ │ ├── mindset_dimensions.ts # 思维模式维度配置
│ │ │ ├── resilience_dimensions.ts # 心理弹性维度配置
│ │ │ └── types.ts # 类型定义
│ │ ├── CustomAxisTick.tsx # 自定义图表刻度组件
│ │ ├── DimensionPanel.tsx # 维度面板组件
│ │ ├── MindsetResult.tsx # 思维模式结果组件
│ │ ├── ResilienceResult.tsx # 心理弹性结果组件
│ │ └── index.tsx # 结果主组件
│ └── ExportButton.tsx # 导出按钮组件
└── public/ # 公共资源目录
└── images/ # 图片资源目录
├── logo.png # 网站 logo
├── SenShengLAB_scan_search.png # 公众号二维码
└── wechatmoneyreceiveQRcode.jpg # 支持二维码

## 核心功能模块

### 1. 导航系统

- 响应式导航栏
- 公众号关注功能
- 支持我们功能
- 模态框交互

### 2. 问卷系统

- 思维模式问卷（4 个部分）
- 心理弹性问卷（5 个部分）
- 实时进度跟踪
- 答案本地存储
- 分步导航

### 3. 结果分析

- 多维度评分计算
- 雷达图可视化
- 详细分析报告
- 个性化建议生成

### 4. 数据导出

- 支持图片格式导出
- 自定义导出样式

## 启动项目

```bash
# 安装依赖
npm install

# 开发环境运行
npm run dev

# 生产环境构建
npm run build
```

## 配置说明

### 1. 类型定义

所有类型定义集中在 `src/components/result/config/types.ts` 中管理，包括：

- 评估结果接口
- 维度配置接口
- 模态框属性接口

### 2. 样式配置

- 使用 Tailwind CSS 进行样式管理
- 支持暗色模式
- PDF 导出专用样式

## 后续开发计划

1. **功能扩展**

   - 用户账号系统
   - 历史记录追踪
   - 数据分析 dashboard

2. **性能优化**

   - 组件懒加载
   - 服务端渲染优化
   - 缓存策略优化

3. **用户体验**
   - 深色模式支持
   - 移动端适配优化
   - 动画效果增强
