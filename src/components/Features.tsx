"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
    { icon: "⚡", title: "Lightning Performance", desc: "Boot in under 3 seconds. Every interaction feels instant with our optimized kernel architecture." },
    { icon: "🛡️", title: "Fortress Security", desc: "Hardware-level encryption with AI-driven threat detection. Your data stays yours." },
    { icon: "🎨", title: "Beautiful Interface", desc: "Adaptive UI that responds to ambient light, time of day, and your preferences." },
    { icon: "🔋", title: "All-Day Battery", desc: "Intelligent power management extends battery life by up to 40% compared to other OS." },
    { icon: "🌐", title: "Seamless Sync", desc: "Your devices work as one. Files, settings, and apps flow across all your devices." },
    { icon: "🤖", title: "AI Assistant", desc: "Built-in AI that learns your workflow and automates repetitive tasks intelligently." },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass relative overflow-hidden rounded-3xl p-9 transition-all duration-500 cursor-default group"
            style={{ willChange: "transform" }}
        >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "linear-gradient(135deg, rgba(201,150,61,0.05) 0%, rgba(154,104,48,0.04) 100%)" }}
            />

            {/* Number label */}
            <div className="absolute top-6 right-7 font-[var(--font-heading)] text-[11px] font-bold tracking-[3px] text-[var(--color-text-muted)] opacity-50">
                {String(index + 1).padStart(2, "0")}
            </div>

            {/* Icon */}
            <div className="relative w-[60px] h-[60px] mb-5">
                <div className="w-[60px] h-[60px] flex items-center justify-center text-[28px] bg-[rgba(201,150,61,0.08)] border border-[rgba(201,150,61,0.15)] rounded-2xl relative z-[1] group-hover:bg-[rgba(201,150,61,0.12)] group-hover:border-[rgba(201,150,61,0.25)] group-hover:scale-105 transition-all duration-400">
                    {feature.icon}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: "radial-gradient(circle, rgba(201,150,61,0.1) 0%, transparent 70%)" }}
                />
            </div>

            <h3 className="font-[var(--font-heading)] text-xl font-semibold mb-2.5 relative">{feature.title}</h3>
            <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed relative">{feature.desc}</p>
        </motion.div>
    );
}

export function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section id="features" className="relative z-[2] py-[120px] overflow-hidden" style={{ background: "black" }}>
            {/* Section separator */}
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(201,150,61,0.2), rgba(154,104,48,0.12), transparent)" }} />
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(201,150,61,0.05) 0%, transparent 60%)" }} />
            <div ref={ref} className="max-w-[1200px] mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-[72px]"
                >
                    <span className="section-label">01 — Features</span>
                    <h2 className="font-[var(--font-heading)] text-[clamp(32px,5vw,56px)] font-bold leading-[1.12] mb-[18px] tracking-tight">
                        Built for the <span className="gradient-text">Future</span>
                    </h2>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-[540px] mx-auto leading-relaxed">
                        Every detail crafted to deliver a seamless, lightning-fast experience.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <FeatureCard key={i} feature={feature} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
