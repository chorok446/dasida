import { Hero3D } from "@/components/hero-3d";
import { Carousel3D } from "@/components/carousel-3d";
import { LandingLiveCampaigns } from "@/components/landing-live-campaigns";
import { LandingFlow } from "@/components/landing-flow";

// 랜딩 내러티브: 감탄(Hero) → 증거(Campaigns·주제 칩) → 사례(Carousel) → 행동(Flow/CTA)
export default function Home() {
  return (
    <>
      <Hero3D />
      <LandingLiveCampaigns />
      <Carousel3D />
      <LandingFlow />
    </>
  );
}
