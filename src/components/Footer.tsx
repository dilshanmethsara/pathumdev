import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy text-navy-foreground py-16">
    <div className="container px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div className="lg:col-span-2">
          <div className="font-display font-bold text-2xl mb-3">
            Pathum<span className="text-primary">Dev</span>
          </div>
          <p className="text-navy-foreground/60 text-sm leading-relaxed max-w-sm">
            Professional web development services for businesses and personal brands.
            Building modern, responsive, and stunning websites.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-navy-foreground/80">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            {["About", "Services", "Projects", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-navy-foreground/50 hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-navy-foreground/80">Connect</h4>
          <div className="flex gap-3">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-xl bg-navy-foreground/5 flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-1"
              >
                <Icon size={18} className="text-navy-foreground/60" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10 pt-8 text-center">
        <p className="text-navy-foreground/40 text-sm">
          © {new Date().getFullYear()} PathumDev. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
