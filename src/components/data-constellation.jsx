import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, Camera, MessageCircle, Package, Users } from "lucide-react";

// Coordinates are in the SVG viewBox (480 x 480); HTML pieces are placed with
// matching percentages so both layers line up at any width.
const HUB = { x: 240, y: 175 };
const CHIP = { w: 116, h: 36 };

const sources = [
    { id: "sales", label: "Sales", icon: BarChart3, x: 72, y: 175 },
    { id: "inventory", label: "Inventory", icon: Package, x: 112, y: 78 },
    { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, x: 240, y: 34 },
    { id: "instagram", label: "Instagram", icon: Camera, x: 368, y: 78 },
    { id: "crm", label: "CRM", icon: Users, x: 408, y: 175 },
];

// Illustrative insights; each lights up the sources it draws on.
const insights = [
    {
        from: ["whatsapp", "inventory"],
        text: "Customers asked for the 5 kg basmati pack three times this week, and it's out of stock.",
        action: "Reorder before Friday",
    },
    {
        from: ["sales", "crm"],
        text: "Some regular customers haven't bought anything in 60 days.",
        action: "Send them a personalised offer",
    },
    {
        from: ["instagram", "crm"],
        text: "A new property enquiry matches the profile of your likely buyers.",
        action: "Hand it to sales with the full conversation",
    },
    {
        from: ["sales", "inventory"],
        text: "Weekend demand for cooking oil usually rises, and stock is running low.",
        action: "Increase stock for the weekend",
    },
];

const pct = (v) => `${(v / 480) * 100}%`;

export default function DataConstellation() {
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const insight = insights[index];

    useEffect(() => {
        if (reduceMotion) return;
        const t = setInterval(() => setIndex((i) => (i + 1) % insights.length), 4800);
        return () => clearInterval(t);
    }, [reduceMotion]);

    return (
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_0_rgb(14_27_51/0.04),0_24px_48px_-24px_rgb(14_27_51/0.18)]">
            <div aria-hidden="true" className="grid-paper absolute inset-0 opacity-60 [--cell:24px]" />

            <svg viewBox="0 0 480 480" className="absolute inset-0 size-full" aria-hidden="true">
                {sources.map((s) => {
                    const active = insight.from.includes(s.id);
                    const path = `M${s.x} ${s.y} L${HUB.x} ${HUB.y}`;
                    return (
                        <g key={s.id}>
                            <path
                                d={path}
                                className="transition-[stroke,stroke-opacity] duration-500"
                                stroke={active ? "var(--color-wing)" : "var(--color-ink)"}
                                strokeOpacity={active ? 0.5 : 0.12}
                                strokeWidth="1.5"
                                strokeDasharray={active ? "none" : "3 5"}
                                fill="none"
                            />
                            {active && !reduceMotion &&
                                [0, 0.6, 1.2].map((delay) => (
                                    <circle key={`${index}-${delay}`} r="3.5" fill="var(--color-wing)">
                                        <animateMotion dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" path={path} />
                                    </circle>
                                ))}
                        </g>
                    );
                })}

                {/* Hub to insight */}
                <path d={`M${HUB.x} ${HUB.y + 40} L${HUB.x} 286`} stroke="var(--color-wing)" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
                {!reduceMotion && (
                    <circle key={`out-${index}`} r="3.5" fill="var(--color-ascent)">
                        <animateMotion dur="1.2s" repeatCount="indefinite" path={`M${HUB.x} ${HUB.y + 40} L${HUB.x} 286`} />
                    </circle>
                )}
            </svg>

            {/* Data sources */}
            {sources.map((s) => {
                const Icon = s.icon;
                const active = insight.from.includes(s.id);
                return (
                    <div
                        key={s.id}
                        className={`absolute flex items-center justify-center gap-1.5 rounded-full border bg-white text-[11px] font-medium transition-colors duration-500 sm:text-sm ${
                            active ? "border-wing/40 text-ink" : "border-line text-ink-soft"
                        }`}
                        style={{
                            left: pct(s.x - CHIP.w / 2),
                            top: pct(s.y - CHIP.h / 2),
                            width: pct(CHIP.w),
                            height: pct(CHIP.h),
                        }}
                    >
                        <Icon className={`size-3.5 shrink-0 sm:size-4 ${active ? "text-wing" : ""}`} strokeWidth={2} />
                        {s.label}
                    </div>
                );
            })}

            {/* Wingora hub */}
            <div
                className="absolute flex items-center justify-center"
                style={{ left: pct(HUB.x - 40), top: pct(HUB.y - 40), width: pct(80), height: pct(80) }}
            >
                {!reduceMotion && <span className="absolute inset-0 animate-ping rounded-full bg-wing/10 [animation-duration:2.4s]" />}
                <span className="relative flex size-full items-center justify-center rounded-full border border-wing/30 bg-white shadow-[0_8px_24px_-12px_rgb(31_79_214/0.5)]">
                    <span className="block h-[42%] w-[56%] overflow-hidden">
                        <img src="/assets/Screenshot_2025-12-30_135254-removebg-preview.png" alt="" className="h-full w-auto max-w-none" />
                    </span>
                </span>
            </div>

            {/* Insight card */}
            <div className="absolute" style={{ left: pct(28), top: pct(290), width: pct(424), height: pct(166) }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex h-full flex-col justify-between rounded-xl border border-line bg-white p-3.5 shadow-[0_12px_28px_-18px_rgb(14_27_51/0.35)] sm:p-5"
                        aria-live="polite"
                    >
                        <div>
                            <p className="text-xs text-ink-soft sm:text-sm">What your data is telling you</p>
                            <p className="mt-1.5 text-[13px] font-medium leading-snug text-ink sm:text-base">{insight.text}</p>
                        </div>
                        <p className="flex items-center gap-2 text-[12px] font-medium text-wing sm:text-sm">
                            <span className="size-1.5 rounded-full bg-ascent" />
                            {insight.action}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
