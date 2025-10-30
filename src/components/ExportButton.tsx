import { useState, useCallback, memo } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  Image as PngIcon,
  TableChart as CsvIcon,
  Assessment as ReportIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useExport } from '../hooks/useExport';

interface ExportButtonProps {
  chartId?: string;
  chartTitle?: string;
  chartData?: any[];
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar' | 'gauge' | 'sparkline';
  dashboardElementIds?: string[];
  allChartData?: Array<{
    id: string;
    title: string;
    data: any[];
    type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar' | 'gauge' | 'sparkline';
  }>;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  chartId,
  chartTitle = 'Gráfico',
  chartData = [],
  chartType = 'line',
  dashboardElementIds = [],
  allChartData = [],
  variant = 'outlined',
  size = 'medium',
  showLabel = true,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [exportType, setExportType] = useState<string>('');

  const {
    isExporting,
    exportProgress,
    exportChartAsPNG,
    exportDashboardAsPDF,
    exportDataAsCSV,
    exportFullReport,
  } = useExport();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = useCallback(async (
    type: 'png' | 'pdf' | 'csv' | 'report',
    filename?: string
  ) => {
    try {
      setShowProgress(true);
      setExportType(type);
      setExportStatus('idle');

      const timestamp = new Date().toISOString().split('T')[0];
      const defaultFilename = `${chartTitle.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`;

      switch (type) {
        case 'png':
          if (chartId) {
            await exportChartAsPNG(chartId, `${filename || defaultFilename}.png`);
          }
          break;
        
        case 'pdf':
          if (dashboardElementIds.length > 0) {
            await exportDashboardAsPDF(dashboardElementIds, `${filename || defaultFilename}.pdf`);
          }
          break;
        
        case 'csv':
          if (allChartData.length > 0) {
            exportDataAsCSV(allChartData, `${filename || defaultFilename}.csv`);
          }
          break;
        
        case 'report':
          if (dashboardElementIds.length > 0 && allChartData.length > 0) {
            await exportFullReport(dashboardElementIds, allChartData, filename || defaultFilename);
          }
          break;
      }

      setExportStatus('success');
      setTimeout(() => {
        setShowProgress(false);
        setExportStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Erro na exportação:', error);
      setExportStatus('error');
      setTimeout(() => {
        setShowProgress(false);
        setExportStatus('idle');
      }, 3000);
    }

    handleClose();
  }, [
    chartId,
    chartTitle,
    dashboardElementIds,
    allChartData,
    exportChartAsPNG,
    exportDashboardAsPDF,
    exportDataAsCSV,
    exportFullReport,
  ]);

  const getExportIcon = (type: string) => {
    switch (type) {
      case 'png': return <PngIcon />;
      case 'pdf': return <PdfIcon />;
      case 'csv': return <CsvIcon />;
      case 'report': return <ReportIcon />;
      default: return <DownloadIcon />;
    }
  };

  const getExportLabel = (type: string) => {
    switch (type) {
      case 'png': return 'Exportar como PNG';
      case 'pdf': return 'Exportar Dashboard como PDF';
      case 'csv': return 'Exportar Dados como CSV';
      case 'report': return 'Relatório Completo (PDF + CSV)';
      default: return 'Exportar';
    }
  };

  const isDisabled = isExporting || (!chartId && !dashboardElementIds.length);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        startIcon={<DownloadIcon />}
        onClick={handleClick}
        disabled={isDisabled}
        sx={{
          minWidth: showLabel ? 'auto' : 40,
          px: showLabel ? 2 : 1,
        }}
      >
        {showLabel && 'Exportar'}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {chartId && (
          <MenuItem onClick={() => handleExport('png')}>
            <ListItemIcon>
              <PngIcon />
            </ListItemIcon>
            <ListItemText primary="Exportar como PNG" />
          </MenuItem>
        )}

        {dashboardElementIds.length > 0 && (
          <MenuItem onClick={() => handleExport('pdf')}>
            <ListItemIcon>
              <PdfIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard como PDF" />
          </MenuItem>
        )}

        {allChartData.length > 0 && (
          <MenuItem onClick={() => handleExport('csv')}>
            <ListItemIcon>
              <CsvIcon />
            </ListItemIcon>
            <ListItemText primary="Dados como CSV" />
          </MenuItem>
        )}

        {dashboardElementIds.length > 0 && allChartData.length > 0 && (
          <MenuItem onClick={() => handleExport('report')}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Relatório Completo" />
          </MenuItem>
        )}
      </Menu>

      {/* Dialog de Progresso */}
      <Dialog
        open={showProgress}
        onClose={() => setShowProgress(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              Exportando {getExportLabel(exportType)}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setShowProgress(false)}
              disabled={isExporting}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={exportProgress} 
              sx={{ mb: 2 }}
            />
            
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Progresso: {Math.round(exportProgress)}%
              </Typography>
              
              {exportStatus === 'success' && (
                <Chip
                  icon={<CheckIcon />}
                  label="Exportado com sucesso!"
                  color="success"
                  size="small"
                />
              )}
              
              {exportStatus === 'error' && (
                <Chip
                  label="Erro na exportação"
                  color="error"
                  size="small"
                />
              )}
            </Stack>
          </Box>
        </DialogContent>
        
        {!isExporting && exportStatus === 'success' && (
          <DialogActions>
            <Button onClick={() => setShowProgress(false)}>
              Fechar
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default memo(ExportButton);
