import { useParams, Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projectsData } from "../data/projectsData.jsx";

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
    const [current, setCurrent] = useState(startIndex);
    const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
    const next = () => setCurrent(i => (i + 1) % images.length);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="relative max-w-5xl w-full px-4" onClick={e => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current}
                        src={images[current]}
                        alt=""
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                        className="w-full max-h-[80vh] object-contain rounded-xl"
                    />
                </AnimatePresence>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-800 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-800 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </button>
                <button onClick={onClose} className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
                <p className="text-center text-xs text-slate-500 mt-4">{current + 1} / {images.length}</p>
            </div>
        </motion.div>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const project = projectsData.find(p => p.id === Number(id));
    const incoming = searchParams.toString();
    const backTo = incoming ? `/projects?${incoming}` : (project?.category === "Mobile App" ? "/projects?mode=build&tab=app" : "/projects");
    const [lightboxIndex, setLightboxIndex] = useState(null);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#080810] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-500 mb-4">Project not found.</p>
                    <Link to="/projects" className="text-indigo-400 text-sm hover:underline">← All Projects</Link>
                </div>
            </div>
        );
    }

    const allImages = [project.image, ...(project.gallery || [])];
    const others = projectsData.filter(p => p.id !== project.id).slice(0, 3);

    return (
        <div className="min-h-screen bg-[#080810] text-white">

            {/* ── TOP NAV ── */}
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-[#080810]/80 backdrop-blur-md border-b border-slate-900/80">
                <Link to={backTo}>
                    <motion.div whileHover={{ x: -3 }} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        <span className="hidden sm:inline">All Projects</span>
                    </motion.div>
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] tracking-widest uppercase text-slate-600">{project.category}</span>
                    <span className="w-px h-3 bg-slate-800" />
                    <span className="text-[10px] tracking-widest uppercase text-slate-600">{project.year}</span>
                </div>
            </div>

            {/* ── PAGE HEADER ── */}
            <section className="pt-28 pb-10 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="text-[10px] tracking-widest uppercase text-indigo-400 bg-indigo-600/10 border border-indigo-800/40 px-3 py-1.5 rounded-full">
                            {project.role}
                        </span>
                        <span className="text-[10px] tracking-widest uppercase text-slate-600 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-full">
                            {project.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                        {project.name}
                    </h1>
                </motion.div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="px-6 md:px-16 lg:px-24 xl:px-32 pb-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14 xl:gap-20">

                    {/* LEFT */}
                    <div className="space-y-12">
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <p className="text-[10px] tracking-widest uppercase text-indigo-500 mb-4 font-medium">Overview</p>
                            <p className="text-slate-300 leading-[1.9] text-base">{project.description}</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                            <p className="text-[10px] tracking-widest uppercase text-indigo-500 mb-6 font-medium">Key Features</p>
                            <div className="divide-y divide-slate-900">
                                {project.highlights.map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 + i * 0.07 }}
                                        className="flex items-start gap-4 py-4 group"
                                    >
                                        <span className="text-xs text-slate-700 font-mono mt-0.5 flex-shrink-0 group-hover:text-indigo-600 transition-colors">
                                            {(i + 1).toString().padStart(2, "0")}
                                        </span>
                                        <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{h}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <motion.aside
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-5">
                            <p className="text-[10px] tracking-widest uppercase text-slate-600 mb-2">Role</p>
                            <p className="text-sm text-white font-medium">{project.role}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-5">
                                <p className="text-[10px] tracking-widest uppercase text-slate-600 mb-2">Domain</p>
                                <p className="text-sm text-white">{project.category}</p>
                            </div>
                            <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-5">
                                <p className="text-[10px] tracking-widest uppercase text-slate-600 mb-2">Year</p>
                                <p className="text-sm text-white">{project.year}</p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-5">
                            <p className="text-[10px] tracking-widest uppercase text-slate-600 mb-3">Live URL</p>
                            {project.url ? (
                                <a href={project.url} target="_blank" rel="noopener noreferrer"
                                    className="group flex items-center gap-2.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-indigo-600/15 border border-indigo-800/40 flex items-center justify-center">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                        </svg>
                                    </span>
                                    <span className="truncate group-hover:underline underline-offset-2">{project.url.replace(/^https?:\/\//, "")}</span>
                                </a>
                            ) : (
                                <p className="text-sm text-slate-600 italic">Not deployed publicly</p>
                            )}
                        </div>

                        <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-5">
                            <p className="text-[10px] tracking-widest uppercase text-slate-600 mb-4">Tech Stack</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map(tool => (
                                    <span key={tool} className="text-[11px] px-2.5 py-1.5 rounded-lg bg-[#0d0d1a] border border-slate-800 text-slate-400 hover:border-indigo-900 hover:text-indigo-300 transition-colors duration-200 cursor-default">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Link to={backTo}
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-sm transition-all duration-300">
                            ← Back to all projects
                        </Link>
                    </motion.aside>
                </div>
            </section>

            {/* ── IMAGE GALLERY ── */}
            <section className="px-6 md:px-16 lg:px-24 xl:px-32 pb-16 max-w-7xl mx-auto">
                <div className="border-t border-slate-900 pt-12">
                    <p className="text-[10px] tracking-widest uppercase text-slate-600 mb-8">Gallery</p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-3 rounded-2xl overflow-hidden border border-slate-800/60 cursor-zoom-in"
                        onClick={() => setLightboxIndex(0)}
                    >
                        <div className="relative h-64 md:h-96 group">
                            <img src={allImages[0]} alt={project.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {allImages.length > 1 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {allImages.slice(1).map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 }}
                                    className="rounded-xl overflow-hidden border border-slate-800/60 cursor-zoom-in group"
                                    onClick={() => setLightboxIndex(i + 1)}
                                >
                                    <div className="relative h-36 md:h-48">
                                        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#080810]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── MORE PROJECTS ── */}
            {others.length > 0 && (
                <section className="px-6 md:px-16 lg:px-24 xl:px-32 pb-24 max-w-7xl mx-auto">
                    <div className="border-t border-slate-900 pt-12">
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-[10px] tracking-widest uppercase text-slate-600">More Projects</p>
                            <Link to={backTo} className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">View all →</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {others.map((p, i) => (
                                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                                    <Link to={`/projects/${p.id}${incoming ? `?${incoming}` : ""}`}>
                                        <div className="group relative h-44 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300">
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/50 to-transparent" />
                                            <motion.div className="absolute bottom-0 left-0 h-[2px] bg-indigo-600 w-0 group-hover:w-full transition-all duration-500" />
                                            <div className="absolute bottom-0 p-4">
                                                <p className="text-[10px] text-indigo-500 tracking-widest uppercase mb-1">{p.category}</p>
                                                <h3 className="text-xs font-semibold text-white leading-snug">{p.name}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── LIGHTBOX ── */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox images={allImages} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}