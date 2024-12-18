import React, { useState } from 'react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { IResilienceResults } from './config/types'
import { resilienceDimensionAnalysis } from './config/resilience_dimensions'
import CustomAxisTick from './CustomAxisTick'
import DimensionPanel from './DimensionPanel'
import ExportButton from '../ExportButton'
import ResilienceRadarChart from './ResilienceRadarChart'

interface ResilienceResultProps {
  results: IResilienceResults
}

// 添加等级映射函数
const mapLevelToEnglish = (
  chineseLevel: string
): 'high' | 'good' | 'moderate' | 'low' => {
  const levelMap: Record<string, 'high' | 'good' | 'moderate' | 'low'> = {
    优秀: 'high',
    良好: 'good',
    中等: 'moderate',
    较低: 'low',
  }
  return levelMap[chineseLevel] || 'moderate'
}

const ResilienceResult: React.FC<ResilienceResultProps> = ({ results }) => {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null)
  const {
    dimensionScores,
    dimensionLevels,
    totalScore,
    totalLevel,
    timestamp,
  } = results

  // 添加数据验证
  if (!dimensionScores || !dimensionLevels) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">暂无评估数据</p>
      </div>
    )
  }

  // 为雷达图准备数据
  const radarData = [
    {
      dimension: '压力承受',
      score: (dimensionScores.stressTolerance / 45) * 100,
      originalScore: dimensionScores.stressTolerance,
      maxScore: 45,
    },
    {
      dimension: '情绪恢复',
      score: (dimensionScores.emotionalRecovery / 55) * 100,
      originalScore: dimensionScores.emotionalRecovery,
      maxScore: 55,
    },
    {
      dimension: '适应能力',
      score: (dimensionScores.adaptability / 50) * 100,
      originalScore: dimensionScores.adaptability,
      maxScore: 50,
    },
    {
      dimension: '问题解决',
      score: (dimensionScores.problemSolving / 50) * 100,
      originalScore: dimensionScores.problemSolving,
      maxScore: 50,
    },
    {
      dimension: '社会支持',
      score: (dimensionScores.socialSupport / 50) * 100,
      originalScore: dimensionScores.socialSupport,
      maxScore: 50,
    },
  ]

  // 自定义提示框内容
  const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-900">{data.dimension}</p>
          <p className="text-sm text-gray-600">
            {data.originalScore} / {data.maxScore} ({Math.round(data.score)}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[80vw] mx-auto px-4">
        <div id="assessment-result">
          {/* 总分区域 */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  心理弹性评估结果
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                  测评时间：{timestamp}
                </p>
              </div>
              <ExportButton contentId="assessment-result" type="resilience" />
            </div>
            <div className="mt-4 flex justify-center">
              <div className="inline-flex items-center justify-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                <span className="text-lg text-green-700">
                  总分：{totalScore}/250
                </span>
                <span className="text-sm text-green-600">{totalLevel}</span>
              </div>
            </div>
          </div>

          {/* 雷达图 */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              维度得分概览
            </h2>
            <ResilienceRadarChart dimensionScores={dimensionScores} />
          </div>

          {/* 维度详情分析 */}
          <div className="space-y-4 mt-8">
            <h2 className="text-lg font-medium text-gray-900 px-4">
              维度详细分析
            </h2>
            {Object.entries(dimensionLevels).map(([dimension, level]) => {
              const dimensionKey = dimension as keyof typeof dimensionScores
              const dimensionConfig = resilienceDimensionAnalysis[dimensionKey]

              // 添加防护检查
              if (!dimensionConfig) {
                console.error(
                  `Missing configuration for dimension: ${dimension}`
                )
                return null
              }

              // 使用映射函数转换等级
              const dimensionLevel = mapLevelToEnglish(level)

              if (!dimensionConfig.levels[dimensionLevel]) {
                console.error(
                  `Missing level configuration for: ${dimension} - ${dimensionLevel}`
                )
                return null
              }

              return (
                <DimensionPanel
                  key={dimension}
                  name={dimensionConfig.name}
                  description={dimensionConfig.description}
                  aspects={dimensionConfig.aspects}
                  score={dimensionScores[dimensionKey]}
                  level={level}
                  analysis={dimensionConfig.levels[dimensionLevel].analysis}
                  suggestions={
                    dimensionConfig.levels[dimensionLevel].suggestions
                  }
                  isExpanded={expandedPanel === dimension}
                  onToggle={() =>
                    setExpandedPanel(
                      expandedPanel === dimension ? null : dimension
                    )
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResilienceResult
