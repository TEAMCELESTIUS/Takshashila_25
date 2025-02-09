import AboutUs from '../components/aboutUs';
import NavBar from '../components/navBar';
import SponsorSlider from '../components/sponsorSlider';
import Footer from '../components/footer';



export default function Home() {
  return (
    <div>
      <NavBar />
      <AboutUs />
      <SponsorSlider/>
      <Footer/>
    </div>
  );
}
