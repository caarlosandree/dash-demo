import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            m: 2,
            textAlign: 'center',
            bgcolor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 2,
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                p: 2,
                borderRadius: '50%',
                bgcolor: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ErrorOutline sx={{ fontSize: 48 }} />
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#dc2626', mb: 1 }}>
                Ops! Algo deu errado
              </Typography>
              <Typography variant="body1" sx={{ color: '#6b7280', mb: 2 }}>
                Ocorreu um erro inesperado ao carregar este componente.
              </Typography>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: '#f3f4f6',
                    borderRadius: 1,
                    textAlign: 'left',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    color: '#374151',
                    maxHeight: 200,
                    overflow: 'auto',
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                    Erro:
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                    {this.state.error.message}
                  </Typography>
                  {this.state.errorInfo && (
                    <>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1, mt: 2 }}>
                        Stack Trace:
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', whiteSpace: 'pre-wrap' }}>
                        {this.state.errorInfo.componentStack}
                      </Typography>
                    </>
                  )}
                </Box>
              )}
            </Box>

            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={this.handleReset}
              sx={{
                bgcolor: '#dc2626',
                '&:hover': {
                  bgcolor: '#b91c1c',
                },
              }}
            >
              Tentar Novamente
            </Button>
          </Stack>
        </Paper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
