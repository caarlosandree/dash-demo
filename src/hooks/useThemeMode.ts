import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

/**
 * Hook para detectar o modo de tema atual e retornar cores adequadas
 */
export const useThemeMode = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const colors = useMemo(() => ({
    // Cores que funcionam bem em ambos os temas
    primary: '#818cf8',
    secondary: '#f472b6',
    success: '#34d399',
    warning: '#fbbf24',
    info: '#60a5fa',
    
    // Backgrounds adaptáveis
    chartBg: isDark ? '#1e293b' : '#f8fafc',
    cardBg: isDark ? '#1e293b' : '#ffffff',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
    
    // Textos adaptáveis
    textPrimary: isDark ? '#f1f5f9' : '#1e293b',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    textDisabled: isDark ? '#475569' : '#94a3b8',
    
    // Opacidades
    overlay: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
    highlight: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    
    // Status
    successBg: isDark ? 'rgba(52, 211, 153, 0.2)' : 'rgba(52, 211, 153, 0.15)',
    errorBg: isDark ? 'rgba(248, 113, 113, 0.2)' : 'rgba(248, 113, 113, 0.15)',
    warningBg: isDark ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.15)',
    infoBg: isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(96, 165, 250, 0.15)',
  }), [isDark]);

  return {
    isDark,
    colors,
    theme,
  };
};

