import { motion } from "framer-motion";
import heroTech from "@/assets/hero-tech.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={heroTech}
                alt="Gralix Technologies team working on fintech solutions"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3 mb-6">
              Driving Innovation Across Africa's Financial Landscape
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Gralix Technologies is a leading Zambian software development company
              specializing in bespoke software solutions tailored to meet the unique needs
              of industries such as insurance, finance, pension funds, and investment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Based in Lusaka, Zambia, we are committed to empowering businesses with
              cutting-edge technology that simplifies complex processes, ensures compliance,
              and enhances decision-making across the continent.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
