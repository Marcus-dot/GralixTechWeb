import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroTech from "@/assets/hero-tech.jpg";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 6, suffix: "+", label: "Products" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image clip-path reveal from left
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Text stagger from right
      if (textRef.current) {
        const children = textRef.current.children;
        gsap.from(children, {
          opacity: 0,
          x: 40,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Stat number counters
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-value");
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-value") || "0");
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              counter.textContent = Math.round(obj.val).toString();
            },
          });
        });

        // Stagger stat containers
        gsap.from(statsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image with clip-path reveal */}
          <div ref={imageRef} className="relative rounded-2xl overflow-hidden">
            <img
              src={heroTech}
              alt="Gralix Technologies team working on fintech solutions"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>

          {/* Text content */}
          <div ref={textRef}>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3 mb-6">
              Driving Innovation Across Africa's Financial Landscape
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Gralix Technologies is a Zambian software development company
              specializing in bespoke software solutions tailored to meet the unique needs
              of industries such as insurance, finance, pension funds, and investment.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Based in Lusaka, Zambia, we are committed to empowering businesses with
              cutting-edge technology that simplifies complex processes, ensures compliance,
              and enhances decision-making across the continent.
            </p>

            {/* Animated stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-accent mb-1">
                    <span className="stat-value" data-value={stat.value}>
                      {prefersReducedMotion ? stat.value : 0}
                    </span>
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
