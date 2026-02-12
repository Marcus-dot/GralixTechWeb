import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TechGrid } from "@/components/ui/TechGrid";

// Data could be moved to a shared file
const products = {
    "gimm": {
        name: "GIMM",
        fullName: "Gralix Investment Management Platform",
        description: "A comprehensive investment management tool designed for portfolio tracking, automated reporting, and full IFRS 9 compliance.",
        longDescription: "GIMM revolutionizes how investment firms manage their portfolios. By automating complex calculations and providing real-time visibility into asset performance, GIMM ensures you stay compliant while maximizing returns.",
        features: ["Centralized investment tracking across all asset classes", "Automated IFRS 9 ECL calculations and reporting", "Real-time performance analytics and dashboards", "Integration with core banking and accounting systems"],
        benefits: ["Reduce manual errors by 90%", "Cut reporting time from days to minutes", "Ensure 100% regulatory compliance"]
    },
    "ibnr": {
        name: "IBNR",
        fullName: "Insurance Reserving Application",
        description: "Accurately calculate Incurred But Not Reported reserves with simplified actuarial calculations.",
        longDescription: "Our IBNR application takes the complexity out of actuarial reserving. It uses advanced statistical methods to estimate reserves accurately, ensuring solvency and financial stability for insurance companies.",
        features: ["Chain Ladder and Bornhuetter-Ferguson methods", "Automated data triangulation", "Detailed scenario analysis and stress testing"],
        benefits: ["Improve reserve accuracy", "Streamline actuarial workflows", "Enhanced audit trail"]
    },
    "ifrs-17": {
        name: "IFRS 17",
        fullName: "IFRS 17 Application",
        description: "Seamless transition to IFRS 17 accounting standard with automated contract valuation.",
        longDescription: "Navigate the complexities of IFRS 17 with confidence. Our application automates the entire valuation process, from data aggregation to financial reporting, ensuring you meet all compliance requirements without the headache.",
        features: ["Automated contract valuation (GMM, PAA, VFA)", "Integrated data management and validation", "Comprehensive disclosure reporting", "Seamless integration with general ledgers"],
        benefits: ["Achieve full IFRS 17 compliance", "Reduce implementation costs and risks", "Gain deeper insights into contract performance"]
    },
    "ifrs-9-tool": {
        name: "IFRS 9 Tool",
        fullName: "ECL Calculation Engine",
        description: "Robust Expected Credit Loss calculation in compliance with IFRS 9 using advanced statistical models.",
        longDescription: "Our IFRS 9 Tool provides a powerful engine for calculating Expected Credit Losses (ECL). With support for complex PD, LGD, and EAD models, it empowers financial institutions to accurately assess credit risk and maintain compliance.",
        features: ["Advanced PD, LGD, and EAD modeling", "Macroeconomic scenario generation and weighting", "Staging allocation logic (Stage 1, 2, 3)", "Detailed audit logs and model validation reports"],
        benefits: ["Optimize capital allocation", "Ensure accurate risk provisioning", "Simplify regulatory reporting"]
    },
    "raidmercury": {
        name: "RaidMercury",
        fullName: "Insurance Fraud & Risk Assessment",
        description: "Cutting-edge fraud detection and risk assessment using advanced analytics and machine learning.",
        longDescription: "Protect your bottom line with RaidMercury. Leveraging the power of machine learning, it identifies suspicious claims and assesses risk profiles in real-time, enabling insurers to prevent fraud before it happens.",
        features: ["AI-powered fraud detection algorithms", "Real-time claims scoring and alerts", "Link analysis for organized fraud rings", "Predictive risk modeling for underwriting"],
        benefits: ["Reduce claims leakage significantly", "Improve loss ratios", "Enhance investigative efficiency"]
    },
    "rubiclend": {
        name: "RubicLend",
        fullName: "KYC & Loan Management",
        description: "Comprehensive loan management from customer onboarding to repayment with integrated KYC.",
        longDescription: "RubicLend streamlines the entire lending lifecycle. From digital onboarding and instant KYC verification to automated loan servicing and collections, it delivers a seamless experience for both lenders and borrowers.",
        features: ["Digital customer onboarding with biometric KYC", "Automated credit scoring and decisioning", "Flexible loan product configuration", "Integrated collections and recovery management"],
        benefits: ["Accelerate time-to-market for new loan products", "Reduce customer acquisition costs", "Minimize non-performing loans"]
    },
    "kapitao": {
        name: "Kapitao",
        fullName: "Real-Time Asset Flow",
        description: "Enterprise Fixed Asset Management System for total control, visibility, and financial accuracy.",
        longDescription: "Take control of your fixed assets with Kapitao. This enterprise-grade system provides end-to-end visibility into asset location, condition, and depreciation, ensuring financial accuracy and operational efficiency.",
        features: ["Barcode and RFID asset tracking", "Automated depreciation calculations (straight-line, declining balance)", "Maintenance scheduling and tracking", "Mobile app for field audits"],
        benefits: ["Eliminate ghost assets", "Ensure accurate financial reporting", "Extend asset lifespan through timely maintenance"]
    },
    "g-re": {
        name: "G-Re",
        fullName: "Re-insurance Application",
        description: "Streamline reinsurance operations with automated treaty management and claims processing.",
        longDescription: "G-Re simplifies the complex world of reinsurance. Manage treaties, automate premium calculations, and track claims recoveries in a single, unified platform designed for modern reinsurers.",
        features: ["Treaty and facultative business management", "Automated premium and commission calculations", "Claims recovery tracking and borderaux generation", "Risk accumulation monitoring"],
        benefits: ["Maximize reinsurance recoveries", "Reduce administrative burden", "Improve visibility into net risk exposure"]
    }
};

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    // Default to a not found state or generic product if ID doesn't match
    const product = products[id as keyof typeof products];

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                    <Link to="/" className="text-accent hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-secondary/50" />
                <TechGrid />

                <div className="container mx-auto px-6 relative z-10">
                    <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-accent mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-accent font-semibold text-sm uppercase tracking-widest">{product.name}</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6">{product.fullName}</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">{product.longDescription}</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-8">Key Features</h2>
                            <ul className="space-y-4">
                                {product.features.map((feature, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2 className="text-accent mt-1 shrink-0" />
                                        <span className="text-foreground/80">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-foreground mb-6">Why Choose {product.name}?</h3>
                            <ul className="space-y-4 mb-8">
                                {product.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/#contact"
                                className="block w-full text-center gradient-orange py-3.5 rounded-lg font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
                            >
                                Request a Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProductDetail;
