interface Project {
  title: string;
  description: string;
  tags: string[];
  iconType: 'Database' | 'Cpu' | 'Globe' | 'Code';
  color: string;
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
      description: "A comprehensive dashboard for online retailers with real-time analytics, inventory management, and order processing capabilities.",
      tags: ["Next.js", "Tailwind", "PostgreSQL", "Prisma"],
      iconType: "Database",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "AI Content Generator",
      description: "SaaS application utilizing OpenAI's API to help marketers generate SEO-optimized blog posts and social media captions.",
      tags: ["React", "Node.js", "OpenAI API", "Stripe"],
      iconType: "Cpu",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Global Travel App",
      description: "Interactive travel companion app featuring offline maps, itinerary planning, and local recommendations.",
      tags: ["React Native", "Firebase", "Google Maps"],
      iconType: "Globe",
      color: "from-green-500/20 to-emerald-500/20"
    }
  ],
  experience: [
    { year: "2024", role: "Machine Learning Intern", company: "Tech Lab", desc: "Experimented with PyTorch models for natural language processing tasks." },
    { year: "2023", role: "Full Stack Developer", company: "StartUp Galaxy", desc: "Developed key features for a high-growth SaaS product using React and Node.js." },
    { year: "2022", role: "Junior Developer", company: "Creative Agency", desc: "Built responsive marketing sites for clients using modern web technologies." }
  ]
};

export default PORTFOLIO_DATA