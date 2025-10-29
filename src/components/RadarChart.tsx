import { Box } from '@mui/material';
import { RadarChart as MuiRadarChart } from '@mui/x-charts/RadarChart';

interface RadarSeries {
  id: string;
  label: string;
  data: number[];
}

interface RadarConfig {
  metrics: string[];
  max: number;
}

const RadarChart: React.FC = () => {
  const series: RadarSeries[] = [
    {
      id: 'Performance',
      label: 'Performance',
      data: [85, 92, 78, 88, 90, 82],
    },
  ];

  const radar: RadarConfig = {
    metrics: ['Velocidade', 'Segurança', 'Usabilidade', 'Design', 'Funcionalidades', 'Suporte'],
    max: 100,
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: 400, 
      display: 'flex', 
      justifyContent: 'center',
      bgcolor: '#f8fafc',
      borderRadius: 2,
      p: 2,
      border: '1px solid rgba(0, 0, 0, 0.05)',
    }}>
      <MuiRadarChart
        width={500}
        height={400}
        series={series}
        radar={radar}
        colors={['#818cf8']}
      />
    </Box>
  );
};

export default RadarChart;

