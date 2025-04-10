
import React, { useState, useEffect } from "react";
import { ArrowRight, Terminal as TerminalIcon, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { SoundProvider } from "@/components/SoundContext";
import Navigation from "@/components/Navigation";
import ThreeDInfrastructure from "@/components/ThreeDInfrastructure";
import ProjectCard from "@/components/ProjectCard";
import SkillBar from "@/components/SkillBar";
import Terminal from "@/components/Terminal";
import ContactForm from "@/components/ContactForm";
import { useSound } from "@/components/SoundContext";

// Intersection Observer Hook
const useElementOnScreen = (options: IntersectionObserverInit) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    
    observer.observe(ref);
    
    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return [setRef, isVisible] as const;
};

const Section: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
  onVisible?: () => void;
}> = ({ id, className, children, onVisible }) => {
  const [ref, isVisible] = useElementOnScreen({
    rootMargin: "-20% 0px",
    threshold: 0.3,
  });

  useEffect(() => {
    if (isVisible && onVisible) {
      onVisible();
    }
  }, [isVisible, onVisible]);

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`min-h-screen py-20 ${className || ""}`}
    >
      {children}
    </section>
  );
};

const SocialButton: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => {
  const { playHover, playClick } = useSound();
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
      onMouseEnter={playHover}
      onClick={playClick}
      aria-label={label}
    >
      {icon}
    </a>
  );
};

