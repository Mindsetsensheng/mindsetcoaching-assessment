'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/common/Navbar'

export default function ResilienceQuestionnaire() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* 主要内容区域 */}
      <main className="pt-24 py-12">
        <div className="max-w-[80vw] mx-auto px-4">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              心理弹性问卷
            </h1>
            <p className="text-gray-600 mt-2">
              了解您在面对生活中的各种挑战时的反应方式和调适能力。
            </p>
          </div>

          {/* 问卷说明 */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center">
              <h2 className="text-xl font-medium text-gray-900">准备开始</h2>
              <p className="text-gray-600 mt-4 mb-8">
                本问卷共50道题目，分为五个部分：压力应对、情绪调节、适应能力、问题解决和社会支持网络。
                请根据您的真实情况作答，没有对错之分。
              </p>
              <div className="flex items-center justify-center space-x-4 text-gray-500 mb-8">
                <span>1 代表完全不符合</span>
                <span>5 代表完全符合</span>
              </div>
              <button
                onClick={() => router.push('/resilience/question')}
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
