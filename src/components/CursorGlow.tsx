"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mx = 0, my = 0, gx = 0, gy = 0;
        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
        document.addEventListener("mousemove", onMove);

        let raf: number;
        function animate() {
            gx += (mx - gx) * 0.07;
            gy += (my - gy) * 0.07;
            if (glowRef.current) {
                glowRef.current.style.left = gx + "px";
                glowRef.current.style.top = gy + "px";
            }
            raf = requestAnimationFrame(animate);
        }
        raf = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2"
            style={{
                background: "radial-gradient(circle, rgba(201,150,61,0.07) 0%, rgba(201,150,61,0.02) 40%, transparent 70%)",
            }}
        />
    );
}
