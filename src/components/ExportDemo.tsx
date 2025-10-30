import { useState, memo } from 'react';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  Image as PngIcon,
  TableChart as CsvIcon,
  Assessment as ReportIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const ExportDemo: React.FC = () => {
  const [exportedFiles, setExportedFiles] = useState<string[]>([]);

  const exportFeatures = [
    {
      type: 'PNG',
      title: 'Exportação PNG',
      description: 'Gráficos individuais em alta qualidade',
      icon: <PngIcon />,
      color: '#1976d2',
      features: [
        'Alta resolução (2x scale)',
        'Transparência preservada',
        'Ideal para apresentações',
        'Tamanho otimizado',
      ],
    },
    {
      type: 'PDF',
      title: 'Exportação PDF',
      description: 'Dashboard completo em PDF',
      icon: <PdfIcon />,
      color: '#d32f2f',
      features: [
        'Múltiplos formatos (A4, A3, Letter)',
        'Orientação configurável',
        'Qualidade ajustável',
        'Páginas automáticas',
      ],
    },
    {
      type: 'CSV',
      title: 'Exportação CSV',
      description: 'Dados brutos para análise',
      icon: <CsvIcon />,
      color: '#388e3c',
      features: [
        'Dados estruturados',
        'Compatível com Excel',
        'Análise posterior',
        'Formato universal',
      ],
    },
    {
      type: 'Relatório',
      title: 'Relatório Completo',
      description: 'PDF + CSV em pacote único',
      icon: <ReportIcon />,
      color: '#7b1fa2',
      features: [
        'Visualização + Dados',
        'Relatório executivo',
        'Análise completa',
        'Profissional',
      ],
    },
  ];

  const handleSimulateExport = (type: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const filename = `demo-${type.toLowerCase()}-${timestamp}`;
    setExportedFiles(prev => [...prev, filename]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
        🚀 Funcionalidades de Exportação
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body2">
          <strong>Demonstração:</strong> Clique nos botões abaixo para simular as exportações. 
          Em produção, os arquivos seriam baixados automaticamente.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {exportFeatures.map((feature) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.type}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: `${feature.color}15`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Stack>

                <List dense>
                  {feature.features.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckIcon sx={{ fontSize: 16, color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item} 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSimulateExport(feature.type)}
                  sx={{
                    bgcolor: feature.color,
                    '&:hover': {
                      bgcolor: feature.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  Simular Exportação
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {exportedFiles.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            📁 Arquivos Exportados (Simulação)
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {exportedFiles.map((file, index) => (
              <Chip
                key={index}
                label={file}
                color="success"
                icon={<CheckIcon />}
                onDelete={() => {
                  setExportedFiles(prev => prev.filter((_, i) => i !== index));
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Como Usar
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText 
              primary="1. Use o painel de exportação no topo do dashboard para exportar tudo"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="2. Use os botões individuais em cada gráfico para exportar específicos"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="3. Configure formato, qualidade e orientação antes de exportar"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="4. Os arquivos são baixados automaticamente no seu dispositivo"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default memo(ExportDemo);
