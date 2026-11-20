import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "../components/section-title";
import { projectsData, projectSummaries } from "../data/projectsData";

const featuredIds = [1, 2, 4, 19];

export default function SelectedWork() {
    const featured = featuredIds.map((id) => projectsData.find((p) => p.id === id));

    return (
        <section id="work" className="relative border-y border-line bg-white">
            <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <SectionTitle
                        title="Selected work"
                        description="Systems running in clinics, sales teams, finance departments, and shopping apps."
                    />
                    <Link to="/projects" className="font-medium text-ink link-underline">
                        View all {projectsData.length} projects
                    </Link>
                </div>

                <div className="mt-14 grid border-l border-t border-line md:grid-cols-2">
                    {featured.map((p) => (
                        <Link
                            key={p.id}
                            to={`/projects/${p.id}`}
                            className="group relative flex min-h-[17rem] flex-col border-b border-r border-line p-7 transition-colors hover:bg-paper md:p-9"
                        >
                            <div className="flex items-start justify-between gap-6">
                                <p className="text-sm text-ink-soft">{p.category}</p>
                                <ArrowUpRight className="size-5 text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wing" />
                            </div>
                            <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight text-ink">{p.name}</h3>
                            <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{projectSummaries[p.id]}</p>
                            <p className="mt-auto pt-8 text-sm text-ink-soft">{p.tools.slice(0, 4).join(", ")}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
