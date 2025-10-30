import { useCallback, useRef } from 'react';

interface SoundConfig {
  volume: number;
  enabled: boolean;
}

const useThemeSounds = (config: SoundConfig = { volume: 0.3, enabled: true }) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!config.enabled) return;

    const audioContext = initAudioContext();
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(config.volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [config.enabled, config.volume, initAudioContext]);

  const playThemeTransitionSound = useCallback(() => {
    if (!config.enabled) return;

    // Som de transição suave com múltiplas frequências
    const frequencies = [440, 554.37, 659.25, 783.99]; // A4, C#5, E5, G5
    const duration = 0.8;

    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, duration * 0.6, 'sine');
      }, index * 100);
    });
  }, [config.enabled, playTone]);

  const playButtonClickSound = useCallback(() => {
    if (!config.enabled) return;

    // Som de clique suave
    playTone(800, 0.1, 'square');
  }, [config.enabled, playTone]);

  const playSuccessSound = useCallback(() => {
    if (!config.enabled) return;

    // Som de sucesso - acorde maior
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, 0.3, 'sine');
      }, index * 50);
    });
  }, [config.enabled, playTone]);

  const playHoverSound = useCallback(() => {
    if (!config.enabled) return;

    // Som sutil de hover
    playTone(1000, 0.05, 'sine');
  }, [config.enabled, playTone]);

  return {
    playThemeTransitionSound,
    playButtonClickSound,
    playSuccessSound,
    playHoverSound,
  };
};

export default useThemeSounds;
