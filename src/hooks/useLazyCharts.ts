import { useState, useEffect, useCallback } from 'react';

interface UseLazyChartsOptions {
  preloadDelay?: number;
  preloadOnHover?: boolean;
  preloadOnFocus?: boolean;
}

export const useLazyCharts = (options: UseLazyChartsOptions = {}) => {
  const { 
    preloadDelay = 1000, 
    preloadOnHover = true, 
    preloadOnFocus = true 
  } = options;

  const [loadedCharts, setLoadedCharts] = useState<Set<string>>(new Set());
  const [loadingCharts, setLoadingCharts] = useState<Set<string>>(new Set());

  const preloadChart = useCallback(async (chartName: string) => {
    if (loadedCharts.has(chartName) || loadingCharts.has(chartName)) {
      return;
    }

    setLoadingCharts(prev => new Set(prev).add(chartName));

    try {
      // Simular carregamento do componente
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setLoadedCharts(prev => new Set(prev).add(chartName));
    } catch (error) {
      console.error(`Erro ao carregar gráfico ${chartName}:`, error);
    } finally {
      setLoadingCharts(prev => {
        const newSet = new Set(prev);
        newSet.delete(chartName);
        return newSet;
      });
    }
  }, [loadedCharts, loadingCharts]);

  const preloadAllCharts = useCallback(async () => {
    const chartNames = [
      'LineChart', 'BarChart', 'PieChart', 'AreaChart', 
      'ScatterChart', 'SparklineChart', 'GaugeChart', 
      'FunnelChart', 'RadarChart'
    ];

    // Carregar gráficos em paralelo com delay entre eles
    for (let i = 0; i < chartNames.length; i++) {
      setTimeout(() => {
        preloadChart(chartNames[i]);
      }, i * 200); // Delay de 200ms entre cada gráfico
    }
  }, [preloadChart]);

  const isChartLoaded = useCallback((chartName: string) => {
    return loadedCharts.has(chartName);
  }, [loadedCharts]);

  const isChartLoading = useCallback((chartName: string) => {
    return loadingCharts.has(chartName);
  }, [loadingCharts]);

  // Preload automático após delay
  useEffect(() => {
    const timer = setTimeout(() => {
      preloadAllCharts();
    }, preloadDelay);

    return () => clearTimeout(timer);
  }, [preloadAllCharts, preloadDelay]);

  return {
    loadedCharts,
    loadingCharts,
    preloadChart,
    preloadAllCharts,
    isChartLoaded,
    isChartLoading,
  };
};

export default useLazyCharts;
