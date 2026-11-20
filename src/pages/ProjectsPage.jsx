import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { projectsData } from "../data/projectsData.jsx";

const categories = ["All", ...Array.from(new Set(projectsData.filter(p => p.category !== "Mobile App").map(p => p.category)))];

const sizeMap = {
    1: "large", 2: "small", 3: "small", 4: "medium", 5: "medium",
    6: "small",  7: "large", 8: "small", 9: "medium", 10: "small",
    11: "small", 12: "medium", 13: "medium", 14: "small", 15: "large", 16: "medium",
    17: "medium", 18: "medium", 19: "medium", 20: "medium",
};

const shortDesc = {
    1:  "Records doctor-patient conversations, auto-generates SOAP notes, routes queries via AI chatbot.",
    2:  "AI-powered WhatsApp chatbot integrated with Odoo CRM for real-time sales queries and alerts.",
    3:  "Enterprise chatbot API with PII removal, semantic ranking, and multilingual support on Azure.",
    4:  "Fine-tuned Azure OpenAI on 1,000 invoice templates for automated structured data extraction.",
    5:  "Azure Function analyzing chatbot logs — session duration, token usage, and performance metrics.",
    6:  "Intent-based API automating Freshdesk tickets, scheduling, and to-dos via Azure OpenAI.",
    7:  "Natural language SQL bot with Adaptive Card responses and Azure AI Search schema indexing.",
    8:  "Real-time voice interaction with a digital avatar using Azure Speech SDK and lip-sync animation.",
    9:  "AI support bot handling ticket creation, leave tracking, and policy queries via RAG.",
    10: "Train on your docs, embed anywhere in one line of code with multi-LLM support.",
    11: "Natural language expense and nutrition tracking with contextual summaries.",
    12: "Multi-angle clothing viewer with Gemini-powered virtual fitting simulation.",
    13: "Multi-output regression predicting 8+ body measurements from basic inputs.",
    14: "Zero-hallucination FAQ bot strictly aligned to Swakriti source documentation.",
    15: "Semantic vector search for personalized outfit suggestions beyond keywords.",
    16: "Scrapes TCS, Infosys & 50+ Indian stocks — AI insights, Peter Lynch classification, BMC, and investor Q&A.",
    17: "iOS scribe agent — records consultations, generates SOAP notes, emails reports via Gemini + Deepgram.",
    18: "Android virtual try-on with AI-generated outfit preview and a full 360° spin view.",
    19: "Floating try-on overlay for any shopping app — instant fit preview, saved looks, built in Kotlin.",
    20: "Classifies ECG reports using Gemini, extracts waveform intervals via OpenCV, and generates professional PDF summaries.",
};

