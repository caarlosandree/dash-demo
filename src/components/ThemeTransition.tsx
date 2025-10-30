import React, { useState, useEffect, useRef } from 'react';
import { Box, keyframes, styled } from '@mui/material';
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';

// Keyframes para animações incríveis
const morphIcon = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: scale(1.3) rotate(90deg);
    opacity: 0.7;
  }
  50% {
    transform: scale(0.8) rotate(180deg);
    opacity: 0.3;
  }
  75% {
    transform: scale(1.2) rotate(270deg);
    opacity: 0.7;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
`;

const rippleEffect = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const particleFloat = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-40px) rotate(360deg);
    opacity: 0;
  }
`;

const waveExpand = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.4;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.8), 0 0 60px rgba(236, 72, 153, 0.4);
  }
`;

// Componentes estilizados
const TransitionOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  pointerEvents: 'none',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const RippleCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  border: `2px solid ${theme.palette.primary.main}`,
  animation: `${rippleEffect} 1.5s ease-out forwards`,
}));

const Particle = styled(Box)(({ theme, delay = 0 }) => ({
  position: 'absolute',
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  animation: `${particleFloat} 2s ease-out ${delay}s forwards`,
}));

const WaveRing = styled(Box)(({ theme, delay = 0 }) => ({
  position: 'absolute',
  borderRadius: '50%',
  border: `1px solid ${theme.palette.primary.main}`,
  animation: `${waveExpand} 2s ease-out ${delay}s forwards`,
}));

const GlowButton = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  animation: `${glowPulse} 2s ease-in-out infinite`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const MorphingIcon = styled(Box)(({ theme }) => ({
  animation: `${morphIcon} 1.5s ease-in-out forwards`,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface ThemeTransitionProps {
  isTransitioning: boolean;
  onTransitionComplete: () => void;
  theme: 'light' | 'dark';
  children: React.ReactNode;
}

const ThemeTransition: React.FC<ThemeTransitionProps> = ({
  isTransitioning,
  onTransitionComplete,
  theme,
  children,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTransitioning) {
      setShowOverlay(true);
      
      // Gerar partículas aleatórias
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);

      // Completar transição após animação
      const timer = setTimeout(() => {
        setShowOverlay(false);
        setParticles([]);
        onTransitionComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, onTransitionComplete]);

  if (!showOverlay) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <TransitionOverlay ref={overlayRef}>
        {/* Ondas de expansão */}
        {Array.from({ length: 3 }, (_, i) => (
          <WaveRing
            key={`wave-${i}`}
            delay={i * 0.3}
            sx={{
              top: '50%',
              left: '50%',
              width: '100px',
              height: '100px',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Efeito ripple central */}
        <RippleCircle
          sx={{
            top: '50%',
            left: '50%',
            width: '200px',
            height: '200px',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Partículas flutuantes */}
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            delay={particle.delay}
            sx={{
              left: particle.x,
              top: particle.y,
            }}
          />
        ))}

        {/* Ícone central com morphing */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <GlowButton>
            <MorphingIcon>
              {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </MorphingIcon>
          </GlowButton>
        </Box>

        {/* Gradiente de fundo animado */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, 
              ${theme === 'light' ? '#667eea' : '#1a1a2e'} 0%, 
              ${theme === 'light' ? '#764ba2' : '#16213e'} 25%, 
              ${theme === 'light' ? '#f093fb' : '#0f3460'} 50%, 
              ${theme === 'light' ? '#4facfe' : '#533483'} 75%, 
              ${theme === 'light' ? '#00f2fe' : '#7209b7'} 100%)`,
            backgroundSize: '400% 400%',
            animation: 'gradient 3s ease infinite',
            opacity: 0.1,
          }}
        />
      </TransitionOverlay>
    </>
  );
};

export default ThemeTransition;
