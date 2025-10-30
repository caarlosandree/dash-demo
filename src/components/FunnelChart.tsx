import { useState } from 'react';
import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useMemo } from 'react';
import FunnelChartModal from './FunnelChartModal';
import { useThemeMode } from '../hooks/useThemeMode';

interface FunnelData {
  id: number;
  etapa: string;
  valor: number;
  percentual: number;
  color: string;
  icon: string;
}

const FunnelChart: React.FC = () => {
  const { colors } = useThemeMode();
  const [openModal, setOpenModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string>('');
  const [selectedData, setSelectedData] = useState<any>(null);

  const data: FunnelData[] = [
    { id: 0, etapa: 'Visitantes', valor: 10000, percentual: 100, color: '#6366f1', icon: '👥' },
    { id: 1, etapa: 'Cadastros', valor: 6500, percentual: 65, color: '#818cf8', icon: '📝' },
    { id: 2, etapa: 'Interessados', valor: 4500, percentual: 45, color: '#a78bfa', icon: '👀' },
    { id: 3, etapa: 'Compras', valor: 2800, percentual: 28, color: '#ec4899', icon: '🛒' },
    { id: 4, etapa: 'Clientes Fiéis', valor: 1500, percentual: 15, color: '#f472b6', icon: '⭐' },
  ];

  const taxaConversao = useMemo(() => {
    const primeira = data[0].valor;
    const ultima = data[data.length - 1].valor;
    return ((ultima / primeira) * 100).toFixed(1);
  }, [data]);

  const taxaAbandono = useMemo(() => {
    return (100 - parseFloat(taxaConversao)).toFixed(1);
  }, [taxaConversao]);

  const etapaMaisRelevante = useMemo(() => {
    // Encontra a maior queda entre etapas
    let maiorQueda = 0;
    let etapa = '';
    for (let i = 0; i < data.length - 1; i++) {
      const queda = data[i].percentual - data[i + 1].percentual;
      if (queda > maiorQueda) {
        maiorQueda = queda;
        etapa = data[i].etapa;
      }
    }
    return { etapa, queda: maiorQueda.toFixed(1) };
  }, [data]);

  // Dados detalhados para cada etapa
  const detailedData: Record<string, any> = {
    'Visitantes': {
      nome: 'Visitantes',
      cor: '#6366f1',
      valor: 10000,
      percentual: 100,
      posicao: 1,
      total: 10000,
      conversao: 100,
      perda: 0,
      categoria: 'Aquisição',
      descricao: 'Total de visitantes únicos no site',
      tendencia: 'crescente' as const,
      benchmark: 12000,
      fatores: [
        { fator: 'Tráfego Orgânico', impacto: 'alto' as const, descricao: 'SEO e conteúdo de qualidade' },
        { fator: 'Tráfego Pago', impacto: 'medio' as const, descricao: 'Campanhas de anúncios' },
        { fator: 'Tráfego Social', impacto: 'baixo' as const, descricao: 'Redes sociais e influenciadores' },
      ],
      acoes: [
        { acao: 'Otimizar SEO', prioridade: 'alta' as const, prazo: '2 semanas', impacto: 20 },
        { acao: 'Melhorar UX', prioridade: 'media' as const, prazo: '1 mês', impacto: 15 },
        { acao: 'Campanhas PPC', prioridade: 'baixa' as const, prazo: '3 semanas', impacto: 10 },
      ],
      historico: [
        { periodo: 'Q1', valor: 8500, conversao: 100 },
        { periodo: 'Q2', valor: 9200, conversao: 100 },
        { periodo: 'Q3', valor: 10000, conversao: 100 },
      ],
      comparativo: [
        { empresa: 'Concorrente A', valor: 12000, diferenca: -2000 },
        { empresa: 'Concorrente B', valor: 15000, diferenca: -5000 },
        { empresa: 'Média do Mercado', valor: 11000, diferenca: -1000 },
      ],
      insights: [
        'Crescimento consistente de 8% ao trimestre',
        'Potencial de crescimento com investimento em SEO',
        'Taxa de conversão para próxima etapa em 65%'
      ],
    },
    'Cadastros': {
      nome: 'Cadastros',
      cor: '#818cf8',
      valor: 6500,
      percentual: 65,
      posicao: 2,
      total: 10000,
      conversao: 65,
      perda: 35,
      categoria: 'Conversão',
      descricao: 'Usuários que se cadastraram no sistema',
      tendencia: 'crescente' as const,
      benchmark: 70,
      fatores: [
        { fator: 'Formulário Simples', impacto: 'alto' as const, descricao: 'Reduzir campos obrigatórios' },
        { fator: 'Benefícios Claros', impacto: 'alto' as const, descricao: 'Comunicar valor do cadastro' },
        { fator: 'Confiança', impacto: 'medio' as const, descricao: 'Testimonials e segurança' },
      ],
      acoes: [
        { acao: 'Simplificar formulário', prioridade: 'alta' as const, prazo: '1 semana', impacto: 25 },
        { acao: 'A/B test de landing page', prioridade: 'media' as const, prazo: '2 semanas', impacto: 15 },
        { acao: 'Adicionar social login', prioridade: 'baixa' as const, prazo: '3 semanas', impacto: 10 },
      ],
      historico: [
        { periodo: 'Q1', valor: 5500, conversao: 65 },
        { periodo: 'Q2', valor: 6000, conversao: 65 },
        { periodo: 'Q3', valor: 6500, conversao: 65 },
      ],
      comparativo: [
        { empresa: 'Concorrente A', valor: 7000, diferenca: -500 },
        { empresa: 'Concorrente B', valor: 8000, diferenca: -1500 },
        { empresa: 'Média do Mercado', valor: 7000, diferenca: -500 },
      ],
      insights: [
        'Taxa de conversão estável em 65%',
        'Maior perda no funil: 35% dos visitantes',
        'Oportunidade de melhoria com UX'
      ],
    },
    'Compras': {
      nome: 'Compras',
      cor: '#ec4899',
      valor: 2800,
      percentual: 28,
      posicao: 4,
      total: 10000,
      conversao: 28,
      perda: 72,
      categoria: 'Vendas',
      descricao: 'Clientes que realizaram compras',
      tendencia: 'crescente' as const,
      benchmark: 35,
      fatores: [
        { fator: 'Preço Competitivo', impacto: 'alto' as const, descricao: 'Análise de preços do mercado' },
        { fator: 'Processo de Checkout', impacto: 'alto' as const, descricao: 'Simplificar compra' },
        { fator: 'Confiança na Marca', impacto: 'medio' as const, descricao: 'Garantias e reviews' },
      ],
      acoes: [
        { acao: 'Otimizar checkout', prioridade: 'alta' as const, prazo: '1 semana', impacto: 30 },
        { acao: 'Implementar garantia', prioridade: 'media' as const, prazo: '2 semanas', impacto: 20 },
        { acao: 'Programa de fidelidade', prioridade: 'baixa' as const, prazo: '1 mês', impacto: 15 },
      ],
      historico: [
        { periodo: 'Q1', valor: 2200, conversao: 26 },
        { periodo: 'Q2', valor: 2500, conversao: 27 },
        { periodo: 'Q3', valor: 2800, conversao: 28 },
      ],
      comparativo: [
        { empresa: 'Concorrente A', valor: 3500, diferenca: -700 },
        { empresa: 'Concorrente B', valor: 4000, diferenca: -1200 },
        { empresa: 'Média do Mercado', valor: 3000, diferenca: -200 },
      ],
      insights: [
        'Taxa de conversão abaixo do benchmark',
        'Crescimento de 9% no último trimestre',
        'Foco necessário em otimização de checkout'
      ],
    },
  };

  const handleStageClick = (etapa: string) => {
    if (detailedData[etapa]) {
      setSelectedStage(etapa);
      setSelectedData(detailedData[etapa]);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStage('');
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
            color: colors.textPrimary,
            mb: 0.5,
          }}
        >
          Funil de Conversão
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: colors.textSecondary,
            fontSize: '0.875rem',
          }}
        >
          Análise do comportamento dos usuários através do funil de vendas - Clique nas etapas para detalhes
        </Typography>
      </Box>

      {/* Resumo */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
          background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem' }}>
            Taxa de Conversão Geral
          </Typography>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700 }}>
            {taxaConversao}%
          </Typography>
        </Box>
        <Chip
          label={`${data[0].valor.toLocaleString('pt-BR')} → ${data[data.length - 1].valor.toLocaleString('pt-BR')}`}
          size="small"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.7rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        />
      </Box>

      {/* Gráfico Funil */}
      <Box sx={{ 
        width: '100%',
        bgcolor: colors.chartBg,
        borderRadius: 2,
        p: 3,
        border: `1px solid ${colors.cardBorder}`,
      }}>
        <Stack spacing={1}>
          {data.map((item, index) => (
            <Box key={item.id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 0.5,
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    minWidth: 100,
                    fontWeight: 600,
                    color: '#1e293b',
                    fontSize: '0.75rem',
                  }}
                >
                  {item.etapa}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    color: item.color,
                    mr: 1,
                  }}
                >
                  {item.valor.toLocaleString('pt-BR')}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#64748b',
                    fontSize: '0.7rem',
                  }}
                >
                  ({item.percentual}%)
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 32,
                  bgcolor: item.color,
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: `0 4px 12px ${item.color}40`,
                  },
                }}
                style={{
                  width: `${item.percentual}%`,
                }}
                onClick={() => handleStageClick(item.etapa)}
              />
              {index < data.length - 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 0.5 }}>
                  <TrendingDownIcon sx={{ fontSize: 16, color: '#64748b', opacity: 0.5 }} />
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Métricas de Performance */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#10b98115',
              borderRadius: 2,
              border: '1px solid #10b98130',
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
              Taxa de Conversão
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981', mt: 0.5 }}>
              {taxaConversao}%
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#ef444415',
              borderRadius: 2,
              border: '1px solid #ef444430',
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
              Taxa de Abandono
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#ef4444', mt: 0.5 }}>
              {taxaAbandono}%
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Insight */}
      <Box
        sx={{
          p: 2,
          bgcolor: '#f59e0b15',
          borderRadius: 2,
          border: '1px solid #f59e0b30',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <ArrowForwardIcon sx={{ fontSize: 20, color: '#f59e0b' }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
            Maior Perda de Conversão
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
            {etapaMaisRelevante.etapa}: {etapaMaisRelevante.queda}% de abandono
          </Typography>
        </Box>
      </Box>

      {/* Modal de Detalhes */}
      {selectedData && (
        <FunnelChartModal
          open={openModal}
          onClose={handleCloseModal}
          selectedStage={selectedStage}
          data={{
            etapas: data.map(item => item.etapa),
            valores: data.map(item => item.valor),
            percentuais: data.map(item => item.percentual),
          }}
          stageDetails={selectedData}
        />
      )}
    </Stack>
  );
};

export default FunnelChart;

