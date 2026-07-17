import { Hero } from "@/components/home/Hero";
import { ScrollVideo } from "@/components/home/ScrollVideo";
import { LogoOrbitSection } from "@/components/home/LogoOrbitSection";
import { CompanyIntroduction } from "@/components/home/CompanyIntroduction";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedPos } from "@/components/home/FeaturedPos";
import { AiAutomationSection } from "@/components/home/AiAutomationSection";
import { WebsiteDevelopmentSection } from "@/components/home/WebsiteDevelopmentSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WhyModexa } from "@/components/home/WhyModexa";
import { TechnologySection } from "@/components/home/TechnologySection";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { TrustedCustomers } from "@/components/home/TrustedCustomers";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCallToAction } from "@/components/home/FinalCallToAction";
import {
  getCustomers,
  getPortfolioProjects,
  getTestimonials,
} from "@/lib/content";

export default function Home() {
  const customers = getCustomers();
  const projects = getPortfolioProjects();
  const testimonials = getTestimonials();

  return (
    <>
      {/* Opening scroll film: brand intro, words stay visible throughout */}
      <ScrollVideo
        src="/videos/modexa-scroll-background2.mp4"
        poster="/images/mockups/scroll-video-poster.jpg"
        label="Modexa in motion"
        showHint
      >
        <p className="text-sm font-medium tracking-widest text-brand-accent uppercase">
          Modexa in motion
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          One company.{" "}
          <span className="text-gradient">Every digital solution.</span>
        </h2>
      </ScrollVideo>

      {/* Second scroll film: Modexa POS interfaces, starts right after */}
      <ScrollVideo
        src="/videos/modexa-scroll-background.mp4"
        poster="/images/mockups/scroll-video-poster-pos.jpg"
        label="Modexa POS preview"
        heightVh={300}
        staticBehavior="hide"
      />

      {/* Full-page scroll-scrubbed brand moment: stripes orbit and form the X */}
      <LogoOrbitSection />

      <Hero />
      <CompanyIntroduction />
      <ServicesOverview />
      <FeaturedPos />
      <AiAutomationSection />
      <WebsiteDevelopmentSection />
      <ProcessSection />
      <WhyModexa />
      <TechnologySection />
      <PortfolioPreview projects={projects} />
      <TrustedCustomers customers={customers} />
      <Testimonials testimonials={testimonials} />
      <FinalCallToAction />
    </>
  );
}
