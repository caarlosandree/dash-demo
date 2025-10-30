import { memo } from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

interface SkeletonChartProps {
  height?: number;
  showHeader?: boolean;
  showMetrics?: boolean;
  variant?: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar' | 'gauge' | 'sparkline';
}

const SkeletonChart: React.FC<SkeletonChartProps> = ({ 
  height = 300, 
  showHeader = true, 
  showMetrics = true,
  variant = 'line'
}) => {
  const renderChartSkeleton = () => {
    switch (variant) {
      case 'line':
        return (
          <Box sx={{ position: 'relative', height: height - 40 }}>
            {/* Linhas do gráfico */}
            <Skeleton 
              variant="rectangular" 
              height={height - 80} 
              sx={{ 
                borderRadius: 2,
                '&::after': {
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }
              }} 
            />
            {/* Pontos da linha */}
            <Box sx={{ position: 'absolute', top: 20, left: 0, right: 0, height: height - 80 }}>
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton
                  key={i}
                  variant="circular"
                  width={8}
                  height={8}
                  sx={{
                    position: 'absolute',
                    left: `${(i * 100) / 6}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                />
              ))}
            </Box>
          </Box>
        );
      
      case 'bar':
        return (
          <Box sx={{ display: 'flex', alignItems: 'end', height: height - 40, gap: 1, px: 2 }}>
            {[0, 1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width="22%"
                height={`${60 + Math.random() * 40}%`}
                sx={{ borderRadius: '4px 4px 0 0' }}
              />
            ))}
          </Box>
        );
      
      case 'pie':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height - 40 }}>
            <Skeleton variant="circular" width={200} height={200} />
          </Box>
        );
      
      case 'area':
        return (
          <Box sx={{ position: 'relative', height: height - 40 }}>
            <Skeleton 
              variant="rectangular" 
              height={height - 80} 
              sx={{ 
                borderRadius: 2,
                '&::after': {
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                }
              }} 
            />
          </Box>
        );
      
      case 'scatter':
        return (
          <Box sx={{ position: 'relative', height: height - 40 }}>
            <Skeleton variant="rectangular" height={height - 80} sx={{ borderRadius: 2 }} />
            {/* Pontos de dispersão */}
            <Box sx={{ position: 'absolute', top: 20, left: 0, right: 0, height: height - 80 }}>
              {Array.from({ length: 15 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="circular"
                  width={6}
                  height={6}
                  sx={{
                    position: 'absolute',
                    left: `${Math.random() * 90}%`,
                    top: `${Math.random() * 80}%`,
                  }}
                />
              ))}
            </Box>
          </Box>
        );
      
      case 'radar':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height - 40 }}>
            <Skeleton variant="circular" width={250} height={250} />
          </Box>
        );
      
      case 'gauge':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height - 40 }}>
            <Skeleton variant="rectangular" width={200} height={100} sx={{ borderRadius: '100px 100px 0 0' }} />
          </Box>
        );
      
      case 'sparkline':
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: height - 40, px: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 2 }} />
          </Box>
        );
      
      default:
        return <Skeleton variant="rectangular" height={height - 40} sx={{ borderRadius: 2 }} />;
    }
  };

  return (
    <Stack spacing={2} sx={{ height: '100%' }}>
      {/* Header Skeleton */}
      {showHeader && (
        <Box>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mt: 0.5 }} />
        </Box>
      )}

      {/* Metrics Skeleton */}
      {showMetrics && (
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2 }}>
            <Skeleton variant="text" width="40%" height={16} />
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="text" width="30%" height={20} />
            </Stack>
          </Box>
          <Box sx={{ flex: 1, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2 }}>
            <Skeleton variant="text" width="40%" height={16} />
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="text" width="30%" height={20} />
            </Stack>
          </Box>
        </Stack>
      )}

      {/* Chart Skeleton */}
      <Box sx={{ 
        width: '100%', 
        height,
        bgcolor: '#f8fafc',
        borderRadius: 2,
        p: 2,
        border: '1px solid rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {renderChartSkeleton()}
        
        {/* Efeito de shimmer */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
            animation: 'shimmer 1.5s infinite',
            '@keyframes shimmer': {
              '0%': { left: '-100%' },
              '100%': { left: '100%' },
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default SkeletonChart;
