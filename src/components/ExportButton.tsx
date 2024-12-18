'use client'

import React, { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import { dimensionAnalysis } from './result/config/mindset_dimensions'
import type { IDimensionLevel } from './result/config/types'
import { resilienceDimensionAnalysis } from './result/config/resilience_dimensions'

interface ExportButtonProps {
  contentId: string
  type: 'mindset' | 'resilience'
}

function ExportButton({ contentId, type }: ExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [assessmentData, setAssessmentData] = useState<any>(null)

  // 获取评估数据
  useEffect(() => {
    const storageKey =
      type === 'mindset' ? 'mindsetResults' : 'resilienceResults'
    const savedData = localStorage.getItem(storageKey)
    if (savedData) {
      setAssessmentData(JSON.parse(savedData))
    }
  }, [type])

  // 获取维度分析内容
  const getDimensionAnalysis = (dimension: string, score: number) => {
    const config =
      type === 'mindset'
        ? dimensionAnalysis[dimension as keyof typeof dimensionAnalysis]
        : resilienceDimensionAnalysis[
            dimension as keyof typeof resilienceDimensionAnalysis
          ]
    if (!config) return null

    const levels = Object.entries(config.levels)
    for (const [, levelConfig] of levels) {
      if (score >= levelConfig.range[0] && score <= levelConfig.range[1]) {
        return {
          name: config.name,
          description: config.description,
          aspects: config.aspects,
          analysis: levelConfig.analysis,
          suggestions: levelConfig.suggestions,
        }
      }
    }
    return null
  }

  const handleExport = async () => {
    if (!assessmentData) return

    try {
      setIsGenerating(true)

      // 根据类型设置标题和文件名
      const title = type === 'mindset' ? '思维模式评估结果' : '心理弹性评估结果'
      const fileName =
        type === 'mindset' ? '思维模式评估报告' : '心理弹性评估报告'

      // 准备数据
      const {
        dimensionScores,
        dimensionLevels,
        totalScore,
        totalLevel,
        timestamp,
      } = assessmentData
      const scores =
        type === 'mindset'
          ? [
              {
                key: 'growth',
                name: '成长信念',
                score: dimensionScores.growth,
                maxScore: 75,
                percentage: Math.round((dimensionScores.growth / 75) * 100),
                level: dimensionLevels.growth,
              },
              {
                key: 'coping',
                name: '应对模式',
                score: dimensionScores.coping,
                maxScore: 55,
                percentage: Math.round((dimensionScores.coping / 55) * 100),
                level: dimensionLevels.coping,
              },
              {
                key: 'selfAwareness',
                name: '自我认知',
                score: dimensionScores.selfAwareness,
                maxScore: 60,
                percentage: Math.round(
                  (dimensionScores.selfAwareness / 60) * 100
                ),
                level: dimensionLevels.selfAwareness,
              },
              {
                key: 'openness',
                name: '开放性',
                score: dimensionScores.openness,
                maxScore: 55,
                percentage: Math.round((dimensionScores.openness / 55) * 100),
                level: dimensionLevels.openness,
              },
            ]
          : [
              // 心理弹性维度
              {
                key: 'stressTolerance',
                name: '压力承受',
                score: dimensionScores.stressTolerance,
                maxScore: 45,
                percentage: Math.round(
                  (dimensionScores.stressTolerance / 45) * 100
                ),
                level: dimensionLevels.stressTolerance,
              },
              {
                key: 'emotionalRecovery',
                name: '情绪恢复',
                score: dimensionScores.emotionalRecovery,
                maxScore: 55,
                percentage: Math.round(
                  (dimensionScores.emotionalRecovery / 55) * 100
                ),
                level: dimensionLevels.emotionalRecovery,
              },
              {
                key: 'adaptability',
                name: '适应能力',
                score: dimensionScores.adaptability,
                maxScore: 50,
                percentage: Math.round(
                  (dimensionScores.adaptability / 50) * 100
                ),
                level: dimensionLevels.adaptability,
              },
              {
                key: 'problemSolving',
                name: '问题解决',
                score: dimensionScores.problemSolving,
                maxScore: 50,
                percentage: Math.round(
                  (dimensionScores.problemSolving / 50) * 100
                ),
                level: dimensionLevels.problemSolving,
              },
              {
                key: 'socialSupport',
                name: '社会支持',
                score: dimensionScores.socialSupport,
                maxScore: 50,
                percentage: Math.round(
                  (dimensionScores.socialSupport / 50) * 100
                ),
                level: dimensionLevels.socialSupport,
              },
            ]

      // 创建导出容器
      const exportWrapper = document.createElement('div')
      exportWrapper.id = 'export-content'
      exportWrapper.style.position = 'absolute'
      exportWrapper.style.left = '-9999px'
      exportWrapper.style.width = '800px'
      exportWrapper.style.backgroundColor = 'white'
      exportWrapper.style.padding = '2rem'

      // 添加内容
      exportWrapper.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
          <h1 style="font-size: 1.5rem; font-weight: 600; color: #111827;">${title}</h1>
          <p style="font-size: 0.875rem; color: #6B7280; margin-top: 0.5rem;">测评时间：${
            timestamp || ''
          }</p>
        </div>
        
        <div style="background-color: rgb(240 253 244); padding: 1rem; border-radius: 0.5rem; margin-bottom: 2rem; display: flex; justify-content: center;">
          <div style="color: #111827; font-size: 1.125rem;">
            总分：${totalScore}/245 
            <span style="color: #22c55e; margin-left: 0.5rem;">${totalLevel}</span>
          </div>
        </div>

        <h2 style="font-size: 1.25rem; font-weight: 500; color: #111827; margin-bottom: 2rem;">维度得分概览</h2>
        <div style="display: flex; flex-direction: column; gap: 2rem; margin-bottom: 3rem;">
          ${scores
            .map(
              (score) => `
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span style="font-size: 1rem; color: #111827;">
                  ${score.name}
                </span>
                <span style="color: #22c55e; font-size: 0.875rem;">
                  ${score.score}/${score.maxScore} (${score.percentage}%)
                </span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="background-color: #e5e7eb; height: 0.5rem; border-radius: 9999px; overflow: hidden;">
                  <div style="background-color: #22c55e; height: 100%; width: ${score.percentage}%;"></div>
                </div>
                <span style="color: #6B7280; font-size: 0.875rem;">${score.level}</span>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <h2 style="font-size: 1.25rem; font-weight: 500; color: #111827; margin-bottom: 2rem;">维度详细分析</h2>
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          ${scores
            .map((score) => {
              const analysis = getDimensionAnalysis(score.key, score.score)
              if (!analysis) return ''

              return `
              <div style="background-color: #fff; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem;">
                <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 1rem;">
                  <h3 style="font-size: 1.125rem; font-weight: 500; color: #111827; margin-bottom: 0.5rem;">
                    ${analysis.name}
                  </h3>
                  <p style="color: #6B7280; font-size: 0.875rem;">${
                    analysis.description
                  }</p>
                </div>

                <div style="margin-bottom: 1rem;">
                  <h4 style="font-weight: 500; color: #111827; margin-bottom: 0.5rem;">维度特征：</h4>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    ${analysis.aspects
                      .map(
                        (aspect) => `
                      <li style="color: #6B7280; font-size: 0.875rem; margin-bottom: 0.25rem;">${aspect}</li>
                    `
                      )
                      .join('')}
                  </ul>
                </div>

                <div style="margin-bottom: 1rem;">
                  <h4 style="font-weight: 500; color: #111827; margin-bottom: 0.5rem;">评估结果：</h4>
                  <p style="color: #6B7280; font-size: 0.875rem;">${
                    analysis.analysis
                  }</p>
                </div>

                <div>
                  <h4 style="font-weight: 500; color: #111827; margin-bottom: 0.5rem;">建议提升方向：</h4>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    ${analysis.suggestions
                      .map(
                        (suggestion: string) => `
                      <li style="color: #6B7280; font-size: 0.875rem; margin-bottom: 0.25rem;">${suggestion}</li>
                    `
                      )
                      .join('')}
                  </ul>
                </div>
              </div>
            `
            })
            .join('')}
        </div>
      `

      // 添加到文档中
      document.body.appendChild(exportWrapper)

      // 等待内容渲染
      await new Promise((resolve) => setTimeout(resolve, 100))

      // 生成图片
      const canvas = await html2canvas(exportWrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })

      // 导出图片
      const image = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.download = `${fileName}_${timestamp?.replace(/[/:]/g, '') || ''}.png`
      link.href = image
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // 清理临时元素
      document.body.removeChild(exportWrapper)
    } catch (error) {
      console.error('导出失败:', error)
      alert('导出失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={isGenerating}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    >
      <Download size={20} />
      <span>{isGenerating ? '正在生成...' : '导出评估报告'}</span>
    </button>
  )
}

export default ExportButton
