'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Smartphone,
    AlertTriangle,
    Search,
    ShoppingCart,
    ArrowRight,
    Zap,
    MapPin,
    MessageCircle,
    CheckCircle,
    TrendingUp,
    Award
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
    <div className={`bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#00e676]/50 transition-all duration-300 backdrop-blur-md ${className}`}>
        {children}
    </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/20 shadow-[0_0_10px_rgba(0,230,118,0.2)]">
        {children}
    </span>
);

export default function CelupLanding() {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00e676] selection:text-black overflow-x-hidden">

            {/* --- Hero Section --- */}
            <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00e676]/20 rounded-full blur-[150px] -z-10 opacity-40" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20 opacity-20" />

                <FadeIn className="text-center z-10">
                    <div className="mb-8 flex justify-center">
                        <div className="flex items-center gap-1 text-3xl font-bold tracking-tighter">
                            <span>cel</span>
                            <span className="text-[#00e676] flex items-center">
                                up
                                <TrendingUp className="w-6 h-6 ml-0.5 stroke-[3]" />
                            </span>
                            <span className="text-gray-500">.ar</span>
                        </div>
                    </div>

                    <Badge>Proyecto de Innovación 2026</Badge>

                    <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                        Tu celular, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e676] to-emerald-400">arriba</span>.
                        <br />
                        Tu negocio, <span className="text-white">también</span>.
                    </h1>

                    <p className="mt-8 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">
                        La primera red de reparación certificada impulsada por un importador.
                    </p>

                    <div className="mt-12 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#00e676] blur-xl opacity-30 rounded-full"></div>
                            <Smartphone className="relative w-24 h-24 text-white drop-shadow-[0_0_15px_rgba(0,230,118,0.5)]" strokeWidth={1} />
                            <div className="absolute -top-4 -right-4">
                                <Zap className="w-8 h-8 text-[#00e676] animate-pulse" fill="currentColor" />
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* --- The Problem --- */}
            <section className="py-24 px-6 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <FadeIn className="mb-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold">La desconexión del mercado actual</h2>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FadeIn delay={0.1}>
                            <Card className="h-full border-l-4 border-l-red-500/50">
                                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                                    <Search className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">El Usuario</h3>
                                <p className="text-gray-400">Busca en Google sin referencias de confianza y teme por la seguridad de su equipo y sus datos.</p>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <Card className="h-full border-l-4 border-l-yellow-500/50">
                                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-6">
                                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">El Técnico</h3>
                                <p className="text-gray-400">Compite por precio de mano de obra en un océano rojo y lucha diariamente por conseguir clientes nuevos.</p>
                            </Card>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <Card className="h-full border-l-4 border-l-blue-500/50">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                                    <ShoppingCart className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Distriland</h3>
                                <p className="text-gray-400">Solo entra al final de la cadena (venta del repuesto), compitiendo por margen en MercadoLibre.</p>
                            </Card>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* --- Demo del Producto (3D Phone) --- */}
            <section className="py-32 px-6 overflow-hidden relative">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#00e676]/10 rounded-full blur-[120px] -z-10"></div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                    <div className="order-2 md:order-1 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00e676]/10 border border-[#00e676]/20 text-[#00e676] text-xs font-bold tracking-widest uppercase mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e676] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e676]"></span>
                            </span>
                            Experiencia de Usuario
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">Diagnóstico en <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e676] to-emerald-400">3 Clics</span></h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">Olvidate de los formularios largos. Diseñamos una interfaz conversacional que captura la falla en segundos y cierra la venta al instante.</p>

                        <div className="space-y-6">
                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-[#1f2937] flex items-center justify-center text-[#00e676] font-bold text-xl group-hover:bg-[#00e676] group-hover:text-black transition-colors duration-300 shadow-lg shadow-black/50">1</div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Selección Rápida</h4>
                                    <p className="text-gray-500 text-sm">Marca y Modelo con iconos visuales.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-[#1f2937] flex items-center justify-center text-[#00e676] font-bold text-xl group-hover:bg-[#00e676] group-hover:text-black transition-colors duration-300 shadow-lg shadow-black/50">2</div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Auto-Diagnóstico</h4>
                                    <p className="text-gray-500 text-sm">&quot;Pantalla rota&quot;, &quot;No carga&quot;, &quot;Batería&quot;.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-[#1f2937] flex items-center justify-center text-[#00e676] font-bold text-xl group-hover:bg-[#00e676] group-hover:text-black transition-colors duration-300 shadow-lg shadow-black/50">3</div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Derivación Inteligente</h4>
                                    <p className="text-gray-500 text-sm">Presupuesto estimado y conexión con el técnico.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 flex justify-center perspective-[2000px]">
                        <div className="relative w-[320px] h-[650px] bg-black rounded-[3rem] border-[8px] border-[#2d2d2d] shadow-[0_0_60px_-15px_rgba(0,230,118,0.3)] overflow-hidden transform rotate-y-[-12deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-all duration-700 ease-out group">

                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30"></div>

                            <div className="absolute top-32 -left-[10px] w-[3px] h-10 bg-[#1f2937] rounded-l-md"></div>
                            <div className="absolute top-48 -left-[10px] w-[3px] h-16 bg-[#1f2937] rounded-l-md"></div>
                            <div className="absolute top-40 -right-[10px] w-[3px] h-20 bg-[#1f2937] rounded-r-md"></div>

                            <div className="w-full h-full bg-[#0a0a0a] pt-14 px-5 relative flex flex-col font-sans">
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 flex items-center justify-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-900/20 rounded-full"></div>
                                </div>

                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-[#00e676]"></span>
                                        <span className="font-bold text-white tracking-tighter text-lg">cel<span className="text-[#00e676]">up</span></span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                                    </div>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#00e676] flex items-center justify-center text-black font-bold text-xs shrink-0">AI</div>
                                        <div className="bg-[#1f2937] p-3 rounded-2xl rounded-tl-none text-sm text-gray-200 shadow-sm border border-white/5">
                                            <p>Hola 👋 ¿Qué equipo necesitás reparar hoy?</p>
                                        </div>
                                    </div>

                                    <div className="pl-11 flex flex-wrap gap-2">
                                        <span className="bg-[#00e676] text-black text-xs font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-[#00c853] transition">Samsung</span>
                                        <span className="bg-white/5 text-gray-300 text-xs px-4 py-2 rounded-full border border-white/10">Motorola</span>
                                        <span className="bg-white/5 text-gray-300 text-xs px-4 py-2 rounded-full border border-white/10">iPhone</span>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <div className="w-8 h-8 rounded-full bg-[#00e676] flex items-center justify-center text-black font-bold text-xs shrink-0">AI</div>
                                        <div className="bg-[#1f2937] p-3 rounded-2xl rounded-tl-none text-sm text-gray-200 shadow-sm border border-white/5">
                                            <p>Entendido. ¿Qué falla tiene el <strong>Samsung A32</strong>?</p>
                                        </div>
                                    </div>

                                    <div className="pl-11 space-y-2">
                                        <div className="bg-[#00e676]/10 p-3 rounded-xl border border-[#00e676]/30 flex items-center gap-3 cursor-pointer">
                                            <div className="w-8 h-8 bg-[#00e676]/20 rounded-lg flex items-center justify-center text-[#00e676]">⚡</div>
                                            <div>
                                                <span className="text-xs font-bold text-white block">Pantalla Rota</span>
                                                <span className="text-[10px] text-gray-400">Vidrio astillado o sin imagen</span>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center gap-3 opacity-50">
                                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-gray-400">🔋</div>
                                            <span className="text-xs text-gray-300">La batería dura poco</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto mb-6">
                                    <div className="bg-gradient-to-r from-[#1f2937] to-[#111] p-4 rounded-2xl border border-white/10 shadow-2xl">
                                        <div className="flex justify-between items-end mb-3">
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Estimado</p>
                                                <p className="text-white font-bold text-lg">$45.000 <span className="text-xs font-normal text-gray-500">aprox</span></p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-[#00e676] font-bold">● Stock Disponible</p>
                                            </div>
                                        </div>
                                        <button className="w-full bg-[#00e676] text-black text-sm font-bold py-3 rounded-xl hover:bg-[#00c853] transition shadow-[0_0_15px_rgba(0,230,118,0.4)]">
                                            Buscar Técnico Cerca
                                        </button>
                                    </div>
                                </div>

                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- The Solution (Ecosystem) --- */}
            <section className="py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#00e676]/5 skew-y-3 transform origin-top-left -z-10"></div>

                <div className="max-w-7xl mx-auto">
                    <FadeIn className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Ecosistema 360° Celup</h2>
                        <p className="text-2xl text-[#00e676] font-medium">No vendemos repuestos. Vendemos soluciones de reparación.</p>
                    </FadeIn>

                    {/* Horizontal Flow */}
                    <div className="hidden md:grid grid-cols-4 gap-4 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e676]/30 to-transparent -translate-y-1/2 z-0"></div>

                        {[
                            { title: "Demanda", icon: Search, desc: "Usuario diagnostica su falla en celup.ar" },
                            { title: "Match", icon: MapPin, desc: "Algoritmo deriva al Técnico Certificado" },
                            { title: "Notificación", icon: MessageCircle, desc: "Alerta WhatsApp: Cliente + Link Repuesto" },
                            { title: "Venta", icon: ShoppingCart, desc: "Repuesto sale de Distriland (CAC $0)" }
                        ].map((step, idx) => (
                            <FadeIn key={idx} delay={idx * 0.2} className="relative z-10">
                                <div className="bg-[#111] border border-[#00e676]/30 p-6 rounded-xl text-center h-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,230,118,0.1)]">
                                    <div className="w-16 h-16 mx-auto bg-[#00e676]/10 rounded-full flex items-center justify-center mb-4 border border-[#00e676]/50">
                                        <step.icon className="w-8 h-8 text-[#00e676]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-400">{step.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Mobile Flow (Vertical) */}
                    <div className="md:hidden space-y-8 relative">
                        <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-[#00e676]/30 to-transparent z-0"></div>
                        {[
                            { title: "Demanda", icon: Search, desc: "Usuario diagnostica su falla en celup.ar" },
                            { title: "Match", icon: MapPin, desc: "Algoritmo deriva al Técnico Certificado" },
                            { title: "Notificación", icon: MessageCircle, desc: "Alerta WhatsApp: Cliente + Link Repuesto" },
                            { title: "Venta", icon: ShoppingCart, desc: "Repuesto sale de Distriland (CAC $0)" }
                        ].map((step, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1} className="relative z-10 pl-20">
                                <div className="absolute left-4 top-0 w-8 h-8 bg-[#00e676] rounded-full flex items-center justify-center border-4 border-black">
                                    <span className="text-black font-bold text-xs">{idx + 1}</span>
                                </div>
                                <div className="bg-[#111] border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                                    <p className="text-sm text-gray-400">{step.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Dominio SEO (Google Search) --- */}
            <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Captura de Tráfico Orgánico</h2>
                        <p className="text-gray-400">Nos adelantamos a la competencia capturando la intención informativa.</p>
                    </div>

                    <div className="bg-[#1f1f1f] rounded-2xl p-6 md:p-8 text-left max-w-3xl mx-auto shadow-2xl border border-[#333] relative overflow-hidden group hover:border-[#00e676]/30 transition-colors duration-500">

                        <div className="bg-[#303134] rounded-full px-6 py-4 mb-8 flex items-center gap-4 border border-[#3e4042] shadow-inner">
                            <span className="text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></span>
                            <div className="relative overflow-hidden w-full h-6 flex items-center">
                                <span className="text-gray-200 text-sm md:text-base font-medium whitespace-nowrap overflow-hidden border-r-2 border-[#00e676] animate-[typing_3.5s_steps(40,end),blink_.75s_step-end_infinite]">
                                    arreglo pantalla samsung a32 zona sur
                                </span>
                            </div>
                            <span className="text-blue-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg></span>
                        </div>

                        <div className="flex gap-4 mb-6 border-b border-white/10 pb-4 text-sm text-gray-400">
                            <span className="text-white border-b-2 border-[#8ab4f8] pb-3 px-1">Todos</span>
                            <span className="hover:text-gray-200 cursor-pointer">Maps</span>
                            <span className="hover:text-gray-200 cursor-pointer">Imágenes</span>
                            <span className="hover:text-gray-200 cursor-pointer">Shopping</span>
                        </div>

                        <div className="mb-8 pl-4 border-l-2 border-[#00e676] bg-[#00e676]/[0.02] p-4 -ml-4 rounded-r-lg relative">
                            <div className="absolute -right-2 top-2 bg-[#00e676] text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-[0_0_10px_#00e676] uppercase tracking-wider">Tu Marca Aquí</div>

                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-[#202124] rounded-full p-1.5 border border-white/10"><img src="/logo-kapi-verde.svg" className="w-5 h-5 rounded-full bg-white object-contain p-0.5" /></div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-[#dadce0]">celup.ar</span>
                                    <span className="text-xs text-[#9aa0a6]">https://celup.ar › reparacion › samsung</span>
                                </div>
                                <span className="text-gray-500 text-xs">⋮</span>
                            </div>
                            <h3 className="text-[#8ab4f8] text-xl font-medium hover:underline cursor-pointer mb-1 decoration-[#8ab4f8]">Reparación Samsung A32 en el Acto - Red Oficial</h3>
                            <p className="text-sm text-[#bdc1c6] leading-relaxed">
                                Encontrá <strong>técnicos certificados</strong> cerca tuyo. Repuestos originales y garantía oficial Distriland. Precios transparentes y turno online. <span className="text-[#fbbc04]">★★★★★</span> (450)
                            </p>
                            <div className="mt-3 flex gap-4 text-sm text-[#8ab4f8]">
                                <span className="hover:underline cursor-pointer">Pedir Turno</span>
                                <span className="hover:underline cursor-pointer">Ver Precios</span>
                                <span className="hover:underline cursor-pointer">Técnicos Zona Sur</span>
                            </div>
                        </div>

                        <div className="pl-4 opacity-40 blur-[0.5px] hover:blur-0 transition-all duration-300 select-none">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-7 h-7 bg-gray-700 rounded-full"></div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-400">mercadolibre.com.ar</span>
                                    <span className="text-xs text-gray-500">https://listado.mercadolibre.com.ar › modulo-a32</span>
                                </div>
                            </div>
                            <h3 className="text-[#8ab4f8] text-xl font-medium mb-1">Cambio Pantalla Samsung A32 | Cuotas sin interés</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Envíos Gratis en el día. Comprá Cambio De Modulo Samsung A32...
                            </p>
                        </div>

                    </div>

                    <p className="mt-8 text-gray-500 text-xs uppercase tracking-widest font-medium">Visualización de posicionamiento estratégico SEO Local</p>
                </div>
                <style jsx>{`
                    @keyframes typing { from { width: 0 } to { width: 100% } }
                    @keyframes blink { 50% { border-color: transparent } }
                `}</style>
            </section>

            {/* --- Gamification --- */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <Badge>Gamificación B2B</Badge>
                            <h2 className="mt-6 text-4xl md:text-5xl font-bold mb-6">Tier System</h2>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                El posicionamiento del técnico en el mapa depende de su volumen de compra en Distriland.
                                <br /><br />
                                <span className="text-[#00e676]">Más compras = Más visibilidad = Más clientes.</span>
                            </p>
                        </FadeIn>

                        <div className="space-y-4">
                            {[
                                { name: "Bronce", color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/5", benefit: "Visibilidad Básica en Mapa" },
                                { name: "Plata", color: "text-gray-300", border: "border-gray-300/30", bg: "bg-gray-300/5", benefit: "Leads Destacados + Badge Verificado" },
                                { name: "Gold Partner", color: "text-yellow-400", border: "border-yellow-400/50", bg: "bg-yellow-400/10", benefit: "Prioridad Absoluta + Descuentos Odoo" }
                            ].map((tier, idx) => (
                                <FadeIn key={idx} delay={0.2 + (idx * 0.1)}>
                                    <div className={`flex items-center justify-between p-6 rounded-xl border ${tier.border} ${tier.bg} backdrop-blur-sm`}>
                                        <div className="flex items-center gap-4">
                                            <Award className={`w-8 h-8 ${tier.name === 'Gold Partner' ? 'animate-pulse' : ''} ${tier.color}`} />
                                            <span className={`text-xl font-bold ${tier.color}`}>{tier.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-300 font-medium">{tier.benefit}</span>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MVP --- */}
            <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Fase 1: Lanzamiento MVP</h2>
                        <p className="text-gray-400">Qué construimos en los próximos 30 días</p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        {[
                            "Plataforma Web App (Diagnóstico de fallas)",
                            "Directorio de Técnicos Geolocalizado (Top 50)",
                            "Sistema de alertas a WhatsApp",
                            "Landing de reclutamiento de Talleres"
                        ].map((item, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="flex items-center gap-4 bg-[#111] p-4 rounded-lg border border-white/5">
                                    <CheckCircle className="w-6 h-6 text-[#00e676] flex-shrink-0" />
                                    <span className="text-lg text-gray-200">{item}</span>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Pricing --- */}
            <section className="py-32 px-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,230,118,0.05),transparent_60%)]"></div>

                <div className="max-w-3xl mx-auto relative z-10">
                    <FadeIn>
                        <div className="bg-[#050505] border border-[#00e676]/50 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_50px_rgba(0,230,118,0.1)] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#00e676] to-transparent"></div>

                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Implementación de Activo Digital</h2>
                            <p className="text-gray-400 mb-8">Desarrollo integral de unidad de negocio Celup.ar</p>

                            <div className="mb-8">
                                <span className="text-5xl md:text-7xl font-black text-white tracking-tight">$1.000.000</span>
                                <span className="text-xl text-gray-500 ml-2">+ IVA</span>
                                <p className="text-sm text-[#00e676] mt-2 uppercase tracking-widest font-bold">Pago Único</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
                                <p className="text-gray-300 text-sm">
                                    <span className="text-white font-bold">Desglose:</span> Anticipo $500.000 (Inicio) + Saldo $500.000 (Contra lanzamiento Beta)
                                </p>
                            </div>

                            <p className="text-xs text-gray-500 mb-8">
                                * Mantenimiento bonificado dentro del Fee Mensual de Agencia.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-24 px-6 text-center">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">"El que controla la demanda,<br />controla el mercado."</h2>

                    <a
                        href="https://wa.me/5491140753480?text=Aprobar%20MVP%20Celup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-4 bg-[#00e676] text-black font-black py-6 px-12 rounded-full text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.4)] overflow-hidden"
                    >
                        <span className="relative z-10">APROBAR MVP Y LANZAR CELUP</span>
                        <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </a>
                </FadeIn>
            </section>

            {/* --- Footer --- */}
            <footer className="py-8 text-center border-t border-white/5 text-gray-600 text-xs uppercase tracking-widest">
                <p>Kapi.com.ar • Documento Confidencial Distriland</p>
            </footer>

        </div>
    );
}
