
import React, { useState, useEffect, useRef } from 'react';
import { useSound } from './SoundContext';

interface TerminalProps {
  commands?: string[];
  typingSpeed?: number;
  prompt?: string;
}

const Terminal: React.FC<TerminalProps> = ({
  commands = [
    "ssh devops@portfolio.com",
    "cd /home/devops/projects",
    "ls -la",
    "kubectl get pods --all-namespaces",
    "terraform plan -out=tfplan",
    "docker-compose up -d",
    "git push origin main",
  ],
  typingSpeed = 50,
  prompt = "devops@portfolio:~$"
}) => {
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { playHover } = useSound();

  useEffect(() => {
    if (commandIndex >= commands.length) return;

    const current = commands[commandIndex];

    if (charIndex < current.length) {
      const timer = setTimeout(() => {
        setCurrentCommand(prev => prev + current[charIndex]);
        setCharIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // Command is complete
      const timer = setTimeout(() => {
        setDisplayedCommands(prev => [...prev, currentCommand]);
        setCurrentCommand("");
        setCommandIndex(prev => prev + 1);
        setCharIndex(0);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [commandIndex, charIndex, commands, typingSpeed, currentCommand]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedCommands, currentCommand]);

  return (
    <div 
      className="w-full bg-terminal-dark rounded-lg p-4 font-mono text-sm overflow-hidden shadow-md border border-terminal-light"
      onMouseEnter={playHover}
    >
      <div className="flex space-x-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-terminal-error"></div>
        <div className="w-3 h-3 rounded-full bg-terminal-warning"></div>
        <div className="w-3 h-3 rounded-full bg-terminal-success"></div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {displayedCommands.map((cmd, i) => (
          <div key={i} className="mb-2">
            <span className="text-green-400">{prompt} </span>
            <span>{cmd}</span>
          </div>
        ))}
        
        {currentCommand && (
          <div>
            <span className="text-green-400">{prompt} </span>
            <span>{currentCommand}</span>
            <span className="terminal-cursor"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
