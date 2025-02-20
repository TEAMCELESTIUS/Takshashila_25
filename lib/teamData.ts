export interface TeamMember {
    name: string;
    role: string;
    image: string;
    linkedin?: string;
    github?: string;
    social?: {
        platform: string;
        link: string;
    };
  }
  
  const teamData: TeamMember[] = [
    { name: "E KRISHNA SAKTHI ESWAR", role: "FRONTEND DEVELOPER", image: "/images/krishna.jpg", linkedin: "https://www.linkedin.com/in/krishna-s-4403b1290/", github: "https://github.com/KRISHNASAKTHIESWAR" },
    { name: "BHRAHMESH A", role: "FRONTEND DEVELOPER", image: "/images/bhrahmi.jpeg", linkedin: "https://www.linkedin.com/in/bhrahmesh-a-8a4766290/", github: "https://github.com/bhrahmesh/" },
    { name: "ADITHYA S", role: "BACKEND DEVELOPER", image: "/images/adithya.jpg", linkedin: "https://www.linkedin.com/in/adithyaa-saravanam/", github: "https://github.com/adithyaa-s" },
    { name: "AJAY BALAJI P", role: "HOSTING", image: "/images/ajay.jpeg", linkedin: "https://www.linkedin.com/in/ajay002/", github: "https://github.com/Ajaybalajiprasad" },
    { name: "ARUNKUMAR M", role: "BACKEND DEVELOPER", image: "/images/arun.jpg", linkedin: "https://www.linkedin.com/in/arunkumar2645s/", github: "https://github.com/arun-kumar-24" },
    { name: "MANISH BARATH", role: "BACKEND DEVELOPER", image: "/images/manish.jpeg", linkedin: "https://www.linkedin.com/in/manish-barath/", github: "https://github.com/ManishBarath" },
    { name: "AZIM MOHIDEEN N", role: "FRONTEND DEVELOPER", image: "/images/azim.jpg", linkedin: "https://www.linkedin.com/in/azim-mohideen-4a95b0293/", github: "https://github.com/AzimMohideen" },
    { name: "CHORKO C", role: "FRONTEND DEVELOPER", image: "/images/chorko.jpg", linkedin: "https://www.linkedin.com/in/chorko/", github: "https://github.com/Chorko" },
    { name: "GOKUL V", role: "APP DEVELOPER", image: "/images/gokul.jpg", linkedin: "https://www.linkedin.com/in/gokul-v-47878a311/",   },
    { name: "DHARUN PRAKASH S", role: "UI/UX DESIGNER", image: "/images/dharun1.png", linkedin: "https://www.linkedin.com/in/dharun-prakash-5ab7012a0/", github: "https://github.com/DUCTOU" },
    { name: "RAHUL R", role: "VIDEO EDITING", image: "/images/Rahul.jpg", social: { platform: "instagram", link: "https://www.instagram.com/rahul.r_27" } },
    { name: "ARJUN SV", role: "APP DEVELOPER", image: "/images/arjun.jpg", linkedin: "https://www.linkedin.com/in/arjun-s-v-6657a027a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
    { name: "NAFIA S", role: "VIDEO EDITING", image: "/images/nafia.jpg", social: { platform: "instagram", link: "https://www.instagram.com/naff__edits" } },
    { name: "SRIBATHRINATHAN R", role: "UI/UX DESIGNER", image: "/images/sri.jpg" },
    { name: "POONGGUNDRAAN S", role: "VIDEO EDITING", image: "/images/poo.png",  },

  ];
  
  export default teamData;