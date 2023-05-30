import Head from "next/head";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { COINS_API } from "@/constants/api";
import { Coin } from "./types";
import { CoinTile } from "@/components/CoinTile";
import { Hero } from "@/components/Hero";
import { Error } from "@/components/Error";
import { Loading } from "@/components/Loading";

const Home: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<Coin[], Error>(
    ['coins'],
    async () => {
      const res = await fetch(
        `${COINS_API}/coins/markets?vs_currency=usd&per_page=45&page=1`
      );
      return res.json();
    }
  );

  return (
    <>
      <Head>
        <title>CoinGecko Market Pairs (USD)</title>
      </Head>
      <main>
        <Hero title="Market Pairs (USD)" subtitle="The following is a list of crypto currencies with information
        related to the USD trading pair." />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading && <Loading />}
          {isError && <Error message={error.message} />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data?.map(CoinTile)}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
