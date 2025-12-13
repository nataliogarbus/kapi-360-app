'use client';

import ContactForm from '@/components/ContactForm';
import { Search, Gauge, MousePointerClick, BarChart3, Bot, Globe } from 'lucide-react';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: any[];
}

export default function SeoUxClient({ allPosts }: Props) {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.seo;

    const services = [
        {
            title: t.services.items.seo.title,
            description: t.services.items.seo.desc,
            icon: Search,
            color: 'text-blue-500'
        },
        {
            title: t.services.items.aeo.title,
            description: t.services.items.aeo.desc,
            icon: Bot,
            color: 'text-purple-500'
        },
        {
            title: t.services.items.ux.title,
            description: t.services.items.ux.desc,
            icon: MousePointerClick,
            color: 'text-pink-500'
        },
        {
            title: t.services.items.cro.title,
            description: t.services.items.cro.desc,
            icon: BarChart3,
            color: 'text-[#00DD82]'
        },
        {
            title: t.services.items.perf.title,
            description: t.services.items.perf.desc,
            icon: Gauge,
            color: 'text-orange-500'
        },
        {
            title: t.services.items.local.title,
            description: t.services.items.local.desc,
            icon: Globe,
            color: 'text-cyan-500'
        }
    ];

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kapi SEO & AEO Services",
        "provider": {
            "@type": "Organization",
            "name": "Kapi",
            "url": "https://kapi.com.ar"
        },
        "description": t.meta.description,
        "serviceType": "Search Engine Optimization"
    };

    return (
        <main className="flex min-h-screen flex-col bg-kapi-negro-suave">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00DD82]/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        {t.hero.title} <span className="text-[#00DD82]">{t.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        {t.hero.description}
                    </p>
                    <a href="#contacto" className="bg-[#00DD82] text-black font-bold uppercase px-8 py-4 rounded-md hover:bg-green-400 transition-all duration-300 text-lg shadow-lg inline-block">
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

            {/* AEO Explanation Box */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-gray-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px]" />

                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Bot className="text-purple-500" />
                        {t.aeoBox.title}
                    </h2>
                    <p className="text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: t.aeoBox.text1 }} />
                    <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t.aeoBox.text2 }} />
                </div>
            </section>

            {/* Related Content */}
            <RecommendedPosts
                currentSlug="soluciones-seo-ux"
                allPosts={allPosts}
                filterTags={['SEO', 'AEO', 'Experiencia de Usuario', 'CRO', 'SEO Técnico']}
                title="Recursos de Posicionamiento"
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
