import { useGsapScrollReveal } from "@/hooks/useGsapScrollReveal";
import logoImg from "@/assets/logo.png";

const footerLinks = {
  Products: [
    { label: "GIMM", href: "/products/gimm" },
    { label: "IBNR", href: "/products/ibnr" },
    { label: "IFRS 17", href: "/products/ifrs-17" },
    { label: "IFRS 9 Tool", href: "/products/ifrs-9-tool" },
    { label: "RubicLend", href: "/products/rubiclend" },
    { label: "Kapitao", href: "/products/kapitao" },
  ],
  Company: [
    { label: "About", href: "/#about" },
    { label: "Team", href: "/#team" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/#contact" },
  ],
};

const Footer = () => {
  const footerRef = useGsapScrollReveal({
    direction: "bottom",
    distance: 30,
    duration: 0.7,
    start: "top 95%",
  });

  return (
    <footer ref={footerRef} className="bg-secondary/50 py-16 text-foreground/80 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/">
              <img
                src={logoImg}
                alt="Gralix Technologies"
                className="h-28 w-auto mb-4"
              />
            </a>
            <p className="text-sm mt-2 leading-relaxed text-muted-foreground">
              Zambian software company specializing in bespoke solutions for insurance,
              finance, pension funds, and investment.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact summary */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>info@gralixtech.com</li>
              <li>Lusaka, Zambia</li>
              <li>+260 XXX XXX XXX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground/60">
          &copy; {new Date().getFullYear()} Gralix Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
