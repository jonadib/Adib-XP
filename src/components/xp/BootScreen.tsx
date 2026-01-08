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
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center">
      <div className="text-center text-white mb-5">
        <h1 className="text-xl md:text-2xl font-bold italic">
          Microsoft<br />
          Windows<span className="text-orange-500">X</span><span className="text-green-600">P</span>
        </h1>
      </div>
      <div className="w-48 h-4 border-2 border-gray-600 rounded p-0.5">
        <div className="h-full bg-gradient-to-r from-blue-800 to-blue-400 animate-boot-load rounded-sm" />
      </div>
    </div>
  );
};

export default BootScreen;
