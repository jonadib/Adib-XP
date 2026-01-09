import { useEffect, useState } from 'react';
import profileImg from '@/assets/profile.png';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
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
    <div className="fixed inset-0 z-[9500] flex flex-col font-tahoma select-none">
      {/* Top Band */}
      <div className="h-[15%] w-full bg-[#003399] border-b border-black/20" />

      {/* Main Section */}
      <div className="flex-1 xp-login-bg flex items-center justify-center relative overflow-hidden">
        <div className="text-white text-5xl md:text-7xl font-normal italic drop-shadow-2xl animate-fade-in tracking-tight">
          welcome
        </div>
      </div>

      {/* Bottom Separator */}
      <div className="xp-login-divider" />

      {/* Bottom Band */}
      <div className="h-[15%] w-full bg-[#003399]" />
    </div>
  );
};

export default WelcomeScreen;
