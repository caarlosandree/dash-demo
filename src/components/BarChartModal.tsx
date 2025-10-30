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
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';

interface BarChartModalProps {
  open: boolean;
  onClose: () => void;
  selectedProduct: string;
  data: {
    categoria: string;
    produtoA: number;
    produtoB: number;
    produtoC: number;
  }[];
  productDetails: {
    nome: string;
    cor: string;
    vendas: number[];
    meses: string[];
    totalVendas: number;
    crescimento: number;
    marketShare: number;
    clientes: { nome: string; valor: number }[];
    regioes: { regiao: string; vendas: number }[];
  };
}

const BarChartModal: React.FC<BarChartModalProps> = ({ 
  open, 
  onClose, 
  selectedProduct, 
  data,
  productDetails 
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
          background: `linear-gradient(135deg, ${productDetails.cor} 0%, ${productDetails.cor}CC 100%)`,
          color: 'white',
        }}
      >
        <Typography variant="h5" component="span" sx={{ fontWeight: 700 }}>
          Detalhes - {selectedProduct}
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
                Total de Vendas
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                R$ {productDetails.totalVendas.toLocaleString('pt-BR')}
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
                  color: productDetails.crescimento >= 0 ? '#10b981' : '#ef4444',
                }}
              >
                {productDetails.crescimento >= 0 ? '+' : ''}
                {productDetails.crescimento}%
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
                Market Share
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                {productDetails.marketShare}%
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
                Vendas Mensais
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                {productDetails.vendas.length}
              </Typography>
            </Paper>
          </Grid>

          {/* Gráfico de Linha - Evolução Mensal */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Evolução Mensal - {selectedProduct}
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <MuiLineChart
                  width={undefined}
                  height={300}
                  series={[
                    {
                      data: productDetails.vendas,
                      label: 'Vendas',
                      id: 'vendas',
                      curve: 'natural',
                    },
                  ]}
                  xAxis={[
                    {
                      data: productDetails.meses,
                      scaleType: 'point' as const,
                    },
                  ]}
                  colors={[productDetails.cor]}
                  margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Gráfico de Barras - Comparativo Trimestral */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Comparativo Trimestral
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <MuiBarChart
                  width={undefined}
                  height={300}
                  series={[
                    {
                      data: data.map(item => item.produtoA),
                      label: 'Produto A',
                      id: 'produtoA',
                    },
                    {
                      data: data.map(item => item.produtoB),
                      label: 'Produto B',
                      id: 'produtoB',
                    },
                    {
                      data: data.map(item => item.produtoC),
                      label: 'Produto C',
                      id: 'produtoC',
                    },
                  ]}
                  xAxis={[
                    {
                      data: data.map(item => item.categoria),
                      scaleType: 'band' as const,
                    },
                  ]}
                  colors={['#818cf8', '#f472b6', '#34d399']}
                  margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Tabela de Top Clientes */}
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
                Top Clientes - {selectedProduct}
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
                        Cliente
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
                    {productDetails.clientes.map((cliente, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:hover': {
                            bgcolor: '#f8fafc',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#1e293b', fontWeight: 500 }}>
                          {cliente.nome}
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                          R$ {cliente.valor.toLocaleString('pt-BR')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Distribuição por Região */}
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
                Vendas por Região
              </Typography>
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Grid container spacing={2}>
                  {productDetails.regioes.map((regiao, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: '#f8fafc',
                          borderRadius: 2,
                          border: `1px solid ${productDetails.cor}30`,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {regiao.regiao}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: productDetails.cor,
                          }}
                        >
                          R$ {regiao.vendas.toLocaleString('pt-BR')}
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

export default BarChartModal;
