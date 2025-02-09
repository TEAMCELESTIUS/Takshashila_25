import AboutUs from '../components/aboutUs';
import NavBar from '../components/navBar';
import SponsorSlider from '../components/sponsorSlider';
import Footer from '../components/footer';

const sponsors = [
  { name: "Sponsor 1", image: "/1.png" },
  { name: "Sponsor 2", image: "/2.png" },
  { name: "Sponsor 3", image: "/3.png" },
  { name: "Sponsor 4", image: "/1.png" },
  { name: "Sponsor 5", image: "/2.png" },
  // Add more sponsors as needed
];

export default function Home() {
  return (
    <div>
      <NavBar />
      <AboutUs />
      <SponsorSlider sponsors={sponsors} speed={20} />
      <Footer/>
    </div>
  );
}
