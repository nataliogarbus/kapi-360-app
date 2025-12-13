'use client';

import ContactForm from '@/components/ContactForm';
import { Tv, Radio, Newspaper, Mic2, Clapperboard, Megaphone } from 'lucide-react';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: any[];
}

export default function MediosClient({ allPosts }: Props) {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.medios;

    const formats = [
        {
            title: t.formats.items.tv.title,
            description: t.formats.items.tv.desc,
            icon: Tv
        },
        {
            title: t.formats.items.radio.title,
            description: t.formats.items.radio.desc,
            icon: Radio
        },
        {
            title: t.formats.items.pnt.title,
            description: t.formats.items.pnt.desc,
            icon: Mic2
        },
        {
            title: t.formats.items.print.title,
            description: t.formats.items.print.desc,
            icon: Newspaper
        },
        {
            title: t.formats.items.cinema.title,
            description: t.formats.items.cinema.desc,
            icon: Clapperboard
        },
        {
            title: t.formats.items.events.title,
            description: t.formats.items.events.desc,
            icon: Megaphone
        }
    ];

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kapi Mass Media Advertising",
        "provider": {
            "@type": "Organization",
            "name": "Kapi",
            "url": "https://kapi.com.ar"
        },
        "description": t.meta.description,
        "serviceType": "Advertising"
    };

    return (
        <main className="flex min-h-screen flex-col bg-kapi-negro-suave">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00DD82]/10 rounded-full blur-[100px] -z-10" />

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

            {/* Formats Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-16 text-center uppercase tracking-wide">
                        {t.formats.title} <span className="text-[#00DD82]">{t.formats.titleHighlight}</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {formats.map((format, index) => (
                            <div key={index} className="group bg-[#111] border border-gray-800 p-8 rounded-2xl hover:border-[#00DD82] hover:bg-gray-900 transition-all duration-300 hover:-translate-y-1">
                                <div className="bg-gray-800/50 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#00DD82] transition-colors duration-300">
                                    <format.icon className="w-7 h-7 text-[#00DD82] group-hover:text-black transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00DD82] transition-colors">{format.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{format.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top Media Logos (Text Representation) */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 uppercase tracking-widest text-sm mb-8 font-semibold">{t.brandsTitle}</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                        {/* TV */}
                        <span className="text-3xl md:text-4xl font-black text-white tracking-tighter hover:text-[#00DD82] transition-colors cursor-default">telefe</span>
                        <span className="text-3xl md:text-4xl font-bold text-white hover:text-yellow-500 transition-colors cursor-default flex items-center"><span className="text-yellow-500 mr-1">*</span>eltrece</span>
                        <span className="text-3xl md:text-4xl font-bold text-white hover:text-blue-500 transition-colors cursor-default tracking-wide uppercase">América</span>

                        {/* News */}
                        <span className="text-2xl md:text-3xl font-serif font-bold text-white hover:text-red-500 transition-colors cursor-default">Clarín</span>
                        <span className="text-2xl md:text-3xl font-serif font-bold text-white hover:text-blue-400 transition-colors cursor-default italic">LA NACION</span>
                        <span className="text-2xl md:text-3xl font-bold text-orange-500 hover:text-orange-400 transition-colors cursor-default">Infobae</span>

                        {/* Radio/Sports */}
                        <span className="text-2xl md:text-3xl font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-default">TyC Sports</span>
                        <span className="text-2xl md:text-3xl font-extrabold text-white hover:text-red-600 transition-colors cursor-default italic">Radio Mitre</span>
                        <span className="text-2xl md:text-3xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-default">LA 100</span>
                    </div>
                </div>
            </section>

            {/* Why Mass Media Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-8 uppercase">{t.whyMass.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-xl mb-2">{t.whyMass.items.trust.title}</h3>
                            <p className="text-gray-400">{t.whyMass.items.trust.desc}</p>
                        </div>
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-xl mb-2">{t.whyMass.items.reach.title}</h3>
                            <p className="text-gray-400">{t.whyMass.items.reach.desc}</p>
                        </div>
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-xl mb-2">{t.whyMass.items.cost.title}</h3>
                            <p className="text-gray-400">{t.whyMass.items.cost.desc}</p>
                        </div>
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-xl mb-2">{t.whyMass.items.synergy.title}</h3>
                            <p className="text-gray-400">{t.whyMass.items.synergy.desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Content */}
            <RecommendedPosts
                currentSlug="soluciones-medios"
                allPosts={allPosts}
                filterTags={['TV', 'Publicidad Tradicional', 'Marketing Omnicanal', 'Estrategia de Medios', 'Inversión', 'ROI']}
                title="Estrategia de Medios"
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
