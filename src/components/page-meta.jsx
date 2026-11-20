import { useEffect } from "react";

const SITE = "https://www.wingoraventures.com";
const DEFAULT_TITLE = "Wingora Ventures: Business intelligence and AI automation partner";

function setMeta(selector, attr, value) {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
}

// Per-page title, description, canonical URL, and optional JSON-LD.
export default function PageMeta({ title, description, path = "/", jsonLd }) {
    useEffect(() => {
        const fullTitle = title ? `${title} | Wingora Ventures` : DEFAULT_TITLE;
        document.title = fullTitle;
        setMeta('meta[name="description"]', "content", description);
        setMeta('meta[property="og:title"]', "content", fullTitle);
        setMeta('meta[property="og:description"]', "content", description);
        setMeta('meta[property="og:url"]', "content", SITE + path);
        setMeta('link[rel="canonical"]', "href", SITE + path);
    }, [title, description, path]);

    return jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null;
}

export { SITE };
