import { Link } from "react-router-dom";
import { AudioWaveform, BarChart3, FileText, GraduationCap, MessageSquare, ScanFace, Smartphone, Sparkles } from "lucide-react";
import { findProject } from "../data/projects";

// Tiles drift past the hero headline. A tile has either an image, a video
// (an .mp4 in /public, e.g. exported Instagram reels), or a drawn icon.
const project = (id, icon) => {
    const p = findProject(id);
    return { label: p.name, summary: p.summary, kind: p.category, to: `/projects/${id}`, icon };
};
const website = (name, image) => ({
    label: name,
    summary: "A website we designed and built.",
    kind: "Website",
    to: "/projects#beyond-ai",
    image,
});

const leftTiles = [
    website("CO Architects", "/work/co-architects.jpg"),
    project("swakriti-recommendations", BarChart3),
    { ...project("dontry"), image: "/work/dontry.jpg" },
    project("thomso-event-vibe-check", AudioWaveform),
    website("Bee Academy", "/work/bee-academy.jpg"),
    project("2", MessageSquare),
    website("Topmost Premier Hospital", "/work/topmost-premier-hospital.jpg"),
    project("4", FileText),
];

const rightTiles = [
    project("special-education-platform", GraduationCap),
    website("Aamira Jewelry", "/work/aamira-jewelry.jpg"),
    project("virtual-try-on-platform", ScanFace),
    website("ZAAR Interiors", "/work/zaar-interiors.jpg"),
    project("myuni-wellbeing-intelligence", Sparkles),
    website("Supreme Luxury Car Rentals", "/work/supreme-luxury-car-rentals.jpg"),
    project("17", Smartphone),
    website("Dermashatech", "/work/dermashatech.jpg"),
];

// Varied sizes and offsets so the columns read as scattered, not a grid.
const layout = [
    { w: "w-[150px] xl:w-[170px]", x: "ml-0" },
    { w: "w-[120px] xl:w-[132px]", x: "ml-[90px] xl:ml-[130px]" },
    { w: "w-[140px] xl:w-[160px]", x: "ml-[30px] xl:ml-[40px]" },
    { w: "w-[124px] xl:w-[140px]", x: "ml-[100px] xl:ml-[150px]" },
];

function TileFace({ tile, className = "" }) {
    if (tile.video) {
        return <video src={tile.video} muted loop autoPlay playsInline className={`size-full object-cover ${className}`} />;
    }
    if (tile.image) {
        return <img src={tile.image} alt="" loading="lazy" className={`size-full object-cover object-top ${className}`} />;
    }
    const Icon = tile.icon ?? Sparkles;
    return (
        <span className={`grid-paper flex size-full items-center justify-center bg-white [--cell:16px] ${className}`}>
            <span className="flex size-12 items-center justify-center rounded-xl bg-wing-tint text-wing">
                <Icon className="size-6" strokeWidth={1.75} />
            </span>
        </span>
    );
}

function Tile({ tile, index, side, hidden }) {
    const { w, x } = layout[index % layout.length];
    return (
        <div className={`group/tile relative mb-14 ${x} ${w}`}>
            <Link
                to={tile.to}
                tabIndex={hidden ? -1 : undefined}
                aria-label={`${tile.label}: ${tile.kind}`}
                className="block"
            >
                <span className="block aspect-square overflow-hidden rounded-xl border border-line bg-white shadow-[0_12px_32px_-18px_rgb(14_27_51/0.35)] transition-transform duration-500 ease-out group-hover/tile:-translate-y-1">
                    <TileFace tile={tile} className="transition-transform duration-700 ease-out group-hover/tile:scale-105" />
                </span>
                <span className="mt-2.5 block text-sm leading-snug text-ink-soft group-hover/tile:text-ink">{tile.label}</span>
            </Link>

            {/* Preview card on hover or keyboard focus */}
            <div
                className={`pointer-events-none invisible absolute top-0 z-20 w-64 translate-y-1 rounded-2xl border border-line bg-white p-4 opacity-0 shadow-[0_24px_48px_-20px_rgb(14_27_51/0.35)] transition-all duration-300 group-hover/tile:pointer-events-auto group-hover/tile:visible group-hover/tile:translate-y-0 group-hover/tile:opacity-100 group-focus-within/tile:visible group-focus-within/tile:opacity-100 ${
                    side === "left" ? "left-[calc(100%+12px)]" : "right-[calc(100%+12px)]"
                }`}
            >
                <p className="text-sm text-ink-soft">{tile.kind}</p>
                <p className="mt-1 font-semibold leading-snug text-ink">{tile.label}</p>
                <span className="mt-3 block aspect-[16/10] overflow-hidden rounded-lg border border-line">
                    <TileFace tile={tile} />
                </span>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{tile.summary}</p>
                <Link
                    to={tile.to}
                    tabIndex={-1}
                    className="mt-3 inline-flex h-9 items-center rounded-lg border border-line px-3 text-sm font-medium text-ink hover:border-ink/30"
                >
                    View project
                </Link>
            </div>
        </div>
    );
}

function Column({ tiles, side }) {
    return (
        <div
            className={`pointer-events-auto absolute inset-y-0 hidden w-[230px] lg:block xl:w-[300px] ${
                side === "left" ? "left-[2%] xl:left-[4%]" : "right-[2%] xl:right-[4%]"
            }`}
        >
            {/* The list is rendered twice and shifted by half its height for a seamless loop. */}
            <div className={`drift-pause ${side === "left" ? "drift-up" : "drift-down"}`}>
                {[false, true].map((hidden) => (
                    <div key={String(hidden)} aria-hidden={hidden || undefined} className="pt-14">
                        {tiles.map((tile, i) => (
                            <Tile key={tile.label} tile={tile} index={side === "left" ? i : i + 2} side={side} hidden={hidden} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function HeroTileColumns() {
    return (
        <>
            <Column tiles={leftTiles} side="left" />
            <Column tiles={rightTiles} side="right" />
            {/* Soft fade where tiles enter and leave; a mask would also clip the preview cards. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 hidden h-28 bg-gradient-to-b from-paper to-transparent lg:block" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-36 bg-gradient-to-t from-paper to-transparent lg:block" />
        </>
    );
}

// Phones and small tablets get one row that scrolls sideways.
export function HeroTileRow() {
    const tiles = leftTiles.flatMap((t, i) => [t, rightTiles[i]]);
    return (
        <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] lg:hidden">
            <div className="drift-left drift-pause flex w-max">
                {[false, true].map((hidden) => (
                    <div key={String(hidden)} aria-hidden={hidden || undefined} className="flex gap-4 pr-4">
                        {tiles.map((tile) => (
                            <Link key={tile.label} to={tile.to} tabIndex={hidden ? -1 : undefined} className="block w-32 shrink-0">
                                <span className="block aspect-square overflow-hidden rounded-xl border border-line bg-white">
                                    <TileFace tile={tile} />
                                </span>
                                <span className="mt-2 block text-[0.8rem] leading-snug text-ink-soft">{tile.label}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
