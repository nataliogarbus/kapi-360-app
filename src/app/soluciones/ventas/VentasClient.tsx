'use client';

import ContactForm from '@/components/ContactForm';
import { ClipboardList, Users2, LineChart, FileText, Cog, BrainCircuit } from 'lucide-react';
import { SiHubspot, SiSalesforce } from 'react-icons/si';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: any[];
}

export default function VentasClient({ allPosts }: Props) {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.ventas;

    const services = [
        {
            title: t.services.items.crm.title,
            description: t.services.items.crm.desc,
            icon: SiHubspot,
            color: 'text-orange-500'
        },
        {
            title: t.services.items.scripts.title,
            description: t.services.items.scripts.desc,
            icon: FileText,
            color: 'text-blue-500'
        },
        {
            title: t.services.items.salesOps.title,
            description: t.services.items.salesOps.desc,
            icon: Cog,
            color: 'text-gray-400'
        },
        {
            title: t.services.items.training.title,
            description: t.services.items.training.desc,
            icon: Users2,
            color: 'text-purple-500'
        },
        {
            title: t.services.items.metrics.title,
            description: t.services.items.metrics.desc,
            icon: LineChart,
            color: 'text-[#00DD82]'
        },
        {
            title: t.services.items.salesAi.title,
            description: t.services.items.salesAi.desc,
            icon: BrainCircuit,
            color: 'text-pink-500'
        }
    ];

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kapi Sales Operations",
        "provider": {
            "@type": "Organization",
            "name": "Kapi",
            "url": "https://kapi.com.ar"
        },
        "description": t.meta.description,
        "serviceType": "Sales Consulting"
    };

    return (
        <main className="flex min-h-screen flex-col bg-kapi-negro-suave">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px] -z-10" />

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

            {/* Why Process Matters */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-[#111] border-l-4 border-[#00DD82] p-8 rounded-r-xl">
                    <h3 className="text-2xl font-bold text-white mb-4">{t.whyOps.title}</h3>
                    <p className="text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: t.whyOps.text }} />
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        {t.whyOps.list.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Related Content */}
            <RecommendedPosts
                currentSlug="soluciones-ventas"
                allPosts={allPosts}
                filterTags={['Ventas', 'CRM', 'Sales Ops', 'Automatización', 'Leads B2B']}
                title="Recursos Comerciales"
            />

            {/* Contact Section */}
            <div id="contacto" className="py-12">
                <ContactForm
                    title={t.contact.title}
                    subtitle={t.contact.subtitle}
                />
            </div>

        </main >
    );
}
