import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Stack,
  Chip
} from '@mui/material';
import { SparkLineChart as MuiSparklineChart } from '@mui/x-charts/SparkLineChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WebIcon from '@mui/icons-material/Web';

interface SparklineMetric {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  data: number[];
  currentValue: number;
  previousValue: number;
  color: string;
  gradient: string;
  plotType?: 'line' | 'bar';
  format?: (value: number) => string;
}

const SparklineChart: React.FC = () => {
  const calculateVariation = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const calculateStats = (data: number[]) => {
    const sum = data.reduce((a, b) => a + b, 0);
    const avg = sum / data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);
    return { avg, min, max };
  };

  const metrics: SparklineMetric[] = [
    {
      id: 'vendas',
      title: 'Vendas',
      subtitle: 'Últimos 12 meses',
      icon: <ShoppingCartIcon />,
      data: [12450, 13520, 12800, 14500, 15200, 14800, 16200, 15800, 17200, 16800, 18500, 19200],
      currentValue: 19200,
      previousValue: 12450,
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
      plotType: 'line',
      format: (val) => `R$ ${val.toLocaleString('pt-BR')}`,
    },
    {
      id: 'usuarios',
      title: 'Usuários Ativos',
      subtitle: 'Últimas 12 semanas',
      icon: <PeopleIcon />,
      data: [1250, 1320, 1280, 1450, 1520, 1480, 1620, 1580, 1720, 1680, 1850, 2100],
      currentValue: 2100,
      previousValue: 1250,
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      plotType: 'bar',
      format: (val) => val.toLocaleString('pt-BR'),
    },
    {
      id: 'receita',
      title: 'Receita Mensal',
      subtitle: 'Últimos 12 meses',
      icon: <AttachMoneyIcon />,
      data: [45000, 48000, 46500, 52000, 54000, 51000, 58000, 56000, 62000, 60000, 68000, 75000],
      currentValue: 75000,
      previousValue: 45000,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      plotType: 'line',
      format: (val) => `R$ ${(val / 1000).toFixed(0)}k`,
    },
    {
      id: 'trafego',
      title: 'Tráfego Web',
      subtitle: 'Últimas 12 semanas',
      icon: <WebIcon />,
      data: [12500, 13200, 12800, 14500, 15200, 14800, 16200, 15800, 17200, 16800, 18500, 22000],
      currentValue: 22000,
      previousValue: 12500,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      plotType: 'bar',
      format: (val) => `${(val / 1000).toFixed(1)}k`,
    },
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric) => {
        const variation = calculateVariation(metric.currentValue, metric.previousValue);
        const stats = calculateStats(metric.data);
        const isPositive = variation >= 0;

        return (
          <Grid size={{ xs: 12, sm: 6 }} key={metric.id}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: metric.gradient,
                },
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  border: `1px solid ${metric.color}40`,
                },
              }}
            >
              <Stack spacing={2}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1.5,
                          background: metric.gradient,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 4px 12px ${metric.color}40`,
                        }}
                      >
                        {metric.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: 'text.primary',
                          fontSize: '1rem',
                        }}
                      >
                        {metric.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        ml: 5.5,
                        fontSize: '0.75rem',
                      }}
                    >
                      {metric.subtitle}
                    </Typography>
                  </Box>
                  <Chip
                    icon={isPositive ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : <TrendingDownIcon sx={{ fontSize: 16 }} />}
                    label={`${isPositive ? '+' : ''}${variation.toFixed(1)}%`}
                    size="small"
                    sx={{
                      bgcolor: isPositive ? '#10b98115' : '#ef444415',
                      color: isPositive ? '#059669' : '#dc2626',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24,
                      '& .MuiChip-icon': {
                        color: 'inherit',
                      },
                    }}
                  />
                </Box>

                {/* Valor Atual */}
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      background: metric.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    }}
                  >
                    {metric.format?.(metric.currentValue) || metric.currentValue.toLocaleString('pt-BR')}
                  </Typography>
                </Box>

                {/* Gráfico Sparkline */}
                <Box sx={{ mt: 1 }}>
                  <MuiSparklineChart
                    data={metric.data}
                    width={undefined}
                    height={80}
                    plotType={metric.plotType || 'line'}
                    showTooltip
                    showHighlight
                    color={metric.color}
                    sx={{
                      width: '100%',
                    }}
                  />
                </Box>

                {/* Estatísticas */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    pt: 2,
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.7rem',
                        mb: 0.25,
                      }}
                    >
                      Média
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: '0.85rem',
                      }}
                    >
                      {metric.format?.(stats.avg) || stats.avg.toLocaleString('pt-BR')}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.7rem',
                        mb: 0.25,
                      }}
                    >
                      Mín / Máx
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: '0.85rem',
                      }}
                    >
                      {metric.format?.(stats.min) || stats.min.toLocaleString('pt-BR')} / {metric.format?.(stats.max) || stats.max.toLocaleString('pt-BR')}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SparklineChart;
