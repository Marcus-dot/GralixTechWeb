import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const articles = [
    {
        id: 1,
        title: "The Future of Insurance Technology in Africa",
        excerpt: "Exploring how insurtech is reshaping the African insurance landscape with innovative solutions.",
        category: "Insurtech",
        date: "2024-12-15",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Understanding IFRS 17: A Complete Guide",
        excerpt: "Everything you need to know about IFRS 17 compliance and its impact on insurance companies.",
        category: "Compliance",
        date: "2024-11-28",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "How Machine Learning is Revolutionizing Fraud Detection",
        excerpt: "Discover how AI and machine learning algorithms are transforming insurance fraud detection.",
        category: "AI & ML",
        date: "2024-11-10",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: "Digital Transformation in Zambian Financial Services",
        excerpt: "How Zambian fintech companies are leading the digital revolution in Africa's financial sector.",
        category: "Fintech",
        date: "2024-10-22",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    },
];

const Insights = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;

        if (headingRef.current) {
            gsap.from(headingRef.current.children, {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
            });
        }

        if (gridRef.current) {
            gsap.from(gridRef.current.children, {
                opacity: 0,
                y: 50,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                },
            });
        }
    }, [prefersReducedMotion]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <div ref={headingRef} className="text-center mb-16">
                        <span className="text-accent font-semibold text-sm uppercase tracking-widest">Insights</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mt-3">
                            Industry Trends & Thought Leadership
                        </h1>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                            Stay informed with the latest developments in fintech, insurtech, and compliance across Africa.
                        </p>
                    </div>

                    <div ref={gridRef} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {articles.map((article) => (
                            <motion.article
                                key={article.id}
                                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                                            {article.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(article.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <h2 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                                        {article.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                                    <Link
                                        to="#"
                                        className="text-sm font-medium text-accent flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        Read More <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Insights;
