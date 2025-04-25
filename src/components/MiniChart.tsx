
import { useMemo } from 'react';

interface MiniChartProps {
  data: number[];
  width?: number;
  height?: number;
  lineColor?: string;
}

const MiniChart = ({ 
  data, 
  width = 120, 
  height = 40, 
  lineColor = '#3861fb' 
}: MiniChartProps) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;
    
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue || 1; // Avoid division by zero
    
    // Create points for SVG polyline
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      // Flip the y coordinate since SVG has 0,0 at top-left
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    // Determine if trend is up
    const isTrendUp = data[data.length - 1] >= data[0];
    
    return {
      points,
      isTrendUp,
    };
  }, [data, width, height]);
  
  if (!chartData) return null;
  
  return (
    <svg width={width} height={height} className="mini-chart">
      <polyline
        points={chartData.points}
        fill="none"
        stroke={chartData.isTrendUp ? '#00b88c' : '#ea384c'}
        strokeWidth="2"
      />
    </svg>
  );
};

export default MiniChart;
