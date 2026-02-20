import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import logoImg from "@/assets/logo.png";

const SESSION_KEY = "gralix-loaded";

interface LoadingScreenProps {
    onStarted: () => void;
    onComplete: () => void;
}

const milestones = [0, 25, 50, 75, 100];

/**
 * Final Redesign: Elliott Mangham Inspired Minimalist Loader.
 * - Pure black background (#000000)
 * - Sequenced milestone progress (0% • 25% • 50%...)
 * - Consistent Gralix wordmark styling
 * - GSAP Float-up exit transition
 */
const LoadingScreen = ({ onStarted, onComplete }: LoadingScreenProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const milestoneRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const logoRef = useRef<HTMLDivElement>(null);
    const [activeMilestone, setActiveMilestone] = useState(0);

    const isReturnVisit = useRef(
        typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "true"
    );

    const exitAnimation = useCallback(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem(SESSION_KEY, "true");
                onComplete();
            },
        });

        // Trigger site visibility with a tiny delay so the lift starts first
        tl.call(() => {
            onStarted();
        }, [], 0.1);

        // Elegant float-up transition revealing the site
        if (containerRef.current) {
            tl.to(containerRef.current, {
                y: "-100%",
                duration: 1.4,
                ease: "power4.inOut",
            });
        } else {
            onComplete();
        }
    }, [onStarted, onComplete]);

    // Handle progress sequencing
    useEffect(() => {
        const minTime = isReturnVisit.current ? 800 : 2500;
        const interval = minTime / milestones.length;

        // Initial reveal of elements
        gsap.fromTo(
            [logoRef.current, ...milestoneRefs.current],
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" }
        );

        // Sequence through milestones
        milestones.forEach((value, index) => {
            setTimeout(() => {
                setActiveMilestone(value);
            }, index * interval);
        });

        // Trigger exit on completion
        const endTimeout = setTimeout(exitAnimation, minTime + 400);

        return () => clearTimeout(endTimeout);
    }, [exitAnimation]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-colors duration-500"
        >
            {/* Centered Gralix Logo */}
            <div ref={logoRef} className="mb-12 select-none">
                <img
                    src={logoImg}
                    alt="Gralix Technologies"
                    className="h-32 md:h-40 w-auto"
                />
            </div>

            {/* Milestone Sequence: 0% • 25% • 50% • 75% • 100% */}
            <div className="flex items-center gap-4 md:gap-8">
                {milestones.map((value, index) => (
                    <div key={value} className="flex items-center gap-4 md:gap-8">
                        <span
                            ref={(el) => (milestoneRefs.current[index] = el)}
                            className="text-xs md:text-sm font-mono tracking-widest transition-colors duration-500"
                            style={{
                                color: activeMilestone >= value ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.15)"
                            }}
                        >
                            {value}%
                        </span>
                        {index < milestones.length - 1 && (
                            <span className="text-[10px] text-foreground/10 select-none">•</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingScreen;
