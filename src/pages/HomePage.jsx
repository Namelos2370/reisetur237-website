import HeroSection from '../components/sections/HeroSection'
import ServicesSection from '../components/sections/ServicesSection'
import DestinationsSection from '../components/sections/DestinationsSection'
import BlogPreviewSection from '../components/sections/BlogPreviewSection'
import ContactSection from '../components/sections/ContactSection'
import SEOHead from '../components/seo/SEOHead'

export default function HomePage() {
  return (
    <>
      <SEOHead page="home" />
      <HeroSection />
      <ServicesSection />
      <DestinationsSection />
      <BlogPreviewSection />
      <ContactSection />
    </>
  )
}
