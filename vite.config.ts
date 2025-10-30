import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dash-demo/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'charts-vendor': ['@mui/x-charts', '@mui/x-date-pickers'],
          'date-vendor': ['date-fns'],
          
          // Chart chunks
          'line-chart': ['./src/components/LineChart'],
          'bar-chart': ['./src/components/BarChart'],
          'pie-chart': ['./src/components/PieChart'],
          'area-chart': ['./src/components/AreaChart'],
          'scatter-chart': ['./src/components/ScatterChart'],
          'sparkline-chart': ['./src/components/SparklineChart'],
          'gauge-chart': ['./src/components/GaugeChart'],
          'funnel-chart': ['./src/components/FunnelChart'],
          'radar-chart': ['./src/components/RadarChart'],
          
          // Modal chunks
          'chart-modals': [
            './src/components/LineChartModal',
            './src/components/BarChartModal',
            './src/components/PieChartModal',
            './src/components/AreaChartModal',
            './src/components/ScatterChartModal',
            './src/components/SparklineChartModal',
            './src/components/GaugeChartModal',
            './src/components/FunnelChartModal',
            './src/components/RadarChartModal',
          ],
          
          // Stats chunks
          'clinic-stats': ['./src/components/ClinicStats'],
          'clinic-modals': [
            './src/components/AgendamentosTable',
            './src/components/PresencasModal',
            './src/components/ProfissionalModal',
          ],
        },
      },
    },
    // Otimizações de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Análise de bundle
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
})
