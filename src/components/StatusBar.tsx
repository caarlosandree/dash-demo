import { memo, useMemo } from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Fade,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface StatusBarProps {
  isLoading?: boolean;
  exportProgress?: number;
  isExporting?: boolean;
  activeFiltersCount?: number;
  totalCharts?: number;
  lastUpdated?: Date;
  errors?: string[];
}

const StatusBar: React.FC<StatusBarProps> = ({
  isLoading = false,
  exportProgress = 0,
  isExporting = false,
  activeFiltersCount = 0,
  totalCharts = 9,
  lastUpdated,
  errors = [],
}) => {
  const statusInfo = useMemo(() => {
    if (errors.length > 0) {
      return {
        type: 'error' as const,
        icon: <ErrorIcon />,
        message: `${errors.length} erro${errors.length > 1 ? 's' : ''}`,
        color: 'error',
      };
    }

    if (isExporting) {
      return {
        type: 'info' as const,
        icon: <InfoIcon />,
        message: `Exportando... ${Math.round(exportProgress)}%`,
        color: 'info',
      };
    }

    if (isLoading) {
      return {
        type: 'info' as const,
        icon: <InfoIcon />,
        message: 'Carregando dados...',
        color: 'info',
      };
    }

    return {
      type: 'success' as const,
      icon: <CheckIcon />,
      message: 'Dashboard atualizado',
      color: 'success',
    };
  }, [isLoading, exportProgress, isExporting, errors.length]);

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `${minutes}min atrás`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    
    const days = Math.floor(hours / 24);
    return `${days}d atrás`;
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        px: 2,
        py: 1,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        {/* Status Principal */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: `${statusInfo.color}.main`,
            }}
          >
            {statusInfo.icon}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {statusInfo.message}
          </Typography>
        </Stack>

        {/* Informações do Dashboard */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {activeFiltersCount > 0 && (
            <Chip
              label={`${activeFiltersCount} filtro${activeFiltersCount > 1 ? 's' : ''}`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          )}
          
          <Chip
            label={`${totalCharts} gráficos`}
            size="small"
            color="default"
            variant="outlined"
            sx={{ fontSize: '0.7rem', height: 20 }}
          />

          {lastUpdated && (
            <Typography variant="caption" color="text.secondary">
              {formatLastUpdated(lastUpdated)}
            </Typography>
          )}
        </Stack>
      </Stack>

      {/* Barra de Progresso */}
      <Fade in={isLoading || isExporting}>
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant={isLoading ? 'indeterminate' : 'determinate'}
            value={isExporting ? exportProgress : undefined}
            sx={{
              height: 2,
              borderRadius: 1,
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': {
                borderRadius: 1,
              },
            }}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default memo(StatusBar);
