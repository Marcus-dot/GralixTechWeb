import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";

// Placeholder images - in production, replace with actual team photos
const team = [
    {
        name: "Mukuka Mwila",
        role: "Lead Software Engineer",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
        bio: "Expert in full-stack development and cloud architecture."
    },
    {
        name: "Chanda Bwalya",
        role: "Product Manager",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
        bio: "Bridging the gap between technical solutions and business needs."
    },
    {
        name: "Kondwani Banda",
        role: "UI/UX Designer",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400",
        bio: "Creating intuitive and beautiful digital experiences."
    },
    {
        name: "Thandiwe Phiri",
        role: "Data Scientist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
        bio: "Turning complex data into actionable business insights."
    }
];

const Team = () => {
    return (
        <section id="team" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-accent font-semibold text-sm uppercase tracking-widest">Our Team</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3">
                        Meet the Minds Behind Gralix
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        A diverse team of experts passionate about transforming Zambia's digital landscape.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-secondary rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-foreground">{member.name}</h3>
                                <p className="text-accent text-sm font-medium mb-3">{member.role}</p>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{member.bio}</p>

                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin size={18} /></a>
                                    <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Twitter size={18} /></a>
                                    <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Github size={18} /></a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
