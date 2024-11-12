// src/components/result/DimensionPanel.tsx

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { dimensionAnalysis } from './config/dimensions'
import { IDimensionLevel } from './config/types'

// 定义组件的 Props 接口
interface DimensionPanelProps {
  dimension: keyof typeof dimensionAnalysis
  score: number
  level: string
  isExpanded: boolean
  onToggle: () => void
}

const DimensionPanel: React.FC<DimensionPanelProps> = ({
  dimension,
  score,
  level,
  isExpanded,
  onToggle,
}) => {
  const config = dimensionAnalysis[dimension]
  if (!config) return null

  const getScoreLevel = (score: number): IDimensionLevel | null => {
    const levels = Object.entries(config.levels)
    for (const [, levelConfig] of levels) {
      if (score >= levelConfig.range[0] && score <= levelConfig.range[1]) {
        return levelConfig
      }
    }
    return null
  }

  const scoreLevel = getScoreLevel(score)

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden dimension-section">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        aria-expanded={isExpanded}
      >
        <div>
          <h3 className="text-base font-medium text-gray-900">{config.name}</h3>
          <p className="text-sm text-gray-500">
            得分：{score} - {level}
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 
            ${isExpanded ? 'transform rotate-180' : ''}`}
        />
      </button>

      {isExpanded && scoreLevel && (
        <div className="px-6 py-4 border-t border-gray-100">
          <p className="text-gray-600 mb-4">{config.description}</p>

          <ul className="mb-4 space-y-1">
            {config.aspects.map((aspect, index) => (
              <li key={index} className="text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                {aspect}
              </li>
            ))}
          </ul>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-green-800">{scoreLevel.analysis}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              建议提升方向：
            </h4>
            <ul className="space-y-2">
              {scoreLevel.suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default DimensionPanel
