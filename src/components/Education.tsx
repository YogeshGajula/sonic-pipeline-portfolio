
import React from 'react';
import { GraduationCap, Calendar, Medal, Award } from 'lucide-react';
import { useSound } from './SoundContext';

interface EducationItemProps {
  degree: string;
  institution: string;
  period: string;
  description: string;
  achievements?: string[];
}

const EducationItem: React.FC<EducationItemProps> = ({
  degree,
  institution,
  period,
  description,
  achievements = []
}) => {
  const { playHover } = useSound();
  
  return (
    <div 
      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
      onMouseEnter={playHover}
    >
      <h3 className="text-xl font-bold mb-2">{degree}</h3>
      <div className="flex items-center gap-2 mb-3">
        <Medal className="text-primary" size={16} />
        <span className="text-muted-foreground">{institution}</span>
      </div>
      <div className="flex items-center gap-2 mb-4 text-sm">
        <Calendar className="text-primary" size={14} />
        <span className="text-muted-foreground">{period}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      {achievements.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-primary" size={16} />
            <h4 className="font-medium">Key Achievements</h4>
          </div>
          <ul className="space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Education: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <GraduationCap className="text-primary" size={28} />
        Education
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EducationItem 
          degree="MSc in Computer Science"
          institution="Stanford University"
          period="2016 - 2018"
          description="Specialized in Distributed Systems and Cloud Computing with a focus on container orchestration systems and infrastructure automation."
          achievements={[
            "Master's thesis on 'Optimizing Kubernetes Cluster Autoscaling for Mixed Workloads'",
            "Graduate Teaching Assistant for Cloud Computing course",
            "Recipient of the Stanford Engineering Fellowship"
          ]}
        />
        
        <EducationItem 
          degree="BSc in Computer Engineering"
          institution="Massachusetts Institute of Technology"
          period="2012 - 2016"
          description="Focused on computer architecture, operating systems, and software engineering principles with additional coursework in network security."
          achievements={[
            "Dean's List for four consecutive years",
            "Undergraduate Research Project on 'Secure Container Networking'",
            "Team Lead for Hackathon winning project 'AutoScale'"
          ]}
        />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Professional Development</h3>
          <ul className="space-y-4">
            {[
              {
                cert: "Advanced Kubernetes Administrator",
                issuer: "Cloud Native Computing Foundation",
                year: "2023"
              },
              {
                cert: "AWS DevOps Professional",
                issuer: "Amazon Web Services",
                year: "2022"
              },
              {
                cert: "Google Cloud Professional DevOps Engineer",
                issuer: "Google Cloud",
                year: "2021"
              },
              {
                cert: "HashiCorp Certified Terraform Associate",
                issuer: "HashiCorp",
                year: "2021"
              }
            ].map((cert, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1">
                  <Award className="text-primary" size={16} />
                </div>
                <div>
                  <p className="font-medium text-sm">{cert.cert}</p>
                  <p className="text-xs text-muted-foreground">{cert.issuer}, {cert.year}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Technical Training</h3>
          <ul className="space-y-4">
            {[
              {
                course: "Site Reliability Engineering Fundamentals",
                provider: "Google Cloud Academy",
                year: "2022"
              },
              {
                course: "Advanced GitOps with ArgoCD",
                provider: "CNCF Training",
                year: "2022"
              },
              {
                course: "Infrastructure Performance Optimization",
                provider: "AWS Training & Certification",
                year: "2021"
              },
              {
                course: "Security in DevOps Pipelines",
                provider: "DevSecOps Institute",
                year: "2020"
              }
            ].map((training, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1">
                  <Calendar className="text-primary" size={16} />
                </div>
                <div>
                  <p className="font-medium text-sm">{training.course}</p>
                  <p className="text-xs text-muted-foreground">{training.provider}, {training.year}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Education;
