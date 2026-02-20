import { useState } from "react";
import { useGsapScrollReveal } from "@/hooks/useGsapScrollReveal";
import { Linkedin, Mail } from "lucide-react";

/**
 * Team Members Data
 * Updated as per user request (Oct 2023 Revamp)
 * Photos: Currently placeholders. User instructions:
 * 1. Place new images in public/images/team/ (e.g., mwelwa-m.jpg)
 * 2. Update the 'image' property below with the correct path.
 */
const team = [
    {
        name: "Mwelwa Mondoloka",
        role: "Managing Director",
        image: "/images/team/mwelwa-m.jpg",
        bio: "Leading technical strategy and innovation.",
        color: "bg-primary dark:bg-[#1e293b]",
    },
    {
        name: "Elly Bubala",
        role: "Senior Software Developer",
        image: "/images/team/elly-b.jpg",
        bio: "Architecting scalable solutions for complex problems.",
        color: "bg-primary/90 dark:bg-[#334155]",
    },
    {
        name: "Mwelwa Chipimo",
        role: "Software Developer",
        image: "/images/team/mwelwa-c.jpg",
        bio: "Full-stack enthusiast focused on performance.",
        color: "bg-primary/80 dark:bg-[#475569]",
    },
    {
        name: "Madalitso Daka",
        role: "Software Developer",
        image: "/images/team/madalitso-d.jpg",
        bio: "Building robust backend systems and APIs.",
        color: "bg-primary/70 dark:bg-[#64748b]",
    },
];

const Team = () => {
    const sectionRef = useGsapScrollReveal<HTMLDivElement>({
        direction: "bottom",
        distance: 30,
    });

    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section
            id="team"
            className="py-24 bg-background relative overflow-hidden transition-colors duration-500"
        >
            {/* Background Gradient Mesh - Subtle */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-accent blur-[120px] animate-pulse" />
                <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-6 relative z-10" ref={sectionRef}>
                <div className="text-center mb-16">
                    <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                        Our Team
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mt-3">
                        Meet the Minds Behind Gralix Technology
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                        Expert engineers passionate about transforming Zambia's digital landscape.
                    </p>
                </div>

                {/* Horizontal Accordion Layout */}
                <div className="flex flex-col md:flex-row gap-4 h-[600px] w-full">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`
                                relative overflow-hidden rounded-[40px] shadow-lg transition-[flex] duration-700 ease-in-out cursor-pointer group
                                ${activeIndex === index ? "flex-[4]" : "flex-[1]"}
                                ${member.color}
                            `}
                        >
                            {/* Image Background */}
                            <img
                                src={member.image}
                                alt={member.name}
                                className={`
                                    absolute inset-0 w-full h-full object-cover transition-all duration-700
                                    ${activeIndex === index
                                        ? "scale-100 opacity-90 dark:opacity-70"
                                        : "scale-110 opacity-70 dark:opacity-40 grayscale-[50%] dark:grayscale group-hover:grayscale-0"}
                                `}
                                loading="lazy"
                            />

                            {/* 
                                Overlay — lighter in light mode so cards don't look universally dark.
                                Light mode: subtle primary-tinted gradient, readable but not oppressive.
                                Dark mode: heavy black gradient for contrast on white text.
                            */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/30 to-primary/5 dark:from-black/90 dark:via-black/40 dark:to-transparent" />

                            {/* Content Container */}
                            <div
                                className={`
                                    absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full transition-all duration-500
                                    ${activeIndex === index ? "opacity-100 translate-y-0" : "opacity-80 translate-y-4"}
                                `}
                            >
                                {/* Vertical Text for Collapsed State */}
                                <div
                                    className={`
                                        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap origin-center transition-all duration-300
                                        ${activeIndex === index ? "opacity-0 scale-90" : "opacity-100 scale-100"}
                                        hidden md:block
                                    `}
                                >
                                    <span className="text-2xl font-bold text-white/70 dark:text-white/50 tracking-widest uppercase">
                                        {member.role.split(" ")[0]}
                                    </span>
                                </div>

                                {/* Expanded Content */}
                                <div
                                    className={`
                                        transition-all duration-500 delay-100 flex flex-col items-start
                                        ${activeIndex === index
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8 absolute bottom-8"}
                                    `}
                                >
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-1 leading-tight drop-shadow-md">
                                        {member.name}
                                    </h3>
                                    <p className="text-accent text-lg font-medium mb-4">{member.role}</p>
                                    <p className="text-white/90 dark:text-gray-300 text-sm md:text-base max-w-md line-clamp-3 mb-6 leading-relaxed drop-shadow-sm">
                                        {member.bio}
                                    </p>

                                    {/* Social Links */}
                                    <div className="flex gap-4">
                                        <button className="p-2 rounded-full bg-white/20 hover:bg-accent text-white transition-colors duration-300 backdrop-blur-sm">
                                            <Linkedin size={20} />
                                        </button>
                                        <button className="p-2 rounded-full bg-white/20 hover:bg-accent text-white transition-colors duration-300 backdrop-blur-sm">
                                            <Mail size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;