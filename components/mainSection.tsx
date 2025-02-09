import Image from "next/image";

const MainSection = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute flex items-center justify-center w-full h-full" data-scroll-section>
        <Image 
          src="/tk25-text.png" 
          alt="Takshashila Text" 
          width={600} 
          height={150} 
        />
      </div>
    </section>
  );
};

export default MainSection;
