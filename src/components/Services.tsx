import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Settings, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Search,
    title: "Gap Analysis",
    description:
      "Thorough assessment of your current systems, processes, and workflows to identify gaps in compliance, efficiency, and technology infrastructure.",
    benefits: [
      "Improved operational efficiency",
      "Enhanced regulatory compliance (IFRS 9, IFRS 17)",
      "Clear digital transformation roadmap",
    ],
  },
  {
    icon: Settings,
    title: "System Optimization as a Service",
    description:
      "Modernize your technology infrastructure, streamline operations, and maximize performance with our comprehensive optimization service.",
    benefits: [
      "Performance tuning & process automation",
      "Cloud integration & data management",
      "Advanced security enhancements",
    ],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        });
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        Array.from(cards).forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            x: i % 2 === 0 ? -60 : 60,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          });

          // Stagger benefits inside each card
          const benefits = card.querySelectorAll(".benefit-item");
          gsap.from(benefits, {
            opacity: 0,
            x: -20,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3">
            How We Help You Succeed
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="bg-card rounded-2xl p-10 shadow-sm hover:shadow-xl transition-shadow border border-border"
            >
              <div className="w-14 h-14 gradient-orange rounded-2xl flex items-center justify-center mb-6">
                <service.icon size={26} className="text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="benefit-item flex items-start gap-3 text-sm text-foreground">
                    <ArrowRight size={14} className="text-accent mt-1 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
