"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export function Showcase() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [activeTab, setActiveTab] = useState("Overview");
    const tabs = ["Overview", "Network Map", "Energy Analytics", "Maintenance", "Settings"];

    // Auto-cycle tabs every few seconds
    useEffect(() => {
        if (!isInView) return; // Only start cycling when the dashboard is visible
        const interval = setInterval(() => {
            setActiveTab(current => {
                const currentIndex = tabs.indexOf(current);
                return tabs[(currentIndex + 1) % tabs.length];
            });
        }, 3000); // changes every 3 seconds
        
        return () => clearInterval(interval);
    }, [isInView, tabs]);

    const renderMainContent = () => {
        switch (activeTab) {
            case "Overview":
                return (
                    <motion.div 
                        key="overview"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-[10] p-6 h-full flex flex-col justify-between"
                    >
                        {/* Top Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { label: "Active Nodes", val: "1,248", trend: "+12", ok: true },
                                { label: "Energy Saved", val: "342 kWh", trend: "Today", ok: true },
                                { label: "Faults Detected", val: "3", trend: "Requires Action", ok: false }
                            ].map((stat, i) => (
                                <div key={i} className={`p-4 rounded-xl border backdrop-blur-md ${stat.ok ? 'bg-[#0c0c10]/80 border-[#1a1a24]' : 'bg-red-950/20 border-red-500/20'}`}>
                                    <div className="text-[12px] text-[#8e8e99] font-medium mb-1">{stat.label}</div>
                                    <div className="flex items-end justify-between">
                                        <div className={`text-2xl font-bold ${stat.ok ? 'text-[#e2e2e8]' : 'text-red-400'}`}>{stat.val}</div>
                                        <div className={`text-[11px] font-medium ${stat.ok ? 'text-green-400' : 'text-red-400'}`}>{stat.trend}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Info Panel */}
                        <div className="mt-auto w-full max-w-sm rounded-xl bg-[#0c0c10]/90 backdrop-blur-md border border-[#1a1a24] p-4">
                            <div className="text-[12px] font-semibold text-[#e2e2e8] mb-3">Live Feed</div>
                            <div className="space-y-3">
                                {[
                                    { time: "Just now", msg: "Lamp #402 automatically dimmed (sunrise limit)", lux: "-40%" },
                                    { time: "2m ago", msg: "Lamp #118 fault detected (voltage drop)", lux: "Err", alert: true },
                                    { time: "15m ago", msg: "Sector A scheduled power-on complete", lux: "100%" },
                                ].map((feed, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${feed.alert ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-blue-500'}`} />
                                        <div className="flex-1">
                                            <div className={`text-[12px] font-medium ${feed.alert ? 'text-red-300' : 'text-[#c4c4cc]'}`}>{feed.msg}</div>
                                            <div className="text-[10px] text-[#6a6a75] mt-0.5">{feed.time}</div>
                                        </div>
                                        <div className={`text-[11px] font-bold ${feed.alert ? 'text-red-500' : 'text-blue-400'}`}>{feed.lux}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );
            case "Network Map":
                return (
                    <motion.div 
                        key="network"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-[10] p-6 h-full flex flex-col items-center justify-center text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                            <span className="text-2xl">🌍</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Topological Map</h3>
                        <p className="text-sm text-[#8e8e99] max-w-[300px]">Viewing 1,248 active streetlights across District 4. Grid stable.</p>
                    </motion.div>
                );
            case "Energy Analytics":
                return (
                    <motion.div 
                        key="energy"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-[10] p-6 h-full flex flex-col"
                    >
                        <h3 className="text-base font-bold text-white mb-4">Weekly Consumption</h3>
                        <div className="flex-1 bg-[#121218]/80 backdrop-blur border border-[#1a1a24] rounded-xl p-6 flex flex-col justify-end gap-2">
                            <div className="flex items-end justify-between gap-2 h-full pt-4">
                                {[40, 60, 45, 80, 50, 90, 65].map((h, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ height: 0 }} 
                                        animate={{ height: `${h}%` }} 
                                        transition={{ delay: i * 0.1, type: "spring" }}
                                        className="w-full bg-gradient-to-t from-blue-500/20 to-blue-500 rounded-t-md"
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] uppercase font-bold text-[#6a6a75] mt-2">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>
                    </motion.div>
                );
            case "Maintenance":
                return (
                    <motion.div 
                        key="maintenance"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-[10] p-6 h-full flex flex-col"
                    >
                        <h3 className="text-base font-bold text-white mb-4">Pending Tickets</h3>
                        <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                            {[
                                { id: "TKT-1049", state: "Urgent", desc: "Lamp #118 completely offline" },
                                { id: "TKT-1048", state: "Open", desc: "Sector C dimming schedule failure" },
                                { id: "TKT-1045", state: "In Progress", desc: "Firmware update for Sector B" }
                            ].map((tkt, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    className="p-3 bg-[#121218]/90 backdrop-blur rounded-xl border border-[#1a1a24] flex justify-between items-center"
                                >
                                    <div>
                                        <div className="text-[13px] font-bold text-[#e2e2e8]">{tkt.id}</div>
                                        <div className="text-[12px] text-[#8e8e99]">{tkt.desc}</div>
                                    </div>
                                    <span className={`text-[10px] px-2 py-1 rounded font-medium ${tkt.state === 'Urgent' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                        {tkt.state}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                );
            case "Settings":
                return (
                    <motion.div 
                        key="settings"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-[10] p-6 h-full flex flex-col items-center justify-center text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                            <span className="text-2xl">⚙️</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">System Preferences</h3>
                        <p className="text-sm text-[#8e8e99] max-w-[300px] mb-4">Configure global illumination schedules, thresholds, and administrative access.</p>
                        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium rounded-lg">
                            Edit configuration
                        </button>
                    </motion.div>
                );
            default: return null;
        }
    }

    return (
        <section id="showcase" className="relative z-[20] py-[120px] overflow-hidden">
            {/* Section separator */}
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), rgba(37,99,235,0.08), transparent)" }} />
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 80%, rgba(59,130,246,0.04) 0%, transparent 60%)" }} />
            <div ref={ref} className="max-w-[1200px] mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                    className="text-center mb-[72px]"
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
                        <span className="section-label relative z-10" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>03 — Showcase</span>
                    </motion.div>
                    <motion.h2 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                        className="font-[var(--font-heading)] text-[clamp(32px,5vw,56px)] text-white font-bold leading-[1.12] mb-[18px] tracking-tight relative z-10"
                        style={{ textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)" }}
                    >
                        See It in <span className="text-[#3b82f6]">Action</span>
                    </motion.h2>
                    <motion.p 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                        className="text-lg text-[#f3f4f6] font-medium max-w-[540px] mx-auto leading-relaxed relative z-10"
                        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)" }}
                    >
                        A glimpse of the LightOS experience.
                    </motion.p>
                </motion.div>

                {/* Window */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.94 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="max-w-[920px] mx-auto rounded-3xl overflow-hidden border border-[rgba(59,130,246,0.12)]"
                    style={{
                        boxShadow: "0 30px 100px rgba(0,0,0,0.5), 0 0 60px rgba(59,130,246,0.04)",
                    }}
                >
                    {/* Title Bar */}
                    <div className="flex items-center px-[18px] py-3.5 border-b border-[rgba(59,130,246,0.08)]" style={{ background: "linear-gradient(180deg, #1a1610, #141009)" }}>
                        <div className="flex gap-2">
                            <motion.span whileHover={{ scale: 1.3 }} className="w-3 h-3 rounded-full cursor-pointer" style={{ background: "#ff5f57", boxShadow: "0 0 8px rgba(255,95,87,0.3)" }} />
                            <motion.span whileHover={{ scale: 1.3 }} className="w-3 h-3 rounded-full cursor-pointer" style={{ background: "#febc2e", boxShadow: "0 0 8px rgba(254,188,46,0.3)" }} />
                            <motion.span whileHover={{ scale: 1.3 }} className="w-3 h-3 rounded-full cursor-pointer" style={{ background: "#28c840", boxShadow: "0 0 8px rgba(40,200,64,0.3)" }} />
                        </div>
                        <div className="flex-1 text-center text-[13px] text-[var(--color-text-muted)] font-medium">
                            LightOS Desktop
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="relative h-[380px] sm:h-[450px] md:h-[550px] flex overflow-hidden bg-[#09090b]">
                        
                        {/* 1. Left Sidebar (Navigation & Quick Stats) */}
                        <div className="w-[200px] sm:w-[240px] border-r border-[#1a1a24] bg-[#0c0c10] flex flex-col pt-6 pb-4 z-[20] hidden sm:flex shadow-2xl">
                            <div className="px-5 mb-8">
                                <h3 className="text-[#e2e2e8] font-bold tracking-wide text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                    LightOS Control
                                </h3>
                            </div>

                            <nav className="flex-1 px-3">
                                {["Overview", "Network Map", "Energy Analytics", "Maintenance", "Settings"].map((item, i) => {
                                    const isActive = activeTab === item;
                                    return (
                                        <div 
                                            key={i} 
                                            onClick={() => setActiveTab(item)}
                                            className={`px-3 py-2.5 rounded-lg mb-1 flex items-center gap-3 text-[13px] font-medium transition-colors cursor-pointer ${isActive ? "bg-[#1c2033] text-blue-400 border border-blue-500/20" : "text-[#8e8e99] hover:bg-[#15151e] hover:text-[#c4c4cc]"}`}
                                        >
                                            <div className={`w-4 h-4 rounded-[4px] ${isActive ? "bg-blue-500/20" : "bg-[#2a2a35]"}`} />
                                            {item}
                                        </div>
                                    );
                                })}
                            </nav>

                            <div className="px-5 mt-auto">
                                <div className="p-4 rounded-xl bg-[#121218] border border-[#1a1a24]">
                                    <div className="text-[11px] text-[#8e8e99] font-semibold uppercase tracking-wider mb-1">System Health</div>
                                    <div className="text-xl font-bold text-[#e2e2e8] mb-1">99.8%</div>
                                    <div className="w-full bg-[#2a2a35] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full w-[99.8%]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Main Area */}
                        <div className="flex-1 flex flex-col relative overflow-hidden">
                            {/* Top Bar inside Dashboard */}
                            <div className="h-14 border-b border-[#1a1a24] bg-[#09090b]/80 backdrop-blur flex items-center justify-between px-6 z-[20]">
                                <div className="text-[14px] font-semibold text-[#e2e2e8] flex items-center gap-2">
                                    City Grid Beta <span className="text-[#3b82f6]">/</span> {activeTab}
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium flex items-center gap-1.5 hidden md:flex">
                                        <span className="relative flex h-2 w-2">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                        </span>
                                        Live
                                    </div>
                                    <div 
                                        className="w-8 h-8 rounded-full bg-[#1c2033] border border-blue-500/30 font-bold text-[10px] text-blue-400 flex items-center justify-center cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
                                        title="Ayush Kumar Jena"    
                                    >
                                        AKJ
                                    </div>
                                </div>
                            </div>

                            {/* Map / Grid Background (Always persists underneath) */}
                            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, #101018 0%, #060608 100%)" }}>
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                                {[
                                    { t: "20%", l: "30%", active: true }, { t: "35%", l: "45%", active: true }, 
                                    { t: "50%", l: "25%", active: true }, { t: "65%", l: "55%", active: true },
                                    { t: "80%", l: "40%", active: true }, { t: "25%", l: "70%", active: false },
                                    { t: "55%", l: "85%", active: true }, { t: "75%", l: "75%", active: true }
                                ].map((node, i) => (
                                    <motion.div 
                                        key={i}
                                        className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
                                        style={{ top: node.t, left: node.l, background: node.active ? "#3b82f6" : "#ef4444", boxShadow: node.active ? "0 0 15px #3b82f6" : "0 0 15px #ef4444" }}
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2 + (i * 0.5), repeat: Infinity }}
                                    >
                                        {node.active && i < 6 && (
                                            <div className="absolute top-1/2 left-1/2 w-32 h-[1px] origin-left bg-gradient-to-r from-blue-500/20 to-transparent pointer-events-none" style={{ transform: `rotate(${i * 45}deg)` }} />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Dynamic Dashboard Widgets that change with activeTab */}
                            <AnimatePresence mode="wait">
                                {renderMainContent()}
                            </AnimatePresence>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
