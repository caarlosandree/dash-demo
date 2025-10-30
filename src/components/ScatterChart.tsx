import { useState } from 'react';
import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import { ScatterChart as MuiScatterChart } from '@mui/x-charts/ScatterChart';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useMemo } from 'react';
import ScatterChartModal from './ScatterChartModal';

interface ScatterData {
  x: number;
  y: number;
  id: number;
}

interface ScatterDataCollection {
  serie1: ScatterData[];
}

const ScatterChart: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<string>('');
  const [selectedData, setSelectedData] = useState<any>(null);

  // Dados simulados: tempo de estudo (x) vs nota (y)
  const data: ScatterDataCollection = {
    serie1: [
      { x: 10, y: 65, id: 0 },
      { x: 15, y: 70, id: 1 },
      { x: 20, y: 75, id: 2 },
      { x: 25, y: 80, id: 3 },
      { x: 30, y: 82, id: 4 },
      { x: 35, y: 85, id: 5 },
      { x: 40, y: 88, id: 6 },
      { x: 45, y: 90, id: 7 },
      { x: 50, y: 92, id: 8 },
      { x: 55, y: 94, id: 9 },
      { x: 60, y: 95, id: 10 },
      { x: 65, y: 96, id: 11 },
      { x: 70, y: 97, id: 12 },
    ],
  };

  const stats = useMemo(() => {
    const pontos = data.serie1;
    const mediaX = pontos.reduce((acc, p) => acc + p.x, 0) / pontos.length;
    const mediaY = pontos.reduce((acc, p) => acc + p.y, 0) / pontos.length;
    const maiorNota = Math.max(...pontos.map(p => p.y));
    const menorNota = Math.min(...pontos.map(p => p.y));
    const mediaHoras = pontos.reduce((acc, p) => acc + p.x, 0) / pontos.length;
    
    return { mediaX, mediaY, maiorNota, menorNota, mediaHoras };
  }, [data]);

  const correlacao = useMemo(() => {
    // Correlação positiva forte (dados simulados mostram isso)
    const variacao = ((stats.maiorNota - stats.menorNota) / stats.menorNota * 100).toFixed(1);
    return variacao;
  }, [stats]);

  // Dados detalhados para cada ponto
  const detailedData: Record<number, any> = {
    0: {
      nome: 'Ponto 1',
      cor: '#818cf8',
      x: 10,
      y: 65,
      categoria: 'Iniciante',
      nivel: 'Básico',
      performance: 65,
      tendencia: 'crescente' as const,
      correlacao: 0.85,
      insights: [
        'Tempo de estudo baixo com resultado proporcional',
        'Potencial de melhoria significativa com mais dedicação',
        'Padrão típico de estudante iniciante'
      ],
      comparativo: [
        { metrica: 'Tempo de Estudo', valor: 10, media: 40, percentil: 15 },
        { metrica: 'Nota', valor: 65, media: 85, percentil: 20 },
        { metrica: 'Eficiência', valor: 6.5, media: 2.1, percentil: 75 },
      ],
      recomendacoes: [
        { area: 'Tempo de Estudo', acao: 'Aumentar gradualmente para 20-25h semanais', prioridade: 'alta' as const },
        { area: 'Método de Estudo', acao: 'Implementar técnicas de estudo ativo', prioridade: 'media' as const },
        { area: 'Avaliação', acao: 'Fazer simulados regulares para acompanhar progresso', prioridade: 'baixa' as const },
      ],
      historico: [
        { periodo: 'Sem 1', x: 8, y: 60 },
        { periodo: 'Sem 2', x: 9, y: 62 },
        { periodo: 'Sem 3', x: 10, y: 65 },
      ],
    },
    6: {
      nome: 'Ponto 7',
      cor: '#34d399',
      x: 40,
      y: 88,
      categoria: 'Intermediário',
      nivel: 'Avançado',
      performance: 88,
      tendencia: 'crescente' as const,
      correlacao: 0.92,
      insights: [
        'Excelente relação tempo-resultado',
        'Demonstra consistência nos estudos',
        'Próximo ao ponto ótimo de eficiência'
      ],
      comparativo: [
        { metrica: 'Tempo de Estudo', valor: 40, media: 40, percentil: 50 },
        { metrica: 'Nota', valor: 88, media: 85, percentil: 70 },
        { metrica: 'Eficiência', valor: 2.2, media: 2.1, percentil: 60 },
      ],
      recomendacoes: [
        { area: 'Manutenção', acao: 'Manter o ritmo atual de estudos', prioridade: 'baixa' as const },
        { area: 'Refinamento', acao: 'Focar em áreas específicas de dificuldade', prioridade: 'media' as const },
      ],
      historico: [
        { periodo: 'Sem 1', x: 35, y: 82 },
        { periodo: 'Sem 2', x: 38, y: 85 },
        { periodo: 'Sem 3', x: 40, y: 88 },
      ],
    },
    12: {
      nome: 'Ponto 13',
      cor: '#f59e0b',
      x: 70,
      y: 97,
      categoria: 'Avançado',
      nivel: 'Expert',
      performance: 97,
      tendencia: 'estavel' as const,
      correlacao: 0.95,
      insights: [
        'Máximo desempenho alcançado',
        'Possível saturação do tempo de estudo',
        'Foco deve ser em manutenção e otimização'
      ],
      comparativo: [
        { metrica: 'Tempo de Estudo', valor: 70, media: 40, percentil: 95 },
        { metrica: 'Nota', valor: 97, media: 85, percentil: 98 },
        { metrica: 'Eficiência', valor: 1.4, media: 2.1, percentil: 30 },
      ],
      recomendacoes: [
        { area: 'Otimização', acao: 'Reduzir tempo e focar em qualidade', prioridade: 'alta' as const },
        { area: 'Mentoria', acao: 'Ajudar outros estudantes', prioridade: 'media' as const },
      ],
      historico: [
        { periodo: 'Sem 1', x: 65, y: 95 },
        { periodo: 'Sem 2', x: 68, y: 96 },
        { periodo: 'Sem 3', x: 70, y: 97 },
      ],
    },
  };

  const handlePointClick = (event: any, itemIdentifier: any) => {
    const pointId = itemIdentifier?.dataIndex ?? itemIdentifier?.itemIndex ?? itemIdentifier?.index;
    
    if (detailedData[pointId]) {
      setSelectedPoint(`Ponto ${pointId + 1}`);
      setSelectedData(detailedData[pointId]);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPoint('');
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
          Relação Tempo de Estudo vs Desempenho
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b',
            fontSize: '0.875rem',
          }}
        >
          Análise de correlação entre horas estudadas e notas alcançadas - Clique nos pontos para detalhes
        </Typography>
      </Box>

      {/* Estatísticas */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#818cf815',
              borderRadius: 2,
              border: '1px solid #818cf830',
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
              Média de Notas
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#818cf8', mt: 0.5 }}>
              {stats.mediaY.toFixed(0)}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#34d39915',
              borderRadius: 2,
              border: '1px solid #34d39930',
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
              Maior Nota
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#10b981', mt: 0.5 }}>
              {stats.maiorNota}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#f59e0b15',
              borderRadius: 2,
              border: '1px solid #f59e0b30',
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
              Média de Horas
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#f59e0b', mt: 0.5 }}>
              {stats.mediaHoras.toFixed(0)}h
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#f472b615',
              borderRadius: 2,
              border: '1px solid #f472b630',
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>
              Melhoria
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#ec4899', mt: 0.5 }}>
              +{correlacao}%
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Box sx={{ 
        width: '100%', 
        height: 400,
        bgcolor: '#f8fafc',
        borderRadius: 2,
        p: 2,
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        <MuiScatterChart
          width={undefined}
          height={400}
          series={[
            {
              id: 'serie1',
              label: 'Nota vs Tempo de Estudo',
              data: data.serie1,
              color: '#818cf8',
            },
          ]}
          colors={['#818cf8']}
          xAxis={[
            {
              label: 'Horas de Estudo',
              min: 0,
              max: 80,
            },
          ]}
          yAxis={[
            {
              label: 'Nota',
              min: 60,
              max: 100,
            },
          ]}
          margin={{ top: 20, bottom: 40, left: 60, right: 30 }}
          onItemClick={handlePointClick}
          slotProps={{
            scatter: {
              cursor: 'pointer',
            },
          }}
        />
      </Box>

      {/* Insight */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
          background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
          borderRadius: 2,
          display: 'flex',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            p: 1,
            bgcolor: 'rgba(255,255,255,0.2)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SchoolIcon sx={{ fontSize: 24, color: 'white' }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
            Correlação Positiva Forte
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem' }}>
            Maior tempo de estudo resulta em melhor desempenho acadêmico
          </Typography>
        </Box>
        <Chip
          icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
          label="Tendência"
          size="small"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.7rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            '& .MuiChip-icon': {
              color: 'inherit',
            },
          }}
        />
      </Box>

      {/* Modal de Detalhes */}
      {selectedData && (
        <ScatterChartModal
          open={openModal}
          onClose={handleCloseModal}
          selectedPoint={selectedPoint}
          data={{
            x: data.serie1.map(p => p.x),
            y: data.serie1.map(p => p.y),
            labels: data.serie1.map((_, i) => `Ponto ${i + 1}`),
          }}
          pointDetails={selectedData}
        />
      )}
    </Stack>
  );
};

export default ScatterChart;
