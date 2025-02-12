import React from "react";
import teamData from "./teamData";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  github: string;
}

const Team: React.FC = () => {
  return (
    <section 
      className="min-h-screen py-20 relative" 
      data-scroll-section
      style={{
        backgroundImage: 'url("/Tkback2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Add an overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-cyan-400">Our Team</h2>
          <p className="text-lg text-gray-300 mt-2">Meet our talented team members</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamData.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, linkedin, github }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg group">
      {/* Image */}
      <div className="w-full h-72 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info Box */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4 text-center transform translate-y-full transition-transform duration-500 group-hover:translate-y-0">
        <h3 className="text-xl font-semibold text-cyan-400">{name}</h3>
        <p className="text-gray-300 text-sm mb-3">{role}</p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4">
          <a 
            href={linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 hover:text-cyan-400 transition-colors"
          >
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 hover:text-cyan-400 transition-colors"
          >
            <i className="fab fa-github fa-lg"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;