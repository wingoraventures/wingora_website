import { motion } from "framer-motion";

const steps = [
    { title: "Collect", description: "Bring together sales, inventory, purchase history, and customer conversations." },
    { title: "Understand", description: "Find patterns in demand, buying behaviour, and what customers keep asking." },
    { title: "Decide", description: "Turn those patterns into clear choices about stock, offers, and follow-ups." },
    { title: "Act", description: "Automate the response: reorders, personalised messages, or a handover to sales." },
    { title: "Improve", description: "Measure what changed and refine the system based on real use." },
];

export default function Process() {
    return (
        <section id="how-it-works" className="relative overflow-hidden bg-ink text-paper">
            <div aria-hidden="true" className="absolute inset-0 grid-paper opacity-[0.35] [--color-line:rgb(245_247_250/0.08)]" />
            <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">
                        Where business data and customer conversations meet
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-paper/70">
                        Customer conversations generate business information, and business data helps you understand
                        customers. We connect the two in a continuous cycle.
                    </p>
                </div>

                <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
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

                <div className="mt-16 grid gap-8 border-t border-paper/15 pt-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
                    <h3 className="text-xl font-semibold tracking-tight">An example: a supermarket</h3>
                    <div className="space-y-4 leading-relaxed text-paper/75">
                        <p>
                            A supermarket already has sales records, inventory, purchase history, WhatsApp enquiries,
                            complaints, and repeat purchases. Looked at together, they show product demand, buying
                            patterns, and where stock planning can improve.
                        </p>
                        <p>
                            If customers keep asking about a product that's out of stock, that points to an inventory
                            problem. If certain customers regularly buy a category, the store can reach them with
                            more relevant offers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
