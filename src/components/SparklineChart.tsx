import { useState } from 'react';
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
import SparklineChartModal from './SparklineChartModal';

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
  const [openModal, setOpenModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [selectedData, setSelectedData] = useState<any>(null);

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

  // Dados detalhados para cada métrica
  const detailedData: Record<string, any> = {
    'Vendas': {
      nome: 'Vendas',
      cor: '#6366f1',
      dados: [12450, 13520, 12800, 14500, 15200, 14800, 16200, 15800, 17200, 16800, 18500, 19200],
      valorAtual: 19200,
      valorAnterior: 12450,
      variacao: 54.2,
      media: 15200,
      minimo: 12450,
      maximo: 19200,
      tendencia: 'crescente' as const,
      categoria: 'Financeiro',
      descricao: 'Receita total de vendas mensais',
      benchmark: 18000,
      segmentos: [
        { segmento: 'Varejo', valor: 11500, percentual: 60 },
        { segmento: 'Atacado', valor: 5500, percentual: 29 },
        { segmento: 'E-commerce', valor: 2200, percentual: 11 },
      ],
      comparativo: [
        { periodo: 'Jan', atual: 12450, anterior: 12000, variacao: 3.8 },
        { periodo: 'Fev', atual: 13520, anterior: 12500, variacao: 8.2 },
        { periodo: 'Mar', atual: 12800, anterior: 13000, variacao: -1.5 },
        { periodo: 'Abr', atual: 14500, anterior: 13500, variacao: 7.4 },
        { periodo: 'Mai', atual: 15200, anterior: 14000, variacao: 8.6 },
        { periodo: 'Jun', atual: 14800, anterior: 14500, variacao: 2.1 },
      ],
      previsao: [
        { periodo: 'Jan+1', valor: 20000 },
        { periodo: 'Fev+1', valor: 21000 },
        { periodo: 'Mar+1', valor: 22000 },
      ],
      insights: [
        'Crescimento consistente de 54% no período',
        'Pico de vendas em dezembro (19200)',
        'Tendência de crescimento acelerado'
      ],
      alertas: [
        { tipo: 'info' as const, mensagem: 'Meta mensal superada em 6.7%' },
        { tipo: 'warning' as const, mensagem: 'Atenção à sazonalidade em março' },
      ],
    },
    'Usuários Ativos': {
      nome: 'Usuários Ativos',
      cor: '#ec4899',
      dados: [1250, 1320, 1280, 1450, 1520, 1480, 1620, 1580, 1720, 1680, 1850, 2100],
      valorAtual: 2100,
      valorAnterior: 1250,
      variacao: 68.0,
      media: 1520,
      minimo: 1250,
      maximo: 2100,
      tendencia: 'crescente' as const,
      categoria: 'Engajamento',
      descricao: 'Usuários ativos mensais na plataforma',
      benchmark: 2000,
      segmentos: [
        { segmento: 'Mobile', valor: 1260, percentual: 60 },
        { segmento: 'Desktop', valor: 630, percentual: 30 },
        { segmento: 'Tablet', valor: 210, percentual: 10 },
      ],
      comparativo: [
        { periodo: 'Sem 1', atual: 1250, anterior: 1200, variacao: 4.2 },
        { periodo: 'Sem 2', atual: 1320, anterior: 1250, variacao: 5.6 },
        { periodo: 'Sem 3', atual: 1280, anterior: 1300, variacao: -1.5 },
        { periodo: 'Sem 4', atual: 1450, anterior: 1350, variacao: 7.4 },
        { periodo: 'Sem 5', atual: 1520, anterior: 1400, variacao: 8.6 },
        { periodo: 'Sem 6', atual: 1480, anterior: 1500, variacao: -1.3 },
      ],
      previsao: [
        { periodo: 'Sem 13', valor: 2200 },
        { periodo: 'Sem 14', valor: 2300 },
        { periodo: 'Sem 15', valor: 2400 },
      ],
      insights: [
        'Crescimento explosivo de 68% no período',
        'Mobile representa 60% dos usuários',
        'Tendência de crescimento sustentado'
      ],
      alertas: [
        { tipo: 'info' as const, mensagem: 'Meta semanal superada em 5%' },
        { tipo: 'info' as const, mensagem: 'Crescimento orgânico de 15%' },
      ],
    },
    'Receita Mensal': {
      nome: 'Receita Mensal',
      cor: '#10b981',
      dados: [45000, 48000, 46500, 52000, 54000, 51000, 58000, 56000, 62000, 60000, 68000, 75000],
      valorAtual: 75000,
      valorAnterior: 45000,
      variacao: 66.7,
      media: 56583,
      minimo: 45000,
      maximo: 75000,
      tendencia: 'crescente' as const,
      categoria: 'Financeiro',
      descricao: 'Receita total mensal gerada',
      benchmark: 70000,
      segmentos: [
        { segmento: 'Assinaturas', valor: 45000, percentual: 60 },
        { segmento: 'Vendas Avulsas', valor: 22500, percentual: 30 },
        { segmento: 'Parcerias', valor: 7500, percentual: 10 },
      ],
      comparativo: [
        { periodo: 'Jan', atual: 45000, anterior: 42000, variacao: 7.1 },
        { periodo: 'Fev', atual: 48000, anterior: 45000, variacao: 6.7 },
        { periodo: 'Mar', atual: 46500, anterior: 48000, variacao: -3.1 },
        { periodo: 'Abr', atual: 52000, anterior: 47000, variacao: 10.6 },
        { periodo: 'Mai', atual: 54000, anterior: 50000, variacao: 8.0 },
        { periodo: 'Jun', atual: 51000, anterior: 52000, variacao: -1.9 },
      ],
      previsao: [
        { periodo: 'Jan+1', valor: 78000 },
        { periodo: 'Fev+1', valor: 80000 },
        { periodo: 'Mar+1', valor: 82000 },
      ],
      insights: [
        'Crescimento sólido de 66.7% no período',
        'Assinaturas representam 60% da receita',
        'Queda sazonal em março e junho'
      ],
      alertas: [
        { tipo: 'info' as const, mensagem: 'Meta mensal superada em 7.1%' },
        { tipo: 'warning' as const, mensagem: 'Atenção à sazonalidade observada' },
      ],
    },
    'Tráfego Web': {
      nome: 'Tráfego Web',
      cor: '#f59e0b',
      dados: [12500, 13200, 12800, 14500, 15200, 14800, 16200, 15800, 17200, 16800, 18500, 22000],
      valorAtual: 22000,
      valorAnterior: 12500,
      variacao: 76.0,
      media: 15583,
      minimo: 12500,
      maximo: 22000,
      tendencia: 'crescente' as const,
      categoria: 'Marketing',
      descricao: 'Visitantes mensais no site',
      benchmark: 20000,
      segmentos: [
        { segmento: 'Orgânico', valor: 11000, percentual: 50 },
        { segmento: 'Pago', valor: 6600, percentual: 30 },
        { segmento: 'Direto', valor: 4400, percentual: 20 },
      ],
      comparativo: [
        { periodo: 'Sem 1', atual: 12500, anterior: 11500, variacao: 8.7 },
        { periodo: 'Sem 2', atual: 13200, anterior: 12000, variacao: 10.0 },
        { periodo: 'Sem 3', atual: 12800, anterior: 12500, variacao: 2.4 },
        { periodo: 'Sem 4', atual: 14500, anterior: 13000, variacao: 11.5 },
        { periodo: 'Sem 5', atual: 15200, anterior: 14000, variacao: 8.6 },
        { periodo: 'Sem 6', atual: 14800, anterior: 15000, variacao: -1.3 },
      ],
      previsao: [
        { periodo: 'Sem 13', valor: 23000 },
        { periodo: 'Sem 14', valor: 24000 },
        { periodo: 'Sem 15', valor: 25000 },
      ],
      insights: [
        'Crescimento excepcional de 76% no período',
        'Tráfego orgânico representa 50% do total',
        'Meta mensal de 20k superada consistentemente'
      ],
      alertas: [
        { tipo: 'info' as const, mensagem: 'Meta mensal superada em 10%' },
        { tipo: 'info' as const, mensagem: 'Tráfego orgânico em alta' },
      ],
    },
  };

  const handleMetricClick = (metricId: string) => {
    if (detailedData[metricId]) {
      setSelectedMetric(metricId);
      setSelectedData(detailedData[metricId]);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMetric('');
    setSelectedData(null);
  };

  return (
    <>
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
              onClick={() => handleMetricClick(metric.title)}
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
                      <Chip
                        label="Clique para detalhes"
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: '0.7rem',
                          height: 20,
                          color: 'text.secondary',
                          borderColor: 'rgba(0, 0, 0, 0.12)',
                        }}
                      />
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

    {/* Modal de detalhes */}
    {selectedData && (
      <SparklineChartModal
        open={openModal}
        onClose={handleCloseModal}
        selectedMetric={selectedMetric}
        data={{
          dados: selectedData.dados,
          periodos: [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          ],
          valorAtual: selectedData.valorAtual,
          valorAnterior: selectedData.valorAnterior,
        }}
        metricDetails={selectedData}
      />
    )}
    </>
  );
};

export default SparklineChart;
