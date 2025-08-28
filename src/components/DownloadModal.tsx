import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string, subscribe: boolean) => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, introduce un email válido.');
      return;
    }
    setError('');
    onConfirm(email, subscribe);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
              <X />
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">Obtén tu Informe Completo</h3>
            <p className="text-slate-400 mb-6">Introduce tu correo para descargar el informe en PDF y recibir un análisis detallado.</p>
            
            <div className="space-y-4">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-slate-900 border border-slate-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  id="subscribe"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                  className="w-4 h-4 bg-slate-700 border-slate-500 rounded text-cyan-500 focus:ring-cyan-600"
                />
                <label htmlFor="subscribe" className="ml-2 text-sm text-slate-300">Suscribirme al newsletter con consejos de marketing IA.</label>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-md mt-8 hover:bg-cyan-600 transition-colors duration-300"
            >
              Descargar PDF y Registrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DownloadModal;
