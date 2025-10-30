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
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GaugeContainer, GaugeValueArc, GaugeReferenceArc } from '@mui/x-charts/Gauge';
import { useThemeMode } from '../hooks/useThemeMode';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SpeedIcon from '@mui/icons-material/Speed';

interface GaugeChartModalProps {
  open: boolean;
  onClose: () => void;
  selectedMetric: string;
  data: {
    value: number;
    meta: number;
    max: number;
  };
  metricDetails: {
    nome: string;
    cor: string;
    valor: number;
    meta: number;
    max: number;
    percentual: number;
    status: string;
    categoria: string;
    descricao: string;
    tendencia: 'crescente' | 'decrescente' | 'estavel';
    benchmark: number;
    kpis: { nome: string; valor: number; meta: number; status: 'ok' | 'atencao' | 'critico' }[];
    acoes: { acao: string; prioridade: 'alta' | 'media' | 'baixa'; prazo: string; impacto: number }[];
    historico: { periodo: string; valor: number; meta: number }[];
    comparativo: { empresa: string; valor: number; diferenca: number }[];
    alertas: { tipo: 'info' | 'warning' | 'error'; mensagem: string }[];
  };
}

const GaugeChartModal: React.FC<GaugeChartModalProps> = ({ 
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
          <SpeedIcon sx={{ fontSize: 32 }} />
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
                {metricDetails.valor}%
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
                Meta
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                {metricDetails.meta}%
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
                Progresso
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                {metricDetails.percentual}%
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
                Status
              </Typography>
              <Chip
                label={metricDetails.status}
                size="small"
                sx={{
                  bgcolor: metricDetails.status === 'Excelente' ? '#10b98120' : 
                          metricDetails.status === 'Bom' ? '#818cf820' : 
                          metricDetails.status === 'Moderado' ? '#f59e0b20' : '#ef444420',
                  color: metricDetails.status === 'Excelente' ? '#10b981' : 
                         metricDetails.status === 'Bom' ? '#818cf8' : 
                         metricDetails.status === 'Moderado' ? '#f59e0b' : '#ef4444',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            </Paper>
          </Grid>

          {/* Gauge Principal */}
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
                Indicador Principal
              </Typography>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
              }}>
                <GaugeContainer
                  width={250}
                  height={250}
                  startAngle={-110}
                  endAngle={110}
                  value={metricDetails.valor}
                >
                  <GaugeReferenceArc color="#e2e8f0" />
                  <GaugeValueArc color={metricDetails.cor} />
                  
                  <text 
                    x="50%" 
                    y="45%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fontSize="36" 
                    fontWeight="bold"
                    fill={metricDetails.cor}
                  >
                    {metricDetails.valor}
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
            </Paper>
          </Grid>

          {/* Gráfico de Linha - Evolução */}
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
                Evolução Histórica
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <MuiLineChart
                  width={undefined}
                  height={300}
                  series={[
                    {
                      data: metricDetails.historico.map(h => h.valor),
                      label: 'Valor Atual',
                      id: 'valor',
                      color: metricDetails.cor,
                    },
                    {
                      data: metricDetails.historico.map(h => h.meta),
                      label: 'Meta',
                      id: 'meta',
                      color: '#64748b',
                    },
                  ]}
                  xAxis={[
                    {
                      data: metricDetails.historico.map(h => h.periodo),
                      scaleType: 'point' as const,
                    },
                  ]}
                  colors={[metricDetails.cor, '#64748b']}
                  margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* KPIs Relacionados */}
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
                KPIs Relacionados
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
                        KPI
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
                        Meta
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.chartBg,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metricDetails.kpis.map((kpi, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': {
                            bgcolor: colors.chartBg,
                          },
                        }}
                      >
                        <TableCell sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                          {kpi.nome}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {kpi.valor}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {kpi.meta}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={kpi.status}
                            size="small"
                            sx={{
                              bgcolor: kpi.status === 'ok' ? '#10b98120' : 
                                      kpi.status === 'atencao' ? '#f59e0b20' : '#ef444420',
                              color: kpi.status === 'ok' ? '#10b981' : 
                                     kpi.status === 'atencao' ? '#f59e0b' : '#ef4444',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Plano de Ação */}
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
                Plano de Ação
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
                        Ação
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.chartBg,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Prioridade
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.chartBg,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Prazo
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metricDetails.acoes.map((acao, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': {
                            bgcolor: colors.chartBg,
                          },
                        }}
                      >
                        <TableCell sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                          {acao.acao}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={acao.prioridade}
                            size="small"
                            sx={{
                              bgcolor: acao.prioridade === 'alta' ? '#ef444420' : 
                                      acao.prioridade === 'media' ? '#f59e0b20' : '#10b98120',
                              color: acao.prioridade === 'alta' ? '#ef4444' : 
                                     acao.prioridade === 'media' ? '#f59e0b' : '#10b981',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {acao.prazo}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Alertas e Notificações */}
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
                Alertas e Notificações
              </Typography>
              <Grid container spacing={2}>
                {metricDetails.alertas.map((alerta, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
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
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      {alerta.tipo === 'error' ? (
                        <TrendingDownIcon sx={{ color: '#ef4444', fontSize: 20 }} />
                      ) : alerta.tipo === 'warning' ? (
                        <TrendingUpIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
                      ) : (
                        <SpeedIcon sx={{ color: '#818cf8', fontSize: 20 }} />
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

export default GaugeChartModal;
