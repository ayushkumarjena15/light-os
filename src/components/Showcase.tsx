"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const dockApps = [
    { emoji: "📁", label: "Files" },
    { emoji: "🌐", label: "Browser" },
    { emoji: "💻", label: "Terminal" },
    { emoji: "⚙️", label: "Settings" },
    { emoji: "🎵", label: "Music" },
    { emoji: "📷", label: "Camera" },
];

export function Showcase() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [hoveredDock, setHoveredDock] = useState<number | null>(null);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            setDate(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`);
        };
        updateClock();
        const interval = setInterval(updateClock, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="showcase" className="relative z-[20] py-[120px] overflow-hidden">
            {/* Section separator */}
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), rgba(37,99,235,0.08), transparent)" }} />
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 80%, rgba(59,130,246,0.04) 0%, transparent 60%)" }} />
            <div ref={ref} className="max-w-[1200px] mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-[72px]"
                >
                    <span className="section-label">03 — Showcase</span>
                    <h2 className="font-[var(--font-heading)] text-[clamp(32px,5vw,56px)] font-bold leading-[1.12] mb-[18px] tracking-tight">
                        See It in <span className="gradient-text">Action</span>
                    </h2>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-[540px] mx-auto leading-relaxed">
                        A glimpse of the LightOS experience.
                    </p>
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

                    {/* Desktop Content */}
                    <div className="relative h-[300px] sm:h-[400px] md:h-[450px] overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, #0e0c09 0%, #1a1510 35%, #0c0a07 70%, #090805 100%)",
                        }}
                    >
                        {/* Ambient gradients */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.div
                                animate={{ x: ["0%", "1%", "-1%", "0%"], y: ["0%", "-1%", "1%", "0%"] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
                                style={{
                                    background: "radial-gradient(circle at 25% 35%, rgba(59,130,246,0.05) 0%, transparent 40%), radial-gradient(circle at 75% 65%, rgba(37,99,235,0.03) 0%, transparent 40%)",
                                }}
                            />
                        </div>

                        <div
                            className="absolute bottom-[30%] left-0 right-0 h-px blur-[1px]"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.18), rgba(37,99,235,0.1), transparent)" }}
                        />

                        {/* Clock */}
                        <div className="flex flex-col items-center justify-center h-full relative z-[1]">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div suppressHydrationWarning className="font-[var(--font-heading)] text-[48px] md:text-[76px] font-extralight text-[var(--color-text-primary)] tracking-[-3px]"
                                    style={{ textShadow: "0 0 40px rgba(245,234,208,0.25)" }}>
                                    {time}
                                </div>
                                <div suppressHydrationWarning className="text-[15px] text-[var(--color-text-secondary)] mt-1 font-light tracking-wide text-center">
                                    {date}
                                </div>
                            </motion.div>
                        </div>

                        {/* Dock */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 px-[18px] py-2.5 rounded-3xl border border-[rgba(59,130,246,0.1)] backdrop-blur-xl"
                            style={{ background: "rgba(20,16,10,0.5)" }}
                        >
                            {dockApps.map((app, i) => {
                                const distance = hoveredDock !== null ? Math.abs(i - hoveredDock) : 999;
                                const scale = distance === 0 ? 1.35 : distance === 1 ? 1.15 : 1;
                                const transY = distance === 0 ? -10 : distance === 1 ? -4 : 0;

                                return (
                                    <motion.div
                                        key={i}
                                        animate={{ scale, y: transY }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        onMouseEnter={() => setHoveredDock(i)}
                                        onMouseLeave={() => setHoveredDock(null)}
                                        className="dock-item relative w-[46px] h-[46px] flex items-center justify-center text-[22px] rounded-lg cursor-pointer hover:bg-[rgba(59,130,246,0.08)]"
                                    >
                                        {app.emoji}
                                        {/* Tooltip */}
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.8, y: 0 }}
                                            animate={hoveredDock === i ? { opacity: 1, scale: 1, y: -4 } : { opacity: 0, scale: 0.8, y: 0 }}
                                            className="absolute -top-8 left-1/2 -translate-x-1/2 text-[11px] text-[var(--color-text-primary)] bg-[rgba(20,16,10,0.9)] px-2.5 py-1 rounded-md whitespace-nowrap border border-[rgba(59,130,246,0.12)] pointer-events-none"
                                        >
                                            {app.label}
                                        </motion.span>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
