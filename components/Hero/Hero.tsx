import React from 'react'
import { HeroProps } from './types'

export const Hero: React.FC<HeroProps> = ({ title, subtitle }) =>  (
  <div className="bg-white pt-8 pb-6">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-sm">
      {typeof title === 'string' ? (
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          {title}
        </h1>
      )
      : title
      }
      {subtitle && <p className="text-xl text-center text-gray-600">
        {subtitle}
      </p>}
    </div>
  </div>
)
