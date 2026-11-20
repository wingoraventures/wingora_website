import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { projectsData, projectSummaries } from "../data/projectsData";

export default function ProjectDetailPage() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const project = projectsData.find((p) => p.id === Number(id));
    const backTo = searchParams.get("category") ? `/projects?category=${encodeURIComponent(searchParams.get("category"))}` : "/projects";

    if (!project) {
        return (
            <>
                <Navbar />
                <main className="mx-auto max-w-6xl px-5 py-32 md:px-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-ink">This project doesn't exist</h1>
                    <p className="mt-3 text-ink-soft">The link may be out of date.</p>
                    <Link to="/projects" className="mt-6 inline-block font-medium text-ink link-underline">
                        Browse all projects
                    </Link>
                </main>
                <Footer />
            </>
        );
    }

    const others = projectsData.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);
    const more = others.length ? others : projectsData.filter((p) => p.id !== project.id).slice(0, 3);

    return (
        <>
            <Navbar />
            <main>
                <section className="relative -mt-16 overflow-hidden pt-16">
                    <div aria-hidden="true" className="absolute inset-0 grid-paper grid-fade" />
                    <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-12 md:px-8 md:pt-16">
                        <Link to={backTo} className="inline-flex items-center gap-2 text-[0.95rem] text-ink-soft hover:text-ink">
                            <ArrowLeft className="size-4" /> All projects
                        </Link>
                        <p className="mt-10 text-ink-soft">{project.category}</p>
                        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-ink md:text-6xl">
                            {project.name}
                        </h1>
                        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-soft">{projectSummaries[project.id]}</p>
                    </div>
                </section>

                <section className="mx-auto grid max-w-6xl gap-14 px-5 pb-24 md:px-8 lg:grid-cols-[1fr_20rem] lg:gap-20">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-ink">Overview</h2>
                        <p className="mt-4 max-w-[65ch] text-[1.05rem] leading-[1.75] text-ink">{project.description}</p>

                        <h2 className="mt-14 text-xl font-semibold tracking-tight text-ink">What it does</h2>
                        <ul className="mt-4 max-w-[65ch] border-t border-line">
                            {project.highlights.map((h) => (
                                <li key={h} className="flex gap-4 border-b border-line py-4 leading-relaxed text-ink">
                                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-wing" />
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <dl className="rounded-2xl border border-line bg-white p-6 text-[0.95rem]">
                            <div>
                                <dt className="text-ink-soft">Our role</dt>
                                <dd className="mt-1 font-medium text-ink">{project.role}</dd>
                            </div>
                            <div className="mt-5 border-t border-line pt-5">
                                <dt className="text-ink-soft">Year</dt>
                                <dd className="mt-1 font-medium text-ink">{project.year}</dd>
                            </div>
                            {project.url && (
                                <div className="mt-5 border-t border-line pt-5">
                                    <dt className="text-ink-soft">Live site</dt>
                                    <dd className="mt-1">
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink link-underline break-all">
                                            {project.url.replace(/^https?:\/\//, "")}
                                        </a>
                                    </dd>
                                </div>
                            )}
                            <div className="mt-5 border-t border-line pt-5">
                                <dt className="text-ink-soft">Built with</dt>
                                <dd className="mt-3 flex flex-wrap gap-1.5">
                                    {project.tools.map((tool) => (
                                        <span key={tool} className="rounded-md bg-wing-tint px-2.5 py-1 text-sm text-ink">
                                            {tool}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        </dl>
                        <a
                            href="/#contact"
                            className="mt-4 flex h-12 items-center justify-center rounded-lg bg-wing font-medium text-white transition-colors hover:bg-wing-deep"
                        >
                            Discuss a similar project
                        </a>
                    </aside>
                </section>

                <section className="border-t border-line bg-white">
                    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-ink">More {others.length ? project.category.toLowerCase() : ""} projects</h2>
                        <div className="mt-8 grid border-l border-t border-line md:grid-cols-3">
                            {more.map((p) => (
                                <Link
                                    key={p.id}
                                    to={`/projects/${p.id}`}
                                    className="group flex min-h-48 flex-col border-b border-r border-line p-6 transition-colors hover:bg-paper"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <p className="text-sm text-ink-soft">{p.category}</p>
                                        <ArrowUpRight className="size-5 text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wing" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-ink">{p.name}</h3>
                                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{projectSummaries[p.id]}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
