import { Link } from "react-router-dom";
import SectionTitle from "../components/section-title";
import { ChannelsViz, DocViz, DotsViz, LineViz } from "../components/viz";

const services = [
    {
        title: "Business data intelligence",
        line: "Turn sales, stock, and customer data into clear decisions.",
        chips: ["Analytics", "Forecasting", "Dashboards"],
        Viz: LineViz,
        link: { to: "/projects/swakriti-recommendations", text: "Swakriti recommendation" },
    },
    {
        title: "Customer relationship systems",
        line: "Every WhatsApp, Instagram, and website enquiry in one place, answered fast.",
        chips: ["WhatsApp", "Instagram", "CRM"],
        Viz: ChannelsViz,
        link: { to: "/projects/2", text: "Odoo WhatsApp assistant" },
    },
    {
        title: "Process automation",
        line: "Invoices, reports, and repetitive tasks handled without manual typing.",
        chips: ["AI agents", "Documents", "Integrations"],
        Viz: DocViz,
        link: { to: "/projects/4", text: "Invoice processing API" },
    },
    {
        title: "Custom AI products",
        line: "Recommendation engines, assistants, and vision apps built for your workflow.",
        chips: ["RAG", "Recommendations", "Vision"],
        Viz: DotsViz,
        link: { to: "/projects/virtual-try-on-platform", text: "AI virtual try-on" },
    },
];

export default function Services() {
    return (
        <section id="services" className="border-y border-line bg-white">
            <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
                <SectionTitle
                    title="Services"
                    description="Four ways we help. Most businesses start with one."
                />
                <div className="mt-12 grid gap-5 md:grid-cols-2">
                    {services.map(({ title, line, chips, Viz, link }) => (
                        <article key={title} className="flex flex-col rounded-2xl border border-line bg-paper p-3">
                            <div className="h-52">
                                <Viz />
                            </div>
                            <div className="flex flex-1 flex-col p-4 pt-5">
                                <h3 className="text-xl font-semibold tracking-tight text-ink">{title}</h3>
                                <p className="mt-1.5 leading-relaxed text-ink-soft">{line}</p>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <ul className="flex flex-wrap gap-1.5">
                                        {chips.map((c) => (
                                            <li key={c} className="rounded-full border border-line bg-white px-2.5 py-0.5 text-sm text-ink">{c}</li>
                                        ))}
                                    </ul>
                                    <Link to={link.to} className="text-sm font-medium text-ink link-underline">
                                        {link.text}
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <p className="mt-8 text-center text-ink-soft">
                    We also build websites and apps, set up CRMs, and run digital marketing.{" "}
                    <Link to="/projects#beyond-ai" className="text-ink link-underline">See some</Link>
                </p>
            </div>
        </section>
    );
}
