import { useState, useEffect, memo } from 'react';
import { Box, Typography, Chip, Stack, Collapse, IconButton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';

interface BundleInfo {
  name: string;
  size: number;
  loaded: boolean;
  loadTime?: number;
}

interface BundleAnalyzerProps {
  showInDevelopment?: boolean;
}

const BundleAnalyzer: React.FC<BundleAnalyzerProps> = ({ 
  showInDevelopment = process.env.NODE_ENV === 'development' 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [bundles, setBundles] = useState<BundleInfo[]>([]);

  useEffect(() => {
    if (!showInDevelopment) return;

    // Simular informações de bundle (em produção, isso viria de uma ferramenta real)
    const initialBundles: BundleInfo[] = [
      { name: 'main', size: 245, loaded: true, loadTime: 120 },
      { name: 'LineChart', size: 89, loaded: false },
      { name: 'BarChart', size: 92, loaded: false },
      { name: 'PieChart', size: 95, loaded: false },
      { name: 'AreaChart', size: 88, loaded: false },
      { name: 'ScatterChart', size: 91, loaded: false },
      { name: 'SparklineChart', size: 76, loaded: false },
      { name: 'GaugeChart', size: 84, loaded: false },
      { name: 'FunnelChart', size: 87, loaded: false },
      { name: 'RadarChart', size: 93, loaded: false },
      { name: 'ClinicStats', size: 156, loaded: false },
    ];

    setBundles(initialBundles);

    // Simular carregamento progressivo dos bundles
    const loadBundles = () => {
      const unloadedBundles = initialBundles.filter(b => !b.loaded);
      
      unloadedBundles.forEach((bundle, index) => {
        setTimeout(() => {
          setBundles(prev => 
            prev.map(b => 
              b.name === bundle.name 
                ? { ...b, loaded: true, loadTime: Math.random() * 200 + 50 }
                : b
            )
          );
        }, index * 500);
      });
    };

    const timer = setTimeout(loadBundles, 2000);
    return () => clearTimeout(timer);
  }, [showInDevelopment]);

  if (!showInDevelopment) return null;

  const totalSize = bundles.reduce((acc, bundle) => acc + bundle.size, 0);
  const loadedSize = bundles.filter(b => b.loaded).reduce((acc, bundle) => acc + bundle.size, 0);
  const loadedCount = bundles.filter(b => b.loaded).length;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 3,
        minWidth: 300,
        maxWidth: 400,
      }}
    >
      <Box
        sx={{
          p: 2,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Bundle Analyzer
          </Typography>
          <Chip 
            label={`${loadedCount}/${bundles.length}`} 
            size="small" 
            color={loadedCount === bundles.length ? 'success' : 'primary'}
          />
        </Stack>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ p: 2, pt: 0 }}>
          <Stack spacing={2}>
            {/* Resumo */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Tamanho Total: {totalSize}KB | Carregado: {loadedSize}KB
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 8,
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: `${(loadedSize / totalSize) * 100}%`,
                    height: '100%',
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
            </Box>

            {/* Lista de Bundles */}
            <Stack spacing={1}>
              {bundles.map((bundle) => (
                <Box
                  key={bundle.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1,
                    bgcolor: bundle.loaded ? 'success.50' : 'grey.50',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: bundle.loaded ? 'success.200' : 'grey.200',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {bundle.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      {bundle.size}KB
                    </Typography>
                    {bundle.loaded && bundle.loadTime && (
                      <Typography variant="caption" color="success.main">
                        {bundle.loadTime.toFixed(0)}ms
                      </Typography>
                    )}
                    <Chip
                      label={bundle.loaded ? 'Loaded' : 'Pending'}
                      size="small"
                      color={bundle.loaded ? 'success' : 'default'}
                      sx={{ fontSize: '0.7rem', height: 20 }}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default memo(BundleAnalyzer);
