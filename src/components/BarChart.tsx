import { useState } from 'react';
import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { useMemo } from 'react';
import BarChartModal from './BarChartModal';

interface BarData {
  categoria: string;
  produtoA: number;
  produtoB: number;
  produtoC: number;
  [key: string]: string | number;
}

const BarChart: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedData, setSelectedData] = useState<any>(null);

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

  // Dados detalhados para cada produto
  const detailedData: Record<string, any> = {
    'Produto A': {
      nome: 'Produto A',
      cor: '#818cf8',
      vendas: [12000, 15000, 18000, 22000, 25000, 28000, 30000, 32000, 35000, 38000, 40000, 42000],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      totalVendas: 1178000,
      crescimento: 15.5,
      marketShare: 35.2,
      clientes: [
        { nome: 'Empresa Alpha', valor: 125000 },
        { nome: 'Corporação Beta', valor: 98000 },
        { nome: 'Grupo Gamma', valor: 87000 },
        { nome: 'Indústria Delta', valor: 75000 },
        { nome: 'Comércio Epsilon', valor: 62000 },
      ],
      regioes: [
        { regiao: 'Sudeste', vendas: 450000 },
        { regiao: 'Sul', vendas: 320000 },
        { regiao: 'Nordeste', vendas: 280000 },
        { regiao: 'Norte', vendas: 128000 },
      ],
    },
    'Produto B': {
      nome: 'Produto B',
      cor: '#f472b6',
      vendas: [18000, 21000, 24000, 27000, 30000, 32000, 34000, 36000, 38000, 40000, 42000, 45000],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      totalVendas: 1675000,
      crescimento: 22.3,
      marketShare: 42.1,
      clientes: [
        { nome: 'Tech Solutions', valor: 180000 },
        { nome: 'Digital Corp', valor: 145000 },
        { nome: 'Innovation Ltd', valor: 120000 },
        { nome: 'Future Systems', valor: 95000 },
        { nome: 'Next Gen', valor: 80000 },
      ],
      regioes: [
        { regiao: 'Sudeste', vendas: 680000 },
        { regiao: 'Sul', vendas: 450000 },
        { regiao: 'Nordeste', vendas: 380000 },
        { regiao: 'Norte', vendas: 165000 },
      ],
    },
    'Produto C': {
      nome: 'Produto C',
      cor: '#34d399',
      vendas: [8000, 9500, 11000, 12500, 14000, 15500, 17000, 18000, 19500, 21000, 22500, 24000],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      totalVendas: 850000,
      crescimento: 18.7,
      marketShare: 22.7,
      clientes: [
        { nome: 'Green Energy', valor: 95000 },
        { nome: 'Eco Solutions', valor: 78000 },
        { nome: 'Sustainable Corp', valor: 65000 },
        { nome: 'Clean Tech', valor: 52000 },
        { nome: 'Green Future', valor: 43000 },
      ],
      regioes: [
        { regiao: 'Sudeste', vendas: 350000 },
        { regiao: 'Sul', vendas: 250000 },
        { regiao: 'Nordeste', vendas: 180000 },
        { regiao: 'Norte', vendas: 70000 },
      ],
    },
  };

  const handleBarClick = (event: any, itemIdentifier: any) => {
    const serieId = itemIdentifier?.dataIndex ?? itemIdentifier?.itemIndex ?? itemIdentifier?.index;
    const serieName = itemIdentifier?.seriesId;
    
    if (serieName && detailedData[serieName]) {
      setSelectedProduct(serieName);
      setSelectedData(detailedData[serieName]);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct('');
    setSelectedData(null);
  };

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
          Comparativo trimestral de performance dos produtos - Clique nas barras para detalhes
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
            { dataKey: 'produtoA', label: 'Produto A', id: 'Produto A' },
            { dataKey: 'produtoB', label: 'Produto B', id: 'Produto B' },
            { dataKey: 'produtoC', label: 'Produto C', id: 'Produto C' },
          ]}
          dataset={data}
          colors={['#818cf8', '#f472b6', '#34d399']}
          xAxis={[{ dataKey: 'categoria', scaleType: 'band' }]}
          margin={{ top: 10, bottom: 20, left: 30, right: 30 }}
          onItemClick={handleBarClick}
          slotProps={{
            bar: {
              cursor: 'pointer',
            },
          }}
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

      {/* Modal de Detalhes */}
      {selectedData && (
        <BarChartModal
          open={openModal}
          onClose={handleCloseModal}
          selectedProduct={selectedProduct}
          data={data}
          productDetails={selectedData}
        />
      )}
    </Stack>
  );
};

export default BarChart;
