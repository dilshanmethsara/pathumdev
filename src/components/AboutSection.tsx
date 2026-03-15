import { Monitor, Smartphone, Zap, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  { icon: Monitor, title: "Modern Website Design", desc: "Clean, contemporary designs that impress." },
  { icon: Smartphone, title: "Responsive Websites", desc: "Perfect on every device and screen size." },
  { icon: Zap, title: "Fast and Clean UI", desc: "Optimized for speed and user experience." },
  { icon: Heart, title: "Customer Focused", desc: "Your vision and goals drive everything." },
];

const AboutSection = () => (
  <section id="about" className="py-24 bg-surface">
    <div className="container px-4">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">About Me</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy mt-3 mb-6">
            Passionate About Creating Exceptional Websites
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Hi, I'm <span className="font-semibold text-navy">Dilshan Methsara</span>, a web developer
            who creates modern, responsive, and attractive websites for businesses and personal brands.
            I'm dedicated to delivering pixel-perfect designs with clean code that helps your business succeed online.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.1}>
            <div className="bg-background rounded-2xl p-6 shadow-soft hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 group text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <f.icon size={26} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-navy text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
