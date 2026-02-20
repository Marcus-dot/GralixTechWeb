import { useState, useRef, useEffect } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Mail, label: "info@gralixtech.com" },
  { icon: MapPin, label: "Lusaka, Zambia" },
  { icon: Phone, label: "+260 XXX XXX XXX" },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
      }

      if (infoRef.current) {
        gsap.from(infoRef.current.children, {
          opacity: 0,
          x: -30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: infoRef.current, start: "top 85%" },
        });
      }

      if (formRef.current) {
        gsap.from(formRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitState("loading");

    // Simulated send — replace with EmailJS integration
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Message sent! We'll be in touch soon.");
    setSubmitState("success");

    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitState("idle");
    }, 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Contact</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3">
            Let's Build Something Great Together
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Ready to transform your business? Get in touch and let's discuss how we can help.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div ref={infoRef} className="md:col-span-2 flex flex-col gap-6 justify-center">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-accent-foreground" />
                </div>
                <span className="text-foreground text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
            {[
              { name: "name", label: "Full Name", type: "text" },
              { name: "email", label: "Email Address", type: "email" },
              { name: "subject", label: "Subject (optional)", type: "text" },
            ].map((field) => (
              <div key={field.name} className="relative">
                <input
                  id={field.name}
                  type={field.type}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="peer w-full bg-card border border-border rounded-lg px-4 pt-6 pb-2 text-foreground placeholder-transparent focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
                  placeholder={field.label}
                />
                <label
                  htmlFor={field.name}
                  className="absolute left-4 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
                >
                  {field.label}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="peer w-full bg-card border border-border rounded-lg px-4 pt-6 pb-2 text-foreground placeholder-transparent focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
                placeholder="Your Message"
              />
              <label
                htmlFor="message"
                className="absolute left-4 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
              >
                Your Message
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={submitState !== "idle"}
              className="gradient-orange w-full px-8 py-4 rounded-lg font-semibold text-accent-foreground flex items-center justify-center gap-2 disabled:opacity-70"
              whileHover={submitState === "idle" ? { scale: 1.02, boxShadow: "0 0 25px hsl(17 81% 54% / 0.3)" } : {}}
              whileTap={submitState === "idle" ? { scale: 0.98 } : {}}
            >
              <AnimatePresence mode="wait">
                {submitState === "idle" && (
                  <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Send Message <Send size={16} />
                  </motion.span>
                )}
                {submitState === "loading" && (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 size={20} className="animate-spin" />
                  </motion.span>
                )}
                {submitState === "success" && (
                  <motion.span key="success" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <CheckCircle size={20} /> Sent!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
