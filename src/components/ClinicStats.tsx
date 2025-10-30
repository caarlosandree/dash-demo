import { Box, Typography, Stack, Grid, Paper, Card, CardContent } from '@mui/material';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useMemo } from 'react';

const ClinicStats: React.FC = () => {
  // Dados mockados para demonstração
  const totalAgendamentos = 1247;
  const totalPresencas = 934;
  const totalFaltas = 245;
  const totalReagendamentos = 68;

  const faltasPorDiaSemana = [
    { dia: 'Seg', faltas: 32 },
    { dia: 'Ter', faltas: 28 },
    { dia: 'Qua', faltas: 35 },
    { dia: 'Qui', faltas: 41 },
    { dia: 'Sex', faltas: 52 },
    { dia: 'Sáb', faltas: 38 },
    { dia: 'Dom', faltas: 19 },
  ];

  const dadosBarChart = faltasPorDiaSemana.map(item => ({
    dia: item.dia,
    faltas: item.faltas,
  }));

  const dadosPieChart = [
    { id: 0, value: totalPresencas, label: 'Presenças' },
    { id: 1, value: totalFaltas, label: 'Faltas' },
  ];

  const taxaPresenca = useMemo(() => {
    return ((totalPresencas / totalAgendamentos) * 100).toFixed(1);
  }, [totalPresencas, totalAgendamentos]);

  const taxaFalta = useMemo(() => {
    return ((totalFaltas / totalAgendamentos) * 100).toFixed(1);
  }, [totalFaltas, totalAgendamentos]);

  const diaMaisFaltas = useMemo(() => {
    return faltasPorDiaSemana.reduce((max, item) => 
      item.faltas > max.faltas ? item : max
    );
  }, [faltasPorDiaSemana]);

  return (
    <Box>
      {/* Cards de Resumo */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Total de Agendamentos */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(99, 102, 241, 0.4)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                    Total de Agendamentos
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                    {totalAgendamentos.toLocaleString('pt-BR')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                  }}
                >
                  <CalendarTodayIcon sx={{ fontSize: 32 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Total de Presenças */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(16, 185, 129, 0.4)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                    Total de Presenças
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                    {totalPresencas.toLocaleString('pt-BR')}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                    <TrendingUpIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                      {taxaPresenca}%
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 32 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Total de Faltas */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(239, 68, 68, 0.4)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                    Total de Faltas
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                    {totalFaltas.toLocaleString('pt-BR')}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                    <CancelIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                      {taxaFalta}%
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                  }}
                >
                  <CancelIcon sx={{ fontSize: 32 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Total de Reagendamentos */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(245, 158, 11, 0.4)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                    Total de Reagendamentos
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                    {totalReagendamentos.toLocaleString('pt-BR')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                  }}
                >
                  <EventRepeatIcon sx={{ fontSize: 32 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={3}>
        {/* Faltas por Dia da Semana */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              bgcolor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#1e293b',
                  mb: 0.5,
                }}
              >
                Faltas por Dia da Semana
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  fontSize: '0.875rem',
                  mb: 3,
                }}
              >
                Distribuição de faltas ao longo da semana
              </Typography>
            </Box>

            <Box sx={{ 
              width: '100%', 
              height: 350,
              bgcolor: '#f8fafc',
              borderRadius: 2,
              p: 2,
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }}>
              <MuiBarChart
                width={undefined}
                height={350}
                series={[
                  { dataKey: 'faltas', label: 'Faltas' },
                ]}
                dataset={dadosBarChart}
                colors={['#ef4444']}
                xAxis={[{ dataKey: 'dia', scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 30 }}
              />
            </Box>

            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: '#ef444415',
                borderRadius: 2,
                border: '1px solid #ef444430',
              }}
            >
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                <strong>Dia com mais faltas:</strong> {diaMaisFaltas.dia} ({diaMaisFaltas.faltas} faltas)
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Gráfico de Pizza - Presenças vs Faltas */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              bgcolor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#1e293b',
                  mb: 0.5,
                }}
              >
                Distribuição de Presenças
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  fontSize: '0.875rem',
                  mb: 3,
                }}
              >
                Presenças vs Faltas
              </Typography>
            </Box>

            <Box sx={{ 
              width: '100%', 
              height: 300, 
              display: 'flex', 
              justifyContent: 'center',
              bgcolor: '#f8fafc',
              borderRadius: 2,
              p: 2,
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }}>
              <MuiPieChart
                series={[
                  {
                    data: dadosPieChart,
                    innerRadius: 40,
                    outerRadius: 100,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 270,
                  },
                ]}
                colors={['#10b981', '#ef4444']}
                width={300}
                height={300}
              />
            </Box>

            {/* Legenda */}
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: '#10b98115',
                  borderRadius: 1.5,
                  border: '1px solid #10b98130',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: '#10b981',
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                    Presenças
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#10b981' }}>
                  {totalPresencas.toLocaleString('pt-BR')}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: '#ef444415',
                  borderRadius: 1.5,
                  border: '1px solid #ef444430',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: '#ef4444',
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                    Faltas
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#ef4444' }}>
                  {totalFaltas.toLocaleString('pt-BR')}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClinicStats;

