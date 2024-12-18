'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/common/Navbar'
import { ResilienceResult } from '@/components/result'
import {
  IResilienceResults,
  DimensionLevel,
} from '@/components/result/config/types'
import { resilienceDimensionAnalysis } from '@/components/result/config/resilience_dimensions' // 添加这行导入

// 确定每个维度的水平
const getDimensionLevel = (
  score: number,
  dimension: keyof typeof resilienceDimensionAnalysis
) => {
  const config = resilienceDimensionAnalysis[dimension]
  if (!config) return 'low'

  const { high, good, moderate, low } = config.levels

  if (score >= high.range[0]) return 'high'
  if (score >= good.range[0]) return 'good'
  if (score >= moderate.range[0]) return 'moderate'
  return 'low'
}

// 获取水平的中文描述
const LEVEL_TEXT_MAP: Record<DimensionLevel, string> = {
  high: '优秀',
  good: '良好',
  moderate: '中等',
  low: '待提升',
} as const

const getLevelText = (level: DimensionLevel): string => {
  return LEVEL_TEXT_MAP[level] || '待评估'
}

// 计算每个维度的得分
const calculateResilienceScores = (answers: Record<string, number>) => {
  const scores = {
    stressTolerance: 0,
    emotionalRecovery: 0,
    adaptability: 0,
    problemSolving: 0,
    socialSupport: 0,
  }

  Object.entries(answers).forEach(([key, value]) => {
    const [section, question] = key.split('-').map(Number)

    switch (section) {
      case 0: // 压力应对维度
        if ([1, 2, 3, 8, 9].includes(question + 1)) {
          scores.stressTolerance += value
        } else {
          scores.stressTolerance += 6 - value
        }
        break
      case 1: // 情绪调节维度
        if ([1, 3, 4, 6, 8, 9, 11].includes(question + 1)) {
          scores.emotionalRecovery += value
        } else {
          scores.emotionalRecovery += 6 - value
        }
        break
      case 2: // 适应能力维度
        if ([1, 3, 5, 6, 7, 9].includes(question + 1)) {
          scores.adaptability += value
        } else {
          scores.adaptability += 6 - value
        }
        break
      case 3: // 问题解决维度
        if ([1, 3, 4, 5, 6, 7, 9].includes(question + 1)) {
          scores.problemSolving += value
        } else {
          scores.problemSolving += 6 - value
        }
        break
      case 4: // 社会支持网络维度
        if ([1, 3, 4, 6, 7, 10].includes(question + 1)) {
          scores.socialSupport += value
        } else {
          scores.socialSupport += 6 - value
        }
        break
    }
  })

  return scores
}

export default function ResilienceResultPage() {
  const router = useRouter()
  const [results, setResults] = useState<IResilienceResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      console.log('Loading results page...')

      const savedData = localStorage.getItem('resilienceAnswers')
      console.log('Saved data:', savedData)

      if (!savedData) {
        console.log('No saved data found')
        setError('未找到答案数据')
        router.push('/resilience')
        return
      }

      const { answers } = JSON.parse(savedData)
      console.log('Parsed answers:', answers)

      const dimensionScores = calculateResilienceScores(answers)
      console.log('Calculated scores:', dimensionScores)

      // 确定每个维度的水平
      const dimensionLevels = {
        stressTolerance: getLevelText(
          getDimensionLevel(dimensionScores.stressTolerance, 'stressTolerance')
        ),
        emotionalRecovery: getLevelText(
          getDimensionLevel(
            dimensionScores.emotionalRecovery,
            'emotionalRecovery'
          )
        ),
        adaptability: getLevelText(
          getDimensionLevel(dimensionScores.adaptability, 'adaptability')
        ),
        problemSolving: getLevelText(
          getDimensionLevel(dimensionScores.problemSolving, 'problemSolving')
        ),
        socialSupport: getLevelText(
          getDimensionLevel(dimensionScores.socialSupport, 'socialSupport')
        ),
      }

      const totalScore = Object.values(dimensionScores).reduce(
        (a, b) => a + b,
        0
      )

      // 确定总体水平
      const totalLevel =
        totalScore >= 200
          ? '优秀的心理弹性'
          : totalScore >= 150
          ? '良好的心理弹性'
          : totalScore >= 100
          ? '中等的心理弹性'
          : '需要提升心理弹性'

      // 保存时间戳
      const timestamp = new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })

      const resultsWithTimestamp: IResilienceResults = {
        dimensionScores,
        dimensionLevels,
        totalScore,
        totalLevel,
        timestamp,
        type: 'resilience', // 添加类型标识
      }

      localStorage.setItem(
        'resilienceResults', // 改用特定的键名
        JSON.stringify(resultsWithTimestamp)
      )
      setResults(resultsWithTimestamp)
    } catch (err: unknown) {
      console.error('Error processing results:', err)
      if (err instanceof Error) {
        setError(`处理结果时出错: ${err.message}`)
      } else {
        setError('处理结果时出错：未知错误')
      }
    } finally {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-lg text-gray-600">加载中...</div>
        </div>
      </div>
    )
  }

  if (error || !results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 flex flex-col items-center justify-center">
          <div className="text-lg text-red-600 mb-4">
            {error || '加载结果时出错'}
          </div>
          <button
            onClick={() => router.push('/resilience')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            返回问卷
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24">
        <ResilienceResult results={results} />
      </div>
    </div>
  )
}
