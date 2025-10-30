import { useState, useCallback, useEffect } from 'react';

interface UseLoadingOptions {
  initialLoading?: boolean;
  delay?: number;
  minLoadingTime?: number;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const { initialLoading = false, delay = 0, minLoadingTime = 1000 } = options;
  
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  const startLoading = useCallback(() => {
    setLoadingStartTime(Date.now());
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    if (loadingStartTime) {
      const elapsedTime = Date.now() - loadingStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        setIsLoading(false);
        setLoadingStartTime(null);
      }, remainingTime);
    } else {
      setIsLoading(false);
    }
  }, [loadingStartTime, minLoadingTime]);

  const setLoading = useCallback((loading: boolean) => {
    if (loading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  // Simular loading com delay
  const simulateLoading = useCallback(async (duration: number = 2000) => {
    startLoading();
    await new Promise(resolve => setTimeout(resolve, duration));
    stopLoading();
  }, [startLoading, stopLoading]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setLoading,
    simulateLoading,
  };
};

export default useLoading;
