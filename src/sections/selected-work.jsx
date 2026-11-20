import { Link } from "react-router-dom";
import { ArrowUpRight, AudioWaveform, BarChart3, GraduationCap } from "lucide-react";
import SectionTitle from "../components/section-title";
import { findProject } from "../data/projects";

// Each featured project gets a cover: its real screenshot if we have one, otherwise a drawn icon.
const featured = [
    { id: "swakriti-recommendations", icon: BarChart3 },
    { id: "dontry" },
    { id: "special-education-platform", icon: GraduationCap },
    { id: "thomso-event-vibe-check", icon: AudioWaveform },
];

function Cover({ project, icon: Icon }) {
    if (project.image) {
        return <img src={project.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />;
    }
    return (
        <span className="grid-paper flex size-full items-center justify-center bg-wing-tint/40 [--cell:22px]">
            <span className="flex size-20 items-center justify-center rounded-2xl bg-white text-wing shadow-[0_12px_30px_-14px_rgb(31_79_214/0.45)] transition-transform duration-500 group-hover:-translate-y-1">
                <Icon className="size-9" strokeWidth={1.5} />
            </span>
        </span>
    );
}

export function StatusTag({ status }) {
    if (!status) return null;
    return (
        <span className="inline-flex items-center rounded-full border border-line bg-paper px-2.5 py-0.5 text-sm text-ink-soft">
            {status}
        </span>
    );
}

export default function SelectedWork() {

    return (
        <section id="work" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionTitle
                    title="Projects"
                    description="A few things we've designed and built."
                />
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <Link to="/projects" className="font-medium text-ink link-underline">
                        View all projects
                    </Link>
                    <Link to="/projects#beyond-ai" className="font-medium text-ink link-underline">
                        Websites and apps we've built
                    </Link>
                </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
                {featured.map(({ id, icon }) => {
                    const p = findProject(id);
                    return (
                        <Link key={id} to={`/projects/${id}`} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
                            <span className="block h-52 overflow-hidden border-b border-line sm:h-60">
                                <Cover project={p} icon={icon} />
                            </span>
                            <span className="flex flex-1 flex-col p-6">
                                <span className="flex items-start justify-between gap-4">
                                    <span className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm text-ink-soft">{p.category}</span>
                                        <StatusTag status={p.status} />
                                    </span>
                                    <ArrowUpRight className="size-5 shrink-0 text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wing" />
                                </span>
                                <span className="mt-3 block text-xl font-semibold leading-tight tracking-tight text-ink">{p.name}</span>
                                <span className="mt-2 block line-clamp-2 leading-relaxed text-ink-soft">{p.summary}</span>
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
