import { motion } from "framer-motion";
import SectionTitle from "../components/section-title";

const steps = [
    {
        title: "Consultation",
        description: "A free call to understand how your business runs today and where time or money is being lost.",
    },
    {
        title: "Plan",
        description: "A written proposal with scope, timeline, and cost, so you know exactly what you're getting.",
    },
    {
        title: "Build and launch",
        description: "We build, test with your real data, and connect the system to the tools your team already uses.",
    },
    {
        title: "Support",
        description: "We monitor results, fix issues, and improve the system as your business changes.",
    },
];

export default function Process() {
    return (
        <section id="process" className="relative overflow-hidden bg-ink text-paper">
            <div aria-hidden="true" className="absolute inset-0 grid-paper opacity-[0.35] [--color-line:rgb(245_247_250/0.08)]" />
            <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">How a project runs</h2>
                    <p className="mt-4 text-lg leading-relaxed text-paper/70">
                        Most projects go from first call to a working system in four to eight weeks.
                    </p>
                </div>

                <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
                    <motion.span
                        aria-hidden="true"
                        className="absolute left-0 right-0 top-[15px] hidden h-px origin-left bg-paper/25 lg:block"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {steps.map((step, i) => (
                        <li key={step.title} className="relative">
                            <span className="relative flex size-[31px] items-center justify-center rounded-full border border-paper/30 bg-ink text-sm font-medium tabular-nums">
                                {i + 1}
                            </span>
                            <h3 className="mt-6 text-xl font-semibold tracking-tight">{step.title}</h3>
                            <p className="mt-2 leading-relaxed text-paper/70">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
