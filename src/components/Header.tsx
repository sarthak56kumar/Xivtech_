
import { useSelector } from 'react-redux';
import { selectAllCoins } from '../store/cryptoSlice';

const Header = () => {
  const coins = useSelector(selectAllCoins);
  
  const topCoin = coins[0]; // Bitcoin usually
  const percentChange24h = topCoin ? topCoin.priceChange24h : 0;
  const isPositive = percentChange24h > 0;
  
  return (
    <header className="py-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        Crypto Price Tracker
      </h1>
      <p className="text-crypto-muted mb-4">
        Real-time cryptocurrency price updates and market information
      </p>
      {topCoin && (
        <div className="inline-flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2">
          <span className="mr-2">Market: </span>
          <div className={isPositive ? "text-crypto-positive" : "text-crypto-negative"}>
            {isPositive ? "+" : ""}{percentChange24h.toFixed(2)}% (24h)
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
