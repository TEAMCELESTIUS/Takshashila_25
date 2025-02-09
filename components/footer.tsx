import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <section className="relative z-50 bg-black/40 backdrop-blur-md py-16 mt-20" data-scroll-section>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Socials */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-semibold mb-6">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://instagram.com/takshashila.cit" target="_blank" rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="https://facebook.com/takshashila.cit" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="https://linkedin.com/takshashila.cit" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://twitter.com/takshashila.cit" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Events */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-semibold mb-6">Events</h3>
          <ul className="space-y-3">
            <li>
              <a href="#technical" className="text-white/70 hover:text-white transition-colors">Technical Events</a>
            </li>
            <li>
              <a href="#cultural" className="text-white/70 hover:text-white transition-colors">Cultural Events</a>
            </li>
            <li>
              <a href="#workshops" className="text-white/70 hover:text-white transition-colors">Workshops</a>
            </li>
            <li>
              <a href="#proshows" className="text-white/70 hover:text-white transition-colors">Pro Shows</a>
            </li>
          </ul>
        </div>

        {/* Website */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-semibold mb-6">Website</h3>
          <ul className="space-y-3">
            <li>
              <a href="#home" className="text-white/70 hover:text-white transition-colors">Home</a>
            </li>
            <li>
              <a href="#about" className="text-white/70 hover:text-white transition-colors">About</a>
            </li>
            <li>
              <a href="#sponsors" className="text-white/70 hover:text-white transition-colors">Sponsors</a>
            </li>
            <li>
              <a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-semibold mb-6">Support</h3>
          <ul className="space-y-3">
            <li>
              <a href="#faq" className="text-white/70 hover:text-white transition-colors">FAQ</a>
            </li>
            <li>
              <a href="#guidelines" className="text-white/70 hover:text-white transition-colors">Guidelines</a>
            </li>
            <li>
              <a href="#terms" className="text-white/70 hover:text-white transition-colors">Terms & Conditions</a>
            </li>
            <li>
              <a href="#privacy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <p className="text-center text-white/50">
          © {new Date().getFullYear()} Takshashila. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
