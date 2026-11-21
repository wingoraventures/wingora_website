import { useEffect, useRef } from "react";

// The hero grid as a picture of a business's data: every square is a piece
// of data. Near the cursor the squares tilt and part, revealing the threads
// that connect them underneath, with small pulses of data moving along them.
// Without a mouse (phones, or when idle) a slow "autopilot" cursor drifts across.

const CELL = 64;
const RADIUS = 240; // how far the cursor's influence reaches, in px
const MAX_TILT = 0.62; // radians at the centre of influence
const FOCAL = 520; // perspective distance
const COLORS = {
    paper: "245,247,250",
    line: "14,27,51",
    wing: "31,79,214",
    ascent: "229,67,47",
};

// Small deterministic PRNG so the network is the same on every load.
function rng(seed) {
    let s = seed >>> 0;
    return () => {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
    };
}

function buildNetwork(cols, rows) {
    const rand = rng(cols * 131 + rows * 7);
    const nodes = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            nodes.push({
                c,
                r,
                // Data points sit near, not exactly at, each square's centre.
                ox: (rand() - 0.5) * CELL * 0.35,
                oy: (rand() - 0.5) * CELL * 0.35,
                t: 0, // smoothed influence 0..1
            });
        }
    }
    const edges = [];
    const seen = new Set();
    const link = (a, b) => {
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (seen.has(key)) return;
        seen.add(key);
        edges.push({ a, b, phase: rand(), speed: 0.25 + rand() * 0.35, hot: rand() < 0.18, sag: (rand() - 0.5) * 14 });
    };
    const reach = [[1, 0], [0, 1], [1, 1], [-1, 1], [2, 1], [1, 2]];
    nodes.forEach((n, i) => {
        const picks = 1 + Math.floor(rand() * 2);
        for (let k = 0; k < picks; k++) {
            const [dc, dr] = reach[Math.floor(rand() * reach.length)];
            const c = n.c + dc;
            const r = n.r + dr;
            if (c >= 0 && c < cols && r < rows) link(i, r * cols + c);
        }
    });
    return { nodes, edges };
}

