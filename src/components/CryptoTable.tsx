
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllCoins } from '../store/cryptoSlice';
import PriceChange from './PriceChange';
import MiniChart from './MiniChart';
import { cn } from '@/lib/utils';

const CryptoTable: React.FC = () => {
  const coins = useSelector(selectAllCoins);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof coins[0] | null;
    direction: 'ascending' | 'descending';
  }>({
    key: 'rank',
    direction: 'ascending',
  });

  const sortedCoins = React.useMemo(() => {
    const coinsCopy = [...coins];
    if (sortConfig.key) {
      coinsCopy.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return coinsCopy;
  }, [coins, sortConfig]);

  const requestSort = (key: keyof typeof coins[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 4 : 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  const getSortIndicator = (key: keyof typeof coins[0]) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1000px] border-collapse">
        <thead>
          <tr className="border-b border-gray-700 text-crypto-muted text-left">
            <th 
              className="py-4 px-3 cursor-pointer"
              onClick={() => requestSort('rank')}
            >
              # {getSortIndicator('rank')}
            </th>
            <th 
              className="py-4 px-3 cursor-pointer"
              onClick={() => requestSort('name')}
            >
              Name {getSortIndicator('name')}
            </th>
            <th 
              className="py-4 px-3 cursor-pointer text-right"
              onClick={() => requestSort('price')}
            >
              Price {getSortIndicator('price')}
            </th>
            <th 
              className="py-4 px-3 cursor-pointer text-right"
              onClick={() => requestSort('priceChange1h')}
            >
              1h % {getSortIndicator('priceChange1h')}
            </th>
            <th 
              className="py-4 px-3 cursor-pointer text-right"
              onClick={() => requestSort('priceChange24h')}
            >
              24h % {getSortIndicator('priceChange24h')}
            </th>
            <th 
              className="py-4 px-3 cursor-pointer text-right"
              onClick={() => requestSort('priceChange7d')}
            >
              7d % {getSortIndicator('priceChange7d')}
            </th>
            <th 
              className="py-4 px-3 cursor-pointer text-right"
              onClick={() => requestSort('marketCap')}
            >
              Market Cap {getSortIndicator('marketCap')}
            </th>
            <th 
              className="py-4 px-3 cursor-pointer text-right"
              onClick={() => requestSort('volume24h')}
            >
              Volume (24h) {getSortIndicator('volume24h')}
            </th>
            <th 
              className="py-4 px-3 cursor-pointer text-right"
              onClick={() => requestSort('circulatingSupply')}
            >
              Circulating Supply {getSortIndicator('circulatingSupply')}
            </th>
            <th className="py-4 px-3 text-right">Last 7d</th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.map((coin) => (
            <tr 
              key={coin.id} 
              className="border-b border-gray-700 hover:bg-gray-800 hover:bg-opacity-50 transition-colors"
            >
              <td className="py-5 px-3 text-crypto-muted">{coin.rank}</td>
              <td className="py-5 px-3">
                <div className="flex items-center space-x-2">
                  <img 
                    src={coin.logo} 
                    alt={`${coin.name} logo`} 
                    className="w-6 h-6" 
                  />
                  <span className="font-medium">{coin.name}</span>
                  <span className="text-crypto-muted">{coin.symbol}</span>
                </div>
              </td>
              <td 
                className={cn(
                  "py-5 px-3 text-right font-medium",
                  coin.priceDirection === 'up' ? 'animate-price-up' : 
                  coin.priceDirection === 'down' ? 'animate-price-down' : ''
                )}
              >
                {formatCurrency(coin.price)}
              </td>
              <td className="py-5 px-3 text-right">
                <PriceChange value={coin.priceChange1h} />
              </td>
              <td className="py-5 px-3 text-right">
                <PriceChange value={coin.priceChange24h} />
              </td>
              <td className="py-5 px-3 text-right">
                <PriceChange value={coin.priceChange7d} />
              </td>
              <td className="py-5 px-3 text-right">
                {formatMarketCap(coin.marketCap)}
              </td>
              <td className="py-5 px-3 text-right">
                {formatMarketCap(coin.volume24h)}
              </td>
              <td className="py-5 px-3 text-right">
                <div className="flex items-center justify-end space-x-1">
                  <span>{formatNumber(coin.circulatingSupply)}</span>
                  <span className="text-crypto-muted">{coin.symbol}</span>
                  {coin.maxSupply && (
                    <span className="text-xs text-crypto-muted">
                      {' '}({((coin.circulatingSupply / coin.maxSupply) * 100).toFixed(1)}%)
                    </span>
                  )}
                </div>
              </td>
              <td className="py-5 px-3 text-right">
                <MiniChart data={coin.chartData} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
