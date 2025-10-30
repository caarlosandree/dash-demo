import { Box, Typography, Stack, Chip } from '@mui/material';
import { LineChart as MuiAreaChart } from '@mui/x-charts/LineChart';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import { useMemo } from 'react';

interface AreaData {
  id: string;
  label: string;
  data: number[];
}

const AreaChart: React.FC = () => {
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
          Acompanhamento diário de usuários ativos e novos cadastros
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
    </Stack>
  );
};

export default AreaChart;

