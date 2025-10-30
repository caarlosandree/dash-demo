import { useState, memo, useCallback } from 'react';
import {
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
  Badge,
  Box,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Download as ExportIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface FloatingActionButtonProps {
  onFiltersClick?: () => void;
  onExportClick?: () => void;
  onRefreshClick?: () => void;
  onSettingsClick?: () => void;
  activeFiltersCount?: number;
  isExporting?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onFiltersClick,
  onExportClick,
  onRefreshClick,
  onSettingsClick,
  activeFiltersCount = 0,
  isExporting = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const actions = [
    {
      icon: (
        <Badge badgeContent={activeFiltersCount} color="error" max={9}>
          <FilterIcon />
        </Badge>
      ),
      name: 'Filtros',
      onClick: onFiltersClick,
      tooltip: `Filtros${activeFiltersCount > 0 ? ` (${activeFiltersCount} ativos)` : ''}`,
    },
    {
      icon: <ExportIcon />,
      name: 'Exportar',
      onClick: onExportClick,
      tooltip: 'Exportar Dashboard',
    },
    {
      icon: <RefreshIcon />,
      name: 'Atualizar',
      onClick: onRefreshClick,
      tooltip: 'Atualizar Dados',
    },
    {
      icon: <SettingsIcon />,
      name: 'Configurações',
      onClick: onSettingsClick,
      tooltip: 'Configurações',
    },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
    >
      <SpeedDial
        ariaLabel="Ações do Dashboard"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
        sx={{
          '& .MuiFab-primary': {
            width: 56,
            height: 56,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.tooltip}
            onClick={() => {
              action.onClick?.();
              handleClose();
            }}
            sx={{
              '& .MuiFab-root': {
                width: 48,
                height: 48,
                bgcolor: 'background.paper',
                color: 'text.primary',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default memo(FloatingActionButton);
