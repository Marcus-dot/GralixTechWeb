import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const articles = [
    {
        id: 1,
        title: "The Future of Fintech in Zambia",
        excerpt: "Exploring how digital payments and mobile banking are transforming the financial landscape in Zambia.",
        date: "Oct 12, 2025",
        category: "Fintech"
    },
    {
        id: 2,
        title: "Why IFRS 17 Matters for Insurers",
        excerpt: "A deep dive into the new accounting standard and what it means for insurance companies' reporting requirements.",
        date: "Sep 28, 2025",
        category: "Compliance"
    },
    {
        id: 3,
        title: "Leveraging AI for Credit Scoring",
        excerpt: "How machine learning models are improving loan approval accuracy and reducing default rates.",
        date: "Sep 15, 2025",
        category: "AI & Data"
    }
];

const Insights = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-32 pb-20 bg-secondary/30">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Insights & News</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Stay updated with the latest trends in technology, finance, and digital transformation.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <article key={article.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-muted/50 w-full" /> {/* Placeholder image */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                                        <span className="px-2 py-1 bg-accent/10 text-accent rounded-full">{article.category}</span>
                                        <span>{article.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{article.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">{article.excerpt}</p>
                                    <Link to="#" className="inline-flex items-center text-accent text-sm font-medium hover:underline">
                                        Read More <ArrowRight size={14} className="ml-1" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Insights;
