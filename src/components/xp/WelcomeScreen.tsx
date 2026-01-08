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
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 xp-welcome-bg z-[9500] flex items-center justify-center gap-5">
      <div className="w-12 h-12 border-2 border-white rounded overflow-hidden">
        <img 
          src={profileImg} 
          alt="User" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-white text-2xl md:text-3xl font-bold italic drop-shadow-lg">
        Welcome
      </div>
    </div>
  );
};

export default WelcomeScreen;
