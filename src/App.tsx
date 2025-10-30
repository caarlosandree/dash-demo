import { useState, useMemo, useCallback, useEffect } from 'react';
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
import {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  ScatterChart,
  SparklineChart,
  GaugeChart,
  FunnelChart,
  RadarChart,
  ClinicStats,
} from './components/charts';
import Toolbar from './components/Toolbar';
import FloatingActionButton from './components/FloatingActionButton';
import SkeletonChart from './components/SkeletonChart';
import LazyChartWrapper from './components/LazyChartWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import BundleAnalyzer from './components/BundleAnalyzer';
import ThemeTransition from './components/ThemeTransition';
import { DashboardProvider, useDashboard } from './contexts/DashboardContext';
import { useLazyCharts } from './hooks/useLazyCharts';

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

// Função para criar tema dinâmico
const getTheme = (mode: 'light' | 'dark' | 'auto') => {
  // Se for 'auto', usar a preferência do sistema
  const actualMode = mode === 'auto' 
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : mode;
    
  return createTheme({
  palette: {
    mode: actualMode,
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
      default: actualMode === 'light' ? '#f8fafc' : '#0f172a',
      paper: actualMode === 'light' ? '#ffffff' : '#1e293b',
    },
    text: {
      primary: actualMode === 'light' ? '#1e293b' : '#f1f5f9',
      secondary: actualMode === 'light' ? '#64748b' : '#94a3b8',
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
};

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
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
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
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          transition: 'left 0.5s ease',
        },
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
          borderColor: 'primary.main',
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

// Componente interno que usa o context
const DashboardContent: React.FC = () => {
  const { 
    state, 
    setTab, 
    setFilters, 
    clearLoading, 
    filteredData,
    toggleTheme,
    setThemeManually
  } = useDashboard();

  const { currentTab, filters, isLoading, theme } = state;

  // Hook para gerenciar lazy loading dos gráficos
  const { preloadChart, isChartLoaded } = useLazyCharts({
    preloadDelay: 1500, // Preload após 1.5s
    preloadOnHover: true,
    preloadOnFocus: true,
  });

  // IDs dos elementos para exportação
  const dashboardElementIds = [
    'line-chart',
    'area-chart', 
    'bar-chart',
    'pie-chart',
    'scatter-chart',
    'sparkline-chart',
    'gauge-chart',
    'funnel-chart',
    'radar-chart'
  ];

  // Dados dos gráficos para exportação CSV
  const allChartData = useMemo(() => [
    {
      id: 'line-chart',
      title: 'Evolução de Vendas e Receita',
      data: filteredData.lineData,
      type: 'line' as const,
    },
    {
      id: 'bar-chart',
      title: 'Vendas por Produto',
      data: filteredData.barData,
      type: 'bar' as const,
    },
    {
      id: 'pie-chart',
      title: 'Distribuição por Dispositivos',
      data: filteredData.pieData,
      type: 'pie' as const,
    },
  ], [filteredData]);

  const handleTabChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  }, [setTab]);

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
    // Simular loading quando filtros mudam
    setTimeout(() => clearLoading(), 800);
  }, [setFilters, clearLoading]);

  const handleThemeChange = useCallback((newTheme: 'light' | 'dark' | 'auto') => {
    setThemeManually(newTheme);
  }, [setThemeManually]);

  // Parar loading inicial após um tempo
  useEffect(() => {
    const timer = setTimeout(() => {
      clearLoading();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [clearLoading]);

  // Criar tema dinâmico baseado no estado
  const dynamicTheme = useMemo(() => getTheme(state.theme), [state.theme]);

  return (
    <ThemeProvider theme={dynamicTheme}>
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
              {/* Barra de Ferramentas Minimalista */}
              <Box data-toolbar>
                <Toolbar
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  dashboardElementIds={dashboardElementIds}
                  allChartData={allChartData}
                  onExport={(type, filename) => {
                    console.log(`Exportando ${type}: ${filename}`);
                  }}
                  theme={theme}
                  onThemeChange={handleThemeChange}
                />
              </Box>

              {/* Seção: Análises Temporais */}
          <SectionHeader
            icon={<TimelineIcon />}
            title="Análises Temporais"
            subtitle="Visualizações que mostram tendências e evoluções ao longo do tempo"
            delay={0.2}
          />
          <Grid container spacing={3}>
            <ChartCard delay={0.3}>
              <LazyChartWrapper variant="line" height={300}>
                <ErrorBoundary>
                  <Box id="line-chart">
                    <LineChart data={filteredData.lineData} />
                  </Box>
                </ErrorBoundary>
              </LazyChartWrapper>
            </ChartCard>

            <ChartCard delay={0.4}>
              <LazyChartWrapper variant="area" height={300}>
                <ErrorBoundary>
                  <Box id="area-chart">
                    <AreaChart />
                  </Box>
                </ErrorBoundary>
              </LazyChartWrapper>
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
              <LazyChartWrapper variant="bar" height={300}>
                <ErrorBoundary>
                  <Box id="bar-chart">
                    <BarChart data={filteredData.barData} />
                  </Box>
                </ErrorBoundary>
              </LazyChartWrapper>
            </ChartCard>

            <ChartCard delay={0.7}>
              <LazyChartWrapper variant="pie" height={300}>
                <ErrorBoundary>
                  <Box id="pie-chart">
                    <PieChart data={filteredData.pieData} />
                  </Box>
                </ErrorBoundary>
              </LazyChartWrapper>
            </ChartCard>

            <ChartCard delay={0.8}>
              <LazyChartWrapper variant="scatter" height={300}>
                <ErrorBoundary>
                  <Box id="scatter-chart">
                    <ScatterChart />
                  </Box>
                </ErrorBoundary>
              </LazyChartWrapper>
            </ChartCard>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
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
                <LazyChartWrapper variant="sparkline" height={200}>
                  <ErrorBoundary>
                    <Box id="sparkline-chart">
                      <SparklineChart />
                    </Box>
                  </ErrorBoundary>
                </LazyChartWrapper>
              </Paper>
            </Grid>

            <ChartCard delay={0.85}>
              <LazyChartWrapper variant="gauge" height={300}>
                <ErrorBoundary>
                  <Box id="gauge-chart">
                    <GaugeChart />
                  </Box>
                </ErrorBoundary>
              </LazyChartWrapper>
            </ChartCard>

            <ChartCard delay={0.9}>
              <LazyChartWrapper variant="funnel" height={300}>
                <ErrorBoundary>
                  <Box id="funnel-chart">
                    <FunnelChart />
                  </Box>
                </ErrorBoundary>
              </LazyChartWrapper>
            </ChartCard>

            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
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
                <LazyChartWrapper variant="radar" height={400}>
                  <ErrorBoundary>
                    <Box id="radar-chart">
                      <RadarChart />
                    </Box>
                  </ErrorBoundary>
                </LazyChartWrapper>
              </Paper>
            </Grid>
          </Grid>
            </>
          )}

          {currentTab === 1 && (
            <LazyChartWrapper variant="bar" height={600}>
              <ErrorBoundary>
                <ClinicStats />
              </ErrorBoundary>
            </LazyChartWrapper>
          )}
        </Container>
        
        {/* Bundle Analyzer (apenas em desenvolvimento) */}
        <BundleAnalyzer />

        {/* Botão de Ação Flutuante */}
        <FloatingActionButton
          onFiltersClick={() => {
            // Scroll para a toolbar
            const toolbar = document.querySelector('[data-toolbar]');
            if (toolbar) {
              toolbar.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onExportClick={() => {
            // Scroll para a toolbar
            const toolbar = document.querySelector('[data-toolbar]');
            if (toolbar) {
              toolbar.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onRefreshClick={() => {
            window.location.reload();
          }}
          activeFiltersCount={Object.values(filters).filter(v => 
            Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null
          ).length}
        />

        </Box>
    </ThemeProvider>
  );
}

// Componente App principal com Provider
const App: React.FC = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default App;
