// src/components/result/config/types.ts

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

export interface IDimensionAnalysis {
  growth: IDimensionConfig
  coping: IDimensionConfig
  selfAwareness: IDimensionConfig
  openness: IDimensionConfig
}

export interface IAssessmentScores {
  growth: number
  coping: number
  selfAwareness: number
  openness: number
}

export interface IAssessmentResults {
  dimensionScores: IAssessmentScores
  dimensionLevels: {
    growth: string
    coping: string
    selfAwareness: string
    openness: string
  }
  totalScore: number
  totalLevel: string
}
