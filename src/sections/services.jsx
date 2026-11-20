import { Link } from "react-router-dom";
import SectionTitle from "../components/section-title";

const services = [
    {
        title: "Chatbots and voice agents",
        description:
            "Assistants on WhatsApp, your website, or the phone that answer questions from your own documents, book appointments, and hand off to a person when they should.",
        work: [
            { id: 2, name: "Odoo WhatsApp assistant" },
            { id: 1, name: "Clinical voice scribe" },
            { id: 10, name: "Trainable website chatbot" },
        ],
    },
    {
        title: "Workflow automation",
        description:
            "Software that reads invoices, files tickets, schedules meetings, and moves data between the tools you already use, so your team stops copying and pasting.",
        work: [
            { id: 4, name: "Invoice extraction API" },
            { id: 6, name: "Task automation API" },
            { id: 7, name: "Database query bot" },
        ],
    },
    {
        title: "Websites and mobile apps",
        description:
            "Fast, well-built websites and iOS and Android apps, with AI features built in where they help your customers rather than as an afterthought.",
        work: [
            { id: 17, name: "AcuCogn Scribe for iOS" },
            { id: 19, name: "Dontry try-on for Android" },
            { id: 16, name: "StockIQ analysis platform" },
        ],
    },
    {
        title: "Digital marketing",
        description:
            "Search, social, and paid campaigns that send people to the systems above, with reporting tied to enquiries and sales instead of impressions.",
        work: [],
    },
];

export default function Services() {
    return (
        <section id="services" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <SectionTitle
                        title="What we build"
                        description="Four kinds of work, one team. Most clients start with a single problem and add the rest once the first system pays for itself."
                    />
                </div>

                <ul className="border-t border-line">
                    {services.map((service) => (
                        <li key={service.title} className="grid gap-4 border-b border-line py-9 md:grid-cols-[1fr_14rem] md:gap-10">
                            <div>
                                <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">{service.title}</h3>
                                <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{service.description}</p>
                            </div>
                            {service.work.length > 0 && (
                                <div className="text-[0.95rem]">
                                    <p className="text-ink-soft">Recent work</p>
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
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
