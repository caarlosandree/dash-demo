import { useState } from 'react';
import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import { RadarChart as MuiRadarChart } from '@mui/x-charts/RadarChart';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useMemo } from 'react';
import RadarChartModal from './RadarChartModal';

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
  const [openModal, setOpenModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [selectedData, setSelectedData] = useState<any>(null);

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

  // Dados detalhados para cada métrica
  const detailedData: Record<string, any> = {
    'Velocidade': {
      nome: 'Velocidade',
      cor: '#6366f1',
      valor: 85,
      max: 100,
      percentual: 85,
      categoria: 'Performance',
      descricao: 'Tempo de resposta e processamento do sistema',
      tendencia: 'crescente' as const,
      benchmark: 80,
      melhoresPraticas: [
        'Implementar cache inteligente',
        'Otimizar consultas de banco de dados',
        'Usar CDN para recursos estáticos',
        'Implementar lazy loading'
      ],
      acoes: [
        { acao: 'Implementar cache Redis', prioridade: 'alta' as const, prazo: '2 semanas' },
        { acao: 'Otimizar queries SQL', prioridade: 'media' as const, prazo: '1 mês' },
        { acao: 'Configurar CDN', prioridade: 'baixa' as const, prazo: '3 semanas' },
      ],
      historico: [
        { periodo: 'Q1', valor: 75 },
        { periodo: 'Q2', valor: 80 },
        { periodo: 'Q3', valor: 85 },
      ],
      comparativo: [
        { empresa: 'Concorrente A', valor: 78, diferenca: 7 },
        { empresa: 'Concorrente B', valor: 82, diferenca: 3 },
        { empresa: 'Média do Mercado', valor: 80, diferenca: 5 },
      ],
    },
    'Segurança': {
      nome: 'Segurança',
      cor: '#10b981',
      valor: 92,
      max: 100,
      percentual: 92,
      categoria: 'Segurança',
      descricao: 'Proteção de dados e conformidade',
      tendencia: 'crescente' as const,
      benchmark: 85,
      melhoresPraticas: [
        'Implementar autenticação de dois fatores',
        'Criptografar dados sensíveis',
        'Realizar auditorias regulares',
        'Manter logs de segurança'
      ],
      acoes: [
        { acao: 'Implementar 2FA', prioridade: 'alta' as const, prazo: '1 semana' },
        { acao: 'Auditoria de segurança', prioridade: 'media' as const, prazo: '2 semanas' },
        { acao: 'Treinamento da equipe', prioridade: 'baixa' as const, prazo: '1 mês' },
      ],
      historico: [
        { periodo: 'Q1', valor: 88 },
        { periodo: 'Q2', valor: 90 },
        { periodo: 'Q3', valor: 92 },
      ],
      comparativo: [
        { empresa: 'Concorrente A', valor: 85, diferenca: 7 },
        { empresa: 'Concorrente B', valor: 88, diferenca: 4 },
        { empresa: 'Média do Mercado', valor: 85, diferenca: 7 },
      ],
    },
    'Usabilidade': {
      nome: 'Usabilidade',
      cor: '#ec4899',
      valor: 78,
      max: 100,
      percentual: 78,
      categoria: 'UX/UI',
      descricao: 'Facilidade de uso e experiência do usuário',
      tendencia: 'crescente' as const,
      benchmark: 82,
      melhoresPraticas: [
        'Realizar testes de usabilidade',
        'Simplificar fluxos de navegação',
        'Melhorar feedback visual',
        'Implementar design responsivo'
      ],
      acoes: [
        { acao: 'Testes de usabilidade', prioridade: 'alta' as const, prazo: '2 semanas' },
        { acao: 'Redesign da interface', prioridade: 'media' as const, prazo: '1 mês' },
        { acao: 'Treinamento de usuários', prioridade: 'baixa' as const, prazo: '3 semanas' },
      ],
      historico: [
        { periodo: 'Q1', valor: 70 },
        { periodo: 'Q2', valor: 74 },
        { periodo: 'Q3', valor: 78 },
      ],
      comparativo: [
        { empresa: 'Concorrente A', valor: 82, diferenca: -4 },
        { empresa: 'Concorrente B', valor: 80, diferenca: -2 },
        { empresa: 'Média do Mercado', valor: 82, diferenca: -4 },
      ],
    },
  };

  const handleMetricClick = (event: any, itemIdentifier: any) => {
    const metricIndex = itemIdentifier?.dataIndex ?? itemIdentifier?.itemIndex ?? itemIdentifier?.index;
    const metricName = metrics[metricIndex];
    
    if (metricName && detailedData[metricName]) {
      setSelectedMetric(metricName);
      setSelectedData(detailedData[metricName]);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMetric('');
    setSelectedData(null);
  };

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
          Avaliação completa das principais dimensões do produto - Clique nas métricas para detalhes
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
          onItemClick={handleMetricClick}
          slotProps={{
            radar: {
              cursor: 'pointer',
            },
          }}
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

      {/* Modal de Detalhes */}
      {selectedData && (
        <RadarChartModal
          open={openModal}
          onClose={handleCloseModal}
          selectedMetric={selectedMetric}
          data={{
            metrics: metrics,
            values: series[0].data,
            max: radar.max,
          }}
          metricDetails={selectedData}
        />
      )}
    </Stack>
  );
};

export default RadarChart;

