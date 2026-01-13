import { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Home } from './Home';
import { Calendar } from './Calendar';
import { Phrases } from './Phrases';
import { PrivacyPolicy } from './PrivacyPolicy';

interface MainAppProps {
  username: string;
  onLogout: () => void;
}

export type View = 'home' | 'calendar' | 'phrases' | 'privacy';

export function MainApp({ username, onLogout }: MainAppProps) {
  const [currentView, setCurrentView] = useState<View>('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        onLogout={onLogout}
      />
      
      <main className="flex-1 pb-20">
        {currentView === 'home' && <Home username={username} />}
        {currentView === 'calendar' && <Calendar username={username} />}
        {currentView === 'phrases' && <Phrases username={username} />}
        {currentView === 'privacy' && <PrivacyPolicy onClose={() => setCurrentView('home')} />}
      </main>

      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}