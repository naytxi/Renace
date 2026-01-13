import { useState, useEffect } from 'react';
import { Save, CheckCircle, Edit } from 'lucide-react';

interface HomeProps {
  username: string;
}

interface UserData {
  breakupDate: string;
  pronouns: string;
  reason: string;
  zeroContact: boolean;
  completed: boolean;
}

export function Home({ username }: HomeProps) {
  const [userData, setUserData] = useState<UserData>({
    breakupDate: '',
    pronouns: '',
    reason: '',
    zeroContact: false,
    completed: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`breakupAppData_${username}`);
    if (saved) {
      const data = JSON.parse(saved);
      setUserData(data);
      setIsEditing(!data.completed);
    } else {
      setIsEditing(true);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = { ...userData, completed: true };
    localStorage.setItem(`breakupAppData_${username}`, JSON.stringify(dataToSave));
    setUserData(dataToSave);
    setIsEditing(false);
  };

  const daysSinceBreakup = userData.breakupDate
    ? Math.floor((new Date().getTime() - new Date(userData.breakupDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  if (!isEditing && userData.completed) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              ¡Hola, {username}! 👋
            </h2>
            <button
              onClick={() => setIsEditing(true)}
              className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
            >
              <Edit className="w-5 h-5" />
              <span>Editar</span>
            </button>
          </div>

          {daysSinceBreakup >= 0 && (
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Has recorrido</p>
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  {daysSinceBreakup}
                </p>
                <p className="text-gray-600 mt-2">
                  {daysSinceBreakup === 1 ? 'día' : 'días'} de sanación
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Fecha de ruptura</p>
              <p className="text-gray-800 font-medium">
                {new Date(userData.breakupDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Pronombres</p>
              <p className="text-gray-800 font-medium">{userData.pronouns}</p>
            </div>

            {userData.reason && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Motivo</p>
                <p className="text-gray-800">{userData.reason}</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Contacto cero</p>
              <p className="text-gray-800 font-medium">
                {userData.zeroContact ? '✓ Sí, mantendré contacto cero' : '✗ No'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Mensaje para ti</h3>
          <p className="leading-relaxed">
            Recuerda que este proceso es tuyo y va a tu ritmo. Cada día que
            pasas trabajando en ti mism{userData.pronouns === 'Ella' ? 'a' : 'o'} es un día más cerca de la mejor
            versión de ti. Estás siendo muy valiente. 💜
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Comencemos tu proceso de sanación
          </h2>
          <p className="text-gray-600">
            Completa esta información para personalizar tu experiencia
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label htmlFor="breakupDate" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de ruptura *
            </label>
            <input
              type="date"
              id="breakupDate"
              value={userData.breakupDate}
              onChange={(e) => setUserData({ ...userData, breakupDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700 mb-2">
              Pronombres *
            </label>
            <select
              id="pronouns"
              value={userData.pronouns}
              onChange={(e) => setUserData({ ...userData, pronouns: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">Selecciona...</option>
              <option value="Él">Él</option>
              <option value="Ella">Ella</option>
              <option value="Elle">Elle</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Motivo de la ruptura (opcional)
            </label>
            <textarea
              id="reason"
              value={userData.reason}
              onChange={(e) => setUserData({ ...userData, reason: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Escribe brevemente qué ocurrió..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Esto es solo para ti, te ayudará a procesar
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={userData.zeroContact}
                onChange={(e) => setUserData({ ...userData, zeroContact: e.target.checked })}
                className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <div>
                <p className="font-medium text-gray-800">Contacto cero</p>
                <p className="text-sm text-gray-600 mt-1">
                  Me comprometo a mantener contacto cero para sanar adecuadamente
                </p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-xl hover:from-pink-500 hover:to-purple-600 transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Guardar información
          </button>
        </form>
      </div>
    </div>
  );
}