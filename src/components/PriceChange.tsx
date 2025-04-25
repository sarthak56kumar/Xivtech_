
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceChangeProps {
  value: number;
  className?: string;
}

const PriceChange = ({ value, className }: PriceChangeProps) => {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  return (
    <div 
      className={cn(
        'flex items-center space-x-1',
        isPositive ? 'text-crypto-positive' : isNegative ? 'text-crypto-negative' : 'text-crypto-muted',
        className
      )}
    >
      {isPositive ? (
        <ArrowUp className="w-4 h-4" />
      ) : isNegative ? (
        <ArrowDown className="w-4 h-4" />
      ) : null}
      <span>{absValue.toFixed(2)}%</span>
    </div>
  );
};

export default PriceChange;
