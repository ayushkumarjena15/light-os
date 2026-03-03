"use client";

import { useEffect, useRef } from "react";

// Light direction (unit vector pointing toward the "sun" from the moon)
const LIGHT = { x: -0.55, y: -0.45, z: 0.72 };

function normalize(v: { x: number; y: number; z: number }) {
    const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return { x: v.x / len, y: v.y / len, z: v.z / len };
}

const L = normalize(LIGHT);

// Seeded pseudo-random for stable grain
function seededRand(seed: number) {
    let s = seed;
    return () => {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        return (s >>> 0) / 0xffffffff;
    };
}

interface CraterDef {
    nx: number; // -1..1 normalised position on sphere surface
    ny: number;
    r: number;  // crater radius as fraction of moon radius
    depth: number; // 0..1 depth factor
}

// Named craters (approximate normalised sphere coords)
const CRATERS: CraterDef[] = [
    // Large maria / basins
    { nx: 0.18, ny: -0.08, r: 0.22, depth: 0.45 }, // Mare Imbrium-like
    { nx: -0.12, ny: 0.20, r: 0.14, depth: 0.40 }, // Mare Serenitatis-like
    { nx: 0.30, ny: 0.28, r: 0.10, depth: 0.38 }, // Mare Tranquillitatis-like
    // Medium craters
    { nx: -0.28, ny: -0.22, r: 0.07, depth: 0.55 },
    { nx: 0.05, ny: 0.38, r: 0.06, depth: 0.60 },
    { nx: -0.38, ny: 0.10, r: 0.05, depth: 0.58 },
    { nx: 0.22, ny: -0.40, r: 0.05, depth: 0.52 },
    // Small craters
    { nx: -0.10, ny: -0.35, r: 0.035, depth: 0.70 },
    { nx: 0.40, ny: 0.05, r: 0.030, depth: 0.65 },
    { nx: -0.20, ny: 0.42, r: 0.028, depth: 0.68 },
    { nx: 0.12, ny: 0.15, r: 0.025, depth: 0.72 },
    { nx: -0.35, ny: -0.38, r: 0.022, depth: 0.70 },
    // Tiny craters
    { nx: 0.38, ny: -0.28, r: 0.018, depth: 0.75 },
    { nx: -0.05, ny: 0.50, r: 0.016, depth: 0.78 },
    { nx: 0.48, ny: 0.22, r: 0.014, depth: 0.80 },
    { nx: -0.42, ny: -0.05, r: 0.013, depth: 0.78 },
    { nx: 0.28, ny: -0.15, r: 0.012, depth: 0.82 },
];

