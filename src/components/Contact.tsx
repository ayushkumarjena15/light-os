"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// Custom Animated Input
const AnimatedInput = ({ label, type, value, onChange, disabled }: any) => {
    const [focused, setFocused] = useState(false);
    const active = focused || value?.length > 0;

    return (
        <div className="relative flex flex-col mt-4 z-10 w-full" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
            <motion.label 
                animate={{ 
                    y: active ? -26 : 14, 
                    x: active ? 4 : 16,
                    scale: active ? 0.85 : 1,
                    color: focused ? "rgba(96,165,250,1)" : "rgba(255,255,255,0.4)"
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 origin-left font-medium pointer-events-none tracking-wide text-[15px] z-10"
            >
                {label}
            </motion.label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required
                className="w-full px-[16px] py-[14px] bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.08)] text-white text-[15px] outline-none transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] focus:bg-[rgba(59,130,246,0.03)] focus:border-transparent disabled:opacity-50"
            />
            {/* Animated Bottom Border */}
            <motion.div 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-b-xl"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ originX: 0.5 }}
            />
            {/* Outer Glow on Focus */}
            <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ boxShadow: "0 0 0px rgba(59,130,246,0)" }}
                animate={{ boxShadow: focused ? "0 0 20px rgba(59,130,246,0.15)" : "0 0 0px rgba(59,130,246,0)" }}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
};

// Tilt Card Component for Info
const TiltCard = ({ children, href }: { children: React.ReactNode, href?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0); y.set(0);
    };

    const props = {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        className: "flex items-start md:items-center gap-5 p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(59,130,246,0.05)] hover:border-[rgba(59,130,246,0.3)] transition-colors duration-300 relative group overflow-hidden cursor-pointer",
        style: { rotateX, rotateY, transformStyle: "preserve-3d" as const }
    };

    const content = (
        <>
            <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, transparent 60%)" }}
            />
            {children}
        </>
    );

    return (
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }} style={{ perspective: 1000 }}>
            {href ? <motion.a href={href} {...props}>{content}</motion.a> : <motion.div {...props}>{content}</motion.div>}
        </motion.div>
    );
};

