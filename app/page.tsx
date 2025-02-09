import AboutUs from '../components/aboutUs';
import NavBar from '../components/navBar';
import SponsorSlider from '../components/SponsorSlider';
import Footer from '../components/footer';
import LocomotiveScrollProvider from '@/components/locomotiveScroll';
import InteractiveCursor from '@/components/interactiveCursor';


export default function Home() {
  return (
    <div className="cursor-none">
      <InteractiveCursor />
      <LocomotiveScrollProvider>
        <NavBar />
        <AboutUs />
        <SponsorSlider/>
        <Footer/>
      </LocomotiveScrollProvider>
    </div>
  );
}
