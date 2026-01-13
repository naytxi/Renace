import { Home, CalendarDays, MessageSquareHeart, LogOut } from 'lucide-react';
import { View } from './MainApp';

interface NavbarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onLogout: () => void;
}

export function Navbar({ currentView, setCurrentView, onLogout }: NavbarProps) {
  const navItems = [
    { id: 'home' as View, icon: Home, label: 'Inicio' },
    { id: 'calendar' as View, icon: CalendarDays, label: 'Tareas' },
    { id: 'phrases' as View, icon: MessageSquareHeart, label: 'Frases' },
  ];

  return (
    <>
      {/* Header para desktop */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-2 rounded-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Renace</h1>
          </div>
          
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-gray-800 transition flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* Bottom Navigation para móvil */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition ${
                  isActive
                    ? 'text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
