// src/components/result/index.tsx
'use client'

import MindsetResult from './MindsetResult'
import ResilienceResult from './ResilienceResult'
import { IMindsetResults, IResilienceResults } from './config/types'
import { useEffect, useState } from 'react'

// 导出具名组件
export { MindsetResult, ResilienceResult }
const Result = () => {
  const [results, setResults] = useState<
    IMindsetResults | IResilienceResults | null
  >(null)

  useEffect(() => {
    // 根据当前路径判断评估类型
    const isResilience = window.location.pathname.includes('resilience')
    const storageKey = isResilience ? 'resilienceResults' : 'mindsetResults'

    const storedResults = localStorage.getItem(storageKey)
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults)
        setResults(parsedResults)
      } catch (error) {
        console.error('Failed to parse assessment results:', error)
      }
    }
  }, [])

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">加载中...</p>
      </div>
    )
  }

  // 根据评估类型返回对应的结果组件
  return results.type === 'mindset' ? (
    <MindsetResult results={results as IMindsetResults} />
  ) : (
    <ResilienceResult results={results as IResilienceResults} />
  )
}

export default Result
