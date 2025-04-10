
import React, { useState, useEffect, useRef } from 'react';
import { useSound } from './SoundContext';

interface TerminalProps {
  commands?: string[];
  typingSpeed?: number;
  prompt?: string;
  onCommandExecution?: (command: string) => void;
  navigable?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  commands = [
    "help",
    "goto home",
    "goto about",
    "goto projects",
    "goto skills",
    "goto contact",
  ],
  typingSpeed = 50,
  prompt = "devops@portfolio:~$",
  onCommandExecution,
  navigable = true
}) => {
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [commandOutput, setCommandOutput] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useSound();

  // Type current command character by character
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
        // Execute the command and get output
        const output = executeCommand(currentCommand);
        setDisplayedCommands(prev => [...prev, currentCommand]);
        
        if (output) {
          setCommandOutput(prev => [...prev, output]);
        }
        
        setCurrentCommand("");
        setCommandIndex(prev => prev + 1);
        setCharIndex(0);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [commandIndex, charIndex, commands, typingSpeed, currentCommand, onCommandExecution]);

  // Scroll to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedCommands, currentCommand, commandOutput]);

  // Command execution logic
  const executeCommand = (cmd: string): string => {
    if (!navigable) return "";
    
    if (cmd === "help") {
      return `Available commands:
- goto home: Navigate to home section
- goto about: Navigate to about section
- goto projects: Navigate to projects section
- goto skills: Navigate to skills section
- goto contact: Navigate to contact section`;
    }
    
    if (cmd.startsWith("goto ")) {
      const section = cmd.replace("goto ", "");
      const validSections = ["home", "about", "projects", "skills", "contact"];
      
      if (validSections.includes(section)) {
        // Perform navigation
        playClick();
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return `Navigating to ${section} section...`;
        }
        return `Error: Could not find the ${section} section`;
      }
      return `Error: Unknown section "${section}"`;
    }
    
    return `Command not recognized: ${cmd}. Type "help" for available commands.`;
  };

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
          <React.Fragment key={i}>
            <div className="mb-1">
              <span className="text-green-400">{prompt} </span>
              <span className="text-gray-200">{cmd}</span>
            </div>
            {commandOutput[i] && (
              <div className="pl-4 mb-2 text-gray-300 whitespace-pre-line">
                {commandOutput[i]}
              </div>
            )}
          </React.Fragment>
        ))}
        
        {currentCommand && (
          <div>
            <span className="text-green-400">{prompt} </span>
            <span className="text-gray-200">{currentCommand}</span>
            <span className="terminal-cursor"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
