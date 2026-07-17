import { CtaBanner } from "@/components/shared/CtaBanner";

export function FinalCallToAction() {
  return (
    <CtaBanner
      title={
        <>
          Have an idea? <span className="text-gradient">Let’s build it.</span>
        </>
      }
      description="Whether you need a professional website, custom software, an AI agent, business automation or a complete POS solution, Modexa can help turn your idea into a reliable digital product."
      primaryLabel="Start Your Project"
      primaryHref="/request-quote"
      secondaryLabel="Contact Modexa"
      secondaryHref="/contact"
    />
  );
}
