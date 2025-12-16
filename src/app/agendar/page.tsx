'use client';

import React from 'react';
import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookingPage() {
    const { language } = useLanguage();

    const content = {
        es: {
            title: "Agenda tu Consultoría Estratégica",
            subtitle: "Completa tus datos para coordinar una reunión con nuestro equipo de expertos y analizar el potencial de tu negocio.",
            formTitle: "Paso 1: Tus Datos",
            formSubtitle: "Necesitamos conocerte un poco antes de la reunión.",
            buttonText: "Continuar a la Agenda"
        },
        en: {
            title: "Schedule your Strategic Consulting",
            subtitle: "Fill in your details to coordinate a meeting with our team to analyze your business potential.",
            formTitle: "Step 1: Your Details",
            formSubtitle: "We need to know a bit about you before the meeting.",
            buttonText: "Continue to Calendar"
        }
    };

    const t = content[language as keyof typeof content] || content.es; // Fallback to ES

    const CALENDAR_URL = "https://calendar.app.google/NDWv2vuj57kZVo138";

    return (
        <main className="min-h-screen bg-black">
            <Header />

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        {t.title} <span className="text-[#00DD82]">Kapi</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
                        {/* Decorative blob */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

                        <ContactForm
                            title={t.formTitle}
                            subtitle={t.formSubtitle}
                            onSuccessRedirect={CALENDAR_URL}
                            buttonText={t.buttonText}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
