'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Database,
    Lightbulb,
    CheckCircle,
    ArrowRight,
    ShieldCheck,
    BarChart3,
    Users,
    Rocket
} from 'lucide-react';

// --- Components ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-[#00e676]/50 transition-colors duration-300 ${className}`}>
        {children}
    </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/20">
        {children}
    </span>
);

export default function DistrilandProposal() {
    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-[#00e676]/30 selection:text-white">

            {/* --- Header --- */}
            <header className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-white">KAPI</span>
                        <span className="text-[#00e676]">•</span>
                        <span className="text-sm font-medium tracking-widest text-gray-400">POTENCIA DIGITAL</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#00e676]" />
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Documento Confidencial: Distriland</span>
                    </div>
                </div>
            </header>

            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#00e676]/10 rounded-full blur-[120px] -z-10" />

                <div className="max-w-5xl mx-auto text-center">
                    <FadeIn>
                        <Badge>Propuesta Estratégica 2025</Badge>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <h1 className="mt-6 text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                            Plan Estratégico de <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Expansión 2025</span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <p className="mt-6 text-xl md:text-2xl text-gray-400 font-light">
                            Dirección de Marketing & Desarrollo de Negocios para <span className="text-white font-medium">Distriland</span>
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
                            Transformando infraestructura tecnológica en liderazgo de mercado. De la importación a la consolidación del gremio técnico.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* --- Section 1: Diagnosis & Opportunity --- */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <FadeIn>
                            <Card className="h-full border-l-4 border-l-gray-700">
                                <div className="flex items-center gap-3 mb-4">
                                    <BarChart3 className="w-6 h-6 text-gray-400" />
                                    <h3 className="text-xl font-bold text-white">Situación Actual</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed">
                                    Distriland cuenta con activos sólidos: 7 años de trayectoria, implementación de Odoo + Tienda Nube y equipo de diseño in-house. Sin embargo, la dependencia de MercadoLibre comprime márgenes y diluye la identidad de marca ante el gremio.
                                </p>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <Card className="h-full border-l-4 border-l-[#00e676] bg-[#00e676]/[0.02]">
                                <div className="flex items-center gap-3 mb-4">
                                    <Rocket className="w-6 h-6 text-[#00e676]" />
                                    <h3 className="text-xl font-bold text-white">La Solución Kapi</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Evolucionar de &quot;Vendedor Mayorista&quot; a <strong className="text-white">&quot;Socio Estratégico del Técnico&quot;</strong>. Implementaremos una Dirección Externa de Marketing para unificar canales, optimizar la inversión publicitaria y desarrollar nuevas unidades de negocio propias.
                                </p>
                            </Card>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* --- Section 2: Pillars --- */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <FadeIn className="mb-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Pilares del Servicio</h2>
                        <div className="w-20 h-1 bg-[#00e676] mx-auto mt-6 rounded-full" />
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-6">
                        <FadeIn delay={0.1}>
                            <Card className="h-full group">
                                <div className="w-12 h-12 rounded-lg bg-[#00e676]/10 flex items-center justify-center mb-6 group-hover:bg-[#00e676] transition-colors duration-300">
                                    <TrendingUp className="w-6 h-6 text-[#00e676] group-hover:text-black transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Performance & Tráfico</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Gestión intensiva de campañas en Google Ads (Búsqueda Técnica) y Meta Ads (Catálogo) orientadas a ROAS. Segmentación dual: Gremio (B2B) vs Consumidor Final (B2C).
                                </p>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <Card className="h-full group">
                                <div className="w-12 h-12 rounded-lg bg-[#00e676]/10 flex items-center justify-center mb-6 group-hover:bg-[#00e676] transition-colors duration-300">
                                    <Database className="w-6 h-6 text-[#00e676] group-hover:text-black transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Inteligencia Odoo (Data)</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Alineación de métricas entre el ERP y Marketing. Uso de datos históricos para automatizar Email Marketing y detectar tendencias de importación.
                                </p>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <Card className="h-full group">
                                <div className="w-12 h-12 rounded-lg bg-[#00e676]/10 flex items-center justify-center mb-6 group-hover:bg-[#00e676] transition-colors duration-300">
                                    <Lightbulb className="w-6 h-6 text-[#00e676] group-hover:text-black transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Innovación y Desarrollo</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Consultoría estratégica para crear nuevas unidades de negocio. Kapi presentará trimestralmente proyectos de innovación (MVPs) para capturar mercado.
                                </p>
                            </Card>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* --- Section 3: Roadmap --- */}
            <section className="py-24 px-6 bg-white/[0.02] relative overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <FadeIn className="mb-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Roadmap de Ejecución</h2>
                        <p className="mt-4 text-gray-400">Cronograma estimado de implementación</p>
                    </FadeIn>

                    <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-12">
                        {[
                            {
                                phase: "Fase 1: Desembarco",
                                time: "Mes 1",
                                desc: "Auditoría Técnica 360 (SEO/Pixels). Setup de herramientas. Activación inmediata de Campaña 'Fiestas' para rotación de stock y generación de caja rápida."
                            },
                            {
                                phase: "Fase 2: Tracción",
                                time: "Mes 2-3",
                                desc: "Lanzamiento de Estrategia Gremio. Migración de ventas de ML a Web Propia. Presentación y puesta en marcha del Primer Módulo de Innovación (Proyecto Especial)."
                            },
                            {
                                phase: "Fase 3: Escala",
                                time: "Mes 4-6",
                                desc: "Consolidación del ecosistema Odoo. Posicionamiento SEO orgánico. Revisión semestral de objetivos y presupuesto."
                            }
                        ].map((item, idx) => (
                            <FadeIn key={idx} delay={idx * 0.2} className="relative pl-12 md:pl-0">
                                <div className="md:flex items-start justify-between group">
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-[#00e676] shadow-[0_0_10px_#00e676] md:left-1/2 md:-translate-x-1.5" />

                                    <div className="md:w-[45%] md:text-right md:pr-12 mb-2 md:mb-0">
                                        <span className="text-[#00e676] font-mono text-sm tracking-wider uppercase">{item.time}</span>
                                        <h3 className="text-xl font-bold text-white mt-1">{item.phase}</h3>
                                    </div>

                                    <div className="md:w-[45%] md:pl-12">
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Section 4: Budget --- */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <FadeIn className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Inversión y Presupuesto</h2>
                    </FadeIn>

                    <FadeIn>
                        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10">
                                <div className="p-8 md:col-span-8">
                                    <h3 className="text-xl font-bold text-white mb-2">Fee Mensual Agencia (Partner)</h3>
                                    <p className="text-gray-400 text-sm">Incluye: Dirección, Estrategia, Gestión de Campañas, Reportes y Consultoría.</p>
                                </div>
                                <div className="p-8 md:col-span-4 bg-white/[0.02] flex items-center justify-center md:justify-end border-t md:border-t-0 md:border-l border-white/10">
                                    <div className="text-center md:text-right">
                                        <span className="block text-2xl font-bold text-[#00e676]">$1.250.000</span>
                                        <span className="text-xs text-gray-500 uppercase">+ IVA / mes</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="p-8 md:col-span-8">
                                    <h3 className="text-xl font-bold text-white mb-2">Inversión Publicitaria (Ad Spend)</h3>
                                    <p className="text-gray-400 text-sm">Presupuesto sugerido para pago directo a plataformas (Google/Meta).</p>
                                </div>
                                <div className="p-8 md:col-span-4 bg-white/[0.02] flex items-center justify-center md:justify-end border-t md:border-t-0 md:border-l border-white/10">
                                    <div className="text-center md:text-right">
                                        <span className="block text-xl font-bold text-white">Desde $750.000</span>
                                        <span className="text-xs text-gray-500 uppercase">/ mes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 text-center text-xs text-gray-500">
                            * El desarrollo de MVPs o Proyectos de Innovación Tecnológica (como plataformas o apps) se cotizarán como implementaciones únicas por separado.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-24 px-6 text-center">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">¿Comenzamos la transformación?</h2>
                    <a
                        href="https://wa.me/5491112345678" // Reemplazar con el número real si se tiene, o un mailto
                        className="inline-flex items-center gap-3 bg-[#00e676] text-black font-bold py-4 px-10 rounded-full text-lg hover:bg-[#00c853] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,230,118,0.4)]"
                    >
                        Aceptar Propuesta y Agendar Kick-off
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </FadeIn>
            </section>

            {/* --- Footer --- */}
            <footer className="py-8 text-center border-t border-white/5 text-gray-600 text-sm">
                <p>Kapi.com.ar | Propuesta válida por 15 días.</p>
            </footer>

        </div>
    );
}
