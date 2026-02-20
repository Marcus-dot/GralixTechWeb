/**
 * CSS-only animated gradient mesh fallback for the hero section.
 * Used when:
 * - User is on mobile
 * - Device has hardwareConcurrency < 8
 * - User prefers reduced motion (renders static gradient)
 */
const HeroFallback = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base theme-aware background */}
            <div className="absolute inset-0 bg-background" />

            {/* Animated gradient blobs - adjusted for theme */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-30 blur-[100px]"
                style={{
                    background: "radial-gradient(circle, hsl(var(--accent) / 0.8), transparent 70%)",
                    top: "-10%",
                    right: "-5%",
                    animation: "gradient-shift-1 15s ease-in-out infinite",
                }}
            />
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-25 dark:opacity-20 blur-[100px]"
                style={{
                    background: "radial-gradient(circle, hsl(233 60% 45% / 0.9), hsl(233 41% 23% / 0.6), transparent 70%)",
                    bottom: "-15%",
                    left: "-10%",
                    animation: "gradient-shift-2 18s ease-in-out infinite",
                }}
            />
            <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-10 dark:opacity-15 blur-[80px]"
                style={{
                    background: "radial-gradient(circle, hsl(var(--accent) / 0.4), transparent 70%)",
                    top: "40%",
                    left: "30%",
                    animation: "gradient-shift-3 20s ease-in-out infinite",
                }}
            />

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    );
};

export default HeroFallback;
