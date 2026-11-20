import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PageMeta, { SITE } from "../components/page-meta";
import { principles, team } from "../data/company";

const directions = [
    { title: "Industry-specific business intelligence", text: "Reusable intelligence systems for retail, restaurants, manufacturing, and distribution." },
    { title: "Customer intelligence platforms", text: "Systems that bring together conversations, purchase history, preferences, and engagement across channels." },
    { title: "AI business agents", text: "Agents that work with business information on defined tasks, with appropriate human oversight." },
    { title: "Connected business systems", text: "Integrations that link your existing tools, databases, customer channels, analytics, and automation." },
    { title: "Personalised customer experiences", text: "More relevant recommendations, interactions, and follow-ups based on business and customer data." },
];

const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ajay CK",
    jobTitle: "Founder and AI Engineering Lead",
    worksFor: { "@type": "Organization", name: "Wingora Ventures", url: SITE },
    hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
    },
    knowsAbout: team[0].skills,
};

export default function AboutPage() {
    return (
        <>
            <PageMeta
                title="About"
                path="/about"
                description="Wingora Ventures is a business-focused AI and technology company that helps organisations use their data to make better decisions, improve operations, and build stronger customer relationships."
                jsonLd={personLd}
            />
            <Navbar />
            <main>
                <section className="relative -mt-16 overflow-hidden pt-16">
                    <div aria-hidden="true" className="absolute inset-0 grid-paper grid-fade" />
                    <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pt-24">
                        <h1 className="max-w-4xl text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl">
                            We help businesses grow according to what their data tells us.
                        </h1>
                        <div className="mt-8 grid max-w-4xl gap-6 text-lg leading-relaxed text-ink-soft md:grid-cols-2">
                            <p>
                                Wingora Ventures is a business-focused AI and technology company. Businesses generate
                                valuable information every day through sales, customer interactions, inventory,
                                marketing, and operations, but much of it goes unused or stays disconnected.
                            </p>
                            <p>
                                We combine business intelligence, data analytics, AI engineering, customer engagement
                                systems, and workflow automation to turn that information into decisions and
                                practical technology.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="border-y border-line bg-white">
                    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-3">
                        {[
                            ["Understand the business first", "How it operates, what information it generates, and where its challenges are."],
                            ["Use data to find opportunities", "Decisions based on real business information, not assumptions."],
                            ["Apply technology where it matters", "Practical improvements, not technology for its own sake."],
                        ].map(([title, text]) => (
                            <div key={title}>
                                <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
                                <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-5 py-24 md:px-8">
                    <h2 className="text-3xl font-semibold tracking-[-0.025em] text-ink md:text-[2.75rem]">Team</h2>
                    <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-[1.4fr_1fr]">
                        <article className="bg-white p-7 md:p-10 lg:row-span-2">
                            <h3 className="text-2xl font-semibold tracking-tight text-ink">{team[0].name}</h3>
                            <p className="mt-1 text-ink-soft">{team[0].role}</p>
                            <p className="mt-5 leading-relaxed text-ink">{team[0].bio}</p>
                            <p className="mt-5 leading-relaxed text-ink-soft">
                                His approach is to understand the business problem before deciding which technology to use.
                            </p>
                            <ul className="mt-6 flex flex-wrap gap-1.5">
                                {team[0].skills.map((s) => (
                                    <li key={s} className="rounded-md bg-wing-tint px-2.5 py-1 text-sm text-ink">{s}</li>
                                ))}
                            </ul>
                        </article>
                        {team.slice(1).map((person) => (
                            <article key={person.name} className="bg-white p-7 md:p-10">
                                <h3 className="text-xl font-semibold tracking-tight text-ink">{person.name}</h3>
                                <p className="mt-1 text-ink-soft">{person.role}</p>
                                <p className="mt-4 leading-relaxed text-ink">{person.bio}</p>
                            </article>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-ink-soft">The AI-102 certification is Ajay's personal professional qualification.</p>
                </section>

                <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 md:px-8 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-ink">How we work</h2>
                        <dl className="mt-6 border-t border-line">
                            {principles.map((p) => (
                                <div key={p.title} className="border-b border-line py-5">
                                    <dt className="font-semibold text-ink">{p.title}</dt>
                                    <dd className="mt-1 leading-relaxed text-ink-soft">{p.text}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-ink">Where we're heading</h2>
                        <p className="mt-2 text-ink-soft">
                            Our long-term direction. These are goals we're working toward, not products available today.
                        </p>
                        <dl className="mt-6 border-t border-line">
                            {directions.map((d) => (
                                <div key={d.title} className="border-b border-line py-5">
                                    <dt className="font-semibold text-ink">{d.title}</dt>
                                    <dd className="mt-1 leading-relaxed text-ink-soft">{d.text}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                <section className="border-t border-line bg-white">
                    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-16 md:px-8">
                        <p className="text-2xl font-semibold tracking-tight text-ink">Your business has the data. We help you grow with it.</p>
                        <Link to="/#contact" className="inline-flex h-12 items-center rounded-lg bg-wing px-6 font-medium text-white transition-colors hover:bg-wing-deep">
                            Book a consultation
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
