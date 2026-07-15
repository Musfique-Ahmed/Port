export const site = {
  name: "Musfique Ahmed",
  shortName: "Musfique",
  role: ["AI Engineer", "Data Scientist", "Researcher", "Founder"],
  email: "anikmushfik@gmail.com",
  phone: "+880 1961-905838",
  location: "Dhaka, Bangladesh",
  socials: {
    github: "https://github.com/Musfique-Ahmed",
    linkedin: "https://www.linkedin.com/in/musfique-ahmed-ds/",
    portfolio: "https://musfique-ahmed.github.io/portfolio/",
    scholar: "https://scholar.google.com/citations?user=musfique",
    twitter: "https://twitter.com/musfique",
  },
  resumeUrl: "/resume.pdf",
  description:
    "AI Engineer, Data Scientist, and Researcher building production ML systems, publishing peer-reviewed work, and leading developer communities.",
  url: "https://musfique-ahmed.github.io/portfolio/",
  ogImage: "/og.png",
} as const;

export type Site = typeof site;