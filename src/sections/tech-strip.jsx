const tools = [
    "Azure OpenAI",
    "Google Gemini",
    "WhatsApp Business API",
    "Meta Graph API",
    "Odoo",
    "FastAPI",
    "LangChain",
    "Qdrant",
    "Pinecone",
    "Supabase",
    "Rasa",
    "Dialogflow",
    "React Native",
    "Kotlin",
    "Google Cloud Run",
];

export default function TechStrip() {
    return (
        <section aria-label="Tools we build with" className="border-y border-line bg-white py-6">
            <p className="mx-auto max-w-6xl px-5 text-sm text-ink-soft md:px-8">Tools we build with</p>
            <div className="mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
                <div className="drift-left drift-pause flex w-max">
                    {[false, true].map((hidden) => (
                        <ul key={String(hidden)} aria-hidden={hidden || undefined} className="flex gap-3 pr-3">
                            {tools.map((t) => (
                                <li key={t} className="whitespace-nowrap rounded-full border border-line bg-paper px-4 py-1.5 text-[0.95rem] text-ink">
                                    {t}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
}
