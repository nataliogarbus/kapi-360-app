'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import { videos, images, basePath } from '@/lib/data/tradiciongarage-data';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const CasoExitoTradicionGarage = () => {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].caseStudiesPage.tradicionGarage;

    return (
        <div className="bg-black text-white">
            {/* Hero Section - Fallback to Image since we might not have video yet */}
            <div className="relative h-screen w-full overflow-hidden">
                <div className="absolute z-0 w-full h-full bg-gray-900" /> {/* Placeholder background */}
                <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-shadow-lg">
                        {t.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl text-shadow-md">
                        {t.subtitle}
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a href="#solucion" className="inline-block bg-cyan-500 text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-400 transition-colors duration-300">
                            {language === 'en' ? 'Discover the Solution' : 'Descubre la Solución'}
                        </a>
                    </div>
                </div>
            </div>

            {/* Contenido Narrativo */}
            <div className="py-20 sm:py-28">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-16">

                    {/* Sección Cliente y Desafío */}
                    <section className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl mb-4">{t.client.title}</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {t.client.description}
                        </p>
                        <div className="mt-8 border-t border-gray-700 pt-8">
                            <h3 className="text-2xl font-bold tracking-tight text-cyan-400 mb-4">{t.challenge.title}</h3>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                {t.challenge.description}
                            </p>
                        </div>
                    </section>

                    {/* Solución */}
                    <section id="solucion">
                        <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-8">{t.solution.title}</h2>
                        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl">
                            <ul className="space-y-4 text-lg text-gray-300">
                                {t.solution.items.map((item: any, index: number) => (
                                    <li key={index} className="flex items-start"><span className="text-cyan-400 mr-3 text-2xl">✓</span><div><strong>{item.title}:</strong> {item.description}</div></li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Resultados Clave (Placeholders) */}
                    <section>
                        <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl text-center mb-12">{t.impact.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {t.impact.stats.map((stat: any, index: number) => (
                                <div key={index} className="bg-gray-900 p-8 rounded-2xl shadow-2xl">
                                    <p className="text-5xl font-extrabold text-white">{stat.value}</p>
                                    <p className="mt-2 text-lg text-gray-300">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Testimonio */}
                    <section className="my-20">
                        <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
                            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                                    <Image
                                        src={`${basePath}/foto-ariel.webp`}
                                        alt="Ariel"
                                        width={120}
                                        height={120}
                                        className="rounded-full mx-auto shadow-lg border-4 border-cyan-400 object-cover"
                                    />
                                </div>
                                <div className="max-w-2xl mx-auto">
                                    <blockquote className="text-xl italic text-gray-200">
                                        {t.testimonial.quote}
                                    </blockquote>
                                    <cite className="mt-6 block font-semibold text-cyan-400">
                                        {t.testimonial.author}
                                        <span className="mt-1 block text-sm text-gray-400">{t.testimonial.role}</span>
                                    </cite>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Suspense fallback={<div className="text-center p-8">Cargando formulario...</div>}>
                        <ContactForm />
                    </Suspense>

                </div>
            </div>
        </div>
    );
};

export default CasoExitoTradicionGarage;
