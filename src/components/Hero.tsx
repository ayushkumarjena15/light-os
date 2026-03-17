"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const LAMP_POSITIONS = [5, 20, 35, 50, 65, 80, 92];
const LAMP_ORDER = [0, 1, 2, 3, 4, 5, 6]; // left-to-right

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    const lampsRef = useRef<(HTMLDivElement | null)[]>([]);
    const scrollIndRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const wheel1Ref = useRef<HTMLDivElement>(null);
    const wheel2Ref = useRef<HTMLDivElement>(null);


    const [scrolled, setScrolled] = useState(false);



    const setLampRef = useCallback(
        (el: HTMLDivElement | null, index: number) => {
            lampsRef.current[index] = el;
        },
        []
    );

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];



        // Scroll indicator fade
        if (scrollIndRef.current) {
            gsap.to(scrollIndRef.current, {
                opacity: 0,
                y: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "10% top",
                    end: "25% top",
                    scrub: true,
                },
            });
        }

        // Car moving effect
        if (carRef.current) {
            gsap.to(carRef.current, {
                left: "110%", // Move off-screen to the right
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5, // 1.5 scrub makes it relatively smooth but tied to scroll
                },
            });
        }

        // Wheel spin effect tied to scroll
        if (wheel1Ref.current && wheel2Ref.current) {
            gsap.to([wheel1Ref.current, wheel2Ref.current], {
                rotation: 360 * 10, // Spin multiple times
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        }


        // Street lamps lighting — sequential with GSAP ScrollTrigger
        LAMP_ORDER.forEach((lampIdx, orderIdx) => {
            const lamp = lampsRef.current[lampIdx];
            if (!lamp) return;

            triggers.push(ScrollTrigger.create({
                trigger: section,
                start: `${5 + orderIdx * 6}% top`,
                onEnter: () => lamp.classList.add("lit"),
                onLeaveBack: () => lamp.classList.remove("lit"),
            }));
        });

        // Initial flicker on third lamp only (ends off, stays off until scroll)
        const thirdLamp = lampsRef.current[2];
        if (thirdLamp) {
            const tl = gsap.timeline({ delay: 1.8 });
            tl.call(() => thirdLamp.classList.add("lit"))
                .call(() => thirdLamp.classList.remove("lit"), [], "+=0.2")
                .call(() => thirdLamp.classList.add("lit"), [], "+=0.2")
                .call(() => thirdLamp.classList.remove("lit"), [], "+=0.15")
                .call(() => thirdLamp.classList.add("lit"), [], "+=0.15")
                .call(() => thirdLamp.classList.remove("lit"), [], "+=0.5");
        }

        // Background darkening overlay on scroll
        gsap.to(".bg-darken-overlay", {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "5% top",
                end: "30% top",
                scrub: true,
            },
        });

        return () => {
            triggers.forEach((t) => t.kill());
        };
    }, []);

    const titleVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const lineVariants = {
        hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
        visible: {
            opacity: 1, y: 0, filter: "blur(0px)",
            transition: { duration: 3.5, ease: [0.16, 1, 0.3, 1] as const },
        },
    };

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-[0] pt-32 md:pt-24 pb-[150px] md:pb-[200px] bg-transparent"
        >
            {/* Background elements moved to fixed positions to persist behind other sections */}

            {/* Fixed Blur Overlay - blurs as we scroll down without darkening */}
            <div className="bg-darken-overlay fixed inset-0 z-[3] backdrop-blur-md opacity-0 pointer-events-none" />



            {/* Ultra-Realistic Moon - Fixed Background */}
            <div
                className="fixed top-[8%] md:top-[12%] right-[5%] md:right-[10%] w-[70px] h-[70px] md:w-[130px] md:h-[130px] rounded-full z-[1] pointer-events-none overflow-hidden"
                style={{
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.05), 0 0 40px rgba(255, 255, 255, 0.02)",
                    background: "#000"
                }}
            >
                {/* The Moon Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center brightness-[0.7] contrast-[1.0]"
                    style={{ backgroundImage: "url('/moon.png')" }}
                />
                
                {/* Shading for 3D Sphere Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.95)_100%)]" />
                
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 rounded-full border border-white/5 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]" />
            </div>

            {/* Hero Content Layer */}
            <div className="relative z-[10] w-[95%] md:w-[90%] max-w-6xl mx-auto px-4 md:px-6 mt-0">
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-10"
                >

                    {/* Centered LightOS Logo Lockup */}
                    <motion.div variants={lineVariants} className="flex flex-col items-center justify-center mt-[-40px]">
                        <h1 className="flex items-center justify-center mt-6 mb-0">
                            <Image
                                src="/LightOS-Logo Transparent.png"
                                alt="LightOS Logo"
                                width={800}
                                height={240}
                                className="w-[300px] md:w-[500px] h-auto object-contain drop-shadow-2xl"
                                priority
                            />
                        </h1>
                        <p className="text-[#a3a3a3] font-semibold text-[16px] md:text-[22px] tracking-wide mt-[-20px] md:mt-[-40px] drop-shadow-sm font-[var(--font-body)] text-center relative z-10 mb-8 md:mb-12">
                            Powered By Autometra Technologies
                        </p>

                        {/* Direct Call to Action */}
                        <motion.div variants={lineVariants} className="flex flex-col sm:flex-row gap-5 items-center justify-center relative z-20">
                            <button 
                                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-4 rounded-full text-[17px] font-bold text-[#0a0a0a] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
                                style={{ 
                                    background: "linear-gradient(135deg, #e8c06a, #c9963d)", 
                                    boxShadow: "0 8px 30px rgba(232, 192, 106, 0.35), inset 0 2px 0 rgba(255,255,255,0.2)"
                                }}
                            >
                                Launch LightOS
                            </button>
                            <button 
                                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-4 rounded-full text-[17px] font-bold text-white transition-all duration-300 border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[#3b82f6] hover:scale-[1.03]"
                                style={{ backdropFilter: "blur(10px)" }}
                            >
                                Get Started
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Street Scene - Fixed Background */}
            <div className="fixed bottom-0 left-0 right-0 h-[340px] z-[2] pointer-events-none">
                {/* Road */}
                <div className="absolute bottom-0 left-0 right-0 h-[180px] flex items-center justify-around px-10" style={{ background: "linear-gradient(180deg, #1e1c18, #161410)" }}>
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[rgba(255,255,255,0.04)]" />
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="w-[50px] h-[3px] bg-[rgba(245,234,208,0.2)] rounded-sm" />
                    ))}

                    {/* Car */}
                    <div
                        ref={carRef}
                        className="absolute bottom-[40px] -left-[10%] w-[80px] h-[24px] z-[5] flex items-end drop-shadow-2xl scale-125 md:scale-150 origin-bottom"
                        style={{ perspective: "100px" }}
                    >
                        {/* Car Body */}
                        <div className="w-[80px] h-[16px] rounded-t-[10px] rounded-b-[4px]" style={{
                            background: "linear-gradient(180deg, #cc0000, #660000)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 5px 15px rgba(0,0,0,0.8)"
                        }}>
                            {/* Headlights */}
                            <div className="absolute top-[8px] right-[2px] w-[5px] h-[4px] bg-[#f5ead0] rounded-full" style={{
                                boxShadow: "0 0 12px #f5ead0, 0 0 24px #e8c06a, 0 0 40px rgba(232,192,106,0.6)"
                            }} />
                            <div className="absolute top-[8px] right-[10px] w-[5px] h-[4px] bg-[#f5ead0] rounded-full" style={{
                                boxShadow: "0 0 12px #f5ead0, 0 0 24px #e8c06a, 0 0 40px rgba(232,192,106,0.6)"
                            }} />

                            {/* Headlight Beams */}
                            <div className="absolute top-0 right-[-150px] w-[150px] h-[20px] pointer-events-none" style={{
                                background: "linear-gradient(90deg, rgba(232,192,106,0.4) 0%, transparent 100%)",
                                clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 70%)",
                                transformOrigin: "left center"
                            }} />

                            {/* Taillights */}
                            <div className="absolute top-[6px] left-[2px] w-[6px] h-[3px] bg-[#ff4444] rounded-sm" style={{
                                boxShadow: "0 0 8px #ff0000, 0 0 15px rgba(255,0,0,0.5)"
                            }} />

                            {/* Windows */}
                            <div className="absolute -top-[6px] left-[15px] w-[40px] h-[8px] rounded-t-[8px]" style={{
                                background: "linear-gradient(180deg, #443c30, #1a1610)"
                            }}>
                                <div className="absolute top-0 left-1/2 w-[2px] h-full bg-[#16120c]" />
                            </div>
                        </div>

                        {/* Wheels */}
                        <div className="absolute -bottom-[2px] left-[10px] w-[14px] h-[14px] rounded-full bg-[#111]" style={{
                            boxShadow: "inset 0 0 0 2px #333, inset 0 0 0 4px #111, inset 0 0 0 5px #555"
                        }}>
                            <div ref={wheel1Ref} className="w-full h-full rounded-full" style={{
                                background: "conic-gradient(from 0deg, transparent 0%, #444 10%, transparent 20%, #444 50%, transparent 60%, #444 90%)"
                            }} />
                        </div>
                        <div className="absolute -bottom-[2px] right-[15px] w-[14px] h-[14px] rounded-full bg-[#111]" style={{
                            boxShadow: "inset 0 0 0 2px #333, inset 0 0 0 4px #111, inset 0 0 0 5px #555"
                        }}>
                            <div ref={wheel2Ref} className="w-full h-full rounded-full" style={{
                                background: "conic-gradient(from 0deg, transparent 0%, #444 10%, transparent 20%, #444 50%, transparent 60%, #444 90%)"
                            }} />
                        </div>
                    </div>

                </div>

                {/* Sidewalk */}
                <div className="absolute bottom-[180px] left-0 right-0 h-[22px] border-t-2 border-[#3c3830]" style={{ background: "linear-gradient(180deg, #2a2820, #1e1c18)" }} />

                {/* Lamps */}
                {LAMP_POSITIONS.map((pos, i) => (
                    <div
                        key={i}
                        ref={(el) => setLampRef(el, i)}
                        className={`lamp absolute bottom-[202px] z-[4] ${i % 2 === 0 ? 'hidden md:block' : 'block'}`}
                        style={{ left: `${pos}%` }}
                    >
                        {/* Post */}
                        <div className="w-1 h-[115px] mx-auto rounded-sm" style={{ background: "linear-gradient(180deg, #2a2620, #1a1810)", boxShadow: "1px 0 0 rgba(255,255,255,0.02)" }} />
                        {/* Arm */}
                        <div
                            className="absolute top-0 left-1/2 w-8 h-1 bg-[#242018] rounded-sm origin-left"
                            style={{ transform: i % 2 === 0 ? "translateX(-2px)" : "translateX(-30px)" }}
                        />
                        {/* Head */}
                        <div
                            className="absolute -top-[7px] w-[18px] h-[9px] rounded-t"
                            style={{
                                background: "linear-gradient(180deg, #302c24, #222018)",
                                left: i % 2 === 0 ? "calc(50% + 22px)" : "calc(50% - 40px)",
                            }}
                        >
                            <div className="lamp-bulb w-[10px] h-[6px] bg-[#ffffff] rounded-b-[5px] mx-auto opacity-0" />
                        </div>
                        {/* Lamp Halo — hot white core → cool white diffusion */}
                        <div
                            className="lamp-halo absolute pointer-events-none opacity-0"
                            style={{
                                width: "130px",
                                height: "130px",
                                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(230,240,255,0.75) 18%, rgba(200,220,255,0.35) 38%, rgba(180,210,255,0.08) 60%, transparent 75%)",
                                filter: "blur(7px)",
                                left: i % 2 === 0 ? "calc(50% + 31px)" : "calc(50% - 31px)",
                                top: "-58px",
                                transform: "translateX(-50%)",
                                mixBlendMode: "screen",
                                zIndex: 5,
                            }}
                        />
                        {/* Layer 1: very wide outer ambient — fills gap between lamps */}
                        <div
                            className="light-cone absolute pointer-events-none opacity-0"
                            style={{
                                width: "700px",
                                height: "380px",
                                top: "-2px",
                                left: i % 2 === 0 ? "calc(50% + 31px)" : "calc(50% - 31px)",
                                transform: "translateX(-50%)",
                                background: "radial-gradient(ellipse 40% 100% at 50% 0%, rgba(200,225,255,0.18) 0%, rgba(185,215,255,0.08) 50%, transparent 75%)",
                                filter: "blur(70px)",
                                mixBlendMode: "screen",
                            }}
                        />
                        {/* Layer 2: medium cone body */}
                        <div
                            className="light-cone absolute pointer-events-none opacity-0"
                            style={{
                                width: "320px",
                                height: "300px",
                                top: "-2px",
                                left: i % 2 === 0 ? "calc(50% + 31px)" : "calc(50% - 31px)",
                                transform: "translateX(-50%)",
                                background: "radial-gradient(ellipse 35% 100% at 50% 0%, rgba(225,240,255,0.42) 0%, rgba(210,232,255,0.18) 42%, transparent 70%)",
                                filter: "blur(40px)",
                                mixBlendMode: "screen",
                            }}
                        />
                        {/* Layer 3: tight bright core */}
                        <div
                            className="light-cone absolute pointer-events-none opacity-0"
                            style={{
                                width: "130px",
                                height: "240px",
                                top: "-2px",
                                left: i % 2 === 0 ? "calc(50% + 31px)" : "calc(50% - 31px)",
                                transform: "translateX(-50%)",
                                background: "radial-gradient(ellipse 42% 90% at 50% 0%, rgba(255,255,255,0.60) 0%, rgba(230,242,255,0.22) 35%, transparent 65%)",
                                filter: "blur(18px)",
                                mixBlendMode: "screen",
                            }}
                        />
                        {/* Ground pool — wider to merge with neighbors */}
                        <div
                            className="light-ground absolute pointer-events-none opacity-0"
                            style={{
                                width: "500px",
                                height: "80px",
                                background: "radial-gradient(ellipse 50% 100% at 50% 40%, rgba(220,238,255,0.55) 0%, rgba(200,228,255,0.20) 45%, transparent 75%)",
                                filter: "blur(22px)",
                                bottom: "-20px",
                                left: i % 2 === 0 ? "calc(50% + 31px)" : "calc(50% - 31px)",
                                transform: "translateX(-50%)",
                                mixBlendMode: "screen",
                            }}
                        />
                    </div>
                ))}

                {/* Bench */}
                <div className="absolute bottom-[185px] left-[15%] md:left-[28%] z-[3] scale-75 md:scale-90 opacity-0 md:opacity-100 hidden md:block">
                    <div className="w-[42px] h-1 bg-[#5a4a38] rounded-[1px]" />
                    <div className="absolute -top-4 w-[42px] h-4 rounded-t bg-[#5a4a38] border border-[#4a3a28]" style={{ background: "linear-gradient(180deg, #5e4e3c, #4e3e2c)" }} />
                    <div className="absolute -bottom-2.5 left-1 w-[3px] h-2.5 bg-[#4a3a28]" />
                    <div className="absolute -bottom-2.5 right-1 w-[3px] h-2.5 bg-[#4a3a28]" />
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                ref={scrollIndRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.3, duration: 1.2 }}
                className="absolute bottom-[140px] left-1/2 -translate-x-1/2 z-[15] text-center flex flex-col items-center gap-2"
            >
                {/* Pulsing dot */}
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "rgba(255,220,120,0.9)", boxShadow: "0 0 8px rgba(255,200,80,0.8)" }}
                />

                {/* Label */}
                <span
                    className="text-[11px] font-semibold tracking-[4px] uppercase block"
                    style={{
                        color: "rgba(255,255,255,0.92)",
                        textShadow: "0 0 18px rgba(255,210,100,0.55), 0 1px 3px rgba(0,0,0,0.8)",
                        letterSpacing: "0.28em",
                    }}
                >
                    Scroll to illuminate
                </span>

                {/* Cascading chevron arrows */}
                {[0, 0.18, 0.36].map((delay, idx) => (
                    <motion.svg
                        key={idx}
                        viewBox="0 0 20 10"
                        fill="none"
                        className="w-5 h-[10px]"
                        animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay }}
                    >
                        <path
                            d="M2 1 L10 8 L18 1"
                            stroke="rgba(255,210,100,0.85)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </motion.svg>
                ))}
            </motion.div>
        </section >
    );
}
