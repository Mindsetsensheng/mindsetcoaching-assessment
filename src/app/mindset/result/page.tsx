'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { dimensionAnalysis } from '@/components/result/config/mindset_dimensions'
import type {
  IMindsetResults,
  IMindsetScores,
} from '@/components/result/config/types'
import Navbar from '@/components/common/Navbar'
import { MindsetResult } from '@/components/result'

// 确定每个维度的水平
const getDimensionLevel = (
  score: number,
  dimensionKey: keyof typeof dimensionAnalysis
) => {
  const levels = dimensionAnalysis[dimensionKey].levels

  if (score >= levels.high.range[0]) return 'high'
  if (score >= levels.good.range[0]) return 'good'
  if (score >= levels.moderate.range[0]) return 'moderate'
  return 'low'
}

// 获取水平的中文描述
const getLevelText = (level: string) => {
  const levelTexts = {
    high: '成长型特质明显',
    good: '积极成长中',
    moderate: '成长潜力显现',
    low: '成长萌芽阶段',
  }
  return levelTexts[level as keyof typeof levelTexts] || '待评估'
}

// 计算每个维度的得分
const calculateDimensionScores = (answers: Record<string, number>) => {
  const scores = {
    growth: 0,
    coping: 0,
    selfAwareness: 0,
    openness: 0,
  }

  Object.entries(answers).forEach(([key, value]) => {
    const [section] = key.split('-').map(Number)
    switch (section) {
      case 0:
        scores.growth += value
        break
      case 1:
        scores.coping += value
        break
      case 2:
        scores.selfAwareness += value
        break
      case 3:
        scores.openness += value
        break
    }
  })

  return scores
}

export default function MindsetResultPage() {
  const router = useRouter()
  const [results, setResults] = useState<IMindsetResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // 从 localStorage 获取答案数据
      const savedData = localStorage.getItem('mindsetAnswers')
      if (!savedData) {
        setError('未找到答案数据')
        router.push('/mindset')
        return
      }

      const { answers } = JSON.parse(savedData)

      // 计算维度得分
      const dimensionScores = calculateDimensionScores(answers)

      // 确定每个维度的水平
      const dimensionLevels = {
        growth: getLevelText(
          getDimensionLevel(dimensionScores.growth, 'growth')
        ),
        coping: getLevelText(
          getDimensionLevel(dimensionScores.coping, 'coping')
        ),
        selfAwareness: getLevelText(
          getDimensionLevel(dimensionScores.selfAwareness, 'selfAwareness')
        ),
        openness: getLevelText(
          getDimensionLevel(dimensionScores.openness, 'openness')
        ),
      }

      // 计算总分
      const totalScore = Object.values(dimensionScores).reduce(
        (a, b) => a + b,
        0
      )

      // 确定总体水平 - 使用总分的百分比来判断
      const totalPercentage = (totalScore / 245) * 100
      const totalLevel =
        totalPercentage >= 80
          ? '成长型思维主导'
          : totalPercentage >= 70
          ? '积极成长阶段'
          : totalPercentage >= 60
          ? '成长潜力显现'
          : '成长萌芽阶段'

      // 保存时间戳
      const timestamp = new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })

      // 保存结果和时间戳
      const resultsWithTimestamp: IMindsetResults = {
        dimensionScores,
        dimensionLevels,
        totalScore,
        totalLevel,
        timestamp,
        type: 'mindset',
      }

      localStorage.setItem(
        'mindsetResults',
        JSON.stringify(resultsWithTimestamp)
      )
      setResults(resultsWithTimestamp)
    } catch (err) {
      console.error('Error processing results:', err)
      setError('处理结果时出错')
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
            onClick={() => router.push('/mindset')}
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
        <MindsetResult results={results} />
      </div>
    </div>
  )
}