export function Contact() {
    const ref = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.email || !formData.name) return;

        setStatus("sending");
        
        setTimeout(() => {
            setStatus("sent");
            
            // Premium Celebration Particles
            if (formRef.current) {
                const rect = formRef.current.getBoundingClientRect();
                for (let i = 0; i < 24; i++) {
                    const particle = document.createElement("div");
                    const size = Math.random() * 8 + 4;
                    const isCircle = Math.random() > 0.5;
                    const color = ["#3b82f6", "#60a5fa", "#2dd4bf", "#818cf8"][Math.floor(Math.random() * 4)];
                    
                    particle.style.cssText = `
                        position: fixed;
                        width: ${size}px; height: ${size}px;
                        background: ${color};
                        border-radius: ${isCircle ? "50%" : "3px"};
                        pointer-events: none; z-index: 9999;
                        left: ${rect.left + rect.width / 2}px;
                        top: ${rect.top + rect.height / 2}px;
                        box-shadow: 0 0 10px ${color}80;
                    `;
                    document.body.appendChild(particle);
                    
                    const angle = Math.random() * Math.PI * 2;
                    const velocity = Math.random() * 150 + 50;
                    const tx = Math.cos(angle) * velocity;
                    const ty = Math.sin(angle) * velocity - 100;

                    particle.animate([
                        { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
                        { transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                    ], {
                        duration: 1200 + Math.random() * 500,
                        easing: "cubic-bezier(0.16, 1, 0.3, 1)"
                    });
                    
                    setTimeout(() => particle.remove(), 1700);
                }
            }

            setTimeout(() => {
                setStatus("idle");
                setFormData({ name: "", email: "", phone: "" });
            }, 4000);
        }, 1500);
    };

    return (
        <section id="contact" className="relative z-[20] py-[120px] overflow-hidden">
            {/* Animated Ambient Background */}
            <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={{ 
                    background: [
                        "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 80%)",
                        "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 80%)",
                        "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 80%)"
                    ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.22), rgba(37,99,235,0.12), transparent)" }} />
            
            <div ref={ref} className="max-w-[1200px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[1050px] mx-auto"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 text-left items-center">
                        
                        {/* Info Section */}
                        <motion.div 
                            initial="hidden" animate={isInView ? "visible" : "hidden"}
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
                        >
                            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                                <span className="section-label relative z-10" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>04 — Contact</span>
                            </motion.div>
                            <motion.h2 
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                                className="font-[var(--font-heading)] text-[clamp(36px,5vw,56px)] text-white font-bold leading-[1.12] mb-4 tracking-tight"
                            >
                                Let's build the <span className="gradient-text">Future</span>
                            </motion.h2>
                            <motion.p 
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                                className="text-lg text-[#a1a1aa] font-medium mb-12 max-w-md"
                            >
                                Whether you're a city planner or an industrial partner, we're ready to illuminate your network.
                            </motion.p>

                            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }} className="flex flex-col gap-5">
                                <TiltCard>
                                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <strong className="block text-white font-semibold mb-1 text-[16px] group-hover:text-blue-400 transition-colors">Headquarters</strong>
                                        <span className="text-[14px] text-[#a1a1aa] leading-relaxed">GIET University, Gunupur,<br />Odisha-765022, India.</span>
                                    </div>
                                </TiltCard>

                                <TiltCard href="tel:+919934484259">
                                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.89 10.8 19.79 19.79 0 01.82 2.18 2 2 0 012.82 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.64a16 16 0 006.27 6.27l.95-.95a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-[12px] text-[#71717a] uppercase tracking-wider font-semibold">Direct Line</span>
                                        <strong className="block text-[18px] text-white font-semibold mt-0.5 group-hover:text-blue-400 transition-colors">+91 99344 84259</strong>
                                    </div>
                                </TiltCard>

                                <TiltCard href="mailto:support@lightos.in">
                                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-[12px] text-[#71717a] uppercase tracking-wider font-semibold">Email Us</span>
                                        <strong className="block text-[18px] text-white font-semibold mt-0.5 group-hover:text-blue-400 transition-colors">support@lightos.in</strong>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        </motion.div>

                        {/* Animated Form Section */}
                        <motion.div 
                            id="get-in-touch"
                            initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            className="relative scroll-mt-24"
                            style={{ perspective: 1200 }}
                        >
                            
                            <div className="relative glass p-8 md:p-12 rounded-[2rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(10,12,18,0.65)] overflow-hidden shadow-2xl">
                                <h3 className="font-[var(--font-heading)] text-3xl font-bold mb-8 text-white relative z-10">
                                    Get in <span className="gradient-text">Touch</span>
                                </h3>

                                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                                    <AnimatedInput 
                                        label="Full Name" type="text" 
                                        value={formData.name} onChange={(e: any) => setFormData({...formData, name: e.target.value})} 
                                        disabled={status !== "idle"} 
                                    />
                                    <AnimatedInput 
                                        label="Email Address" type="email" 
                                        value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} 
                                        disabled={status !== "idle"} 
                                    />
                                    <AnimatedInput 
                                        label="Phone Number" type="tel" 
                                        value={formData.phone} onChange={(e: any) => setFormData({...formData, phone: e.target.value})} 
                                        disabled={status !== "idle"} 
                                    />

                                    <motion.button
                                        type="submit"
                                        whileHover={status === "idle" ? { y: -2, scale: 1.02 } : {}}
                                        whileTap={status === "idle" ? { scale: 0.98 } : {}}
                                        disabled={status !== "idle"}
                                        className="relative overflow-hidden w-full mt-6 px-8 py-[16px] rounded-xl font-bold text-[16px] text-white cursor-pointer border-none transition-all duration-300 transform-gpu"
                                        style={{
                                            background: status === "sent" ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #3b82f6, #0ea5e9)",
                                            boxShadow: status === "sent" ? "0 10px 25px -5px rgba(16,185,129,0.4)" : "0 10px 25px -5px rgba(59,130,246,0.4)",
                                        }}
                                    >
                                        <AnimatePresence mode="wait">
                                            {status === "idle" && (
                                                <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-2">
                                                    Get in Touch
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                                </motion.div>
                                            )}
                                            {status === "sending" && (
                                                <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </motion.div>
                                            )}
                                            {status === "sent" && (
                                                <motion.div key="sent" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    Message Sent!
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        
                                        {status === "idle" && (
                                            <motion.div
                                                className="absolute inset-0 z-0 pointer-events-none"
                                                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", width: "200%" }}
                                                animate={{ x: ["-100%", "50%"] }}
                                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                            />
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
