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
                    <motion.h1
                        {...rise(0.05)}
                        className="text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.25rem]"
                    >
                        AI that answers your customers and does the busywork.
                    </motion.h1>

                    <motion.p {...rise(0.15)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft">
                        Wingora Ventures is an AI engineering studio in Kerala. We build chatbots, voice agents, and
                        workflow automation for clinics, retailers, real estate teams, and growing companies, and we
                        keep them running after launch.
                    </motion.p>

                    <motion.div {...rise(0.25)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                        <a
                            href="#contact"
                            className="inline-flex h-12 items-center rounded-lg bg-wing px-6 font-medium text-white transition-colors hover:bg-wing-deep"
                        >
                            Book a free consultation
                        </a>
                        <Link to="/projects" className="font-medium text-ink link-underline">
                            See 20 projects we've shipped
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                    <AgentTrace />
                </motion.div>
            </div>
        </section>
    );
}
