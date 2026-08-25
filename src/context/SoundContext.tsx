import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playNavigate: () => void;
  playCoinChime: () => void;
  playDoorSlide: () => void;
  playTerminalKey: () => void;
  playEmoteChime: () => void;
  playTeleportChime: () => void;
  playFootstep: (stepIndex?: number) => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: false,
  toggleSound: () => { },
  playHover: () => { },
  playClick: () => { },
  playNavigate: () => { },
  playCoinChime: () => { },
  playDoorSlide: () => { },
  playTerminalKey: () => { },
  playEmoteChime: () => { },
  playTeleportChime: () => { },
  playFootstep: () => { },
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('portfolio-sound-enabled') === 'true';
    } catch {
      return false;
    }
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastHoverTimeRef = useRef<number>(0);
  const isTouchDeviceRef = useRef<boolean>(false);

  // Detect touch device to prevent hover sound spam on touch screens
  useEffect(() => {
    const handleTouchStart = () => {
      isTouchDeviceRef.current = true;
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, []);

  // Save sound preference to localStorage
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('portfolio-sound-enabled', String(next));
      } catch {
        // localStorage fallback
      }
      return next;
    });
  }, []);

  // Lazy initialize AudioContext on user interaction
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => { });
    }
    return audioCtxRef.current;
  }, []);

  // 1. Hover Sound: Soft 40ms high-frequency tick (950Hz)
  const playHover = useCallback(() => {
    if (!soundEnabled || isTouchDeviceRef.current) return;

    const now = Date.now();
    if (now - lastHoverTimeRef.current < 90) return;
    lastHoverTimeRef.current = now;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore audio synthesis errors
    }
  }, [soundEnabled, getAudioContext]);

  // 2. Click Sound: Crisp 60ms click (550Hz -> 180Hz)
  const playClick = useCallback(() => {
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.075, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Ignore audio synthesis errors
    }
  }, [soundEnabled, getAudioContext]);

  // 3. Navigation Sound: Subtle 90ms transition tone (650Hz & 850Hz)
  const playNavigate = useCallback(() => {
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(650, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.09);

      osc2.frequency.setValueAtTime(950, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.09);
      osc2.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignore audio synthesis errors
    }
  }, [soundEnabled, getAudioContext]);

  // 4. Coin Chime: Sparkling dual retro coin arpeggio (987Hz -> 1318Hz, B5 to E6)
  const playCoinChime = useCallback(() => {
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'square';
      osc2.type = 'square';

      // First note (B5)
      osc1.frequency.setValueAtTime(987.77, ctx.currentTime);
      // Second note (E6)
      osc2.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.07);

      osc2.start(ctx.currentTime + 0.07);
      osc2.stop(ctx.currentTime + 0.35);
    } catch {
      // Ignore audio synthesis errors
    }
  }, [soundEnabled, getAudioContext]);

  // 5. Door Slide Swoosh: Low-pass filtered air swoosh
  const playDoorSlide = useCallback(() => {
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // Ignore audio synthesis errors
    }
  }, [soundEnabled, getAudioContext]);

  // 6. Terminal Key: Mechanical switch tick
  const playTerminalKey = useCallback(() => {
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.025);
    } catch {
      // Ignore audio synthesis errors
    }
  }, [soundEnabled, getAudioContext]);

  // 7. Emote Reaction Chime: 3-tone arpeggio (C5 -> E5 -> G5)
  const playEmoteChime = useCallback(() => {
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const tones = [523.25, 659.25, 783.99]; // C5, E5, G5
      tones.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.15);
      });
    } catch {
      // Ignore audio synthesis errors
    }
  }, [soundEnabled, getAudioContext]);

  // 8. Teleport Shimmer Chime
  const playTeleportChime = useCallback(() => {
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Ignore audio synthesis errors
    }
  }, [soundEnabled, getAudioContext]);

  // 9. Walking Footstep: Subtle soft tap with slight alternating pitch for left/right foot
  const playFootstep = useCallback((stepIndex: number = 0) => {
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Alternate base frequency between left (130Hz) and right (155Hz)
      const baseFreq = stepIndex % 2 === 0 ? 130 : 155;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Ignore audio synthesis errors
    }
  }, [soundEnabled, getAudioContext]);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playHover,
        playClick,
        playNavigate,
        playCoinChime,
        playDoorSlide,
        playTerminalKey,
        playEmoteChime,
        playTeleportChime,
        playFootstep,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
