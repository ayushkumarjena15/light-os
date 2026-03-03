"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LAMP_POSITIONS = [5, 20, 35, 50, 65, 80, 92];
const LAMP_ORDER = [3, 2, 4, 1, 5, 0, 6]; // middle-out

type Star = {
    x: number;
    y: number;
    size: number;
    opacity: number;
    delay: number;
    duration: number;
};

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const moonRef = useRef<HTMLDivElement>(null);
    const lampsRef = useRef<(HTMLDivElement | null)[]>([]);
    const scrollIndRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const wheel1Ref = useRef<HTMLDivElement>(null);
    const wheel2Ref = useRef<HTMLDivElement>(null);

    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        setStars(Array.from({ length: 15 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.8 + 0.2, // increased base opacity slightly so they stand out when fewer
            delay: Math.random() * 5,
            duration: Math.random() * 1.5 + 0.5, // faster duration for a twinkling effect
        })));
    }, []);

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

        // Moon parallax
        if (moonRef.current) {
            gsap.to(moonRef.current, {
                y: 250,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }

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

        // Initial flicker on center lamp only (ends off, stays off until scroll)
        const centerLamp = lampsRef.current[3];
        if (centerLamp) {
            const tl = gsap.timeline({ delay: 1.8 });
            tl.call(() => centerLamp.classList.add("lit"))
                .call(() => centerLamp.classList.remove("lit"), [], "+=0.2")
                .call(() => centerLamp.classList.add("lit"), [], "+=0.2")
                .call(() => centerLamp.classList.remove("lit"), [], "+=0.15")
                .call(() => centerLamp.classList.add("lit"), [], "+=0.15")
                .call(() => centerLamp.classList.remove("lit"), [], "+=0.5");
        }

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
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-[1] pt-32 md:pt-24 pb-[150px] md:pb-[200px]"
            style={{
                background: "black",
            }}
        >
            {/* Removed ambient warm light to keep background totally black */}

            {/* Starry Sky Foreground */}
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden h-[80%]">
                {stars.map((star, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white transition-opacity"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity,
                            animation: `pulse ${star.duration}s infinite alternate cubic-bezier(0.4, 0, 0.6, 1)`,
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Moon */}
            <div ref={moonRef} className="absolute top-[8%] right-[5%] md:top-[10%] md:right-[15%] z-[2]">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] md:w-[280px] h-[180px] md:h-[280px] rounded-full animate-[moonPulse_5s_ease-in-out_infinite]"
                    style={{
                        background: "radial-gradient(circle, rgba(255,123,0,0.03) 0%, rgba(255,123,0,0.01) 40%, transparent 70%)",
                    }}
                />
                <div
                    className="w-[70px] md:w-[110px] h-[70px] md:h-[110px] rounded-full relative overflow-hidden"
                    style={{
                        background: "radial-gradient(circle at 35% 35%, #ffb347, #ff7b00 40%, #8a3600 80%, #3a1600 100%)",
                        boxShadow: "0 0 20px rgba(255,123,0,0.1), 0 0 40px rgba(255,123,0,0.05), inset -15px -15px 30px rgba(0,0,0,0.7)",
                    }}
                >
                    <div className="absolute w-[20%] h-[20%] rounded-full bg-[rgba(0,0,0,0.15)] top-[25%] left-[50%]" style={{ filter: "blur(2px)" }} />
                    <div className="absolute w-[30%] h-[25%] rounded-full bg-[rgba(0,0,0,0.12)] top-[50%] left-[20%]" style={{ filter: "blur(3px)" }} />
                    <div className="absolute w-[15%] h-[15%] rounded-full bg-[rgba(0,0,0,0.18)] top-[60%] left-[65%]" style={{ filter: "blur(1.5px)" }} />
                    <div className="absolute w-[35%] h-[40%] rounded-full bg-[rgba(255,255,255,0.08)] top-[-10%] left-[-10%]" style={{ filter: "blur(4px)" }} />
                </div>
            </div>

            {/* Hero Content */}
            <div className="relative z-[5] w-[95%] md:w-[90%] max-w-6xl mx-auto px-4 md:px-6 text-center mt-0">
                <motion.h1
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-[var(--font-heading)] text-[clamp(40px,7vw,90px)] font-extrabold leading-[1.02] mb-7 tracking-[-2px]"
                >
                    <motion.span variants={lineVariants} className="block">
                        Light<span className="gradient-text">OS</span>
                    </motion.span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[clamp(16px,2vw,20px)] text-[var(--color-text-secondary)] max-w-[580px] mx-auto mb-10 leading-relaxed"
                >
                    Building smart public lighting system
                </motion.p>

            </div>

            {/* Street Scene */}
            <div className="absolute bottom-0 left-0 right-0 h-[340px] z-[3]">
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
                        {/* === REALISTIC LIGHT — no clipPath, pure radial falloff === */}
                        {/* Layer 1: wide outer ambient spread */}
                        <div
                            className="light-cone absolute pointer-events-none opacity-0"
                            style={{
                                width: "380px",
                                height: "300px",
                                top: "-2px",
                                left: i % 2 === 0 ? "calc(50% + 31px)" : "calc(50% - 31px)",
                                transform: "translateX(-50%)",
                                /* Ellipse: narrow horiz (30%), tall vert (110%) from top-center — natural downward cone, fades to 0 before element edge */
                                background: "radial-gradient(ellipse 30% 110% at 50% 0%, rgba(210,230,255,0.22) 0%, rgba(195,220,255,0.10) 45%, transparent 72%)",
                                filter: "blur(50px)",
                                mixBlendMode: "screen",
                            }}
                        />
                        {/* Layer 2: medium cone body */}
                        <div
                            className="light-cone absolute pointer-events-none opacity-0"
                            style={{
                                width: "220px",
                                height: "260px",
                                top: "-2px",
                                left: i % 2 === 0 ? "calc(50% + 31px)" : "calc(50% - 31px)",
                                transform: "translateX(-50%)",
                                background: "radial-gradient(ellipse 28% 100% at 50% 0%, rgba(230,242,255,0.38) 0%, rgba(210,232,255,0.16) 40%, transparent 68%)",
                                filter: "blur(35px)",
                                mixBlendMode: "screen",
                            }}
                        />
                        {/* Layer 3: tight bright core axis — brightest near lamp */}
                        <div
                            className="light-cone absolute pointer-events-none opacity-0"
                            style={{
                                width: "110px",
                                height: "210px",
                                top: "-2px",
                                left: i % 2 === 0 ? "calc(50% + 31px)" : "calc(50% - 31px)",
                                transform: "translateX(-50%)",
                                background: "radial-gradient(ellipse 38% 90% at 50% 0%, rgba(255,255,255,0.52) 0%, rgba(230,242,255,0.20) 35%, transparent 65%)",
                                filter: "blur(22px)",
                                mixBlendMode: "screen",
                            }}
                        />
                        {/* Ground pool */}
                        <div
                            className="light-ground absolute pointer-events-none opacity-0"
                            style={{
                                width: "260px",
                                height: "60px",
                                background: "radial-gradient(ellipse 45% 100% at 50% 40%, rgba(225,240,255,0.50) 0%, rgba(205,228,255,0.20) 40%, transparent 72%)",
                                filter: "blur(16px)",
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
                className="absolute bottom-[260px] left-1/2 -translate-x-1/2 z-10 text-center flex flex-col items-center gap-2"
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
