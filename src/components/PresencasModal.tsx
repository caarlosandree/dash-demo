import React, { useMemo, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  TablePagination,
  TextField,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import ProfissionalModal from './ProfissionalModal';
import { useThemeMode } from '../hooks/useThemeMode';

interface Agendamento {
  id: number;
  data: string;
  dataTimestamp: number;
  paciente: string;
  status: 'Presença' | 'Falta' | 'Reagendado';
  profissional: string;
  procedimento: string;
}

interface PresencasModalProps {
  open: boolean;
  onClose: () => void;
  status: 'Presença' | 'Falta';
  agendamentos: Agendamento[];
  totalAgendamentos: number;
}

const PresencasModal: React.FC<PresencasModalProps> = ({
  open,
  onClose,
  status,
  agendamentos,
  totalAgendamentos,
}) => {
  const { colors } = useThemeMode();
  const isPresenca = status === 'Presença';
  
  // Estados para paginação e busca na tabela
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [buscaPaciente, setBuscaPaciente] = useState('');
  
  // Estados para o modal de profissional
  const [openProfissionalModal, setOpenProfissionalModal] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<string>('');

  // Estatísticas gerais
  const totalStatus = agendamentos.length;
  const percentual = useMemo(() => {
    return ((totalStatus / totalAgendamentos) * 100).toFixed(1);
  }, [totalStatus, totalAgendamentos]);

  // Estatísticas adicionais
  const pacientesUnicos = useMemo(() => {
    return new Set(agendamentos.map(a => a.paciente)).size;
  }, [agendamentos]);

  const profissionaisUnicos = useMemo(() => {
    return new Set(agendamentos.map(a => a.profissional)).size;
  }, [agendamentos]);

  // Distribuição por Profissional
  const distribuicaoProfissional = useMemo(() => {
    const map = new Map<string, number>();
    agendamentos.forEach((ag) => {
      const count = map.get(ag.profissional) || 0;
      map.set(ag.profissional, count + 1);
    });
    return Array.from(map.entries())
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 8); // Top 8
  }, [agendamentos]);

  // Distribuição por Procedimento
  const distribuicaoProcedimento = useMemo(() => {
    const map = new Map<string, number>();
    agendamentos.forEach((ag) => {
      const count = map.get(ag.procedimento) || 0;
      map.set(ag.procedimento, count + 1);
    });
    return Array.from(map.entries())
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 6); // Top 6
  }, [agendamentos]);

  // Distribuição por Mês
  const distribuicaoMensal = useMemo(() => {
    const map = new Map<string, number>();
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ];

    agendamentos.forEach((ag) => {
      const data = new Date(ag.dataTimestamp);
      const mesAno = `${meses[data.getMonth()]}/${data.getFullYear()}`;
      const count = map.get(mesAno) || 0;
      map.set(mesAno, count + 1);
    });

    return Array.from(map.entries())
      .map(([mes, quantidade]) => ({ mes, quantidade }))
      .sort((a, b) => {
        // Ordenar por data (mais recente primeiro)
        const [mesA, anoA] = a.mes.split('/');
        const [mesB, anoB] = b.mes.split('/');
        const indexA = meses.indexOf(mesA);
        const indexB = meses.indexOf(mesB);
        if (anoA !== anoB) return parseInt(anoB) - parseInt(anoA);
        return indexB - indexA;
      })
      .slice(0, 6); // Últimos 6 meses
  }, [agendamentos]);

  // Dados para gráfico de pizza de profissionais
  const dadosPieProfissional = distribuicaoProfissional.map((item, index) => ({
    id: index,
    value: item.quantidade,
    label: item.nome.replace('Dr. ', '').replace('Dra. ', ''),
    nomeCompleto: item.nome, // Manter nome completo para busca
  }));
  
  // Handler para clique no gráfico de profissionais
  const handleProfissionalClick = (_event: any, itemIdentifier: any) => {
    const itemIndex = itemIdentifier?.dataIndex ?? itemIdentifier?.itemIndex ?? itemIdentifier?.index;
    const clickedItem = dadosPieProfissional.find((item) => item.id === itemIndex);
    if (clickedItem) {
      setProfissionalSelecionado(clickedItem.nomeCompleto);
      setOpenProfissionalModal(true);
    }
  };
  
  // Filtrar agendamentos do profissional selecionado
  const agendamentosProfissional = useMemo(() => {
    if (!profissionalSelecionado) return [];
    return agendamentos.filter(ag => ag.profissional === profissionalSelecionado);
  }, [agendamentos, profissionalSelecionado]);

  // Filtrar e paginar agendamentos da tabela
  const agendamentosFiltrados = useMemo(() => {
    return agendamentos.filter((ag) =>
      ag.paciente.toLowerCase().includes(buscaPaciente.toLowerCase())
    );
  }, [agendamentos, buscaPaciente]);

  const agendamentosPaginados = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return agendamentosFiltrados.slice(startIndex, startIndex + rowsPerPage);
  }, [agendamentosFiltrados, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Resetar busca e paginação quando modal abrir/fechar
  React.useEffect(() => {
    if (open) {
      setBuscaPaciente('');
      setPage(0);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: `0 20px 60px ${colors.cardBorder}`,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
          borderBottom: `1px solid ${colors.cardBorder}`,
          background: isPresenca
            ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
            : 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
          color: 'white',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {isPresenca ? (
            <CheckCircleIcon sx={{ fontSize: 32 }} />
          ) : (
            <CancelIcon sx={{ fontSize: 32 }} />
          )}
          <Typography variant="h5" component="span" sx={{ fontWeight: 700 }}>
            Detalhes - {status}
          </Typography>
        </Stack>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 4, pb: 4, maxHeight: 'calc(90vh - 100px)', overflowY: 'auto' }}>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Cards de Resumo */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: colors.highlight,
                border: `1px solid ${colors.cardBorder}`,
                height: '100%',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total de {status}
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: isPresenca ? '#10b981' : '#ef4444' }}
              >
                {totalStatus.toLocaleString('pt-BR')}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: colors.highlight,
                border: `1px solid ${colors.cardBorder}`,
                height: '100%',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Percentual
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {percentual}%
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: colors.highlight,
                border: `1px solid ${colors.cardBorder}`,
                height: '100%',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Pacientes Únicos
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                {pacientesUnicos}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: colors.highlight,
                border: `1px solid ${colors.cardBorder}`,
                height: '100%',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Profissionais Envolvidos
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                {profissionaisUnicos}
              </Typography>
            </Paper>
          </Grid>

          {/* Gráfico de Barras - Distribuição Mensal */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: colors.chartBg,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                {status} por Mês
              </Typography>
              {distribuicaoMensal.length > 0 ? (
                <Box sx={{ width: '100%', height: 300 }}>
                  <MuiBarChart
                    width={undefined}
                    height={300}
                    series={[
                      {
                        data: distribuicaoMensal.map((item) => item.quantidade),
                        label: status,
                        id: 'distribuicao-mensal',
                      },
                    ]}
                    xAxis={[
                      {
                        data: distribuicaoMensal.map((item) => item.mes),
                        scaleType: 'band' as const,
                      },
                    ]}
                    colors={[isPresenca ? '#10b981' : '#ef4444']}
                    margin={{ top: 10, bottom: 60, left: 40, right: 10 }}
                  />
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  Sem dados para exibir
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Gráfico de Pizza - Distribuição por Profissional */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: colors.chartBg,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 1, fontWeight: 600 }}>
                Top Profissionais
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: colors.textSecondary,
                  fontSize: '0.75rem',
                  mb: 2,
                  display: 'block',
                }}
              >
                Clique em uma fatia para ver detalhes
              </Typography>
              {dadosPieProfissional.length > 0 ? (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Box
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        opacity: 0.9,
                      },
                    }}
                  >
                    <MuiPieChart
                      onItemClick={handleProfissionalClick}
                      series={[
                        {
                          data: dadosPieProfissional,
                          innerRadius: 30,
                          outerRadius: 100,
                          paddingAngle: 2,
                          cornerRadius: 5,
                          highlightScope: { fade: 'global', highlight: 'item' },
                        },
                      ]}
                      colors={isPresenca ? ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'] : ['#ef4444', '#f87171', '#fca5a5', '#fecaca']}
                      width={300}
                      height={300}
                    />
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  Sem dados para exibir
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Distribuição por Procedimento */}
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: colors.chartBg,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Distribuição por Procedimento
              </Typography>
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Grid container spacing={2}>
                  {distribuicaoProcedimento.map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: colors.highlight,
                          borderRadius: 2,
                          border: `1px solid ${isPresenca ? '#10b98130' : '#ef444430'}`,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.nome}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: isPresenca ? '#10b981' : '#ef4444',
                          }}
                        >
                          {item.quantidade}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Tabela de Agendamentos */}
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: colors.chartBg,
                border: `1px solid ${colors.cardBorder}`,
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Lista de Agendamentos - {status}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                  {agendamentosFiltrados.length} resultado(s)
                </Typography>
              </Stack>
              
              {/* Busca */}
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar por nome do paciente..."
                value={buscaPaciente}
                onChange={(e) => {
                  setBuscaPaciente(e.target.value);
                  setPage(0);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: colors.textSecondary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: isPresenca ? '#10b981' : '#ef4444',
                    },
                  },
                }}
              />
              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${colors.cardBorder}`,
                  maxHeight: 400,
                }}
              >
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          bgcolor: colors.highlight,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: `2px solid ${colors.cardBorder}`,
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.highlight,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: `2px solid ${colors.cardBorder}`,
                        }}
                      >
                        Data
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.highlight,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: `2px solid ${colors.cardBorder}`,
                        }}
                      >
                        Paciente
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.highlight,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: `2px solid ${colors.cardBorder}`,
                        }}
                      >
                        Profissional
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: colors.highlight,
                          fontWeight: 700,
                          color: colors.textPrimary,
                          borderBottom: `2px solid ${colors.cardBorder}`,
                        }}
                      >
                        Procedimento
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {agendamentosPaginados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                          <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                            Nenhum agendamento encontrado.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      agendamentosPaginados.map((agendamento) => (
                        <TableRow
                          key={agendamento.id}
                          sx={{
                            '&:hover': {
                              bgcolor: colors.highlight,
                            },
                          }}
                        >
                          <TableCell sx={{ color: colors.textSecondary, fontWeight: 600 }}>
                            #{agendamento.id}
                          </TableCell>
                          <TableCell sx={{ color: colors.textPrimary }}>{agendamento.data}</TableCell>
                          <TableCell sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                            {agendamento.paciente}
                          </TableCell>
                          <TableCell sx={{ color: colors.textSecondary }}>
                            {agendamento.profissional}
                          </TableCell>
                          <TableCell sx={{ color: colors.textPrimary }}>
                            {agendamento.procedimento}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Paginação */}
              <TablePagination
                component="div"
                count={agendamentosFiltrados.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                labelRowsPerPage="Itens por página:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
                sx={{
                  borderTop: `1px solid ${colors.cardBorder}`,
                  mt: 0,
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    color: colors.textSecondary,
                    fontWeight: 500,
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      {/* Modal de Detalhes do Profissional */}
      <ProfissionalModal
        open={openProfissionalModal}
        onClose={() => {
          setOpenProfissionalModal(false);
          setProfissionalSelecionado('');
        }}
        profissional={profissionalSelecionado}
        agendamentos={agendamentosProfissional}
        status={status}
      />
    </Dialog>
  );
};

export default PresencasModal;

