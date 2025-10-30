import { useState } from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { GaugeContainer, GaugeValueArc, GaugeReferenceArc } from '@mui/x-charts/Gauge';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useMemo } from 'react';
import GaugeChartModal from './GaugeChartModal';
import { useThemeMode } from '../hooks/useThemeMode';

interface GaugeMetrics {
  value: number;
  meta: number;
  variacao: number;
  label: string;
  descricao: string;
}

const GaugeChart: React.FC = () => {
  const { colors } = useThemeMode();
  const [openModal, setOpenModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [selectedData, setSelectedData] = useState<any>(null);

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

  // Dados detalhados para o gauge
  const detailedData = {
    nome: 'Performance Geral',
    cor: gaugeConfig.color,
    valor: metrics.value,
    meta: metrics.meta,
    max: 100,
    percentual: parseFloat(progressoMeta),
    status: gaugeConfig.status,
    categoria: 'Performance',
    descricao: 'Eficiência operacional do sistema',
    tendencia: metrics.variacao >= 0 ? 'crescente' as const : 'decrescente' as const,
    benchmark: 80,
    kpis: [
      { nome: 'Uptime', valor: 99.5, meta: 99.9, status: 'ok' as const },
      { nome: 'Tempo de Resposta', valor: 120, meta: 100, status: 'atencao' as const },
      { nome: 'Throughput', valor: 850, meta: 1000, status: 'atencao' as const },
      { nome: 'Disponibilidade', valor: 98.2, meta: 99.0, status: 'ok' as const },
    ],
    acoes: [
      { acao: 'Otimizar consultas de banco', prioridade: 'alta' as const, prazo: '1 semana', impacto: 15 },
      { acao: 'Implementar cache Redis', prioridade: 'media' as const, prazo: '2 semanas', impacto: 10 },
      { acao: 'Configurar monitoramento', prioridade: 'baixa' as const, prazo: '1 mês', impacto: 5 },
    ],
    historico: [
      { periodo: 'Q1', valor: 65, meta: 85 },
      { periodo: 'Q2', valor: 70, meta: 85 },
      { periodo: 'Q3', valor: 75, meta: 85 },
    ],
    comparativo: [
      { empresa: 'Concorrente A', valor: 78, diferenca: -3 },
      { empresa: 'Concorrente B', valor: 82, diferenca: -7 },
      { empresa: 'Média do Mercado', valor: 80, diferenca: -5 },
    ],
    alertas: [
      { tipo: 'warning' as const, mensagem: 'Performance abaixo da meta estabelecida' },
      { tipo: 'info' as const, mensagem: 'Tendência de crescimento positiva identificada' },
    ],
  };

  const handleGaugeClick = () => {
    setSelectedMetric(metrics.label);
    setSelectedData(detailedData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMetric('');
    setSelectedData(null);
  };

  return (
    <Stack spacing={2} sx={{ height: '100%' }}>
      {/* Header com título e descrição */}
      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: colors.textPrimary,
            mb: 0.5,
          }}
        >
          {metrics.label}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: colors.textSecondary,
            fontSize: '0.875rem',
          }}
        >
          {metrics.descricao} - Clique no gauge para detalhes
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
        <Box 
          sx={{ 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease',
            },
          }}
          onClick={handleGaugeClick}
        >
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
                borderTop: `1px solid ${colors.cardBorder}`,
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
                color: colors.textSecondary,
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

      {/* Modal de Detalhes */}
      {selectedData && (
        <GaugeChartModal
          open={openModal}
          onClose={handleCloseModal}
          selectedMetric={selectedMetric}
          data={{
            value: metrics.value,
            meta: metrics.meta,
            max: 100,
          }}
          metricDetails={selectedData}
        />
      )}
    </Stack>
  );
};

export default GaugeChart;
