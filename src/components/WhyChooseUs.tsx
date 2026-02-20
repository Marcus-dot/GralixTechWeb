import { motion } from "framer-motion";
import { MapPin, Puzzle, Cpu, Layers, FileCheck } from "lucide-react";
import { useGsapScrollReveal } from "@/hooks/useGsapScrollReveal";

const reasons = [
  { icon: MapPin, title: "Local Expertise with Global Standards", description: "Understanding the unique Zambian market while adhering to international standards." },
  { icon: Puzzle, title: "Bespoke Solutions for Diverse Industries", description: "Customized software for insurance, finance, pension funds, and investment sectors." },
  { icon: Cpu, title: "Cutting-Edge Technology", description: "Advanced statistical modeling, machine learning, and real-time data analytics." },
  { icon: Layers, title: "Seamless Integration & Scalability", description: "Effortless integration with existing systems that scale as your business grows." },
  { icon: FileCheck, title: "Commitment to Compliance", description: "Prioritizing regulatory compliance to keep you ahead of evolving regulations." },
];

const WhyChooseUs = () => {
  const headingRef = useGsapScrollReveal({ direction: "bottom", duration: 0.7 });
  const gridRef = useGsapScrollReveal<HTMLDivElement>({
    childSelector: ".reason-card",
    stagger: 0.1,
    direction: "bottom",
    distance: 40,
  });

  return (
    <section id="why-us" className="py-24 bg-background transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3">
            Your Partner in Digital Excellence
          </h2>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className={`reason-card flex items-start gap-4 p-6 rounded-xl border border-border bg-card hover:border-accent/40 transition-all hover:shadow-lg ${i === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                }`}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
            >
              <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center shrink-0 shadow-md">
                <r.icon size={18} className="text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-card-foreground mb-1 text-sm">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
