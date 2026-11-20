import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GridField from "../components/grid-field";
import { HeroTileColumns, HeroTileRow } from "../components/hero-tiles";

const rise = (delay) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
    return (
        <section id="home" className="relative -mt-16 overflow-hidden pt-16 lg:h-[max(44rem,min(100svh,56rem))]">
            <GridField />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="pointer-events-none absolute inset-0 top-16 z-10 overflow-hidden"
            >
                <HeroTileColumns />
            </motion.div>

            <div className="pointer-events-none relative flex flex-col items-center px-5 pb-20 pt-16 text-center md:pt-24 lg:h-full lg:justify-center lg:pb-16 lg:pt-0">
                <div className="pointer-events-auto max-w-[34rem] xl:max-w-[40rem]">
                    <motion.p {...rise(0)} className="text-ink-soft">
                        Business intelligence and AI automation partner
                    </motion.p>
                    <motion.h1
                        {...rise(0.05)}
                        className="mt-4 text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.03em] text-ink sm:text-6xl xl:text-[4.25rem]"
                    >
                        Your business has the data. We help you grow with it.
                    </motion.h1>

                    <motion.p {...rise(0.15)} className="mx-auto mt-6 max-w-[32rem] text-lg leading-relaxed text-ink-soft">
                        We help businesses understand their data, make better decisions, and build stronger customer
                        relationships through business analytics, AI systems, and automation.
                    </motion.p>

                    <motion.div {...rise(0.25)} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
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
            </div>

            <div className="relative pb-16 lg:hidden">
                <HeroTileRow />
            </div>
        </section>
    );
}
