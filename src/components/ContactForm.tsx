'use client';

import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    city: '',
    phone: '',
    message: '',
    newsletter: false,
    register: false, // This will be disabled
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje.');
      }

      setSubmitMessage('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
      setFormData({ // Clear form after successful submission
        name: '',
        email: '',
        company: '',
        city: '',
        phone: '',
        message: '',
        newsletter: false,
        register: false,
      });

    } catch (err: any) {
      setSubmitError(err.message || 'Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      console.error('Error submitting contact form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] rounded-lg shadow-xl mt-12">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Contáctanos</h2>
      <p className="text-center text-gray-300 mb-8">
        ¿Tienes alguna pregunta o quieres saber más sobre cómo Kapi puede ayudarte? Rellena el formulario y nos pondremos en contacto contigo.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre Completo</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300">Empresa</label>
          <input
            type="text"
            name="company"
            id="company"
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300">Ciudad</label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Teléfono</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Tu Mensaje</label>
          <textarea
            name="message"
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
          ></textarea>
        </div>
        <div className="flex items-center">
          <input
            id="newsletter"
            name="newsletter"
            type="checkbox"
            checked={formData.newsletter}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
          />
          <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-300">
            Suscribirme al newsletter
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="register"
            name="register"
            type="checkbox"
            checked={formData.register}
            onChange={handleChange}
            disabled // Disabled as requested
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700 cursor-not-allowed"
          />
          <label htmlFor="register" className="ml-2 block text-sm text-gray-500 cursor-not-allowed">
            Registrarme (funcionalidad futura)
          </label>
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;