import AboutUs from '../components/aboutUs';
import NavBar from '../components/navBar';
import SponsorSlider from '../components/sponsorSlider';
import Footer from '../components/footer';
import LocomotiveScrollProvider from '@/components/locomotiveScroll';



export default function Home() {
  return (
    <div>
      <LocomotiveScrollProvider>
      
        <NavBar />
        <AboutUs />
        <SponsorSlider/>
        <Footer/>
      </LocomotiveScrollProvider>
    </div>
  );
}
