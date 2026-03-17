"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Float } from "@react-three/drei";
import React, { Suspense } from "react";
import LightOSDevice from "./LightOSDevice";

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
                            
                            <div className="absolute inset-0 flex items-center justify-center cursor-move z-[10] scale-[0.9]">
                                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 50 }}>
                                    <Suspense fallback={null}>
                                        <Stage preset="rembrandt" intensity={1.5} environment="city">
                                            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                                                <LightOSDevice scale={1} />
                                            </Float>
                                        </Stage>
                                    </Suspense>
                                    <OrbitControls autoRotate autoRotateSpeed={2} enablePan={false} enableZoom={false} />
                                </Canvas>
                            </div>

                        </div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15, delayChildren: 0.3 }
                            }
                        }}
                        className="flex flex-col relative z-10"
                    >
                        <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
                        <span className="section-label relative z-10" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>01 — About LightOS</span>
                    </motion.div>
                        <motion.h2 
                            variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                            className="font-[var(--font-heading)] text-[clamp(32px,5vw,56px)] text-white font-bold leading-[1.12] mb-8 tracking-tight text-left relative z-10"
                            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)" }}
                        >
                            Building the <span className="text-[#3b82f6]">Future</span> of Lighting
                        </motion.h2>
                        
                        <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }} className="mb-5 relative z-10">
                            <h3 className="text-lg font-bold text-blue-400 mb-2 uppercase tracking-wide text-[13px]">What is it?</h3>
                            <p className="text-[#f3f4f6] font-medium leading-[1.65]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                                LightOS is a small, smart device that upgrades ordinary streetlights into a connected network. It allows cities to monitor, control, and fix all their lights remotely from one simple dashboard.
                            </p>
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }} className="mb-5 relative z-10">
                            <h3 className="text-lg font-bold text-blue-400 mb-2 uppercase tracking-wide text-[13px]">Who is it for?</h3>
                            <p className="text-[#f3f4f6] font-medium leading-[1.65]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                                It's built for city governments, rural villages, residential complexes, and industrial parks that want an affordable way to modernize their public lighting and save money.
                            </p>
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }} className="mb-7 relative z-10">
                            <h3 className="text-lg font-bold text-blue-400 mb-2 uppercase tracking-wide text-[13px]">What problem does it solve?</h3>
                            <p className="text-[#f3f4f6] font-medium leading-[1.65]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
                                It automatically stops the massive waste of electricity from streetlights being left on during the day. It also instantly detects broken bulbs so no one has to report them, cutting down expensive manual inspections.
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }} className="flex gap-10 mt-2 flex-wrap pb-8">
                            <AnimatedCounter target={70} suffix="%" label="Energy Saved" />
                            <div className="w-px h-10 self-center" style={{ background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.2), transparent)" }} />
                            <AnimatedCounter target={60} suffix="%" label="Lifespan Boost" />
                            <div className="w-px h-10 self-center" style={{ background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.2), transparent)" }} />
                            <AnimatedCounter target={45} suffix="M+" label="Target Lights" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
