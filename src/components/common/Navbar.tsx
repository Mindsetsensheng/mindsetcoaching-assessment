// src/components/common/Navbar.tsx
import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logoNowords_150x150.png"
                alt="Mindset Coaching Logo"
                width="60"
                height="60"
                className="w-15 h-15"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/about"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              关于我们
            </Link>
            <Link
              href="/contact"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              联系方式
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
