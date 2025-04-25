
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface CryptoCoin {
  id: string;
  rank: number;
  logo: string;
  name: string;
  symbol: string;
  price: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: number[];
  lastUpdated: number;
  priceDirection: 'up' | 'down' | 'stable';
}

interface CryptoState {
  coins: CryptoCoin[];
  loading: boolean;
  error: string | null;
}

const initialCoins: CryptoCoin[] = [
  {
    id: 'bitcoin',
    rank: 1,
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 57325.89,
    priceChange1h: 0.62,
    priceChange24h: 1.25,
    priceChange7d: 5.67,
    marketCap: 1120768912345,
    volume24h: 32145698701,
    circulatingSupply: 19561718,
    maxSupply: 21000000,
    chartData: [54500, 55800, 56200, 55900, 57100, 57350, 57325],
    lastUpdated: Date.now(),
    priceDirection: 'stable',
  },
  {
    id: 'ethereum',
    rank: 2,
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3045.23,
    priceChange1h: -0.32,
    priceChange24h: 2.15,
    priceChange7d: -1.27,
    marketCap: 365987452168,
    volume24h: 15487962354,
    circulatingSupply: 120250814,
    maxSupply: null,
    chartData: [3080, 3120, 3050, 3010, 3090, 3030, 3045],
    lastUpdated: Date.now(),
    priceDirection: 'stable',
  },
  {
    id: 'ripple',
    rank: 3,
    logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    name: 'XRP',
    symbol: 'XRP',
    price: 0.53,
    priceChange1h: 0.89,
    priceChange24h: -1.34,
    priceChange7d: 3.76,
    marketCap: 28159324897,
    volume24h: 1587324561,
    circulatingSupply: 53145693874,
    maxSupply: 100000000000,
    chartData: [0.51, 0.52, 0.54, 0.53, 0.52, 0.53, 0.53],
    lastUpdated: Date.now(),
    priceDirection: 'stable',
  },
  {
    id: 'tether',
    rank: 4,
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    name: 'Tether',
    symbol: 'USDT',
    price: 0.9998,
    priceChange1h: 0.01,
    priceChange24h: -0.02,
    priceChange7d: 0.05,
    marketCap: 93247854123,
    volume24h: 65874123954,
    circulatingSupply: 93267428156,
    maxSupply: null,
    chartData: [1, 0.9999, 0.9997, 0.9998, 0.9999, 0.9998, 0.9998],
    lastUpdated: Date.now(),
    priceDirection: 'stable',
  },
  {
    id: 'binancecoin',
    rank: 5,
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 574.32,
    priceChange1h: 1.25,
    priceChange24h: 3.78,
    priceChange7d: -0.92,
    marketCap: 88256478945,
    volume24h: 2547896321,
    circulatingSupply: 153674825,
    maxSupply: 200000000,
    chartData: [560, 565, 570, 580, 575, 573, 574],
    lastUpdated: Date.now(),
    priceDirection: 'stable',
  },
];

const initialState: CryptoState = {
  coins: initialCoins,
  loading: false,
  error: null,
};

// Helper function to generate random price changes
const getRandomPriceChange = (min: number, max: number) => {
  return +(Math.random() * (max - min) + min).toFixed(2);
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoData: (state) => {
      state.coins = state.coins.map(coin => {
        // Store the old price to determine direction
        const oldPrice = coin.price;
        
        // Generate new price with small random changes
        const changePercent = getRandomPriceChange(-1.5, 1.5) / 100;
        const newPrice = +(oldPrice * (1 + changePercent)).toFixed(
          coin.price < 1 ? 4 : coin.price < 100 ? 2 : coin.price < 1000 ? 2 : 2
        );
        
        // Determine price direction
        const priceDirection: 'up' | 'down' | 'stable' = 
          newPrice > oldPrice ? 'up' : newPrice < oldPrice ? 'down' : 'stable';
        
        // Update hourly, daily, and weekly percentage changes
        const priceChange1h = +(coin.priceChange1h + getRandomPriceChange(-0.3, 0.3)).toFixed(2);
        const priceChange24h = +(coin.priceChange24h + getRandomPriceChange(-0.5, 0.5)).toFixed(2);
        const priceChange7d = +(coin.priceChange7d + getRandomPriceChange(-0.3, 0.3)).toFixed(2);
        
        // Update 24h volume with small random changes
        const volumeChangePercent = getRandomPriceChange(-2, 2) / 100;
        const newVolume = Math.round(coin.volume24h * (1 + volumeChangePercent));
        
        // Update chart data by adding new price and removing the oldest
        const newChartData = [...coin.chartData.slice(1), newPrice];
        
        return {
          ...coin,
          price: newPrice,
          priceChange1h,
          priceChange24h,
          priceChange7d,
          volume24h: newVolume,
          chartData: newChartData,
          lastUpdated: Date.now(),
          priceDirection,
        };
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { updateCryptoData, setLoading, setError } = cryptoSlice.actions;

// Selectors
export const selectAllCoins = (state: RootState) => state.crypto.coins;
export const selectCoinById = (state: RootState, id: string) => 
  state.crypto.coins.find(coin => coin.id === id);
export const selectLoading = (state: RootState) => state.crypto.loading;
export const selectError = (state: RootState) => state.crypto.error;

export default cryptoSlice.reducer;
