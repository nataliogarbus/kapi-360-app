'use client';

import ContactForm from '@/components/ContactForm';
import { MessageCircle, Camera, CalendarClock, TrendingUp } from 'lucide-react';
import { SiInstagram, SiTiktok, SiLinkedin, SiFacebook, SiYoutube, SiX, SiPinterest } from 'react-icons/si';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: any[]; // Type should ideally be BlogPost[]
}

export default function SocialMediaClient({ allPosts }: Props) {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.social;

    const services = [
        {
            title: t.services.items.strategy.title,
            description: t.services.items.strategy.desc,
            icon: CalendarClock,
            color: 'text-purple-500'
        },
        {
            title: t.services.items.reels.title,
            description: t.services.items.reels.desc,
            icon: SiTiktok,
            color: 'text-pink-500'
        },
        {
            title: t.services.items.design.title,
            description: t.services.items.design.desc,
            icon: Camera,
            color: 'text-orange-500'
        },
        {
            title: t.services.items.community.title,
            description: t.services.items.community.desc,
            icon: MessageCircle,
            color: 'text-[#00DD82]'
        },
        {
            title: t.services.items.linkedin.title,
            description: t.services.items.linkedin.desc,
            icon: SiLinkedin,
            color: 'text-blue-600'
        },
        {
            title: t.services.items.ads.title,
            description: t.services.items.ads.desc,
            icon: TrendingUp,
            color: 'text-blue-400'
        }
    ];

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kapi Social Media Management",
        "provider": {
            "@type": "Organization",
            "name": "Kapi",
            "url": "https://kapi.com.ar"
        },
        "description": t.meta.description,
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
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        {t.hero.title} <span className="text-pink-500">{t.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        {t.hero.description}
                    </p>
                    <a href="#contacto" className="bg-pink-500 text-white font-bold uppercase px-8 py-4 rounded-md hover:bg-pink-600 transition-all duration-300 text-lg shadow-lg inline-block">
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

            {/* Platforms Bar */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-12 text-4xl md:text-5xl text-gray-700/50 hover:text-gray-400 transition-colors duration-500">
                    <SiInstagram className="hover:text-[#E1306C] transition-colors duration-300" title="Instagram" />
                    <SiTiktok className="hover:text-white transition-colors duration-300" title="TikTok" />
                    <SiLinkedin className="hover:text-[#0077b5] transition-colors duration-300" title="LinkedIn" />
                    <SiFacebook className="hover:text-[#1877F2] transition-colors duration-300" title="Facebook" />
                    <SiYoutube className="hover:text-[#FF0000] transition-colors duration-300" title="YouTube" />
                    <SiX className="hover:text-white transition-colors duration-300" title="X (Twitter)" />
                    <SiPinterest className="hover:text-[#BD081C] transition-colors duration-300" title="Pinterest" />
                </div>
            </section>

            {/* Related Content */}
            <RecommendedPosts
                currentSlug="soluciones-social-media"
                allPosts={allPosts}
                filterTags={['Redes Sociales', 'Branding', 'Contenido', 'LinkedIn']}
                title="Para leer antes de Postear"
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
