import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Camera, Check, FileText, Globe, MessageCircle, TrendingUp, UserRound } from "lucide-react";

// Small illustrative product visuals. Each animates once it scrolls into view,
// and shows its finished state when reduced motion is on.

const ease = [0.22, 1, 0.36, 1];

function useStart(amount = 0.4) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount });
    const reduce = useReducedMotion();
    return { ref, on: inView || reduce, reduce };
}

function Frame({ children, className = "" }) {
    return (
        <div className={`relative h-full w-full overflow-hidden rounded-xl border border-line bg-white ${className}`}>
            <div aria-hidden="true" className="grid-paper absolute inset-0 opacity-50 [--cell:20px]" />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

export function BarsViz() {
    const { ref, on } = useStart();
    const days = [["Mon", 38], ["Tue", 44], ["Wed", 41], ["Thu", 52], ["Fri", 63], ["Sat", 86], ["Sun", 78]];
    return (
        <Frame>
            <div ref={ref} className="flex h-full flex-col p-4">
                <div className="flex items-center justify-between text-xs text-ink-soft">
                    <span>Daily sales, this week</span>
                    <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={on ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="flex items-center gap-1 rounded-full bg-wing-tint px-2 py-0.5 font-medium text-wing"
                    >
                        <TrendingUp className="size-3" /> Weekend rising
                    </motion.span>
                </div>
                <div className="mt-3 flex flex-1 items-end gap-2">
                    {days.map(([d, h], i) => (
                        <div key={d} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                            <motion.div
                                className={`w-full origin-bottom rounded-t-md ${i >= 5 ? "bg-wing" : "bg-wing/25"}`}
                                style={{ height: `${h}%` }}
                                initial={{ scaleY: 0 }}
                                animate={on ? { scaleY: 1 } : {}}
                                transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease }}
                            />
                            <span className="text-[10px] text-ink-soft">{d}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Frame>
    );
}

const chatScript = [
    { from: "customer", text: "Is the 3BHK in Kakkanad still available?" },
    { from: "bot", text: "Yes. I can share three options under 90 lakh. When would you like a visit?" },
    { from: "customer", text: "Saturday morning works." },
];

export function ChatViz() {
    const { ref, on, reduce } = useStart();
    const [shown, setShown] = useState(reduce ? chatScript.length + 1 : 1);
    useEffect(() => {
        if (!on || reduce) return;
        const t = setTimeout(() => setShown((n) => (n > chatScript.length ? 1 : n + 1)), shown > chatScript.length ? 3200 : 1100);
        return () => clearTimeout(t);
    }, [on, shown, reduce]);

    return (
        <Frame>
            <div ref={ref} className="flex h-full flex-col justify-end gap-2 p-4">
                <AnimatePresence initial={false}>
                    {chatScript.slice(0, shown).map((m) => (
                        <motion.p
                            key={m.text}
                            layout
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease }}
                            className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                                m.from === "customer" ? "self-start rounded-bl-sm bg-paper text-ink" : "self-end rounded-br-sm bg-wing text-white"
                            }`}
                        >
                            {m.text}
                        </motion.p>
                    ))}
                    {shown > chatScript.length && (
                        <motion.p
                            key="handover"
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 self-center rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink"
                        >
                            <span className="size-1.5 rounded-full bg-ascent" /> Visit booked, lead sent to sales
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </Frame>
    );
}

export function LineViz() {
    const { ref, on } = useStart();
    const past = "M10 92 C 40 88, 60 70, 90 74 S 140 52, 170 58";
    const future = "M170 58 C 195 62, 215 36, 250 30";
    return (
        <Frame>
            <div ref={ref} className="flex h-full flex-col p-4">
                <div className="flex justify-between text-xs text-ink-soft">
                    <span>Demand forecast</span>
                    <span className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-wing" />Actual</span>
                        <span className="flex items-center gap-1"><span className="h-0.5 w-3 border-t-2 border-dashed border-ascent" />Forecast</span>
                    </span>
                </div>
                <svg viewBox="0 0 260 110" className="mt-2 w-full flex-1" preserveAspectRatio="none" aria-hidden="true">
                    <motion.path d="M170 58 C 195 50, 215 22, 250 14 L 250 46 C 215 52, 195 74, 170 58 Z" fill="var(--color-ascent)" fillOpacity="0.08"
                        initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 1.4, duration: 0.6 }} />
                    <motion.path d={past} fill="none" stroke="var(--color-wing)" strokeWidth="2.5" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={on ? { pathLength: 1 } : {}} transition={{ duration: 1.2, ease }} />
                    <motion.path d={future} fill="none" stroke="var(--color-ascent)" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round"
                        initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 1.1, duration: 0.6 }} />
                    <motion.circle cx="170" cy="58" r="4" fill="var(--color-wing)"
                        initial={{ scale: 0 }} animate={on ? { scale: 1 } : {}} transition={{ delay: 1.1 }} />
                </svg>
                <div className="flex justify-between text-[10px] text-ink-soft"><span>Jan</span><span>Apr</span><span>Jul</span><span>Next quarter</span></div>
            </div>
        </Frame>
    );
}

const segments = [
    { label: "Regulars", color: "bg-wing", cx: 22, cy: 55 },
    { label: "New", color: "bg-ink-soft", cx: 52, cy: 35 },
    { label: "At risk", color: "bg-ascent", cx: 80, cy: 60 },
];
// Deterministic scatter so the start positions don't change between renders.
const dots = Array.from({ length: 21 }, (_, i) => ({
    seg: i % 3,
    sx: (i * 37) % 90 + 5,
    sy: (i * 53) % 70 + 10,
    ox: ((i * 17) % 13) - 6,
    oy: ((i * 29) % 13) - 6,
}));

export function DotsViz() {
    const { ref, on } = useStart();
    return (
        <Frame>
            <div ref={ref} className="flex h-full flex-col p-4">
                <span className="text-xs text-ink-soft">Customer segments</span>
                <div className="relative mt-2 flex-1">
                    {dots.map((d, i) => {
                        const s = segments[d.seg];
                        return (
                            <motion.span
                                key={i}
                                className={`absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${s.color}`}
                                initial={{ left: `${d.sx}%`, top: `${d.sy}%`, opacity: 0.5 }}
                                animate={on ? { left: `${s.cx + d.ox}%`, top: `${s.cy + d.oy}%`, opacity: 1 } : {}}
                                transition={{ delay: 0.3 + (i % 7) * 0.05, duration: 1.1, ease }}
                            />
                        );
                    })}
                    {segments.map((s, i) => (
                        <motion.span
                            key={s.label}
                            className="absolute -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-white px-2 py-0.5 text-[11px] font-medium text-ink"
                            style={{ left: `${s.cx}%`, top: `${s.cy + 16}%` }}
                            initial={{ opacity: 0, y: 6 }}
                            animate={on ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.3 + i * 0.12 }}
                        >
                            {s.label}
                        </motion.span>
                    ))}
                </div>
            </div>
        </Frame>
    );
}

export function DocViz() {
    const { ref, on } = useStart();
    const fields = [["Vendor", "Malabar Traders"], ["Invoice", "#2291"], ["Tax", "₹1,842"], ["Total", "₹12,078"]];
    return (
        <Frame>
            <div ref={ref} className="flex h-full items-center gap-3 p-4">
                <div className="flex h-full w-[38%] flex-col gap-1.5 rounded-lg border border-line bg-white p-2.5 shadow-sm">
                    <FileText className="size-4 text-ink-soft" />
                    {[90, 70, 80, 55, 75, 40].map((w, i) => (
                        <span key={i} className="h-1.5 rounded-full bg-ink/10" style={{ width: `${w}%` }} />
                    ))}
                    <motion.span
                        className="mt-auto h-0.5 w-full bg-wing"
                        initial={{ scaleX: 0 }}
                        animate={on ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.9, ease }}
                        style={{ originX: 0 }}
                    />
                </div>
                <ul className="flex-1 space-y-1.5">
                    {fields.map(([k, v], i) => (
                        <motion.li
                            key={k}
                            className="flex items-center justify-between gap-2 rounded-md border border-line bg-white px-2 py-1 text-[11px]"
                            initial={{ opacity: 0, x: -10 }}
                            animate={on ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.8 + i * 0.18, duration: 0.4 }}
                        >
                            <span className="text-ink-soft">{k}</span>
                            <span className="flex items-center gap-1 font-medium text-ink">
                                {v} <Check className="size-3 text-emerald-600" />
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </Frame>
    );
}

const channels = [
    { icon: MessageCircle, label: "WhatsApp", msg: "Price for bulk order?" },
    { icon: Camera, label: "Instagram", msg: "Do you deliver to Kochi?" },
    { icon: Globe, label: "Website", msg: "Need a demo this week" },
];

export function ChannelsViz() {
    const { ref, on } = useStart();
    return (
        <Frame>
            <div ref={ref} className="flex h-full items-center gap-3 p-4">
                <ul className="flex w-[42%] flex-col gap-2">
                    {channels.map((c, i) => (
                        <motion.li
                            key={c.label}
                            className="flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-medium text-ink"
                            initial={{ opacity: 0, x: -10 }}
                            animate={on ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.15 }}
                        >
                            <c.icon className="size-3.5 text-wing" /> {c.label}
                        </motion.li>
                    ))}
                </ul>
                <div className="flex-1 rounded-lg border border-line bg-white p-2 shadow-sm">
                    <p className="flex items-center justify-between text-[11px] font-medium text-ink">
                        One inbox <UserRound className="size-3.5 text-ink-soft" />
                    </p>
                    <ul className="mt-1.5 space-y-1">
                        {channels.map((c, i) => (
                            <motion.li
                                key={c.msg}
                                className="flex items-center gap-1.5 rounded-md bg-paper px-1.5 py-1 text-[10px] text-ink"
                                initial={{ opacity: 0, y: 6 }}
                                animate={on ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.7 + i * 0.25 }}
                            >
                                <c.icon className="size-3 shrink-0 text-wing" />
                                <span className="truncate">{c.msg}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </Frame>
    );
}

export function CountUp({ to, suffix = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const reduce = useReducedMotion();
    const [n, setN] = useState(reduce ? to : 0);
    useEffect(() => {
        if (!inView || reduce) return;
        let frame = 0;
        const total = 40;
        const id = setInterval(() => {
            frame += 1;
            setN(Math.round(to * (1 - Math.pow(1 - frame / total, 3))));
            if (frame >= total) clearInterval(id);
        }, 30);
        return () => clearInterval(id);
    }, [inView, reduce, to]);
    return (
        <span ref={ref} className="tabular-nums">
            {n}
            {suffix}
        </span>
    );
}
