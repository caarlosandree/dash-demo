import { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Chip, 
  Divider,
  Stack,
  Tabs,
  Tab
} from '@mui/material';
import { keyframes } from '@emotion/react';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import AreaChart from './components/AreaChart';
import ScatterChart from './components/ScatterChart';
import SparklineChart from './components/SparklineChart';
import GaugeChart from './components/GaugeChart';
import FunnelChart from './components/FunnelChart';
import RadarChart from './components/RadarChart';
import ClinicStats from './components/ClinicStats';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 800,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16,
  },
});

// Componente para seções do dashboard
const SectionHeader: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string;
  delay?: number;
}> = ({ icon, title, subtitle, delay = 0 }) => (
  <Box
    sx={{
      mb: 4,
      mt: { xs: 4, md: 6 },
      animation: `${fadeInUp} 0.6s ease-out ${delay}s both`,
    }}
  >
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
    </Stack>
    <Typography
      variant="body1"
      sx={{
        color: 'text.secondary',
        ml: { xs: 0, md: 7.5 },
        mb: 2,
        fontSize: { xs: '0.9rem', md: '1rem' },
      }}
    >
      {subtitle}
    </Typography>
    <Divider 
      sx={{ 
        mt: 2,
        background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%)',
        height: '2px',
        border: 'none',
      }} 
    />
  </Box>
);

// Componente para cards de gráfico
const ChartCard: React.FC<{ 
  title?: string; 
  icon?: string;
  children: React.ReactNode;
  delay: number;
  size?: { xs?: number; md?: number; lg?: number };
}> = ({ title, icon, children, delay, size = { xs: 12, md: 6, lg: 6 } }) => (
  <Grid size={size}>
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        height: '100%',
        bgcolor: '#ffffff',
        border: '1px solid rgba(0, 0, 0,getahui: 0.08)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `${fadeInUp} 0.6s ease-out ${delay}s both`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          transition: 'left 0.5s ease',
        },
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          '&::before': {
            opacity: 1,
          },
          '&::after': {
            left: '100%',
          },
        },
      }}
    >
      {title && icon && (
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            mb: 2.5,
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            fontWeight: 600,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
          }}
        >
          <Box component="span" sx={{ fontSize: { xs: '1.3rem', md: '1.5rem' } }}>{icon}</Box>
          {title}
        </Typography>
      )}
      <Box sx={{ position: 'relative' }}>
        {children}
      </Box>
    </Paper>
  </Grid>
);

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="xl" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              mb: 6,
              textAlign: 'center',
              animation: `${fadeInUp} 0.8s ease-out`,
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
                animation: `${float} 3s ease-in-out infinite`,
              }}
            >
              <BarChartIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <TrendingUpIcon sx={{ fontSize: 48, color: 'secondary.main' }} />
            </Box>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                mb: 2,
              }}
            >
              Dashboard de Gráficos
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                color: 'text.secondary',
                fontWeight: 400,
                mb: 3,
              }}
            >
              Visualizações interativas e modernas com MUI X Charts
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip
                label="8 Tipos de Gráficos"
                sx={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  color: 'primary.main',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  fontWeight: 500,
                }}
              />
              <Chip
                label="Design Moderno"
                sx={{
                  background: 'rgba(236, 72, 153, 0.1)',
                  color: 'secondary.main',
                  border: '1px solid rgba(236, 72, 153, 0.2)',
                  fontWeight: 500,
                }}
              />
              <Chip
                label="Totalmente Responsivo"
                sx={{
                  background: 'rgba(52, 211, 153, 0.1)',
                  color: '#059669',
                  border: '1px solid rgba(52, 211, 153, 0.2)',
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>

          {/* Tabs */}
          <Box
            sx={{
              mb: 4,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              centered
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  minHeight: 64,
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                },
              }}
            >
              <Tab
                icon={<BarChartIcon sx={{ mb: 0.5 }} />}
                iconPosition="start"
                label="Dashboard"
              />
              <Tab
                icon={<LocalHospitalIcon sx={{ mb: 0.5 }} />}
                iconPosition="start"
                label="Estatísticas da Clínica"
              />
            </Tabs>
          </Box>

          {/* Conteúdo das Abas */}
          {currentTab === 0 && (
            <>
              {/* Seção: Análises Temporais */}
          <SectionHeader
            icon={<TimelineIcon />}
            title="Análises Temporais"
            subtitle="Visualizações que mostram tendências e evoluções ao longo do tempo"
            delay={0.2}
          />
          <Grid container spacing={3}>
            <ChartCard delay={0.3}>
              <LineChart />
            </ChartCard>

            <ChartCard delay={0.4}>
              <AreaChart />
            </ChartCard>
          </Grid>

          {/* Seção: Comparações e Distribuições */}
          <SectionHeader
            icon={<CompareArrowsIcon />}
            title="Comparações e Distribuições"
            subtitle="Análise comparativa entre categorias e distribuição de dados"
            delay={0.5}
          />
          <Grid container spacing={3}>
            <ChartCard delay={0.6}>
              <BarChart />
            </ChartCard>

            <ChartCard delay={0.7}>
              <PieChart />
            </ChartCard>

            <ChartCard delay={0.8}>
              <ScatterChart />
            </ChartCard>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  bgcolor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    mb: 2,
                    color: 'text.primary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  ⚡ Sparkline Chart
                </Typography>
                <SparklineChart />
              </Paper>
            </Grid>

            <ChartCard delay={0.85}>
              <GaugeChart />
            </ChartCard>

            <ChartCard delay={0.9}>
              <FunnelChart />
            </ChartCard>

            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  animation: `${fadeInUp} 0.8s ease-out 0.8s both`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <RadarChart />
              </Paper>
            </Grid>
          </Grid>
            </>
          )}

          {currentTab === 1 && (
            <ClinicStats />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
