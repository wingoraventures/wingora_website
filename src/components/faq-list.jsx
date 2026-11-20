import { Plus } from "lucide-react";

export default function FaqList({ items }) {
    return (
        <div className="border-t border-line">
            {items.map((item) => (
                <details key={item.q} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <Plus className="mt-1 size-5 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-45" />
                    </summary>
                    <p className="max-w-[68ch] pb-6 leading-relaxed text-ink-soft">{item.a}</p>
                </details>
            ))}
        </div>
    );
}
