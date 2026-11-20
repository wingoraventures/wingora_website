import SectionTitle from "../components/section-title";
import AgentTrace from "../components/agent-trace";
import { customerRuns, dataRuns } from "../data/exampleRuns";

const areas = [
    {
        title: "Data intelligence and business growth",
        intro:
            "Sales, purchases, inventory, customer interactions, website visits, and marketing campaigns all contain useful information. We help you understand it and act on it, not just produce reports.",
        capabilities: [
            "Sales and revenue analytics",
            "Customer behaviour analysis and segmentation",
            "Demand forecasting and inventory intelligence",
            "Business intelligence dashboards",
            "Data integration from multiple sources",
            "Automated reporting",
        ],
        outcomes: "Better visibility into performance, better stock planning, less manual reporting, and decisions based on real numbers.",
        panel: { title: "Example: asking your business data", runs: dataRuns },
    },
    {
        title: "Intelligent customer relationships",
        intro:
            "Customers reach you on WhatsApp, Instagram, Facebook, your website, email, and through your sales team, and those conversations usually sit in separate places. We connect them into one system that understands context.",
        capabilities: [
            "WhatsApp, Instagram, and Messenger automation",
            "AI website assistants",
            "Lead qualification and automated follow-ups",
            "CRM integration and interaction history",
            "Handover to your sales team with full context",
            "Insights from recurring questions and objections",
        ],
        outcomes: "Faster, more relevant replies, fewer missed leads, and a clear picture of what customers keep asking for.",
        panel: { title: "Example: a customer conversation", runs: customerRuns },
    },
];

export default function CoreAreas() {
    return (
        <section id="what-we-do" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <SectionTitle
                title="Two things we help businesses do"
                description="We start by understanding how your business runs and what information it already generates. Then we use technology where it creates measurable value."
            />

            <div className="mt-16 space-y-20 md:space-y-28">
                {areas.map((area, i) => (
                    <article key={area.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        <div className={i % 2 ? "lg:order-2" : ""}>
                            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">{area.title}</h3>
                            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{area.intro}</p>
                            <ul className="mt-6 grid gap-y-2.5 sm:grid-cols-2 sm:gap-x-6">
                                {area.capabilities.map((c) => (
                                    <li key={c} className="flex gap-3 text-[0.95rem] text-ink">
                                        <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-wing" />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-7 max-w-xl border-t border-line pt-5 leading-relaxed text-ink">{area.outcomes}</p>
                        </div>
                        <div className={i % 2 ? "lg:order-1" : ""}>
                            <AgentTrace title={area.panel.title} runs={area.panel.runs} />
                            <p className="mt-3 text-sm text-ink-soft">Illustrative example, not a client deployment.</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
