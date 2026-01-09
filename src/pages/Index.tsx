import { useState, useCallback, useEffect } from 'react';
import BootScreen from '@/components/xp/BootScreen';
import LoginScreen from '@/components/xp/LoginScreen';
import WelcomeScreen from '@/components/xp/WelcomeScreen';
import Desktop from '@/components/xp/Desktop';

type AppState = 'boot' | 'login' | 'welcome' | 'desktop';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('boot');
  const [crtEnabled, setCrtEnabled] = useState(() => {
    const saved = localStorage.getItem('crtEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Persist CRT state
  useEffect(() => {
    localStorage.setItem('crtEnabled', JSON.stringify(crtEnabled));
  }, [crtEnabled]);

  const handleBootComplete = useCallback(() => {
    setAppState('login');
  }, []);

  const handleLogin = useCallback(() => {
    // Play startup sound
    try {
      const audio = new Audio('https://www.myinstants.com/media/sounds/windows-xp-startup.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => { });
    } catch { }

    setAppState('welcome');
  }, []);

  const handleWelcomeComplete = useCallback(() => {
    setAppState('desktop');
  }, []);

  return (
    <div className="h-[100dvh] w-[100dvw] overflow-hidden bg-black select-none relative">
      {/* Global CRT Effect */}
      {crtEnabled && <div className="crt-overlay pointer-events-none" />}

      {appState === 'boot' && <BootScreen onComplete={handleBootComplete} />}

      {appState === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          userName="Md Mujahidul Islam Adib"
          userRole="Visual Designer"
        />
      )}

      {appState === 'welcome' && <WelcomeScreen onComplete={handleWelcomeComplete} />}

      {appState === 'desktop' && (
        <Desktop
          crtEnabled={crtEnabled}
          onCrtToggle={() => setCrtEnabled(!crtEnabled)}
        />
      )}
    </div>
  );
};

export default Index;
