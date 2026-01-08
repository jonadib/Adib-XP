import { useState, useCallback } from 'react';
import BootScreen from '@/components/xp/BootScreen';
import LoginScreen from '@/components/xp/LoginScreen';
import WelcomeScreen from '@/components/xp/WelcomeScreen';
import Desktop from '@/components/xp/Desktop';

type AppState = 'boot' | 'login' | 'welcome' | 'desktop';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('boot');

  const handleBootComplete = useCallback(() => {
    setAppState('login');
  }, []);

  const handleLogin = useCallback(() => {
    // Play startup sound
    try {
      const audio = new Audio('https://www.myinstants.com/media/sounds/windows-xp-startup.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch {}
    
    setAppState('welcome');
  }, []);

  const handleWelcomeComplete = useCallback(() => {
    setAppState('desktop');
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black select-none">
      {appState === 'boot' && <BootScreen onComplete={handleBootComplete} />}
      
      {appState === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          userName="Md Mujahidul Islam Adib"
          userRole="Visual Designer"
        />
      )}
      
      {appState === 'welcome' && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      
      {appState === 'desktop' && <Desktop />}
    </div>
  );
};

export default Index;
