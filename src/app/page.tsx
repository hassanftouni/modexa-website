import { AssemblyHero } from "@/components/home/AssemblyHero";
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
      {/* Scroll-driven name assembly: the six parts of MODEXA tour the stage,
          then lock into the wordmark. */}
      <AssemblyHero />
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
