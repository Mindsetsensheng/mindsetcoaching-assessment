// src/components/result/DimensionPanel.tsx
'use client'
import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export interface DimensionPanelProps {
  name: string // 维度名称
  description: string // 维度描述
  aspects: string[] // 维度包含的方面
  score: number // 得分
  level: string // 水平
  analysis: string // 分析
  suggestions: string[] // 建议
  isExpanded: boolean
  onToggle: () => void
}

const DimensionPanel: React.FC<DimensionPanelProps> = ({
  name,
  description,
  aspects,
  score,
  level,
  analysis,
  suggestions,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
      >
        <div>
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">得分：{score}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{level}</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900">维度说明</h4>
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">评估方面</h4>
              <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                {aspects.map((aspect, index) => (
                  <li key={index}>{aspect}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">分析</h4>
              <p className="mt-1 text-sm text-gray-600">{analysis}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">建议</h4>
              <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DimensionPanel
