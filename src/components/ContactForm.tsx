'use client';

import React, { useState } from 'react';
import { pushEvent } from '@/lib/datalayer';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje.');
      }

      // Evento de conversión para GTM
      pushEvent({
        event: 'generate_lead',
        form_location: 'contact_form_homepage'
      });

      setSubmitMessage('¡Gracias! Su mensaje ha sido enviado. Nos pondremos en contacto con usted a la brevedad.');
      setFormData({ name: '', email: '', company: '', message: '' });

    } catch (err: any) {
      setSubmitError(err.message || 'Ocurrió un error. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] rounded-lg shadow-xl mt-12">
      <h2 className="text-3xl font-bold text-center text-white mb-2">Agende una Consultoría con un Director</h2>
      <p className="text-center text-gray-300 mb-8">Cuéntenos sobre su empresa. Estamos listos para ser el socio estratégico que le ayude a profesionalizar sus ventas.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre Completo</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00DD82] focus:border-[#00DD82] sm:text-sm text-white" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo Electrónico</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00DD82] focus:border-[#00DD82] sm:text-sm text-white" />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300">Empresa</label>
          <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00DD82] focus:border-[#00DD82] sm:text-sm text-white" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Su Mensaje</label>
          <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00DD82] focus:border-[#00DD82] sm:text-sm text-white"></textarea>
        </div>
        {submitMessage && (
          <div className="p-3 text-green-400 bg-green-900/20 border border-green-600 rounded-md">
            {submitMessage}
          </div>
        )}
        {submitError && (
          <div className="p-3 text-red-400 bg-red-900/20 border border-red-600 rounded-md">
            {submitError}
          </div>
        )}
        <div>
          <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#00DD82] hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 uppercase font-bold disabled:opacity-50">
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
