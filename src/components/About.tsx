"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

function AnimatedCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const count = useMotionValue(0);
    const isDecimal = target % 1 !== 0;
    const rounded = useTransform(count, (v) => (isDecimal ? v.toFixed(1) : Math.floor(v).toString()));
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, target, {
                duration: 2.2,
                ease: [0.16, 1, 0.3, 1],
            });
            const unsub = rounded.on("change", (v) => setDisplay(v));
            return () => { controls.stop(); unsub(); };
        }
    }, [isInView, count, target, rounded]);

    return (
        <div ref={ref} className="flex flex-col relative">
            <div className="flex items-baseline">
                <span className="font-[var(--font-heading)] text-[40px] font-bold gradient-text leading-[1.1]">
                    {display}
                </span>
                <span className="font-[var(--font-heading)] text-[26px] font-semibold gradient-text">
                    {suffix}
                </span>
            </div>
            <span className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-[1.5px] mt-1.5">
                {label}
            </span>
        </div>
    );
}

export function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="about" className="relative z-[20] py-[120px] overflow-hidden">
            {/* Section separator */}
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.18), rgba(37,99,235,0.1), transparent)" }} />
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 50% at 20% 50%, rgba(37,99,235,0.05) 0%, transparent 60%)" }} />
            <div ref={ref} className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[72px] items-center">
                    {/* Orb Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="flex items-center justify-center lg:order-none order-first"
                    >
                        <div className="relative w-[320px] h-[320px] flex items-center justify-center">
                            {/* Ring 1 — dashed */}
                            <div
                                className="absolute w-full h-full rounded-full border border-dashed border-[rgba(59,130,246,0.12)] animate-[orbSpin_22s_linear_infinite]"
                            />
                            {/* Ring 2 */}
                            <div
                                className="absolute w-[72%] h-[72%] rounded-full border border-[rgba(37,99,235,0.15)]"
                                style={{ animation: "orbSpin 16s linear infinite reverse" }}
                            />
                            {/* Ring 3 — dashed */}
                            <div
                                className="absolute w-[48%] h-[48%] rounded-full border border-dashed border-[rgba(59,130,246,0.2)] animate-[orbSpin_11s_linear_infinite]"
                            />
                            {/* Core */}
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        "0 0 50px rgba(59,130,246,0.2), 0 0 100px rgba(59,130,246,0.08)",
                                        "0 0 70px rgba(96,165,250,0.35), 0 0 120px rgba(59,130,246,0.12)",
                                        "0 0 50px rgba(59,130,246,0.2), 0 0 100px rgba(59,130,246,0.08)",
                                    ],
                                }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-[85px] h-[85px] rounded-full flex items-center justify-center text-[38px] relative"
                                style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(37,99,235,0.3))" }}
                            >
                                💡
                                <div
                                    className="absolute w-[140%] h-[140%] rounded-full"
                                    style={{
                                        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
                                        animation: "corePulse 3.5s ease-in-out infinite reverse",
                                    }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    >
                        <span className="section-label">02 — About LightOS</span>
                        <h2 className="font-[var(--font-heading)] text-[clamp(32px,5vw,56px)] font-bold leading-[1.12] mb-5 tracking-tight text-left">
                            Born from a Simple <span className="gradient-text">Idea</span>
                        </h2>
                        <p className="text-base text-[var(--color-text-secondary)] mb-[18px] leading-[1.75]">
                            What if technology could feel as natural as light itself? LightOS was built on this principle — an
                            operating system that illuminates your workflow, not complicates it.
                        </p>
                        <p className="text-base text-[var(--color-text-secondary)] mb-[18px] leading-[1.75]">
                            Our team of engineers, designers, and dreamers spent 4 years perfecting every pixel, every animation,
                            and every line of code to create something truly extraordinary.
                        </p>

                        {/* Stats */}
                        <div className="flex gap-10 mt-9 flex-wrap">
                            <AnimatedCounter target={99.9} suffix="%" label="Uptime" />
                            <div className="w-px h-10 self-center" style={{ background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.2), transparent)" }} />
                            <AnimatedCounter target={2.8} suffix="s" label="Boot Time" />
                            <div className="w-px h-10 self-center" style={{ background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.2), transparent)" }} />
                            <AnimatedCounter target={50} suffix="M+" label="Users" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
