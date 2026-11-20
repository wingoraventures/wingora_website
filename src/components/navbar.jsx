import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navlinks = [
    { href: "/#services", text: "Services" },
    { href: "/#work", text: "Work" },
    { href: "/#process", text: "Process" },
    { href: "/#contact", text: "Contact" },
];

export function Logo() {
    return (
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Wingora Ventures home">
            {/* Show only the wing mark from the transparent logo; its white wordmark is cropped off. */}
            <span className="block h-8 w-[43px] overflow-hidden">
                <img
                    src="/assets/Screenshot_2025-12-30_135254-removebg-preview.png"
                    alt=""
                    width={99}
                    height={32}
                    className="h-8 w-auto max-w-none"
                />
            </span>
            <span className="text-[1.05rem] font-semibold tracking-tight text-ink">Wingora Ventures</span>
        </Link>
    );
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();
    // On the home page use bare hashes so Lenis scrolls smoothly; elsewhere load the home page first.
    const to = (href) => (pathname === "/" ? href.slice(1) : href);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setIsMenuOpen(false), [pathname]);

    return (
        <header
            className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 border-b ${
                scrolled || isMenuOpen ? "bg-paper/85 backdrop-blur-md border-line" : "bg-transparent border-transparent"
            }`}
        >
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
                <Logo />

                <div className="hidden md:flex items-center gap-8 text-[0.95rem] text-ink-soft">
                    {navlinks.map((link) => (
                        <a key={link.href} href={to(link.href)} className="hover:text-ink transition-colors">
                            {link.text}
                        </a>
                    ))}
                </div>

                <a
                    href={to("/#contact")}
                    className="hidden md:inline-flex items-center h-10 px-4 rounded-lg bg-ink text-paper text-[0.95rem] font-medium hover:bg-wing-deep transition-colors"
                >
                    Book a consultation
                </a>

                <button
                    onClick={() => setIsMenuOpen((open) => !open)}
                    className="md:hidden -mr-2 p-2 text-ink"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
                </button>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden border-t border-line px-5 pb-6 pt-2">
                    {navlinks.map((link) => (
                        <a
                            key={link.href}
                            href={to(link.href)}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-3 text-lg text-ink border-b border-line"
                        >
                            {link.text}
                        </a>
                    ))}
                    <a
                        href={to("/#contact")}
                        onClick={() => setIsMenuOpen(false)}
                        className="mt-5 flex items-center justify-center h-12 rounded-lg bg-ink text-paper font-medium"
                    >
                        Book a consultation
                    </a>
                </div>
            )}
        </header>
    );
}
