import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, BarChart3, CreditCard, Scan, Landmark, Box } from "lucide-react";

const products = [
  {
    icon: TrendingUp,
    name: "GIMM",
    fullName: "Gralix Investment Management Platform",
    description: "Comprehensive investment management tool for portfolio tracking, reporting, and IFRS 9 compliance.",
    features: ["Centralized investment tracking", "Automated IFRS 9 ECL calculations", "Real-time report generation"],
  },
  {
    icon: Shield,
    name: "IBNR",
    fullName: "Insurance Reserving Application",
    description: "Accurately calculate Incurred But Not Reported reserves with simplified actuarial calculations.",
    features: ["Automated reserve calculations", "Scenario analysis & forecasting", "Regulatory compliance"],
  },
  {
    icon: BarChart3,
    name: "IFRS 17",
    fullName: "IFRS 17 Application",
    description: "Seamless transition to IFRS 17 accounting standard with automated contract valuation.",
    features: ["Automated contract valuation", "Real-time reporting & analytics", "Seamless system integration"],
  },
  {
    icon: CreditCard,
    name: "IFRS 9 Tool",
    fullName: "ECL Calculation Engine",
    description: "Robust Expected Credit Loss calculation in compliance with IFRS 9 using advanced statistical models.",
    features: ["PD, EAD, LGD calculations", "Macroeconomic scenario analysis", "User-friendly dashboards"],
  },
  {
    icon: Scan,
    name: "RaidMercury",
    fullName: "Insurance Fraud & Risk Assessment",
    description: "Cutting-edge fraud detection and risk assessment using advanced analytics and machine learning.",
    features: ["Fraud detection algorithms", "Risk scoring & assessment", "Real-time alerts"],
  },
  {
    icon: Landmark,
    name: "RubicLend",
    fullName: "KYC & Loan Management",
    description: "Comprehensive loan management from customer onboarding to repayment with integrated KYC.",
    features: ["Automated loan workflows", "KYC & document verification", "Real-time notifications"],
  },
  {
    icon: Box,
    name: "Kapitao",
    fullName: "Real-Time Asset Flow",
    description: "Enterprise Fixed Asset Management System for total control, visibility, and financial accuracy.",
    features: ["Complete asset lifecycle", "Deep reporting & analytics", "ERP-ready API integrations"],
  },
  {
    icon: CreditCard,
    name: "G-Re",
    fullName: "Re-insurance Application",
    description: "Streamline reinsurance operations with automated treaty management and claims processing.",
    features: ["Automated treaty management", "Claims processing", "Risk analysis"],
  },
];

const Products = () => {
  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Product Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3">
            Solutions Built for Africa's Financial Sector
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="h-full"
            >
              <Link
                to={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block h-full group border border-border rounded-2xl p-8 hover:border-accent/50 hover:shadow-lg transition-all bg-card"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 gradient-navy rounded-xl flex items-center justify-center group-hover:gradient-orange transition-all">
                    <product.icon size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.fullName}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="text-xs text-foreground/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
