export default function SectionTitle({ title, description, as: Heading = "h2" }) {
    return (
        <div className="max-w-2xl">
            <Heading className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink md:text-[2.75rem]">
                {title}
            </Heading>
            {description && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{description}</p>}
        </div>
    );
}
