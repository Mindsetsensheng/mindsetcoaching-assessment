// src/components/result/DimensionPanel.tsx

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { IDimensionLevel, IDimensionConfig } from './config/types'

interface DimensionPanelProps {
  config: IDimensionConfig
  score: number
  level: string
  isExpanded: boolean
  onToggle: () => void
}

const DimensionPanel: React.FC<DimensionPanelProps> = ({
  config,
  score,
  level,
  isExpanded,
  onToggle,
}) => {
  if (!config) return null

  const getScoreLevel = (score: number): IDimensionLevel | null => {
    const { high, good, moderate, low } = config.levels

    if (score >= high.range[0] && score <= high.range[1]) return high
    if (score >= good.range[0] && score <= good.range[1]) return good
    if (score >= moderate.range[0] && score <= moderate.range[1])
      return moderate
    if (score >= low.range[0] && score <= low.range[1]) return low

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
            {config.aspects.map((aspect: string, index: number) => (
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
