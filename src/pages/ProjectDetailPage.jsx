import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PageMeta from "../components/page-meta";
import { StatusTag } from "../sections/selected-work";
import { allProjects, findProject } from "../data/projects";

function Bullets({ items }) {
    return (
        <ul className="mt-4 max-w-[65ch] border-t border-line">
            {items.map((item) => (
                <li key={item} className="flex gap-4 border-b border-line py-3.5 leading-relaxed text-ink">
                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-wing" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

function Block({ title, children }) {
    return (
        <div className="mt-14 first:mt-0">
            <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
            {children}
        </div>
    );
}

// Old project URLs whose content moved into a case study.
const movedTo = {
    12: "virtual-try-on-platform",
    14: "swakriti-recommendations",
    15: "swakriti-recommendations",
    19: "dontry",
};

const prose = "mt-4 max-w-[65ch] text-[1.05rem] leading-[1.75] text-ink";

function CaseStudyBody({ project }) {
    return (
        <>
            <Block title="The problem"><p className={prose}>{project.problem}</p></Block>
            <Block title="The solution"><p className={prose}>{project.solution}</p></Block>
            {project.workflow && (
                <Block title="Intended workflow">
                    <ol className="mt-4 max-w-[65ch] border-t border-line">
                        {project.workflow.map((step, i) => (
                            <li key={step} className="flex gap-4 border-b border-line py-3.5 leading-relaxed text-ink">
                                <span className="w-5 shrink-0 tabular-nums text-ink-soft">{i + 1}</span>
                                {step}
                            </li>
                        ))}
                    </ol>
                </Block>
            )}
            {project.principles && <Block title="Product principles"><Bullets items={project.principles} /></Block>}
            {project.approach && <Block title="Technical approach"><Bullets items={project.approach} /></Block>}
            <Block title="Why it matters for a business"><p className={prose}>{project.relevance}</p></Block>
        </>
    );
}

function ExperienceBody({ project }) {
    return (
        <>
            <Block title="Overview"><p className={prose}>{project.description}</p></Block>
            <Block title="What it does"><Bullets items={project.highlights} /></Block>
        </>
    );
}

export default function ProjectDetailPage() {
    const { id } = useParams();
    const project = findProject(id);

    if (!project && movedTo[id]) return <Navigate to={`/projects/${movedTo[id]}`} replace />;

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

    const isCaseStudy = project.kind === "case-study";
    const more = allProjects.filter((p) => p.id !== project.id && p.kind === project.kind).slice(0, 3);
    const note = isCaseStudy
        ? project.note
        : "This project is from founder Ajay CK's AI engineering experience. It shows technical background and is not presented as a Wingora client engagement.";

    return (
        <>
            <PageMeta title={project.name} path={`/projects/${project.id}`} description={project.summary} />
            <Navbar />
            <main>
                <section className="relative -mt-16 overflow-hidden pt-16">
                    <div aria-hidden="true" className="absolute inset-0 grid-paper grid-fade" />
                    <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-12 md:px-8 md:pt-16">
                        <Link to="/projects" className="inline-flex items-center gap-2 text-[0.95rem] text-ink-soft hover:text-ink">
                            <ArrowLeft className="size-4" /> All projects
                        </Link>
                        <div className="mt-10 flex flex-wrap items-center gap-3">
                            <p className="text-ink-soft">{project.category}</p>
                            <StatusTag status={project.status} />
                        </div>
                        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-ink md:text-6xl">
                            {project.name}
                        </h1>
                        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-soft">{project.summary}</p>
                    </div>
                </section>

                <section className="mx-auto grid max-w-6xl gap-14 px-5 pb-24 md:px-8 lg:grid-cols-[1fr_20rem] lg:gap-20">
                    <div>
                        {note && (
                            <p className="mb-12 max-w-[65ch] rounded-xl border border-line bg-white px-5 py-4 leading-relaxed text-ink">
                                {note}
                            </p>
                        )}
                        {project.image && (
                            <img src={project.image} alt={`${project.name} screens`} className="mb-14 w-full rounded-2xl border border-line" />
                        )}
                        {isCaseStudy ? <CaseStudyBody project={project} /> : <ExperienceBody project={project} />}
                    </div>

                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <dl className="rounded-2xl border border-line bg-white p-6 text-[0.95rem]">
                            {project.status && (
                                <div className="mb-5 border-b border-line pb-5">
                                    <dt className="text-ink-soft">Status</dt>
                                    <dd className="mt-1 font-medium text-ink">{project.status}</dd>
                                </div>
                            )}
                            {project.role && (
                                <div className="mb-5 border-b border-line pb-5">
                                    <dt className="text-ink-soft">Role</dt>
                                    <dd className="mt-1 font-medium text-ink">{project.role}</dd>
                                </div>
                            )}
                            {project.tags && (
                                <div className="mb-5 border-b border-line pb-5">
                                    <dt className="text-ink-soft">Areas</dt>
                                    <dd className="mt-1 font-medium text-ink">{[project.category, ...project.tags].join(", ")}</dd>
                                </div>
                            )}
                            <div>
                                <dt className="text-ink-soft">Built with</dt>
                                <dd className="mt-3 flex flex-wrap gap-1.5">
                                    {(project.tech ?? project.tools).map((tool) => (
                                        <span key={tool} className="rounded-md bg-wing-tint px-2.5 py-1 text-sm text-ink">
                                            {tool}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        </dl>
                        <Link
                            to="/#contact"
                            className="mt-4 flex h-12 items-center justify-center rounded-lg bg-wing font-medium text-white transition-colors hover:bg-wing-deep"
                        >
                            Discuss a similar project
                        </Link>
                    </aside>
                </section>

                <section className="border-t border-line bg-white">
                    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-ink">More projects</h2>
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
                                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{p.summary}</p>
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
