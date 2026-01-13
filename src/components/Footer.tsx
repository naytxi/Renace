import { Heart } from 'lucide-react';
import { View } from './MainApp';

interface FooterProps {
  setCurrentView: (view: View) => void;
}

export function Footer({ setCurrentView }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span>Hecho con</span>
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          <span>para ti</span>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">
          Todo irá mejor, un día a la vez
        </p>
        
        {/* Professional Help Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4 mx-auto max-w-2xl">
          <p className="text-sm text-amber-800 text-center leading-relaxed">
            ⚠️ Esta app es solo de apoyo emocional. Si necesitas ayuda profesional, 
            por favor acude a un psicólogo o terapeuta. Tu bienestar es lo más importante.
          </p>
        </div>
        
        <div className="text-center mt-4 mb-2">
          <button
            onClick={() => setCurrentView('privacy')}
            className="text-xs text-purple-600 hover:text-purple-700 underline"
          >
            Política de Privacidad
          </button>
        </div>
      </div>
    </footer>
  );
}