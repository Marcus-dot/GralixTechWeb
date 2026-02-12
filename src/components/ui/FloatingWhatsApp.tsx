import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
    return (
        <a
            href="https://wa.me/260770007775"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#20bd5a] transition-colors hover:scale-110 active:scale-95 duration-200 group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={32} className="text-white" />
            <span className="absolute right-full mr-4 bg-white/90 text-black text-xs font-semibold px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Chat with Us
            </span>
        </a>
    );
};
