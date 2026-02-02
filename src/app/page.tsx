import Hero from '@/components/Hero'
import EndlessOptions from '@/components/EndlessOptions'
import BrowseCategories from '@/components/BrowseCategories'
import HowItWorks from '@/components/HowItWorks'
import BrowseDestinations from '@/components/BrowseDestinations'
import DamageWaivers from '@/components/DamageWaivers'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <EndlessOptions />
      <BrowseCategories />
      <HowItWorks />
      <BrowseDestinations />
      <DamageWaivers />
      <ContactForm />
      <Footer />
    </main>
  )
}
