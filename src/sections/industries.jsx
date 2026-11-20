import SectionTitle from "../components/section-title";

const industries = [
    {
        title: "Retail and supermarkets",
        solutions: "Sales and inventory intelligence, demand forecasting, purchase analysis, repeat customer engagement, WhatsApp automation, and product recommendations.",
    },
    {
        title: "E-commerce and D2C",
        solutions: "Customer segmentation, product recommendations, customer journey analytics, personalised communication, retention workflows, and enquiry automation.",
    },
    {
        title: "Restaurants and food businesses",
        solutions: "Sales and order analysis, retention intelligence, feedback analysis, repeat customer engagement, demand forecasting, and communication automation.",
    },
    {
        title: "Real estate",
        solutions: "Lead qualification, enquiry management, automated follow-ups, CRM integration, sales pipeline analytics, and communication history.",
    },
    {
        title: "Healthcare and clinics",
        solutions: "Appointment automation, patient enquiry management, operational analytics, administrative workflow automation, and knowledge-based assistants.",
    },
    {
        title: "Manufacturing and distribution",
        solutions: "Sales and inventory analytics, demand planning, ERP data intelligence, automated reporting, document processing, and workflow automation.",
    },
];

export default function Industries() {
    return (
        <section id="industries" className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32">
            <SectionTitle
                title="Industries we focus on"
                description="Organisations that already generate useful business and customer data but need better systems to understand and use it. These are the areas we focus on and what we can build for them."
            />
            <dl className="mt-14 grid gap-x-16 sm:grid-cols-2 lg:grid-cols-3">
                {industries.map((item) => (
                    <div key={item.title} className="border-t border-line py-7">
                        <dt className="text-lg font-semibold tracking-tight text-ink">{item.title}</dt>
                        <dd className="mt-2 leading-relaxed text-ink-soft">{item.solutions}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
