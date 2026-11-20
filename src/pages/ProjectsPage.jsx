import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import GridField from "../components/grid-field";
import { projectsData, projectSummaries } from "../data/projectsData";

const categories = ["All", ...Array.from(new Set(projectsData.map((p) => p.category)))];

// Older links used ?mode=build&tab=app for the mobile apps view.
function readCategory(params) {
    const category = params.get("category");
    if (category && categories.includes(category)) return category;
    if (params.get("tab") === "app") return "Mobile App";
    return "All";
}

export default function ProjectsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const active = readCategory(searchParams);

    const projects = useMemo(
        () => (active === "All" ? projectsData : projectsData.filter((p) => p.category === active)),
        [active]
    );

    const select = (category) => {
        setSearchParams(category === "All" ? {} : { category }, { replace: true });
    };

    return (
        <>
            <Navbar />
            <main>
                <section className="relative -mt-16 overflow-hidden pt-16">
                    <GridField />
                    <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-16 md:px-8 md:pt-24">
                        <h1 className="max-w-3xl text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl">
                            Projects
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                            {projectsData.length} systems we've designed and shipped, from clinical voice agents to
                            invoice processing and mobile try-on apps.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => select(category)}
                                    aria-pressed={active === category}
                                    className={`h-9 rounded-full border px-4 text-[0.9rem] transition-colors ${
                                        active === category
                                            ? "border-ink bg-ink text-paper"
                                            : "border-line bg-white text-ink-soft hover:border-ink/30 hover:text-ink"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-5 pb-28 md:px-8">
                    <ul className="border-t border-line">
                        {projects.map((p) => (
                            <li key={p.id} className="border-b border-line">
                                <Link
                                    to={`/projects/${p.id}${active === "All" ? "" : `?category=${encodeURIComponent(active)}`}`}
                                    className="group grid gap-2 py-7 md:grid-cols-[12rem_1fr_auto] md:items-baseline md:gap-10"
                                >
                                    <span className="text-sm text-ink-soft">{p.category}</span>
                                    <span>
                                        <span className="block text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-wing">
                                            {p.name}
                                        </span>
                                        <span className="mt-1.5 block max-w-2xl leading-relaxed text-ink-soft">
                                            {projectSummaries[p.id]}
                                        </span>
                                    </span>
                                    <ArrowUpRight className="hidden size-5 text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wing md:block" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            <Footer />
        </>
    );
}
