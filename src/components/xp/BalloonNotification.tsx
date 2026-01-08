import { useState, useEffect, useRef } from 'react';

interface BalloonNotificationProps {
  title: string;
  message: string;
  links?: { label: string; onClick: () => void }[];
  icon?: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
  playSound?: boolean;
}

const BalloonNotification = ({
  title,
  message,
  links,
  icon,
  show,
  onClose,
  duration = 8000,
  playSound = true,
}: BalloonNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (show) {
      // Play notification sound
      if (playSound) {
        const audio = new Audio('https://www.myinstants.com/media/sounds/tada.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
        audioRef.current = audio;
      }

      const showTimer = setTimeout(() => setIsVisible(true), 100);
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, duration);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }
  }, [show, duration, onClose, playSound]);

  if (!show) return null;

  return (
    <div
      className={`xp-balloon fixed bottom-[45px] right-[12px] z-[10002] p-3 max-w-[300px] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="xp-balloon-tail" />
      
      <div className="flex items-start gap-2.5">
        {icon && <img src={icon} alt="" className="w-8 h-8 flex-shrink-0" />}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-foreground">{title}</span>
            <button
              className="text-muted-foreground hover:text-foreground text-xs font-bold ml-2"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-foreground mt-1.5 leading-relaxed">{message}</p>
          {links && links.length > 0 && (
            <div className="mt-2 text-xs">
              <span className="text-foreground">Get Started: </span>
              {links.map((link, i) => (
                <span key={link.label}>
                  <button 
                    className="text-blue-600 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      link.onClick();
                    }}
                  >
                    {link.label}
                  </button>
                  {i < links.length - 1 && <span className="text-foreground"> | </span>}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BalloonNotification;
