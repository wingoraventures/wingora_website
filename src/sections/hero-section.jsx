import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GridField from "../components/grid-field";
import AgentTrace from "../components/agent-trace";

const rise = (delay) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
    return (
        <section id="home" className="relative -mt-16 overflow-hidden pt-16">
            <GridField />

            <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 md:px-8 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-32">
                <div>
                    <motion.p {...rise(0)} className="text-ink-soft">
                        Business intelligence and AI automation partner
                    </motion.p>
                    <motion.h1
                        {...rise(0.05)}
                        className="mt-4 text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.25rem]"
                    >
                        Your business has the data. We help you grow with it.
                    </motion.h1>

                    <motion.p {...rise(0.15)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft">
                        Wingora Ventures helps businesses understand their data, make better decisions, and build
                        stronger customer relationships through business analytics, AI systems, and automation.
                    </motion.p>

                    <motion.div {...rise(0.25)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                        <a
                            href="#contact"
                            className="inline-flex h-12 items-center rounded-lg bg-wing px-6 font-medium text-white transition-colors hover:bg-wing-deep"
                        >
                            Book a consultation
                        </a>
                        <Link to="/projects" className="font-medium text-ink link-underline">
                            See our projects
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                    <AgentTrace />
                    <p className="mt-3 text-sm text-ink-soft">
                        Illustrative examples of how business data and customer conversations can work together.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
