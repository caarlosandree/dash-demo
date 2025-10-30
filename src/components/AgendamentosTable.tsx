import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  MenuItem,
  Stack,
  TablePagination,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState, useMemo } from 'react';
import { useThemeMode } from '../hooks/useThemeMode';

interface Agendamento {
  id: number;
  data: string;
  dataTimestamp: number; // Para facilitar filtros de data
  paciente: string;
  status: 'Presença' | 'Falta' | 'Reagendado';
  profissional: string;
  procedimento: string;
}

const AgendamentosTable: React.FC = () => {
  const { colors } = useThemeMode();
  // Função para gerar dados mockados
  const generateMockData = (): Agendamento[] => {
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

    const statuses: ('Presença' | 'Falta' | 'Reagendado')[] = ['Presença', 'Falta', 'Reagendado'];

    const agendamentos: Agendamento[] = [];
    const hoje = new Date();
    
    // Gerar 150 agendamentos distribuídos nos últimos 3 meses
    for (let i = 1; i <= 150; i++) {
      const diasAtras = Math.floor(Math.random() * 90); // Últimos 90 dias
      const data = new Date(hoje);
      data.setDate(data.getDate() - diasAtras);
      
      const hora = Math.floor(Math.random() * 8) + 8; // 8h às 16h
      const minuto = Math.random() > 0.5 ? 0 : 30;
      data.setHours(hora, minuto, 0, 0);

      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const horaFormatada = String(data.getHours()).padStart(2, '0');
      const minutoFormatado = String(data.getMinutes()).padStart(2, '0');

      agendamentos.push({
        id: i,
        data: `${dia}/${mes}/${ano} ${horaFormatada}:${minutoFormatado}`,
        dataTimestamp: data.getTime(),
        paciente: pacientes[Math.floor(Math.random() * pacientes.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        profissional: profissionais[Math.floor(Math.random() * profissionais.length)],
        procedimento: procedimentos[Math.floor(Math.random() * procedimentos.length)],
      });
    }

    // Ordenar por data (mais recente primeiro)
    return agendamentos.sort((a, b) => b.dataTimestamp - a.dataTimestamp);
  };

  const todosAgendamentos = useMemo(() => generateMockData(), []);

  // Estados para filtros e paginação
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'Todos' | 'Presença' | 'Falta' | 'Reagendado'>('Todos');
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Aplicar filtros
  const agendamentosFiltrados = useMemo(() => {
    return todosAgendamentos.filter((agendamento) => {
      const matchNome = agendamento.paciente.toLowerCase().includes(filtroNome.toLowerCase());
      const matchStatus = filtroStatus === 'Todos' || agendamento.status === filtroStatus;
      
      let matchData = true;
      if (filtroDataInicio || filtroDataFim) {
        const agendamentoDate = new Date(agendamento.dataTimestamp);
        
        if (filtroDataInicio) {
          const dataInicio = new Date(filtroDataInicio);
          dataInicio.setHours(0, 0, 0, 0);
          if (agendamentoDate < dataInicio) matchData = false;
        }
        
        if (filtroDataFim) {
          const dataFim = new Date(filtroDataFim);
          dataFim.setHours(23, 59, 59, 999);
          if (agendamentoDate > dataFim) matchData = false;
        }
      }

      return matchNome && matchStatus && matchData;
    });
  }, [todosAgendamentos, filtroNome, filtroStatus, filtroDataInicio, filtroDataFim]);

  // Agendamentos paginados
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

  const limparFiltros = () => {
    setFiltroNome('');
    setFiltroStatus('Todos');
    setFiltroDataInicio('');
    setFiltroDataFim('');
    setPage(0);
  };

  const getStatusChip = (status: Agendamento['status']) => {
    switch (status) {
      case 'Presença':
        return (
          <Chip
            icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
            label={status}
            color="success"
            size="small"
            sx={{
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: 'inherit',
              },
            }}
          />
        );
      case 'Falta':
        return (
          <Chip
            icon={<CancelIcon sx={{ fontSize: 16 }} />}
            label={status}
            color="error"
            size="small"
            sx={{
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: 'inherit',
              },
            }}
          />
        );
      case 'Reagendado':
        return (
          <Chip
            icon={<EventRepeatIcon sx={{ fontSize: 16 }} />}
            label={status}
            color="warning"
            size="small"
            sx={{
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: 'inherit',
              },
            }}
          />
        );
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: colors.chartBg,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: `0 2px 8px ${colors.cardBorder}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px ${colors.cardBorder}`,
        },
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: colors.textPrimary,
            mb: 0.5,
          }}
        >
          Agendamentos
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: colors.textSecondary,
            fontSize: '0.875rem',
            mb: 3,
          }}
        >
          Lista completa de agendamentos com status e informações detalhadas ({agendamentosFiltrados.length} resultados)
        </Typography>
      </Box>

      {/* Filtros */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: colors.chartBg,
          borderRadius: 2,
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <FilterListIcon sx={{ color: colors.textSecondary }} />
          <Typography variant="subtitle2" sx={{ color: colors.textSecondary, fontWeight: 600 }}>
            Filtros
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar por nome do paciente..."
            value={filtroNome}
            onChange={(e) => {
              setFiltroNome(e.target.value);
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
              bgcolor: colors.highlight,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: colors.primary,
                },
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 200 }, bgcolor: colors.highlight }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filtroStatus}
              label="Status"
              onChange={(e) => {
                setFiltroStatus(e.target.value as typeof filtroStatus);
                setPage(0);
              }}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="Presença">Presença</MenuItem>
              <MenuItem value="Falta">Falta</MenuItem>
              <MenuItem value="Reagendado">Reagendado</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            label="Data Início"
            type="date"
            value={filtroDataInicio}
            onChange={(e) => {
              setFiltroDataInicio(e.target.value);
              setPage(0);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              bgcolor: colors.highlight,
              minWidth: { xs: '100%', sm: 180 },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: colors.primary,
                },
              },
            }}
          />
          <TextField
            size="small"
            label="Data Fim"
            type="date"
            value={filtroDataFim}
            onChange={(e) => {
              setFiltroDataFim(e.target.value);
              setPage(0);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              bgcolor: colors.highlight,
              minWidth: { xs: '100%', sm: 180 },
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: colors.primary,
                },
              },
            }}
          />
          {(filtroNome || filtroStatus !== 'Todos' || filtroDataInicio || filtroDataFim) && (
            <TextField
              size="small"
              value="Limpar Filtros"
              onClick={limparFiltros}
              onFocus={(e) => e.target.blur()}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                bgcolor: colors.secondary,
                color: 'white',
                minWidth: { xs: '100%', sm: 150 },
                cursor: 'pointer',
                '& .MuiInputBase-input': {
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 600,
                  cursor: 'pointer',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.secondary,
                },
                '&:hover': {
                  bgcolor: colors.secondary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.secondary,
                  },
                },
              }}
            />
          )}
        </Stack>
      </Box>

      <TableContainer
        sx={{
          borderRadius: 2,
          border: `1px solid ${colors.cardBorder}`,
          maxHeight: 600,
          '& .MuiTable-root': {
            minWidth: 650,
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  bgcolor: colors.chartBg,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  borderBottom: `2px solid ${colors.cardBorder}`,
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: colors.chartBg,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  borderBottom: `2px solid ${colors.cardBorder}`,
                }}
              >
                Data
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: colors.chartBg,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  borderBottom: `2px solid ${colors.cardBorder}`,
                }}
              >
                Paciente
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: colors.chartBg,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  borderBottom: `2px solid ${colors.cardBorder}`,
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: colors.chartBg,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  borderBottom: `2px solid ${colors.cardBorder}`,
                }}
              >
                Profissional
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: colors.chartBg,
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
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                    Nenhum agendamento encontrado com os filtros aplicados.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              agendamentosPaginados.map((agendamento) => (
                <TableRow
                  key={agendamento.id}
                  sx={{
                    '&:hover': {
                      bgcolor: colors.chartBg,
                    },
                    '&:last-child td': {
                      borderBottom: 0,
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
                  <TableCell>{getStatusChip(agendamento.status)}</TableCell>
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
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        labelRowsPerPage="Itens por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
        sx={{
          borderTop: `1px solid ${colors.cardBorder}`,
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            color: colors.textSecondary,
            fontWeight: 500,
          },
        }}
      />
    </Paper>
  );
};

export default AgendamentosTable;

