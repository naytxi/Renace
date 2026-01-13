import { useState } from 'react';
import { Sun } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-4 rounded-full mb-4">
              <Sun className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Renace</h1>
            <p className="text-gray-600 text-center">
              Tu espacio seguro para sanar y crecer
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cómo te llamas?
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Tu nombre"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-xl hover:from-pink-500 hover:to-purple-600 transition transform hover:scale-105 active:scale-95"
            >
              Comenzar mi proceso
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Tus datos se guardan solo en tu dispositivo
          </p>
        </div>
      </div>
    </div>
  );
}