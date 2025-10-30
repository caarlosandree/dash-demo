import { useState, memo, useCallback, useMemo } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Tooltip,
  Stack,
  Typography,
  Divider,
  Badge,
  Chip,
  Collapse,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Download as ExportIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import FilterPanel from './FilterPanel';
import ExportPanel from './ExportPanel';
import ViewModeToggle from './ViewModeToggle';
import { FilterState } from './FilterPanel';

interface ToolbarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  dashboardElementIds: string[];
  allChartData: Array<{
    id: string;
    title: string;
    data: any[];
    type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar' | 'gauge' | 'sparkline';
  }>;
  onExport?: (type: string, filename: string) => void;
  viewMode?: 'grid' | 'list' | 'compact';
  onViewModeChange?: (mode: 'grid' | 'list' | 'compact') => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  filters,
  onFiltersChange,
  dashboardElementIds,
  allChartData,
  onExport,
  viewMode = 'grid',
  onViewModeChange,
  theme = 'light',
  onThemeToggle,
}) => {
  const [activePanel, setActivePanel] = useState<'none' | 'filters' | 'export'>('none');
  const [expanded, setExpanded] = useState(false);

  const handlePanelToggle = useCallback((panel: 'filters' | 'export') => {
    if (activePanel === panel) {
      setActivePanel('none');
      setExpanded(false);
    } else {
      setActivePanel(panel);
      setExpanded(true);
    }
  }, [activePanel]);

  const handleClose = useCallback(() => {
    setActivePanel('none');
    setExpanded(false);
  }, []);

  // Contar filtros ativos
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.period.type !== 'last30days') count++;
    if (filters.categories.length !== 3) count++;
    if (filters.dataTypes.length !== 2) count++;
    if (filters.chartTypes.length !== 4) count++;
    if (filters.valueRange[0] !== 0 || filters.valueRange[1] !== 1000000) count++;
    if (!filters.showTrends) count++;
    if (filters.showProjections) count++;
    if (filters.aggregation !== 'monthly') count++;
    return count;
  }, [filters]);

  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      {/* Barra de Ferramentas Minimalista */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* Lado Esquerdo - Botões de Ação */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Filtros do Dashboard">
              <IconButton
                onClick={() => handlePanelToggle('filters')}
                sx={{
                  bgcolor: activePanel === 'filters' ? 'primary.main' : 'transparent',
                  color: activePanel === 'filters' ? 'white' : 'text.secondary',
                  '&:hover': {
                    bgcolor: activePanel === 'filters' ? 'primary.dark' : 'action.hover',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <Badge badgeContent={activeFiltersCount} color="error" max={9}>
                  <FilterIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Exportar Dashboard">
              <IconButton
                onClick={() => handlePanelToggle('export')}
                sx={{
                  bgcolor: activePanel === 'export' ? 'secondary.main' : 'transparent',
                  color: activePanel === 'export' ? 'white' : 'text.secondary',
                  '&:hover': {
                    bgcolor: activePanel === 'export' ? 'secondary.dark' : 'action.hover',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ExportIcon />
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            {/* Toggle de Tema */}
            {onThemeToggle && (
              <Tooltip title={`Modo ${theme === 'light' ? 'escuro' : 'claro'}`}>
                <IconButton
                  onClick={onThemeToggle}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </Tooltip>
            )}

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            {/* Indicadores de Status */}
            {activeFiltersCount > 0 && (
              <Chip
                label={`${activeFiltersCount} filtro${activeFiltersCount > 1 ? 's' : ''} ativo${activeFiltersCount > 1 ? 's' : ''}`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontSize: '0.75rem', height: 24 }}
              />
            )}

            <Chip
              label={`${dashboardElementIds.length} gráficos`}
              size="small"
              color="default"
              variant="outlined"
              sx={{ fontSize: '0.75rem', height: 24 }}
            />
          </Stack>

          {/* Toggle de Modo de Visualização */}
          {onViewModeChange && (
            <ViewModeToggle
              value={viewMode}
              onChange={onViewModeChange}
            />
          )}

          {/* Lado Direito - Controles */}
          <Stack direction="row" spacing={1} alignItems="center">
            {activePanel !== 'none' && (
              <Tooltip title="Fechar Painel">
                <IconButton
                  size="small"
                  onClick={handleClose}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            <IconButton
              size="small"
              onClick={() => setExpanded(!expanded)}
              sx={{
                color: 'text.secondary',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>

      {/* Painéis Expansíveis Inline */}
      <Collapse in={expanded && activePanel !== 'none'} timeout={300}>
        <Box sx={{ mt: 2 }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              maxHeight: '60vh',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#a8a8a8',
              },
            }}
          >
            {activePanel === 'filters' && (
              <FilterPanel
                onFiltersChange={onFiltersChange}
                initialFilters={filters}
              />
            )}

            {activePanel === 'export' && (
              <ExportPanel
                dashboardElementIds={dashboardElementIds}
                allChartData={allChartData}
                onExport={onExport}
              />
            )}
          </Paper>
        </Box>
      </Collapse>
    </Box>
  );
};

export default memo(Toolbar);
