import { Box, Typography, Stack, Chip } from '@mui/material';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface SeriesData {
  id: string;
  label: string;
  data: number[];
}

const LineChart: React.FC = () => {
  const data: SeriesData[] = [
    { id: 'vendas', label: 'Vendas', data: [120, 145, 138, 162, 178, 195, 210] },
    { id: 'receita', label: 'Receita', data: [80, 95, 110, 125, 140, 155, 170] },
  ];

  const xAxis = [
    {
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      scaleType: 'point' as const,
    },
  ];

  const vendasVariacao = ((210 - 120) / 120 * 100).toFixed(1);
  const receitaVariacao = ((170 - 80) / 80 * 100).toFixed(1);

  return (
    <Stack spacing={2} sx={{ height: '100%' }}>
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
          Evolução de Vendas e Receita
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b',
            fontSize: '0.875rem',
          }}
        >
          Tendência de crescimento mensal - Últimos 7 meses
        </Typography>
      </Box>

      {/* Métricas de Variação */}
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            flex: 1,
            p: 1.5,
            bgcolor: '#818cf815',
            borderRadius: 2,
            border: '1px solid #818cf830',
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
            Vendas
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
            <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#10b981' }}>
              +{vendasVariacao}%
            </Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 1.5,
            bgcolor: '#f472b615',
            borderRadius: 2,
            border: '1px solid #f472b630',
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
            Receita
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
            <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#10b981' }}>
              +{receitaVariacao}%
            </Typography>
          </Stack>
        </Box>
      </Stack>

      {/* Gráfico */}
      <Box sx={{ 
        width: '100%', 
        height: 300,
        bgcolor: '#f8fafc',
        borderRadius: 2,
        p: 2,
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        <MuiLineChart
          width={undefined}
          height={300}
          series={data.map((series, index) => ({
            id: series.id,
            label: series.label,
            data: series.data,
            curve: 'natural',
            color: index === 0 ? '#818cf8' : '#f472b6',
          }))}
          colors={['#818cf8', '#f472b6']}
          xAxis={xAxis}
          margin={{ top: 10, bottom: 20, left: 30, right: 30 }}
        />
      </Box>
    </Stack>
  );
};

export default LineChart;

