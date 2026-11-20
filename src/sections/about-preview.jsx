import { Link } from "react-router-dom";
import SectionTitle from "../components/section-title";
import FaqList from "../components/faq-list";
import { principles, team } from "../data/company";
import { faqGroups } from "../data/faq";

const previewFaqs = [
    faqGroups[0].items[3],
    faqGroups[1].items[2],
    faqGroups[1].items[7],
    faqGroups[2].items[1],
    faqGroups[2].items[8],
    faqGroups[4].items[3],
];

export default function AboutPreview() {
    return (
        <>
            <section id="about" className="border-y border-line bg-white">
                <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
                    <div>
                        <SectionTitle
                            title="Why Wingora"
                            description="We don't sell AI because it's trending. We look at how your business operates, what information it generates, and where technology can create measurable value."
                        />
                        <p className="mt-8 text-[0.95rem] text-ink-soft">
                            Founded by {team[0].name}, with {team[1].name} leading marketing and business development.{" "}
                            <Link to="/about" className="text-ink link-underline">
                                About the company and team
                            </Link>
                        </p>
                    </div>
                    <dl className="border-t border-line">
                        {principles.map((p) => (
                            <div key={p.title} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                                <dt className="font-semibold text-ink">{p.title}</dt>
                                <dd className="leading-relaxed text-ink-soft">{p.text}</dd>
                            </div>
                        ))}
                    </dl>
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
