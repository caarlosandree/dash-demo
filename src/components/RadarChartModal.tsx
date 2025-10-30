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
import { RadarChart as MuiRadarChart } from '@mui/x-charts/RadarChart';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface RadarChartModalProps {
  open: boolean;
  onClose: () => void;
  selectedMetric: string;
  data: {
    metrics: string[];
    values: number[];
    max: number;
  };
  metricDetails: {
    nome: string;
    cor: string;
    valor: number;
    max: number;
    percentual: number;
    categoria: string;
    descricao: string;
    tendencia: 'crescente' | 'decrescente' | 'estavel';
    benchmark: number;
    melhoresPraticas: string[];
    acoes: { acao: string; prioridade: 'alta' | 'media' | 'baixa'; prazo: string }[];
    historico: { periodo: string; valor: number }[];
    comparativo: { empresa: string; valor: number; diferenca: number }[];
  };
}

const RadarChartModal: React.FC<RadarChartModalProps> = ({ 
  open, 
  onClose, 
  selectedMetric, 
  data,
  metricDetails 
}) => {
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
          {selectedMetric === 'Velocidade' ? (
            <SpeedIcon sx={{ fontSize: 32 }} />
          ) : selectedMetric === 'Segurança' ? (
            <SecurityIcon sx={{ fontSize: 32 }} />
          ) : (
            <CheckCircleIcon sx={{ fontSize: 32 }} />
          )}
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
                bgcolor: '#f8fafc',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Valor Atual
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {metricDetails.valor}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: '#f8fafc',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Percentual
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
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
                bgcolor: '#f8fafc',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Benchmark
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                {metricDetails.benchmark}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: '#f8fafc',
                border: '1px solid rgba(0, 0, 0, 0.05)',
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

          {/* Gráfico Radar - Análise Detalhada */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Análise Radar Detalhada
              </Typography>
              <Box sx={{ width: '100%', height: 400, display: 'flex', justifyContent: 'center' }}>
                <MuiRadarChart
                  width={400}
                  height={400}
                  series={[
                    {
                      id: 'performance',
                      label: 'Performance',
                      data: data.values,
                    },
                  ]}
                  radar={{
                    metrics: data.metrics,
                    max: data.max,
                  }}
                  colors={[metricDetails.cor]}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Gráfico de Barras - Comparativo */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Comparativo com Benchmark
              </Typography>
              <Box sx={{ width: '100%', height: 400 }}>
                <MuiBarChart
                  width={undefined}
                  height={400}
                  series={[
                    {
                      data: [metricDetails.valor, metricDetails.benchmark],
                      label: selectedMetric,
                      id: 'comparativo',
                    },
                  ]}
                  xAxis={[
                    {
                      data: ['Atual', 'Benchmark'],
                      scaleType: 'band' as const,
                    },
                  ]}
                  colors={[metricDetails.cor, '#64748b']}
                  margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Progresso e Melhorias */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Progresso e Melhorias
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#1e293b' }}>
                    Progresso Atual
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={metricDetails.percentual}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: metricDetails.cor,
                        borderRadius: 4,
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#64748b', mt: 0.5, display: 'block' }}>
                    {metricDetails.valor} de {metricDetails.max} pontos
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#1e293b' }}>
                    Melhores Práticas
                  </Typography>
                  <Stack spacing={1}>
                    {metricDetails.melhoresPraticas.map((pratica, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 1.5,
                          bgcolor: '#f8fafc',
                          borderRadius: 1,
                          border: `1px solid ${metricDetails.cor}30`,
                        }}
                      >
                        <Typography variant="body2" sx={{ color: '#1e293b' }}>
                          {pratica}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Plano de Ação */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
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
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Ação
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Prioridade
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
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
                            bgcolor: '#f8fafc',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#1e293b', fontWeight: 500 }}>
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

          {/* Evolução Histórica */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Evolução Histórica
              </Typography>
              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  maxHeight: 200,
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Período
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Valor
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metricDetails.historico.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': {
                            bgcolor: '#f8fafc',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#1e293b', fontWeight: 500 }}>
                          {item.periodo}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {item.valor}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Comparativo com Outras Empresas */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Comparativo com Mercado
              </Typography>
              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  maxHeight: 200,
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Empresa
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Valor
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Diferença
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metricDetails.comparativo.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': {
                            bgcolor: '#f8fafc',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#1e293b', fontWeight: 500 }}>
                          {item.empresa}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {item.valor}
                        </TableCell>
                        <TableCell sx={{ 
                          color: item.diferenca >= 0 ? '#10b981' : '#ef4444', 
                          fontWeight: 600 
                        }}>
                          {item.diferenca >= 0 ? '+' : ''}{item.diferenca}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default RadarChartModal;
