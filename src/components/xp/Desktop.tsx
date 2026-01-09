import { useState, useCallback, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import AboutWindow from './AboutWindow';
import ContactWindow from './ContactWindow';
import ProjectsWindow from './ProjectsWindow';
import SkillsWindow from './SkillsWindow';
import BalloonNotification from './BalloonNotification';
import ShutdownDialog from './ShutdownDialog';
import ResumeWindow from './ResumeWindow';
import MediaPlayerWindow from './MediaPlayerWindow';

interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface DesktopProps {
  crtEnabled: boolean;
  onCrtToggle: () => void;
}

const Desktop = ({ crtEnabled, onCrtToggle }: DesktopProps) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [showBalloon, setShowBalloon] = useState(false);
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);

  const [windows, setWindows] = useState<Record<string, WindowState>>({
    about: {
      id: 'about',
      title: 'About Me',
      icon: 'https://icons.iconarchive.com/icons/arrioch/blawb/128/folder-icon.png',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
    },
    projects: {
      id: 'projects',
      title: 'My Projects',
      icon: 'https://icons.iconarchive.com/icons/flameia/xrabbit/128/Folder-Flower-Blue-icon.png',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
    },
    contact: {
      id: 'contact',
      title: 'Contact Me',
      icon: 'https://icons.iconarchive.com/icons/arrioch/blawb/128/rss-icon.png',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
    },
    skills: {
      id: 'skills',
      title: 'Skills',
      icon: 'https://icons.iconarchive.com/icons/arrioch/blawb/128/gameboid-icon.png',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
    },
    resume: {
      id: 'resume',
      title: 'My Resume',
      icon: 'https://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/128/Document-icon.png',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
    },
    video: {
      id: 'video',
      title: 'Video Player',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Media_Player_Windows_11_logo.svg/960px-Media_Player_Windows_11_logo.svg.png',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
    },
    audio: {
      id: 'audio',
      title: 'Music Player',
      icon: 'https://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/128/Music-icon.png',
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
    },
  });

  // Show balloon notification after initial mount
  useEffect(() => {
    const timer = setTimeout(() => setShowBalloon(true), 2000);
    return () => clearTimeout(timer);
  }, []);


  const desktopIcons = [
    { id: 'about', icon: 'https://icons.iconarchive.com/icons/arrioch/blawb/128/folder-icon.png', label: 'About Me' },
    { id: 'projects', icon: 'https://icons.iconarchive.com/icons/flameia/xrabbit/128/Folder-Flower-Blue-icon.png', label: 'My Projects' },
    { id: 'contact', icon: 'https://icons.iconarchive.com/icons/arrioch/blawb/128/rss-icon.png', label: 'My Contact' },
    { id: 'skills', icon: 'https://icons.iconarchive.com/icons/arrioch/blawb/128/gameboid-icon.png', label: 'Skills' },
  ];

  const openWindow = useCallback((id: string) => {
    setZIndexCounter((prev) => prev + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: zIndexCounter + 1,
      },
    }));
    setStartMenuOpen(false);
  }, [zIndexCounter]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setZIndexCounter((prev) => prev + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: false,
        zIndex: zIndexCounter + 1,
      },
    }));
  }, [zIndexCounter]);

  const handleTaskbarWindowClick = useCallback((id: string) => {
    const win = windows[id];
    if (win.isMinimized) {
      focusWindow(id);
    } else if (win.zIndex === Math.max(...Object.values(windows).map((w) => w.zIndex))) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  }, [windows, focusWindow, minimizeWindow]);

  const handleDesktopClick = () => {
    setSelectedIcon(null);
    setStartMenuOpen(false);
  };

  const getActiveWindowId = () => {
    const openWins = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);
    if (openWins.length === 0) return null;
    return openWins.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id;
  };

  const openWindows = Object.values(windows)
    .filter((w) => w.isOpen)
    .map((w) => ({ id: w.id, title: w.title, icon: w.icon }));

  const handleShutdown = () => {
    document.body.classList.add('shutdown-transition');
    // Wait for the slow transition before actually shutting down (reloading)
    setTimeout(() => {
      setShowShutdownDialog(false);
      window.location.reload();
    }, 5000);
  };

  const handleRestart = () => {
    // Show disabled state for a moment before restarting
    setTimeout(() => {
      setShowShutdownDialog(false);
      window.location.reload();
    }, 1500);
  };

  const handleLogoff = () => {
    setStartMenuOpen(false);
    window.location.reload();
  };

  const handleOpenShutdownDialog = () => {
    setStartMenuOpen(false);
    setShowShutdownDialog(true);
  };

  const handleShowBalloon = () => {
    setShowBalloon(true);
  };

  const balloonLinks = [
    { label: 'About Me', onClick: () => { setShowBalloon(false); openWindow('about'); } },
    { label: 'My Projects', onClick: () => { setShowBalloon(false); openWindow('projects'); } },
  ];

  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (projectId: string) => {
    setFavorites((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const renderWindowContent = (id: string) => {
    switch (id) {
      case 'about':
        return <AboutWindow onOpenWindow={openWindow} favorites={favorites} />;
      case 'contact':
        return <ContactWindow favorites={favorites} onOpenWindow={openWindow} />;
      case 'projects':
        return <ProjectsWindow favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'skills':
        return <SkillsWindow favorites={favorites} onOpenWindow={openWindow} />;
      case 'resume':
        return <ResumeWindow onOpenContact={() => openWindow('contact')} />;
      case 'video':
        return <MediaPlayerWindow
          type="video"
          playlist={[
            { src: "https://youtu.be/GuGw4226Qcs?si=fmW55G08rhK_3nYb", title: "Video 1" },
            { src: "https://youtu.be/QNUSIOMb6vI?si=qyZTVdG1455nIR1h", title: "Video 2" },
            { src: "https://youtu.be/rDYdeq3JW_E?si=hPn7ALuh3fWX4bir", title: "Video 3" },
            { src: "https://youtu.be/qjY1wRWV2s4?si=Vp6Vtz4UCYBlAH5m", title: "Video 4" },
            { src: "https://youtu.be/yf69dsuWXXo?si=UtHNjHQHiigDDAFe", title: "Video 5" }
          ]}
        />;
      case 'audio':
        return <MediaPlayerWindow
          type="audio"
          playlist={[
            { src: "/High Hopes.mp3", title: "High Hopes" },
            { src: "/Karnival_-_Bhrom_256kbps.webm", title: "Bhrom - Karnival" }
          ]}
        />;
      default:
        return null;
    }
  };

  return (
    <div
      className="relative w-full h-[calc(100dvh-30px)] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('https://wallpaper-house.com/data/out/6/wallpaper2you_131441.jpg')",
      }}
      onClick={handleDesktopClick}
    >

      {/* Desktop Icons */}
      <div className="absolute top-2.5 left-2.5 flex flex-col gap-5 md:gap-5 z-0">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            isSelected={selectedIcon === icon.id}
            // --- FIX START ---
            onClick={() => {
              setSelectedIcon(icon.id);
            }}
            onDoubleClick={() => {
              openWindow(icon.id);
            }}
          // --- FIX END ---
          />
        ))}
      </div>

      {/* Windows */}
      {Object.values(windows).map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          isOpen={win.isOpen && !win.isMinimized}
          isActive={getActiveWindowId() === win.id}
          zIndex={win.zIndex}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          initialPosition={{ x: 100 + Object.keys(windows).indexOf(win.id) * 30, y: 50 + Object.keys(windows).indexOf(win.id) * 30 }}
          initialSize={win.id === 'about' ? { width: 900, height: 600 } : (win.id === 'audio' ? { width: 500, height: 350 } : { width: 700, height: 500 })}
          isSmallOnMobile={win.id === 'audio'}
        >
          {renderWindowContent(win.id)}
        </Window>
      ))}

      {/* Start Menu */}
      <StartMenu
        isOpen={startMenuOpen}
        userName="Md Adib"
        onLogoff={handleLogoff}
        onShutdown={handleOpenShutdownDialog}
        onOpenProjects={() => openWindow('projects')}
        onOpenContact={() => openWindow('contact')}
        onOpenAbout={() => openWindow('about')}
        onOpenResume={() => openWindow('resume')}
        onOpenVideo={() => openWindow('video')}
        onOpenAudio={() => openWindow('audio')}
      />

      {/* Balloon Notification */}
      <BalloonNotification
        title="Welcome to MitchIvin XP"
        message="A faithful XP-inspired interface, custom-built to showcase my work and attention to detail."
        links={balloonLinks}
        icon="/Black Red Grunge Moon Light Music Album Cover.jpg"
        show={showBalloon}
        onClose={() => setShowBalloon(false)}
        duration={10000}
        playSound={true}
      />

      {/* Shutdown Dialog */}
      <ShutdownDialog
        isOpen={showShutdownDialog}
        onClose={() => setShowShutdownDialog(false)}
        onShutdown={handleShutdown}
        onRestart={handleRestart}
      />

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        activeWindowId={getActiveWindowId()}
        onWindowClick={handleTaskbarWindowClick}
        onStartClick={(e?: React.MouseEvent) => {
          if (e) e.stopPropagation();
          setStartMenuOpen(!startMenuOpen);
        }}
        startMenuOpen={startMenuOpen}
        crtEnabled={crtEnabled}
        onCrtToggle={onCrtToggle}
        onBalloonClick={handleShowBalloon}
      />
    </div>
  );
};

export default Desktop;