'use client';

import ContactForm from '@/components/ContactForm';
import { ShoppingCart, TrendingUp, Truck, CreditCard, Box, LayoutDashboard } from 'lucide-react';
import { SiShopify, SiWoocommerce, SiMercadopago } from 'react-icons/si';
import RecommendedPosts from '@/components/RecommendedPosts';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Props {
    allPosts: any[];
}

export default function EcommerceClient({ allPosts }: Props) {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].solutions.ecommerce;

    const services = [
        {
            title: t.services.items.stores.title,
            description: t.services.items.stores.desc,
            icon: ShoppingCart,
            color: 'text-green-500'
        },
        {
            title: t.services.items.meli.title,
            description: t.services.items.meli.desc,
            icon: Box,
            color: 'text-yellow-400'
        },
        {
            title: t.services.items.ads.title,
            description: t.services.items.ads.desc,
            icon: TrendingUp,
            color: 'text-blue-500'
        },
        {
            title: t.services.items.automation.title,
            description: t.services.items.automation.desc,
            icon: Truck,
            color: 'text-purple-500'
        },
        {
            title: t.services.items.payments.title,
            description: t.services.items.payments.desc,
            icon: CreditCard,
            color: 'text-cyan-400'
        },
        {
            title: t.services.items.dashboards.title,
            description: t.services.items.dashboards.desc,
            icon: LayoutDashboard,
            color: 'text-orange-500'
        }
    ];

    // JSON-LD for AEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Kapi E-commerce Solutions",
        "provider": {
            "@type": "Organization",
            "name": "Kapi",
            "url": "https://kapi.com.ar"
        },
        "description": t.meta.description,
        "serviceType": "E-commerce Development"
    };

    return (
        <main className="flex min-h-screen flex-col bg-kapi-negro-suave">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00DD82]/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        {t.hero.title} <span className="text-yellow-400">{t.hero.titleHighlight}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        {t.hero.description}
                    </p>
                    <a href="#contacto" className="bg-yellow-400 text-black font-bold uppercase px-8 py-4 rounded-md hover:bg-yellow-300 transition-all duration-300 text-lg shadow-lg inline-block">
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

            {/* Why Kapi E-commerce */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-12 uppercase">{t.whyUs.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                                <SiWoocommerce className="text-purple-500" /> {t.whyUs.items.multiplatform.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{t.whyUs.items.multiplatform.desc}</p>
                        </div>
                        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                                <Box className="text-yellow-400" /> {t.whyUs.items.meliPartners.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{t.whyUs.items.meliPartners.desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Content */}
            <RecommendedPosts
                currentSlug="soluciones-ecommerce"
                allPosts={allPosts}
                filterTags={['Ecommerce', 'CRO', 'Ventas', 'Experiencia de Usuario', 'Estrategia Comercial']}
                title="Recursos para Vender Más"
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
