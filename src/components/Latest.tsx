"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const products = [
    {
        tag: "01",
        title: "Real-Time Automation",
        subtitle: "Dynamic adaptation.",
        price: "Utilizes sensors and logic to dynamically adjust lighting based on conditions.",
        bg: "#0a0a0a",
        image: "/assets/latest/automation_real.png",
    },
    {
        tag: "02",
        title: "Fault Detection",
        subtitle: "Proactive reporting.",
        price: "Continuously monitors status and automatically identifies malfunctions.",
        bg: "#0a0c0b",
        image: "/assets/latest/fault_real.png",
    },
    {
        tag: "03",
        title: "Energy Efficiency",
        subtitle: "Maximum savings.",
        price: "Combines LED technologies with automated data-driven control.",
        bg: "#0c0a0c",
        image: "/assets/latest/energy_real.png",
    },
    {
        tag: "04",
        title: "Scalability",
        subtitle: "Seamless expansion.",
        price: "Deployed across urban and rural settings via mesh and Wi-Fi networks.",
        bg: "#0c0c0a",
        image: "/assets/latest/scalability_real.png",
    }
];

export function Latest() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} id="features" className="relative z-[20] py-[80px] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)" }} />

            <div className="max-w-[1200px] mx-auto px-6">
                {/* Section Title */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                    className="text-center mb-[56px]"
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
                        <span className="section-label relative z-10" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>01 — Features</span>
                    </motion.div>
                    <motion.h2 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                        className="font-[var(--font-heading)] text-[clamp(32px,5vw,56px)] text-white font-bold leading-[1.12] mb-[18px] tracking-tight relative z-10"
                        style={{ textShadow: "0 4px 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)" }}
                    >
                        Built for the <span className="text-[#3b82f6]">Future</span>
                    </motion.h2>
                    <motion.p 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                        className="text-lg text-[#f3f4f6] font-medium max-w-[540px] mx-auto leading-relaxed relative z-10"
                        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)" }}
                    >
                        Every detail of LightOS is engineered for performance, security, and elegance.
                    </motion.p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-3"
                >
                    {products.map((p, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                            className="w-full h-[450px] rounded-3xl overflow-hidden cursor-pointer relative group"
                            style={{ background: p.bg, border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={p.image} 
                                    alt={p.title} 
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                            </div>

                            {/* Content overlay */}
                            <div className="relative z-10 p-7 h-full flex flex-col justify-end">
                                <span className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2 block" style={{ color: "#3b82f6" }}>{p.tag}</span>
                                <h3 className="text-[24px] font-bold text-white leading-tight mb-2">{p.title}</h3>
                                <p className="text-[14px] font-semibold text-white/90 mb-2">{p.subtitle}</p>
                                <p className="text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed">{p.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
