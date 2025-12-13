'use client';

import { useState, useEffect } from 'react';
import ContactForm from '@/components/ContactForm';
import { Monitor, Smartphone, Code2, Rocket, Globe, ShieldCheck } from 'lucide-react';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Post } from '@/app/types';

export default function WebPage() {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.web;

    const [allPosts, setAllPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/posts?lang=${language}`);
                if (response.ok) {
                    const data = await response.json();
                    setAllPosts(data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [language]);

    // Mapping keys to icons for the loop
    const serviceIcons = {
        corporate: Globe,
        landing: Rocket,
        custom: Code2,
        cms: Monitor,
        responsive: Smartphone,
        security: ShieldCheck
    };

    const serviceColors = {
        corporate: 'text-blue-500',
        landing: 'text-[#00DD82]',
        custom: 'text-purple-500',
        cms: 'text-pink-500',
        responsive: 'text-orange-500',
        security: 'text-cyan-500'
    };

    // Construct services array from translations
    const services = Object.keys(t.services.items).map(key => {
        // @ts-ignore
        const item = t.services.items[key];
        return {
            title: item.title,
            description: item.desc,
            // @ts-ignore
            icon: serviceIcons[key],
            // @ts-ignore
            color: serviceColors[key]
        };
    });

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": t.meta.title, // Dynamic title
        "provider": {
            "@type": "Organization",
            "name": "Kapi",
            "url": "https://kapi.com.ar"
        },
        "description": t.meta.description, // Dynamic description
        "serviceType": "Web Development"
    };

    return (
        <main className="flex min-h-screen flex-col bg-kapi-negro-suave">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        {t.hero.title} <span className="text-blue-500">{t.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        {t.hero.description}
                    </p>
                    <a href="#contacto" className="bg-blue-600 text-white font-bold uppercase px-8 py-4 rounded-md hover:bg-blue-500 transition-all duration-300 text-lg shadow-lg inline-block">
                        {t.hero.cta}
                    </a>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-16 text-center uppercase tracking-wide">
                        {t.services.title} <span className="text-[#00DD82]">{t.services.titleHighlight}</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div key={index} className="group bg-[#111] border border-gray-800 p-8 rounded-2xl hover:border-[#00DD82] hover:bg-gray-900 transition-all duration-300 hover:-translate-y-1">
                                <div className="bg-gray-800/50 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#00DD82]/20 transition-colors duration-300">
                                    <service.icon className={`w-7 h-7 ${service.color} transition-colors duration-300`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00DD82] transition-colors">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Us */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-8 uppercase">{t.whyUs.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-4xl mb-2">99/100</h3>
                            <p className="text-gray-400 uppercase text-xs tracking-wider">{t.whyUs.items.perf.label}</p>
                            <p className="text-gray-500 text-sm mt-2">{t.whyUs.items.perf.desc}</p>
                        </div>
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-4xl mb-2">SEO</h3>
                            <p className="text-gray-400 uppercase text-xs tracking-wider">{t.whyUs.items.seo.label}</p>
                            <p className="text-gray-500 text-sm mt-2">{t.whyUs.items.seo.desc}</p>
                        </div>
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-4xl mb-2">UX</h3>
                            <p className="text-gray-400 uppercase text-xs tracking-wider">{t.whyUs.items.ux.label}</p>
                            <p className="text-gray-500 text-sm mt-2">{t.whyUs.items.ux.desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Content */}
            <RecommendedPosts
                currentSlug="soluciones-web"
                allPosts={allPosts}
                filterTags={['Rendimiento Web', 'SEO Técnico', 'Experiencia de Usuario', 'Seguridad', 'Mantenimiento Web']}
                title="Cultura Digital" // This could also be translated if needed globally
            />

            {/* Contact Section */}
            <div id="contacto" className="py-12">
                <ContactForm
                    title={t.contact.title}
                    subtitle={t.contact.subtitle}
                />
            </div>

        </main>
    );
}
