
import React from 'react';
import { ExternalLink, Github, Code } from 'lucide-react';
import { useSound } from './SoundContext';

interface ProjectProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageSrc?: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  techStack,
  githubUrl,
  demoUrl,
  imageSrc
}) => {
  const { playHover, playClick } = useSound();

  return (
    <div 
      className="border border-border bg-card rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
      onMouseEnter={playHover}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <div className="flex gap-3">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                onMouseEnter={playHover}
                onClick={playClick}
                aria-label={`View ${title} on GitHub`}
              >
                <Github size={18} />
              </a>
            )}
            {demoUrl && (
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                onMouseEnter={playHover}
                onClick={playClick}
                aria-label={`View ${title} live demo`}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        
        <div className="bg-terminal-dark/30 p-4 rounded-md mb-4 flex-grow">
          <p className="font-mono text-sm text-muted-foreground">{description}</p>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <span key={i} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
