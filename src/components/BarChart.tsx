import { Box } from '@mui/material';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';

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

  return (
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
  );
};

export default BarChart;
