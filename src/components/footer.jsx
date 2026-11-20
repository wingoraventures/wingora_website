import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Logo } from "./navbar";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function Newsletter() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setMessage("Enter an email address like name@company.com.");
            return;
        }
        if (!supabase) {
            setMessage("Subscription isn't available right now. Email us instead.");
            return;
        }

        setLoading(true);
        setMessage("");

        const { error } = await supabase.from("subscribed_users").insert([{ email }]);
        const alreadySubscribed = error?.code === "23505";
        if (error && !alreadySubscribed) {
            setMessage("Subscription failed. Try again in a moment.");
            setLoading(false);
            return;
        }

        const { error: funcError } = await supabase.functions.invoke("send-subscription-email", {
            body: JSON.stringify({ email }),
        });
        if (funcError) console.error("Function error:", funcError);

        setMessage(alreadySubscribed ? "You're already subscribed." : "Subscribed. Check your inbox for a welcome email.");
        setEmail("");
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubscribe} noValidate className="max-w-sm">
            <label htmlFor="newsletter-email" className="font-medium text-ink">
                Notes on using business data and AI
            </label>
            <div className="mt-3 flex gap-2">
                <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-white px-3.5 text-ink placeholder:text-ink-soft/60 outline-none focus:border-wing focus:ring-3 focus:ring-wing/15"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="h-11 shrink-0 rounded-lg bg-ink px-4 font-medium text-paper transition-colors hover:bg-wing-deep disabled:opacity-60"
                >
                    {loading ? "Subscribing…" : "Subscribe"}
                </button>
            </div>
            <p className="mt-2 min-h-6 text-sm text-ink-soft" aria-live="polite">
                {message}
            </p>
        </form>
    );
}

export default function Footer() {
    return (
        <footer className="border-t border-line bg-white">
            <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1fr_auto_auto] md:gap-20 md:px-8">
                <div>
                    <Logo />
                    <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">
                        Business intelligence and AI automation partner. Your business has the data. We help you grow with it.
                    </p>
                </div>

                <nav className="text-[0.95rem]" aria-label="Footer">
                    <ul className="space-y-2.5 text-ink-soft">
                        <li><a href="/#services" className="hover:text-ink">Services</a></li>
                        <li><Link to="/projects" className="hover:text-ink">Projects</Link></li>
                        <li><Link to="/about" className="hover:text-ink">About</Link></li>
                        <li><Link to="/faq" className="hover:text-ink">FAQ</Link></li>
                        <li><a href="/#contact" className="hover:text-ink">Contact</a></li>
                    </ul>
                </nav>

                <Newsletter />
            </div>
            <div className="border-t border-line">
                <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-5 py-6 text-sm text-ink-soft md:px-8">
                    <p>© {new Date().getFullYear()} Wingora Ventures</p>
                    <a href="mailto:wingoraventures@gmail.com" className="hover:text-ink">wingoraventures@gmail.com</a>
                </div>
            </div>
        </footer>
    );
}
