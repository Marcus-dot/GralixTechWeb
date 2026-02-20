import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scrolling and wires it to GSAP ScrollTrigger.
 * Disabled when user prefers reduced motion.
 * Call this once at the app root level.
 */
export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            // Let the browser handle scrolling natively
            ScrollTrigger.defaults({ scroller: undefined });
            return;
        }

        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        // Sync Lenis scroll position with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Use GSAP ticker for Lenis RAF loop (better perf than manual rAF)
        const tickHandler = (time: number) => {
            lenis.raf(time * 1000); // GSAP ticker gives time in seconds
        };
        gsap.ticker.add(tickHandler);
        gsap.ticker.lagSmoothing(0); // Prevent GSAP from skipping frames

        return () => {
            gsap.ticker.remove(tickHandler);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [prefersReducedMotion]);

    return lenisRef;
}
