import { Navbar } from "~/components/landing/navbar";
import { HeroSection } from "~/components/landing/hero-section";
import { FeaturesSection } from "~/components/landing/features-section";
import { TestimonialsSection } from "~/components/landing/testimonials-section";
import { FaqSection } from "~/components/landing/faq-section";
import { CtaSection } from "~/components/landing/cta-section";
import { Footer } from "~/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="faq">
          <FaqSection />
        </div>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
