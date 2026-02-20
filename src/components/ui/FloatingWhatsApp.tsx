import { MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const FloatingWhatsApp = () => {
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const el = buttonRef.current;
        if (!el) return;

        // Hidden initially, bounce in after 2.5s
        gsap.set(el, { scale: 0, opacity: 0 });
        gsap.to(el, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 2.5,
            ease: "back.out(1.7)",
        });
    }, []);

    return (
        <a
            ref={buttonRef}
            href="https://wa.me/260000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
            style={{ animation: "wa-pulse 2s infinite 3s" }}
            title="Chat with us on WhatsApp"
        >
            <MessageCircle size={26} className="text-white" />
            <span className="absolute right-full mr-3 bg-card text-foreground text-xs font-medium px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Chat with us
            </span>
        </a>
    );
};
