// src/app/mindset/page.tsx
'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/common/Navbar'

export default function MindsetQuestionnaire() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('mindsetResults')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* 主要内容区域 */}
      <main className="pt-24 py-12">
        <div className="max-w-[80vw] mx-auto px-4">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              思维模式问卷
            </h1>
            <p className="text-gray-600 mt-2">
              探索您的思维模式特征，了解自己在不同情境下的思考方式和决策倾向。
            </p>
          </div>

          {/* 问卷说明 */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center">
              <h2 className="text-xl font-medium text-gray-900">准备开始</h2>
              <p className="text-gray-600 mt-4 mb-8">
                本问卷共49道题目，分为四个部分。请根据您的真实情况作答，没有对错之分。
              </p>
              <div className="flex items-center justify-center space-x-4 text-gray-500 mb-8">
                <span>1 代表完全不符合</span>
                <span>5 代表完全符合</span>
              </div>
              <button
                onClick={() => router.push('/mindset/question')}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                开始答题
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
