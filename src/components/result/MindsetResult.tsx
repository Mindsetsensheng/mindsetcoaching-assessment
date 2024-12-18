'use client'

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
import { IMindsetResults } from './config/types'
import CustomAxisTick from './CustomAxisTick'
import DimensionPanel from './DimensionPanel'
import ExportButton from '../ExportButton'
import { dimensionAnalysis as mindsetDimensionAnalysis } from './config/mindset_dimensions'

// 添加等级映射函数
const mapLevelToEnglish = (
  chineseLevel: string
): 'high' | 'good' | 'moderate' | 'low' => {
  const levelMap: Record<string, 'high' | 'good' | 'moderate' | 'low'> = {
    成长型特质明显: 'high',
    积极成长中: 'good',
    成长潜力显现: 'moderate',
    成长萌芽阶段: 'low',
  }
  return levelMap[chineseLevel] || 'moderate'
}

interface MindsetResultProps {
  results: IMindsetResults
}

const MindsetResult: React.FC<MindsetResultProps> = ({ results }) => {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null)
  const {
    dimensionScores,
    dimensionLevels,
    totalScore,
    totalLevel,
    timestamp,
  } = results

  // 为雷达图准备数据
  const radarData = [
    {
      dimension: '成长信念',
      score: (dimensionScores.growth / 75) * 100,
      originalScore: dimensionScores.growth,
      maxScore: 75,
    },
    {
      dimension: '应对模式',
      score: (dimensionScores.coping / 55) * 100,
      originalScore: dimensionScores.coping,
      maxScore: 55,
    },
    {
      dimension: '自我认知',
      score: (dimensionScores.selfAwareness / 60) * 100,
      originalScore: dimensionScores.selfAwareness,
      maxScore: 60,
    },
    {
      dimension: '开放性',
      score: (dimensionScores.openness / 55) * 100,
      originalScore: dimensionScores.openness,
      maxScore: 55,
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
                  思维模式评估结果
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                  测评时间：{timestamp}
                </p>
              </div>
              <ExportButton contentId="assessment-result" type="mindset" />
            </div>
            <div className="mt-4 flex justify-center">
              <div className="inline-flex items-center justify-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                <span className="text-lg text-green-700">
                  总分：{totalScore}/245
                </span>
                <span className="text-sm text-green-600">{totalLevel}</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* 雷达图 */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                维度得分概览
              </h2>
              <div className="w-full h-96">
                <ResponsiveContainer>
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="65%"
                    data={radarData}
                  >
                    <PolarGrid gridType="circle" />
                    <PolarAngleAxis
                      dataKey="dimension"
                      tick={<CustomAxisTick />}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tickCount={5}
                    />
                    <Radar
                      name="得分"
                      dataKey="score"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.2}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 维度详情分析 */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 px-4">
                维度详细分析
              </h2>
              {Object.entries(dimensionLevels).map(([dimension, level]) => {
                const dimensionKey = dimension as keyof typeof dimensionScores
                const dimensionConfig = mindsetDimensionAnalysis[dimensionKey]

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
                    `Missing level configuration for: ${dimension} - ${level}`
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
    </div>
  )
}

export default MindsetResult
