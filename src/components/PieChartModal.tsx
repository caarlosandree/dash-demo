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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { useThemeMode } from '../hooks/useThemeMode';

interface DetailData {
  materiais: { nome: string; quantidade: number }[];
  vendas: number[];
  meses: string[];
  totalItems: number;
  valorTotal: number;
  crescimento: number;
}

interface PieChartModalProps {
  open: boolean;
  onClose: () => void;
  category: string;
  data: DetailData;
}

const PieChartModal: React.FC<PieChartModalProps> = ({ open, onClose, category, data }) => {
  const { colors } = useThemeMode();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
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
          background: `linear-gradient(135deg, ${
            category === 'Desktop' ? '#818cf8' :
            category === 'Mobile' ? '#f472b6' :
            category === 'Tablet' ? '#34d399' :
            category === 'Smart TV' ? '#fbbf24' : '#60a5fa'
          } 0%, ${
            category === 'Desktop' ? '#6366f1' :
            category === 'Mobile' ? '#ec4899' :
            category === 'Tablet' ? '#10b981' :
            category === 'Smart TV' ? '#f59e0b' : '#3b82f6'
          } 100%)`,
          color: 'white',
        }}
      >
        <Typography variant="h5" component="span" sx={{ fontWeight: 700 }}>
          Detalhes - {category}
        </Typography>
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
          <Grid size={{ xs: 12, md: 4 }}>
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
                Total de Itens
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {data.totalItems.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
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
                Valor Total
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                R$ {data.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
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
                Crescimento
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: data.crescimento >= 0 ? '#10b981' : '#ef4444',
                }}
              >
                {data.crescimento >= 0 ? '+' : ''}
                {data.crescimento}%
              </Typography>
            </Paper>
          </Grid>

          {/* Gráfico de Barras - Vendas por Mês */}
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
                Vendas Mensais - {category}
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
                  ]}
                  xAxis={[
                    {
                      data: data.meses,
                      scaleType: 'band' as const,
                    },
                  ]}
                  colors={[
                    category === 'Desktop' ? '#818cf8' :
                    category === 'Mobile' ? '#f472b6' :
                    category === 'Tablet' ? '#34d399' :
                    category === 'Smart TV' ? '#fbbf24' : '#60a5fa'
                  ]}
                  margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Tabela de Materiais */}
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
                Distribuição por Material
              </Typography>
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Grid container spacing={2}>
                  {data.materiais.map((material, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: colors.chartBg,
                          borderRadius: 2,
                          border: `1px solid ${colors.cardBorder}`,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {material.nome}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {material.quantidade}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PieChartModal;

