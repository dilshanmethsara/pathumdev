import { Star, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Alex Fernando",
    role: "Business Owner",
    text: "PathumDev built an amazing website for my business. The design is modern, responsive, and exactly what I needed. Highly recommended!",
  },
  {
    name: "Sarah Perera",
    role: "Freelancer",
    text: "I needed a portfolio website and Dilshan delivered beyond my expectations. The attention to detail and smooth animations make it stand out.",
  },
  {
    name: "Kevin Silva",
    role: "Startup Founder",
    text: "Professional, affordable, and fast delivery. PathumDev created a landing page that boosted our conversions significantly. Will work with him again!",
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 bg-surface">
    <div className="container px-4">
      <ScrollReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy mt-3 mb-4">
            What Clients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take my word for it — hear from the people I've worked with.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.1}>
            <div className="bg-background rounded-2xl p-7 border border-border/50 shadow-soft hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
              <Quote size={28} className="text-primary/20 mb-4" />
              <p className="text-foreground/80 text-sm leading-relaxed flex-1 mb-5">"{t.text}"</p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <div>
                <div className="font-display font-semibold text-navy text-sm">{t.name}</div>
                <div className="text-muted-foreground text-xs">{t.role}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
