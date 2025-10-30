import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { useMemo } from 'react';

interface BarData {
  categoria: string;
  produtoA: number;
  produtoB: number;
  produtoC: number;
  [key: string]: string | number;
}

const BarChart: React.FC = () => {
  const data: BarData[] = [
    { categoria: 'Q1', produtoA: 4000, produtoB: 2400, produtoC: 2000 },
    { categoria: 'Q2', produtoA: 3000, produtoB: 1398, produtoC: 2210 },
    { categoria: 'Q3', produtoA: 2000, produtoB: 9800, produtoC: 2290 },
    { categoria: 'Q4', produtoA: 2780, produtoB: 3908, produtoC: 2000 },
  ];

  const produtos = [
    { name: 'Produto A', color: '#818cf8', key: 'produtoA' as const },
    { name: 'Produto B', color: '#f472b6', key: 'produtoB' as const },
    { name: 'Produto C', color: '#34d399', key: 'produtoC' as const },
  ];

  const vendasPorProduto = useMemo(() => {
    return produtos.map(prod => {
      const total = data.reduce((acc, item) => acc + (item[prod.key] as number), 0);
      return { ...prod, total };
    });
  }, [data]);

  const melhorProduto = useMemo(() => {
    return vendasPorProduto.reduce((max, prod) => 
      prod.total > max.total ? prod : max
    );
  }, [vendasPorProduto]);

  const totalVendas = useMemo(() => {
    return vendasPorProduto.reduce((acc, prod) => acc + prod.total, 0);
  }, [vendasPorProduto]);

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
          Vendas por Produto - Anual
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b',
            fontSize: '0.875rem',
          }}
        >
          Comparativo trimestral de performance dos produtos
        </Typography>
      </Box>

      {/* Resumo */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem' }}>
            Total de Vendas
          </Typography>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 700 }}>
            R$ {totalVendas.toLocaleString('pt-BR')}
          </Typography>
        </Box>
        <Chip
          label={melhorProduto.name}
          size="small"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        />
      </Box>

      {/* Gráfico */}
      <Box sx={{ 
        width: '100%', 
        height: 300,
        bgcolor: '#f8fafc',
        borderRadius: 2,
        p: 2,
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        <MuiBarChart
          width={undefined}
          height={300}
          series={[
            { dataKey: 'produtoA', label: 'Produto A' },
            { dataKey: 'produtoB', label: 'Produto B' },
            { dataKey: 'produtoC', label: 'Produto C' },
          ]}
          dataset={data}
          colors={['#818cf8', '#f472b6', '#34d399']}
          xAxis={[{ dataKey: 'categoria', scaleType: 'band' }]}
          margin={{ top: 10, bottom: 20, left: 30, right: 30 }}
        />
      </Box>

      {/* Totais por Produto */}
      <Grid container spacing={1}>
        {vendasPorProduto.map((prod) => (
          <Grid size={{ xs: 12 }} key={prod.key}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1.5,
                bgcolor: `${prod.color}15`,
                borderRadius: 1.5,
                border: `1px solid ${prod.color}30`,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                {prod.name}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: prod.color }}>
                R$ {prod.total.toLocaleString('pt-BR')}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default BarChart;
