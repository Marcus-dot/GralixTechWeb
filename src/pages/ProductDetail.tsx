import { useParams, Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TechGrid } from "@/components/ui/TechGrid";
import heroBg from "@/assets/hero-bg.jpg";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

import { products } from "@/constants/products";
import { DemoRequestModal } from "@/components/DemoRequestModal";

const productData = products.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
}, {} as Record<string, typeof products[0]>);

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const product = productData[id || ""];
    const sectionRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const benefitsRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Hero text entrance
            if (heroRef.current) {
                gsap.from(heroRef.current.children, {
                    opacity: 0,
                    y: 40,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: "power3.out",
                    delay: 0.2,
                });
            }

            // Staggered feature list
            if (featuresRef.current) {
                gsap.from(featuresRef.current.querySelectorAll(".feature-item"), {
                    opacity: 0,
                    x: -30,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: featuresRef.current,
                        start: "top 80%",
                    },
                });
            }

            // Benefits slide in from right
            if (benefitsRef.current) {
                gsap.from(benefitsRef.current.querySelectorAll(".benefit-item"), {
                    opacity: 0,
                    x: 30,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: benefitsRef.current,
                        start: "top 80%",
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [prefersReducedMotion, id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">Product Not Found</h1>
                    <Link to="/" className="text-accent hover:underline">← Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section ref={sectionRef} className="relative pt-32 pb-20 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 gradient-hero" />
                <TechGrid />

                <div ref={heroRef} className="container mx-auto px-6 relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors mb-8 text-sm"
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <span className="block text-accent font-semibold text-sm uppercase tracking-widest mb-2">
                        {product.fullName}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">
                        {product.name}
                    </h1>
                    <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed">{product.description}</p>
                </div>
            </section>

            {/* Features & Benefits */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                        <div ref={featuresRef}>
                            <h2 className="text-2xl font-bold text-foreground mb-8">Key Features</h2>
                            <ul className="space-y-4">
                                {product.features.map((f) => (
                                    <li key={f} className="feature-item flex items-start gap-3">
                                        <CheckCircle size={18} className="text-accent mt-1 shrink-0" />
                                        <span className="text-foreground">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div ref={benefitsRef}>
                            <h2 className="text-2xl font-bold text-foreground mb-8">Why Choose {product.name}</h2>
                            <ul className="space-y-4">
                                {product.benefits.map((b) => (
                                    <li key={b} className="benefit-item flex items-start gap-3">
                                        <ArrowRight size={18} className="text-accent mt-1 shrink-0" />
                                        <span className="text-foreground">{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-20">
                        <motion.button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 gradient-orange px-10 py-4 rounded-lg font-semibold text-accent-foreground text-lg cursor-pointer"
                            whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(17 81% 54% / 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Request a Demo <ArrowRight size={18} />
                        </motion.button>
                    </div>

                    <DemoRequestModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        defaultProduct={id}
                    />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProductDetail;
