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
import { LineChart as MuiAreaChart } from '@mui/x-charts/LineChart';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface AreaChartModalProps {
  open: boolean;
  onClose: () => void;
  selectedMetric: string;
  data: {
    usuarios: number[];
    sessoes: number[];
    dias: string[];
  };
  metricDetails: {
    nome: string;
    cor: string;
    dados: number[];
    total: number;
    crescimento: number;
    media: number;
    pico: number;
    valle: number;
    tendencia: 'crescente' | 'decrescente' | 'estavel';
    segmentos: { segmento: string; usuarios: number; percentual: number }[];
    horarios: { horario: string; usuarios: number }[];
    dispositivos: { dispositivo: string; usuarios: number; percentual: number }[];
  };
}

const AreaChartModal: React.FC<AreaChartModalProps> = ({ 
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
          {selectedMetric === 'Usuários Ativos' ? (
            <PeopleIcon sx={{ fontSize: 32 }} />
          ) : (
            <GroupIcon sx={{ fontSize: 32 }} />
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
                Total Semanal
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
                Média Diária
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
                Pico de Atividade
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                {metricDetails.pico.toLocaleString('pt-BR')}
              </Typography>
            </Paper>
          </Grid>

          {/* Gráfico de Área - Evolução Detalhada */}
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
                <MuiAreaChart
                  width={undefined}
                  height={300}
                  series={[
                    {
                      data: metricDetails.dados,
                      label: selectedMetric,
                      id: 'dados',
                      area: true,
                      stack: 'total',
                    },
                  ]}
                  xAxis={[
                    {
                      data: data.dias,
                      scaleType: 'point' as const,
                    },
                  ]}
                  colors={[metricDetails.cor]}
                  margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Gráfico de Barras - Comparativo Diário */}
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
                Comparativo Diário
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <MuiBarChart
                  width={undefined}
                  height={300}
                  series={[
                    {
                      data: data.usuarios,
                      label: 'Usuários Ativos',
                      id: 'usuarios',
                    },
                    {
                      data: data.sessoes,
                      label: 'Novos Usuários',
                      id: 'sessoes',
                    },
                  ]}
                  xAxis={[
                    {
                      data: data.dias,
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
                        Usuários
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
                          {segmento.usuarios.toLocaleString('pt-BR')}
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

          {/* Distribuição por Dispositivos */}
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
                Distribuição por Dispositivo
              </Typography>
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Grid container spacing={2}>
                  {metricDetails.dispositivos.map((dispositivo, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: '#f8fafc',
                          borderRadius: 2,
                          border: `1px solid ${metricDetails.cor}30`,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {dispositivo.dispositivo}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: metricDetails.cor,
                          }}
                        >
                          {dispositivo.usuarios.toLocaleString('pt-BR')}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#64748b',
                            fontSize: '0.7rem',
                          }}
                        >
                          ({dispositivo.percentual}%)
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Análise de Horários */}
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Análise de Horários de Pico
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
                        Horário
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Usuários Ativos
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metricDetails.horarios.map((horario, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': {
                            bgcolor: '#f8fafc',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#1e293b', fontWeight: 500 }}>
                          {horario.horario}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          {horario.usuarios.toLocaleString('pt-BR')}
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

export default AreaChartModal;
