
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from './SoundContext';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const { playHover, playClick, soundEnabled, toggleSound } = useSound();

  const handleNavClick = (section: string) => {
    playClick();
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b border-accent/20">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-terminal-success animate-pulse"></div>
          <span className="font-mono text-lg font-bold">devops@portfolio:~$</span>
        </div>
        
        <div className="flex items-center space-x-8">
          {["home", "about", "projects", "skills", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              onMouseEnter={playHover}
              className={`nav-link ${activeSection === section ? "text-foreground active-link" : ""}`}
            >
              {section}
            </button>
          ))}
          <button 
            onClick={() => {
              toggleSound();
              playClick();
            }}
            onMouseEnter={playHover}
            className="ml-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
