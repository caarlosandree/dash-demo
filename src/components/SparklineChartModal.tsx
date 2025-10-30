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
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { useThemeMode } from '../hooks/useThemeMode';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface SparklineChartModalProps {
  open: boolean;
  onClose: () => void;
  selectedMetric: string;
  data: {
    dados: number[];
    periodos: string[];
    valorAtual: number;
    valorAnterior: number;
  };
  metricDetails: {
    nome: string;
    cor: string;
    dados: number[];
    valorAtual: number;
    valorAnterior: number;
    variacao: number;
    media: number;
    minimo: number;
    maximo: number;
    tendencia: 'crescente' | 'decrescente' | 'estavel';
    categoria: string;
    descricao: string;
    benchmark: number;
    segmentos: { segmento: string; valor: number; percentual: number }[];
    comparativo: { periodo: string; atual: number; anterior: number; variacao: number }[];
    previsao: { periodo: string; valor: number }[];
    insights: string[];
    alertas: { tipo: 'info' | 'warning' | 'error'; mensagem: string }[];
  };
}

const SparklineChartModal: React.FC<SparklineChartModalProps> = ({ 
  open, 
  onClose, 
  selectedMetric, 
  data,
  metricDetails 
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
          background: `linear-gradient(135deg, ${metricDetails.cor} 0%, ${metricDetails.cor}CC 100%)`,
          color: 'white',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <AttachMoneyIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5" component="span" sx={{ fontWeight: 700 }}>
            Detalhes - {selectedMetric}
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
                Valor Atual
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {metricDetails.valorAtual.toLocaleString('pt-BR')}
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
                Variação
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: metricDetails.variacao >= 0 ? '#10b981' : '#ef4444',
                }}
              >
                {metricDetails.variacao >= 0 ? '+' : ''}
                {metricDetails.variacao.toFixed(1)}%
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
                Média
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                {metricDetails.media.toLocaleString('pt-BR')}
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
                Tendência
              </Typography>
              <Chip
                label={metricDetails.tendencia}
                size="small"
                sx={{
                  bgcolor: metricDetails.tendencia === 'crescente' ? '#10b98120' : 
                          metricDetails.tendencia === 'decrescente' ? '#ef444420' : '#64748b20',
                  color: metricDetails.tendencia === 'crescente' ? '#10b981' : 
                         metricDetails.tendencia === 'decrescente' ? '#ef4444' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            </Paper>
          </Grid>

          {/* Gráfico de Linha - Evolução Detalhada */}
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
                Evolução Detalhada - {selectedMetric}
              </Typography>
              <Box sx={{ width: '100%', height: 400 }}>
                <MuiLineChart
                  width={undefined}
                  height={400}
                  series={[
                    {
                      data: metricDetails.dados,
                      label: selectedMetric,
                      id: 'dados',
                      color: metricDetails.cor,
                      curve: 'natural',
                    },
                    {
                      data: metricDetails.previsao.map(p => p.valor),
                      label: 'Previsão',
                      id: 'previsao',
                      color: '#64748b',
                      curve: 'natural',
                    },
                  ]}
                  xAxis={[
                    {
                      data: data.periodos,
                      scaleType: 'point' as const,
                    },
                  ]}
                  colors={[metricDetails.cor, '#64748b']}
                  margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Gráfico de Barras - Comparativo */}
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
                Comparativo Mensal
              </Typography>
              <Box sx={{ width: '100%', height: 400 }}>
                <MuiBarChart
                  width={undefined}
                  height={400}
                  series={[
                    {
                      data: metricDetails.comparativo.map(c => c.atual),
                      label: 'Atual',
                      id: 'atual',
                    },
                    {
                      data: metricDetails.comparativo.map(c => c.anterior),
                      label: 'Anterior',
                      id: 'anterior',
                    },
                  ]}
                  xAxis={[
                    {
                      data: metricDetails.comparativo.map(c => c.periodo),
                      scaleType: 'band' as const,
                    },
                  ]}
                  colors={[metricDetails.cor, '#64748b']}
                  margin={{ top: 10, bottom: 60, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Estatísticas Detalhadas */}
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
                Estatísticas Detalhadas
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
                        Valor
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                        Valor Atual
                      </TableCell>
                      <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                        {metricDetails.valorAtual.toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                        Média
                      </TableCell>
                      <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                        {metricDetails.media.toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                        Mínimo
                      </TableCell>
                      <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                        {metricDetails.minimo.toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                        Máximo
                      </TableCell>
                      <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                        {metricDetails.maximo.toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                        Benchmark
                      </TableCell>
                      <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                        {metricDetails.benchmark.toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Segmentação */}
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
                Segmentação
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
                        Segmento
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.chartBg,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Valor
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.chartBg,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        %
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metricDetails.segmentos.map((segmento, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': {
                            bgcolor: colors.chartBg,
                          },
                        }}
                      >
                        <TableCell sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                          {segmento.segmento}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {segmento.valor.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell sx={{ color: metricDetails.cor, fontWeight: 600 }}>
                          {segmento.percentual}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Insights e Alertas */}
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
                Insights e Alertas
              </Typography>
              <Grid container spacing={2}>
                {metricDetails.insights.map((insight, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: colors.chartBg,
                        borderRadius: 2,
                        border: `1px solid ${metricDetails.cor}30`,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                      }}
                    >
                      <TrendingUpIcon sx={{ color: metricDetails.cor, fontSize: 20, mt: 0.5 }} />
                      <Typography variant="body2" sx={{ color: colors.textPrimary }}>
                        {insight}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
                {metricDetails.alertas.map((alerta, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={`alert-${index}`}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alerta.tipo === 'error' ? '#ef444415' : 
                                alerta.tipo === 'warning' ? '#f59e0b15' : '#818cf815',
                        borderRadius: 2,
                        border: `1px solid ${
                          alerta.tipo === 'error' ? '#ef444430' : 
                          alerta.tipo === 'warning' ? '#f59e0b30' : '#818cf830'
                        }`,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                      }}
                    >
                      {alerta.tipo === 'error' ? (
                        <TrendingDownIcon sx={{ color: '#ef4444', fontSize: 20, mt: 0.5 }} />
                      ) : alerta.tipo === 'warning' ? (
                        <TrendingUpIcon sx={{ color: '#f59e0b', fontSize: 20, mt: 0.5 }} />
                      ) : (
                        <AttachMoneyIcon sx={{ color: '#818cf8', fontSize: 20, mt: 0.5 }} />
                      )}
                      <Typography variant="body2" sx={{ color: colors.textPrimary }}>
                        {alerta.mensagem}
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

export default SparklineChartModal;
