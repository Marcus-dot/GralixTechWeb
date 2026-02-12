import { motion } from "framer-motion";
import { MapPin, Puzzle, Cpu, Layers, FileCheck } from "lucide-react";

const reasons = [
  { icon: MapPin, title: "Local Expertise with Global Standards", description: "Understanding the unique Zambian market while adhering to international standards." },
  { icon: Puzzle, title: "Bespoke Solutions for Diverse Industries", description: "Customized software for insurance, finance, pension funds, and investment sectors." },
  { icon: Cpu, title: "Cutting-Edge Technology", description: "Advanced statistical modeling, machine learning, and real-time data analytics." },
  { icon: Layers, title: "Seamless Integration & Scalability", description: "Effortless integration with existing systems that scale as your business grows." },
  { icon: FileCheck, title: "Commitment to Compliance", description: "Prioritizing regulatory compliance to keep you ahead of evolving regulations." },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 gradient-navy">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mt-3">
            Your Partner in Digital Excellence
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-start gap-4 p-6 rounded-xl border border-primary-foreground/10 hover:border-accent/40 transition-colors ${i === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                }`}
            >
              <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center shrink-0">
                <r.icon size={18} className="text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-primary-foreground mb-1 text-sm">{r.title}</h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">{r.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
