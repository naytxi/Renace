import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { MainApp } from './components/MainApp';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Configure app metadata for mobile
    document.title = 'Renace - Apoyo Emocional';
    
    // Add favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.setAttribute('rel', 'icon');
    favicon.setAttribute('type', 'image/svg+xml');
    favicon.setAttribute('href', '/icon.svg');
    if (!document.querySelector('link[rel="icon"]')) {
      document.head.appendChild(favicon);
    }

    // Add apple touch icon
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') || document.createElement('link');
    appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
    appleTouchIcon.setAttribute('href', '/icon.svg');
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
      document.head.appendChild(appleTouchIcon);
    }

    // Add theme color
    const themeColor = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
    themeColor.setAttribute('name', 'theme-color');
    themeColor.setAttribute('content', '#A855F7');
    if (!document.querySelector('meta[name="theme-color"]')) {
      document.head.appendChild(themeColor);
    }

    // Add apple mobile web app capable
    const appleCapable = document.querySelector('meta[name="apple-mobile-web-app-capable"]') || document.createElement('meta');
    appleCapable.setAttribute('name', 'apple-mobile-web-app-capable');
    appleCapable.setAttribute('content', 'yes');
    if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
      document.head.appendChild(appleCapable);
    }

    // Add apple mobile web app status bar style
    const statusBarStyle = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]') || document.createElement('meta');
    statusBarStyle.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
    statusBarStyle.setAttribute('content', 'default');
    if (!document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')) {
      document.head.appendChild(statusBarStyle);
    }

    // Add apple mobile web app title
    const appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]') || document.createElement('meta');
    appleTitle.setAttribute('name', 'apple-mobile-web-app-title');
    appleTitle.setAttribute('content', 'Renace');
    if (!document.querySelector('meta[name="apple-mobile-web-app-title"]')) {
      document.head.appendChild(appleTitle);
    }

    // Add manifest
    const manifest = document.querySelector('link[rel="manifest"]') || document.createElement('link');
    manifest.setAttribute('rel', 'manifest');
    manifest.setAttribute('href', '/manifest.json');
    if (!document.querySelector('link[rel="manifest"]')) {
      document.head.appendChild(manifest);
    }

    // Check user session
    const user = localStorage.getItem('breakupAppUser');
    if (user) {
      setUsername(user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user: string) => {
    localStorage.setItem('breakupAppUser', user);
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('breakupAppUser');
    setUsername('');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <MainApp username={username} onLogout={handleLogout} />
      )}
    </div>
  );
}