import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CoinTileProps } from './types'

export const CoinTile: React.FC<CoinTileProps> = ({ id, current_price, high_24h, low_24h, name, image }) => {
  return (
    <div key={id} className="flex flex-col">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="object-cover object-center mx-auto"
      />
      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold mb-2 text-center">{name}</h2>
        <ul className="list-disc pl-5">
          <li>Current Price: {current_price}</li>
          <li>24h High: {high_24h}</li>
          <li>24h Low: {low_24h}</li>
        </ul>
      </div>
      <div className="p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          <Link href={`/currency/${id}`}>More</Link>
        </button>
      </div>
    </div>
  )
}
