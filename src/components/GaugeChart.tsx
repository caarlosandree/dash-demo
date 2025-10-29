import { Box } from '@mui/material';
import { GaugeContainer, GaugeValueArc, GaugeReferenceArc } from '@mui/x-charts/Gauge';

const GaugeChart: React.FC = () => {
  const value: number = 75;

  return (
    <Box sx={{ 
      width: '100%', 
      height: 300, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column', 
      gap: 4,
      bgcolor: '#f8fafc',
      borderRadius: 2,
      p: 2,
      border: '1px solid rgba(0, 0, 0, 0.05)',
    }}>
      <GaugeContainer
        width={220}
        height={220}
        startAngle={-110}
        endAngle={110}
        value={value}
      >
        <GaugeReferenceArc color="#374151" />
        <GaugeValueArc color="#818cf8" />
        <text 
          x="50%" 
          y="50%" 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fontSize="24" 
          fontWeight="bold"
          fill="#1e293b"
        >
          {value}%
        </text>
      </GaugeContainer>
    </Box>
  );
};

export default GaugeChart;
