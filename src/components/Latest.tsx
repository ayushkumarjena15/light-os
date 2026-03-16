"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const products = [
    {
        tag: "01",
        title: "Lightning Performance",
        subtitle: "Boot in under 3 seconds.",
        price: "Every interaction feels instant with our optimized kernel architecture.",
        bg: "#0a0a0a",
        image: "/assets/latest/performance.png",
    },
    {
        tag: "02",
        title: "Fortress Security",
        subtitle: "Hardware-level encryption.",
        price: "AI-driven threat detection. Your data stays yours.",
        bg: "#0a0c0b",
        image: "/assets/latest/security.png",
    },
    {
        tag: "03",
        title: "Beautiful Interface",
        subtitle: "Adaptive UI.",
        price: "Responds to ambient light, time of day, and your preferences.",
        bg: "#0c0a0c",
        image: "/assets/latest/interface.png",
    },
    {
        tag: "04",
        title: "All-Day Battery",
        subtitle: "Intelligent power management.",
        price: "Extends battery life by up to 40% compared to other OS.",
        bg: "#0c0c0a",
        image: "/assets/latest/battery.png",
    },
    {
        tag: "05",
        title: "Seamless Sync",
        subtitle: "Your devices work as one.",
        price: "Files, settings, and apps flow across all your devices.",
        bg: "#0a0c0c",
        image: "/assets/latest/sync.png",
    },
    {
        tag: "06",
        title: "AI Power",
        subtitle: "Built-in Intelligence.",
        price: "Learns your workflow and automates repetitive tasks intelligently.",
        bg: "#0c0b0a",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
    },
];

export function Latest() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
    };

    return (
        <section ref={ref} className="relative z-[20] py-[80px] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)" }} />

            <div className="max-w-[1200px] mx-auto px-6">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-[56px]"
                >
                    <span className="section-label">01 — Features</span>
                    <h2 className="font-[var(--font-heading)] text-[clamp(32px,5vw,56px)] font-bold leading-[1.12] mb-[18px] tracking-tight">
                        Built for the <span className="gradient-text">Future</span>
                    </h2>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-[540px] mx-auto leading-relaxed">
                        Every detail of LightOS is engineered for performance, security, and elegance.
                    </p>
                </motion.div>

                {/* Scroll Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="flex items-end justify-between mb-8"
                >
                    <div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.14)] transition-all"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.14)] transition-all"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </button>
                    </div>
                </motion.div>

                {/* Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-3 scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((p, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                            className="flex-shrink-0 w-[300px] h-[450px] rounded-3xl overflow-hidden cursor-pointer relative group"
                            style={{ background: p.bg, border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={p.image} 
                                    alt={p.title} 
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                            </div>

                            {/* Content overlay */}
                            <div className="relative z-10 p-7 h-full flex flex-col justify-end">
                                <span className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2 block" style={{ color: "#3b82f6" }}>{p.tag}</span>
                                <h3 className="text-[24px] font-bold text-white leading-tight mb-2">{p.title}</h3>
                                <p className="text-[14px] font-semibold text-white/90 mb-2">{p.subtitle}</p>
                                <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed">{p.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
