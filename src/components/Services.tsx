import { motion } from "framer-motion";
import { Search, Settings, ArrowRight } from "lucide-react";

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
  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3">
            How We Help You Succeed
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-10 shadow-sm hover:shadow-lg transition-shadow border border-border"
            >
              <div className="w-14 h-14 gradient-orange rounded-2xl flex items-center justify-center mb-6">
                <service.icon size={26} className="text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-foreground">
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
