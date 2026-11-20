import { Link } from "react-router-dom";
import SectionTitle from "../components/section-title";
import FaqList from "../components/faq-list";
import { CountUp } from "../components/viz";
import { principles, team } from "../data/company";
import { faqGroups } from "../data/faq";

const previewFaqs = [
    faqGroups[0].items[3],
    faqGroups[1].items[2],
    faqGroups[2].items[1],
    faqGroups[4].items[3],
];

// Founder experience from the company knowledge base; projects counts case studies plus experience projects.
const stats = [
    { value: 4, suffix: "+", label: "years in AI engineering" },
    { value: 10, suffix: "+", label: "chatbot implementations" },
    { value: 20, suffix: "+", label: "AI projects built" },
    { value: 102, prefix: "AI-", label: "Microsoft Azure AI Engineer certified" },
];

export default function AboutPreview() {
    return (
        <>
            <section id="about" className="border-y border-line bg-white">
                <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
                    <SectionTitle
                        title="Why Wingora"
                        description="We understand your business first, then choose the technology."
                    />

                    <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
                        {stats.map((s) => (
                            <div key={s.label} className="bg-paper p-5 md:p-7">
                                <dt className="sr-only">{s.label}</dt>
                                <dd className="text-4xl font-semibold tracking-tight text-wing md:text-5xl">
                                    {s.prefix}
                                    <CountUp to={s.value} suffix={s.suffix} />
                                </dd>
                                <p aria-hidden="true" className="mt-2 text-[0.95rem] leading-snug text-ink-soft">{s.label}</p>
                            </div>
                        ))}
                    </dl>
                    <p className="mt-3 text-sm text-ink-soft">Founder Ajay CK's experience. AI-102 is his personal certification.</p>

                    <ul className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                        {principles.slice(0, 3).map((p) => (
                            <li key={p.title} className="border-t border-line pt-5">
                                <p className="font-semibold text-ink">{p.title}</p>
                                <p className="mt-1 leading-relaxed text-ink-soft">{p.text}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-10 text-ink-soft">
                        Founded by {team[0].name}, with {team[1].name} leading sales and marketing.{" "}
                        <Link to="/about" className="text-ink link-underline">Meet the team</Link>
                    </p>
                </div>
            </section>

            <section id="faq" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
                    <div>
                        <SectionTitle title="Common questions" />
                        <Link to="/faq" className="mt-6 inline-block font-medium text-ink link-underline">
                            Read all questions
                        </Link>
                    </div>
                    <FaqList items={previewFaqs} />
                </div>
            </section>
        </>
    );
}
