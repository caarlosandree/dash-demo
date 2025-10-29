import { Box } from '@mui/material';
import { SparkLineChart as MuiSparklineChart } from '@mui/x-charts/SparkLineChart';

const SparklineChart: React.FC = () => {
  const data: number[] = [10, 5, 15, 20, 18, 25, 22, 30, 28, 35, 32, 40];

  return (
    <Box sx={{ 
      width: '100%', 
      height: 300, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column', 
      gap: 3,
      bgcolor: '#f8fafc',
      borderRadius: 2,
      p: 2,
      border: '1px solid rgba(0, 0, 0, 0.05)',
    }}>
      <Box sx={{ width: '100%' }}>
        <MuiSparklineChart
          data={data}
          width={400}
          height={100}
          showTooltip
          showHighlight
          color="#818cf8"
        />
      </Box>
      <Box sx={{ width: '100%' }}>
        <MuiSparklineChart
          data={data}
          width={400}
          height={100}
          plotType="bar"
          showTooltip
          showHighlight
          color="#f472b6"
        />
      </Box>
    </Box>
  );
};

export default SparklineChart;
