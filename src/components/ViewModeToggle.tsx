import { memo, useCallback } from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Box,
} from '@mui/material';
import {
  ViewModule as GridIcon,
  ViewList as ListIcon,
  ViewComfy as CompactIcon,
} from '@mui/icons-material';

type ViewMode = 'grid' | 'list' | 'compact';

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  disabled?: boolean;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const handleChange = useCallback((
    _event: React.MouseEvent<HTMLElement>,
    newMode: ViewMode | null,
  ) => {
    if (newMode !== null) {
      onChange(newMode);
    }
  }, [onChange]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        size="small"
        disabled={disabled}
        sx={{
          '& .MuiToggleButton-root': {
            border: '1px solid rgba(0, 0, 0, 0.12)',
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
            '&:hover': {
              bgcolor: 'action.hover',
            },
          },
        }}
      >
        <ToggleButton value="grid" aria-label="Visualização em Grade">
          <Tooltip title="Visualização em Grade">
            <GridIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="list" aria-label="Visualização em Lista">
          <Tooltip title="Visualização em Lista">
            <ListIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="compact" aria-label="Visualização Compacta">
          <Tooltip title="Visualização Compacta">
            <CompactIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default memo(ViewModeToggle);
