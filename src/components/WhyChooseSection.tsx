import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const reasons = [
  "Professional modern website design",
  "Mobile friendly websites",
  "Clean and attractive UI",
  "Affordable development services",
  "Focus on customer satisfaction",
  "Attention to detail",
];

const WhyChooseSection = () => (
  <section className="py-24">
    <div className="container px-4">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <ScrollReveal className="flex-1">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Choose Me</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy mt-3 mb-6">
            The Right Developer for Your Business
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I combine modern design skills with a genuine focus on your business goals.
            Every project is built with care, attention to detail, and a commitment to delivering results that exceed expectations.
          </p>
        </ScrollReveal>

        <div className="flex-1 space-y-4">
          {reasons.map((r, i) => (
            <ScrollReveal key={r} delay={i * 0.08} direction="right">
              <div className="flex items-center gap-4 bg-surface rounded-xl px-5 py-4 border border-border/50 hover:shadow-soft transition-all duration-300 hover:-translate-x-1">
                <CheckCircle2 size={22} className="text-primary flex-shrink-0" />
                <span className="font-medium text-navy">{r}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
