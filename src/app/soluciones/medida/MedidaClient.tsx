'use client';

import ContactForm from '@/components/ContactForm';
import { Database, Server, Workflow, SquareStack, Shield, Key } from 'lucide-react';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: any[];
}

export default function MedidaClient({ allPosts }: Props) {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.medida;

    const services = [
        {
            title: t.services.items.management.title,
            description: t.services.items.management.desc,
            icon: SquareStack,
            color: 'text-blue-500'
        },
        {
            title: t.services.items.api.title,
            description: t.services.items.api.desc,
            icon: Workflow,
            color: 'text-green-500'
        },
        {
            title: t.services.items.dashboards.title,
            description: t.services.items.dashboards.desc,
            icon: Database,
            color: 'text-purple-500'
        },
        {
            title: t.services.items.saas.title,
            description: t.services.items.saas.desc,
            icon: Server,
            color: 'text-orange-500'
        },
        {
            title: t.services.items.security.title,
            description: t.services.items.security.desc,
            icon: Shield,
            color: 'text-red-500'
        },
        {
            title: t.services.items.sso.title,
            description: t.services.items.sso.desc,
            icon: Key,
            color: 'text-yellow-400'
        }
    ];

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kapi Custom Software Development",
        "provider": {
            "@type": "Organization",
            "name": "Kapi",
            "url": "https://kapi.com.ar"
        },
        "description": t.meta.description,
        "serviceType": "Software Development"
    };

    return (
        <main className="flex min-h-screen flex-col bg-kapi-negro-suave">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] -z-10" />

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

            {/* Tech Stack */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-8">{t.techStack}</h3>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Text representation for simplicity, ideally icons */}
                        <span className="text-2xl font-bold text-white">Node.js</span>
                        <span className="text-2xl font-bold text-white">Python</span>
                        <span className="text-2xl font-bold text-white">React</span>
                        <span className="text-2xl font-bold text-white">AWS</span>
                        <span className="text-2xl font-bold text-white">Docker</span>
                        <span className="text-2xl font-bold text-white">SQL</span>
                    </div>
                </div>
            </section>

            {/* Related Content */}
            <RecommendedPosts
                currentSlug="soluciones-medida"
                allPosts={allPosts}
                filterTags={['Automatización', 'CRM', 'Sales Ops', 'Tecnología', 'Mantenimiento Web']}
                title="Tecnología para Crecer"
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