export function MoonCanvas({ size = 120 }: { size?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const px = Math.round(size * dpr);
        canvas.width = px;
        canvas.height = px;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const R = px / 2;          // moon radius in canvas pixels
        const cx = R, cy = R;      // centre
        const rand = seededRand(42);

        // ── 1. Base sphere shading (Lambert + Oren-Nayar approximation) ──────────
        const imgData = ctx.createImageData(px, px);
        const data = imgData.data;

        for (let py_ = 0; py_ < px; py_++) {
            for (let px_ = 0; px_ < px; px_++) {
                const dx = (px_ - cx) / R;
                const dy = (py_ - cy) / R;
                const d2 = dx * dx + dy * dy;
                if (d2 > 1) continue; // outside moon disc

                const dz = Math.sqrt(1 - d2);
                // Lambert diffuse
                const NdotL = Math.max(0, dx * L.x + dy * L.y + dz * L.z);

                // Oren-Nayar roughness (moon is very rough, σ≈0.55)
                const sigma2 = 0.30;
                const A = 1 - 0.5 * sigma2 / (sigma2 + 0.33);
                const B = 0.45 * sigma2 / (sigma2 + 0.09);
                const theta_i = Math.acos(NdotL);
                const phi_diff = 0; // simplified
                const orenNayar = NdotL * (A + B * Math.max(0, Math.cos(phi_diff)) * Math.sin(theta_i) * Math.tan(theta_i) * 0.5);

                // Limb darkening (realistic!)
                const limbDark = Math.pow(dz, 0.4);

                // Base albedo — pale grey, slightly warmer in lit areas
                let base = 0.62 + orenNayar * 0.26;
                base *= limbDark;

                // Subtle procedural surface variation (large-scale mottling)
                const noiseVal = (rand() - 0.5) * 0.04;
                base = Math.min(1, Math.max(0, base + noiseVal));

                // RGB: very slightly bluish-grey in shadow, warm-grey in light
                const lum = Math.round(base * 255);
                const r = Math.round(lum * (NdotL > 0.3 ? 1.01 : 0.97));
                const g = lum;
                const b = Math.round(lum * (NdotL > 0.3 ? 0.98 : 1.03));

                const idx = (py_ * px + px_) * 4;
                data[idx] = Math.min(255, r);
                data[idx + 1] = Math.min(255, g);
                data[idx + 2] = Math.min(255, b);
                data[idx + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);

        // Clip everything to moon disc
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.clip();

        // ── 2. Craters ───────────────────────────────────────────────────────────
        for (const crater of CRATERS) {
            // Skip craters behind the visible hemisphere (facing away)
            const cDz = Math.sqrt(Math.max(0, 1 - crater.nx * crater.nx - crater.ny * crater.ny));
            if (cDz < 0.05) continue;

            // Project sphere coords to canvas pixels
            const cpx = cx + crater.nx * R;
            const cpy = cy + crater.ny * R;
            const cr = crater.r * R;

            // Shadow direction: opposite to light projected onto surface
            const shadowDx = L.x * 0.6;
            const shadowDy = L.y * 0.6;

            // -- Crater floor (darker than surrounding terrain) --
            const floorAlbedo = 0.32 + (1 - crater.depth) * 0.2;
            const grad = ctx.createRadialGradient(
                cpx - shadowDx * cr * 0.3, cpy - shadowDy * cr * 0.3, 0,
                cpx, cpy, cr * 1.05
            );
            grad.addColorStop(0, `rgba(${Math.round(floorAlbedo * 190)},${Math.round(floorAlbedo * 185)},${Math.round(floorAlbedo * 195)},0.82)`);
            grad.addColorStop(0.7, `rgba(${Math.round(floorAlbedo * 155)},${Math.round(floorAlbedo * 152)},${Math.round(floorAlbedo * 160)},0.55)`);
            grad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.beginPath();
            ctx.ellipse(cpx, cpy, cr, cr * 0.92, 0, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            // -- Cast shadow inside crater (from rim, in shadow direction) --
            const shadowLen = cr * crater.depth * 0.9;
            const shadowGrad = ctx.createRadialGradient(
                cpx + shadowDx * cr * 0.5, cpy + shadowDy * cr * 0.5, 0,
                cpx + shadowDx * cr * 0.5, cpy + shadowDy * cr * 0.5, shadowLen
            );
            shadowGrad.addColorStop(0, `rgba(0,0,0,${0.5 * crater.depth})`);
            shadowGrad.addColorStop(0.6, `rgba(0,0,0,${0.2 * crater.depth})`);
            shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.beginPath();
            ctx.ellipse(
                cpx + shadowDx * cr * 0.5,
                cpy + shadowDy * cr * 0.5,
                shadowLen * 1.1, shadowLen * 0.7, Math.atan2(shadowDy, shadowDx),
                0, Math.PI * 2
            );
            ctx.fillStyle = shadowGrad;
            ctx.fill();

            // -- Lit rim highlight (opposite side from shadow) --
            const rimBrightness = 200 + Math.round(crater.depth * 40);
            const rimGrad = ctx.createRadialGradient(
                cpx - shadowDx * cr * 0.8, cpy - shadowDy * cr * 0.8, cr * 0.6,
                cpx - shadowDx * cr * 0.8, cpy - shadowDy * cr * 0.8, cr * 1.05
            );
            rimGrad.addColorStop(0, "rgba(0,0,0,0)");
            rimGrad.addColorStop(0.7, `rgba(${rimBrightness},${rimBrightness - 4},${rimBrightness + 6},0.0)`);
            rimGrad.addColorStop(1, `rgba(${rimBrightness},${rimBrightness - 4},${rimBrightness + 6},${0.35 * crater.depth})`);
            ctx.beginPath();
            ctx.arc(cpx, cpy, cr * 1.05, 0, Math.PI * 2);
            ctx.fillStyle = rimGrad;
            ctx.fill();
        }

        // ── 3. Surface grain (fine micro-texture) ────────────────────────────────
        const grainData = ctx.createImageData(px, px);
        const gd = grainData.data;
        const grainRand = seededRand(137);
        for (let i = 0; i < px * px; i++) {
            const gx = i % px;
            const gy = Math.floor(i / px);
            const ddx = (gx - cx) / R;
            const ddy = (gy - cy) / R;
            if (ddx * ddx + ddy * ddy > 1) continue;
            const g = Math.round((grainRand() - 0.5) * 28);
            gd[i * 4] = 128 + g;
            gd[i * 4 + 1] = 128 + g;
            gd[i * 4 + 2] = 128 + g;
            gd[i * 4 + 3] = 18;
        }
        const grainCanvas = document.createElement("canvas");
        grainCanvas.width = px; grainCanvas.height = px;
        const gc = grainCanvas.getContext("2d")!;
        gc.putImageData(grainData, 0, 0);
        ctx.globalCompositeOperation = "overlay";
        ctx.drawImage(grainCanvas, 0, 0);
        ctx.globalCompositeOperation = "source-over";

        // ── 4. Terminator gradient — smooth night-side darkening ─────────────────
        // Project light direction to find terminator position
        const termX = cx - L.x * R * 0.02; // terminator shifts slightly
        const terminator = ctx.createRadialGradient(
            termX + L.x * R * 1.4, cy + L.y * R * 1.4, R * 0.05,
            termX + L.x * R * 0.6, cy + L.y * R * 0.6, R * 1.6
        );
        terminator.addColorStop(0, "rgba(0,0,0,0)");
        terminator.addColorStop(0.45, "rgba(0,0,0,0)");
        terminator.addColorStop(0.72, "rgba(0,5,12,0.38)");
        terminator.addColorStop(1, "rgba(0,2,8,0.82)");
        ctx.fillStyle = terminator;
        ctx.fillRect(0, 0, px, px);

        // ── 5. Atmospheric ring — thin luminous edge on lit side ─────────────────
        const atmoGrad = ctx.createRadialGradient(cx, cy, R * 0.90, cx, cy, R);
        atmoGrad.addColorStop(0, "rgba(0,0,0,0)");
        atmoGrad.addColorStop(0.6, "rgba(210,225,255,0.0)");
        atmoGrad.addColorStop(1, "rgba(210,225,255,0.10)");
        ctx.fillStyle = atmoGrad;
        ctx.fillRect(0, 0, px, px);

        ctx.restore();

        // ── 6. Outer glow (drawn outside clip) ───────────────────────────────────
        const outerGlow = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.55);
        outerGlow.addColorStop(0, "rgba(200,218,255,0.12)");
        outerGlow.addColorStop(0.5, "rgba(180,208,255,0.05)");
        outerGlow.addColorStop(1, "rgba(160,200,255,0)");
        ctx.fillStyle = outerGlow;
        ctx.fillRect(0, 0, px, px);

    }, [size]);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: "block", imageRendering: "auto" }}
        />
    );
}
