import HeroSection from '@/components/sections/HeroSection'
import SolutionSection from '@/components/sections/SolutionSection'
import CoursesOverviewSection from '@/components/sections/CoursesOverviewSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import PlacementSection from '@/components/sections/PlacementSection'
import PartnersSection from '@/components/sections/PartnersSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import FinalCTASection from '@/components/sections/FinalCTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SolutionSection />
      <CoursesOverviewSection />
      <HowItWorksSection />
      <PlacementSection />
      <PartnersSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
