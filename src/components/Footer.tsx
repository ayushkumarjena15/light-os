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
        href: "https://x.com/autometraTech?s=20",
        hoverColor: "#ffffff",
        svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/autometratech/",
        hoverColor: "#e1306c",
        svg: <path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/autometra-technologies/",
        hoverColor: "#0077b5",
        svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
    },
];

export function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <footer ref={ref} className="relative z-[20] pt-16 pb-12 border-t border-[#1a1a24] bg-[#08080c]">
            <div className="max-w-[1200px] mx-auto px-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row justify-between mb-16 gap-12"
                >
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center font-[var(--font-heading)] text-[26px] font-extrabold leading-[1.02] tracking-[-1px]">
                            <span className="text-white relative z-0">Ligh</span>
                            {/* The Lamp "T" */}
                            <div className="relative z-10 inline-flex items-end justify-center w-[1.45em] h-[1.10em] -mx-[0.17em] align-baseline -translate-y-[0.15em]">
                                <svg viewBox="-5 0 150 120" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMax meet">
                                    {/* Left Lamp Head */}
                                    <path d="M 0 18 C 2 13, 34 13, 36 18 Z" fill="white"/>
                                    <path d="M 6 18 C 9 23, 27 23, 30 18 Z" fill="#fef08a"/>
                                    <path d="M 8 18 C 8 26, 28 26, 28 18" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round"/>
                                    
                                    {/* Right Lamp Head */}
                                    <path d="M 104 18 C 106 13, 138 13, 140 18 Z" fill="white"/>
                                    <path d="M 110 18 C 113 23, 131 23, 134 18 Z" fill="#fef08a"/>
                                    <path d="M 112 18 C 112 26, 132 26, 132 18" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round"/>

                                    {/* Arms */}
                                    <path d="M 64 33 L 38 18 L 0 18" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M 76 33 L 102 18 L 140 18" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    
                                    {/* Main pole */}
                                    <rect x="66" y="32" width="8" height="68" fill="white" />
                                    
                                    {/* Pole Bands */}
                                    <rect x="65" y="50" width="10" height="2" rx="1" fill="white" />
                                    <rect x="65" y="65" width="10" height="2" rx="1" fill="white" />
                                    <rect x="65" y="80" width="10" height="2" rx="1" fill="white" />

                                    {/* Base styling */}
                                    <path d="M 66 100 L 62 110 L 62 120 L 78 120 L 78 110 L 74 100 Z" fill="white"/>
                                    
                                    {/* Top Joint */}
                                    <rect x="64" y="30" width="12" height="6" rx="1.5" fill="white" />
                                    <rect x="66" y="26" width="3" height="5" fill="white" rx="1" />
                                    <rect x="71" y="26" width="3" height="5" fill="white" rx="1" />
                                </svg>
                                {/* Glows */}
                                <div className="absolute left-[0%] top-[3%] w-[33%] h-[35%] rounded-full bg-yellow-400 blur-[6px] opacity-75" style={{ boxShadow: '0 0 20px 8px rgba(253,224,71,0.6)' }} />
                                <div className="absolute right-[0%] top-[3%] w-[33%] h-[35%] rounded-full bg-yellow-400 blur-[6px] opacity-75" style={{ boxShadow: '0 0 20px 8px rgba(253,224,71,0.6)' }} />
                            </div>
                            <span className="text-[#3b82f6] relative z-0">OS</span>
                        </div>
                        <p className="text-[14px] text-[#8e8e99] max-w-[280px] font-medium tracking-wide">
                            Illuminating the future of computing.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-16 md:gap-24 flex-wrap">
                        {footerLinks.map((col, ci) => (
                            <motion.div
                                key={ci}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: ci * 0.1 + 0.2, duration: 0.6 }}
                                className="flex flex-col gap-4"
                            >
                                <h4 className="font-semibold text-[15px] text-white">
                                    {col.title}
                                </h4>
                                {col.links.map((link, li) => (
                                    <motion.a
                                        key={li}
                                        href="#"
                                        whileHover={{ x: 2, color: "#fff" }}
                                        className="text-[14px] font-medium text-[#8e8e99] transition-colors duration-200"
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
                    className="border-t border-[#1a1a24] pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                    <p className="text-[13px] font-medium text-[#8e8e99]">
                        © 2026 LightOS. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {socials.map((s, i) => (
                            <motion.a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                whileHover={{ scale: 1.05, backgroundColor: "#222", color: s.hoverColor }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1c1c24] text-[#8e8e99] transition-all duration-200"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{s.svg}</svg>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
