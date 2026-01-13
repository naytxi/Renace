import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Política de Privacidad
        </h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              1. Información que recopilamos
            </h2>
            <p className="leading-relaxed">
              Renace es una aplicación completamente privada que funciona en tu
              navegador. La información que ingresas (nombre, fecha de ruptura,
              pronombres, motivo, tareas y frases) se almacena únicamente en el
              localStorage de tu dispositivo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              2. Cómo usamos tu información
            </h2>
            <p className="leading-relaxed mb-3">
              Toda tu información permanece en tu dispositivo y nunca se envía a
              ningún servidor externo. Los datos se utilizan exclusivamente para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Personalizar tu experiencia en la aplicación</li>
              <li>Mostrar tu progreso y estadísticas</li>
              <li>Recordar tus tareas y frases motivacionales</li>
              <li>Mantener tu sesión activa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              3. Almacenamiento de datos
            </h2>
            <p className="leading-relaxed">
              Todos los datos se almacenan localmente en tu navegador mediante
              localStorage. Esto significa que:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>
                Solo tú tienes acceso a tu información desde este dispositivo y
                navegador
              </li>
              <li>
                Si borras los datos de navegación o el caché, perderás tu
                información
              </li>
              <li>
                Si cambias de dispositivo o navegador, necesitarás volver a
                ingresar tus datos
              </li>
              <li>No realizamos copias de seguridad de tu información</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              4. Compartir información
            </h2>
            <p className="leading-relaxed">
              No compartimos, vendemos ni transferimos tu información personal a
              terceros. Al no tener servidores externos, tu información nunca
              sale de tu dispositivo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              5. Seguridad
            </h2>
            <p className="leading-relaxed">
              Aunque implementamos medidas de seguridad básicas, es importante
              que sepas que localStorage es accesible desde tu navegador. Te
              recomendamos:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>No usar dispositivos públicos o compartidos</li>
              <li>Mantener tu dispositivo seguro con contraseña</li>
              <li>No compartir tu sesión de navegador con otras personas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              6. Eliminación de datos
            </h2>
            <p className="leading-relaxed">
              Puedes eliminar toda tu información en cualquier momento cerrando
              sesión en la aplicación, o borrando los datos de navegación de tu
              navegador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              7. Cookies y tecnologías similares
            </h2>
            <p className="leading-relaxed">
              Esta aplicación no utiliza cookies. Solo utiliza localStorage para
              guardar tu información localmente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              8. Cambios a esta política
            </h2>
            <p className="leading-relaxed">
              Podemos actualizar esta política de privacidad ocasionalmente. Te
              recomendamos revisarla periódicamente.
            </p>
          </section>

          <section className="bg-purple-50 rounded-xl p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Importante
            </h2>
            <p className="leading-relaxed">
              Renace es una herramienta de apoyo emocional, pero no sustituye la
              ayuda profesional. Si estás pasando por un momento muy difícil, te
              recomendamos buscar apoyo de un psicólogo o terapeuta profesional.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Última actualización: {new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
