import { Box, Typography, Stack, Chip } from '@mui/material';
import { GaugeContainer, GaugeValueArc, GaugeReferenceArc } from '@mui/x-charts/Gauge';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useMemo } from 'react';

interface GaugeMetrics {
  value: number;
  meta: number;
  variacao: number;
  label: string;
  descricao: string;
}

const GaugeChart: React.FC = () => {
  const metrics: GaugeMetrics = {
    value: 75,
    meta: 85,
    variacao: 5.2,
    label: 'Performance Geral',
    descricao: 'Eficiência operacional do sistema',
  };

  // Determina a cor e status baseado no valor
  const gaugeConfig = useMemo(() => {
    const percentual = (metrics.value / 100) * 100;
    if (percentual >= 80) {
      return {
        color: '#10b981', // verde
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        status: 'Excelente',
        statusColor: '#10b981',
      };
    } else if (percentual >= 60) {
      return {
        color: '#818cf8', // índigo
        gradient: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
        status: 'Bom',
        statusColor: '#818cf8',
      };
    } else if (percentual >= 40) {
      return {
        color: '#f59e0b', // amarelo
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        status: 'Moderado',
        statusColor: '#f59e0b',
      };
    } else {
      return {
        color: '#ef4444', // vermelho
        gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        status: 'Atenção',
        statusColor: '#ef4444',
      };
    }
  }, [metrics.value]);

  // Calcula porcentagem até a meta
  const progressoMeta = ((metrics.value / metrics.meta) * 100).toFixed(1);

  return (
    <Stack spacing={2} sx={{ height: '100%' }}>
      {/* Header com título e descrição */}
      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: '#1e293b',
            mb: 0.5,
          }}
        >
          {metrics.label}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b',
            fontSize: '0.875rem',
          }}
        >
          {metrics.descricao}
        </Typography>
      </Box>

      {/* Card Resumo com Gauge */}
      <Box
        sx={{
          p: 3,
          bgcolor: `${gaugeConfig.color}10`,
          borderRadius: 2,
          border: `1px solid ${gaugeConfig.color}30`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gauge principal */}
        <Box sx={{ 
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <GaugeContainer
            width={200}
            height={200}
            startAngle={-110}
            endAngle={110}
            value={metrics.value}
          >
            <GaugeReferenceArc 
              color="#e2e8f0"
            />
            {/* Arcos de zona de cor */}
            <GaugeValueArc
              color={gaugeConfig.color}
            />
            
            {/* Valor central */}
            <text 
              x="50%" 
              y="45%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fontSize="36" 
              fontWeight="bold"
              fill={gaugeConfig.color}
            >
              {metrics.value}
            </text>
            <text 
              x="50%" 
              y="58%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fontSize="14" 
              fontWeight="500"
              fill="#64748b"
            >
              %
            </text>
          </GaugeContainer>

        </Box>
        
        {/* Badge de status no canto */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        >
          <Chip
            label={gaugeConfig.status}
            size="small"
            sx={{
              bgcolor: `${gaugeConfig.statusColor}20`,
              color: gaugeConfig.statusColor,
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 26,
              border: `1px solid ${gaugeConfig.statusColor}40`,
            }}
          />
        </Box>
      </Box>

      {/* Métricas adicionais */}
      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent="space-around"
        sx={{
          pt: 1.5,
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Meta */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#818cf815',
              borderRadius: 2,
              border: '1px solid #818cf830',
              textAlign: 'center',
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#64748b',
                fontSize: '0.7rem',
                display: 'block',
                mb: 0.5,
              }}
            >
              Meta
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: '#818cf8',
              }}
            >
              {metrics.meta}%
            </Typography>
          </Box>
        </Box>

        {/* Progresso */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#34d39915',
              borderRadius: 2,
              border: '1px solid #34d39930',
              textAlign: 'center',
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#64748b',
                fontSize: '0.7rem',
                display: 'block',
                mb: 0.5,
              }}
            >
              Progresso
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: '#10b981',
              }}
            >
              {progressoMeta}%
            </Typography>
          </Box>
        </Box>

        {/* Variação */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: `${metrics.variacao >= 0 ? '#10b981' : '#ef4444'}15`,
              borderRadius: 2,
              border: `1px solid ${metrics.variacao >= 0 ? '#10b981' : '#ef4444'}30`,
              textAlign: 'center',
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#64748b',
                fontSize: '0.7rem',
                display: 'block',
                mb: 0.5,
              }}
            >
              Variação
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
              {metrics.variacao >= 0 ? (
                <TrendingUpIcon sx={{ fontSize: 18, color: '#10b981' }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 18, color: '#ef4444' }} />
              )}
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  color: metrics.variacao >= 0 ? '#10b981' : '#ef4444',
                }}
              >
                {Math.abs(metrics.variacao)}%
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default GaugeChart;
