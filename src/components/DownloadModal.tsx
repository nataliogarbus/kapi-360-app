import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string, subscribe: boolean) => void;
  status: 'idle' | 'submitting' | 'error';
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, onConfirm, status }) => {
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(true);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFormError('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setFormError('Por favor, introduce un email válido.');
      return;
    }
    setFormError('');
    onConfirm(email, subscribe);
  };

  const getButtonContent = () => {
    if (status === 'submitting') {
      return <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Enviando...</>;
    }
    if (status === 'error') {
      return 'Reintentar Envío';
    }
    return 'Descargar PDF y Registrar';
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
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white disabled:opacity-50" disabled={status === 'submitting'}>
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
              {formError && <p className="text-red-400 text-sm">{formError}</p>}
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

            {status === 'error' && (
              <p className="text-red-400 text-sm mt-4 text-center">Hubo un error al enviar el correo. Por favor, revisa la configuración del servidor o inténtalo más tarde.</p>
            )}

            <button 
              onClick={handleSubmit}
              disabled={status === 'submitting'}
              className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-md mt-8 hover:bg-cyan-600 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getButtonContent()}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DownloadModal;