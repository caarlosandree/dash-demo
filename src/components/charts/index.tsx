import { lazy } from 'react';

// Lazy loading para todos os componentes de gráficos
export const LineChart = lazy(() => import('../LineChart'));
export const BarChart = lazy(() => import('../BarChart'));
export const PieChart = lazy(() => import('../PieChart'));
export const AreaChart = lazy(() => import('../AreaChart'));
export const ScatterChart = lazy(() => import('../ScatterChart'));
export const SparklineChart = lazy(() => import('../SparklineChart'));
export const GaugeChart = lazy(() => import('../GaugeChart'));
export const FunnelChart = lazy(() => import('../FunnelChart'));
export const RadarChart = lazy(() => import('../RadarChart'));

// Componentes de modal também com lazy loading
export const LineChartModal = lazy(() => import('../LineChartModal'));
export const BarChartModal = lazy(() => import('../BarChartModal'));
export const PieChartModal = lazy(() => import('../PieChartModal'));
export const AreaChartModal = lazy(() => import('../AreaChartModal'));
export const ScatterChartModal = lazy(() => import('../ScatterChartModal'));
export const SparklineChartModal = lazy(() => import('../SparklineChartModal'));
export const GaugeChartModal = lazy(() => import('../GaugeChartModal'));
export const FunnelChartModal = lazy(() => import('../FunnelChartModal'));
export const RadarChartModal = lazy(() => import('../RadarChartModal'));

// Componentes de estatísticas
export const ClinicStats = lazy(() => import('../ClinicStats'));
export const AgendamentosTable = lazy(() => import('../AgendamentosTable'));
export const PresencasModal = lazy(() => import('../PresencasModal'));
export const ProfissionalModal = lazy(() => import('../ProfissionalModal'));
