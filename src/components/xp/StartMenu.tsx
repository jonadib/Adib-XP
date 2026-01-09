import { useState } from 'react';
import profileImg from '@/assets/profile.png';

// --- Types ---
interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  onClick: () => void;
}

interface StartMenuProps {
  isOpen: boolean;
  userName: string;
  onLogoff: () => void;
  onShutdown: () => void;
  // --- NEW: Actions to open specific windows ---
  onOpenProjects: () => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
  onOpenResume: () => void;
  onOpenVideo: () => void;
  onOpenAudio: () => void;
}

// --- Data Structure (Unchanged) ---
const recentGroups = [
  // Group 1: Adobe
  [
    { title: 'Adobe After Effects', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg' },
    { title: 'Adobe Illustrator', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg' },
    { title: 'Adobe InDesign', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg' },
    { title: 'Adobe Photoshop', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg' },
    { title: 'Adobe Premiere Pro', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg' },
  ],
  // Group 2: AI / Creative
  [
    { title: 'Blender', icon: 'https://download.blender.org/branding/blender_logo_socket.png' },
    { title: 'ChatGPT', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
    { title: 'Claude', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/1200px-Claude_AI_symbol.svg.png' },
    { title: 'Cursor', icon: 'https://cursor.sh/brand/icon.svg' },
    { title: 'Davinci Resolve', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png' },
  ],
  // Group 3: Dev Tools
  [
    { title: 'Docker', icon: 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png' },
    { title: 'Git', icon: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png' },
    { title: 'GitHub CoPilot', icon: 'https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/github-copilot-logo-icon-hd.png' },
    { title: 'OBS Studio', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/OBS_Studio_Logo.svg' },
    { title: 'VS Code', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg' },
    { title: 'Wordpress', icon: 'https://s.w.org/style/images/about/WordPress-logotype-wmark.png' },
  ],
];

const StartMenu = ({
  isOpen = true,
  userName = "Md Adib",
  onLogoff,
  onShutdown,
  // Destructure the new props here
  onOpenProjects,
  onOpenContact,
  onOpenAbout,
  onOpenResume,
  onOpenVideo,
  onOpenAudio,
}: StartMenuProps) => {
  const [showRecentlyUsed, setShowRecentlyUsed] = useState(false);
  const isMobile = window.innerWidth < 640;

  if (!isOpen) return null;

  return (
    <div className="font-sans antialiased text-sm select-none">

      {/* Main Start Menu Container */}
      <div
        className={`fixed bottom-[30px] left-0 ${isMobile ? 'w-[280px]' : 'w-[400px] sm:w-[480px]'} rounded-t-lg shadow-2xl z-[5000] overflow-visible animate-in fade-in slide-in-from-bottom-5 duration-200`}
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '2px 0px 10px rgba(0,0,0,0.5)',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px'
        }}
      >
        {/* Blue Header */}
        <div className="h-14 md:h-16 flex items-center px-2 gap-3 rounded-t-lg bg-gradient-to-b from-[#245edb] via-[#3f8cf3] to-[#245edb] border-b-[2px] border-[#00135b]">
          {/* Profile Image - Matches Login Section style */}
          <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded border-2 border-white overflow-hidden shadow-sm relative ring-1 ring-white/50 flex-shrink-0">
            <img
              src="/Black Red Grunge Moon Light Music Album Cover.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-bold text-base md:text-lg drop-shadow-md tracking-wide truncate">
            {userName}
          </span>
        </div>

        {/* Body (Two Columns) */}
        <div className="flex bg-white h-[420px] md:h-[450px] border-l border-r border-[#316ac5]">

          {/* LEFT COLUMN (White) */}
          <div className="w-1/2 bg-white flex flex-col p-2 gap-1">

            {/* --- MY PROJECTS (Clickable) --- */}
            <div
              onClick={onOpenProjects}
              className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white cursor-pointer group rounded-sm transition-colors"
            >
              <img src="https://icons.iconarchive.com/icons/flameia/xrabbit/128/Folder-Flower-Blue-icon.png" className="w-8 h-8" alt="My Projects" />
              <div className="flex flex-col justify-center">
                <div className="font-bold text-xs leading-tight">My Projects</div>
                <div className="text-[10px] text-gray-500 group-hover:text-gray-200 leading-tight">View my work</div>
              </div>
            </div>

            {/* --- CONTACT ME (Clickable) --- */}
            <div
              onClick={onOpenContact}
              className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white cursor-pointer group rounded-sm mb-1 transition-colors"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/Feed-icon.svg" className="w-8 h-8" alt="Contact" />
              <div className="flex flex-col justify-center">
                <div className="font-bold text-xs leading-tight">Contact Me</div>
                <div className="text-[10px] text-gray-500 group-hover:text-gray-200 leading-tight">Send me a message</div>
              </div>
            </div>

            {/* --- ABOUT ME (Clickable) --- */}
            <div
              onClick={onOpenAbout}
              className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white cursor-pointer group rounded-sm mb-1 transition-colors"
            >
              <img src="https://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/128/Folder-icon.png" className="w-8 h-8" alt="About" />
              <div className="flex flex-col justify-center">
                <div className="font-bold text-xs leading-tight">About Me</div>
                <div className="text-[10px] text-gray-500 group-hover:text-gray-200 leading-tight">User Profile</div>
              </div>
            </div>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1" />

            {/* Smaller Items - Unchanged */}
            {[
              { label: "DoodleDev", icon: "https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/128/Trash-can-icon.png", onClick: () => { } },
              { label: "Video Player", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Media_Player_Windows_11_logo.svg/960px-Media_Player_Windows_11_logo.svg.png", onClick: onOpenVideo },
              { label: "Music Player", icon: "https://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/128/Music-icon.png", onClick: onOpenAudio },
            ].map((item, i) => (
              <div
                key={i}
                onClick={item.onClick}
                className="flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white cursor-pointer rounded-sm transition-colors"
              >
                <img src={item.icon} className="w-6 h-6 object-contain" alt={item.label} />
                <span className="text-xs">{item.label}</span>
              </div>
            ))}

            <div className="mt-auto text-center p-2 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center justify-center gap-2 font-bold text-xs rounded-sm transition-colors">
              All Programs <span className="bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] pl-0.5">▶</span>
            </div>
          </div>

          {/* RIGHT COLUMN (Light Blue) */}
          <div className="w-1/2 bg-[#d3e5fa] border-l border-[#95bdee] p-2 flex flex-col gap-1 text-[#00135b]">

            {/* Socials */}
            {[
              { label: "Instagram", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" },
              { label: "Github", icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png" },
              { label: "LinkedIn", icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer rounded-sm transition-colors">
                <img src={item.icon} className="w-5 h-5 object-contain" alt={item.label} />
                <span className="text-xs font-semibold">{item.label}</span>
              </div>
            ))}

            <div className="h-[1px] bg-[#95bdee] shadow-[0_1px_0_rgba(255,255,255,0.5)] my-1 mx-1" />

            {/* RECENTLY USED (With Side Submenu) */}
            <div
              className={`relative flex items-center justify-between px-2 py-1 cursor-pointer rounded-sm transition-colors ${showRecentlyUsed ? 'bg-[#316ac5] text-white' : 'hover:bg-[#316ac5] hover:text-white text-[#00135b]'}`}
              onClick={(e) => {
                if (isMobile) {
                  e.stopPropagation();
                  setShowRecentlyUsed(!showRecentlyUsed);
                }
              }}
              onMouseEnter={() => !isMobile && setShowRecentlyUsed(true)}
              onMouseLeave={() => !isMobile && setShowRecentlyUsed(false)}
            >
              <div className="flex items-center gap-2">
                <img src="https://cdn-icons-png.flaticon.com/512/3396/3396255.png" className="w-5 h-5" alt="Recent" />
                <span className="text-xs font-bold">Recently Used</span>
              </div>
              <span className="text-[8px]">▶</span>

              {showRecentlyUsed && (
                <div
                  className={`${isMobile
                    ? 'fixed left-1/2 -translate-x-1/2 bottom-[80px] w-[240px] h-[380px] z-[7000]'
                    : 'absolute left-full top-0 w-56 z-[7000] ml-1'
                    } bg-white border border-[#95bdee] shadow-2xl rounded-sm overflow-hidden flex flex-col`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Submenu Header */}
                  <div className="h-7 flex items-center justify-between px-2 bg-gradient-to-r from-[#245edb] to-[#3f8cf3] text-white shrink-0">
                    <span className="text-[10px] font-bold truncate">Recently Used</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowRecentlyUsed(false);
                      }}
                      className="w-4 h-4 bg-[#e04f14] flex items-center justify-center rounded-sm border border-white/40 active:brightness-90"
                    >
                      <span className="text-[10px] font-bold mt-[-1px]">✕</span>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto py-1">
                    {recentGroups.map((group, groupIdx) => (
                      <div key={groupIdx}>
                        {groupIdx > 0 && (
                          <div className="border-t border-gray-300/50 my-1 mx-2" />
                        )}
                        {group.map((app, appIdx) => (
                          <div
                            key={appIdx}
                            className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#316ac5] hover:text-white cursor-pointer text-black transition-colors"
                            onClick={() => window.open(`https://google.com/search?q=${app.title}`, '_blank')}
                          >
                            <img src={app.icon} alt="" className="w-4 h-4 object-contain" />
                            <span className="text-[11px] whitespace-nowrap">{app.title}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer rounded-sm text-[#00135b] transition-colors">
              <img src="https://www.freeiconspng.com/thumbs/command-line-icon/command-line-icon-1.png" className="w-5 h-5" alt="CMD" />
              <span className="text-xs font-semibold">Command Prompt</span>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer rounded-sm text-[#00135b] transition-colors">
              <img src="https://cdn-icons-png.freepik.com/256/16430/16430612.png?semt=ais_white_label" className="w-5 h-5" alt="Images" />
              <span className="text-xs font-semibold">Image Viewer</span>
            </div>

            <div
              onClick={onOpenResume}
              className="flex items-center gap-2 px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer rounded-sm text-[#00135b] transition-colors"
            >
              <img src="https://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/128/Document-icon.png" className="w-5 h-5" alt="Resume" />
              <span className="text-xs font-semibold">My Resume</span>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="h-10 bg-gradient-to-t from-[#245edb] via-[#3f8cf3] to-[#245edb] flex items-center justify-end px-4 gap-3 border-t-[2px] border-[#00135b] rounded-b-lg">
          <button
            onClick={onLogoff}
            className="flex items-center gap-1 text-white hover:bg-[#316ac5] px-2 py-0.5 rounded transition-colors group"
          >
            <img src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-key-icon-image_1347928.jpg" className="w-4 h-4 rounded-sm" alt="Log Off" />
            <span className="text-xs">Log Off</span>
          </button>

          <button
            onClick={onShutdown}
            className="flex items-center gap-1 text-white hover:bg-[#316ac5] px-2 py-0.5 rounded transition-colors"
          >
            <div className="bg-[#e04f14] p-0.5 rounded shadow-sm border border-white/20">
              <img src="https://i.pinimg.com/736x/d7/07/ce/d707ce44ee1314839c72cedbe6c63aea.jpg" className="w-3 h-3 invert" alt="" />
            </div>
            <span className="text-xs">Shut Down</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;