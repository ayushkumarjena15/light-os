"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const footerLinks = [
    { title: "Product", links: ["Features", "Pricing", "Download"] },
    { title: "Company", links: ["About", "Blog", "Careers"] },
    { title: "Support", links: ["Help Center", "Community", "Status"] },
];

const socials = [
    {
        label: "Twitter",
        svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
    },
    {
        label: "GitHub",
        svg: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />,
    },
    {
        label: "Discord",
        svg: <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.618-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.028C.533 9.046-.32 13.58.099 18.058a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.11 13.11 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.079.009c.12.1.245.198.372.292a.077.077 0 01-.006.128 12.3 12.3 0 01-1.873.891.076.076 0 00-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 00.084.029 19.84 19.84 0 006.002-3.03.077.077 0 00.031-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.029zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z" />,
    },
];

export function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <footer ref={ref} className="relative z-[2] pt-[72px] pb-9 border-t border-[rgba(180,148,72,0.08)]" style={{ background: "black" }}>
            <div className="max-w-[1200px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row justify-between mb-12 gap-9"
                >
                    {/* Brand */}
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[28px]" style={{ filter: "drop-shadow(0 0 8px rgba(201,150,61,0.4))" }}>💡</span>
                            <span className="font-[var(--font-heading)] text-xl font-bold text-[var(--color-text-primary)]">
                                Light<span className="gradient-text">OS</span>
                            </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-muted)] max-w-[240px] leading-relaxed">
                            Illuminating the future of computing.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-16 flex-wrap">
                        {footerLinks.map((col, ci) => (
                            <motion.div
                                key={ci}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: ci * 0.1 + 0.2, duration: 0.6 }}
                                className="flex flex-col gap-3"
                            >
                                <h4 className="font-[var(--font-heading)] text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                                    {col.title}
                                </h4>
                                {col.links.map((link, li) => (
                                    <motion.a
                                        key={li}
                                        href="#"
                                        whileHover={{ x: 3, color: "#c9963d" }}
                                        className="text-sm text-[var(--color-text-muted)] transition-colors duration-200"
                                    >
                                        {link}
                                    </motion.a>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="border-t border-[rgba(180,148,72,0.06)] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <p className="text-[13px] text-[var(--color-text-muted)]">
                        © 2026 LightOS. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {socials.map((s, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                aria-label={s.label}
                                whileHover={{ y: -3, scale: 1.1, backgroundColor: "rgba(201,150,61,0.1)", borderColor: "rgba(201,150,61,0.2)", color: "#c9963d" }}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(201,150,61,0.05)] border border-[rgba(201,150,61,0.08)] text-[var(--color-text-muted)] transition-all duration-200"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{s.svg}</svg>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
