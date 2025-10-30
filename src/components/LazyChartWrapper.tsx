import { Suspense, memo } from 'react';
import { Box, CircularProgress, Typography, Stack } from '@mui/material';
import SkeletonChart from './SkeletonChart';

interface LazyChartWrapperProps {
  children: React.ReactNode;
  variant?: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar' | 'gauge' | 'sparkline';
  height?: number;
  fallback?: React.ReactNode;
}

const LazyChartWrapper: React.FC<LazyChartWrapperProps> = ({ 
  children, 
  variant = 'line', 
  height = 300,
  fallback 
}) => {
  const defaultFallback = fallback || (
    <SkeletonChart 
      variant={variant} 
      height={height} 
      showHeader={true}
      showMetrics={true}
    />
  );

  return (
    <Suspense fallback={defaultFallback}>
      {children}
    </Suspense>
  );
};

export default memo(LazyChartWrapper);
