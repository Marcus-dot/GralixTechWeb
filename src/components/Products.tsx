import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, BarChart3, CreditCard, Scan, Landmark, Box, LucideIcon } from "lucide-react";
import { products } from "@/constants/products";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  gimm: TrendingUp,
  ibnr: Shield,
  "ifrs-17": BarChart3,
  "ifrs-9-tool": CreditCard,
  raidmercury: Scan,
  rubiclend: Landmark,
  kapitao: Box,
  "g-re": CreditCard,
};

const Products = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current?.children || [], {
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

      // Horizontal scroll logic - only on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="products" ref={sectionRef} className="relative bg-background overflow-hidden">
      {/* Sticky header for horizontal section */}
      <div className="md:h-screen flex flex-col justify-center py-24 md:py-0">
        <div className="container mx-auto px-6 mb-12">
          <div ref={headingRef} className="text-center md:text-left">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Product Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3 max-w-2xl">
              Solutions Built for Africa's Financial Sector
            </h2>
            <div className="flex items-center gap-4 mt-6">
              <p className="text-muted-foreground text-sm">
                {prefersReducedMotion ? "Explore our products" : "Scroll vertically to explore horizontally"}
              </p>
              {!prefersReducedMotion && (
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="hidden md:block text-accent"
                >
                  →
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Track */}
        <div className="relative overflow-visible md:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-6 px-6 md:px-12 pb-12 overflow-y-auto md:overflow-y-hidden"
            style={{ width: "max-content", minWidth: "100%" }}
          >
            {products.map((product) => (
              <motion.div
                key={product.name}
                className="flex-shrink-0 w-full md:w-[400px]"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="block h-full group border border-border rounded-2xl p-8 hover:border-accent/50 transition-all bg-card hover:shadow-[0_0_40px_rgba(249,115,22,0.1)] relative overflow-hidden"
                >
                  {/* Subtle card glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] rounded-full pointer-events-none" />

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 gradient-navy rounded-2xl flex items-center justify-center group-hover:gradient-orange transition-all duration-500 shadow-lg">
                      {(() => {
                        const Icon = iconMap[product.id];
                        return Icon ? <Icon size={26} className="text-primary-foreground" /> : null;
                      })()}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-xl tracking-tight">{product.name}</h3>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.fullName}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 min-h-[60px]">
                    {product.description}
                  </p>

                  <div className="space-y-3">
                    {product.features.map((f) => (
                      <div key={f} className="text-xs text-foreground/80 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
                    <span className="text-xs font-bold text-accent group-hover:underline">View Details</span>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                      <motion.span animate={{ x: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        →
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
