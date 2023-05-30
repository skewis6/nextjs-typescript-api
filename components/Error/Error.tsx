import React from 'react'
import { ErrorProps } from './types'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center">
      <ExclamationCircleIcon className="h-12 w-12 text-red-500" aria-hidden="true" />
      <p className="ml-5 text-3xl" id="message">
        {message}
      </p>
    </div>
  )
}
