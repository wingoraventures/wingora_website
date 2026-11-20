import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { experienceProjects, findProject } from "../data/projects";

const websites = [
    { name: "CO Architects", image: "/work/co-architects.jpg" },
    { name: "Bee Academy", image: "/work/bee-academy.jpg" },
    { name: "Aamira Jewelry", image: "/work/aamira-jewelry.jpg" },
    { name: "ZAAR Interiors", image: "/work/zaar-interiors.jpg" },
    { name: "Topmost Premier Hospital", image: "/work/topmost-premier-hospital.jpg" },
    { name: "Supreme Luxury Car Rentals", image: "/work/supreme-luxury-car-rentals.jpg" },
    { name: "Dermashatech", image: "/work/dermashatech.jpg" },
    { name: "Can Academy", image: "/work/can-academy.jpg" },
    { name: "Pure Hygiene", image: "/work/pure-hygiene.jpg" },
];

export default function BeyondAI() {
    const apps = [findProject("dontry"), ...experienceProjects.filter((p) => p.category === "Mobile App")];

    return (
        <section id="beyond-ai" className="border-t border-line bg-white">
            <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink md:text-[2.75rem]">Beyond AI</h2>
                    <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                        We design and build websites and mobile apps too. Here are some we've made.
                    </p>
                </div>

                <h3 className="mt-14 text-xl font-semibold tracking-tight text-ink">Websites</h3>
                <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {websites.map((site) => (
                        <li key={site.name}>
                            <a href={site.image} target="_blank" rel="noopener noreferrer" className="group block">
                                <span className="block aspect-[16/10] overflow-hidden rounded-xl border border-line bg-paper">
                                    <img
                                        src={site.image}
                                        alt={`${site.name} website`}
                                        loading="lazy"
                                        className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                    />
                                </span>
                                <span className="mt-3 block font-medium text-ink">{site.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <h3 className="mt-20 text-xl font-semibold tracking-tight text-ink">Mobile apps</h3>
                <ul className="mt-6 border-t border-line">
                    {apps.map((app) => (
                        <li key={app.id} className="border-b border-line">
                            <Link to={`/projects/${app.id}`} className="group flex items-baseline justify-between gap-6 py-5">
                                <span>
                                    <span className="block text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-wing">
                                        {app.name}
                                    </span>
                                    <span className="mt-1 block max-w-2xl leading-relaxed text-ink-soft">{app.summary}</span>
                                </span>
                                <ArrowUpRight className="size-5 shrink-0 text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wing" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
