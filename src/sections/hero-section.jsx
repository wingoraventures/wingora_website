import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TiltedImage from "../components/tilt-image";

export default function HeroSection() {
    return (
        <section className="flex flex-col items-center -mt-10 pt-10 md:-mt-18 md:pt-0" id="home">
            <motion.svg className="absolute -z-10 w-full -mt-40 md:mt-0" width="1440" height="676" viewBox="0 0 1440 676" fill="none" xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <rect x="-92" y="-948" width="1624" height="1624" rx="812" fill="url(#a)" />
                <defs>
                    <radialGradient id="a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 428 292)scale(812)">
                        <stop offset=".63" stopColor="#372AAC" stopOpacity="0" />
                        <stop offset="1" stopColor="#372AAC" />
                    </radialGradient>
                </defs>
            </motion.svg>

            {/* ✅ Reduced top margin on mobile: mt-28 → md:mt-48 */}
            <motion.a href="#contact" className="flex items-center mt-28 md:mt-48 gap-2 border border-slate-600 text-gray-50 rounded-full px-4 py-2 hover:bg-white/5 transition"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <div className="size-2.5 bg-green-500 rounded-full animate-pulse" />
                <span>Your first step toward a better space</span>
            </motion.a>

            {/* ✅ Tighter heading size/line-height on mobile */}
            <motion.h1 className="text-center text-4xl leading-[52px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-3xl px-4"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
            >
                Smart AI Solutions for Modern Businesses
            </motion.h1>

            {/* ✅ Slightly tighter paragraph on mobile */}
            <motion.p className="text-center text-sm md:text-base max-w-2xl mt-3 md:mt-4 px-4 text-slate-300"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                We help businesses grow smarter by combining AI automation, intelligent chatbots, powerful websites, and performance-driven digital marketing — all designed to save time, reduce cost, and scale faster.
            </motion.p>

            {/* ✅ Reduced top margin on mobile: mt-6 → md:mt-8 */}
            <motion.div className="flex items-center gap-4 mt-6 md:mt-8"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <Link
                    to="/projects"
                    className="group relative flex items-center gap-2 overflow-hidden rounded-lg px-7 h-11 bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-300 text-white font-medium"
                >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                    <span>View Our Work</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </motion.div>

            <TiltedImage />
        </section>
    );
}