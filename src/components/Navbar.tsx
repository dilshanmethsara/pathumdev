import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full ${
        scrolled
          ? "glass shadow-soft px-6 py-3 max-w-3xl w-[90%]"
          : "px-6 py-4 max-w-4xl w-[90%]"
      }`}
    >
      <div className="flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl text-navy cursor-link">
          Pathum<span className="text-primary">Dev</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300 relative group cursor-link"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 cursor-button"
          >
            Hire Me
          </a>
          <Link
            to="/admin"
            className="p-2 text-foreground/70 hover:text-primary transition-colors cursor-button"
            title="Admin Panel"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-navy cursor-button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 flex flex-col gap-4 pb-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors cursor-link"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold text-center cursor-button"
            >
              Hire Me
            </a>
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors cursor-link flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Admin Panel
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