export default function DataGrid({ className = "" }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const host = canvas?.parentElement;
        if (!canvas || !host) return;
        const ctx = canvas.getContext("2d");
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let width = 0;
        let height = 0;
        let cols = 0;
        let rows = 0;
        let net = { nodes: [], edges: [] };
        const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, lastMove: 0, active: false };

        const resize = () => {
            const rect = host.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const nextCols = Math.ceil(width / CELL) + 1;
            const nextRows = Math.ceil(height / CELL) + 1;
            if (nextCols !== cols || nextRows !== rows) {
                cols = nextCols;
                rows = nextRows;
                net = buildNetwork(cols, rows);
            }
        };

        const nodePos = (n) => ({ x: n.c * CELL + CELL / 2 + n.ox, y: n.r * CELL + CELL / 2 + n.oy });

        // Rotate a corner offset around X then Y, then project with perspective.
        const project = (cx, cy, x, y, rx, ry, s) => {
            x *= s;
            y *= s;
            const y1 = y * Math.cos(rx);
            const z1 = y * Math.sin(rx);
            const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
            const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
            const p = FOCAL / (FOCAL - z2);
            return [cx + x2 * p, cy + y1 * p];
        };

        const draw = (time) => {
            const sec = time / 1000;

            // Autopilot: a slow Lissajous drift whenever the real pointer is idle.
            const idle = !pointer.active || time - pointer.lastMove > 2500;
            if (idle) {
                pointer.tx = width * (0.5 + 0.38 * Math.sin(sec * 0.23));
                pointer.ty = height * (0.45 + 0.32 * Math.sin(sec * 0.31 + 1.2));
            }
            const ease = idle ? 0.03 : 0.18;
            pointer.x += (pointer.tx - pointer.x) * ease;
            pointer.y += (pointer.ty - pointer.y) * ease;

            ctx.clearRect(0, 0, width, height);

            // Update each square's influence with easing so it settles back smoothly.
            for (const n of net.nodes) {
                const cx = n.c * CELL + CELL / 2;
                const cy = n.r * CELL + CELL / 2;
                const d = Math.hypot(cx - pointer.x, cy - pointer.y);
                const target = d < RADIUS ? Math.pow(1 - d / RADIUS, 1.6) : 0;
                n.t += (target - n.t) * 0.12;
            }

            // 1. Threads underneath, only where squares are parting.
            for (const e of net.edges) {
                const A = net.nodes[e.a];
                const B = net.nodes[e.b];
                const t = Math.max(A.t, B.t);
                if (t < 0.02) continue;
                const a = nodePos(A);
                const b = nodePos(B);
                const mx = (a.x + b.x) / 2 + e.sag;
                const my = (a.y + b.y) / 2 + Math.abs(e.sag);
                ctx.strokeStyle = `rgba(${COLORS.wing},${0.85 * t})`;
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.quadraticCurveTo(mx, my, b.x, b.y);
                ctx.stroke();

                if (t > 0.25) {
                    // A pulse of data travelling along the thread.
                    const u = (sec * e.speed + e.phase) % 1;
                    const px = (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * mx + u * u * b.x;
                    const py = (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * my + u * u * b.y;
                    ctx.fillStyle = `rgba(${e.hot ? COLORS.ascent : COLORS.wing},${Math.min(1, t * 1.4)})`;
                    ctx.beginPath();
                    ctx.arc(px, py, 2.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Data points
            for (const n of net.nodes) {
                if (n.t < 0.04) continue;
                const p = nodePos(n);
                ctx.fillStyle = `rgba(${COLORS.wing},${Math.min(1, n.t * 1.5)})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.5 + n.t * 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2. The squares on top, tilting away from the cursor and shrinking to open gaps.
            const half = CELL / 2;
            for (const n of net.nodes) {
                const cx = n.c * CELL + half;
                const cy = n.r * CELL + half;
                const t = n.t;
                const dx = cx - pointer.x;
                const dy = cy - pointer.y;
                const len = Math.hypot(dx, dy) || 1;
                // Edge nearest the cursor dips back; the far edge lifts toward the viewer.
                const rx = -(dy / len) * MAX_TILT * t;
                const ry = (dx / len) * MAX_TILT * t;
                const s = 1 - 0.42 * t;
                const pts = [
                    project(cx, cy, -half, -half, rx, ry, s),
                    project(cx, cy, half, -half, rx, ry, s),
                    project(cx, cy, half, half, rx, ry, s),
                    project(cx, cy, -half, half, rx, ry, s),
                ];
                ctx.beginPath();
                ctx.moveTo(pts[0][0], pts[0][1]);
                for (let i = 1; i < 4; i++) ctx.lineTo(pts[i][0], pts[i][1]);
                ctx.closePath();
                // Tilted squares turn slightly translucent and pick up a faint blue tint.
                ctx.fillStyle = t > 0.01 ? `rgba(${COLORS.paper},${1 - 0.55 * t})` : `rgb(${COLORS.paper})`;
                ctx.fill();
                if (t > 0.01) {
                    ctx.fillStyle = `rgba(${COLORS.wing},${0.1 * t})`;
                    ctx.fill();
                }
                ctx.strokeStyle = `rgba(${t > 0.01 ? COLORS.wing : COLORS.line},${0.1 + 0.45 * t})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        };

        let raf = 0;
        let visible = true;
        const loop = (time) => {
            draw(time);
            raf = visible ? requestAnimationFrame(loop) : 0;
        };

        const onMove = (e) => {
            const rect = host.getBoundingClientRect();
            pointer.tx = e.clientX - rect.left;
            pointer.ty = e.clientY - rect.top;
            pointer.lastMove = performance.now();
            if (!pointer.active) {
                pointer.active = true;
                pointer.x = pointer.tx;
                pointer.y = pointer.ty;
            }
        };
        const onLeave = () => {
            pointer.lastMove = 0;
        };

        resize();
        if (reduceMotion) {
            draw(0);
        } else {
            host.addEventListener("pointermove", onMove);
            host.addEventListener("pointerleave", onLeave);
            raf = requestAnimationFrame(loop);
        }

        // Stop drawing while the hero is off screen.
        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !raf && !reduceMotion) raf = requestAnimationFrame(loop);
        });
        io.observe(host);
        const ro = new ResizeObserver(() => {
            resize();
            if (reduceMotion) draw(0);
        });
        ro.observe(host);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
            host.removeEventListener("pointermove", onMove);
            host.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_95%_90%_at_50%_40%,#000_60%,transparent_100%)] ${className}`} />;
}
