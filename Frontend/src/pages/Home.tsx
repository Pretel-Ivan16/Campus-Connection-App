import HeroSection from '../components/ui/HeroSection'
import FeaturesSection from '../components/ui/FeaturesSection'
import CTASection from '../components/ui/CTASection'

function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  )
}

export default Home
