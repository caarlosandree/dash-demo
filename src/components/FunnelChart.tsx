import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useMemo } from 'react';

interface FunnelData {
  id: number;
  etapa: string;
  valor: number;
  percentual: number;
  color: string;
  icon: string;
}

const FunnelChart: React.FC = () => {
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
          Funil de Conversão
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b',
            fontSize: '0.875rem',
          }}
        >
          Análise do comportamento dos usuários através do funil de vendas
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
        bgcolor: '#f8fafc',
        borderRadius: 2,
        p: 3,
        border: '1px solid rgba(0, 0, 0, 0.05)',
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
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: `0 4px 12px ${item.color}40`,
                  },
                }}
                style={{
                  width: `${item.percentual}%`,
                }}
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
    </Stack>
  );
};

export default FunnelChart;

