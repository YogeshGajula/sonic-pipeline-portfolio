
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, GraduationCap, Mail } from "lucide-react";
import { useSound } from './SoundContext';

const ProfileSidebar: React.FC = () => {
  const {
    playHover
  } = useSound();
  
  return <div className="fixed left-0 top-0 h-full bg-card border-r border-border w-64 p-6 hidden lg:block rounded">
      <div className="flex flex-col items-center mb-8 pt-16">
        <div className="mb-4 rounded-full overflow-hidden avatar-glow" onMouseEnter={playHover}>
          <Avatar className="w-32 h-32">
            <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" alt="DevOps Engineer" />
            <AvatarFallback>DE</AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-xl font-bold mb-1">DevOps Engineer</h2>
        <p className="text-sm text-muted-foreground text-center">Cloud Infrastructure Specialist</p>
      </div>
      
      <div className="space-y-6 mt-12">
        <div>
          <h3 className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <Briefcase className="w-4 h-4" /> EXPERIENCE
          </h3>
          <ul className="space-y-3">
            <li className="text-sm">
              <span className="block font-medium">Senior DevOps Engineer</span>
              <span className="text-xs text-muted-foreground">2020 - Present</span>
            </li>
            <li className="text-sm">
              <span className="block font-medium">Cloud Infrastructure Specialist</span>
              <span className="text-xs text-muted-foreground">2018 - 2020</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <GraduationCap className="w-4 h-4" /> EDUCATION
          </h3>
          <ul className="space-y-3">
            <li className="text-sm">
              <span className="block font-medium">MSc Computer Science</span>
              <span className="text-xs text-muted-foreground">Stanford University, 2018</span>
            </li>
            <li className="text-sm">
              <span className="block font-medium">BSc Computer Engineering</span>
              <span className="text-xs text-muted-foreground">MIT, 2016</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
            <Mail className="w-4 h-4" /> CONTACT
          </h3>
          <p className="text-sm">contact@example.com</p>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 w-full px-6">
        <div className="h-0.5 bg-border mb-4"></div>
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} DevOps Portfolio
        </p>
      </div>
    </div>;
};

export default ProfileSidebar;
