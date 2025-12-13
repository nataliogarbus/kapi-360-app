'use client';

import ContactForm from '@/components/ContactForm';
import { Instagram, Users, TrendingUp, Smartphone, Award, Target, Video } from 'lucide-react';
import { SiTiktok, SiYoutube, SiLinkedin } from 'react-icons/si';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: any[];
}

export default function InfluencersClient({ allPosts }: Props) {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.influencers;

    const segments = [
        {
            title: t.segments.items.lifestyle.title,
            description: t.segments.items.lifestyle.desc,
            icon: Instagram,
            color: 'text-pink-500'
        },
        {
            title: t.segments.items.tech.title,
            description: t.segments.items.tech.desc,
            icon: SiYoutube,
            color: 'text-red-500'
        },
        {
            title: t.segments.items.b2b.title,
            description: t.segments.items.b2b.desc,
            icon: SiLinkedin,
            color: 'text-blue-500'
        },
        {
            title: t.segments.items.tiktok.title,
            description: t.segments.items.tiktok.desc,
            icon: SiTiktok,
            color: 'text-[#00f2ea]'
        },
        {
            title: t.segments.items.ugc.title,
            description: t.segments.items.ugc.desc,
            icon: Video, // Lucide Video icon
            color: 'text-[#00DD82]'
        },
        {
            title: t.segments.items.micro.title,
            description: t.segments.items.micro.desc,
            icon: Target,
            color: 'text-yellow-500'
        }
    ];

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kapi Influencer Marketing",
        "provider": {
            "@type": "Organization",
            "name": "Kapi",
            "url": "https://kapi.com.ar"
        },
        "description": t.meta.description,
        "areaServed": "Latin America",
        "serviceType": "Social Media Marketing"
    };

    return (
        <main className="flex min-h-screen flex-col bg-kapi-negro-suave">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00DD82]/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-sm">
                        {t.hero.badge}
                    </div>
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

            {/* Segments Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-16 text-center uppercase tracking-wide">
                        {t.segments.title} <span className="text-[#00DD82]">{t.segments.titleHighlight}</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {segments.map((segment, index) => (
                            <div key={index} className="group bg-[#111] border border-gray-800 p-8 rounded-2xl hover:border-[#00DD82] hover:bg-gray-900 transition-all duration-300 hover:-translate-y-1">
                                <div className="bg-gray-800/50 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#00DD82]/20 transition-colors duration-300">
                                    <segment.icon className={`w-7 h-7 ${segment.color} transition-colors duration-300`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00DD82] transition-colors">{segment.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{segment.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats / Why Us */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
                        <div className="p-4">
                            <div className="text-4xl font-black text-white mb-2">{t.stats.creators.value}</div>
                            <div className="text-[#00DD82] font-bold uppercase text-sm tracking-wider">{t.stats.creators.label}</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-black text-white mb-2">{t.stats.reach.value}</div>
                            <div className="text-[#00DD82] font-bold uppercase text-sm tracking-wider">{t.stats.reach.label}</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-black text-white mb-2">{t.stats.engagement.value}</div>
                            <div className="text-[#00DD82] font-bold uppercase text-sm tracking-wider">{t.stats.engagement.label}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Content */}
            <RecommendedPosts
                currentSlug="soluciones-influencers"
                allPosts={allPosts}
                filterTags={['Redes Sociales', 'Branding', 'Contenido', 'Ventas B2B']}
                title="Claves de Influencia"
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
