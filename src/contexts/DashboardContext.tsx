import { createContext, useContext, useReducer, ReactNode, useMemo, useEffect } from 'react';
import { FilterState } from '../components/FilterPanel';
import { ThemeMode } from '../hooks/useTheme';

// Tipos de estado
interface DashboardState {
  filters: FilterState;
  isLoading: boolean;
  currentTab: number;
  theme: ThemeMode;
  isThemeManuallySet: boolean; // Rastreia se o usuário escolheu manualmente
  data: {
    lineData: {
      vendas: number[];
      receita: number[];
      meses: string[];
    };
    barData: Array<{
      categoria: string;
      produtoA: number;
      produtoB: number;
      produtoC: number;
    }>;
    pieData: Array<{
      id: number;
      value: number;
      label: string;
    }>;
  };
}

// Tipos de ações
type DashboardAction =
  | { type: 'SET_FILTERS'; payload: FilterState }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TAB'; payload: number }
  | { type: 'UPDATE_DATA'; payload: Partial<DashboardState['data']> }
  | { type: 'RESET_FILTERS' }
  | { type: 'CLEAR_LOADING' }
  | { type: 'SET_THEME'; payload: ThemeMode }
  | { type: 'SET_THEME_MANUALLY'; payload: ThemeMode };

// Função helper para obter tema inicial
const getInitialTheme = (): { theme: ThemeMode; isManuallySet: boolean } => {
  if (typeof window === 'undefined') return { theme: 'light', isManuallySet: false };
  
  const savedTheme = localStorage.getItem('dashboard-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return { theme: savedTheme, isManuallySet: true };
  }
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return { theme: prefersDark ? 'dark' : 'light', isManuallySet: false };
};

// Estado inicial
const initialThemeData = getInitialTheme();
const initialState: DashboardState = {
  filters: {
    period: { type: 'last30days' },
    categories: ['Vendas', 'Receita', 'Produtos'],
    dataTypes: ['Números', 'Percentuais'],
    chartTypes: ['Linha', 'Barras', 'Pizza', 'Área'],
    valueRange: [0, 1000000],
    showTrends: true,
    showProjections: false,
    aggregation: 'monthly',
  },
  isLoading: true,
  currentTab: 0,
  theme: initialThemeData.theme,
  isThemeManuallySet: initialThemeData.isManuallySet,
  data: {
    lineData: {
      vendas: [120, 145, 138, 162, 178, 195, 210],
      receita: [80, 95, 110, 125, 140, 155, 170],
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    },
    barData: [
      { categoria: 'Q1', produtoA: 4000, produtoB: 2400, produtoC: 2000 },
      { categoria: 'Q2', produtoA: 3000, produtoB: 1398, produtoC: 2210 },
      { categoria: 'Q3', produtoA: 2000, produtoB: 9800, produtoC: 2290 },
      { categoria: 'Q4', produtoA: 2780, produtoB: 3908, produtoC: 2000 },
    ],
    pieData: [
      { id: 0, value: 45, label: 'Desktop' },
      { id: 1, value: 30, label: 'Mobile' },
      { id: 2, value: 15, label: 'Tablet' },
      { id: 3, value: 7, label: 'Smart TV' },
      { id: 4, value: 3, label: 'Outros' },
    ],
  },
};

// Reducer
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
        isLoading: true, // Ativar loading quando filtros mudam
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case 'SET_TAB':
      return {
        ...state,
        currentTab: action.payload,
      };
    
    case 'UPDATE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
        isLoading: true,
      };
    
    case 'CLEAR_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    
    case 'SET_THEME_MANUALLY':
      return {
        ...state,
        theme: action.payload,
        isThemeManuallySet: true,
      };
    
    default:
      return state;
  }
}

// Context
interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
  // Ações helper
  setFilters: (filters: FilterState) => void;
  setLoading: (loading: boolean) => void;
  setTab: (tab: number) => void;
  resetFilters: () => void;
  clearLoading: () => void;
  setTheme: (theme: ThemeMode) => void;
  setThemeManually: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  // Dados computados
  filteredData: DashboardState['data'];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider
interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Aplica tema inicial ao HTML
  useMemo(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', state.theme);
    }
  }, [state.theme]);

  // Listener para mudanças do tema do sistema
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Só aplica se o usuário não escolheu manualmente
      if (!state.isThemeManuallySet) {
        const newTheme = e.matches ? 'dark' : 'light';
        dispatch({ type: 'SET_THEME', payload: newTheme });
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [state.isThemeManuallySet]);

  // Ações helper
  const setFilters = (filters: FilterState) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setTab = (tab: number) => {
    dispatch({ type: 'SET_TAB', payload: tab });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const clearLoading = () => {
    dispatch({ type: 'CLEAR_LOADING' });
  };

  const setTheme = (theme: ThemeMode) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    localStorage.setItem('dashboard-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  const setThemeManually = (theme: ThemeMode) => {
    dispatch({ type: 'SET_THEME_MANUALLY', payload: theme });
    localStorage.setItem('dashboard-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setThemeManually(newTheme);
  };

  // Dados filtrados computados
  const filteredData = useMemo(() => {
    const baseData = state.data;
    let filtered = { ...baseData };

    // Aplicar filtros de período
    if (state.filters.period.type === 'last7days') {
      filtered.lineData = {
        vendas: [180, 195, 210, 225, 240, 255, 270],
        receita: [120, 135, 150, 165, 180, 195, 210],
        meses: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      };
    } else if (state.filters.period.type === 'last90days') {
      filtered.lineData = {
        vendas: [100, 110, 120, 130, 140, 150, 160],
        receita: [70, 80, 90, 100, 110, 120, 130],
        meses: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7'],
      };
    }

    // Aplicar filtros de faixa de valores
    const valueMultiplier = state.filters.valueRange[1] / 1000000;
    filtered.lineData.vendas = filtered.lineData.vendas.map(v => Math.round(v * valueMultiplier));
    filtered.lineData.receita = filtered.lineData.receita.map(v => Math.round(v * valueMultiplier));
    
    filtered.barData = filtered.barData.map(item => ({
      ...item,
      produtoA: Math.round(item.produtoA * valueMultiplier),
      produtoB: Math.round(item.produtoB * valueMultiplier),
      produtoC: Math.round(item.produtoC * valueMultiplier),
    }));

    // Aplicar filtros de categorias
    if (!state.filters.categories.includes('Vendas')) {
      filtered.lineData.vendas = [];
    }
    if (!state.filters.categories.includes('Receita')) {
      filtered.lineData.receita = [];
    }

    return filtered;
  }, [state.filters, state.data]);

  const contextValue: DashboardContextType = {
    state,
    dispatch,
    setFilters,
    setLoading,
    setTab,
    resetFilters,
    clearLoading,
    setTheme,
    setThemeManually,
    toggleTheme,
    filteredData,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// Hook para usar o context
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export default DashboardContext;
