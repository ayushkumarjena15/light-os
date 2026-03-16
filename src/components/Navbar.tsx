"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

import { LimelightNav } from "@/components/ui/limelight-nav";
import { Home, Zap, Info, MonitorPlay, Mail } from "lucide-react";

const links = [
    { href: "#hero", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#showcase", label: "Showcase" },
    { href: "#contact", label: "Contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("#hero");

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = document.querySelectorAll("section[id]");
            const scrollY = window.scrollY + 120;
            sections.forEach((section) => {
                const el = section as HTMLElement;
                const top = el.offsetTop;
                const height = el.offsetHeight;
                if (scrollY >= top && scrollY < top + height) {
                    setActive(`#${el.id}`);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActive(href);
        setOpen(false);
    };

    return (
        <>
            {/* Scroll progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[1001] origin-left"
                style={{
                    scaleX,
                    background: "linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)",
                }}
            />

            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-400 ${scrolled
                    ? "py-4 pointer-events-none"
                    : "bg-transparent py-[18px]"
                    }`}
            >
                <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                    {/* Desktop Links (LimelightNav) */}
                    <div className={`hidden md:flex flex-1 justify-center transition-transform duration-500 pointer-events-auto ${scrolled ? 'scale-105' : 'scale-100'}`}>
                        <LimelightNav
                            items={[
                                { id: "home", icon: <Home />, label: "Home", onClick: () => scrollTo("#hero") },
                                { id: "features", icon: <Zap />, label: "Features", onClick: () => scrollTo("#features") },
                                { id: "about", icon: <Info />, label: "About", onClick: () => scrollTo("#about") },
                                { id: "showcase", icon: <MonitorPlay />, label: "Showcase", onClick: () => scrollTo("#showcase") },
                                { id: "contact", icon: <Mail />, label: "Contact", onClick: () => scrollTo("#contact") }
                            ]}
                            activeIndex={links.findIndex(l => l.href === active)}
                        />
                    </div>

                    {/* Hamburger */}
                    <button
                        onClick={() => setOpen(!open)}
                        className={`md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer z-10 p-1 transition-all duration-500 ${scrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
                        aria-label="Toggle Navigation"
                    >
                        <motion.span
                            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            className="w-6 h-0.5 bg-[var(--color-text-primary)] rounded-sm block"
                        />
                        <motion.span
                            animate={open ? { opacity: 0 } : { opacity: 1 }}
                            className="w-6 h-0.5 bg-[var(--color-text-primary)] rounded-sm block"
                        />
                        <motion.span
                            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            className="w-6 h-0.5 bg-[var(--color-text-primary)] rounded-sm block"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Nav */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-[rgba(12,11,8,0.96)] backdrop-blur-2xl z-[999] flex items-center justify-center"
                    >
                        <motion.ul className="list-none text-center flex flex-col gap-7">
                            {links.map((link, i) => (
                                <motion.li
                                    key={link.href}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <button
                                        onClick={() => scrollTo(link.href)}
                                        className="font-[var(--font-heading)] text-3xl font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                </motion.li>
                            ))}
                            <motion.li
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <button
                                    onClick={() => scrollTo("#contact")}
                                    className="inline-block px-10 py-3.5 rounded-3xl text-xl font-semibold text-[var(--color-bg-deep)]"
                                    style={{ background: "linear-gradient(135deg, #e8c06a, #c9963d)" }}
                                >
                                    Get Early Access
                                </button>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
