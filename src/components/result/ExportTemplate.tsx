// components/result/ExportTemplate.tsx
'use client'

import { IMindsetResults, IResilienceResults } from './config/types'

interface ExportTemplateProps {
  result: IMindsetResults | IResilienceResults
}

const ExportTemplate: React.FC<ExportTemplateProps> = ({ result }) => {
  // 使用类型守卫来区分不同的评估类型
  const isMindsetResults = (
    results: IMindsetResults | IResilienceResults
  ): results is IMindsetResults => {
    return results.type === 'mindset'
  }

  const getDimensionData = () => {
    if (isMindsetResults(result)) {
      return [
        {
          name: '成长信念',
          score: result.dimensionScores.growth,
          maxScore: 75,
          percentage: Math.round((result.dimensionScores.growth / 75) * 100),
          level: result.dimensionLevels.growth,
        },
        {
          name: '应对方式',
          score: result.dimensionScores.coping,
          maxScore: 75,
          percentage: Math.round((result.dimensionScores.coping / 75) * 100),
          level: result.dimensionLevels.coping,
        },
        {
          name: '自我认知',
          score: result.dimensionScores.selfAwareness,
          maxScore: 75,
          percentage: Math.round(
            (result.dimensionScores.selfAwareness / 75) * 100
          ),
          level: result.dimensionLevels.selfAwareness,
        },
        {
          name: '开放性思维',
          score: result.dimensionScores.openness,
          maxScore: 75,
          percentage: Math.round((result.dimensionScores.openness / 75) * 100),
          level: result.dimensionLevels.openness,
        },
      ]
    } else {
      return [
        {
          name: '压力应对',
          score: result.dimensionScores.stressTolerance,
          maxScore: 75,
          percentage: Math.round(
            (result.dimensionScores.stressTolerance / 75) * 100
          ),
          level: result.dimensionLevels.stressTolerance,
        },
        {
          name: '情绪调节',
          score: result.dimensionScores.emotionalRecovery,
          maxScore: 75,
          percentage: Math.round(
            (result.dimensionScores.emotionalRecovery / 75) * 100
          ),
          level: result.dimensionLevels.emotionalRecovery,
        },
        {
          name: '适应能力',
          score: result.dimensionScores.adaptability,
          maxScore: 75,
          percentage: Math.round(
            (result.dimensionScores.adaptability / 75) * 100
          ),
          level: result.dimensionLevels.adaptability,
        },
        {
          name: '问题解决',
          score: result.dimensionScores.problemSolving,
          maxScore: 75,
          percentage: Math.round(
            (result.dimensionScores.problemSolving / 75) * 100
          ),
          level: result.dimensionLevels.problemSolving,
        },
        {
          name: '社会支持',
          score: result.dimensionScores.socialSupport,
          maxScore: 75,
          percentage: Math.round(
            (result.dimensionScores.socialSupport / 75) * 100
          ),
          level: result.dimensionLevels.socialSupport,
        },
      ]
    }
  }

  return (
    <div className="bg-white p-8">
      {/* 标题和时间 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isMindsetResults(result) ? '思维模式评估结果' : '心理弹性评估结果'}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          测评时间：{result.timestamp}
        </p>
      </div>

      {/* 总分和评级 */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center gap-2 bg-green-50 px-4 py-2 rounded-full">
          <span className="text-lg text-green-700">
            总分：{result.totalScore}/{isMindsetResults(result) ? '300' : '375'}
          </span>
          <span className="text-sm text-green-600">{result.totalLevel}</span>
        </div>
      </div>

      {/* 维度详情 */}
      <div className="space-y-6">
        {getDimensionData().map((dimension) => (
          <div key={dimension.name} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                {dimension.name}
              </h3>
              <span className="text-sm text-gray-500">
                {dimension.score}/{dimension.maxScore}
              </span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded">
              <div
                className="absolute h-full bg-green-500 rounded"
                style={{ width: `${dimension.percentage}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">{dimension.level}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExportTemplate
