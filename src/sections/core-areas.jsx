import SectionTitle from "../components/section-title";
import { BarsViz, ChatViz } from "../components/viz";

const areas = [
    {
        title: "Data intelligence and business growth",
        line: "See what's selling, what's running low, and which customers are slipping away.",
        chips: ["Sales analytics", "Demand forecasting", "Dashboards", "Automated reports"],
        Viz: BarsViz,
    },
    {
        title: "Intelligent customer relationships",
        line: "Reply on WhatsApp and Instagram instantly, qualify leads, and hand them to sales with context.",
        chips: ["WhatsApp automation", "Lead qualification", "CRM integration", "Follow-ups"],
        Viz: ChatViz,
    },
];

export default function CoreAreas() {
    return (
        <section id="what-we-do" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <SectionTitle
                title="Two things we help businesses do"
                description="Understand your data. Strengthen your customer relationships."
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
                {areas.map(({ title, line, chips, Viz }) => (
                    <article key={title} className="flex flex-col rounded-2xl border border-line bg-white p-3">
                        <div className="h-64 sm:h-72">
                            <Viz />
                        </div>
                        <div className="p-4 pt-6 md:p-6">
                            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-ink">{title}</h3>
                            <p className="mt-2 leading-relaxed text-ink-soft">{line}</p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {chips.map((c) => (
                                    <li key={c} className="rounded-full bg-wing-tint px-3 py-1 text-sm text-ink">{c}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
