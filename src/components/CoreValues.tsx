import { motion } from "framer-motion";
import { Lightbulb, Shield, Users, Globe } from "lucide-react";

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
  return (
    <section className="py-24 gradient-navy">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Values</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mt-3">
            What Drives Us Forward
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:border-accent/50 transition-colors group"
            >
              <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <value.icon size={22} className="text-accent-foreground" />
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-3">{value.title}</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
