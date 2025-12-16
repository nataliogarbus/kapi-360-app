'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { pushEvent } from '@/lib/datalayer';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { sendContactEmail } from '@/app/actions';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

const ContactFormContent: React.FC<ContactFormProps> = ({
  title,
  subtitle
}) => {
  const { language } = useLanguage();
  // @ts-ignore
  const t = translations[language].contactForm;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_content: searchParams.get('utm_content') || '',
      utm_term: searchParams.get('utm_term') || '',
    }));
  }, [searchParams]);

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
      const result = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      pushEvent({
        event: 'generate_lead',
        form_location: 'contact_form_homepage'
      });
      setSubmitMessage(t.messages.success);
      setFormData(prev => ({ ...prev, name: '', email: '', company: '', message: '' }));
    } catch (err: any) {
      console.error(err);
      setSubmitError(t.messages.error || "Hubo un error al enviar el mensaje.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] rounded-lg shadow-xl mt-12">
      <h2 className="text-3xl font-bold text-center text-white mb-2">{title || t.title}</h2>
      <p className="text-center text-gray-300 mb-8">{subtitle || t.subtitle}</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">{t.fields.name}</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00DD82] focus:border-[#00DD82] sm:text-sm text-white" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t.fields.email}</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00DD82] focus:border-[#00DD82] sm:text-sm text-white" />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300">{t.fields.company}</label>
          <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00DD82] focus:border-[#00DD82] sm:text-sm text-white" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">{t.fields.message}</label>
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
            {isSubmitting ? t.buttons.submitting : t.buttons.submit}
          </button>
        </div>
      </form>
    </section>
  );
};

const ContactForm: React.FC<ContactFormProps> = ({
  title,
  subtitle
}) => {
  return (
    <Suspense fallback={<div className="text-center py-8 text-white">Cargando formulario...</div>}>
      <ContactFormContent title={title} subtitle={subtitle} />
    </Suspense>
  );
}

export default ContactForm;
