import SectionTitle from "../components/section-title";

const industries = [
    {
        title: "Clinics and healthcare",
        description: "Appointment booking, patient follow-ups, and consultation notes written for the doctor.",
    },
    {
        title: "Real estate",
        description: "Lead qualification, property questions answered at any hour, and follow-ups that don't slip.",
    },
    {
        title: "E-commerce and retail",
        description: "Product recommendations, virtual try-on, order support, and stock alerts.",
    },
    {
        title: "Small businesses",
        description: "Orders, inventory, and customer messages handled for teams of one to five people.",
    },
    {
        title: "Coaches, consultants, and startups",
        description: "Lead capture, onboarding, and content workflows that scale without hiring.",
    },
];

export default function Industries() {
    return (
        <section className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <SectionTitle
                title="Who we work with"
                description="We do our best work with teams that are busy enough to feel the cost of manual work, and small enough to move quickly."
            />
            <dl className="mt-14 grid gap-x-16 sm:grid-cols-2 lg:grid-cols-3">
                {industries.map((item) => (
                    <div key={item.title} className="border-t border-line py-7">
                        <dt className="text-lg font-semibold tracking-tight text-ink">{item.title}</dt>
                        <dd className="mt-2 leading-relaxed text-ink-soft">{item.description}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
