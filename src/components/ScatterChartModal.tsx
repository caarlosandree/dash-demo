import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ScatterChart as MuiScatterChart } from '@mui/x-charts/ScatterChart';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useThemeMode } from '../hooks/useThemeMode';

interface ScatterChartModalProps {
  open: boolean;
  onClose: () => void;
  selectedPoint: string;
  data: {
    x: number[];
    y: number[];
    labels: string[];
  };
  pointDetails: {
    nome: string;
    cor: string;
    x: number;
    y: number;
    categoria: string;
    nivel: string;
    performance: number;
    tendencia: 'crescente' | 'decrescente' | 'estavel';
    correlacao: number;
    insights: string[];
    comparativo: { metrica: string; valor: number; media: number; percentil: number }[];
    recomendacoes: { area: string; acao: string; prioridade: 'alta' | 'media' | 'baixa' }[];
    historico: { periodo: string; x: number; y: number }[];
  };
}

const ScatterChartModal: React.FC<ScatterChartModalProps> = ({ 
  open, 
  onClose, 
  selectedPoint, 
  data,
  pointDetails 
}) => {
  const { colors } = useThemeMode();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          background: `linear-gradient(135deg, ${pointDetails.cor} 0%, ${pointDetails.cor}CC 100%)`,
          color: 'white',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <SchoolIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5" component="span" sx={{ fontWeight: 700 }}>
            Detalhes - {selectedPoint}
          </Typography>
        </Stack>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 4 }}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Cards de Resumo */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: colors.chartBg,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Tempo de Estudo
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {pointDetails.x}h
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: colors.chartBg,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Nota Alcançada
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                {pointDetails.y}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: colors.chartBg,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Performance
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                {pointDetails.performance}%
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: colors.chartBg,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Correlação
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {pointDetails.correlacao.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>

          {/* Gráfico de Dispersão - Análise Detalhada */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Análise de Correlação Detalhada
              </Typography>
              <Box sx={{ width: '100%', height: 400 }}>
                <MuiScatterChart
                  width={undefined}
                  height={400}
                  series={[
                    {
                      id: 'dados',
                      label: 'Estudo vs Nota',
                      data: data.x.map((x, index) => ({ x, y: data.y[index], id: index })),
                      color: pointDetails.cor,
                    },
                  ]}
                  colors={[pointDetails.cor]}
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
                  margin={{ top: 20, bottom: 60, left: 60, right: 30 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Gráfico de Linha - Evolução Histórica */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Evolução Histórica
              </Typography>
              <Box sx={{ width: '100%', height: 400 }}>
                <MuiLineChart
                  width={undefined}
                  height={400}
                  series={[
                    {
                      data: pointDetails.historico.map(h => h.x),
                      label: 'Tempo de Estudo',
                      id: 'tempo',
                      color: pointDetails.cor,
                    },
                    {
                      data: pointDetails.historico.map(h => h.y),
                      label: 'Nota',
                      id: 'nota',
                      color: '#64748b',
                    },
                  ]}
                  xAxis={[
                    {
                      data: pointDetails.historico.map(h => h.periodo),
                      scaleType: 'point' as const,
                    },
                  ]}
                  colors={[pointDetails.cor, '#64748b']}
                  margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Tabela de Comparativo */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Análise Comparativa
              </Typography>
              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  maxHeight: 300,
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          bgcolor: colors.chartBg,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Métrica
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.chartBg,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Seu Valor
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.chartBg,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Média
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.chartBg,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Percentil
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pointDetails.comparativo.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': {
                            bgcolor: colors.chartBg,
                          },
                        }}
                      >
                        <TableCell sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                          {item.metrica}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {item.valor}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {item.media}
                        </TableCell>
                        <TableCell sx={{ color: pointDetails.cor, fontWeight: 600 }}>
                          {item.percentil}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Recomendações */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Recomendações de Melhoria
              </Typography>
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Grid container spacing={2}>
                  {pointDetails.recomendacoes.map((recomendacao, index) => (
                    <Grid size={{ xs: 12 }} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: recomendacao.prioridade === 'alta' ? '#ef444415' : 
                                  recomendacao.prioridade === 'media' ? '#f59e0b15' : '#10b98115',
                          borderRadius: 2,
                          border: `1px solid ${
                            recomendacao.prioridade === 'alta' ? '#ef444430' : 
                            recomendacao.prioridade === 'media' ? '#f59e0b30' : '#10b98130'
                          }`,
                        }}
                      >
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                          <Chip
                            label={recomendacao.prioridade}
                            size="small"
                            sx={{
                              bgcolor: recomendacao.prioridade === 'alta' ? '#ef444420' : 
                                      recomendacao.prioridade === 'media' ? '#f59e0b20' : '#10b98120',
                              color: recomendacao.prioridade === 'alta' ? '#ef4444' : 
                                     recomendacao.prioridade === 'media' ? '#f59e0b' : '#10b981',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                            {recomendacao.area}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                          {recomendacao.acao}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Insights */}
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Insights e Análises
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PsychologyIcon sx={{ color: pointDetails.cor }} />
                <Typography variant="body2" sx={{ color: '#64748b', fontStyle: 'italic' }}>
                  Análise baseada nos dados de correlação e performance
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {pointDetails.insights.map((insight, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: colors.chartBg,
                        borderRadius: 2,
                        border: `1px solid ${pointDetails.cor}30`,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                      }}
                    >
                      <TrendingUpIcon sx={{ color: pointDetails.cor, fontSize: 20, mt: 0.5 }} />
                      <Typography variant="body2" sx={{ color: colors.textPrimary }}>
                        {insight}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ScatterChartModal;
