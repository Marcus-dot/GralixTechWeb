const Footer = () => {
  return (
    <footer className="gradient-navy py-12 border-t border-primary-foreground/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-2xl font-heading font-extrabold text-primary-foreground">
              Gra<span className="text-accent">li</span>x
            </span>
            <p className="text-primary-foreground/50 text-sm mt-2">
              Transform. Innovate. Excel.
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm text-primary-foreground/60">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#services" className="hover:text-accent transition-colors">Services</a>
            <a href="#products" className="hover:text-accent transition-colors">Products</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/40 text-sm">
            © {new Date().getFullYear()} Gralix Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
