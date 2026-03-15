import { useState, FormEvent } from "react";
import { Send, MessageCircle, Mail, MapPin, CheckCircle, AlertCircle, Phone } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { apiService } from "../lib/apiService";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error("Please fill in all required fields");
      }

      if (!formData.email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      // Send message via API
      const savedMessage = await apiService.sendMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      });

      console.log("Message sent:", savedMessage);

      // Success
      setSubmitStatus("success");
      setSubmitMessage("Thank you for your message! We'll get back to you soon.");
      
      // Reset form
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // Optional: Still open email client as backup
      setTimeout(() => {
        const mailtoLink = `mailto:dmcreatorstudio04@gmail.com?subject=Website Inquiry from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name} (${formData.email})`;
        window.open(mailtoLink);
      }, 1000);

    } catch (error) {
      console.error("Error submitting message:", error);
      setSubmitStatus("error");
      setSubmitMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container px-4">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy mt-3 mb-4">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground text-lg">
              Ready to build a stunning website for your business? Get in touch and let's discuss your project.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-8 border border-border/50">
              <div className="space-y-5">
                {/* Status Message */}
                {submitStatus !== "idle" && (
                  <div className={`p-4 rounded-lg flex items-center gap-3 ${
                    submitStatus === "success" 
                      ? "bg-green-50 text-green-800 border border-green-200" 
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}>
                    {submitStatus === "success" ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <p className="text-sm font-medium">{submitMessage}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-text-input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-text-input"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-text-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-text-input"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none cursor-text-input"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-semibold hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 cursor-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal className="lg:col-span-2" delay={0.2}>
            <div className="space-y-6">
              <a
                href="https://wa.link/hoa5d4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[hsl(var(--whatsapp-light))] rounded-2xl p-5 border border-[hsl(var(--whatsapp)/0.15)] hover:shadow-soft transition-all duration-300 hover:-translate-y-1 group cursor-link"
              >
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--whatsapp)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--whatsapp)/0.2)] transition-colors">
                  <MessageCircle size={22} className="text-[hsl(var(--whatsapp))]" />
                </div>
                <div>
                  <div className="font-semibold text-navy text-sm">WhatsApp</div>
                  <div className="text-muted-foreground text-xs">Chat with me directly</div>
                </div>
              </a>

              <a
                href="tel:+94775352074"
                className="flex items-center gap-4 bg-primary/5 rounded-2xl p-5 border border-primary/10 hover:shadow-soft transition-all duration-300 hover:-translate-y-1 group cursor-link"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone size={22} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-navy text-sm">Call</div>
                  <div className="text-muted-foreground text-xs">+94 77 535 2074</div>
                </div>
              </a>

              <a
                href="mailto:dmcreatorstudio04@gmail.com"
                className="flex items-center gap-4 bg-primary/5 rounded-2xl p-5 border border-primary/10 hover:shadow-soft transition-all duration-300 hover:-translate-y-1 group cursor-link"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={22} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-navy text-sm">Email</div>
                  <div className="text-muted-foreground text-xs">dmcreatorstudio04@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-surface rounded-2xl p-5 border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                  <MapPin size={22} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-navy text-sm">Location</div>
                  <div className="text-muted-foreground text-xs">Sri Lanka</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
