import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "../components/section-title";
import { findProject } from "../data/projects";

const featuredIds = ["swakriti-recommendations", "special-education-platform", "virtual-try-on-platform", "thomso-event-vibe-check"];

export function StatusTag({ status }) {
    if (!status) return null;
    return (
        <span className="inline-flex items-center rounded-full border border-line bg-paper px-2.5 py-0.5 text-sm text-ink-soft">
            {status}
        </span>
    );
}

export default function SelectedWork() {
    const featured = featuredIds.map(findProject);

    return (
        <section id="work" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionTitle
                    title="Projects"
                    description="Recommendation systems, multimodal AI, and decision-support tools our team has designed and built. Each one is labelled with its current status."
                />
                <Link to="/projects" className="font-medium text-ink link-underline">
                    View all projects
                </Link>
            </div>

            <div className="mt-14 grid border-l border-t border-line bg-white md:grid-cols-2">
                {featured.map((p) => (
                    <Link
                        key={p.id}
                        to={`/projects/${p.id}`}
                        className="group relative flex min-h-[17rem] flex-col border-b border-r border-line p-7 transition-colors hover:bg-paper md:p-9"
                    >
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <p className="text-sm text-ink-soft">{p.category}</p>
                                <StatusTag status={p.status} />
                            </div>
                            <ArrowUpRight className="size-5 shrink-0 text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wing" />
                        </div>
                        <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight text-ink">{p.name}</h3>
                        <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{p.summary}</p>
                        <p className="mt-auto pt-8 text-sm text-ink-soft">{p.tech.join(", ")}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
