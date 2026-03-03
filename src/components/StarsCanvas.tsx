"use client";

import { useEffect, useRef } from "react";

export function StarsCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        interface Star {
            x: number; y: number; radius: number; baseRadius: number;
            alpha: number; baseAlpha: number;
            twinkleSpeed: number; twinklePhase: number;
            radiusSpeed: number; radiusPhase: number;
            hue: number; saturation: number;
            blinkMode: boolean;
        }
        interface Firefly {
            x: number; y: number; vx: number; vy: number;
            radius: number; alpha: number; maxAlpha: number;
            phase: number; fadeSpeed: number; color: string;
        }
        interface ShootingStar {
            x: number; y: number; length: number; speed: number;
            angle: number; alpha: number; decay: number; width: number;
        }

        let stars: Star[] = [];
        let fireflies: Firefly[] = [];
        let shootingStars: ShootingStar[] = [];
        let animId: number;

        function resize() {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
        }

        function createStars() {
            stars = [];
            const count = Math.min(Math.floor((canvas!.width * canvas!.height) / 14000), 600);
            for (let i = 0; i < count; i++) {
                const r = Math.random();
                const baseR = Math.random() * 1.4 + 0.2;
                const baseA = Math.random() * 0.5 + 0.3;
                // ~15% of stars are "blinkers" that flash rapidly
                const blinkMode = Math.random() < 0.15;
                stars.push({
                    x: Math.random() * canvas!.width,
                    y: Math.random() * canvas!.height,
                    radius: baseR,
                    baseRadius: baseR,
                    alpha: baseA,
                    baseAlpha: baseA,
                    // Twinkling: wide speed range so stars look independent
                    twinkleSpeed: blinkMode
                        ? Math.random() * 0.08 + 0.04   // fast blinkers
                        : Math.random() * 0.025 + 0.008, // normal twinklers
                    twinklePhase: Math.random() * Math.PI * 2,
                    // Radius pulsing at a different rate
                    radiusSpeed: Math.random() * 0.018 + 0.005,
                    radiusPhase: Math.random() * Math.PI * 2,
                    hue: r > 0.85 ? (Math.random() > 0.5 ? 40 : 36) : 42,
                    saturation: r > 0.85 ? 55 : 20,
                    blinkMode,
                });
            }
        }

        function createFireflies() {
            fireflies = [];
            const count = Math.floor(canvas!.width / 120);
            for (let i = 0; i < count; i++) {
                fireflies.push({
                    x: Math.random() * canvas!.width,
                    y: Math.random() * canvas!.height * 0.5,
                    vx: (Math.random() - 0.5) * 0.25,
                    vy: (Math.random() - 0.5) * 0.15,
                    radius: Math.random() * 2 + 0.8,
                    alpha: 0,
                    maxAlpha: Math.random() * 0.45 + 0.15,
                    phase: Math.random() * Math.PI * 2,
                    fadeSpeed: Math.random() * 0.006 + 0.002,
                    // Warm gold fireflies: gold or warm cream
                    color: Math.random() > 0.5 ? "rgba(201,150,61," : "rgba(245,234,208,",
                });
            }
        }

        function draw(time: number) {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

            // Stars — warm gold tones with strong twinkling
            for (const star of stars) {
                // Alpha: oscillates between ~0.05 and full baseAlpha (deep fade)
                const alphaSin = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
                // blinkMode stars go almost fully dark at the trough
                const alphaT = star.blinkMode
                    ? (alphaSin * 0.5 + 0.5)   // 0 → 1 range
                    : (alphaSin * 0.42 + 0.58); // 0.16 → 1 range
                const a = star.baseAlpha * alphaT;

                // Radius: subtle breathing independent of alpha
                const radiusMod = Math.sin(time * star.radiusSpeed + star.radiusPhase) * 0.25 + 0.75;
                const r = star.baseRadius * (0.85 + radiusMod * 0.3);

                ctx!.beginPath();
                ctx!.arc(star.x, star.y, r, 0, Math.PI * 2);
                ctx!.fillStyle = `hsla(${star.hue},${star.saturation}%,88%,${a})`;
                ctx!.fill();
                // Glow halo for larger / brighter stars
                if (r > 1.0 && a > 0.25) {
                    ctx!.beginPath();
                    ctx!.arc(star.x, star.y, r * 3.5, 0, Math.PI * 2);
                    ctx!.fillStyle = `hsla(${star.hue},${star.saturation}%,88%,${a * 0.1})`;
                    ctx!.fill();
                }
            }

            // Fireflies — warm amber drift
            for (const ff of fireflies) {
                ff.phase += ff.fadeSpeed;
                ff.alpha = (Math.sin(ff.phase) * 0.5 + 0.5) * ff.maxAlpha;
                ff.x += ff.vx;
                ff.y += ff.vy;
                if (Math.random() > 0.992) {
                    ff.vx = (Math.random() - 0.5) * 0.25;
                    ff.vy = (Math.random() - 0.5) * 0.15;
                }
                if (ff.x < -20) ff.x = canvas!.width + 20;
                if (ff.x > canvas!.width + 20) ff.x = -20;
                if (ff.y < -20) ff.y = canvas!.height * 0.5;
                if (ff.y > canvas!.height * 0.5) ff.y = -20;
                if (ff.alpha > 0.02) {
                    const g = ctx!.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.radius * 8);
                    g.addColorStop(0, ff.color + ff.alpha * 0.5 + ")");
                    g.addColorStop(0.4, ff.color + ff.alpha * 0.12 + ")");
                    g.addColorStop(1, ff.color + "0)");
                    ctx!.beginPath();
                    ctx!.arc(ff.x, ff.y, ff.radius * 8, 0, Math.PI * 2);
                    ctx!.fillStyle = g;
                    ctx!.fill();
                    ctx!.beginPath();
                    ctx!.arc(ff.x, ff.y, ff.radius, 0, Math.PI * 2);
                    ctx!.fillStyle = ff.color + ff.alpha + ")";
                    ctx!.fill();
                }
            }

            // Shooting stars — warm golden trails
            if (Math.random() > 0.995) {
                shootingStars.push({
                    x: Math.random() * canvas!.width,
                    y: Math.random() * canvas!.height * 0.25,
                    length: Math.random() * 100 + 50,
                    speed: Math.random() * 10 + 5,
                    angle: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
                    alpha: 1,
                    decay: Math.random() * 0.012 + 0.007,
                    width: Math.random() * 1.5 + 0.5,
                });
            }
            shootingStars = shootingStars.filter((s) => s.alpha > 0);
            for (const s of shootingStars) {
                const ex = s.x + Math.cos(s.angle) * s.length;
                const ey = s.y + Math.sin(s.angle) * s.length;
                const g = ctx!.createLinearGradient(s.x, s.y, ex, ey);
                g.addColorStop(0, `rgba(240,220,170,${s.alpha})`);
                g.addColorStop(0.3, `rgba(220,185,110,${s.alpha * 0.5})`);
                g.addColorStop(1, "rgba(201,150,61,0)");
                ctx!.beginPath();
                ctx!.moveTo(s.x, s.y);
                ctx!.lineTo(ex, ey);
                ctx!.strokeStyle = g;
                ctx!.lineWidth = s.width;
                ctx!.lineCap = "round";
                ctx!.stroke();
                ctx!.beginPath();
                ctx!.arc(s.x, s.y, s.width + 0.5, 0, Math.PI * 2);
                ctx!.fillStyle = `rgba(245,234,208,${s.alpha * 0.8})`;
                ctx!.fill();
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.alpha -= s.decay;
            }

            animId = requestAnimationFrame(draw);
        }

        resize();
        createStars();
        createFireflies();
        animId = requestAnimationFrame(draw);

        let resizeTimer: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resize();
                createStars();
                createFireflies();
            }, 200);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    return <canvas ref={canvasRef} id="stars-canvas" />;
}
