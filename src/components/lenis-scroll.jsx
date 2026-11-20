import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

export default function LenisScroll() {
    const location = useLocation();
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            smoothTouch: false,
            anchors: true,
        });

        lenisRef.current = lenis;

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    const lastPath = useRef(location.pathname);

    // Runs on every router navigation, including links to the page you're already on
    // (like the logo on the home page), so those still scroll.
    useEffect(() => {
        const samePage = lastPath.current === location.pathname;
        lastPath.current = location.pathname;
        const target = location.hash ? document.querySelector(location.hash) : null;
        const lenis = lenisRef.current;
        if (samePage && lenis) {
            lenis.scrollTo(target ?? 0, { offset: target ? -64 : 0 });
            return;
        }
        // New page: jump straight there, then let Lenis re-measure the new page height.
        const top = target ? target.getBoundingClientRect().top + window.scrollY - 64 : 0;
        window.scrollTo({ top, behavior: "instant" });
        lenis?.resize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.key]);

    return null;
}