import { Link } from "react-router-dom";
import SectionTitle from "../components/section-title";

const services = [
    {
        title: "Business data intelligence",
        description:
            "Turn your existing operational and customer data into useful business intelligence.",
        items: [
            "Business and sales analytics",
            "Customer behaviour analysis and segmentation",
            "Revenue and performance monitoring",
            "Demand forecasting and inventory analytics",
            "Predictive analytics",
            "Dashboards, data integration, and automated reporting",
        ],
        work: [{ id: "swakriti-recommendations", name: "Swakriti product recommendation" }],
    },
    {
        title: "AI-powered customer relationship systems",
        description: "Communication systems that help you manage and improve every customer interaction.",
        items: [
            "WhatsApp, Instagram, and Facebook automation",
            "AI customer support and website assistants",
            "CRM integration and lead management",
            "Customer follow-up automation",
            "Sales team communication workflows",
            "Conversation analysis and personalised engagement",
        ],
        work: [{ id: "2", name: "Odoo WhatsApp assistant" }],
    },
    {
        title: "Business process and AI automation",
        description: "Find the repetitive work in your business and build systems that take it off your team's hands.",
        items: [
            "AI agents and internal business assistants",
            "Workflow automation",
            "Document processing and data extraction",
            "Automated reporting",
            "API, CRM, and ERP integrations",
            "Custom business workflows",
        ],
        work: [
            { id: "4", name: "Invoice processing API" },
            { id: "6", name: "Task automation API" },
        ],
    },
    {
        title: "Custom AI product development",
        description: "AI applications built around your specific business and operational requirements.",
        items: [
            "RAG and knowledge-based AI assistants",
            "Recommendation systems",
            "Computer vision, speech, and audio AI",
            "Multimodal AI and intelligent assessment systems",
            "Custom AI APIs",
            "AI-powered web and mobile applications",
        ],
        work: [
            { id: "virtual-try-on-platform", name: "AI virtual try-on platform" },
            { id: "thomso-event-vibe-check", name: "Thomso event vibe check" },
            { id: "special-education-platform", name: "Special education platform" },
        ],
    },
];

export default function Services() {
    return (
        <section id="services" className="border-y border-line bg-white">
            <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <SectionTitle
                            title="Services"
                            description="Four service areas. Most businesses start with one problem and add more once the first system proves its value."
                        />
                        <p className="mt-8 text-[0.95rem] leading-relaxed text-ink-soft">
                            We also build websites and apps, implement CRMs, and run digital marketing, SEO, and
                            marketing analytics in support of this work.
                        </p>
                    </div>

                    <ul className="border-t border-line">
                        {services.map((service) => (
                            <li key={service.title} className="grid gap-6 border-b border-line py-9 md:grid-cols-[1fr_13rem] md:gap-10">
                                <div>
                                    <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">{service.title}</h3>
                                    <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{service.description}</p>
                                    <ul className="mt-5 grid gap-y-2 text-[0.95rem] text-ink">
                                        {service.items.map((item) => (
                                            <li key={item} className="flex gap-3">
                                                <span aria-hidden="true" className="mt-[0.65em] size-1 shrink-0 rounded-full bg-ink-soft" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-[0.95rem]">
                                    <p className="text-ink-soft">Related projects</p>
                                    <ul className="mt-2 space-y-1.5">
                                        {service.work.map((w) => (
                                            <li key={w.id}>
                                                <Link to={`/projects/${w.id}`} className="text-ink link-underline">
                                                    {w.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
