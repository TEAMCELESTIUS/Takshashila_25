export interface TeamMember {
    name: string;
    role: string;
    image: string;
    linkedin: string;
    github: string;
  }
  
  const teamData: TeamMember[] = [
    { name: "Soshiv Kumar", role: "Web Developer", image: "/team_1.jpg", linkedin: "#", github: "#" },
    { name: "Bijli Sharma", role: "Web Developer", image: "/team_2.png", linkedin: "#", github: "#" },
    { name: "Birpal Singh", role: "Web Developer", image: "/team_3.jpg", linkedin: "#", github: "#" },
    { name: "Team Member 4", role: "Web Developer", image: "/team_4.jpg", linkedin: "#", github: "#" },
    { name: "Team Member 5", role: "Web Developer", image: "/team_5.jpg", linkedin: "#", github: "#" },
    { name: "Team Member 6", role: "Web Developer", image: "/team_6.jpg", linkedin: "#", github: "#" }
  ];
  
  export default teamData;