// 维度评级类型
export type ResilienceLevel = 'low' | 'medium' | 'high'

// 维度配置接口
export interface ResilienceDimension {
  id: string
  name: string
  description: string
  interpretations: {
    low: string
    medium: string
    high: string
  }
  scoreRange: {
    min: number
    max: number
  }
}

// 维度得分接口
export interface ResilienceScores {
  stressTolerance: number
  emotionalRecovery: number
  adaptability: number
  problemSolving: number
  socialSupport: number
}

// 评估结果接口
export interface ResilienceResults {
  totalScore: number
  totalLevel: ResilienceLevel
  dimensionScores: ResilienceScores
  dimensionLevels: Record<keyof ResilienceScores, ResilienceLevel>
  timestamp: string
}

// 获取维度等级的辅助函数
export const getDimensionLevel = (
  score: number,
  dimension: ResilienceDimension
): ResilienceLevel => {
  const { min, max } = dimension.scoreRange
  const range = max - min
  const third = range / 3

  if (score <= min + third) return 'low'
  if (score <= min + third * 2) return 'medium'
  return 'high'
}

// 计算总分等级的辅助函数
export const getTotalLevel = (score: number): ResilienceLevel => {
  if (score <= 150) return 'low'
  if (score <= 200) return 'medium'
  return 'high'
}
