import { cn } from '@/lib/utils'
import React from 'react'

const Header = () => {
  return (
    <header
      className={cn(
        'w-auto rounded-b-lg bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-center shadow-lg sm:max-w-xl',
      )}
    >
      <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
        Convert your image to .webp format
      </h1>
      <p className="mt-2 text-lg text-blue-200">
        Easy and fast conversion with a click of a button!
      </p>
    </header>
  )
}

export default Header
