'use client';



import React from 'react';
import Link from 'next/link'; // Import Link
import { motion } from 'framer-motion';
import {
    SiYoutube,
    SiShopify,
    SiWoocommerce,
    SiOdoo,
    SiMercadopago,
    SiGoogle,
    SiMeta,
    SiTiktok,
    SiLinkedin
} from 'react-icons/si';
import { Tv, ShoppingBag, Users, Map } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const EcosystemCard = ({ title, icon: Icon, brands, description, delay }: { title: string, icon: any, brands?: string[], description?: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay }}
        className="bg-[#111] border border-gray-800 rounded-2xl p-8 hover:border-[#00DD82]/30 transition-all duration-300 group h-full flex flex-col cursor-pointer"
    >
        <div className="bg-gray-800/50 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#00DD82]/20 transition-colors">
            <Icon className="text-gray-300 group-hover:text-[#00DD82] transition-colors w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>

        {description && (
            <p className="text-gray-400 text-sm mb-6 flex-grow">{description}</p>
        )}

        {brands && (
            <div className="flex flex-wrap gap-2 mt-auto">
                {brands.map((brand) => (
                    <span key={brand} className="text-xs font-mono bg-white/5 text-gray-400 px-2 py-1 rounded border border-white/5 hover:border-gray-600 transition-colors">
                        {brand}
                    </span>
                ))}
            </div>
        )}
    </motion.div>
);

const PartnersEcosystem = () => {
    const { language } = useLanguage();
    // @ts-ignore
    const t = translations[language].partnersEcosystem;

    console.log('DEBUG KAPI:', { language, keys: Object.keys(translations[language]), hasPartners: !!t });

    if (!t) return <div>Loading translations...</div>;

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00DD82]/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
                        {t.title} <span className="text-[#00DD82]">{t.titleHighlight}</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t.description}
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1: Medios Masivos */}
                    <EcosystemCard
                        title={t.items.media.title}
                        icon={Tv}
                        delay={0.1}
                        brands={['Telefe', 'Canal 13', 'C5N', 'TN', 'Disney+', 'YouTube Ads']}
                        description={t.items.media.description}
                    />

                    {/* Card 2: E-commerce & Tech */}
                    <EcosystemCard
                        title={t.items.ecommerce.title}
                        icon={ShoppingBag}
                        delay={0.2}
                        brands={['MercadoLibre', 'Shopify', 'WooCommerce', 'Odoo', 'MercadoPago', 'Tienda Nube']}
                        description={t.items.ecommerce.description}
                    />

                    {/* Card 3: Vía Pública & Pantallas - LINKED */}
                    <Link href="/soluciones/via-publica" className="block h-full no-underline">
                        <EcosystemCard
                            title={t.items.viaPublica.title}
                            icon={Map}
                            delay={0.3}
                            brands={['Pantallas LED', 'Cartelería Digital', 'Subtes', 'Aeropuertos', 'Shoppings']}
                            description={t.items.viaPublica.description}
                        />
                    </Link>

                    {/* Card 4: Influencers */}
                    <EcosystemCard
                        title={t.items.influencers.title}
                        icon={Users}
                        delay={0.4}
                        brands={['+500 Creadores', 'B2B Influencers', 'Lifestyle', 'Tech', 'Nicho']}
                        description={t.items.influencers.description}
                    />

                </div>
            </div>
        </section>
    );
};

export default PartnersEcosystem;
