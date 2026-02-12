import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.type === "text" ? "name" : e.target.type === "email" ? "email" : "message"]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace with your actual EmailJS service/template IDs
    // emailjs.send('service_id', 'template_id', formData, 'public_key')

    // Simulating API call for demonstration
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible."
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message.", {
        description: "Please try again later or contact us directly."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Contact Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Get in touch with us today to schedule a demo or learn more about how our solutions
              can drive your business forward.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Address</h4>
                  <p className="text-muted-foreground text-sm">
                    Ground Floor, LA Complex, Plot 4897,<br />
                    L.A. Boulevard, Longacres, Lusaka, Zambia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Phone</h4>
                  <p className="text-muted-foreground text-sm">+260 770 007 775</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Email</h4>
                  <p className="text-muted-foreground text-sm">info@gralix.co</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center shrink-0">
                  <Globe size={18} className="text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Website</h4>
                  <p className="text-muted-foreground text-sm">www.gralix.co</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="gradient-navy rounded-2xl p-10"
          >
            <h3 className="text-xl font-bold text-primary-foreground mb-6">Send Us a Message</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-primary-foreground/70 mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent text-sm"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-primary-foreground/70 mb-1.5 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-primary-foreground/70 mb-1.5 block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent text-sm resize-none"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-orange py-3.5 rounded-lg font-semibold text-accent-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
