// src/components/result/config/types.ts

// 基础维度配置接口
export interface IDimensionLevel {
  range: [number, number]
  analysis: string
  suggestions: string[]
}

export interface IDimensionLevels {
  high: IDimensionLevel
  good: IDimensionLevel
  moderate: IDimensionLevel
  low: IDimensionLevel
}

export interface IDimensionConfig {
  name: string
  description: string
  aspects: string[]
  levels: IDimensionLevels
}

// 思维模式维度配置
export interface IMindsetDimensionAnalysis {
  growth: IDimensionConfig
  coping: IDimensionConfig
  selfAwareness: IDimensionConfig
  openness: IDimensionConfig
}

// 心理弹性维度配置
export interface IResilienceDimensionAnalysis {
  stressTolerance: IDimensionConfig
  emotionalRecovery: IDimensionConfig
  adaptability: IDimensionConfig
  problemSolving: IDimensionConfig
  socialSupport: IDimensionConfig
}

// 思维模式分数
export interface IMindsetScores {
  growth: number
  coping: number
  selfAwareness: number
  openness: number
}

// 心理弹性分数
export interface IResilienceScores {
  stressTolerance: number
  emotionalRecovery: number
  adaptability: number
  problemSolving: number
  socialSupport: number
}

// 通用评估结果接口
interface IBaseAssessmentResults<T> {
  dimensionScores: T
  dimensionLevels: Record<keyof T, string>
  totalScore: number
  totalLevel: string
  timestamp: string
}

export interface IMindsetResults
  extends IBaseAssessmentResults<IMindsetScores> {}
export interface IResilienceResults
  extends IBaseAssessmentResults<IResilienceScores> {}

// 导出通用类型（用于向后兼容）
export type IAssessmentResults = IMindsetResults | IResilienceResults
