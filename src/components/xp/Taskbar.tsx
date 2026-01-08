import { useState, useEffect } from 'react';

interface TaskbarWindow {
  id: string;
  title: string;
  icon: string;
}

interface TaskbarProps {
  openWindows: TaskbarWindow[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  startMenuOpen: boolean;
  crtEnabled: boolean;
  onCrtToggle: () => void;
  onBalloonClick: () => void;
}

const Taskbar = ({
  openWindows,
  activeWindowId,
  onWindowClick,
  onStartClick,
  startMenuOpen,
  crtEnabled,
  onCrtToggle,
  onBalloonClick,
}: TaskbarProps) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[30px] xp-taskbar flex justify-between items-center z-[10000]">
      {/* Start Button */}
      <button
        className={`h-[30px] px-3 xp-start-btn rounded-r-lg flex items-center gap-2 text-white font-bold text-sm shadow-md ${startMenuOpen ? 'brightness-90' : ''
          }`}
        onClick={(e) => {
          e.stopPropagation();
          onStartClick();
        }}
      >
        <img
          src="https://www.freepnglogos.com/uploads/windows-logo-png/file-windows-logo-multicolored-svg-7.png"
          alt="Start"
          className="w-5 h-5"
        />
        <span className="hidden sm:inline italic">start</span>
      </button>

      {/* Taskbar Items */}
      <div className="flex-1 flex items-center gap-0.5 px-2 overflow-hidden">
        {openWindows.map((win) => (
          <button
            key={win.id}
            className={`xp-taskbar-item h-6 px-2 rounded-sm flex items-center gap-1 text-white text-xs max-w-[150px] ${activeWindowId === win.id ? 'active' : ''
              }`}
            onClick={() => onWindowClick(win.id)}
          >
            <img src={win.icon} alt="" className="w-4 h-4" />
            <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="xp-tray h-[30px] px-3 flex items-center gap-2.5 text-white text-xs border-l border-blue-900">
        {/* Balloon/Info icon */}
        <button
          className="w-4 h-4 flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100"
          onClick={onBalloonClick}
          title="Show notification"
        >
          <img
            src="https://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/128/Help-icon.png"
            alt="Info"
            className="w-4 h-4"
          />
        </button>

        {/* CRT Toggle */}
        <button
          className={`w-4 h-4 flex items-center justify-center rounded cursor-pointer transition-all ${crtEnabled ? 'opacity-100 bg-white/20' : 'opacity-60 hover:opacity-100'
            }`}
          onClick={onCrtToggle}
          title={crtEnabled ? 'Disable CRT Effect' : 'Enable CRT Effect'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </button>

        <img
          src="https://cdn-icons-png.flaticon.com/512/929/929426.png"
          alt="Volume"
          className="w-4 h-4 cursor-pointer opacity-80 hover:opacity-100"
        />
        <span className="font-normal drop-shadow">{time}</span>
      </div>
    </div>
  );
};

export default Taskbar;
