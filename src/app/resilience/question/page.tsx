'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { resilienceQuestions } from './questionsData'
import Navbar from '@/components/common/Navbar'

/**
 * 心理弹性评估问卷页面组件
 * 功能:
 * 1. 分部分展示问题
 * 2. 记录用户答案
 * 3. 保存答案到本地存储
 * 4. 计算完成进度
 * 5. 提交答案并跳转
 */
export default function ResilienceQuestionPage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const totalQuestions = resilienceQuestions.reduce(
    (sum, section) => sum + section.questions.length,
    0
  )
  const answeredQuestions = Object.keys(answers).length
  const progress = (answeredQuestions / totalQuestions) * 100

  /**
   * 处理用户选择答案
   * @param questionId 问题ID(格式:"部分id-题目id")
   * @param value 选择的分数(1-5)
   */
  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    const savedData = {
      answers: newAnswers,
      timestamp: new Date().toISOString(),
      totalQuestions,
      completedQuestions: Object.keys(newAnswers).length,
    }
    localStorage.setItem('resilienceAnswers', JSON.stringify(savedData))
  }

  const getCurrentAnswer = () => answers[`${currentSection}-${currentQuestion}`]

  const handleCompletion = () => {
    try {
      const resultData = {
        answers,
        timestamp: new Date().toISOString(),
        totalQuestions,
        completedQuestions: answeredQuestions,
      }
      localStorage.setItem('resilienceAnswers', JSON.stringify(resultData))
      router.push('/resilience/result')
    } catch (error) {
      console.error('Error saving answers:', error)
      alert('保存答案时出现错误，请重试')
    }
  }

  const handleNext = () => {
    if (!getCurrentAnswer()) {
      alert('请选择符合程度后继续')
      return
    }

    if (
      currentQuestion <
      resilienceQuestions[currentSection].questions.length - 1
    ) {
      setCurrentQuestion((prev) => prev + 1)
    } else if (currentSection < resilienceQuestions.length - 1) {
      setCurrentSection((prev) => prev + 1)
      setCurrentQuestion(0)
    } else {
      handleCompletion()
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    } else if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1)
      const prevSectionQuestions =
        resilienceQuestions[currentSection - 1].questions
      setCurrentQuestion(prevSectionQuestions.length - 1)
    }
  }

  const currentSectionData = resilienceQuestions[currentSection]
  const currentQuestionData = currentSectionData.questions[currentQuestion]
  const isFirstQuestion = currentSection === 0 && currentQuestion === 0
  const isLastQuestion =
    currentSection === resilienceQuestions.length - 1 &&
    currentQuestion === currentSectionData.questions.length - 1

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="fixed top-16 left-0 w-full h-2 bg-gray-100 z-10">
        <div
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute right-4 top-4 bg-white px-3 py-1 rounded-full shadow-sm text-sm text-gray-600 border border-gray-100">
          进度：{Math.round(progress)}%
        </div>
      </div>

      <div className="pt-24 pb-12">
        <div className="max-w-[80vw] mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-sm text-gray-500 mb-2">
              第 {currentSection + 1}/{resilienceQuestions.length} 部分
            </h2>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {currentSectionData.title}
            </h1>
            <p className="text-gray-600">{currentSectionData.description}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex space-x-1 mb-6">
              {currentSectionData.questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentQuestion
                      ? 'w-8 bg-green-600'
                      : answers[`${currentSection}-${index}`]
                      ? 'w-4 bg-green-200'
                      : 'w-4 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <div className="mb-8">
              <span className="text-sm text-gray-500 mb-2 block">
                题目 {currentQuestion + 1}/{currentSectionData.questions.length}
              </span>
              <p className="text-lg text-gray-700">
                {currentQuestionData.text}
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-center text-sm text-gray-500">
                请选择符合程度
              </div>
              <div className="flex justify-center gap-6">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() =>
                      handleAnswer(
                        `${currentSection}-${currentQuestion}`,
                        score
                      )
                    }
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 text-sm
                      hover:border-green-300 hover:bg-green-50
                      ${
                        getCurrentAnswer() === score
                          ? 'border-green-600 bg-green-50 text-green-700 border-2'
                          : 'border-gray-200 text-gray-600'
                      }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 px-1">
                <span>不符合</span>
                <span>符合</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={isFirstQuestion}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg
                disabled:opacity-50 disabled:cursor-not-allowed
                text-gray-600 hover:bg-gray-100"
            >
              <span>上一题</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg
                bg-green-600 text-white hover:bg-green-700"
            >
              <span>{isLastQuestion ? '完成' : '下一题'}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
