import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";
import { SocialProof } from "@/components/landing/social-proof";
import { OldNewComparison } from "@/components/landing/old-new";
import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";
import { BenefitSection } from "@/components/landing/benefit";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { FAQSection } from "@/components/landing/faq";
import { Testimonials } from "@/components/landing/testimonials";

export default async function Page() {
  return (
    <>
      <HeroSection />
      {/* <SphereMask /> */}
      {/* <SubscriptionsList /> */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
      <SocialProof />
      <SphereMask />
      <OldNewComparison />
      <BenefitSection />
      <HowItWorksSection />
      {/* <Testimonials /> */}
      <PricingSection />
      <FAQSection />
    </>
  );
}
