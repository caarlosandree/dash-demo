import { Box, Typography, Stack, Grid, Paper, Card, CardContent } from '@mui/material';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useMemo, useState } from 'react';
import AgendamentosTable from './AgendamentosTable';
import PresencasModal from './PresencasModal';

interface Agendamento {
  id: number;
  data: string;
  dataTimestamp: number;
  paciente: string;
  status: 'Presença' | 'Falta' | 'Reagendado';
  profissional: string;
  procedimento: string;
}

const ClinicStats: React.FC = () => {
  // Estados para o modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'Presença' | 'Falta'>('Presença');

  // Função para gerar dados mockados de agendamentos
  const generateMockAgendamentos = (): Agendamento[] => {
    const pacientes = [
      'Maria Silva', 'Pedro Oliveira', 'Ana Paula', 'Roberto Fernandes', 'Fernanda Souza',
      'Lucas Rodrigues', 'Juliana Martins', 'Marcos Antonio', 'Carla Mendes', 'Thiago Silva',
      'Patricia Costa', 'Ricardo Alves', 'Beatriz Santos', 'Gabriel Lima', 'Isabela Ferreira',
      'Rodrigo Pereira', 'Amanda Rocha', 'Felipe Souza', 'Mariana Oliveira', 'Bruno Carvalho',
      'Larissa Gomes', 'Vinicius Reis', 'Camila Ribeiro', 'Gustavo Dias', 'Laura Martins',
      'Fernando Nunes', 'Priscila Barros', 'Eduardo Monteiro', 'Renata Freitas', 'Andre Coelho',
      'Daniela Ramos', 'Diego Araujo', 'Sabrina Moura', 'Leandro Teixeira', 'Tatiana Cunha',
      'Henrique Lopes', 'Vanessa Cardoso', 'Rafael Torres', 'Juliana Duarte', 'Marcelo Pinto',
      'Thais Correia', 'Igor Barbosa', 'Raquel Farias', 'Paulo Mendonça', 'Aline Nascimento',
      'Giovanni Castro', 'Bruna Cavalcanti', 'Leonardo Pires', 'Monique Azevedo', 'Samuel Correia',
    ];

    const profissionais = [
      'Dr. João Santos', 'Dra. Ana Costa', 'Dr. Carlos Mendes', 'Dra. Juliana Lima',
      'Dr. Rafael Alves', 'Dra. Patricia Santos', 'Dr. Marcos Silva', 'Dra. Fernanda Souza',
      'Dr. Lucas Oliveira', 'Dra. Beatriz Costa', 'Dr. Gustavo Lima', 'Dra. Camila Rodrigues',
    ];

    const procedimentos = [
      'Consulta Cardiológica', 'Consulta Dermatológica', 'Exame de Sangue', 'Consulta Clínica Geral',
      'Consulta Ortopédica', 'Consulta Psicológica', 'Consulta Oftalmológica', 'Consulta Neurológica',
      'Consulta Pediátrica', 'Consulta Ginecológica', 'Consulta Urologia', 'Consulta Endocrinologia',
      'Consulta Gastroenterologia', 'Consulta Pneumologia', 'Consulta Reumatologia', 'Raio-X',
      'Ultrassonografia', 'Ecocardiograma', 'Eletrocardiograma', 'Teste Ergométrico',
    ];

    const agendamentos: Agendamento[] = [];
    const hoje = new Date();
    
    // Gerar 200 agendamentos distribuídos nos últimos 3 meses
    // Distribuição: ~75% presenças, ~20% faltas, ~5% reagendados
    for (let i = 1; i <= 200; i++) {
      const diasAtras = Math.floor(Math.random() * 90);
      const data = new Date(hoje);
      data.setDate(data.getDate() - diasAtras);
      
      const hora = Math.floor(Math.random() * 8) + 8;
      const minuto = Math.random() > 0.5 ? 0 : 30;
      data.setHours(hora, minuto, 0, 0);

      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const horaFormatada = String(data.getHours()).padStart(2, '0');
      const minutoFormatado = String(data.getMinutes()).padStart(2, '0');

      // Distribuição de status
      const rand = Math.random();
      let status: 'Presença' | 'Falta' | 'Reagendado';
      if (rand < 0.75) {
        status = 'Presença';
      } else if (rand < 0.95) {
        status = 'Falta';
      } else {
        status = 'Reagendado';
      }

      agendamentos.push({
        id: i,
        data: `${dia}/${mes}/${ano} ${horaFormatada}:${minutoFormatado}`,
        dataTimestamp: data.getTime(),
        paciente: pacientes[Math.floor(Math.random() * pacientes.length)],
        status,
        profissional: profissionais[Math.floor(Math.random() * profissionais.length)],
        procedimento: procedimentos[Math.floor(Math.random() * procedimentos.length)],
      });
    }

    return agendamentos.sort((a, b) => b.dataTimestamp - a.dataTimestamp);
  };

  const todosAgendamentos = useMemo(() => generateMockAgendamentos(), []);

  // Calcular totais baseados nos agendamentos gerados
  const totalAgendamentosCalculado = todosAgendamentos.length;
  const totalPresencasCalculado = todosAgendamentos.filter(a => a.status === 'Presença').length;
  const totalFaltasCalculado = todosAgendamentos.filter(a => a.status === 'Falta').length;
  const totalReagendamentosCalculado = todosAgendamentos.filter(a => a.status === 'Reagendado').length;

  // Dados mockados para demonstração (usar os calculados ou valores fixos)
  const totalAgendamentos = 1247;
  const totalPresencas = totalPresencasCalculado || 934;
  const totalFaltas = totalFaltasCalculado || 245;
  const totalReagendamentos = totalReagendamentosCalculado || 68;

  // Filtrar agendamentos por status para o modal
  const agendamentosPresenca = useMemo(() => {
    return todosAgendamentos.filter(a => a.status === 'Presença');
  }, [todosAgendamentos]);

  const agendamentosFalta = useMemo(() => {
    return todosAgendamentos.filter(a => a.status === 'Falta');
  }, [todosAgendamentos]);

  // Handlers para o modal
  const handleItemClick = (_event: any, itemIdentifier: any) => {
    const itemIndex = itemIdentifier?.dataIndex ?? itemIdentifier?.itemIndex ?? itemIdentifier?.index;
    const clickedItem = dadosPieChart.find((item) => item.id === itemIndex);
    if (clickedItem && (clickedItem.label === 'Presenças' || clickedItem.label === 'Faltas')) {
      setSelectedStatus(clickedItem.label as 'Presença' | 'Falta');
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#f1f5f9',
              },
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
                    onClick: handleItemClick,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  },
                ]}
                colors={['#10b981', '#ef4444']}
                width={300}
                height={300}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: '#64748b',
                fontSize: '0.75rem',
                mt: 1,
                display: 'block',
                textAlign: 'center',
              }}
            >
              Clique na fatia para ver detalhes
            </Typography>

            {/* Legenda */}
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <Box
                onClick={() => {
                  setSelectedStatus('Presença');
                  setOpenModal(true);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: '#10b98115',
                  borderRadius: 1.5,
                  border: '1px solid #10b98130',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#10b98125',
                    transform: 'translateX(4px)',
                  },
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
                onClick={() => {
                  setSelectedStatus('Falta');
                  setOpenModal(true);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: '#ef444415',
                  borderRadius: 1.5,
                  border: '1px solid #ef444430',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#ef444425',
                    transform: 'translateX(4px)',
                  },
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

      {/* Tabela de Agendamentos */}
      <Box sx={{ mt: 4 }}>
        <AgendamentosTable />
      </Box>

      {/* Modal de Detalhes */}
      <PresencasModal
        open={openModal}
        onClose={handleCloseModal}
        status={selectedStatus}
        agendamentos={selectedStatus === 'Presença' ? agendamentosPresenca : agendamentosFalta}
        totalAgendamentos={totalAgendamentos}
      />
    </Box>
  );
};

export default ClinicStats;

