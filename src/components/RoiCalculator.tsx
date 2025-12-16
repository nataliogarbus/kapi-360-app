'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, TrendingUp, DollarSign, Users, Target, Settings } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { sendRoiReport } from '@/app/actions';
import toast from 'react-hot-toast';

// Industry Benchmarks (Source: WordStream/HubSpot 2024 averages)
// Added 'rate' buckets for flexible user selection
const INDUSTRIES = {
    general: { name: 'General / Promedio', cpc: 1.5, ctr: 0.03, cr: 0.03 },
    ecommerce: { name: 'E-commerce', cpc: 0.8, ctr: 0.025, cr: 0.02 },
    b2b: { name: 'B2B / Servicios', cpc: 3.5, ctr: 0.028, cr: 0.04 },
    realestate: { name: 'Inmobiliaria', cpc: 1.8, ctr: 0.035, cr: 0.025 },
    local: { name: 'Negocio Local', cpc: 1.2, ctr: 0.04, cr: 0.05 },
};

type RateTier = 'low' | 'medium' | 'high' | 'custom';
type Currency = 'USD' | 'ARS';

const RoiCalculator = () => {
    const { language } = useLanguage();
    // Using simple translations inside component for speed, ideally move to translations file
    const t = {
        title: language === 'es' ? 'Calculadora de ROI' : 'ROI Calculator',
        subtitle: language === 'es' ? 'Proyecta el crecimiento de tu negocio' : 'Project your business growth',
        inputs: {
            industry: language === 'es' ? 'Tu Industria' : 'Your Industry',
            budget: language === 'es' ? 'Presupuesto Mensual' : 'Monthly Budget',
            ticket: language === 'es' ? 'Ticket Promedio' : 'Average Ticket',
            conversionRate: language === 'es' ? 'Tasa de Conversión (Web)' : 'Conversion Rate (Web)',
            closeRate: language === 'es' ? 'Tasa de Cierre (Ventas)' : 'Sales Close Rate',
            currency: language === 'es' ? 'Moneda' : 'Currency',
        },
        tiers: {
            low: language === 'es' ? 'Conservador' : 'Conservative',
            medium: language === 'es' ? 'Promedio' : 'Average',
            high: language === 'es' ? 'Optimista' : 'Optimistic',
            custom: language === 'es' ? 'Personalizado' : 'Custom',
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
        investment: {
            title: language === 'es' ? 'Calculadora de Inversión' : 'Investment Calculator',
            subtitle: language === 'es' ? 'Define tu meta y descubre cuánto necesitas invertir.' : 'Define your goal and discover how much you need to invest.',
            modeBtn: language === 'es' ? 'Inversión Requerida' : 'Required Investment',
            goalLabel: language === 'es' ? 'Ingresá tu Meta de Facturación Mensual' : 'Enter your Monthly Revenue Goal',
            ticketLabel: language === 'es' ? 'Ingresá tu Ticket Promedio' : 'Enter your Average Ticket',
            goalHelp: language === 'es' ? '¿Cuánto quieres vender al mes?' : 'How much do you want to sell per month?',
            resultHeader: language === 'es' ? 'Inversión Requerida Estimada' : 'Estimated Required Investment',
            simulateBtn: language === 'es' ? 'Simular en ROI Calc' : 'Simulate in ROI Calc',
        },
        email: {
            cta: language === 'es' ? 'ENVIARME\nINFORME' : 'SEND ME\nREPORT',
            title: language === 'es' ? 'Recibe tu Proyección' : 'Get Your Projection',
            desc: language === 'es' ? 'Te enviaremos el desglose completo de esta simulación a tu correo.' : 'We will send the full breakdown of this simulation to your email.',
            nameLabel: language === 'es' ? 'Nombre' : 'Name',
            emailLabel: language === 'es' ? 'Email Profesional' : 'Professional Email',
            submitBtn: language === 'es' ? 'Enviar Informe' : 'Send Report',
            sending: language === 'es' ? 'Enviando...' : 'Sending...',
            success: language === 'es' ? '¡Informe enviado con éxito!' : 'Report sent successfully!',
            error: language === 'es' ? 'Error al enviar.' : 'Error sending report.',
        }
    };

    const [mode, setMode] = useState<'roi' | 'investment'>('roi');
    const [revenueGoal, setRevenueGoal] = useState(100000);

    const [currency, setCurrency] = useState<Currency>('USD');
    const [industry, setIndustry] = useState<keyof typeof INDUSTRIES>('general');
    const [budget, setBudget] = useState(1000);
    const [ticket, setTicket] = useState(100);

    // Tiers selection
    const [conversionTier, setConversionTier] = useState<RateTier>('medium');
    const [closeTier, setCloseTier] = useState<RateTier>('medium');

    // Values used for Custom or displayed values
    const [customConversionRate, setCustomConversionRate] = useState(3.0); // %
    const [customCloseRate, setCustomCloseRate] = useState(10); // %

    // Effective rates used for calculation
    const [effectiveConversionRate, setEffectiveConversionRate] = useState(0.03);
    const [effectiveCloseRate, setEffectiveCloseRate] = useState(10);

    // Email Capture State
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailForm, setEmailForm] = useState({ name: '', email: '' });
    const [isSending, setIsSending] = useState(false);

    const [results, setResults] = useState({
        traffic: 0,
        leads: 0,
        sales: 0,
        revenue: 0,
        roi: 0,
        roiPercent: 0,
        requiredBudget: 0, // For Investment Mode
    });

    useEffect(() => {
        // Check hash on mount to auto-switch mode
        if (typeof window !== 'undefined' && window.location.hash === '#inversion') {
            setMode('investment');
            // Optional: Scroll to section if likely missed by browser default behavior
            const element = document.getElementById('roi');
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 500);
            }
        }
    }, []);

    // Also listen for hash changes if user navigates while on page
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === '#inversion') {
                setMode('investment');
            } else if (window.location.hash === '#roi') {
                setMode('roi');
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    // Update effective rates when industry or tier changes
    useEffect(() => {
        const selectedIndustry = INDUSTRIES[industry];

        let crValue = 0;
        switch (conversionTier) {
            case 'low': crValue = (selectedIndustry.cr * 0.7) * 100; break;
            case 'medium': crValue = selectedIndustry.cr * 100; break;
            case 'high': crValue = (selectedIndustry.cr * 1.3) * 100; break;
            case 'custom': crValue = customConversionRate; break;
            default: crValue = selectedIndustry.cr * 100;
        }
        setEffectiveConversionRate(crValue);

    }, [industry, conversionTier, customConversionRate]);

    useEffect(() => {
        let clValue = 0;
        switch (closeTier) {
            case 'low': clValue = 5; break;
            case 'medium': clValue = 10; break;
            case 'high': clValue = 20; break;
            case 'custom': clValue = customCloseRate; break;
            default: clValue = 10;
        }
        setEffectiveCloseRate(clValue);
    }, [closeTier, customCloseRate]);


    useEffect(() => {
        const selectedIndustry = INDUSTRIES[industry];
        const EXCHANGE_RATE = 1000;
        const cpc = currency === 'USD' ? selectedIndustry.cpc : (selectedIndustry.cpc * EXCHANGE_RATE);

        // Convert rates from percentage (e.g. 3.0) to decimal (0.03)
        const crDecimal = effectiveConversionRate / 100;
        const clDecimal = effectiveCloseRate / 100;

        if (mode === 'roi') {
            // Forward Logic: Budget -> Revenue
            const estimatedTraffic = Math.floor(budget / cpc);
            const estimatedLeads = Math.floor(estimatedTraffic * crDecimal);

            let estimatedSales = 0;
            if (industry === 'ecommerce') {
                estimatedSales = estimatedLeads;
            } else {
                estimatedSales = Math.floor(estimatedLeads * clDecimal);
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
                roiPercent: calculatedRoiPercent,
                requiredBudget: 0
            });
        } else {
            // Reverse Logic: Revenue Goal -> Budget
            // 1. Required Sales = Goal / Ticket
            const requiredSales = Math.ceil(revenueGoal / ticket);

            // 2. Required Leads
            let requiredLeads = 0;
            if (industry === 'ecommerce') {
                requiredLeads = requiredSales;
            } else {
                requiredLeads = Math.ceil(requiredSales / clDecimal);
            }

            // 3. Required Traffic
            const requiredTraffic = Math.ceil(requiredLeads / crDecimal);

            // 4. Required Budget
            const calculatedBudget = requiredTraffic * cpc;

            // ROI stats for this scenario (should be positive hopefully!)
            const netProfit = revenueGoal - calculatedBudget;
            const calculatedRoiPercent = calculatedBudget > 0 ? (netProfit / calculatedBudget) * 100 : 0;

            setResults({
                traffic: requiredTraffic,
                leads: requiredLeads,
                sales: requiredSales,
                revenue: revenueGoal, // In this mode, revenue IS the goal
                roi: netProfit,
                roiPercent: calculatedRoiPercent,
                requiredBudget: calculatedBudget
            });
        }

    }, [mode, revenueGoal, industry, budget, ticket, currency, effectiveConversionRate, effectiveCloseRate]);

    // Setup for Simulate in ROI
    const handleSimulateInRoi = () => {
        setBudget(Math.round(results.requiredBudget));
        setMode('roi');
    };

    // UI Helper for Tier Buttons
    const TierSelector = ({
        label,
        currentTier,
        setTier,
        customValue,
        setCustomValue,
        unit = '%'
    }: {
        label: string,
        currentTier: RateTier,
        setTier: (t: RateTier) => void,
        customValue: number,
        setCustomValue: (v: number) => void,
        unit?: string
    }) => (
        <div className="mb-6">
            <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-400">{label}</label>
                <div className="text-[#00DD82] font-bold text-sm">
                    {currentTier === 'custom' ? customValue :
                        (label === t.inputs.conversionRate ? effectiveConversionRate.toFixed(1) : effectiveCloseRate)}
                    {unit}
                </div>
            </div>
            <div className="flex bg-[#0f0f0f] p-1 rounded-lg border border-gray-800 mb-3">
                {(['low', 'medium', 'high', 'custom'] as RateTier[]).map((tier) => (
                    <button
                        key={tier}
                        onClick={() => setTier(tier)}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${currentTier === tier
                            ? 'bg-gray-800 text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {t.tiers[tier]}
                    </button>
                ))}
            </div>
            {currentTier === 'custom' && (
                <input
                    type="range"
                    min="1"
                    max="50"
                    step="0.5"
                    value={customValue}
                    onChange={(e) => setCustomValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00DD82]"
                />
            )}
        </div>
    );

    return (
        <section id="inversion" className="py-20 bg-gradient-to-br from-[#0a0a0a] to-[#111] relative overflow-hidden border-t border-gray-900">
            {/* Invisible anchor for ROI mode if needed */}
            <div id="roi" className="absolute -top-24 hidden lg:block" />
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute right-0 top-0 w-96 h-96 bg-green-500 rounded-full blur-[128px]" />
                <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {mode === 'roi' ? t.title : t.investment.title} <span className="text-[#00DD82]">Kapi</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {mode === 'roi' ? t.subtitle : t.investment.subtitle}
                    </p>

                    {/* Mode Toggle */}
                    <div className="flex justify-center mt-6">
                        <div className="bg-[#1a1a1a] p-1 rounded-full border border-gray-800 flex">
                            <button
                                onClick={() => setMode('roi')}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'roi' ? 'bg-[#00DD82] text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                ROI Calculator
                            </button>
                            <button
                                onClick={() => setMode('investment')}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'investment' ? 'bg-[#00DD82] text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                {t.investment.modeBtn}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
                    {/* Controls */}
                    <div className="space-y-4">
                        {/* Top Row: Currency & Industry */}
                        <div className="flex gap-4">
                            <div className="w-1/3">
                                <label className="block text-sm font-medium text-gray-400 mb-2">{t.inputs.currency}</label>
                                <div className="flex bg-[#0f0f0f] p-1 rounded-lg border border-gray-800">
                                    <button
                                        onClick={() => setCurrency('ARS')}
                                        className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${currency === 'ARS' ? 'bg-[#00DD82] text-black' : 'text-gray-500'}`}
                                    >
                                        ARS
                                    </button>
                                    <button
                                        onClick={() => setCurrency('USD')}
                                        className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${currency === 'USD' ? 'bg-[#00DD82] text-black' : 'text-gray-500'}`}
                                    >
                                        USD
                                    </button>
                                </div>
                            </div>
                            <div className="w-2/3">
                                <label className="block text-sm font-medium text-gray-400 mb-2">{t.inputs.industry}</label>
                                <select
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value as keyof typeof INDUSTRIES)}
                                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#00DD82] transition-all"
                                >
                                    {Object.entries(INDUSTRIES).map(([key, data]) => (
                                        <option key={key} value={key}>{data.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Middle Input: Budget OR Goal (Depending on Mode) */}
                        {mode === 'roi' ? (
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-400">{t.inputs.budget}</label>
                                    <span className="text-[#00DD82] font-bold">{currency} {budget.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min={currency === 'USD' ? 500 : 500000}
                                    max={currency === 'USD' ? 20000 : 20000000}
                                    step={currency === 'USD' ? 100 : 100000}
                                    value={budget}
                                    onChange={(e) => setBudget(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00DD82]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>{currency === 'USD' ? '$500' : '$500k'}</span>
                                    <span>{currency === 'USD' ? '$20k+' : '$20M+'}</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">{t.investment.goalLabel}</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{currency}</span>
                                    <input
                                        type="number"
                                        value={revenueGoal}
                                        onChange={(e) => setRevenueGoal(Number(e.target.value))}
                                        className="w-full bg-[#1a1a1a] border border-2 border-blue-900/50 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00DD82] transition-all"
                                        placeholder="Ej: 100000"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{t.investment.goalHelp}</p>
                            </div>
                        )}

                        {/* Ticket */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                {mode === 'investment' ? t.investment.ticketLabel : t.inputs.ticket}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{currency}</span>
                                <input
                                    type="number"
                                    value={ticket}
                                    onChange={(e) => setTicket(Number(e.target.value))}
                                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00DD82] transition-all"
                                />
                            </div>
                        </div>

                        {/* Tiers Selections */}
                        <div className="pt-4 border-t border-gray-800">
                            <TierSelector
                                label={t.inputs.conversionRate}
                                currentTier={conversionTier}
                                setTier={setConversionTier}
                                customValue={customConversionRate}
                                setCustomValue={setCustomConversionRate}
                            />

                            {industry !== 'ecommerce' && (
                                <TierSelector
                                    label={t.inputs.closeRate}
                                    currentTier={closeTier}
                                    setTier={setCloseTier}
                                    customValue={customCloseRate}
                                    setCustomValue={setCustomCloseRate}
                                />
                            )}
                        </div>
                    </div>

                    {/* Results Visualizer */}
                    <div className="bg-[#0f0f0f] rounded-2xl p-8 border border-gray-800 flex flex-col justify-between relative overflow-hidden h-full">
                        <div className="z-10 relative flex-1 flex flex-col justify-center">

                            {/* Header Result based on Mode */}
                            <div className="text-center pb-6 border-b border-gray-800 mb-6">
                                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
                                    {mode === 'roi' ? t.results.revenue : t.investment.resultHeader}
                                </p>
                                <motion.p
                                    key={mode === 'roi' ? results.revenue : results.requiredBudget}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-[#00DD82] break-words"
                                >
                                    {currency} {mode === 'roi' ? results.revenue.toLocaleString() : Math.round(results.requiredBudget).toLocaleString()}
                                </motion.p>

                                {mode === 'roi' ? (
                                    results.roiPercent > -100 && (
                                        <div className={`inline-block mt-4 px-4 py-1 rounded-full border ${results.roiPercent > 0 ? 'bg-green-900/30 border-green-500/30' : 'bg-red-900/30 border-red-500/30'}`}>
                                            <span className={results.roiPercent > 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                                                ROI: {results.roiPercent.toFixed(0)}%
                                            </span>
                                        </div>
                                    )
                                ) : (
                                    <div className="mt-4">
                                        <button
                                            onClick={handleSimulateInRoi}
                                            className="text-xs bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto"
                                        >
                                            <Calculator size={14} />
                                            {t.investment.simulateBtn}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Detailed Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-[#1a1a1a] p-3 rounded-xl border border-gray-800">
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <Users size={14} />
                                        <span className="text-[10px] uppercase font-bold">{t.results.traffic}</span>
                                    </div>
                                    <p className="text-lg font-bold text-white">~{results.traffic.toLocaleString()}</p>
                                </div>
                                <div className="bg-[#1a1a1a] p-3 rounded-xl border border-gray-800">
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <Target size={14} />
                                        <span className="text-[10px] uppercase font-bold text-blue-400">{t.results.leads}</span>
                                    </div>
                                    <p className="text-lg font-bold text-white">{results.leads.toLocaleString()}</p>
                                </div>
                                <div className="bg-[#1a1a1a] p-3 rounded-xl border border-gray-800">
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <DollarSign size={14} />
                                        <span className="text-[10px] uppercase font-bold text-green-400">{t.results.sales}</span>
                                    </div>
                                    <p className="text-lg font-bold text-white">{results.sales.toLocaleString()}</p>
                                </div>
                                {/* CTA Box */}
                                <div className="bg-gradient-to-br from-[#00DD82] to-green-600 p-3 rounded-xl border border-green-400 flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform"
                                    onClick={() => setShowEmailModal(true)}
                                >
                                    <p className="text-black font-extrabold text-sm text-center leading-tight whitespace-pre-line">
                                        {t.email.cta}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-800 text-center z-10 relative">
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

            {/* Email Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#111] border border-gray-800 rounded-2xl p-8 max-w-md w-full relative"
                    >
                        <button
                            onClick={() => setShowEmailModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold text-white mb-2">{t.email.title}</h3>
                        <p className="text-gray-400 mb-6 text-sm">{t.email.desc}</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">{t.email.nameLabel}</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00DD82]"
                                    placeholder={language === 'es' ? "Tu nombre" : "Your name"}
                                    value={emailForm.name}
                                    onChange={e => setEmailForm({ ...emailForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">{t.email.emailLabel}</label>
                                <input
                                    type="email"
                                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00DD82]"
                                    placeholder={language === 'es' ? "tu@empresa.com" : "you@company.com"}
                                    value={emailForm.email}
                                    onChange={e => setEmailForm({ ...emailForm, email: e.target.value })}
                                />
                            </div>
                            <button
                                className="w-full bg-[#00DD82] hover:bg-green-400 text-black font-bold py-3 rounded-lg transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSending}
                                onClick={async () => {
                                    setIsSending(true);
                                    try {
                                        // Prepare Report Data
                                        const reportData = {
                                            ...results,
                                            currency,
                                            mode
                                        };

                                        const response = await sendRoiReport({
                                            name: emailForm.name,
                                            email: emailForm.email,
                                            report: reportData
                                        });

                                        if (response.success) {
                                            toast.success(t.email.success);
                                            setShowEmailModal(false);
                                            setEmailForm({ name: '', email: '' });
                                        } else {
                                            toast.error(response.error || t.email.error);
                                        }
                                    } catch (e) {
                                        toast.error(language === 'es' ? 'Ocurrió un error inesperado.' : 'An unexpected error occurred.');
                                    } finally {
                                        setIsSending(false);
                                    }
                                }}
                            >
                                {isSending ? t.email.sending : t.email.submitBtn}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

        </section>
    );
};

export default RoiCalculator;
