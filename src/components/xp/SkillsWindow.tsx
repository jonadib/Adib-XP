import { useState } from 'react';
import ModernXPToolbar from './ModernXPToolbar';

interface WindowControls {
  onExit: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onRestore: () => void;
  isMaximized: boolean;
  title: string;
}

interface SkillsWindowProps {
  windowControls?: WindowControls;
  favorites: string[];
  onOpenWindow?: (id: string) => void;
}

const SkillsWindow = ({ windowControls, favorites, onOpenWindow }: SkillsWindowProps) => {
  const skills = [
    { icon: "https://icons.iconarchive.com/icons/cornmanthe3rd/plex/128/Other-html-5-icon.png", label: "HTML" },
    { icon: "https://icons.iconarchive.com/icons/martz90/hex/128/css-3-icon.png", label: "CSS" },
    { icon: "https://icons.iconarchive.com/icons/cornmanthe3rd/plex/128/Other-javascript-icon.png", label: "JavaScript" },
    { icon: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png", label: "TypeScript" },
    { icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png", label: "React" },
    { icon: "https://cdn.iconscout.com/icon/free/png-256/free-adobe-photoshop-logo-icon-1563212.png", label: "Photoshop" },
    { icon: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png", label: "Figma" },
    { icon: "https://download.blender.org/branding/blender_logo_socket.png", label: "Blender" },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <ModernXPToolbar
        windowControls={windowControls}
        address="C:\Documents and Settings\Adib\Skills"
        isDarkMode={false}
        setIsDarkMode={() => { }}
        favoritesLabel="My Resume"
        onFavoritesClick={() => onOpenWindow?.('resume')}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-44 xp-sidebar flex-col gap-2.5 p-2.5">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header text-blue-800">Tasks</div>
            <div className="p-2.5 text-xs flex flex-col gap-1">
              <span className="text-blue-600 cursor-pointer hover:underline">View skills</span>
              <span className="text-blue-600 cursor-pointer hover:underline">Sort skills</span>
            </div>
          </div>
        </div>

        {/* Main View */}
        <div
          className="flex-1 p-5 overflow-y-auto relative"
          style={{
            backgroundColor: 'white',
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        >
          <h3 className="text-primary font-bold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-5">
            {skills.map((skill) => (
              <div
                key={skill.label}
                className="w-20 text-center cursor-pointer group"
              >
                <img
                  src={skill.icon}
                  alt={skill.label}
                  className="w-12 h-12 mx-auto mb-1 object-contain"
                />
                <span className="text-xs px-1 py-0.5 rounded group-hover:bg-primary group-hover:text-white">
                  {skill.label}
                </span>
              </div>
            ))}
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

export default SkillsWindow;
