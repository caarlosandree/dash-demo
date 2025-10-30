import { useState, useCallback, memo } from 'react';
import {
  Paper,
  Typography,
  Box,
  Stack,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  Image as PngIcon,
  TableChart as CsvIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useExport } from '../hooks/useExport';

interface ExportPanelProps {
  dashboardElementIds: string[];
  allChartData: Array<{
    id: string;
    title: string;
    data: any[];
    type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar' | 'gauge' | 'sparkline';
  }>;
  onExport?: (type: string, filename: string) => void;
}

const ExportPanel: React.FC<ExportPanelProps> = ({
  dashboardElementIds,
  allChartData,
  onExport,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [exportSettings, setExportSettings] = useState({
    filename: 'dashboard-export',
    format: 'A4' as 'A4' | 'A3' | 'Letter',
    orientation: 'portrait' as 'portrait' | 'landscape',
    quality: 0.95,
    scale: 2,
    includeData: true,
    includeCharts: true,
  });

  const {
    isExporting,
    exportProgress,
    exportDashboardAsPDF,
    exportDataAsCSV,
    exportFullReport,
  } = useExport();

  const handleExport = useCallback(async (type: 'pdf' | 'csv' | 'report') => {
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${exportSettings.filename}-${timestamp}`;

      onExport?.(type, filename);

      switch (type) {
        case 'pdf':
          await exportDashboardAsPDF(dashboardElementIds, `${filename}.pdf`, {
            format: exportSettings.format,
            orientation: exportSettings.orientation,
            quality: exportSettings.quality,
            scale: exportSettings.scale,
          });
          break;
        
        case 'csv':
          exportDataAsCSV(allChartData, `${filename}.csv`);
          break;
        
        case 'report':
          await exportFullReport(dashboardElementIds, allChartData, filename);
          break;
      }
    } catch (error) {
      console.error('Erro na exportação:', error);
    }
  }, [
    exportSettings,
    dashboardElementIds,
    allChartData,
    onExport,
    exportDashboardAsPDF,
    exportDataAsCSV,
    exportFullReport,
  ]);

  const handleSettingChange = (key: string, value: any) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const exportOptions = [
    {
      type: 'pdf',
      title: 'Dashboard PDF',
      description: 'Exporta todos os gráficos como PDF',
      icon: <PdfIcon />,
      color: '#d32f2f',
      available: dashboardElementIds.length > 0,
    },
    {
      type: 'csv',
      title: 'Dados CSV',
      description: 'Exporta dados dos gráficos como CSV',
      icon: <CsvIcon />,
      color: '#1976d2',
      available: allChartData.length > 0,
    },
    {
      type: 'report',
      title: 'Relatório Completo',
      description: 'PDF + CSV em um pacote',
      icon: <ReportIcon />,
      color: '#388e3c',
      available: dashboardElementIds.length > 0 && allChartData.length > 0,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        bgcolor: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        borderRadius: 3,
      }}
    >
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
            <DownloadIcon />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
              Exportar Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              PDF, PNG, CSV e relatórios completos
            </Typography>
          </Box>
        </Stack>
        
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            label={`${dashboardElementIds.length} gráficos`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <IconButton size="small">
            <ExpandMoreIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </IconButton>
        </Stack>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ display: 'none' }} // Esconder o summary padrão
        >
          <Typography>Configurações</Typography>
        </AccordionSummary>
        
        <AccordionDetails sx={{ p: 0 }}>
          <Grid container spacing={3}>
            {/* Opções de Exportação */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Opções de Exportação
              </Typography>
              
              <Grid container spacing={2}>
                {exportOptions.map((option) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={option.type}>
                    <Card
                      sx={{
                        height: '100%',
                        border: '1px solid',
                        borderColor: option.available ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.05)',
                        opacity: option.available ? 1 : 0.6,
                        transition: 'all 0.3s ease',
                        '&:hover': option.available ? {
                          transform: 'translateY(-4px)',
                          boxShadow: 3,
                        } : {},
                      }}
                    >
                      <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 1,
                              bgcolor: `${option.color}15`,
                              color: option.color,
                            }}
                          >
                            {option.icon}
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {option.title}
                          </Typography>
                        </Stack>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {option.description}
                        </Typography>
                        
                        {!option.available && (
                          <Chip
                            label="Não disponível"
                            size="small"
                            color="default"
                            variant="outlined"
                          />
                        )}
                      </CardContent>
                      
                      <CardActions>
                        <Button
                          variant="contained"
                          fullWidth
                          disabled={!option.available || isExporting}
                          onClick={() => handleExport(option.type as any)}
                          sx={{
                            bgcolor: option.color,
                            '&:hover': {
                              bgcolor: option.color,
                              opacity: 0.9,
                            },
                          }}
                        >
                          {isExporting ? 'Exportando...' : 'Exportar'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Configurações */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Configurações
              </Typography>
              
              <Stack spacing={3}>
                <TextField
                  label="Nome do arquivo"
                  value={exportSettings.filename}
                  onChange={(e) => handleSettingChange('filename', e.target.value)}
                  size="small"
                  fullWidth
                />

                <FormControl size="small" fullWidth>
                  <InputLabel>Formato</InputLabel>
                  <Select
                    value={exportSettings.format}
                    onChange={(e) => handleSettingChange('format', e.target.value)}
                    label="Formato"
                  >
                    <MenuItem value="A4">A4</MenuItem>
                    <MenuItem value="A3">A3</MenuItem>
                    <MenuItem value="Letter">Letter</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" fullWidth>
                  <InputLabel>Orientação</InputLabel>
                  <Select
                    value={exportSettings.orientation}
                    onChange={(e) => handleSettingChange('orientation', e.target.value)}
                    label="Orientação"
                  >
                    <MenuItem value="portrait">Retrato</MenuItem>
                    <MenuItem value="landscape">Paisagem</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Qualidade (0.1 - 1.0)"
                  type="number"
                  value={exportSettings.quality}
                  onChange={(e) => handleSettingChange('quality', parseFloat(e.target.value))}
                  size="small"
                  fullWidth
                  inputProps={{ min: 0.1, max: 1.0, step: 0.05 }}
                />

                <TextField
                  label="Escala"
                  type="number"
                  value={exportSettings.scale}
                  onChange={(e) => handleSettingChange('scale', parseInt(e.target.value))}
                  size="small"
                  fullWidth
                  inputProps={{ min: 1, max: 5 }}
                />

                <Divider />

                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <InfoIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                    Informações
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    • PNG: Melhor para gráficos individuais<br/>
                    • PDF: Ideal para relatórios completos<br/>
                    • CSV: Dados brutos para análise<br/>
                    • Relatório: Combinação PDF + CSV
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default memo(ExportPanel);
