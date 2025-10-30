import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import { RadarChart as MuiRadarChart } from '@mui/x-charts/RadarChart';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useMemo } from 'react';

interface RadarSeries {
  id: string;
  label: string;
  data: number[];
}

interface RadarConfig {
  metrics: string[];
  max: number;
}

interface RadarMetric {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const RadarChart: React.FC = () => {
  const series: RadarSeries[] = [
    {
      id: 'Performance',
      label: 'Performance',
      data: [85, 92, 78, 88, 90, 82],
    },
  ];

  const metrics: string[] = ['Velocidade', 'Segurança', 'Usabilidade', 'Design', 'Funcionalidades', 'Suporte'];
  
  const radar: RadarConfig = {
    metrics,
    max: 100,
  };

  // Define os ícones e cores para cada métrica
  const metricDetails: RadarMetric[] = useMemo(() => [
    { label: 'Velocidade', value: 85, icon: <SpeedIcon />, color: '#6366f1' },
    { label: 'Segurança', value: 92, icon: <SecurityIcon />, color: '#10b981' },
    { label: 'Usabilidade', value: 78, icon: <CheckCircleIcon />, color: '#ec4899' },
    { label: 'Design', value: 88, icon: <CheckCircleIcon />, color: '#f59e0b' },
    { label: 'Funcionalidades', value: 90, icon: <CheckCircleIcon />, color: '#8b5cf6' },
    { label: 'Suporte', value: 82, icon: <CheckCircleIcon />, color: '#06b6d4' },
  ], []);

  // Calcula média geral
  const mediaGeral = useMemo(() => {
    const soma = series[0].data.reduce((acc, val) => acc + val, 0);
    return Math.round(soma / series[0].data.length);
  }, [series]);

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: '#1e293b',
            mb: 0.5,
          }}
        >
          Análise de Performance do Sistema
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b',
            fontSize: '0.875rem',
          }}
        >
          Avaliação completa das principais dimensões do produto
        </Typography>
      </Box>

      {/* Gráfico Radar */}
      <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f8fafc',
        borderRadius: 2,
        p: 3,
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        <MuiRadarChart
          width={550}
          height={450}
          series={series}
          radar={radar}
          colors={['#818cf8']}
        />
      </Box>

      {/* Métricas Detalhadas */}
      <Grid container spacing={2}>
        {metricDetails.map((metric, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 4 }} key={index}>
            <Box
              sx={{
                p: 2,
                bgcolor: '#ffffff',
                borderRadius: 2,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${metric.color}20`,
                  border: `1px solid ${metric.color}40`,
                },
              }}
            >
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      p: 0.5,
                      borderRadius: 1,
                      bgcolor: `${metric.color}15`,
                      color: metric.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {metric.icon}
                  </Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#64748b',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    {metric.label}
                  </Typography>
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    color: metric.color,
                  }}
                >
                  {metric.value}%
                </Typography>
                <Box
                  sx={{
                    height: 4,
                    bgcolor: '#e2e8f0',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${metric.value}%`,
                      bgcolor: metric.color,
                      transition: 'width 0.5s ease',
                    }}
                  />
                </Box>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Média Geral */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          bgcolor: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
          background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
          borderRadius: 2,
          border: 'none',
        }}
      >
        <Box>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            Média Geral
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#ffffff',
              fontWeight: 700,
            }}
          >
            {mediaGeral}%
          </Typography>
        </Box>
        <Chip
          label={
            mediaGeral >= 85 ? 'Excelente' : 
            mediaGeral >= 75 ? 'Muito Bom' : 
            mediaGeral >= 65 ? 'Bom' : 'Regular'
          }
          size="small"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        />
      </Box>
    </Stack>
  );
};

export default RadarChart;

