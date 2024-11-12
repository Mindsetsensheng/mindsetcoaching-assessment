// src/app/page.tsx
import Link from 'next/link'
import Navbar from '@/components/common/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* 主要内容区域 - 添加上边距以避免被导航栏遮挡 */}
      <main className="pt-24 pb-12">
        <div className="max-w-[80vw] mx-auto px-4">
          <h1 className="text-2xl font-semibold text-center mb-8">
            思维模式评估
          </h1>
          <div className="grid gap-8 md:grid-cols-2">
            {/* 思维模式问卷卡片 */}
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-medium mb-2">思维模式问卷</h2>
              <p className="text-gray-600 mb-4">
                探索您的思维模式特征，了解自己在不同情境下的思考方式和决策倾向。
              </p>
              <p className="text-sm text-gray-500 mb-4">预计用时：15-20分钟</p>
              <Link
                href="/mindset"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                开始探索
              </Link>
            </div>

            {/* 心理弹性问卷卡片 */}
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-medium mb-2">心理弹性问卷</h2>
              <p className="text-gray-600 mb-4">
                了解您在面对生活中的各种挑战时的反应方式和调适能力。
              </p>
              <p className="text-sm text-gray-500 mb-4">预计用时：15-20分钟</p>
              <Link
                href="/resilience"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                开始探索
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
