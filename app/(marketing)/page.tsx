import ClientSection from "@/components/landing/client-section";
import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";
import { SubscriptionsList } from "@/components/landing/subs-list";
import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";
import { AnimatedList } from "@/components/ui/animated-list";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <SphereMask />
      <SubscriptionsList />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
    </>
  );
}
