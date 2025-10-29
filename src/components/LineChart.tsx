import { Box } from '@mui/material';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';

interface SeriesData {
  id: string;
  label: string;
  data: number[];
}

const LineChart: React.FC = () => {
  const data: SeriesData[] = [
    { id: 'vendas', label: 'Vendas', data: [120, 145, 138, 162, 178, 195, 210] },
    { id: 'receita', label: 'Receita', data: [80, 95, 110, 125, 140, 155, 170] },
  ];

  const xAxis = [
    {
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      scaleType: 'point' as const,
    },
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
      <MuiLineChart
        width={undefined}
        height={300}
        series={data.map((series, index) => ({
          id: series.id,
          label: series.label,
          data: series.data,
          curve: 'natural',
          color: index === 0 ? '#818cf8' : '#f472b6',
        }))}
        colors={['#818cf8', '#f472b6']}
        xAxis={xAxis}
        margin={{ top: 10, bottom: 20, left: 30, right: 30 }}
      />
    </Box>
  );
};

export default LineChart;

