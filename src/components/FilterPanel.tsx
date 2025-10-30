import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Button,
  IconButton,
  Collapse,
  Divider,
  Grid,
  Slider,
  FormControlLabel,
  Switch,
  Autocomplete,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarTodayIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

export interface FilterState {
  period: {
    type: 'last7days' | 'last30days' | 'last90days' | 'lastYear' | 'custom';
    startDate?: Date;
    endDate?: Date;
  };
  categories: string[];
  dataTypes: string[];
  chartTypes: string[];
  valueRange: [number, number];
  showTrends: boolean;
  showProjections: boolean;
  aggregation: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

interface FilterPanelProps {
  onFiltersChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersChange, initialFilters }) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    period: {
      type: 'last30days',
    },
    categories: ['Vendas', 'Receita', 'Produtos'],
    dataTypes: ['Números', 'Percentuais'],
    chartTypes: ['Linha', 'Barras', 'Pizza', 'Área'],
    valueRange: [0, 1000000],
    showTrends: true,
    showProjections: false,
    aggregation: 'monthly',
    ...initialFilters,
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const periodOptions = [
    { value: 'last7days', label: 'Últimos 7 dias' },
    { value: 'last30days', label: 'Últimos 30 dias' },
    { value: 'last90days', label: 'Últimos 90 dias' },
    { value: 'lastYear', label: 'Último ano' },
    { value: 'custom', label: 'Período personalizado' },
  ];

  const categoryOptions = [
    'Vendas', 'Receita', 'Produtos', 'Clientes', 'Regiões', 
    'Categorias', 'Marca', 'Canal', 'Segmento', 'Tipo'
  ];

  const dataTypeOptions = [
    'Números', 'Percentuais', 'Valores Monetários', 'Quantidades', 
    'Taxas', 'Índices', 'Rankings'
  ];

  const chartTypeOptions = [
    'Linha', 'Barras', 'Pizza', 'Área', 'Dispersão', 
    'Radar', 'Gauge', 'Sparkline', 'Funnel'
  ];

  const aggregationOptions = [
    { value: 'daily', label: 'Diário' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'quarterly', label: 'Trimestral' },
  ];

  useEffect(() => {
    onFiltersChange(filters);
    
    // Contar filtros ativos
    let count = 0;
    if (filters.period.type !== 'last30days') count++;
    if (filters.categories.length !== 3) count++;
    if (filters.dataTypes.length !== 2) count++;
    if (filters.chartTypes.length !== 4) count++;
    if (filters.valueRange[0] !== 0 || filters.valueRange[1] !== 1000000) count++;
    if (!filters.showTrends) count++;
    if (filters.showProjections) count++;
    if (filters.aggregation !== 'monthly') count++;
    
    setActiveFiltersCount(count);
  }, [filters, onFiltersChange]);

  const handlePeriodChange = (type: FilterState['period']['type']) => {
    setFilters(prev => ({
      ...prev,
      period: { ...prev.period, type }
    }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate', date: Date | null) => {
    setFilters(prev => ({
      ...prev,
      period: { ...prev.period, [field]: date || undefined }
    }));
  };

  const handleCategoriesChange = (newCategories: string[]) => {
    setFilters(prev => ({ ...prev, categories: newCategories }));
  };

  const handleDataTypesChange = (newDataTypes: string[]) => {
    setFilters(prev => ({ ...prev, dataTypes: newDataTypes }));
  };

  const handleChartTypesChange = (newChartTypes: string[]) => {
    setFilters(prev => ({ ...prev, chartTypes: newChartTypes }));
  };

  const handleValueRangeChange = (_event: Event, newValue: number | number[]) => {
    setFilters(prev => ({ 
      ...prev, 
      valueRange: newValue as [number, number] 
    }));
  };

  const handleSwitchChange = (field: keyof Pick<FilterState, 'showTrends' | 'showProjections'>) => {
    setFilters(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleAggregationChange = (aggregation: FilterState['aggregation']) => {
    setFilters(prev => ({ ...prev, aggregation }));
  };

  const clearAllFilters = () => {
    setFilters({
      period: { type: 'last30days' },
      categories: ['Vendas', 'Receita', 'Produtos'],
      dataTypes: ['Números', 'Percentuais'],
      chartTypes: ['Linha', 'Barras', 'Pizza', 'Área'],
      valueRange: [0, 1000000],
      showTrends: true,
      showProjections: false,
      aggregation: 'monthly',
    });
  };

  const resetToDefaults = () => {
    clearAllFilters();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          bgcolor: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            cursor: 'pointer',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FilterListIcon />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Filtros do Dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Personalize a visualização dos dados
              </Typography>
            </Box>
          </Stack>
          
          <Stack direction="row" alignItems="center" spacing={1}>
            {activeFiltersCount > 0 && (
              <Badge badgeContent={activeFiltersCount} color="primary">
                <Chip
                  label={`${activeFiltersCount} filtro${activeFiltersCount > 1 ? 's' : ''} ativo${activeFiltersCount > 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                    color: 'primary.main',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    fontWeight: 500,
                  }}
                />
              </Badge>
            )}
            <IconButton size="small">
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Stack>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Filtros */}
        <Collapse in={expanded}>
          <Grid container spacing={3}>
            {/* Período */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                  <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Período
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Selecione o período</InputLabel>
                  <Select
                    value={filters.period.type}
                    onChange={(e) => handlePeriodChange(e.target.value as FilterState['period']['type'])}
                    label="Selecione o período"
                  >
                    {periodOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                {filters.period.type === 'custom' && (
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <DatePicker
                      label="Data inicial"
                      value={filters.period.startDate}
                      onChange={(date) => handleDateChange('startDate', date)}
                      slotProps={{
                        textField: { size: 'small', fullWidth: true }
                      }}
                    />
                    <DatePicker
                      label="Data final"
                      value={filters.period.endDate}
                      onChange={(date) => handleDateChange('endDate', date)}
                      slotProps={{
                        textField: { size: 'small', fullWidth: true }
                      }}
                    />
                  </Stack>
                )}
              </Box>
            </Grid>

            {/* Categorias */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                  <CategoryIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Categorias
                </Typography>
                <Autocomplete
                  multiple
                  options={categoryOptions}
                  value={filters.categories}
                  onChange={(_, newValue) => handleCategoriesChange(newValue)}
                  size="small"
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Selecione as categorias"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Grid>

            {/* Tipos de Dados */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                  <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Tipos de Dados
                </Typography>
                <Autocomplete
                  multiple
                  options={dataTypeOptions}
                  value={filters.dataTypes}
                  onChange={(_, newValue) => handleDataTypesChange(newValue)}
                  size="small"
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Selecione os tipos"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Grid>

            {/* Tipos de Gráficos */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                  <SettingsIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                  Tipos de Gráficos
                </Typography>
                <Autocomplete
                  multiple
                  options={chartTypeOptions}
                  value={filters.chartTypes}
                  onChange={(_, newValue) => handleChartTypesChange(newValue)}
                  size="small"
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Selecione os gráficos"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Grid>

            {/* Faixa de Valores */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                  Faixa de Valores
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={filters.valueRange}
                    onChange={handleValueRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000000}
                    step={10000}
                    valueLabelFormat={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                    sx={{
                      color: '#6366f1',
                      '& .MuiSlider-thumb': {
                        '&:hover, &.Mui-focusVisible': {
                          boxShadow: '0 0 0 8px rgba(99, 102, 241, 0.16)',
                        },
                      },
                    }}
                  />
                  <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      R$ {filters.valueRange[0].toLocaleString('pt-BR')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      R$ {filters.valueRange[1].toLocaleString('pt-BR')}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>

            {/* Agregação */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                  Agregação de Dados
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Período de agregação</InputLabel>
                  <Select
                    value={filters.aggregation}
                    onChange={(e) => handleAggregationChange(e.target.value as FilterState['aggregation'])}
                    label="Período de agregação"
                  >
                    {aggregationOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            {/* Opções Avançadas */}
            <Grid size={{ xs: 12 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                  Opções Avançadas
                </Typography>
                <Stack direction="row" spacing={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={filters.showTrends}
                        onChange={() => handleSwitchChange('showTrends')}
                        color="primary"
                      />
                    }
                    label="Mostrar tendências"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={filters.showProjections}
                        onChange={() => handleSwitchChange('showProjections')}
                        color="primary"
                      />
                    }
                    label="Mostrar projeções"
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>

          {/* Ações */}
          <Divider sx={{ my: 3 }} />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={clearAllFilters}
              sx={{
                borderColor: '#d1d5db',
                color: '#6b7280',
                '&:hover': {
                  borderColor: '#9ca3af',
                  bgcolor: '#f9fafb',
                },
              }}
            >
              Limpar Filtros
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={resetToDefaults}
              sx={{
                borderColor: '#6366f1',
                color: '#6366f1',
                '&:hover': {
                  borderColor: '#4f46e5',
                  bgcolor: 'rgba(99, 102, 241, 0.04)',
                },
              }}
            >
              Restaurar Padrões
            </Button>
          </Stack>
        </Collapse>
      </Paper>
    </LocalizationProvider>
  );
};

export default FilterPanel;
