"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function Contact() {
    const ref = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;

        setSubmitted(true);
        setEmail("");

        // Celebration particles
        if (formRef.current) {
            const rect = formRef.current.getBoundingClientRect();
            for (let i = 0; i < 14; i++) {
                const particle = document.createElement("div");
                const size = Math.random() * 6 + 3;
                particle.style.cssText = `
          position: fixed;
          width: ${size}px; height: ${size}px;
          background: ${Math.random() > 0.5 ? "#c9963d" : "#e8c06a"};
          border-radius: 50%; pointer-events: none; z-index: 9999;
          left: ${rect.left + rect.width / 2}px;
          top: ${rect.top + rect.height / 2}px;
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 1;
        `;
                document.body.appendChild(particle);
                requestAnimationFrame(() => {
                    particle.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 250}px`;
                    particle.style.top = `${rect.top - Math.random() * 180 - 40}px`;
                    particle.style.opacity = "0";
                    particle.style.transform = "scale(0)";
                });
                setTimeout(() => particle.remove(), 1200);
            }
        }

        setTimeout(() => setSubmitted(false), 3500);
    };

    return (
        <section id="contact" className="relative z-[2] py-[120px] overflow-hidden" style={{ background: "black" }}>
            {/* Section separator */}
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(201,150,61,0.22), rgba(154,104,48,0.12), transparent)" }} />
            {/* Ambient glow — radial behind CTA */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 50% at 50% 65%, rgba(201,150,61,0.06) 0%, rgba(154,104,48,0.03) 40%, transparent 70%)" }} />
            <div ref={ref} className="max-w-[1200px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="text-center max-w-[620px] mx-auto"
                >
                    <span className="section-label" style={{ justifyContent: "center" }}>04 — Contact</span>
                    <h2 className="font-[var(--font-heading)] text-[clamp(28px,4vw,48px)] font-bold leading-[1.15] mb-[18px] tracking-tight">
                        Ready to Step Into the <span className="gradient-text">Light</span>?
                    </h2>
                    <p className="text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed">
                        Join the waitlist and be among the first to experience LightOS.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mb-[18px]">
                        <div className="flex gap-3 max-w-[500px] mx-auto flex-col sm:flex-row">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                disabled={submitted}
                                className="flex-1 px-[22px] py-[15px] rounded-3xl border border-[rgba(201,150,61,0.12)] bg-[rgba(20,16,10,0.5)] text-[var(--color-text-primary)] text-[15px] font-[var(--font-body)] outline-none transition-all duration-200 backdrop-blur-sm focus:border-[var(--color-accent-gold)] focus:shadow-[0_0_24px_rgba(201,150,61,0.12),0_0_0_3px_rgba(201,150,61,0.06)] focus:bg-[rgba(20,16,10,0.7)] placeholder:text-[var(--color-text-muted)] disabled:opacity-50"
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ y: -3, scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={submitted}
                                className="relative overflow-hidden whitespace-nowrap px-8 py-[15px] rounded-3xl font-[var(--font-heading)] font-semibold text-base text-[var(--color-bg-deep)] cursor-pointer border-none disabled:cursor-default transition-all duration-300"
                                style={{
                                    background: submitted
                                        ? "linear-gradient(135deg, #28c840, #26c6da)"
                                        : "linear-gradient(135deg, #e8c06a, #c9963d)",
                                    boxShadow: "0 0 30px rgba(201,150,61,0.28)",
                                }}
                            >
                                <span className="relative z-10">{submitted ? "You're In! ✨" : "Join Waitlist"}</span>
                                {!submitted && (
                                    <motion.span
                                        className="absolute top-0 left-0 w-full h-full"
                                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                )}
                            </motion.button>
                        </div>
                    </form>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6 }}
                        className="text-[13px] text-[var(--color-text-muted)]"
                    >
                        No spam. Just light. ✨
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
