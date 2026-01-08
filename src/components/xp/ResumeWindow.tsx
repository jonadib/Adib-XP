import { useState } from 'react';
import { ZoomIn, Save, Printer, Mail, MoreHorizontal } from 'lucide-react';
import resumeImg from '@/assets/resume.jpg';

interface WindowControls {
    onExit: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onRestore: () => void;
    isMaximized: boolean;
    title: string;
}

interface ResumeWindowProps {
    windowControls?: WindowControls;
    onOpenContact?: () => void;
}

const ResumeWindow = ({ windowControls, onOpenContact }: ResumeWindowProps) => {
    const [zoom, setZoom] = useState(1);
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2];

    const handleZoom = () => {
        const currentIndex = zoomLevels.indexOf(zoom);
        const nextIndex = (currentIndex + 1) % zoomLevels.length;
        setZoom(zoomLevels[nextIndex]);
    };

    const handleSave = () => {
        const link = document.createElement('a');
        link.href = resumeImg;
        link.download = 'Adib_Resume.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        window.print();
    };

    const menus = [
        {
            id: 'file',
            label: 'File',
            items: [
                { label: 'Save', onClick: handleSave },
                { label: 'Exit', onClick: () => windowControls?.onExit() },
            ],
        },
        {
            id: 'view',
            label: 'View',
            items: [
                { label: 'Restore', onClick: () => windowControls?.onRestore(), disabled: true },
                { label: 'Minimize', onClick: () => windowControls?.onMinimize() },
                { label: 'Maximize', onClick: () => windowControls?.onMaximize(), disabled: windowControls?.isMaximized },
            ],
        },
        {
            id: 'help',
            label: 'Help',
            items: [
                { label: 'About Resume', onClick: () => alert('Resume Viewer v1.0') },
            ],
        },
    ];

    return (
        <div className="flex flex-col h-full bg-[#ece9d8] font-tahoma select-none">
            {/* Menu Bar */}
            <div className="flex items-center px-1.5 py-0.5 gap-1 border-b border-[#aca899]/50 text-[11px] bg-[#ece9d8]">
                {menus.map((menu) => (
                    <div key={menu.id} className="relative">
                        <button
                            className={`px-2 py-0.5 hover:bg-[#316ac5] hover:text-white rounded-sm ${openMenu === menu.id ? 'bg-[#316ac5] text-white' : ''
                                }`}
                            onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                        >
                            {menu.label}
                        </button>
                        {openMenu === menu.id && (
                            <div className="absolute top-full left-0 mt-0.5 bg-white border border-[#aca899] shadow-md z-50 min-w-[120px] py-1">
                                {menu.items.map((item, idx) => (
                                    <button
                                        key={idx}
                                        disabled={item.disabled}
                                        className={`w-full text-left px-4 py-1 hover:bg-[#316ac5] hover:text-white disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400`}
                                        onClick={() => {
                                            item.onClick();
                                            setOpenMenu(null);
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 px-2 py-1 bg-[#ece9d8] border-b border-[#aca899]">
                <button
                    onClick={handleZoom}
                    className="flex flex-col items-center px-2 py-1 hover:bg-white/50 border border-transparent hover:border-[#aca899] rounded transition-all group"
                >
                    <div className="p-1 mb-0.5 group-active:translate-y-0.5 transition-transform">
                        <ZoomIn className="w-6 h-6 text-[#1a5eb2]" />
                    </div>
                    <span className="text-[10px] text-black">Zoom ({Math.round(zoom * 100)}%)</span>
                </button>

                <div className="w-[1px] h-8 bg-[#aca899] mx-1" />

                <button
                    onClick={handleSave}
                    className="flex flex-col items-center px-2 py-1 hover:bg-white/50 border border-transparent hover:border-[#aca899] rounded transition-all group"
                >
                    <div className="p-1 mb-0.5 group-active:translate-y-0.5 transition-transform">
                        <Save className="w-6 h-6 text-[#1a5eb2]" />
                    </div>
                    <span className="text-[10px] text-black">Save</span>
                </button>

                <button
                    onClick={handlePrint}
                    className="flex flex-col items-center px-2 py-1 hover:bg-white/50 border border-transparent hover:border-[#aca899] rounded transition-all group"
                >
                    <div className="p-1 mb-0.5 group-active:translate-y-0.5 transition-transform">
                        <Printer className="w-6 h-6 text-[#1a5eb2]" />
                    </div>
                    <span className="text-[10px] text-black">Print</span>
                </button>

                <div className="w-[1px] h-8 bg-[#aca899] mx-1" />

                <button
                    onClick={onOpenContact}
                    className="flex flex-col items-center px-2 py-1 hover:bg-white/50 border border-transparent hover:border-[#aca899] rounded transition-all group"
                >
                    <div className="p-1 mb-0.5 group-active:translate-y-0.5 transition-transform">
                        <Mail className="w-6 h-6 text-[#1a5eb2]" />
                    </div>
                    <span className="text-[10px] text-black">Contact Me</span>
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-[#808080] p-8 flex justify-center items-start">
                <div
                    className="bg-white shadow-2xl transition-transform duration-200 origin-top"
                    style={{ transform: `scale(${zoom})` }}
                >
                    <img
                        src={resumeImg}
                        alt="My Resume"
                        className="max-w-none w-[800px] h-auto pointer-events-none select-none shadow-black/20"
                    />
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#ece9d8] border-t border-[#aca899] flex items-center px-2 text-[11px] text-[#444]">
                <span>My Resume.jpg - {Math.round(zoom * 100)}% zoom</span>
            </div>
        </div>
    );
};

export default ResumeWindow;
