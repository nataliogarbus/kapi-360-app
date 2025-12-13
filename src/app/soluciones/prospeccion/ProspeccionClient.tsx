'use client';

import ContactForm from '@/components/ContactForm';
import { Users, Phone, Mail, Database, Target, ArrowUpRight } from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: any[];
}

export default function ProspeccionClient({ allPosts }: Props) {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.prospeccion;

    const services = [
        {
            title: t.services.items.linkedin.title,
            description: t.services.items.linkedin.desc,
            icon: SiLinkedin,
            color: 'text-blue-600'
        },
        {
            title: t.services.items.email.title,
            description: t.services.items.email.desc,
            icon: Mail,
            color: 'text-yellow-400'
        },
        {
            title: t.services.items.database.title,
            description: t.services.items.database.desc,
            icon: Database,
            color: 'text-purple-500'
        },
        {
            title: t.services.items.appointment.title,
            description: t.services.items.appointment.desc,
            icon: Phone,
            color: 'text-[#00DD82]'
        },
        {
            title: t.services.items.scoring.title,
            description: t.services.items.scoring.desc,
            icon: Target,
            color: 'text-red-500'
        },
        {
            title: t.services.items.outbound.title,
            description: t.services.items.outbound.desc,
            icon: ArrowUpRight,
            color: 'text-orange-500'
        }
    ];

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kapi B2B Lead Generation",
        "provider": {
            "@type": "Organization",
            "name": "Kapi",
            "url": "https://kapi.com.ar"
        },
        "description": t.meta.description,
        "serviceType": "Lead Generation"
    };

    return (
        <main className="flex min-h-screen flex-col bg-kapi-negro-suave">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        {t.hero.title} <span className="text-orange-500">{t.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        {t.hero.description}
                    </p>
                    <a href="#contacto" className="bg-orange-500 text-white font-bold uppercase px-8 py-4 rounded-md hover:bg-orange-600 transition-all duration-300 text-lg shadow-lg inline-block">
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
                <div className="max-w-4xl mx-auto bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">{t.howItWorks.title}</h3>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
                        <div className="text-center">
                            <div className="text-[#00DD82] font-black text-5xl mb-2">1</div>
                            <p className="text-gray-300 font-medium">{t.howItWorks.steps[0]}</p>
                        </div>
                        <div className="hidden md:block w-12 h-1 bg-gray-700"></div>
                        <div className="text-center">
                            <div className="text-[#00DD82] font-black text-5xl mb-2">2</div>
                            <p className="text-gray-300 font-medium">{t.howItWorks.steps[1]}</p>
                        </div>
                        <div className="hidden md:block w-12 h-1 bg-gray-700"></div>
                        <div className="text-center">
                            <div className="text-[#00DD82] font-black text-5xl mb-2">3</div>
                            <p className="text-gray-300 font-medium">{t.howItWorks.steps[2]}</p>
                        </div>
                        <div className="hidden md:block w-12 h-1 bg-gray-700"></div>
                        <div className="text-center">
                            <div className="text-[#00DD82] font-black text-5xl mb-2">4</div>
                            <p className="text-gray-300 font-medium">{t.howItWorks.steps[3]}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Content */}
            <RecommendedPosts
                currentSlug="soluciones-prospeccion"
                allPosts={allPosts}
                filterTags={['Prospección B2B', 'Ventas', 'Leads B2B', 'Señales de Compra', 'LinkedIn']}
                title="Estrategias de Crecimiento"
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
