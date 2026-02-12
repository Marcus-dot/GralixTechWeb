import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Typewriter } from "@/components/ui/Typewriter";
import { TechGrid } from "@/components/ui/TechGrid";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})`, y }}
      />
      <div className="absolute inset-0 gradient-hero" />
      <TechGrid /> {/* Tech Grid Overlay */}

      <div className="container mx-auto px-6 relative z-10 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block gradient-orange px-4 py-1.5 rounded-full text-sm font-semibold text-accent-foreground mb-6">
              Leading Zambian Software Company
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6"
          >
            <Typewriter
              words={["Transform.", "Innovate.", "Excel."]}
              typingSpeed={100}
              deletingSpeed={50}
              pauseDuration={2000}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl leading-relaxed"
          >
            Empowering businesses with cutting-edge software solutions for
            insurance, finance, pension funds, and investment across Africa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#products"
              className="gradient-orange px-8 py-4 rounded-lg font-semibold text-accent-foreground flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              Explore Our Solutions <ArrowRight size={18} />
            </a>
            <a
              href="#about"
              className="px-8 py-4 rounded-lg font-semibold text-primary-foreground border border-primary-foreground/20 hover:border-accent hover:text-accent transition-colors"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
