export type CoinData = {
  name: string;
  image: { small: string };
  market_data: {
    current_price: { usd: number };
    ath: { usd: number };
  };
  market_cap_rank: number;
};