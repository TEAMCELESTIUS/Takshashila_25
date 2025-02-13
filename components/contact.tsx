import { FaInstagram, FaFacebookF, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const contactInfo = {
  email: "info@citchennai.net",
  phone: "+91 44-2628 9999",
  address: {
    line1: "Sarathy Nagar,",
    line2: "Kundrathur,",
    city: "Chennai, Tamil Nadu",
    pin: "PIN : 600069"
  },
  socials: [
    { icon: FaInstagram, link: "https://instagram.com/cit_chennai", label: "Instagram" },
    { icon: FaFacebookF, link: "https://facebook.com/CITChennai", label: "Facebook" },
    { icon: FaLinkedinIn, link: "https://linkedin.com/school/citchennai", label: "LinkedIn" }
  ]
};

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen bg-grey/50 bg-opacity-40 z-10 backdrop-blur-sm flex flex-col items-center justify-center py-16 px-4" data-scroll-section>
      <h1 className="text-5xl font-lexend text-white mb-16">Contact Us</h1>
      
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <a href={`mailto:${contactInfo.email}`} 
                className="flex items-center space-x-4 text-white hover:text-blue-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <FaEnvelope className="text-xl" />
                </div>
                <span className="text-lg">{contactInfo.email}</span>
              </a>
              
              <a href={`tel:${contactInfo.phone}`} 
                className="flex items-center space-x-4 text-white hover:text-blue-400 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <FaPhone className="text-xl" />
                </div>
                <span className="text-lg">{contactInfo.phone}</span>
              </a>
              
              <div className="flex items-start space-x-4 text-white">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mt-1">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg">{contactInfo.address.line1}</p>
                  <p className="text-lg">{contactInfo.address.line2}</p>
                  <p className="text-lg">{contactInfo.address.city}</p>
                  <p className="text-lg font-semibold">{contactInfo.address.pin}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-white/20">
              <h3 className="text-white text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {contactInfo.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="space-y-6">
          <div className="h-[400px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3652311741766!2d80.0755513!3d13.0196873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261c68e91e7c3%3A0x3a0be9851d46a41!2sChennai%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1647940434264!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white text-sm">
              Find us on the Sriperumbudur Main Road, easily accessible from both Chennai city and the industrial belt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;