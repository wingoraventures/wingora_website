import { motion } from "framer-motion";
import { Database, Lightbulb, RefreshCw, ScanSearch, Zap } from "lucide-react";

const steps = [
    { title: "Collect", text: "Sales, stock, chats", icon: Database },
    { title: "Understand", text: "Spot the patterns", icon: ScanSearch },
    { title: "Decide", text: "Know what to do next", icon: Lightbulb },
    { title: "Act", text: "Automate the response", icon: Zap },
    { title: "Improve", text: "Measure and refine", icon: RefreshCw },
];

export default function Process() {
    return (
        <section id="how-it-works" className="relative overflow-hidden bg-ink text-paper">
            <div aria-hidden="true" className="absolute inset-0 grid-paper opacity-[0.35] [--color-line:rgb(245_247_250/0.08)]" />
            <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
                <h2 className="max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
                    How data becomes growth
                </h2>

                <ol className="relative mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                    <motion.span
                        aria-hidden="true"
                        className="absolute left-6 right-6 top-6 hidden h-px origin-left bg-paper/25 lg:block"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {steps.map((step, i) => (
                        <motion.li
                            key={step.title}
                            className="relative"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                        >
                            <span className="relative flex size-12 items-center justify-center rounded-xl border border-paper/20 bg-ink text-paper">
                                <step.icon className="size-5" strokeWidth={1.75} />
                            </span>
                            <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
                            <p className="mt-1 text-paper/70">{step.text}</p>
                        </motion.li>
                    ))}
                </ol>

                <p className="mt-14 max-w-2xl border-t border-paper/15 pt-8 text-lg leading-relaxed text-paper/80">
                    Example: when customers keep asking on WhatsApp for something that's out of stock, that's a
                    reorder signal, not just a chat.
                </p>
            </div>
        </section>
    );
}
