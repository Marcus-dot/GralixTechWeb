import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
    /** Direction to reveal from. Default: "bottom" */
    direction?: "bottom" | "left" | "right" | "top";
    /** Animation duration in seconds. Default: 0.8 */
    duration?: number;
    /** Stagger delay between children (seconds). Default: 0 (no stagger) */
    stagger?: number;
    /** Initial delay before animation starts. Default: 0 */
    delay?: number;
    /** Whether to only trigger once. Default: true */
    once?: boolean;
    /** Selector for children to stagger. If set, staggers matching children instead of the ref itself. */
    childSelector?: string;
    /** Distance to travel in pixels. Default: 60 */
    distance?: number;
    /** ScrollTrigger start position. Default: "top 85%" */
    start?: string;
}

/**
 * Reusable GSAP ScrollTrigger reveal hook.
 * Animates the referenced element (or its children with stagger) when scrolled into view.
 *
 * If `prefers-reduced-motion` is active, content is shown immediately with no animation.
 */
export function useGsapScrollReveal<T extends HTMLElement = HTMLDivElement>(
    options: ScrollRevealOptions = {}
): RefObject<T | null> {
    const ref = useRef<T | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const {
        direction = "bottom",
        duration = 0.8,
        stagger = 0,
        delay = 0,
        once = true,
        childSelector,
        distance = 60,
        start = "top 85%",
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // If reduced motion, ensure everything is visible and skip animation
        if (prefersReducedMotion) {
            const targets = childSelector ? el.querySelectorAll(childSelector) : [el];
            gsap.set(targets, { opacity: 1, x: 0, y: 0, clearProps: "all" });
            return;
        }

        const directionProps: Record<string, { x?: number; y?: number }> = {
            bottom: { y: distance },
            top: { y: -distance },
            left: { x: -distance },
            right: { x: distance },
        };
        const fromVars = directionProps[direction] || { y: distance };

        const targets = childSelector ? el.querySelectorAll(childSelector) : [el];

        // Small delay to ensure the DOM is settled and parent visibility is handled
        const timer = setTimeout(() => {
            if (!ref.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start,
                    toggleActions: once ? "play none none none" : "play none none reverse",
                },
            });

            // Using fromTo for absolute reliability - ensures we always end at opacity: 1
            tl.fromTo(targets,
                {
                    opacity: 0,
                    ...fromVars
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration,
                    stagger,
                    delay,
                    ease: "power3.out",
                    clearProps: "transform", // Clean up transforms after animation
                }
            );

            // Force a refresh after creation to ensure correct positioning
            ScrollTrigger.refresh();
        }, 150);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === el) st.kill();
            });
        };
    }, [direction, duration, stagger, delay, once, childSelector, distance, start, prefersReducedMotion]);

    return ref;
}
