import { useEffect, useRef, useState, memo } from 'react';
import { Box } from '@mui/material';

interface PreloadTriggerProps {
  onEnterViewport?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const PreloadTrigger: React.FC<PreloadTriggerProps> = ({
  onEnterViewport,
  onHover,
  onFocus,
  children,
  threshold = 0.1,
  rootMargin = '50px',
}) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !onEnterViewport) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setIsInViewport(true);
          setHasTriggered(true);
          onEnterViewport();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [onEnterViewport, threshold, rootMargin, hasTriggered]);

  const handleMouseEnter = () => {
    if (onHover && !hasTriggered) {
      onHover();
    }
  };

  const handleFocus = () => {
    if (onFocus && !hasTriggered) {
      onFocus();
    }
  };

  return (
    <Box
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      sx={{ width: '100%', height: '100%' }}
    >
      {children}
    </Box>
  );
};

export default memo(PreloadTrigger);
