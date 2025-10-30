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
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';

interface FunnelChartModalProps {
  open: boolean;
  onClose: () => void;
  selectedStage: string;
  data: {
    etapas: string[];
    valores: number[];
    percentuais: number[];
  };
  stageDetails: {
    nome: string;
    cor: string;
    valor: number;
    percentual: number;
    posicao: number;
    total: number;
    conversao: number;
    perda: number;
    categoria: string;
    descricao: string;
    tendencia: 'crescente' | 'decrescente' | 'estavel';
    benchmark: number;
    fatores: { fator: string; impacto: 'alto' | 'medio' | 'baixo'; descricao: string }[];
    acoes: { acao: string; prioridade: 'alta' | 'media' | 'baixa'; prazo: string; impacto: number }[];
    historico: { periodo: string; valor: number; conversao: number }[];
    comparativo: { empresa: string; valor: number; diferenca: number }[];
    insights: string[];
  };
}

const FunnelChartModal: React.FC<FunnelChartModalProps> = ({ 
  open, 
  onClose, 
  selectedStage, 
  data,
  stageDetails 
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
          background: `linear-gradient(135deg, ${stageDetails.cor} 0%, ${stageDetails.cor}CC 100%)`,
          color: 'white',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <PeopleIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5" component="span" sx={{ fontWeight: 700 }}>
            Detalhes - {selectedStage}
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
                {stageDetails.valor.toLocaleString('pt-BR')}
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
                Conversão
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                {stageDetails.conversao}%
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
                Perda
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                {stageDetails.perda}%
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
                Posição
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                {stageDetails.posicao}º
              </Typography>
            </Paper>
          </Grid>

          {/* Gráfico de Barras - Funil Detalhado */}
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
                Funil de Conversão Detalhado
              </Typography>
              <Box sx={{ width: '100%', height: 400 }}>
                <MuiBarChart
                  width={undefined}
                  height={400}
                  series={[
                    {
                      data: data.valores,
                      label: 'Conversões',
                      id: 'conversoes',
                    },
                  ]}
                  xAxis={[
                    {
                      data: data.etapas,
                      scaleType: 'band' as const,
                    },
                  ]}
                  colors={[stageDetails.cor]}
                  margin={{ top: 10, bottom: 60, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Gráfico de Linha - Evolução */}
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
                Evolução da Conversão
              </Typography>
              <Box sx={{ width: '100%', height: 400 }}>
                <MuiLineChart
                  width={undefined}
                  height={400}
                  series={[
                    {
                      data: stageDetails.historico.map(h => h.conversao),
                      label: 'Taxa de Conversão',
                      id: 'conversao',
                      color: stageDetails.cor,
                    },
                  ]}
                  xAxis={[
                    {
                      data: stageDetails.historico.map(h => h.periodo),
                      scaleType: 'point' as const,
                    },
                  ]}
                  colors={[stageDetails.cor]}
                  margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Fatores de Impacto */}
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
                Fatores de Impacto
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
                        Fator
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Impacto
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Descrição
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stageDetails.fatores.map((fator, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': {
                            bgcolor: '#f8fafc',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#1e293b', fontWeight: 500 }}>
                          {fator.fator}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={fator.impacto}
                            size="small"
                            sx={{
                              bgcolor: fator.impacto === 'alto' ? '#ef444420' : 
                                      fator.impacto === 'medio' ? '#f59e0b20' : '#10b98120',
                              color: fator.impacto === 'alto' ? '#ef4444' : 
                                     fator.impacto === 'medio' ? '#f59e0b' : '#10b981',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 500 }}>
                          {fator.descricao}
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
                    {stageDetails.acoes.map((acao, index) => (
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

          {/* Insights e Análises */}
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
                Insights e Análises
              </Typography>
              <Grid container spacing={2}>
                {stageDetails.insights.map((insight, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: '#f8fafc',
                        borderRadius: 2,
                        border: `1px solid ${stageDetails.cor}30`,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                      }}
                    >
                      <ArrowForwardIcon sx={{ color: stageDetails.cor, fontSize: 20, mt: 0.5 }} />
                      <Typography variant="body2" sx={{ color: '#1e293b' }}>
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

export default FunnelChartModal;