const aiImages = [
    { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop", label: "Neural Networks" },
    { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop", label: "Deep Learning" },
    { src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600&auto=format&fit=crop", label: "Computer Vision" },
    { src: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=600&auto=format&fit=crop", label: "NLP" },
    { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop", label: "Healthcare AI" },
];

// images for the Websites & App Development hero strip
const buildImages = [
    { src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop", label: "iOS / Android" },
    { src: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=600&auto=format&fit=crop", label: "Cross-Platform" },
    { src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=600&auto=format&fit=crop", label: "UI Engineering" },
    { src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=600&auto=format&fit=crop", label: "Full-Stack Web" },
    { src: "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=600&auto=format&fit=crop", label: "Product Design" },
];

function ShimmerText({ children, className }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <style>{`
                @keyframes shimmer-move {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .shimmer-white {
                    background: linear-gradient(90deg,#ffffff 0%,#ffffff 35%,#c7d2fe 45%,#a5b4fc 50%,#c7d2fe 55%,#ffffff 65%,#ffffff 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer-move 4s linear infinite;
                }
            `}</style>
            <span className="shimmer-white">{children}</span>
        </span>
    );
}

// Shimmer variant tuned cyan/teal so the build-mode hero reads as a distinct
// "channel" from the indigo AI hero above it, not a recolor of the same thing.
function ShimmerTextAlt({ children, className }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <style>{`
                @keyframes shimmer-move-alt {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .shimmer-cyan {
                    background: linear-gradient(90deg,#ffffff 0%,#ffffff 35%,#a5f3fc 45%,#67e8f9 50%,#a5f3fc 55%,#ffffff 65%,#ffffff 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer-move-alt 4s linear infinite;
                }
            `}</style>
            <span className="shimmer-cyan">{children}</span>
        </span>
    );
}

function Card({ project, idx, mode, subTab, activeCategory }) {
    const [hov, setHov] = useState(false);
    const size = sizeMap[project.id] || "small";
    const desc = shortDesc[project.id] || project.description?.slice(0, 100) + "…";
    const heightMap = { large: "h-[460px]", medium: "h-[320px]", small: "h-[260px]" };
    const toolsShown = size === "small" ? 2 : 3;
    const linkParams = new URLSearchParams();
    if (mode) linkParams.set("mode", mode);
    if (subTab) linkParams.set("tab", subTab);
    if (activeCategory && activeCategory !== "All") linkParams.set("category", activeCategory);
    const linkQuery = linkParams.toString();
    const toLink = `/projects/${project.id}${linkQuery ? `?${linkQuery}` : ""}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, delay: (idx % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link to={toLink}>
                <div
                    className={`relative overflow-hidden rounded-2xl border border-white/[0.06] cursor-pointer ${heightMap[size]}`}
                    onMouseEnter={() => setHov(true)}
                    onMouseLeave={() => setHov(false)}
                >
                    <motion.img
                        src={project.image}
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        animate={{ scale: hov ? 1.07 : 1 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                    <motion.div
                        className="absolute inset-0 bg-indigo-950/25"
                        animate={{ opacity: hov ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="text-[10px] tracking-widest uppercase text-slate-300 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                            {project.category}
                        </span>
                        <motion.span animate={{ opacity: hov ? 1 : 0 }} className="text-[11px] tabular-nums text-indigo-400 font-medium">
                            {String(project.id).padStart(2, "0")}
                        </motion.span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-[10px] tracking-widest uppercase text-indigo-400 mb-1.5">{project.role}</p>
                        <h3 className={`font-bold text-white leading-snug ${size === "large" ? "text-[18px]" : "text-[13px]"}`}>
                            {project.name}
                        </h3>
                        <motion.div
                            animate={{ height: hov ? "auto" : 0, opacity: hov ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{desc}</p>
                        </motion.div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {project.tools.slice(0, toolsShown).map(t => (
                                <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-black/60 border border-white/[0.08] text-slate-400">{t}</span>
                            ))}
                            {project.tools.length > toolsShown && (
                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/60 border border-white/[0.08] text-slate-600">
                                    +{project.tools.length - toolsShown}
                                </span>
                            )}
                        </div>
                    </div>
                    <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500"
                        animate={{ width: hov ? "100%" : "0%" }}
                        transition={{ duration: 0.45 }}
                    />
                </div>
            </Link>
        </motion.div>
    );
}

function FeatureBlock({ block, idx }) {
    const isEven = idx % 2 === 0;
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
        >
            <div className="flex-1 space-y-5">
                <span className="text-[10px] tracking-widest uppercase text-indigo-400 font-medium">{block.tag}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">{block.heading}</h2>
                <p className="text-slate-400 leading-relaxed text-sm max-w-md">{block.body}</p>
                <div className="flex items-center gap-4 pt-2">
                    <div>
                        <p className="text-4xl font-bold text-white">{block.stat}</p>
                        <p className="text-xs text-slate-600 tracking-widest uppercase mt-0.5">{block.statLabel}</p>
                    </div>
                    <div className="w-px h-12 bg-slate-800" />
                    <Link to="/projects" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                        See related work
                        <svg className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 border border-slate-800 group">
                    <img src={block.previewImg} alt={block.tag} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${block.accent}`} />
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                        <p className="text-xs text-slate-400">{block.tag}</p>
                        <p className="text-sm font-semibold text-white mt-0.5">{block.stat} {block.statLabel}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ── "Our Methodology" data — how we build AI systems, AI-tab theme (indigo/violet) ──
const methodologySteps = [
    {
        num: "01",
        title: "Deep Discovery",
        body: "We map the real problem first — data sources, edge cases, and what success looks like for the people who'll actually use the system.",
    },
    {
        num: "02",
        title: "Model & Architecture Design",
        body: "We pick the right model, pipeline, and infrastructure for the job — built to scale instead of bolted together for a demo.",
    },
    {
        num: "03",
        title: "Iterative Development",
        body: "Short build cycles with continuous testing, so the system gets sharper every sprint instead of arriving as one big risky release.",
    },
    {
        num: "04",
        title: "Deploy & Monitor",
        body: "We ship to production and keep watching — logging, retraining, and tuning so performance holds up long after launch day.",
    },
];

function MethodologySection() {
    return (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col md:flex-row gap-12 md:gap-16 items-start"
            >
                {/* Left — steps */}
                <div className="flex-1 w-full">
                    <span className="text-[10px] tracking-widest uppercase text-indigo-400 font-medium">How we build</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mt-3 mb-10">
                        Our Methodology:<br />The Precision Loop.
                    </h2>
                    <div className="space-y-8">
                        {methodologySteps.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="flex gap-4"
                            >
                                <span className="flex-shrink-0 w-10 h-10 rounded-full border border-indigo-500/40 text-indigo-400 text-xs font-semibold flex items-center justify-center tabular-nums">
                                    {step.num}
                                </span>
                                <div>
                                    <h3 className="text-white font-semibold text-base mb-1.5">{step.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed max-w-md">{step.body}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right — themed visual, square-edged to match site image. No stat overlay,
                    per request to skip the "98%" callout from the reference design. */}
                <div className="flex-1 w-full">
                    <div className="relative overflow-hidden border border-white/[0.06] h-72 md:h-[420px]">
                        <img
                            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=900&auto=format&fit=crop"
                            alt="AI development workflow"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-transparent to-violet-950/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

// ── WEBSITE CARD helper ───────────────────────────────────────────────────────
// Shows the full screenshot at its own natural aspect ratio — no cropping,
// no forced fixed-height box. The image decides its own height; the label
// sits in a caption bar underneath instead of overlaid on top of the shot.
function WebCard({ src, label, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`group cursor-pointer border border-white/[0.05] bg-[#0d0d18] overflow-hidden ${className}`}
        >
            <div className="overflow-hidden">
                <img
                    src={src} alt={label}
                    className="block w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="px-5 py-4 border-t border-white/[0.05] relative">
                <p className="text-white font-bold text-sm md:text-base tracking-wide">{label}</p>
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500"
                    animate={{ width: "0%" }} whileHover={{ width: "100%" }}
                    transition={{ duration: 0.45 }}
                />
            </div>
        </motion.div>
    );
}

// ── MODE TOGGLE — the two main creative buttons ──────────────────────────────
function ModeToggle({ mode, setMode }) {
    return (
        <div className="relative flex w-full max-w-xl mx-auto rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-sm">
            <motion.div
                className="absolute top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
                animate={{
                    left: mode === "ai" ? "6px" : "50%",
                    right: mode === "ai" ? "50%" : "6px",
                }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                style={{ backgroundImage: mode === "ai" ? undefined : "linear-gradient(to right, #0891b2, #0e7490)" }}
            />
            <button
                type="button"
                onClick={() => setMode("ai")}
                className={`relative z-10 flex-1 px-4 py-3 text-[12px] sm:text-[13px] font-semibold tracking-wide rounded-full transition-colors duration-300 ${
                    mode === "ai" ? "text-white" : "text-slate-500 hover:text-slate-300"
                }`}
            >
                AI Projects
            </button>
            <button
                type="button"
                onClick={() => setMode("build")}
                className={`relative z-10 flex-1 px-4 py-3 text-[12px] sm:text-[13px] font-semibold tracking-wide rounded-full transition-colors duration-300 ${
                    mode === "build" ? "text-white" : "text-slate-500 hover:text-slate-300"
                }`}
            >
                Websites &amp; App Development
            </button>
        </div>
    );
}

// ── SUB TABS — Mobile App / Websites / All, shown only in "build" mode ──────
function SubTabs({ subTab, setSubTab }) {
    const tabs = [
    { key: "all", label: "All" },
    { key: "app", label: "Mobile App" },
    { key: "websites", label: "Websites" },
];
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            {tabs.map(t => (
                <button
                    key={t.key}
                    type="button"
                    onClick={() => setSubTab(t.key)}
                    className={`px-5 py-2 rounded-full text-[11px] font-medium tracking-wide transition-all duration-300 border ${
                        subTab === t.key
                            ? "bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-900/30"
                            : "border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-300 bg-transparent"
                    }`}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}

// ── CONSULTATION CTA — "Ready to Build the Future?" → WhatsApp ──────────────
function ConsultationSection() {
    const whatsappHref =
        "https://wa.me/919746107792?text=" +
        encodeURIComponent("Hi Wingora Ventures, I'd like to request a consultation.");

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-indigo-950/40 via-[#0d0d18] to-violet-950/30 px-8 md:px-16 py-16 md:py-20 text-center"
            >
                {/* decorative glow blobs */}
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

                <motion.p
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-[10px] tracking-[0.3em] uppercase text-indigo-400 mb-4 relative z-10"
                >
                    Let's talk
                </motion.p>

                <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight relative z-10">
                    <ShimmerText>Ready to Build</ShimmerText>
                    <br />
                    <ShimmerText>the Future?</ShimmerText>
                </h2>

                <motion.p
                    initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-sm md:text-base mt-6 max-w-xl mx-auto leading-relaxed relative z-10"
                >
                    Tell us about your idea — we'll get back to you on WhatsApp within minutes.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 flex justify-center relative z-10"
                >
                    <motion.a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <svg className="relative z-10 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.742-.872-2.884-1.554-4.03-3.527-.305-.522.305-.485.872-1.614.097-.198.05-.371-.05-.52-.099-.149-.669-1.612-.916-2.207-.247-.594-.499-.514-.67-.524-.173-.01-.371-.012-.57-.012-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.057 3.146 4.985 4.286 2.927 1.14 2.927.76 3.85.633.917-.124 2.06-.766 2.353-1.508.297-.74.297-1.387.21-1.514-.087-.124-.337-.198-.634-.347z"/>
                            <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.84.499 3.625 1.444 5.18L2 22l4.92-1.42a9.97 9.97 0 0 0 5.084 1.42c5.52 0 10.004-4.485 10.004-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.16a8.13 8.13 0 0 1-4.144-1.144l-.297-.176-3.044.88.876-2.97-.193-.305a8.142 8.142 0 0 1-1.245-4.39c0-4.51 3.67-8.18 8.18-8.18 4.51 0 8.18 3.67 8.18 8.18s-3.67 8.18-8.18 8.18z"/>
                        </svg>
                        <span className="relative z-10">Request a Consultation</span>
                        <svg className="relative z-10 w-4 h-4 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </motion.a>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-[11px] text-slate-600 mt-6 relative z-10 tracking-wide"
                >
                    +91 97461 07792 · Usually replies within the hour
                </motion.p>
            </motion.div>
        </section>
    );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
    const [searchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState("All");
    const [mode, setMode] = useState(() => searchParams.get("mode") === "build" ? "build" : "ai");
    const [subTab, setSubTab] = useState(() => {
        const tab = searchParams.get("tab");
        return tab === "app" || tab === "websites" || tab === "all" ? tab : "all";
    });

    const filtered = activeCategory === "All"
        ? (mode === "ai" ? projectsData.filter(p => p.category !== "Mobile App") : projectsData)
        : projectsData.filter(p => p.category === activeCategory);

    // Real mobile app projects, pulled straight from projectsData — no more
    // hardcoded placeholder array. Clicking a card goes to the real detail
    // page at /projects/:id, same as every AI project.
    const appProjects = projectsData.filter(p => p.category === "Mobile App");

    const domainCount = new Set(projectsData.map(p => p.category)).size;
    const toolCount   = new Set(projectsData.flatMap(p => p.tools)).size;

    return (
        <div className="min-h-screen bg-[#07070f] text-white overflow-x-hidden">

            {/* ── STICKY TOP BAR ── */}
            <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="sticky top-0 z-50 bg-[#07070f]/80 backdrop-blur-xl border-b border-white/[0.05]"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-14">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-slate-500">Wingora Ventures</span>
                    <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Return Home
                    </Link>
                </div>
            </motion.div>

            {/* ── MODE TOGGLE (the 2 creative buttons) ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10">
                <ModeToggle mode={mode} setMode={setMode} />
            </div>

            <AnimatePresence mode="wait">
                {mode === "ai" ? (
                    <motion.div
                        key="ai-mode"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* ── PAGE HEADER (AI) ── */}
                        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-4">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div>
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                                        className="text-[10px] tracking-[0.3em] uppercase text-indigo-500 mb-3">
                                        Selected work
                                    </motion.p>
                                    <div className="overflow-hidden">
                                        <motion.h1
                                            initial={{ y: "100%" }} animate={{ y: "0%" }}
                                            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-[clamp(40px,5.5vw,80px)] font-bold leading-[0.88] tracking-tight"
                                        >
                                            <ShimmerText>AI Systems</ShimmerText>
                                        </motion.h1>
                                    </div>
                                    <div className="overflow-hidden mt-1">
                                        <motion.h1
                                            initial={{ y: "100%" }} animate={{ y: "0%" }}
                                            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-[clamp(40px,5.5vw,80px)] font-bold leading-[0.88] tracking-tight"
                                        >
                                            <ShimmerText>Built to Perform.</ShimmerText>
                                        </motion.h1>
                                    </div>
                                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                        className="text-slate-500 text-sm mt-5 max-w-sm leading-relaxed">
                                        Production-grade AI across healthcare, e-commerce, document intelligence, enterprise automation, and conversational platforms.
                                    </motion.p>
                                </div>

                                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                                    className="flex items-stretch shrink-0">
                                    {[
                                        { val: `${projectsData.length}+`, lbl: "Projects" },
                                        { val: `${domainCount}`,          lbl: "Domains" },
                                        { val: `${toolCount}+`,           lbl: "Tech stack" },
                                    ].map((s, i) => (
                                        <div key={s.lbl} className={`flex flex-col pr-8 ${i > 0 ? "pl-8 border-l border-white/[0.07]" : ""}`}>
                                            <span className="text-2xl font-bold text-white">{s.val}</span>
                                            <span className="text-[10px] text-slate-600 tracking-widest uppercase mt-1">{s.lbl}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* AI image strip */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
                                className="mt-10 flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                                {aiImages.map((img, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.55 + i * 0.07 }} whileHover={{ y: -4 }}
                                        className="relative flex-shrink-0 w-44 h-28 rounded-xl overflow-hidden border border-white/[0.07] group cursor-default">
                                        <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <span className="absolute bottom-2 left-3 text-[9px] tracking-widest uppercase text-slate-400">{img.label}</span>
                                    </motion.div>
                                ))}
                                <div className="flex-shrink-0 w-8" />
                            </motion.div>

                            {/* Category filter */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                                className="flex flex-wrap items-center gap-2 mt-8 border-t border-white/[0.05] pt-6">
                                {categories.map(cat => (
                                    <button key={cat} type="button" onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all duration-300 border ${
                                            activeCategory === cat
                                                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/30"
                                                : "border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-300 bg-transparent"
                                        }`}>
                                        {cat}
                                    </button>
                                ))}
                                <span className="ml-auto text-[10px] text-slate-700 tracking-wide">
                                    {filtered.length} / {projectsData.length}
                                </span>
                            </motion.div>
                        </div>

                        
                        
                         <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
    <AnimatePresence mode="popLayout">
        {activeCategory === "All" ? (
            <motion.div
                key="all"
                layout
                className="columns-1 sm:columns-2 md:columns-3 gap-4"
            >
                {filtered.map((project, i) => (
                    <div key={project.id} className="break-inside-avoid mb-4">
                        <Card project={project} idx={i} mode={mode} subTab={subTab} activeCategory={activeCategory} />
                    </div>
                ))}
            </motion.div>
        ) : (
            <motion.div
                key={activeCategory}
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
                {filtered.map((project, i) => (
                    <motion.div key={project.id} layout
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                        <Card project={project} idx={i} mode={mode} subTab={subTab} activeCategory={activeCategory} />
                    </motion.div>
                ))}
            </motion.div>
        )}
    </AnimatePresence>
</div>

                        {/* ── OUR METHODOLOGY (AI-tab only) ── */}
                        <MethodologySection />
                    </motion.div>
                ) : (
                    <motion.div
                        key="build-mode"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* ── PAGE HEADER (Websites & App Development) ── */}
                        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-4">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div>
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                                        className="text-[10px] tracking-[0.3em] uppercase text-cyan-500 mb-3">
                                        Built &amp; shipped
                                    </motion.p>
                                    <div className="overflow-hidden">
                                        <motion.h1
                                            initial={{ y: "100%" }} animate={{ y: "0%" }}
                                            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-[clamp(40px,5.5vw,80px)] font-bold leading-[0.88] tracking-tight"
                                        >
                                            <ShimmerTextAlt>Apps &amp; Websites</ShimmerTextAlt>
                                        </motion.h1>
                                    </div>
                                    <div className="overflow-hidden mt-1">
                                        <motion.h1
                                            initial={{ y: "100%" }} animate={{ y: "0%" }}
                                            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-[clamp(40px,5.5vw,80px)] font-bold leading-[0.88] tracking-tight"
                                        >
                                            <ShimmerTextAlt>Made to Be Used.</ShimmerTextAlt>
                                        </motion.h1>
                                    </div>
                                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                        className="text-slate-500 text-sm mt-5 max-w-sm leading-relaxed">
                                        Mobile apps, full-stack websites, and product UI — designed for real people on real screens, from idea to launch.
                                    </motion.p>
                                </div>
                            </div>

                            {/* Build image strip */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
                                className="mt-10 flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                                {buildImages.map((img, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.35 + i * 0.07 }} whileHover={{ y: -4 }}
                                        className="relative flex-shrink-0 w-44 h-28 rounded-xl overflow-hidden border border-white/[0.07] group cursor-default">
                                        <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <span className="absolute bottom-2 left-3 text-[9px] tracking-widest uppercase text-slate-400">{img.label}</span>
                                    </motion.div>
                                ))}
                                <div className="flex-shrink-0 w-8" />
                            </motion.div>

                            {/* ── SUB TABS: Mobile App / Websites / All ── */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                                className="mt-8 border-t border-white/[0.05] pt-6">
                                <SubTabs subTab={subTab} setSubTab={setSubTab} />
                            </motion.div>
                        </div>

                        {/* ── APP PROJECTS GRID — real data from projectsData, links to detail page ──
                             FIX: same masonry→grid swap as the AI grid above, for the same reason. */}
                        {(subTab === "app" || subTab === "all") && (
                            <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
                                {subTab === "all" && (
                                    <p className="text-[10px] tracking-[0.3em] uppercase text-cyan-500 mb-5">Mobile App Development</p>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
                                    {appProjects.map((project, i) => (
                                        <div key={project.id}>
                                            <Card project={project} idx={i} mode={mode} subTab={subTab} activeCategory={activeCategory} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── WEBSITES WE'VE BUILT ──
                             Kept as masonry (columns-*) on purpose: these are full, uncropped
                             screenshots of very different natural heights, and order doesn't
                             carry meaning here the way it does for the project cards above —
                             masonry's tight packing is the right tool for this one section. */}
                        {(subTab === "websites" || subTab === "all") && (
                            <section className="px-6 md:px-10 py-12 w-full">

                                <motion.p
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-sm tracking-[0.3em] uppercase text-slate-400 mb-10 font-medium"
                                >
                                    Websites We've Built
                                </motion.p>

                                {/* Full-length screenshots, natural aspect ratio, no cropping —
                                    a masonry column layout so cards of different heights still
                                    tile cleanly without leaving gaps underneath. */}
                                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                                    <div className="break-inside-avoid mb-4"><WebCard src="assets/2.png"  label="CO Architects" /></div>
                                    <div className="break-inside-avoid mb-4"><WebCard src="assets/3.png"  label="Dermashatech" /></div>
                                    <div className="break-inside-avoid mb-4"><WebCard src="assets/6.png"  label="Can Academy" /></div>
                                    <div className="break-inside-avoid mb-4"><WebCard src="assets/7.png"  label="Pure Hygiene" /></div>
                                    <div className="break-inside-avoid mb-4"><WebCard src="assets/4.png"  label="Bee Academy" /></div>
                                    <div className="break-inside-avoid mb-4"><WebCard src="assets/5.png"  label="Aamira Jewelry" /></div>
                                    <div className="break-inside-avoid mb-4"><WebCard src="assets/8.png"  label="ZAAR Interiors" /></div>
                                    <div className="break-inside-avoid mb-4"><WebCard src="assets/9.png"  label="Supreme Luxury Car Rentals" /></div>
                                    <div className="break-inside-avoid mb-4"><WebCard src="assets/10.png" label="Topmost premier hospital" /></div>
                                </div>
                            </section>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── READY TO BUILD THE FUTURE? — Consultation CTA (before footer, both tabs) ── */}
            <ConsultationSection />

            {/* ── FOOTER LINE ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 border-t border-white/[0.05]">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-widest uppercase text-slate-700">Wingora Ventures — 2026</span>
                    <span className="text-[10px] tracking-widests uppercase text-slate-700">AI Solutions Studio</span>
                </div>
            </div>
        </div>
    );
}