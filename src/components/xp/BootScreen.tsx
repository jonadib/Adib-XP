import { useEffect, useState } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-[10000] flex flex-col font-tahoma select-none">
      <div className="flex-1 flex flex-col items-center justify-center pb-20">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <img
            src="https://wallpapers.com/images/hd/classic-windows-logo-72bka335lvt8v1fb.jpg"
            alt="Windows Logo"
            className="w-28 h-28 md:w-40 md:h-40 object-contain mb-2 animate-fade-in"
          />
          <div className="text-center group">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter flex items-center justify-center gap-1.5">
              ADIB <span className="text-[#ff6600] italic lowercase font-black text-3xl md:text-4xl">xp</span>
            </h1>
            <p className="text-white text-[10px] md:text-xs font-normal italic tracking-wide mt-[-2px]">Visual Designer</p>
          </div>
        </div>

        {/* Loading Bar Container */}
        <div className="w-32 md:w-48 h-3.5 border-2 border-[#9b9b9b] rounded p-[1px] bg-black shadow-[0_0_8px_rgba(255,255,255,0.1)]">
          <div className="h-full bg-gradient-to-r from-[#3a61ff] via-[#4a9eff] to-[#001da0] animate-boot-load rounded-sm" />
        </div>
      </div>

      {/* Footer */}
      <div className="h-24 w-full px-8 md:px-16 flex items-center justify-center md:justify-between">
        <div className="hidden md:flex flex-col text-white/60">
          <span className="text-[11px] font-medium opacity-80">For the best experience</span>
          <span className="text-[11px] font-bold">Enter Full Screen (F11)</span>
        </div>

        <div className="flex items-center">
          <span className="text-white font-black italic text-2xl tracking-tight drop-shadow-lg opacity-90">
            Portfolio<span className="text-[10px] align-top relative top-[-4px] ml-0.5">®</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
