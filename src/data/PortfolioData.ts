interface Project {
  title: string;
  thumbnail: string;
  description: string;
  tags: string[];
  iconType: 'Database' | 'Cpu' | 'Globe' | 'Code';
  color: string;
  github: string;
  demo?: string;
}

interface Experience {
  year: string;
  role: string;
  company: string;
  desc: string;
}

interface PortfolioData {
  name: string;
  nickname: string;
  role: string;
  bio: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
}

// --- DATA ---

const PORTFOLIO_DATA: PortfolioData = {
  name: "Alfredo C. Venturina IV",
  nickname: "4th",
  role: "Full Stack Developer / Machine Learning Engineer",
  bio: "I love to create, design, and solve problems. Coding is an outlet for me to do what I love.",
  skills: [
    "Next.js", "React.js", "Node.js", "Express.js",
    "MongoDB", "PostgreSQL", "FastAPI", "Django",
    "PyTorch", "Jupyter", "TypeScript", "Tailwind CSS"
  ],
  projects: [
    {
      title: "E-Commerce Dashboard",
      thumbnail: "/image.png",
      description: "A comprehensive dashboard for online retailers with real-time analytics, inventory management, and order processing capabilities.",
      tags: ["Next.js", "Tailwind", "PostgreSQL", "Prisma"],
      iconType: "Database",
      color: "from-blue-500/20 to-cyan-500/20",
      github: "#",
      demo: "#"
    },
    {
      title: "AI Content Generator",
      thumbnail: "/image.png",
      description: "SaaS application utilizing OpenAI's API to help marketers generate SEO-optimized blog posts and social media captions.",
      tags: ["React", "Node.js", "OpenAI API", "Stripe"],
      iconType: "Cpu",
      color: "from-purple-500/20 to-pink-500/20",
      github: "#",
      demo: "#"
    },
    {
      title: "Global Travel App",
      thumbnail: "/image.png",
      description: "Interactive travel companion app featuring offline maps, itinerary planning, and local recommendations.",
      tags: ["React Native", "Firebase", "Google Maps"],
      iconType: "Globe",
      color: "from-green-500/20 to-emerald-500/20",
      github: "#",
      demo: "#"
    }
  ],
  experience: [
    { year: "2024", role: "Machine Learning Engineer", company: "Techstack", desc: "Developed the deep learning model and classification pipeline for our Thesis project." },
    { year: "2023", role: "Front End Developer", company: "Casa De Margarita", desc: "Developed a simple vanila javascript, html, and css landing page for Casa De Margarita, a pool and events place." },
    { year: "2022", role: "Programming Hobbyist", company: "", desc: "This was when I took up programming courses and started developing mini console projects." }
  ]
};

export default PORTFOLIO_DATA