import React from 'react';

const ValuePath: React.FC = () => {
  return (
    <div className="mt-10 w-full max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">

            {/* Paso 1 */}
            <div className="relative group">
                <span className="cursor-pointer p-2 transition-colors duration-300 group-hover:text-green-400">PLAN DE ACCIÓN</span>
                <div className="absolute top-full mt-3 w-56 bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg text-xs text-left z-10 normal-case opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <h4 className="font-bold text-white mb-1">Diagnóstico IA Inmediato</h4>
                    <p className="text-gray-400">Nuestra IA analiza tu web y la de tus competidores para generar un plan de acción enfocado en resultados de negocio.</p>
                </div>
            </div>

            <span className="hidden md:block text-gray-600">&bull;</span>

            {/* Paso 2 */}
            <div className="relative group">
                <span className="cursor-pointer p-2 transition-colors duration-300 group-hover:text-green-400">REUNIÓN DE AJUSTE</span>
                <div className="absolute top-full mt-3 w-56 bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg text-xs text-left z-10 normal-case opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <h4 className="font-bold text-white mb-1">Reunión Estratégica</h4>
                    <p className="text-gray-400">Un especialista de Kapi revisa el plan contigo para validarlo, ajustarlo y definir objetivos medibles.</p>
                </div>
            </div>

            <span className="hidden md:block text-gray-600">&bull;</span>

            {/* Paso 3 */}
            <div className="relative group">
                <span className="cursor-pointer p-2 transition-colors duration-300 group-hover:text-green-400">EJECUCIÓN</span>
                <div className="absolute top-full mt-3 w-56 bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg text-xs text-left z-10 normal-case opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <h4 className="font-bold text-white mb-1">Implementación Experta</h4>
                    <p className="text-gray-400">Nuestro equipo se encarga de implementar las mejoras técnicas, de contenido y de campañas.</p>
                </div>
            </div>

            <span className="hidden md:block text-gray-600">&bull;</span>

            {/* Paso 4 */}
            <div className="relative group">
                <span className="cursor-pointer p-2 transition-colors duration-300 group-hover:text-green-400">RESULTADOS</span>
                <div className="absolute top-full mt-3 w-56 bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg text-xs text-left z-10 normal-case opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <h4 className="font-bold text-white mb-1">Optimización Continua</h4>
                    <p className="text-gray-400">Medimos el impacto de cada acción, reportamos el progreso y ajustamos la estrategia para maximizar tu ROI.</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ValuePath;
