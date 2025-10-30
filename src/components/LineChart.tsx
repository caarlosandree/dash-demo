import { useState } from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LineChartModal from './LineChartModal';

interface SeriesData {
  id: string;
  label: string;
  data: number[];
}

interface LineChartProps {
  data?: {
    vendas: number[];
    receita: number[];
    meses: string[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data: propData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [selectedData, setSelectedData] = useState<any>(null);

  // Usar dados filtrados ou dados padrão
  const defaultData = {
    vendas: [120, 145, 138, 162, 178, 195, 210],
    receita: [80, 95, 110, 125, 140, 155, 170],
    meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  };

  const chartData = propData || defaultData;

  const data: SeriesData[] = [
    { id: 'vendas', label: 'Vendas', data: chartData.vendas },
    { id: 'receita', label: 'Receita', data: chartData.receita },
  ].filter(series => series.data.length > 0); // Filtrar séries vazias

  const xAxis = [
    {
      data: chartData.meses,
      scaleType: 'point' as const,
    },
  ];

  const vendasVariacao = chartData.vendas.length > 1 
    ? ((chartData.vendas[chartData.vendas.length - 1] - chartData.vendas[0]) / chartData.vendas[0] * 100).toFixed(1)
    : '0.0';
  const receitaVariacao = chartData.receita.length > 1 
    ? ((chartData.receita[chartData.receita.length - 1] - chartData.receita[0]) / chartData.receita[0] * 100).toFixed(1)
    : '0.0';

  // Dados detalhados para cada métrica
  const detailedData: Record<string, any> = {
    'Vendas': {
      nome: 'Vendas',
      cor: '#818cf8',
      dados: [120, 145, 138, 162, 178, 195, 210],
      total: 1148,
      crescimento: 75.0,
      media: 164,
      tendencia: 'crescente' as const,
      previsao: [220, 235, 250, 265, 280, 295, 310],
      segmentos: [
        { segmento: 'Varejo', valor: 450, percentual: 39.2 },
        { segmento: 'Atacado', valor: 320, percentual: 27.9 },
        { segmento: 'E-commerce', valor: 280, percentual: 24.4 },
        { segmento: 'B2B', valor: 98, percentual: 8.5 },
      ],
      comparativo: [
        { mes: 'Jan', atual: 120, anterior: 100, variacao: 20.0 },
        { mes: 'Fev', atual: 145, anterior: 120, variacao: 20.8 },
        { mes: 'Mar', atual: 138, anterior: 145, variacao: -4.8 },
        { mes: 'Abr', atual: 162, anterior: 138, variacao: 17.4 },
        { mes: 'Mai', atual: 178, anterior: 162, variacao: 9.9 },
        { mes: 'Jun', atual: 195, anterior: 178, variacao: 9.6 },
        { mes: 'Jul', atual: 210, anterior: 195, variacao: 7.7 },
      ],
    },
    'Receita': {
      nome: 'Receita',
      cor: '#f472b6',
      dados: [80, 95, 110, 125, 140, 155, 170],
      total: 875,
      crescimento: 112.5,
      media: 125,
      tendencia: 'crescente' as const,
      previsao: [180, 195, 210, 225, 240, 255, 270],
      segmentos: [
        { segmento: 'Produtos', valor: 520, percentual: 59.4 },
        { segmento: 'Serviços', valor: 280, percentual: 32.0 },
        { segmento: 'Assinaturas', valor: 75, percentual: 8.6 },
      ],
      comparativo: [
        { mes: 'Jan', atual: 80, anterior: 70, variacao: 14.3 },
        { mes: 'Fev', atual: 95, anterior: 80, variacao: 18.8 },
        { mes: 'Mar', atual: 110, anterior: 95, variacao: 15.8 },
        { mes: 'Abr', atual: 125, anterior: 110, variacao: 13.6 },
        { mes: 'Mai', atual: 140, anterior: 125, variacao: 12.0 },
        { mes: 'Jun', atual: 155, anterior: 140, variacao: 10.7 },
        { mes: 'Jul', atual: 170, anterior: 155, variacao: 9.7 },
      ],
    },
  };

  const handleLineClick = (event: any, itemIdentifier: any) => {
    const serieId = itemIdentifier?.dataIndex ?? itemIdentifier?.itemIndex ?? itemIdentifier?.index;
    const serieName = itemIdentifier?.seriesId;
    
    if (serieName && detailedData[serieName]) {
      setSelectedMetric(serieName);
      setSelectedData(detailedData[serieName]);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMetric('');
    setSelectedData(null);
  };

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
          Tendência de crescimento mensal - Últimos 7 meses - Clique nas linhas para detalhes
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
          onItemClick={handleLineClick}
          slotProps={{
            line: {
              cursor: 'pointer',
            },
          }}
        />
      </Box>

      {/* Modal de Detalhes */}
      {selectedData && (
        <LineChartModal
          open={openModal}
          onClose={handleCloseModal}
          selectedMetric={selectedMetric}
          data={{
            vendas: data[0].data,
            receita: data[1].data,
            meses: xAxis[0].data,
          }}
          metricDetails={selectedData}
        />
      )}
    </Stack>
  );
};

export default LineChart;

