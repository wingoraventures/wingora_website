import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import GridField from "../components/grid-field";
import PageMeta from "../components/page-meta";
import { StatusTag } from "../sections/selected-work";
import { caseStudies, experienceProjects } from "../data/projects";

function ProjectRow({ project }) {
    return (
        <li className="border-b border-line">
            <Link
                to={`/projects/${project.id}`}
                className="group grid gap-2 py-7 md:grid-cols-[12rem_1fr_auto] md:items-baseline md:gap-10"
            >
                <span className="text-sm text-ink-soft">{project.category}</span>
                <span>
                    <span className="flex flex-wrap items-center gap-3">
                        <span className="text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-wing">
                            {project.name}
                        </span>
                        <StatusTag status={project.status} />
                    </span>
                    <span className="mt-1.5 block max-w-2xl leading-relaxed text-ink-soft">{project.summary}</span>
                </span>
                <ArrowUpRight className="hidden size-5 text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wing md:block" />
            </Link>
        </li>
    );
}

export default function ProjectsPage() {
    return (
        <>
            <PageMeta
                title="Projects"
                path="/projects"
                description="Recommendation systems, multimodal AI, virtual try-on, and AI decision-support projects by the Wingora Ventures team, each labelled with its status."
            />
            <Navbar />
            <main>
                <section className="relative -mt-16 overflow-hidden pt-16">
                    <GridField />
                    <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-16 md:px-8 md:pt-24">
                        <h1 className="max-w-3xl text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl">
                            Projects
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                            The kinds of problems our team can solve, from recommendation systems to multimodal AI.
                            Each project is labelled with its current status where it's known.
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
                    <h2 className="text-2xl font-semibold tracking-tight text-ink">Case studies</h2>
                    <ul className="mt-6 border-t border-line">
                        {caseStudies.map((p) => (
                            <ProjectRow key={p.id} project={p} />
                        ))}
                    </ul>
                </section>

                <section className="mx-auto max-w-6xl px-5 pb-28 md:px-8">
                    <h2 className="text-2xl font-semibold tracking-tight text-ink">Engineering experience</h2>
                    <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">
                        Projects from founder Ajay CK's AI engineering work. They show the team's technical background
                        and are not presented as Wingora client engagements.
                    </p>
                    <ul className="mt-6 border-t border-line">
                        {experienceProjects.map((p) => (
                            <ProjectRow key={p.id} project={p} />
                        ))}
                    </ul>
                </section>
            </main>
            <Footer />
        </>
    );
}
