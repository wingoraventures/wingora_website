import SectionTitle from "../components/section-title";

const photo = (id) => `https://images.unsplash.com/${id}?w=900&q=70&auto=format&fit=crop`;

const industries = [
    { title: "Retail and supermarkets", line: "Stock, demand, and repeat customers", image: photo("photo-1604719312566-8912e9227c6a") },
    { title: "E-commerce and D2C", line: "Segments, recommendations, retention", image: photo("photo-1580674285054-bed31e145f59") },
    { title: "Restaurants and food", line: "Orders, feedback, regulars", image: photo("photo-1555396273-367ea4eb4db5") },
    { title: "Real estate", line: "Leads, follow-ups, pipeline", image: photo("photo-1580587771525-78b9dba3b914") },
    { title: "Healthcare and clinics", line: "Appointments and patient enquiries", image: photo("photo-1519494026892-80bbd2d6fd0d") },
    { title: "Manufacturing and distribution", line: "Inventory, ERP data, reports", image: photo("photo-1586528116311-ad8dd3c8310d") },
];

export default function Industries() {
    return (
        <section id="industries" className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32">
            <SectionTitle title="Industries we focus on" description="Businesses that already have the data and want to use it." />
            <ul className="mt-12 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
                {industries.map((item) => (
                    <li key={item.title} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink sm:aspect-[4/3]">
                        <img
                            src={item.image}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                            <h3 className="text-base font-semibold leading-tight text-white md:text-lg">{item.title}</h3>
                            <p className="mt-1 text-sm leading-snug text-white/80">{item.line}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
