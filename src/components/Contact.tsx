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
          background: ${Math.random() > 0.5 ? "#3b82f6" : "#60a5fa"};
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
        <section id="contact" className="relative z-[20] py-[120px] overflow-hidden">
            {/* Section separator */}
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.22), rgba(37,99,235,0.12), transparent)" }} />
            {/* Ambient glow — radial behind CTA */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 50% at 50% 65%, rgba(59,130,246,0.06) 0%, rgba(37,99,235,0.03) 40%, transparent 70%)" }} />
            <div ref={ref} className="max-w-[1200px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="max-w-[1000px] mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
                        {/* Info Section */}
                        <div className="glass p-8 md:p-10 rounded-3xl border border-[rgba(59,130,246,0.12)] bg-[rgba(15,12,8,0.5)] flex flex-col justify-center">
                            <span className="section-label">04 — Contact</span>
                            <h2 className="font-[var(--font-heading)] text-[clamp(32px,4vw,48px)] font-bold leading-[1.12] mb-4 tracking-tight">
                                Get in <span className="gradient-text">Touch</span>
                            </h2>
                            <p className="text-lg text-[rgba(255,255,255,0.6)] mb-10 leading-relaxed">
                                Fill in the form to start a conversation
                            </p>

                            <div className="flex flex-col gap-4">
                                {/* Address card */}
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[rgba(255,255,255,0.09)] border border-[rgba(255,255,255,0.18)]">
                                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.35)]">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                            <circle cx="12" cy="9" r="2.5"/>
                                        </svg>
                                    </div>
                                    <div className="text-[14px] text-[rgba(255,255,255,0.75)] leading-relaxed">
                                        <strong className="block text-white font-semibold mb-0.5 text-[15px]">Autometra Technologies Pvt. Ltd.</strong>
                                        Building No.-45, DLF Cyber City,<br />
                                        Phase II, Sector 25,<br />
                                        Gurugram (NCR), Haryana-122002, India.
                                    </div>
                                </div>

                                {/* Phone card */}
                                <a href="tel:+919934484259" className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(255,255,255,0.09)] border border-[rgba(255,255,255,0.18)] hover:border-[rgba(59,130,246,0.5)] hover:bg-[rgba(59,130,246,0.1)] transition-all duration-200 group">
                                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.35)]">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.89 10.8 19.79 19.79 0 01.82 2.18 2 2 0 012.82 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.64a16 16 0 006.27 6.27l.95-.95a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[12px] text-[rgba(255,255,255,0.4)] uppercase tracking-wide mb-0.5">Phone</p>
                                        <p className="text-[15px] text-white font-medium group-hover:text-[#60a5fa] transition-colors">+91 99344 84259</p>
                                    </div>
                                </a>

                                {/* Email card */}
                                <a href="mailto:support@lightos.in" className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(255,255,255,0.09)] border border-[rgba(255,255,255,0.18)] hover:border-[rgba(59,130,246,0.5)] hover:bg-[rgba(59,130,246,0.1)] transition-all duration-200 group">
                                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.35)]">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                            <polyline points="22,6 12,13 2,6"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[12px] text-[rgba(255,255,255,0.4)] uppercase tracking-wide mb-0.5">Email</p>
                                        <p className="text-[15px] text-white font-medium group-hover:text-[#60a5fa] transition-colors">support@lightos.in</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="glass p-8 md:p-10 rounded-3xl border border-[rgba(59,130,246,0.12)] bg-[rgba(15,12,8,0.5)] relative overflow-hidden">
                            <h3 className="font-[var(--font-heading)] text-2xl font-bold mb-6 text-white">
                                Contact <span className="gradient-text">Us</span>
                            </h3>

                            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="flex flex-col gap-1.5 relative z-10">
                                    <label className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] ml-2 uppercase tracking-wide">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        required
                                        disabled={submitted}
                                        className="w-full px-[20px] py-[14px] rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] text-white text-[15px] font-[var(--font-body)] outline-none transition-all duration-200 focus:border-[rgba(59,130,246,0.6)] focus:shadow-[0_0_24px_rgba(59,130,246,0.12)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-[rgba(255,255,255,0.3)] disabled:opacity-50"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 relative z-10">
                                    <label className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] ml-2 uppercase tracking-wide">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                        required
                                        disabled={submitted}
                                        className="w-full px-[20px] py-[14px] rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] text-white text-[15px] font-[var(--font-body)] outline-none transition-all duration-200 focus:border-[rgba(59,130,246,0.6)] focus:shadow-[0_0_24px_rgba(59,130,246,0.12)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-[rgba(255,255,255,0.3)] disabled:opacity-50"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 relative z-10">
                                    <label className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] ml-2 uppercase tracking-wide">Telephone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        required
                                        disabled={submitted}
                                        className="w-full px-[20px] py-[14px] rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] text-white text-[15px] font-[var(--font-body)] outline-none transition-all duration-200 focus:border-[rgba(59,130,246,0.6)] focus:shadow-[0_0_24px_rgba(59,130,246,0.12)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-[rgba(255,255,255,0.3)] disabled:opacity-50"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ y: -2, scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={submitted}
                                    className="relative overflow-hidden w-full mt-3 px-8 py-[15px] rounded-2xl font-[var(--font-heading)] font-semibold text-base text-[var(--color-bg-deep)] cursor-pointer border-none disabled:cursor-default transition-all duration-300 z-10"
                                    style={{
                                        background: submitted
                                            ? "linear-gradient(135deg, #28c840, #26c6da)"
                                            : "linear-gradient(135deg, #60a5fa, #3b82f6)",
                                        boxShadow: "0 0 30px rgba(59,130,246,0.28)",
                                    }}
                                >
                                    <span className="relative z-10">{submitted ? "Message Sent!" : "Submit"}</span>
                                    {!submitted && (
                                        <motion.span
                                            className="absolute top-0 left-0 w-full h-full"
                                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
                                            animate={{ x: ["-100%", "200%"] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />
                                    )}
                                </motion.button>

                                {/* Form Inner Glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 pointer-events-none opacity-30" style={{ background: "radial-gradient(ellipse at top, rgba(59,130,246,0.2) 0%, transparent 70%)" }} />
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
