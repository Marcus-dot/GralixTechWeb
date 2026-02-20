import { motion } from "framer-motion";
import { Lightbulb, Shield, Users, Globe } from "lucide-react";
import { useGsapScrollReveal } from "@/hooks/useGsapScrollReveal";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously push the boundaries of technology to deliver innovative solutions.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We build trust through transparency, reliability, and ethical practices.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description: "Our solutions are designed with the end-user in mind, ensuring ease of use and maximum value.",
  },
  {
    icon: Globe,
    title: "Local Expertise, Global Standards",
    description: "We combine deep understanding of the Zambian market with international best practices.",
  },
];

const CoreValues = () => {
  const headingRef = useGsapScrollReveal({ direction: "bottom", duration: 0.7 });
  const gridRef = useGsapScrollReveal<HTMLDivElement>({
    childSelector: ".value-card",
    stagger: 0.12,
    direction: "bottom",
    distance: 50,
  });

  return (
    <section className="py-24 bg-secondary/30 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Values</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3">
            What Drives Us Forward
          </h2>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <motion.div
              key={value.title}
              className="value-card bg-card backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-accent/50 transition-colors group shadow-sm hover:shadow-md"
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
            >
              <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <value.icon size={22} className="text-accent-foreground" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
