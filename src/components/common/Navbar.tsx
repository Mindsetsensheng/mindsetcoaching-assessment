// src/components/common/Navbar.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import SupportModal from './SupportModal'
import { QRCodeModal } from './QRCodeModal'
import {
  SupportModalProps,
  QRCodeModalProps,
} from '@/components/result/config/types'

const Navbar = () => {
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [showQRCodeModal, setShowQRCodeModal] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded"
              />
            </Link>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setShowQRCodeModal(true)}
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 focus:outline-none transition-colors group mr-4"
            >
              关注公众号
            </button>

            <button
              onClick={() => setShowSupportModal(true)}
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 focus:outline-none transition-colors group"
            >
              <Heart className="w-5 h-5 mr-2 stroke-red-500 stroke-2 fill-transparent group-hover:fill-red-500 transition-all" />
              支持我们
            </button>
          </div>
        </div>
      </div>

      <QRCodeModal
        open={showQRCodeModal}
        onClose={() => setShowQRCodeModal(false)}
      />
      <SupportModal
        open={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </nav>
  )
}

export default Navbar
