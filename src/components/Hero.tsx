import { useEffect, useRef, Suspense, lazy, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { TechGrid } from "@/components/ui/TechGrid";
import HeroFallback from "@/components/HeroFallback";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { Typewriter } from "@/components/ui/Typewriter";

gsap.registerPlugin(ScrollTrigger);

// Code-split Three.js — only loaded on capable devices
const HeroScene = lazy(() => import("@/components/three/HeroScene"));

function shouldUse3D(): boolean {
  if (typeof window === "undefined") return false;
  if (window.innerWidth < 768) return false;
  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores < 8) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return true;
}

/** GSAP staggered word reveal for the main headline */
function AnimatedHeading({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word");
    gsap.fromTo(
      words,
      { opacity: 0, y: 60, rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  const words = text.split(" ");

  return (
    <h1
      ref={containerRef}
      className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-2"
      style={{ perspective: "600px" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="word inline-block mr-[0.3em] opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [use3D] = useState(() => shouldUse3D());

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const bg = bgRef.current;

    // GSAP parallax background
    if (bg && section) {
      gsap.to(bg, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }

    // Staggered content entrance
    const tl = gsap.timeline({ delay: 0.3 });

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    // Typewriter tagline fades in after heading finishes
    if (typewriterRef.current) {
      tl.fromTo(
        typewriterRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "+=0.6"
      );
    }

    if (paragraphRef.current) {
      tl.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.2"
      );
    }

    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <ScrollProgressBar />
      <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image with GSAP parallax */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBg})`,
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0 gradient-hero" />

        {/* 3D scene OR CSS fallback */}
        {use3D ? (
          <Suspense fallback={<HeroFallback />}>
            <HeroScene />
          </Suspense>
        ) : (
          <HeroFallback />
        )}

        <TechGrid />

        <div className="container mx-auto px-6 relative z-10 py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div ref={badgeRef} className="mb-6 opacity-0">
              <span className="inline-block gradient-orange px-4 py-1.5 rounded-full text-sm font-semibold text-accent-foreground">
                Zambian Software Company
              </span>
            </div>

            {/* GSAP word-split headline */}
            <AnimatedHeading text="Empowering Africa's Financial Future." />

            {/* Typewriter tagline — signature interaction */}
            <div ref={typewriterRef} className="mb-8 opacity-0">
              <span className="text-2xl md:text-4xl font-bold text-accent">
                <Typewriter
                  words={["Transform.", "Innovate.", "Excel."]}
                  typingSpeed={120}
                  deletingSpeed={80}
                  pauseDuration={2000}
                />
              </span>
            </div>

            <p
              ref={paragraphRef}
              className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl leading-relaxed opacity-0"
            >
              Empowering businesses with cutting-edge software solutions for
              insurance, finance, pension funds, and investment across Africa.
            </p>

            {/* CTA Buttons with magnetic hover */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <motion.a
                href="#products"
                className="gradient-orange px-8 py-4 rounded-lg font-semibold text-accent-foreground flex items-center gap-2 shadow-lg"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 30px hsl(17 81% 54% / 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Explore Our Solutions <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#about"
                className="px-8 py-4 rounded-lg font-semibold text-foreground border border-border hover:border-accent hover:text-accent transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Learn More
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
