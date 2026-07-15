export const site = {
  name: "Musfique Ahmed",
  shortName: "Musfique",
  role: ["AI Engineer", "Data Scientist", "Researcher", "Founder"],
  email: "musfique@example.com", // user to replace
  location: "Dhaka, Bangladesh",
  socials: {
    github: "https://github.com/musfique",
    linkedin: "https://linkedin.com/in/musfique",
    scholar: "https://scholar.google.com/citations?user=musfique",
    twitter: "https://twitter.com/musfique",
  },
  resumeUrl: "/resume.pdf",
  description:
    "AI Engineer, Data Scientist, and Researcher building production ML systems, publishing peer-reviewed work, and leading developer communities.",
  url: "https://musfique.dev",
  ogImage: "/og.png",
} as const;

export type Site = typeof site;