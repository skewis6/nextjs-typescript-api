import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { CoinData } from './types'
import { COINS_API } from '@/constants/api'
import { Hero } from '@/components/Hero'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import { currencyFormatter } from '@/utilities/currencyFormatter'
import { Error } from '@/components/Error'
import { Loading } from '@/components/Loading'

const Currency: React.FC = () => {
  const [symbolError, setSymbolError] = useState(false)
  const router = useRouter();
  const { symbol } = router.query;


  // NOTE: not entirely happy with this solution, but in the interest of timie I'm going to leave it as is
  // this essentially makes sure the page fails gracefully if the symbol is not found
  useEffect(() => {
    if (!symbol) {
      setSymbolError(false)
    }
  }, [])

  useEffect(() => {
    if (symbol) {
      setSymbolError(true)
    }
  }, [symbol])

  const { data, isLoading, isError, error } = useQuery<CoinData, Error>(
    ['coin'],
    async () => {
      const res = await fetch(
        `${COINS_API}/coins/${symbol}`
      );
      return res.json();
    }
  );

  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error message={error.message} />}
      {!isLoading && symbolError && <Error message="Currency not found" />}
      {(!isError && !symbolError && !isLoading) && 
        <>
          <Hero title={
            <>
              <div className="flex justify-center align-center mb-4">
                <h1 className="text-4xl font-bold text-center text-gray-900 mr-3">
                  {data?.name}
                </h1>
                {data && <Image src={data?.image.small} alt={data?.name} width={36} height={36} />}
              </div>
              
              <Link className="text-black flex justify-center" href="/">
                <ArrowLeftCircleIcon className="mr-2" width={24} />
                View All Currencies
              </Link>
            </>
          } />
          <main>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ul className="list-disc pl-5">
                {data && (
                  <>
                    <p>Market Cap Rank: {data.market_cap_rank}</p>
                    <p>Current Price: {currencyFormatter(data.market_data.current_price.usd)} </p>
                    <p>All time high price: {currencyFormatter(data.market_data.ath.usd)} </p>
                  </>
                )}
              </ul>
            </div>
          </main>
          </>
        }
    </>
  )
}

export default Currency