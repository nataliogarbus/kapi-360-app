'use client';

import ContactForm from '@/components/ContactForm';
import { Smartphone, Tablet, Code, Zap, Radio, BellRing } from 'lucide-react';
import { SiApple, SiAndroid, SiFlutter } from 'react-icons/si';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: any[];
}

export default function AppsClient({ allPosts }: Props) {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.apps;

    // Helper for Icon consistency
    function Globe({ className }: { className?: string }) {
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
    }

    const services = [
        {
            title: t.services.items.iosAndroid.title,
            description: t.services.items.iosAndroid.desc,
            icon: SiApple,
            color: 'text-white'
        },
        {
            title: t.services.items.multiplatform.title,
            description: t.services.items.multiplatform.desc,
            icon: SiFlutter,
            color: 'text-blue-400'
        },
        {
            title: t.services.items.pwa.title,
            description: t.services.items.pwa.desc,
            icon: Globe,
            color: 'text-orange-500'
        },
        {
            title: t.services.items.push.title,
            description: t.services.items.push.desc,
            icon: BellRing,
            color: 'text-red-500'
        },
        {
            title: t.services.items.iot.title,
            description: t.services.items.iot.desc,
            icon: Radio,
            color: 'text-green-500'
        },
        {
            title: t.services.items.stores.title,
            description: t.services.items.stores.desc,
            icon: Smartphone,
            color: 'text-purple-500'
        }
    ];

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kapi Mobile App Development",
        "provider": {
            "@type": "Organization",
            "name": "Kapi",
            "url": "https://kapi.com.ar"
        },
        "description": t.meta.description,
        "serviceType": "Mobile Development"
    };

    return (
        <main className="flex min-h-screen flex-col bg-kapi-negro-suave">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        {t.hero.title} <span className="text-sky-500">{t.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        {t.hero.description}
                    </p>
                    <a href="#contacto" className="bg-sky-500 text-white font-bold uppercase px-8 py-4 rounded-md hover:bg-sky-600 transition-all duration-300 text-lg shadow-lg inline-block">
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

            {/* Tech Stack */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto flex justify-center gap-12 flex-wrap text-4xl text-gray-600">
                    <SiApple title="iOS" className="hover:text-white transition-colors" />
                    <SiAndroid title="Android" className="hover:text-green-500 transition-colors" />
                    <SiFlutter title="Flutter" className="hover:text-blue-400 transition-colors" />
                    <Code className="hover:text-cyan-400 transition-colors" />
                </div>
            </section>

            {/* Related Content */}
            <RecommendedPosts
                currentSlug="soluciones-apps"
                allPosts={allPosts}
                filterTags={['Experiencia de Usuario', 'Ecommerce', 'Innovación', 'Tecnología']}
                title="Innovación Mobile"
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
