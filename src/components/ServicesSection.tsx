import { Globe, User, FileText, RefreshCw, Smartphone, Palette } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  { icon: Globe, title: "Business Website Development", desc: "Professional websites tailored to your business needs, helping you establish a strong online presence and attract more customers." },
  { icon: User, title: "Portfolio Websites", desc: "Showcase your work beautifully with a custom portfolio that highlights your skills and projects with stunning visuals." },
  { icon: FileText, title: "Landing Pages", desc: "High-converting landing pages designed to capture leads and drive action with compelling layouts and clear messaging." },
  { icon: RefreshCw, title: "Website Redesign", desc: "Transform your outdated website into a modern, fast, and engaging experience that keeps visitors coming back." },
  { icon: Smartphone, title: "Responsive Web Development", desc: "Websites that look and work perfectly on all devices — from desktops to tablets to smartphones." },
  { icon: Palette, title: "Custom Website UI", desc: "Unique, tailor-made user interfaces that align with your brand identity and provide exceptional user experiences." },
];

const ServicesSection = () => (
  <section id="services" className="py-24">
    <div className="container px-4">
      <ScrollReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Services</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy mt-3 mb-4">
            What I Can Build for You
          </h2>
          <p className="text-muted-foreground text-lg">
            From business websites to custom UI design, I offer a range of web development services to help your business grow.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.08}>
            <div className="bg-surface rounded-2xl p-7 hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 group border border-border/50 h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <s.icon size={24} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-navy text-lg mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
