import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CELL = 64;

// Blueprint grid whose cells light up briefly under the cursor, plus a few
// ambient cells that glow on their own so the grid feels alive at rest.
export default function GridField({ className = "" }) {
    const ref = useRef(null);
    const [cells, setCells] = useState([]);
    const lastCell = useRef("");
    const idRef = useRef(0);
    const reduceMotion = useReducedMotion();

    const light = (col, row, tone = "wing") => {
        const id = ++idRef.current;
        setCells((prev) => [...prev.slice(-14), { id, col, row, tone }]);
        setTimeout(() => setCells((prev) => prev.filter((c) => c.id !== id)), 1400);
    };

    useEffect(() => {
        if (reduceMotion) return;
        const el = ref.current?.parentElement;
        if (!el) return;

        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const col = Math.floor((e.clientX - rect.left) / CELL);
            const row = Math.floor((e.clientY - rect.top) / CELL);
            const key = `${col}:${row}`;
            if (key === lastCell.current) return;
            lastCell.current = key;
            light(col, row);
        };

        const ambient = setInterval(() => {
            const rect = el.getBoundingClientRect();
            const cols = Math.floor(rect.width / CELL);
            const rows = Math.floor(rect.height / CELL);
            light(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows), Math.random() < 0.15 ? "ascent" : "wing");
        }, 1800);

        el.addEventListener("pointermove", onMove);
        return () => {
            el.removeEventListener("pointermove", onMove);
            clearInterval(ambient);
        };
    }, [reduceMotion]);

    return (
        <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 grid-paper grid-fade ${className}`}>
            {cells.map((c) => (
                <span
                    key={c.id}
                    className={`absolute grid-cell ${c.tone === "ascent" ? "bg-ascent/10" : "bg-wing/10"}`}
                    style={{ left: c.col * CELL + 1, top: c.row * CELL + 1, width: CELL - 1, height: CELL - 1 }}
                />
            ))}
        </div>
    );
}
