
import React, { useState, useEffect } from 'react';
import { useSound } from './SoundContext';

interface SkillBarProps {
  name: string;
  level: number;
  color?: string;
  delay?: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ 
  name, 
  level, 
  color = 'rgb(59, 130, 246)', 
  delay = 0 
}) => {
  const [width, setWidth] = useState(0);
  const { playHover } = useSound();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(level);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div 
      className="mb-4"
      onMouseEnter={playHover}
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm font-medium text-muted-foreground">{level}%</span>
      </div>
      <div className="w-full h-2.5 bg-secondary rounded-full">
        <div 
          className="h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${width}%`, 
            backgroundColor: color 
          }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
