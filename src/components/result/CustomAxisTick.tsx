// src/components/result/CustomAxisTick.tsx
import React from 'react'

interface CustomAxisTickProps {
  x?: number
  y?: number
  payload?: {
    value: string
  }
}

const CustomAxisTick: React.FC<CustomAxisTickProps> = ({
  x = 0,
  y = 0,
  payload,
}) => {
  if (!payload) return null

  const { value } = payload
  let dy = 0
  let dx = 0
  let adjustedTextAnchor: 'start' | 'middle' | 'end' = 'middle'

  // 根据不同维度调整位置
  switch (value) {
    case '成长信念':
      dy = -20
      break
    case '自我认知':
      dy = 25
      break
    case '开放性':
      dx = -25
      adjustedTextAnchor = 'end'
      break
    case '应对模式':
      dx = 25
      adjustedTextAnchor = 'start'
      break
  }

  return (
    <text
      x={x + dx}
      y={y + dy}
      textAnchor={adjustedTextAnchor}
      fill="#4B5563"
      fontSize={14}
      fontWeight={600}
      aria-label={`${value}维度`}
    >
      {value}
    </text>
  )
}

export default CustomAxisTick
