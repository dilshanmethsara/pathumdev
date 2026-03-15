import { ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    name: "NovaMail",
    url: "https://novamail.duckdns.org",
    description: "A modern web project with a structured interface and functional features.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
  },
  {
    name: "Linkzy",
    url: "https://linkzy.netlify.app",
    description: "A modern link-sharing style web project with a clean interface and responsive design.",
    tags: ["React", "CSS", "Netlify", "UI Design"],
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24 bg-surface">
    <div className="container px-4">
      <ScrollReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Projects</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy mt-3 mb-4">
            Featured Work
          </h2>
          <p className="text-muted-foreground text-lg">
            Take a look at some of the projects I've built for clients and personal exploration.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 0.15}>
            <div className="bg-background rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 group border border-border/50">
              {/* Browser mockup */}
              <div className="bg-navy/[0.03] p-4 border-b border-border/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                    <div className="w-3 h-3 rounded-full bg-green-400/50" />
                  </div>
                  <div className="flex-1 bg-background/60 rounded-md px-3 py-1 text-xs text-muted-foreground truncate ml-2">
                    {p.url.replace("https://", "")}
                  </div>
                </div>
                <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-primary/20">{p.name}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-display font-bold text-navy text-xl mb-2">{p.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium bg-primary/5 text-primary px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy text-navy-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary transition-all duration-300 group/btn"
                >
                  Visit Website
                  <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
