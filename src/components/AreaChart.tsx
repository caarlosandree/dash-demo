import { Box } from '@mui/material';
import { LineChart as MuiAreaChart } from '@mui/x-charts/LineChart';

interface AreaData {
  id: string;
  label: string;
  data: number[];
}

const AreaChart: React.FC = () => {
  const data: AreaData[] = [
    { id: 'usuarios', label: 'Usuários Ativos', data: [420, 430, 448, 470, 540, 580, 690] },
    { id: 'sessoes', label: 'Novos Usuários', data: [240, 280, 290, 320, 380, 420, 450] },
  ];

  const xAxis = [
    {
      data: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
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
      <MuiAreaChart
        width={undefined}
        height={300}
        series={data.map((series, index) => ({
          id: series.id,
          label: series.label,
          data: series.data,
          stack: 'total',
          area: true,
          color: index === 0 ? '#818cf8' : '#f472b6',
        }))}
        colors={['#818cf8', '#f472b6']}
        xAxis={xAxis}
        margin={{ top: 10, bottom: 20, left: 30, right: 30 }}
      />
    </Box>
  );
};

export default AreaChart;

