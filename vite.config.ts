import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dash-demo/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@mui/material') || id.includes('@mui/icons-material') || 
                id.includes('@emotion/react') || id.includes('@emotion/styled')) {
              return 'mui-vendor';
            }
            if (id.includes('@mui/x-charts') || id.includes('@mui/x-date-pickers')) {
              return 'charts-vendor';
            }
            if (id.includes('date-fns')) {
              return 'date-vendor';
            }
            return 'vendor';
          }
          
          // Chart chunks
          if (id.includes('/src/components/LineChart')) return 'line-chart';
          if (id.includes('/src/components/BarChart')) return 'bar-chart';
          if (id.includes('/src/components/PieChart')) return 'pie-chart';
          if (id.includes('/src/components/AreaChart')) return 'area-chart';
          if (id.includes('/src/components/ScatterChart')) return 'scatter-chart';
          if (id.includes('/src/components/SparklineChart')) return 'sparkline-chart';
          if (id.includes('/src/components/GaugeChart')) return 'gauge-chart';
          if (id.includes('/src/components/FunnelChart')) return 'funnel-chart';
          if (id.includes('/src/components/RadarChart')) return 'radar-chart';
          
          // Modal chunks
          if (id.includes('ChartModal')) return 'chart-modals';
          
          // Stats chunks
          if (id.includes('/src/components/ClinicStats')) return 'clinic-stats';
          if (id.includes('/src/components/AgendamentosTable') || 
              id.includes('/src/components/PresencasModal') || 
              id.includes('/src/components/ProfissionalModal')) {
            return 'clinic-modals';
          }
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
