import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedDesigns from '../components/FeaturedDesigns';
import LaserMarkingSection from '../components/LaserMarkingSection';
import Portfolio from '../components/Portfolio';
import AboutUs from '../components/AboutUs';
import AgentCTA from '../components/AgentCTA';
import HowItWorks from '../components/HowItWorks';
import Engineering from '../components/Engineering';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow overflow-hidden relative">
        <Hero />
        <FeaturedDesigns />
        <LaserMarkingSection />
        <Services />
        <Portfolio />
        <AboutUs />
        <AgentCTA />
        <HowItWorks />
        <Engineering />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
