import React from 'react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ResilienceScores } from '@/types/resilience'
import CustomAxisTick from './CustomAxisTick'

interface ResilienceRadarChartProps {
  dimensionScores: ResilienceScores
}

interface RadarDataPoint {
  dimension: string
  score: number
  originalScore: number
  maxScore: number
  position: { x: number; y: number }
}

const ResilienceRadarChart: React.FC<ResilienceRadarChartProps> = ({
  dimensionScores,
}) => {
  // 准备雷达图数据
  const radarData: RadarDataPoint[] = [
    {
      dimension: '压力承受',
      score: (dimensionScores.stressTolerance / 45) * 100,
      originalScore: dimensionScores.stressTolerance,
      maxScore: 45,
      position: { x: 0, y: -20 },
    },
    {
      dimension: '情绪恢复',
      score: (dimensionScores.emotionalRecovery / 55) * 100,
      originalScore: dimensionScores.emotionalRecovery,
      maxScore: 55,
      position: { x: 30, y: -10 },
    },
    {
      dimension: '适应能力',
      score: (dimensionScores.adaptability / 50) * 100,
      originalScore: dimensionScores.adaptability,
      maxScore: 50,
      position: { x: 30, y: 10 },
    },
    {
      dimension: '问题解决',
      score: (dimensionScores.problemSolving / 50) * 100,
      originalScore: dimensionScores.problemSolving,
      maxScore: 50,
      position: { x: -30, y: 10 },
    },
    {
      dimension: '社会支持',
      score: (dimensionScores.socialSupport / 50) * 100,
      originalScore: dimensionScores.socialSupport,
      maxScore: 50,
      position: { x: -30, y: -10 },
    },
  ]

  // 自定义提示框组件
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
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="dimension"
            tick={({ payload, x, y, ...rest }) => {
              const dimension = radarData.find(
                (d) => d.dimension === payload.value
              )
              const offsetX = dimension?.position?.x || 0
              const offsetY = dimension?.position?.y || 0
              return (
                <text
                  {...rest}
                  x={x + offsetX}
                  y={y + offsetY}
                  textAnchor="middle"
                  fill="#666"
                >
                  {payload.value}
                </text>
              )
            }}
          />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name="得分"
            dataKey="score"
            stroke="#4ade80"
            fill="#4ade80"
            fillOpacity={0.3}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ResilienceRadarChart
