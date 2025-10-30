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
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';

interface Agendamento {
  id: number;
  data: string;
  dataTimestamp: number;
  paciente: string;
  status: 'Presença' | 'Falta' | 'Reagendado';
  profissional: string;
  procedimento: string;
}

interface ProfissionalModalProps {
  open: boolean;
  onClose: () => void;
  profissional: string;
  agendamentos: Agendamento[];
  status: 'Presença' | 'Falta';
}

const ProfissionalModal: React.FC<ProfissionalModalProps> = ({
  open,
  onClose,
  profissional,
  agendamentos,
  status,
}) => {
  const isPresenca = status === 'Presença';
  
  // Estados para paginação e busca na tabela
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [buscaPaciente, setBuscaPaciente] = useState('');

  // Estatísticas gerais
  const totalAtendimentos = agendamentos.length;
  
  // Distribuição por置杜o
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
        const [mesA, anoA] = a.mes.split('/');
        const [mesB, anoB] = b.mes.split('/');
        const indexA = meses.indexOf(mesA);
        const indexB = meses.indexOf(mesB);
        if (anoA !== anoB) return parseInt(anoB) - parseInt(anoA);
        return indexB - indexA;
      })
      .slice(0, 6);
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
      .slice(0, 6);
  }, [agendamentos]);

  // Dados para gráfico de pizza de procedimentos
  const dadosPieProcedimento = distribuicaoProcedimento.map((item, index) => ({
    id: index,
    value: item.quantidade,
    label: item.nome,
  }));

  // Pacientes únicos atendidos
  const pacientesUnicos = useMemo(() => {
    return new Set(agendamentos.map(a => a.paciente)).size;
  }, [agendamentos]);

  // Procedimentos únicos realizados
  const procedimentosUnicos = useMemo(() => {
    return new Set(agendamentos.map(a => a.procedimento)).size;
  }, [agendamentos]);

  // Taxa média de atendimentos por mês
  const taxaMediaMensal = useMemo(() => {
    if (distribuicaoMensal.length === 0) return 0;
    const total = distribuicaoMensal.reduce((sum, item) => sum + item.quantidade, 0);
    return (total / distribuicaoMensal.length).toFixed(1);
  }, [distribuicaoMensal]);

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
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
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
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          background: isPresenca
            ? 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)'
            : 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
          color: 'white',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <PersonIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h5" component="span" sx={{ fontWeight: 700, display: 'block' }}>
              {profissional}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Detalhes de Atendimentos - {status}
            </Typography>
          </Box>
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
                bgcolor: '#f8fafc',
                border: '1px solid rgba(0, 0, 0, 0.05)',
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
                {totalAtendimentos}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: '#f8fafc',
                border: '1px solid rgba(0, 0, 0, 0.05)',
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
                bgcolor: '#f8fafc',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                height: '100%',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Procedimentos Realizados
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                {procedimentosUnicos}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: '#f8fafc',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                height: '100%',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Média Mensal
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {taxaMediaMensal}
              </Typography>
            </Paper>
          </Grid>

          {/* Gráfico de Barras - Distribuição Mensal */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Atendimentos por Mês
              </Typography>
              {distribuicaoMensal.length > 0 ? (
                <Box sx={{ width: '100%', height: 300 }}>
                  <MuiBarChart
                    width={undefined}
                    height={300}
                    series={[
                      {
                        data: distribuicaoMensal.map((item) => item.quantidade),
                        label: 'Atendimentos',
                        id: 'distribuicao-mensal',
                      },
                    ]}
                    xAxis={[
                      {
                        data: distribuicaoMensal.map((item) => item.mes),
                        scaleType: 'band' as const,
                      },
                    ]}
                    colors={[isPresenca ? '#6366f1' : '#f59e0b']}
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

          {/* Gráfico de Pizza - Distribuição por Procedimento */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Top Procedimentos
              </Typography>
              {dadosPieProcedimento.length > 0 ? (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <MuiPieChart
                    series={[
                      {
                        data: dadosPieProcedimento,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 5,
                      },
                    ]}
                    colors={isPresenca 
                      ? ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'] 
                      : ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a']
                    }
                    width={300}
                    height={300}
                  />
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  Sem dados para exibir
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Tabela de Agendamentos */}
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Lista de Atendimentos
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
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
                      <SearchIcon sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: isPresenca ? '#6366f1' : '#f59e0b',
                    },
                  },
                }}
              />
              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  maxHeight: 400,
                }}
              >
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Data
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Paciente
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#f8fafc',
                          fontWeight: 700,
                          color: '#1e293b',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        Procedimento
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {agendamentosPaginados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                          <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Nenhum atendimento encontrado.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      agendamentosPaginados.map((agendamento) => (
                        <TableRow
                          key={agendamento.id}
                          sx={{
                            '&:hover': {
                              bgcolor: '#f8fafc',
                            },
                          }}
                        >
                          <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>
                            #{agendamento.id}
                          </TableCell>
                          <TableCell sx={{ color: '#1e293b' }}>{agendamento.data}</TableCell>
                          <TableCell sx={{ color: '#1e293b', fontWeight: 500 }}>
                            {agendamento.paciente}
                          </TableCell>
                          <TableCell sx={{ color: '#1e293b' }}>
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
                  borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                  mt: 0,
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    color: '#64748b',
                    fontWeight: 500,
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProfissionalModal;

