import { useState } from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { LineChart as MuiAreaChart } from '@mui/x-charts/LineChart';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import { useMemo } from 'react';
import AreaChartModal from './AreaChartModal';

interface AreaData {
  id: string;
  label: string;
  data: number[];
}

const AreaChart: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [selectedData, setSelectedData] = useState<any>(null);

  const data: AreaData[] = [
    { id: 'usuarios', label: 'Usuários Ativos', data: [420, 430, 448, 470, 540, 580, 690] },
    { id: 'sessoes', label: 'Novos Usuários', data: [240, 280, 290, 320, 380, 420, 450] },
  ];

  const xAxis = [
    {
      data: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      scaleType: 'point' as const,
    },
  ];

  const totalUsuarios = useMemo(() => {
    return data[0].data.reduce((acc, val) => acc + val, 0);
  }, [data]);

  const mediaUsuarios = useMemo(() => {
    return Math.round(totalUsuarios / data[0].data.length);
  }, [totalUsuarios]);

  const variacaoUsuarios = useMemo(() => {
    const primeiro = data[0].data[0];
    const ultimo = data[0].data[data[0].data.length - 1];
    return ((ultimo - primeiro) / primeiro * 100).toFixed(1);
  }, [data]);

  // Dados detalhados para cada métrica
  const detailedData: Record<string, any> = {
    'Usuários Ativos': {
      nome: 'Usuários Ativos',
      cor: '#818cf8',
      dados: [420, 430, 448, 470, 540, 580, 690],
      total: 3978,
      crescimento: 64.3,
      media: 568,
      pico: 690,
      valle: 420,
      tendencia: 'crescente' as const,
      segmentos: [
        { segmento: 'Mobile', usuarios: 1800, percentual: 45.3 },
        { segmento: 'Desktop', usuarios: 1200, percentual: 30.2 },
        { segmento: 'Tablet', usuarios: 650, percentual: 16.3 },
        { segmento: 'Smart TV', usuarios: 328, percentual: 8.2 },
      ],
      horarios: [
        { horario: '08:00-10:00', usuarios: 450 },
        { horario: '12:00-14:00', usuarios: 380 },
        { horario: '18:00-20:00', usuarios: 520 },
        { horario: '20:00-22:00', usuarios: 680 },
      ],
      dispositivos: [
        { dispositivo: 'Android', usuarios: 1200, percentual: 30.2 },
        { dispositivo: 'iOS', usuarios: 900, percentual: 22.6 },
        { dispositivo: 'Windows', usuarios: 800, percentual: 20.1 },
        { dispositivo: 'macOS', usuarios: 600, percentual: 15.1 },
        { dispositivo: 'Linux', usuarios: 300, percentual: 7.5 },
        { dispositivo: 'Outros', usuarios: 178, percentual: 4.5 },
      ],
    },
    'Novos Usuários': {
      nome: 'Novos Usuários',
      cor: '#f472b6',
      dados: [240, 280, 290, 320, 380, 420, 450],
      total: 2380,
      crescimento: 87.5,
      media: 340,
      pico: 450,
      valle: 240,
      tendencia: 'crescente' as const,
      segmentos: [
        { segmento: 'Orgânico', usuarios: 1200, percentual: 50.4 },
        { segmento: 'Social Media', usuarios: 650, percentual: 27.3 },
        { segmento: 'Referência', usuarios: 380, percentual: 16.0 },
        { segmento: 'Pago', usuarios: 150, percentual: 6.3 },
      ],
      horarios: [
        { horario: '09:00-11:00', usuarios: 280 },
        { horario: '13:00-15:00', usuarios: 320 },
        { horario: '19:00-21:00', usuarios: 450 },
        { horario: '21:00-23:00', usuarios: 380 },
      ],
      dispositivos: [
        { dispositivo: 'Mobile', usuarios: 1400, percentual: 58.8 },
        { dispositivo: 'Desktop', usuarios: 650, percentual: 27.3 },
        { dispositivo: 'Tablet', usuarios: 280, percentual: 11.8 },
        { dispositivo: 'Outros', usuarios: 50, percentual: 2.1 },
      ],
    },
  };

  const handleAreaClick = (event: any, itemIdentifier: any) => {
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
          Atividade de Usuários Semanal
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b',
            fontSize: '0.875rem',
          }}
        >
          Acompanhamento diário de usuários ativos e novos cadastros - Clique nas áreas para detalhes
        </Typography>
      </Box>

      {/* Métricas */}
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            flex: 1,
            p: 1.5,
            bgcolor: '#818cf815',
            borderRadius: 2,
            border: '1px solid #818cf830',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              p: 0.75,
              bgcolor: '#818cf8',
              borderRadius: 1.5,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PeopleIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
              Total Semanal
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
              {totalUsuarios.toLocaleString('pt-BR')}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 1.5,
            bgcolor: '#f472b615',
            borderRadius: 2,
            border: '1px solid #f472b630',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              p: 0.75,
              bgcolor: '#f472b6',
              borderRadius: 1.5,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <GroupIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
              Crescimento
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
              +{variacaoUsuarios}%
            </Typography>
          </Box>
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
        <MuiAreaChart
          width={undefined}
          height={300}
          series={data.map((series, index) => ({
            id: series.id,
            label: series.label,
            data: series.data,
            stack: 'total',
            area: true,
            color: index === 0 ? '#818cf8' : '#f472b6',
          }))}
          colors={['#818cf8', '#f472b6']}
          xAxis={xAxis}
          margin={{ top: 10, bottom: 20, left: 30, right: 30 }}
          onItemClick={handleAreaClick}
          slotProps={{
            area: {
              cursor: 'pointer',
            },
          }}
        />
      </Box>

      {/* Resumo */}
      <Box
        sx={{
          p: 1.5,
          bgcolor: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
          background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem' }}>
          Média Diária
        </Typography>
        <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
          {mediaUsuarios} usuários
        </Typography>
      </Box>

      {/* Modal de Detalhes */}
      {selectedData && (
        <AreaChartModal
          open={openModal}
          onClose={handleCloseModal}
          selectedMetric={selectedMetric}
          data={{
            usuarios: data[0].data,
            sessoes: data[1].data,
            dias: xAxis[0].data,
          }}
          metricDetails={selectedData}
        />
      )}
    </Stack>
  );
};

export default AreaChart;

