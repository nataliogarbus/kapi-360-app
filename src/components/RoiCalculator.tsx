'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Industry Benchmarks (Source: WordStream/HubSpot 2024 averages)
const INDUSTRIES = {
    general: { name: 'General / Promedio', cpc: 1.5, ctr: 0.03, cr: 0.03 },
    ecommerce: { name: 'E-commerce', cpc: 0.8, ctr: 0.025, cr: 0.02 },
    b2b: { name: 'B2B / Servicios', cpc: 3.5, ctr: 0.028, cr: 0.04 },
    realestate: { name: 'Inmobiliaria', cpc: 1.8, ctr: 0.035, cr: 0.025 },
    local: { name: 'Negocio Local', cpc: 1.2, ctr: 0.04, cr: 0.05 },
};

const RoiCalculator = () => {
    const { language } = useLanguage();
    // Using simple translations inside component for speed, ideally move to translations file
    const t = {
        title: language === 'es' ? 'Calculadora de ROI' : 'ROI Calculator',
        subtitle: language === 'es' ? 'Proyecta el crecimiento de tu negocio' : 'Project your business growth',
        inputs: {
            industry: language === 'es' ? 'Tu Industria' : 'Your Industry',
            budget: language === 'es' ? 'Presupuesto Mensual (USD)' : 'Monthly Budget (USD)',
            ticket: language === 'es' ? 'Ticket Promedio (USD)' : 'Average Ticket (USD)',
            closeRate: language === 'es' ? 'Tasa de Cierre de Ventas' : 'Sales Close Rate',
        },
        results: {
            traffic: language === 'es' ? 'Tráfico Estimado' : 'Est. Traffic',
            leads: language === 'es' ? 'Leads Potenciales' : 'Potential Leads',
            sales: language === 'es' ? 'Ventas Estimadas' : 'Est. Sales',
            revenue: language === 'es' ? 'Ingresos Totales' : 'Total Revenue',
            roi: 'ROI',
        },
        source: language === 'es' ? 'Fuente: Promedios de mercado 2024 (WordStream & HubSpot).' : 'Source: 2024 Market Averages (WordStream & HubSpot).',
        disclaimer: language === 'es' ? 'Proyección estimada basada en benchmarks de industria. Los resultados no están garantizados y pueden variar según la estrategia.' : 'Estimated projection based on industry benchmarks. Results are not guaranteed and may vary.',
    };

    const [industry, setIndustry] = useState<keyof typeof INDUSTRIES>('general');
    const [budget, setBudget] = useState(1000);
    const [ticket, setTicket] = useState(100);
    const [closeRate, setCloseRate] = useState(10); // Percentage - Conservative default

    const [results, setResults] = useState({
        traffic: 0,
        leads: 0,
        sales: 0,
        revenue: 0,
        roi: 0,
        roiPercent: 0,
    });

    useEffect(() => {
        const selectedIndustry = INDUSTRIES[industry];
        // Logic:
        // 1. Traffic = Budget / CPC
        // 2. Leads (Conversions) = Traffic * Conversion Rate (CR is "Lead Conversion Rate" for web)
        // 3. Sales = Leads * (Close Rate / 100)
        // 4. Revenue = Sales * Ticket
        // 5. ROI = (Revenue - Budget) / Budget

        const estimatedTraffic = Math.floor(budget / selectedIndustry.cpc);

        // Use industry specific conversion rate (usually 2-5%) instead of purely optimistic assumption
        const estimatedLeads = Math.floor(estimatedTraffic * selectedIndustry.cr);

        // Sales calculation
        let estimatedSales = 0;
        if (industry === 'ecommerce') {
            estimatedSales = estimatedLeads; // simplified: in ecomm 'leads' here assumes 'purchases' based on low CR
        } else {
            estimatedSales = Math.floor(estimatedLeads * (closeRate / 100));
        }

        const estimatedRevenue = estimatedSales * ticket;
        const netProfit = estimatedRevenue - budget;
        const calculatedRoiPercent = budget > 0 ? (netProfit / budget) * 100 : 0;

        setResults({
            traffic: estimatedTraffic,
            leads: estimatedLeads,
            sales: estimatedSales,
            revenue: estimatedRevenue,
            roi: netProfit,
            roiPercent: calculatedRoiPercent
        });

    }, [industry, budget, ticket, closeRate]);

    return (
        <section id="roi" className="py-20 bg-gradient-to-br from-[#0a0a0a] to-[#111] relative overflow-hidden border-t border-gray-900">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute right-0 top-0 w-96 h-96 bg-green-500 rounded-full blur-[128px]" />
                <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {t.title} <span className="text-[#00DD82]">Kapi</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
                    {/* Controls */}
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">{t.inputs.industry}</label>
                            <select
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value as keyof typeof INDUSTRIES)}
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00DD82] transition-all"
                            >
                                {Object.entries(INDUSTRIES).map(([key, data]) => (
                                    <option key={key} value={key}>{data.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-400">{t.inputs.budget}</label>
                                <span className="text-[#00DD82] font-bold">${budget}</span>
                            </div>
                            <input
                                type="range"
                                min="500"
                                max="10000"
                                step="100"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00DD82]"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>$500</span>
                                <span>$10,000+</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">{t.inputs.ticket}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    value={ticket}
                                    onChange={(e) => setTicket(Number(e.target.value))}
                                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00DD82] transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-400">{t.inputs.closeRate}</label>
                                <span className="text-[#00DD82] font-bold">{closeRate}%</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                step="1"
                                value={closeRate}
                                onChange={(e) => setCloseRate(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00DD82]"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                {industry === 'ecommerce' ? 'Tasa de conversión directa en web.' : 'Porcentaje de leads que se convierten en clientes.'}
                            </p>
                        </div>
                    </div>

                    {/* Results Visualizer */}
                    <div className="bg-[#0f0f0f] rounded-2xl p-8 border border-gray-800 flex flex-col justify-between relative overflow-hidden">
                        <div className="z-10 relative">
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <Users size={16} />
                                        <span className="text-xs uppercase font-bold">{t.results.traffic}</span>
                                    </div>
                                    <p className="text-xl font-bold text-white">~{results.traffic.toLocaleString()}</p>
                                </div>
                                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <Target size={16} />
                                        <span className="text-xs uppercase font-bold text-blue-400">{t.results.leads}</span>
                                    </div>
                                    <p className="text-xl font-bold text-white">{results.leads.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="text-center py-6">
                                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">{t.results.revenue}</p>
                                <motion.p
                                    key={results.revenue}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-[#00DD82]"
                                >
                                    ${results.revenue.toLocaleString()}
                                </motion.p>
                                {results.roiPercent > 0 && (
                                    <div className="inline-block mt-4 bg-green-900/30 border border-green-500/30 px-4 py-1 rounded-full">
                                        <span className="text-green-400 font-bold">ROI: {results.roiPercent.toFixed(0)}%</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-800 text-center z-10 relative">
                            <p className="text-[10px] text-gray-500 mb-1">
                                {t.source}
                            </p>
                            <p className="text-[10px] text-gray-600 italic">
                                *{t.disclaimer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoiCalculator;
