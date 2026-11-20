import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

// Illustrative examples of the collect, understand, decide, act cycle.
// They are not client deployments and use no client names.
const runs = [
    {
        channel: "WhatsApp",
        who: "a supermarket customer",
        message: "Do you have the 5 kg pack of basmati rice in stock?",
        steps: [
            "Understood a product enquiry",
            "Checked inventory: out of stock",
            "Replied with the expected restock date",
            "Logged the enquiry as unmet demand",
        ],
        result: "Third request this week, so the item is flagged for reorder.",
    },
    {
        channel: "Business assistant",
        who: "the store owner",
        message: "Which products should I reorder before the weekend?",
        steps: [
            "Read the last twelve weeks of sales",
            "Compared demand with current stock",
            "Estimated weekend demand by product",
        ],
        result: "Reorder list ready, with the reason for each item.",
    },
    {
        channel: "Instagram",
        who: "a property enquiry",
        message: "Looking for a 3BHK near Kakkanad, budget under 90 lakh.",
        steps: [
            "Captured the requirements: 3BHK, Kakkanad, budget",
            "Marked it as a likely buyer for review",
            "Handed the lead to a sales rep with the full conversation",
            "Scheduled a follow-up reminder",
        ],
        result: "The sales rep picks up with full context.",
    },
];

const STEP_MS = 900;

export default function AgentTrace() {
    const reduceMotion = useReducedMotion();
    const [runIndex, setRunIndex] = useState(0);
    const [shown, setShown] = useState(0);
    const run = runs[runIndex];
    const total = run.steps.length + 1; // steps plus the result line

    useEffect(() => {
        if (reduceMotion) {
            setShown(total);
            return;
        }
        if (shown < total) {
            const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 1200 : STEP_MS);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
            setShown(0);
            setRunIndex((i) => (i + 1) % runs.length);
        }, 4200);
        return () => clearTimeout(t);
    }, [shown, total, reduceMotion]);

    const working = shown < total;

    return (
        <div className="relative rounded-2xl border border-line bg-white shadow-[0_1px_0_rgb(14_27_51/0.04),0_24px_48px_-24px_rgb(14_27_51/0.18)]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5 text-sm">
                <span className="font-medium text-ink">Example workflow</span>
                <span className="flex items-center gap-2 text-ink-soft">
                    <span className="relative flex size-2">
                        {working && !reduceMotion && (
                            <span className="absolute inset-0 rounded-full bg-ascent animate-ping opacity-60" />
                        )}
                        <span className={`relative size-2 rounded-full ${working ? "bg-ascent" : "bg-emerald-500"}`} />
                    </span>
                    {working ? "Working" : "Done"}
                </span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={runIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 min-h-[22rem]"
                >
                    <p className="text-sm text-ink-soft">
                        {run.channel}, from {run.who}
                    </p>
                    <p className="mt-2 rounded-xl rounded-tl-sm bg-wing-tint px-4 py-3 text-[0.95rem] text-ink">
                        {run.message}
                    </p>

                    <ol className="mt-5 space-y-3">
                        {run.steps.map((step, i) => (
                            <li
                                key={step}
                                className={`flex items-start gap-3 text-[0.95rem] transition-all duration-500 ${
                                    i < shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                                }`}
                            >
                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-wing/30 text-wing">
                                    <Check className="size-3" strokeWidth={3} />
                                </span>
                                <span className="text-ink">{step}</span>
                            </li>
                        ))}
                    </ol>

                    <p
                        className={`mt-5 border-t border-line pt-4 text-[0.95rem] font-medium text-wing transition-opacity duration-500 ${
                            shown >= total ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {run.result}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
