import { useState } from 'react';
import { Box } from '@mui/material';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import PieChartModal from './PieChartModal';

interface PieData {
  id: number;
  value: number;
  label: string;
}

interface DetailData {
  materiais: { nome: string; quantidade: number }[];
  vendas: number[];
  meses: string[];
  totalItems: number;
  valorTotal: number;
  crescimento: number;
}

const PieChart: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedData, setSelectedData] = useState<DetailData | null>(null);

  const data: PieData[] = [
    { id: 0, value: 35, label: 'Desktop' },
    { id: 1, value: 25, label: 'Mobile' },
    { id: 2, value: 20, label: 'Tablet' },
    { id: 3, value: 15, label: 'Smart TV' },
    { id: 4, value: 5, label: 'Outros' },
  ];

  // Dados mockados detalhados para cada categoria
  const detailedData: Record<string, DetailData> = {
    Desktop: {
      materiais: [
        { nome: 'Notebooks', quantidade: 1240 },
        { nome: 'Desktops', quantidade: 890 },
        { nome: 'Monitores', quantidade: 1560 },
        { nome: 'Teclados', quantidade: 2100 },
        { nome: 'Mouses', quantidade: 2300 },
        { nome: 'Webcams', quantidade: 450 },
      ],
      vendas: [12000, 15000, 18000, 22000, 25000, 28000, 30000, 32000, 35000, 38000, 40000, 42000],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      totalItems: 8540,
      valorTotal: 2500000,
      crescimento: 15.5,
    },
    Mobile: {
      materiais: [
        { nome: 'Smartphones Android', quantidade: 3200 },
        { nome: 'Smartphones iOS', quantidade: 2800 },
        { nome: 'Capas e Películas', quantidade: 5600 },
        { nome: 'Carregadores', quantidade: 4100 },
        { nome: 'Fones de Ouvido', quantidade: 2900 },
        { nome: 'Power Banks', quantidade: 1500 },
      ],
      vendas: [18000, 21000, 24000, 27000, 30000, 32000, 34000, 36000, 38000, 40000, 42000, 45000],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      totalItems: 20100,
      valorTotal: 3200000,
      crescimento: 22.3,
    },
    Tablet: {
      materiais: [
        { nome: 'Tablets Android', quantidade: 890 },
        { nome: 'Tablets iOS', quantidade: 650 },
        { nome: 'Capas para Tablet', quantidade: 1200 },
        { nome: 'Stylus', quantidade: 450 },
        { nome: 'Teclados Bluetooth', quantidade: 320 },
        { nome: 'Suportes', quantidade: 680 },
      ],
      vendas: [8000, 9500, 11000, 12500, 14000, 15500, 17000, 18000, 19500, 21000, 22500, 24000],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      totalItems: 4190,
      valorTotal: 1800000,
      crescimento: 18.7,
    },
    'Smart TV': {
      materiais: [
        { nome: 'Smart TVs 32"', quantidade: 340 },
        { nome: 'Smart TVs 43"', quantidade: 520 },
        { nome: 'Smart TVs 55"', quantidade: 280 },
        { nome: 'Smart TVs 65"', quantidade: 150 },
      ],
      vendas: [15000, 16000, 17000, 17500, 18000, 18500, 19000, 19500, 20000, 20500, 21000, 21500],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      totalItems: 1290,
      valorTotal: 4200000,
      crescimento: 12.4,
    },
    Outros: {
      materiais: [
        { nome: 'Acessórios', quantidade: 1200 },
        { nome: 'Cabos', quantidade: 800 },
        { nome: 'Adaptadores', quantidade: 450 },
        { nome: 'Suportes Universais', quantidade: 320 },
      ],
      vendas: [3000, 3500, 4000, 4200, 4500, 4800, 5000, 5200, 5500, 5800, 6000, 6200],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      totalItems: 2770,
      valorTotal: 850000,
      crescimento: 8.2,
    },
  };

  const handleItemClick = (_event: any, itemIdentifier: any) => {
    // O itemIdentifier pode ter dataIndex ou itemIndex dependendo da versão
    const itemIndex = itemIdentifier?.dataIndex ?? itemIdentifier?.itemIndex ?? itemIdentifier?.index;
    const clickedItem = data.find((item) => item.id === itemIndex);
    if (clickedItem) {
      setSelectedCategory(clickedItem.label);
      setSelectedData(detailedData[clickedItem.label]);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory('');
    setSelectedData(null);
  };

  return (
    <>
      <Box sx={{ 
        width: '100%', 
        height: 300, 
        display: 'flex', 
        justifyContent: 'center',
        bgcolor: '#f8fafc',
        borderRadius: 2,
        p: 2,
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        <MuiPieChart
          series={[
            {
              data,
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 2,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 270,
              highlightScope: { fade: 'global', highlight: 'item' },
            },
          ]}
          colors={['#818cf8', '#f472b6', '#34d399', '#fbbf24', '#60a5fa']}
          width={400}
          height={300}
          onItemClick={handleItemClick}
          slotProps={{
            pieArc: {
              cursor: 'pointer',
            },
          }}
        />
      </Box>

      {selectedData && (
        <PieChartModal
          open={openModal}
          onClose={handleCloseModal}
          category={selectedCategory}
          data={selectedData}
        />
      )}
    </>
  );
};

export default PieChart;

