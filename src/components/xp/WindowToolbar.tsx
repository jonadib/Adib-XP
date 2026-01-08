import { useState, useRef, useEffect } from 'react';

interface WindowToolbarProps {
  title: string;
  onExit: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onRestore: () => void;
  isMaximized: boolean;
  isMinimized?: boolean;
}

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  items: { label: string; onClick: () => void; disabled?: boolean }[];
  position: { top: number; left: number };
}

const Dropdown = ({ isOpen, onClose, items, position }: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute bg-white border border-gray-300 shadow-md z-50 min-w-[120px] py-0.5"
      style={{ top: position.top, left: position.left }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={`px-4 py-1 text-xs cursor-pointer ${item.disabled
            ? 'text-gray-400 cursor-not-allowed'
            : 'hover:bg-primary hover:text-white'
            }`}
          onClick={() => {
            if (!item.disabled) {
              item.onClick();
              onClose();
            }
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

const WindowToolbar = ({
  title,
  onExit,
  onMinimize,
  onMaximize,
  onRestore,
  isMaximized,
  isMinimized = false,
}: WindowToolbarProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const fileItems = [
    { label: 'Print', onClick: () => { }, disabled: true },
    { label: 'Print Setup', onClick: () => { }, disabled: true },
    { label: 'Exit', onClick: onExit },
  ];

  const viewItems = [
    { label: 'Restore', onClick: onRestore, disabled: true }, // Taskbar
    { label: 'Minimize', onClick: onMinimize, disabled: !isMaximized }, // Shrunken view
    { label: 'Maximize', onClick: onMaximize, disabled: isMaximized }, // Full screen
  ];

  const menus = [
    { id: 'file', label: 'File', items: fileItems },
    { id: 'view', label: 'View', items: viewItems },
    { id: 'tools', label: 'Tools', items: [], disabled: true },
    { id: 'help', label: 'Help', items: [{ label: 'About', onClick: () => { } }], disabled: true },
  ];

  return (
    <div className="flex flex-col border-b border-border/50">
      {/* Menu Bar */}
      <div ref={menuRef} className="relative flex bg-card px-1.5 py-0.5 gap-0.5 text-xs">
        {menus.map((menu) => (
          <div key={menu.id} className="relative">
            <span
              className={`px-2 py-0.5 cursor-pointer border border-transparent rounded transition-colors ${menu.disabled
                ? 'text-gray-400 cursor-default'
                : openMenu === menu.id
                  ? 'bg-blue-100 border-primary'
                  : 'hover:bg-blue-100 hover:border-primary'
                }`}
              onClick={(e) => {
                if (menu.disabled) return;
                e.stopPropagation();
                setOpenMenu(openMenu === menu.id ? null : menu.id);
              }}
            >
              {menu.label}
            </span>
            {!menu.disabled && (
              <Dropdown
                isOpen={openMenu === menu.id}
                onClose={() => setOpenMenu(null)}
                items={menu.items}
                position={{ top: 20, left: 0 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-1.5 py-1 bg-gradient-to-b from-blue-50 to-blue-100 border-b border-blue-200">
        <button className="flex flex-col items-center px-2 py-0.5 text-[10px] hover:bg-blue-200/50 rounded border border-transparent hover:border-blue-300 disabled:opacity-50" disabled>
          <div className="w-5 h-5 rounded-full bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-white text-xs">←</span>
          </div>
          <span>Back</span>
        </button>
        <button className="flex flex-col items-center px-2 py-0.5 text-[10px] hover:bg-blue-200/50 rounded border border-transparent hover:border-blue-300 disabled:opacity-50" disabled>
          <div className="w-5 h-5 rounded-full bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-white text-xs">→</span>
          </div>
          <span>Forward</span>
        </button>

        <div className="w-px h-8 bg-blue-300 mx-1" />

        <button className="flex flex-col items-center px-2 py-0.5 text-[10px] hover:bg-blue-200/50 rounded border border-transparent hover:border-blue-300">
          <img
            src="https://icons.iconarchive.com/icons/flameia/xrabbit/128/Folder-Flower-Blue-icon.png"
            alt="Projects"
            className="w-5 h-5 object-contain"
          />
          <span>My Projects</span>
        </button>
        <button className="flex flex-col items-center px-2 py-0.5 text-[10px] hover:bg-blue-200/50 rounded border border-transparent hover:border-blue-300">
          <img
            src="https://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/128/Document-icon.png"
            alt="Resume"
            className="w-5 h-5 object-contain"
          />
          <span>My Resume</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-card">
        <span className="text-xs text-gray-600">Address</span>
        <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-sm px-2 py-0.5">
          <img
            src="https://icons.iconarchive.com/icons/arrioch/blawb/128/folder-icon.png"
            alt=""
            className="w-4 h-4 mr-1.5"
          />
          <span className="text-xs">{title}</span>
        </div>
        <button className="bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-300 rounded-sm px-2 py-0.5 text-xs flex items-center gap-1 hover:from-gray-200 hover:to-gray-300">
          <span className="text-green-600">→</span>
          Go
        </button>
      </div>
    </div>
  );
};

export default WindowToolbar;