const Main = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { playHover, playClick } = useSound();

  const devopsSkills = [
    { name: "Docker & Containerization", level: 95, color: "#0db7ed" },
    { name: "Kubernetes & Orchestration", level: 90, color: "#326ce5" },
    { name: "CI/CD Pipelines", level: 85, color: "#f44d27" },
    { name: "Infrastructure as Code", level: 80, color: "#7b42bc" }
  ];

  const cloudSkills = [
    { name: "AWS", level: 90, color: "#ff9900" },
    { name: "Google Cloud", level: 75, color: "#4285f4" },
    { name: "Azure", level: 70, color: "#0078d7" },
    { name: "Serverless Architecture", level: 85, color: "#fd5750" }
  ];
  
  const automationSkills = [
    { name: "Ansible", level: 85, color: "#e00" },
    { name: "Terraform", level: 90, color: "#7b42bc" },
    { name: "Shell Scripting", level: 95, color: "#4eaa25" },
    { name: "Python", level: 80, color: "#3776ab" }
  ];

  const projects = [
    {
      title: "Microservices Deployment Pipeline",
      description: "Automated CI/CD pipeline for microservices architecture using GitHub Actions, Docker, and Kubernetes.",
      techStack: ["Docker", "Kubernetes", "GitHub Actions", "ArgoCD"],
      githubUrl: "https://github.com",
      demoUrl: "https://example.com"
    },
    {
      title: "Infrastructure as Code Framework",
      description: "Scalable IaC framework using Terraform and AWS CloudFormation for consistent environment provisioning.",
      techStack: ["Terraform", "AWS", "CloudFormation", "Python"],
      githubUrl: "https://github.com",
    },
    {
      title: "Kubernetes Monitoring Stack",
      description: "Comprehensive monitoring and alerting solution for Kubernetes clusters using Prometheus, Grafana, and AlertManager.",
      techStack: ["Prometheus", "Grafana", "Kubernetes", "AlertManager"],
      githubUrl: "https://github.com",
      demoUrl: "https://example.com"
    },
    {
      title: "Automated Disaster Recovery",
      description: "Fully automated DR solution with cross-region failover capabilities for critical applications.",
      techStack: ["AWS", "Terraform", "Python", "Lambda"],
      githubUrl: "https://github.com",
    }
  ];

  return (
    <div className="relative">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="container mx-auto px-4 pt-16">
        <Section 
          id="home" 
          onVisible={() => setActiveSection("home")}
          className="flex flex-col justify-center"
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-block bg-secondary px-4 py-1 rounded-full text-sm font-mono text-primary mb-4">
                DevOps Engineer & Cloud Architect
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Automating Infrastructure, <br />
                <span className="text-primary">Optimizing Deployments</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Specializing in CI/CD pipelines, container orchestration, and infrastructure as code
                to build reliable, scalable, and secure cloud systems.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#projects"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/80 transition-colors"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  View Projects <ArrowRight size={16} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/80 transition-colors"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  Contact Me <Mail size={16} />
                </a>
              </div>
            </div>
            
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4 inline-flex items-center gap-2">
                <TerminalIcon className="text-primary" size={20} /> 
                Infrastructure Pipeline
              </h2>
              <ThreeDInfrastructure />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Interactive 3D visualization of a modern DevOps pipeline. Click on nodes to explore.
              </p>
            </div>
          </div>
        </Section>
        
        <Section 
          id="about" 
          onVisible={() => setActiveSection("about")}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-muted-foreground mb-4">
                  I'm a DevOps Engineer with expertise in automating and optimizing mission-critical deployments
                  in AWS, GCP, and hybrid cloud environments.
                </p>
                <p className="text-muted-foreground mb-4">
                  With over 8 years of experience in the industry, I've helped organizations implement
                  robust CI/CD pipelines, containerization strategies, and infrastructure automation.
                </p>
                <p className="text-muted-foreground">
                  My approach combines technical excellence with a focus on business outcomes,
                  helping teams deliver software faster, more reliably, and with greater security.
                </p>
                
                <div className="flex gap-4 mt-6">
                  <SocialButton 
                    href="https://github.com" 
                    icon={<Github size={18} />} 
                    label="GitHub Profile"
                  />
                  <SocialButton 
                    href="https://linkedin.com" 
                    icon={<Linkedin size={18} />} 
                    label="LinkedIn Profile"
                  />
                  <SocialButton 
                    href="https://twitter.com" 
                    icon={<Twitter size={18} />} 
                    label="Twitter Profile"
                  />
                  <SocialButton 
                    href="mailto:contact@example.com" 
                    icon={<Mail size={18} />} 
                    label="Email Me"
                  />
                </div>
              </div>
              
              <div>
                <Terminal />
              </div>
            </div>
          </div>
        </Section>

        <Section 
          id="projects" 
          onVisible={() => setActiveSection("projects")}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  githubUrl={project.githubUrl}
                  demoUrl={project.demoUrl}
                />
              ))}
            </div>
          </div>
        </Section>

        <Section 
          id="skills" 
          onVisible={() => setActiveSection("skills")}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Professional Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-primary">DevOps</h3>
                {devopsSkills.map((skill, index) => (
                  <SkillBar
                    key={index}
                    name={skill.name}
                    level={skill.level}
                    color={skill.color}
                    delay={index * 100}
                  />
                ))}
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-primary">Cloud Platforms</h3>
                {cloudSkills.map((skill, index) => (
                  <SkillBar
                    key={index}
                    name={skill.name}
                    level={skill.level}
                    color={skill.color}
                    delay={index * 100 + 400}
                  />
                ))}
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-primary">Automation</h3>
                {automationSkills.map((skill, index) => (
                  <SkillBar
                    key={index}
                    name={skill.name}
                    level={skill.level}
                    color={skill.color}
                    delay={index * 100 + 800}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Certifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "AWS Certified DevOps Engineer",
                  "Certified Kubernetes Administrator",
                  "HashiCorp Certified Terraform Associate",
                  "Google Cloud Professional DevOps Engineer"
                ].map((cert, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary p-4 rounded-lg flex items-center justify-center text-center hover:bg-secondary/80 transition-colors"
                    onMouseEnter={playHover}
                  >
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section 
          id="contact" 
          onVisible={() => setActiveSection("contact")}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-muted-foreground mb-6">
                  Interested in working together or have questions about implementing DevOps practices in your organization?
                  Feel free to reach out!
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary" size={20} />
                    <span>contact@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="text-primary" size={20} />
                    <a 
                      href="https://github.com"
                      className="hover:text-primary transition-colors"
                      onMouseEnter={playHover}
                      onClick={playClick}
                    >
                      github.com/devops-engineer
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="text-primary" size={20} />
                    <a 
                      href="https://linkedin.com"
                      className="hover:text-primary transition-colors"
                      onMouseEnter={playHover}
                      onClick={playClick}
                    >
                      linkedin.com/in/devops-engineer
                    </a>
                  </div>
                </div>
                
                <div className="bg-terminal-dark/30 p-6 rounded-lg border border-terminal-light">
                  <p className="text-sm mb-2 font-mono text-green-400">$ curl contact-info.sh | bash</p>
                  <p className="text-xs text-muted-foreground">
                    Let's automate your infrastructure and optimize your deployment pipelines!
                  </p>
                </div>
              </div>
              
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </Section>
      </main>
      
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} DevOps Portfolio. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a 
                href="#home" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setActiveSection("home");
                }}
              >
                Home
              </a>
              <a 
                href="#projects" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setActiveSection("projects");
                }}
              >
                Projects
              </a>
              <a 
                href="#skills" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setActiveSection("skills");
                }}
              >
                Skills
              </a>
              <a 
                href="#contact" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setActiveSection("contact");
                }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Index = () => {
  return (
    <SoundProvider>
      <Main />
    </SoundProvider>
  );
};

export default Index;
