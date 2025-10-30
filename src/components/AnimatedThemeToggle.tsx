import React, { useRef } from 'react';
import { 
  IconButton, 
  Tooltip, 
  styled,
  useTheme 
} from '@mui/material';
import { 
  LightMode as LightModeIcon, 
  DarkMode as DarkModeIcon,
  AutoMode as AutoModeIcon 
} from '@mui/icons-material';
import useThemeSounds from '../hooks/useThemeSounds';

// Componentes estilizados
const AnimatedButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: 'white',
  transition: 'all 0.2s ease',
  flexShrink: 0,
  zIndex: 1,
  
  '&:hover': {
    transform: 'scale(1.05)',
  },
  
  '&:active': {
    transform: 'scale(0.95)',
  },
}));


interface AnimatedThemeToggleProps {
  theme: 'light' | 'dark' | 'auto';
  onThemeChange: (theme: 'light' | 'dark' | 'auto') => void;
}

const AnimatedThemeToggle: React.FC<AnimatedThemeToggleProps> = ({
  theme,
  onThemeChange,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const muiTheme = useTheme();
  
  // Efeitos sonoros
  const { playThemeTransitionSound, playButtonClickSound, playHoverSound } = useThemeSounds({
    volume: 0.2,
    enabled: true,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Tocar som de clique
    playButtonClickSound();

    // Tocar som de transição
    playThemeTransitionSound();

    // Ciclar entre os temas
    const themeCycle: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto'];
    const currentIndex = themeCycle.indexOf(theme);
    const nextTheme = themeCycle[(currentIndex + 1) % themeCycle.length];
    
    // Mudar tema imediatamente
    onThemeChange(nextTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <LightModeIcon />;
      case 'dark':
        return <DarkModeIcon />;
      case 'auto':
        return <AutoModeIcon />;
      default:
        return <LightModeIcon />;
    }
  };

  const getTooltipText = () => {
    switch (theme) {
      case 'light':
        return 'Tema Claro - Clique para alternar';
      case 'dark':
        return 'Tema Escuro - Clique para alternar';
      case 'auto':
        return 'Tema Automático - Clique para alternar';
      default:
        return 'Alternar Tema';
    }
  };

  const handleMouseEnter = () => {
    playHoverSound();
  };

  const handleMouseDown = () => {
    // Feedback tátil - vibrar se suportado
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <Tooltip title={getTooltipText()} arrow placement="bottom">
      <AnimatedButton
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
      >
        {getIcon()}
      </AnimatedButton>
    </Tooltip>
  );
};

export default AnimatedThemeToggle;
