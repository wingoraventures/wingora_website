import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FaqList from "../components/faq-list";
import PageMeta from "../components/page-meta";
import { allFaqs, faqGroups } from "../data/faq";

const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
};

export default function FaqPage() {
    return (
        <>
            <PageMeta
                title="Frequently asked questions"
                path="/faq"
                description="Answers about Wingora Ventures: business data intelligence, WhatsApp and Instagram automation, CRM integration, AI agents, RAG assistants, and how projects start."
                jsonLd={faqLd}
            />
            <Navbar />
            <main>
                <section className="relative -mt-16 overflow-hidden pt-16">
                    <div aria-hidden="true" className="absolute inset-0 grid-paper grid-fade" />
                    <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-16 md:px-8 md:pt-24">
                        <h1 className="text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl">
                            Frequently asked questions
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                            What we do, how our systems work, and how to get started. Can't find your question?{" "}
                            <Link to="/#contact" className="text-ink link-underline">Ask us directly</Link>.
                        </p>
                        <nav aria-label="FAQ topics" className="mt-8 flex flex-wrap gap-2">
                            {faqGroups.map((g) => (
                                <a
                                    key={g.id}
                                    href={`#${g.id}`}
                                    className="h-9 rounded-full border border-line bg-white px-4 text-[0.9rem] leading-9 text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
                                >
                                    {g.title}
                                </a>
                            ))}
                        </nav>
                    </div>
                </section>

                <div className="mx-auto max-w-6xl space-y-20 px-5 pb-28 md:px-8">
                    {faqGroups.map((group) => (
                        <section key={group.id} id={group.id} className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
                            <h2 className="text-2xl font-semibold tracking-tight text-ink lg:sticky lg:top-24 lg:self-start">{group.title}</h2>
                            <FaqList items={group.items} />
                        </section>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
