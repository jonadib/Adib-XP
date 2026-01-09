import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WindowControls {
    onExit: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onRestore: () => void;
    isMaximized: boolean;
    title: string;
}

interface ModernXPToolbarProps {
    windowControls?: WindowControls;
    address: string;
    isDarkMode: boolean;
    setIsDarkMode: (val: boolean) => void;
    homeLabel?: string;
    favoritesLabel?: string;
    favoritesIcon?: string;
    favoritesIconSize?: string;
    onHomeClick?: () => void;
    onFavoritesClick?: () => void;
    showDarkMode?: boolean;
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
            className="absolute bg-white border border-gray-300 shadow-md z-[6000] min-w-[120px] py-0.5 text-black"
            style={{ top: position.top, left: position.left }}
        >
            {items.map((item, i) => (
                <div
                    key={i}
                    className={`px-4 py-1 text-xs cursor-pointer ${item.disabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'hover:bg-[#316ac5] hover:text-white'
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

// Sub-component for Toolbar Buttons
const ToolbarButton = ({
    icon,
    label,
    onClick,
    iconSize = "w-10 h-10"
}: {
    icon: string;
    label: string;
    onClick?: () => void;
    iconSize?: string;
}) => (
    <button
        onClick={onClick}
        className="flex items-center gap-1 px-2 py-1 hover:bg-white/40 border border-transparent hover:border-black/10 rounded-sm group shrink-0"
    >
        <img src={icon} alt={label} className={`${iconSize} object-contain`} />
        <span className="text-[11px] text-black group-hover:text-black">{label}</span>
    </button>
);

const ModernXPToolbar = ({
    windowControls,
    address,
    isDarkMode,
    setIsDarkMode,
    homeLabel = "Home",
    favoritesLabel = "Favorites",
    onHomeClick,
    onFavoritesClick,
    showDarkMode = false,
    favoritesIcon = "https://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/128/Document-icon.png",
    favoritesIconSize = "w-7 h-7"
}: ModernXPToolbarProps) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const iconHome = "https://files.softicons.com/download/toolbar-icons/soft-icons-by-lokas-software/ico/0007-home.ico";
    const iconFavorites = favoritesIcon;
    const iconTheme = "https://nickjohn.gallerycdn.vsassets.io/extensions/nickjohn/autothemeswitcherforwin10darkmode/1.0/1714793536421/Microsoft.VisualStudio.Services.Icons.Default";

    const fileItems = [
        { label: 'Print', onClick: () => { }, disabled: true },
        { label: 'Print Setup', onClick: () => { }, disabled: true },
        { label: 'Exit', onClick: () => windowControls?.onExit() },
    ];

    const viewItems = [
        { label: 'Restore', onClick: () => windowControls?.onRestore(), disabled: true },
        { label: 'Minimize', onClick: () => windowControls?.onMinimize(), disabled: !windowControls?.isMaximized },
        { label: 'Maximize', onClick: () => windowControls?.onMaximize(), disabled: windowControls?.isMaximized },
    ];

    const menus = [
        { id: 'file', label: 'File', items: fileItems },
        { id: 'view', label: 'View', items: viewItems },
        { id: 'tools', label: 'Tools', items: [], disabled: true },
        { id: 'help', label: 'Help', items: [], disabled: true },
    ];

    return (
        <div className="bg-[#ece9d8] border-b border-[#aca899] shadow-sm relative z-10 font-sans select-none">
            {/* Menu Bar (File, Edit, etc.) */}
            <div className="flex items-center gap-1 px-2 py-0.5 text-[11px] text-black border-b border-[#aca899]/50">
                {menus.map((menu) => (
                    <div key={menu.id} className="relative">
                        <span
                            className={`px-2 py-0.5 cursor-pointer border border-transparent rounded transition-colors ${menu.disabled
                                ? 'text-gray-400 cursor-default'
                                : openMenu === menu.id
                                    ? 'bg-[#316ac5] text-white'
                                    : 'hover:bg-[#316ac5] hover:text-white'
                                }`}
                            onClick={(e) => {
                                if (menu.disabled) return;
                                e.stopPropagation();
                                setOpenMenu(openMenu === menu.id ? null : menu.id);
                            }}
                        >
                            {menu.label}
                        </span>
                        <Dropdown
                            isOpen={openMenu === menu.id}
                            onClose={() => setOpenMenu(null)}
                            items={menu.items}
                            position={{ top: 22, left: 0 }}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons Row */}
            <div className="flex items-center gap-1 px-1 md:px-2 py-1.5 border-b border-[#aca899]/50 overflow-x-auto no-scrollbar">
                <button
                    disabled
                    className="flex items-center gap-1 pr-1 md:pr-2 opacity-50 cursor-default group shrink-0"
                >
                    <div className="w-7 h-7 bg-gray-500 rounded-full flex items-center justify-center shadow-sm border border-white/30 grayscale">
                        <ArrowLeft className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[11px] text-gray-600">Back</span>
                </button>

                <button
                    disabled
                    className="flex items-center gap-1 pr-1 md:pr-2 opacity-50 cursor-default group shrink-0"
                >
                    <div className="w-7 h-7 bg-gray-500 rounded-full flex items-center justify-center shadow-sm border border-white/30 grayscale">
                        <ArrowRight className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[11px] text-gray-600">Forward</span>
                </button>

                <div className="h-6 w-[1px] bg-[#aca899] mx-1" />

                {/* Standard Actions with User Icons */}
                <ToolbarButton
                    icon={iconHome}
                    label={homeLabel}
                    onClick={onHomeClick || (() => windowControls?.onExit())}
                    iconSize="w-8 h-8"
                />
                <div className="h-6 w-[1px] bg-[#aca899] mx-1" />
                <ToolbarButton
                    icon={iconFavorites}
                    label={favoritesLabel}
                    onClick={onFavoritesClick}
                    iconSize={favoritesIconSize}
                />

                <div className="flex-1 min-w-[8px]" /> {/* Spacer */}

                {/* Dark Mode Toggle */}
                {showDarkMode && (
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="flex items-center gap-1 px-2 py-1 hover:bg-white/40 border border-transparent hover:border-black/10 rounded-sm shrink-0"
                    >
                        <img src={iconTheme} alt="Theme" className="w-4 h-4" />
                        <span className="text-[11px] text-black">Light/Dark</span>
                    </button>
                )}
            </div>

            {/* Address Bar */}
            <div className="flex items-center gap-2 px-2 py-1 pb-2">
                <span className="text-[11px] text-[#444]">Address</span>
                <div className="flex-1 flex items-center bg-white border border-[#7f9db9] h-5 px-1 shadow-inner relative overflow-hidden">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_XP_Folder_Icon.png" alt="" className="w-3.5 h-3.5 mr-1" />
                    <span className="text-[11px] text-black truncate">{address}</span>
                    <div className="absolute right-0 top-0 bottom-0 px-1 bg-[#ece9d8] border-l border-[#aca899] flex items-center">
                        <span className="text-[10px] text-black">Go</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernXPToolbar;
