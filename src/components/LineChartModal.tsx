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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface LineChartModalProps {
  open: boolean;
  onClose: () => void;
  selectedMetric: string;
  data: {
    vendas: number[];
    receita: number[];
    meses: string[];
  };
  metricDetails: {
    nome: string;
    cor: string;
    dados: number[];
    total: number;
    crescimento: number;
    media: number;
    tendencia: 'crescente' | 'decrescente' | 'estavel';
    previsao: number[];
    segmentos: { segmento: string; valor: number; percentual: number }[];
    comparativo: { mes: string; atual: number; anterior: number; variacao: number }[];
  };
}

const LineChartModal: React.FC<LineChartModalProps> = ({ 
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
          {metricDetails.tendencia === 'crescente' ? (
            <TrendingUpIcon sx={{ fontSize: 32 }} />
          ) : metricDetails.tendencia === 'decrescente' ? (
            <TrendingDownIcon sx={{ fontSize: 32 }} />
          ) : (
            <Box sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
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
                Total Acumulado
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {metricDetails.total.toLocaleString('pt-BR')}
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
                Crescimento
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: metricDetails.crescimento >= 0 ? '#10b981' : '#ef4444',
                }}
              >
                {metricDetails.crescimento >= 0 ? '+' : ''}
                {metricDetails.crescimento}%
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
                Média Mensal
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

          {/* Gráfico de Linha - Evolução Detalhada */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Evolução Detalhada - {selectedMetric}
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <MuiLineChart
                  width={undefined}
                  height={300}
                  series={[
                    {
                      data: metricDetails.dados,
                      label: selectedMetric,
                      id: 'dados',
                      curve: 'natural',
                    },
                    {
                      data: metricDetails.previsao,
                      label: 'Previsão',
                      id: 'previsao',
                      curve: 'natural',
                      color: '#64748b',
                    },
                  ]}
                  xAxis={[
                    {
                      data: data.meses,
                      scaleType: 'point' as const,
                    },
                  ]}
                  colors={[metricDetails.cor, '#64748b']}
                  margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Gráfico de Barras - Comparativo Mensal */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Comparativo Mensal
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <MuiBarChart
                  width={undefined}
                  height={300}
                  series={[
                    {
                      data: data.vendas,
                      label: 'Vendas',
                      id: 'vendas',
                    },
                    {
                      data: data.receita,
                      label: 'Receita',
                      id: 'receita',
                    },
                  ]}
                  xAxis={[
                    {
                      data: data.meses,
                      scaleType: 'band' as const,
                    },
                  ]}
                  colors={['#818cf8', '#f472b6']}
                  margin={{ top: 10, bottom: 60, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Tabela de Segmentos */}
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
                Distribuição por Segmento
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
                        Segmento
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
                            bgcolor: '#f8fafc',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#1e293b', fontWeight: 500 }}>
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

          {/* Comparativo Mensal Detalhado */}
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
                Comparativo Mensal Detalhado
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
                        Mês
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Atual
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Anterior
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Variação
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
                          {item.mes}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {item.atual.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {item.anterior.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell sx={{ 
                          color: item.variacao >= 0 ? '#10b981' : '#ef4444', 
                          fontWeight: 600 
                        }}>
                          {item.variacao >= 0 ? '+' : ''}{item.variacao}%
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

export default LineChartModal;
