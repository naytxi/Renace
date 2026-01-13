import { useState, useEffect } from 'react';
import { Save, Trash2, Sparkles, Heart } from 'lucide-react';

interface Phrase {
  id: string;
  text: string;
  date: string;
}

export function Phrases({ username }: { username: string }) {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [newPhrase, setNewPhrase] = useState('');
  const [randomPhrase, setRandomPhrase] = useState<Phrase | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`breakupAppPhrases_${username}`);
    if (saved) {
      const allPhrases: Phrase[] = JSON.parse(saved);
      setPhrases(allPhrases);
      
      // Show a random phrase on load
      if (allPhrases.length > 0) {
        const random = allPhrases[Math.floor(Math.random() * allPhrases.length)];
        setRandomPhrase(random);
      }
    }
  }, [username]);

  const addPhrase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhrase.trim()) return;

    const newPhraseObj: Phrase = {
      id: Date.now().toString(),
      text: newPhrase.trim(),
      date: new Date().toISOString(),
    };

    const updatedPhrases = [...phrases, newPhraseObj];
    localStorage.setItem(`breakupAppPhrases_${username}`, JSON.stringify(updatedPhrases));
    setPhrases(updatedPhrases);
    setNewPhrase('');
  };

  const deletePhrase = (id: string) => {
    const updatedPhrases = phrases.filter((phrase) => phrase.id !== id);
    localStorage.setItem(`breakupAppPhrases_${username}`, JSON.stringify(updatedPhrases));
    setPhrases(updatedPhrases);
    
    if (randomPhrase?.id === id) {
      setRandomPhrase(null);
    }
  };

  const showRandomPhrase = () => {
    if (phrases.length > 0) {
      const random = phrases[Math.floor(Math.random() * phrases.length)];
      setRandomPhrase(random);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Random Phrase Display */}
      {randomPhrase && (
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl shadow-lg p-8 mb-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <Sparkles className="w-6 h-6" />
            <button
              onClick={showRandomPhrase}
              className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition backdrop-blur-sm"
            >
              Otra frase
            </button>
          </div>
          <p className="text-xl leading-relaxed mb-4">
            "{randomPhrase.text}"
          </p>
          <p className="text-sm text-white/80">
            Escrito el {new Date(randomPhrase.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      )}

      {/* Add New Phrase */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Mensajes para tu futuro yo
          </h2>
          <p className="text-gray-600">
            Escribe cómo te sientes ahora y qué necesitas recordar en el futuro.
            Estas frases aparecerán aleatoriamente para motivarte.
          </p>
        </div>

        <form onSubmit={addPhrase} className="space-y-4">
          <div>
            <textarea
              value={newPhrase}
              onChange={(e) => setNewPhrase(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Ejemplo: Mereces ser amado plenamente. No te conformes con menos."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-xl hover:from-pink-500 hover:to-purple-600 transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Guardar frase
          </button>
        </form>
      </div>

      {/* Saved Phrases List */}
      {phrases.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Tus frases guardadas ({phrases.length})
          </h3>
          <div className="space-y-3">
            {phrases.map((phrase) => (
              <div
                key={phrase.id}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 group hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-gray-800 mb-2">{phrase.text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(phrase.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => deletePhrase(phrase.id)}
                    className="opacity-0 group-hover:opacity-100 transition text-red-500 hover:text-red-600 flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {phrases.length === 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8 text-center">
          <div className="inline-block bg-white rounded-full p-4 mb-4">
            <Sparkles className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Comienza a escribir
          </h3>
          <p className="text-gray-600">
            Tus frases de motivación aparecerán aquí. Escríbete mensajes
            que necesites recordar en momentos difíciles.
          </p>
        </div>
      )}

      {/* Info Card */}
      <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">💡 Tip</h3>
        <p className="text-gray-700 leading-relaxed">
          Escribe cómo te sientes en este momento, qué has aprendido, o qué
          deseas para tu futuro. Estos mensajes te recordarán tu fortaleza
          cuando más lo necesites.
        </p>
      </div>
    </div>
  );
}