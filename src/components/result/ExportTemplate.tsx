// components/result/ExportTemplate.tsx
import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { IAssessmentResults } from './config/types'

interface ExportTemplateProps {
  results: IAssessmentResults
  timestamp: string
}

const ExportTemplate = ({ results, timestamp }: ExportTemplateProps) => {
  const { dimensionScores, dimensionLevels, totalScore, totalLevel } = results

  // 准备柱状图数据
  const chartData = [
    {
      name: '成长信念',
      score: dimensionScores.growth,
      maxScore: 75,
      percentage: Math.round((dimensionScores.growth / 75) * 100),
      level: dimensionLevels.growth,
    },
    {
      name: '应对模式',
      score: dimensionScores.coping,
      maxScore: 55,
      percentage: Math.round((dimensionScores.coping / 55) * 100),
      level: dimensionLevels.coping,
    },
    {
      name: '自我认知',
      score: dimensionScores.selfAwareness,
      maxScore: 60,
      percentage: Math.round((dimensionScores.selfAwareness / 60) * 100),
      level: dimensionLevels.selfAwareness,
    },
    {
      name: '开放性',
      score: dimensionScores.openness,
      maxScore: 55,
      percentage: Math.round((dimensionScores.openness / 55) * 100),
      level: dimensionLevels.openness,
    },
  ]

  return (
    <div className="bg-white p-8">
      {/* 标题和时间 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          思维模式评估结果
        </h1>
        <p className="text-sm text-gray-500 mt-2">测评时间：{timestamp}</p>
      </div>

      {/* 总分和评级 */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center gap-2 bg-green-50 px-4 py-2 rounded-full">
          <span className="text-lg text-green-700">总分：{totalScore}/245</span>
          <span className="text-sm text-green-600">{totalLevel}</span>
        </div>
      </div>

      {/* 各维度得分柱状图 */}
      <div className="mb-8">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-100">
                        <p className="text-sm font-medium">{data.name}</p>
                        <p className="text-sm">
                          {data.score}/{data.maxScore} ({data.percentage}%)
                        </p>
                        <p className="text-sm text-green-600">{data.level}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="percentage" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 各维度的详细分析 */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">维度详细分析</h2>
        {Object.entries(dimensionLevels).map(([dimension, level], index) => (
          <div
            key={dimension}
            className="bg-white p-4 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">
                {chartData[index].name}
              </h3>
              <div className="text-sm text-gray-600">
                {chartData[index].score}/{chartData[index].maxScore} (
                {chartData[index].percentage}%)
              </div>
            </div>
            <p className="text-green-600 text-sm">{level}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExportTemplate
