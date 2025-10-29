import { Box } from '@mui/material';
import { ScatterChart as MuiScatterChart } from '@mui/x-charts/ScatterChart';

interface ScatterData {
  x: number;
  y: number;
  id: number;
}

interface ScatterDataCollection {
  serie1: ScatterData[];
}

const ScatterChart: React.FC = () => {
  // Dados simulados: tempo de estudo (x) vs nota (y)
  const data: ScatterDataCollection = {
    serie1: [
      { x: 10, y: 65, id: 0 },
      { x: 15, y: 70, id: 1 },
      { x: 20, y: 75, id: 2 },
      { x: 25, y: 80, id: 3 },
      { x: 30, y: 82, id: 4 },
      { x: 35, y: 85, id: 5 },
      { x: 40, y: 88, id: 6 },
      { x: 45, y: 90, id: 7 },
      { x: 50, y: 92, id: 8 },
      { x: 55, y: 94, id: 9 },
      { x: 60, y: 95, id: 10 },
      { x: 65, y: 96, id: 11 },
      { x: 70, y: 97, id: 12 },
    ],
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: 400,
      bgcolor: '#f8fafc',
      borderRadius: 2,
      p: 2,
      border: '1px solid rgba(0, 0, 0, 0.05)',
    }}>
      <MuiScatterChart
        width={undefined}
        height={400}
        series={[
          {
            id: 'serie1',
            label: 'Nota vs Tempo de Estudo',
            data: data.serie1,
            color: '#818cf8',
          },
        ]}
        colors={['#818cf8']}
        xAxis={[
          {
            label: 'Horas de Estudo',
            min: 0,
            max: 80,
          },
        ]}
        yAxis={[
          {
            label: 'Nota',
            min: 60,
            max: 100,
          },
        ]}
        margin={{ top: 20, bottom: 40, left: 60, right: 30 }}
      />
    </Box>
  );
};

export default ScatterChart;
