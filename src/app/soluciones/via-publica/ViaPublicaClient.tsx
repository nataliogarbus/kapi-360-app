'use client';

import ContactForm from '@/components/ContactForm';
import { Tv, Zap, Train, Plane, ShoppingBag, Building2 } from 'lucide-react';
import GlossaryText from '@/components/GlossaryText';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: any[];
}

export default function ViaPublicaClient({ allPosts }: Props) {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.viaPublica;

    const formats = [
        {
            title: t.formats.items.led.title,
            description: t.formats.items.led.desc,
            icon: Tv
        },
        {
            title: t.formats.items.dooh.title,
            description: t.formats.items.dooh.desc,
            icon: Zap
        },
        {
            title: t.formats.items.subways.title,
            description: t.formats.items.subways.desc,
            icon: Train
        },
        {
            title: t.formats.items.airports.title,
            description: t.formats.items.airports.desc,
            icon: Plane
        },
        {
            title: t.formats.items.shoppings.title,
            description: t.formats.items.shoppings.desc,
            icon: ShoppingBag
        },
        {
            title: t.formats.items.furniture.title,
            description: t.formats.items.furniture.desc,
            icon: Building2
        }
    ];

    const relatedPosts = allPosts.filter(post =>
        post.tags?.some((tag: string) => ['OOH', 'DOOH', 'Publicidad Exterior', 'TV', 'Medios', 'Branding'].includes(tag)) ||
        post.category === 'Publicidad Exterior'
    ).slice(0, 3);

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kapi Outdoor Advertising",
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
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00DD82]/10 rounded-full blur-[120px] -z-10" />
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        {t.hero.title} <span className="text-[#00DD82]">{t.hero.titleHighlight}</span>
                    </h1>
                    <div className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        <GlossaryText text={t.hero.glossary} />
                    </div>
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

            {/* Why OOH Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-8 uppercase">{t.whyOoh.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-xl mb-2">{t.whyOoh.items.visibility.title}</h3>
                            <p className="text-gray-400">{t.whyOoh.items.visibility.desc}</p>
                        </div>
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-xl mb-2">{t.whyOoh.items.authority.title}</h3>
                            <p className="text-gray-400">{t.whyOoh.items.authority.desc}</p>
                        </div>
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-xl mb-2">{t.whyOoh.items.digitalComplement.title}</h3>
                            <p className="text-gray-400">{t.whyOoh.items.digitalComplement.desc}</p>
                        </div>
                        <div>
                            <h3 className="text-[#00DD82] font-bold text-xl mb-2">{t.whyOoh.items.targeting.title}</h3>
                            <p className="text-gray-400">{t.whyOoh.items.targeting.desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Articles Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <RecommendedPosts posts={relatedPosts} />
            </div>

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
