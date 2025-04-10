
import React, { createContext, useContext, useRef, useState } from "react";

type SoundContextType = {
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const successSound = useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    // Creating audio elements
    hoverSound.current = new Audio("/sounds/hover.mp3");
    clickSound.current = new Audio("/sounds/click.mp3");
    successSound.current = new Audio("/sounds/success.mp3");

    // Configure audio properties
    [hoverSound.current, clickSound.current, successSound.current].forEach(sound => {
      if (sound) {
        sound.volume = 0.2;
      }
    });

    // Cleanup function
    return () => {
      [hoverSound.current, clickSound.current, successSound.current].forEach(sound => {
        if (sound) {
          sound.pause();
          sound.currentTime = 0;
        }
      });
    };
  }, []);

  const playHover = () => {
    if (soundEnabled && hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  const playClick = () => {
    if (soundEnabled && clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  const playSuccess = () => {
    if (soundEnabled && successSound.current) {
      successSound.current.currentTime = 0;
      successSound.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <SoundContext.Provider 
      value={{ 
        playHover, 
        playClick, 
        playSuccess, 
        soundEnabled, 
        toggleSound 
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
