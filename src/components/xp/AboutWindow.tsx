import { useState } from 'react';
import avatar1 from '@/assets/avatar-1.png';
import avatar2 from '@/assets/avatar-2.png';
import avatar3 from '@/assets/avatar-3.png';
import avatar4 from '@/assets/avatar-4.png';
import profileImg from '@/assets/profile.png';
import ModernXPToolbar from './ModernXPToolbar';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

interface WindowControls {
  onExit: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onRestore: () => void;
  isMaximized: boolean;
  title: string;
}

interface AboutWindowProps {
  windowControls?: WindowControls;
  onOpenWindow?: (id: string) => void;
  favorites: string[];
}

const CollapsibleSection = ({ title, isOpen, onToggle, children }: CollapsibleSectionProps) => (
  <div className="mb-3 rounded-t-lg overflow-hidden shadow-sm">
    {/* XP Sidebar Header Gradient */}
    <div
      className="bg-gradient-to-r from-[#0a246a] to-[#a6caf0] px-3 py-1 flex justify-between items-center cursor-pointer select-none h-7 border-t border-l border-r border-white/30 rounded-t-lg"
      onClick={onToggle}
    >
      <span className="text-white font-bold text-[11px] font-tahoma leading-none tracking-wide">{title}</span>
      <div className={`w-4 h-4 rounded-full bg-white/20 border border-white/60 flex items-center justify-center transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}>
        <span className="text-white text-[8px]">▼</span>
      </div>
    </div>
    {/* Sidebar Body */}
    <div
      className={`transition-all duration-200 bg-[#d6dff7] border-l border-r border-b border-white ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
    >
      {children}
    </div>
  </div>
);

const AboutWindow = ({ windowControls, onOpenWindow, favorites }: AboutWindowProps) => {
  const [openSections, setOpenSections] = useState({
    socials: true,
    skills: true,
    software: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const bioSections = [
    {
      avatar: avatar4,
      text: "I'm Mitch, a visual designer from Brisbane, Australia. I tackle diverse design challenges and focus on bringing ideas to life, whether that's solving problems for clients or exploring ambitious concepts like recreating an entire operating system in a browser.",
    },
    {
      avatar: avatar3,
      text: "Growing up in New Zealand, I saw how powerful design could be through sport, particularly with rugby and the All Blacks. Every jersey, every logo, every piece of visual identity carried the weight of a nation's pride.",
    },
    {
      avatar: avatar1,
      text: "After committing to design in my twenties, I completed a Diploma of Graphic Design at Queensland TAFE and started working with clients on anything from event video packages to front-end UI projects.",
    },
    {
      avatar: avatar2,
      text: "I first discovered focus, discipline, and the drive to constantly push standards through playing rugby and design brought all of that back. I'm obsessed with details, process, and raising my own bar with every project.",
    },
  ];

  const skills = [
    { icon: "https://cdn-icons-png.flaticon.com/512/3281/3281289.png", label: "Graphic Design" },
    { icon: "https://cdn-icons-png.flaticon.com/512/1005/1005141.png", label: "Web Design" },
    { icon: "https://cdn-icons-png.flaticon.com/512/1151/1151740.png", label: "Social Graphics" },
    { icon: "https://cdn-icons-png.flaticon.com/512/4406/4406213.png", label: "Video Production" },
    { icon: "https://cdn-icons-png.flaticon.com/512/1260/1260065.png", label: "UX/UI Design" },
  ];

  const software = [
    { icon: "https://cdn.iconscout.com/icon/free/png-256/free-adobe-photoshop-logo-icon-1563212.png", label: "Adobe CC" },
    { icon: "https://code.visualstudio.com/apple-touch-icon.png", label: "VS Code" },
    { icon: "https://avatars.githubusercontent.com/u/124707255?s=280&v=4", label: "Cursor" },
    { icon: "https://wordpress.org/graphics-library/wordpress-logo-notext-rgb.png", label: "WordPress" },
    { icon: "https://download.blender.org/branding/blender_logo_socket.png", label: "Blender" },
  ];

  const socials = [
    { icon: "https://cdn-icons-png.flaticon.com/512/174/174855.png", label: "Instagram", url: "https://instagram.com" },
    { icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png", label: "GitHub", url: "https://github.com" },
    { icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png", label: "LinkedIn", url: "https://linkedin.com" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#7b9ee3]">
      <ModernXPToolbar
        windowControls={windowControls}
        address="C:\Documents and Settings\Adib\About Me"
        isDarkMode={false}
        setIsDarkMode={() => { }}
        homeLabel="My Project"
        favoritesLabel="My Resume"
        onHomeClick={() => {
          windowControls?.onMinimize();
          onOpenWindow?.('projects');
        }}
        onFavoritesClick={() => onOpenWindow?.('resume')}
      />

      <div className="flex flex-1 overflow-hidden font-tahoma">
        {/* Sidebar - XP Task Pane Style */}
        <div className="hidden md:flex w-56 bg-gradient-to-b from-[#7b9ee3] to-[#6a8ccb] flex-col gap-2 p-3 overflow-y-auto shrink-0 border-r border-[#003c74]">

          {/* Social Links */}
          <CollapsibleSection
            title="Social Links"
            isOpen={openSections.socials}
            onToggle={() => toggleSection('socials')}
          >
            <div className="p-3 text-[11px] flex flex-col gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#0a246a] hover:underline cursor-pointer group hover:text-blue-600"
                >
                  <img src={social.icon} alt="" className="w-4 h-4 object-contain group-hover:scale-110 transition-transform" />
                  {social.label}
                </a>
              ))}
            </div>
          </CollapsibleSection>

          {/* Skills */}
          <CollapsibleSection
            title="Skills"
            isOpen={openSections.skills}
            onToggle={() => toggleSection('skills')}
          >
            <div className="p-3 text-[11px] flex flex-col gap-2">
              {skills.map((skill) => (
                <div key={skill.label} className="flex items-center gap-2 text-[#0a246a]">
                  <img src={skill.icon} alt="" className="w-4 h-4 object-contain" />
                  {skill.label}
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Software */}
          <CollapsibleSection
            title="Software"
            isOpen={openSections.software}
            onToggle={() => toggleSection('software')}
          >
            <div className="p-3 text-[11px] flex flex-col gap-2">
              {software.map((sw) => (
                <div key={sw.label} className="flex items-center gap-2 text-[#0a246a]">
                  <img src={sw.icon} alt="" className="w-4 h-4 object-contain" />
                  {sw.label}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>

        {/* Main Content - Blueprint Grid Style */}
        <div
          className="flex-1 p-6 md:p-10 overflow-y-auto relative"
          style={{
            backgroundColor: '#5478d3',
            // This creates the faint white grid pattern
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            boxShadow: 'inset 5px 5px 15px rgba(0,0,0,0.1)'
          }}
        >
          {/* Watermark Image */}
          <img
            src={profileImg}
            alt="Watermark"
            className="absolute top-1/2 right-10 transform -translate-y-1/2 w-[350px] opacity-10 pointer-events-none hidden md:block grayscale mix-blend-overlay"
          />

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-3xl font-bold text-white mb-8 pb-3 border-b border-white/30 drop-shadow-md flex items-center gap-3">
              About Me
            </h1>

            <div className="space-y-8">
              {bioSections.map((section, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-5 items-start">
                  <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-white/10 rounded-lg p-1 border border-white/20 shadow-sm backdrop-blur-sm">
                    <img
                      src={section.avatar}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-white text-[13px] md:text-[14px] leading-relaxed drop-shadow-md font-medium pt-1 max-w-xl">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="h-6 bg-[#ece9d8] border-t border-[#aca899] flex items-center px-2 text-[11px] text-[#444]">
        <span>Current session: ({favorites.length} projects saved)</span>
      </div>
    </div>
  );
};

export default AboutWindow;