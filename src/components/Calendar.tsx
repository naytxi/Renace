import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

// Function to get tasks based on days since breakup
const getTasksForPhase = (daysSinceBreakup: number): string[] => {
  // Phase 1: Days 1-7 (Acute crisis - Survival mode)
  if (daysSinceBreakup <= 7) {
    return [
      'Despierta y levántate de la cama',
      'Bebe un vaso de agua',
      'Si has llorado, está bien - es parte del proceso',
      'Come algo, aunque sea pequeño',
      'Dúchate (no importa la hora)',
      'Mantener contacto cero',
      'Respira profundamente 5 veces',
      'Avisa a alguien que estás bien',
      'Recuerda: sobrevivir hoy es suficiente',
    ];
  }
  
  // Phase 2: Days 8-21 (Stabilization - Processing)
  if (daysSinceBreakup <= 21) {
    return [
      'Levántate y haz tu cama',
      'Bebe agua y desayuna',
      'Dúchate y arréglate',
      'Sal a caminar 10 minutos',
      'Mantener contacto cero',
      'Escribe cómo te sientes hoy',
      'Habla con alguien que te apoye',
      'Haz una actividad que solías disfrutar',
      'Permítete sentir sin juzgarte',
    ];
  }
  
  // Phase 3: Days 22-60 (Recovery - Rebuilding)
  if (daysSinceBreakup <= 60) {
    return [
      'Empieza el día con energía',
      'Cuida tu alimentación',
      'Haz ejercicio o sal a caminar',
      'Mantener contacto cero',
      'Dedica tiempo a un hobby',
      'Conecta con amigos o familia',
      'Aprende algo nuevo hoy',
      'Haz algo solo por ti',
      'Reconoce tu progreso',
    ];
  }
  
  // Phase 4: Days 61+ (Empowerment - Growth)
  return [
    'Buenos días - eres más fuerte de lo que crees',
    'Cuida tu cuerpo con cariño',
    'Ejercítate - celebra lo que puedes hacer',
    'Trabaja en tus metas personales',
    'Mantener contacto cero (opcional - tú decides)',
    'Socializa y crea nuevas memorias',
    'Agradece algo bueno de hoy',
    'Visualiza tu futuro con ilusión',
    'Recuerda: ya no solo sobrevives, prosperas',
  ];
};

export function Calendar({ username }: { username: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [daysSinceBreakup, setDaysSinceBreakup] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Calculate days since breakup
    const userData = localStorage.getItem(`breakupAppData_${username}`);
    let days = 0;
    let phase = 'Inicio';
    
    if (userData) {
      const data = JSON.parse(userData);
      if (data.breakupDate) {
        days = Math.floor((new Date().getTime() - new Date(data.breakupDate).getTime()) / (1000 * 60 * 60 * 24));
        
        // Determine phase
        if (days <= 7) {
          phase = 'Supervivencia - Semana 1';
        } else if (days <= 21) {
          phase = 'Estabilización - Semanas 2-3';
        } else if (days <= 60) {
          phase = 'Recuperación - Meses 1-2';
        } else {
          phase = 'Empoderamiento - ¡Mira cuánto has avanzado!';
        }
      }
    }
    
    setDaysSinceBreakup(days);
    setCurrentPhase(phase);

    // Get appropriate tasks for current phase
    const DEFAULT_TASKS = getTasksForPhase(days);

    const saved = localStorage.getItem(`breakupAppTasks_${username}`);
    if (saved) {
      const allTasks: Task[] = JSON.parse(saved);
      // Filter tasks for today
      const todayTasks = allTasks.filter((task) => task.date === today);
      
      // If no tasks for today, create default tasks
      if (todayTasks.length === 0) {
        const defaultTasksForToday = DEFAULT_TASKS.map((text, index) => ({
          id: `${today}-${index}`,
          text,
          completed: false,
          date: today,
        }));
        const updatedTasks = [...allTasks, ...defaultTasksForToday];
        localStorage.setItem(`breakupAppTasks_${username}`, JSON.stringify(updatedTasks));
        setTasks(defaultTasksForToday);
      } else {
        setTasks(todayTasks);
      }
    } else {
      // First time - create default tasks
      const defaultTasksForToday = DEFAULT_TASKS.map((text, index) => ({
        id: `${today}-${index}`,
        text,
        completed: false,
        date: today,
      }));
      localStorage.setItem(`breakupAppTasks_${username}`, JSON.stringify(defaultTasksForToday));
      setTasks(defaultTasksForToday);
    }
  }, [today, username]);

  const toggleTask = (id: string) => {
    const saved = localStorage.getItem(`breakupAppTasks_${username}`);
    if (saved) {
      const allTasks: Task[] = JSON.parse(saved);
      const updatedTasks = allTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem(`breakupAppTasks_${username}`, JSON.stringify(updatedTasks));
      setTasks(updatedTasks.filter((task) => task.date === today));
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    const saved = localStorage.getItem(`breakupAppTasks_${username}`);
    const allTasks: Task[] = saved ? JSON.parse(saved) : [];
    
    const newTaskObj: Task = {
      id: `${today}-${Date.now()}`,
      text: newTask.trim(),
      completed: false,
      date: today,
    };

    const updatedTasks = [...allTasks, newTaskObj];
    localStorage.setItem(`breakupAppTasks_${username}`, JSON.stringify(updatedTasks));
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
    setShowAddTask(false);
  };

  const deleteTask = (id: string) => {
    const saved = localStorage.getItem(`breakupAppTasks_${username}`);
    if (saved) {
      const allTasks: Task[] = JSON.parse(saved);
      const updatedTasks = allTasks.filter((task) => task.id !== id);
      localStorage.setItem(`breakupAppTasks_${username}`, JSON.stringify(updatedTasks));
      setTasks(updatedTasks.filter((task) => task.date === today));
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tareas de hoy
          </h2>
          <p className="text-gray-600">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          
          {/* Phase Indicator */}
          {daysSinceBreakup > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full">
              <span className="text-sm text-purple-700 font-medium">
                Día {daysSinceBreakup} • {currentPhase}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progreso del día</span>
            <span className="text-sm font-medium text-purple-600">
              {completedCount} / {totalCount}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Motivational Message */}
        {progress === 100 && totalCount > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-800 font-medium text-center">
              🎉 ¡Increíble! Has completado todas tus tareas de hoy. ¡Sigue así!
            </p>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500 fill-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 hover:text-purple-500 transition" />
                )}
              </button>

              <span
                className={`flex-1 ${
                  task.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-800'
                }`}
              >
                {task.text}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Task */}
        {showAddTask ? (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Nueva tarea..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
            <button
              onClick={addTask}
              className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-xl hover:from-pink-500 hover:to-purple-600 transition"
            >
              Agregar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddTask(true)}
            className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-400 hover:text-purple-600 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar tarea personalizada
          </button>
        )}
      </div>

      {/* Encouragement Card */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-3">💪 Recuerda</h3>
        <p className="leading-relaxed">
          Cada pequeña tarea que completas es una victoria. En momentos difíciles,
          las cosas más simples pueden parecer montañas. Celebra cada logro,
          por pequeño que sea.
        </p>
      </div>
    </div>
  );
}