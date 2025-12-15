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
  name: "Alfredo Venturina IV",
  nickname: "4th",
  role: "Full Stack Developer / Machine Learning Engineer",
  bio: "I love to create, design, and solve problems. Coding is an outlet for me to do what I love.",
  skills: [
    "Next.js", "React.js", "Node.js", "Express.js",
    "MongoDB", "PostgreSQL", "FastAPI", "Docker",
    "PyTorch", "Jupyter", "TypeScript", "Tailwind CSS"
  ],
  projects: [
    {
      title: "JobMatch.AI",
      thumbnail: "/image.png",
      description: "A simple web application that matches the user's resume to a json list of scraped jobs on the web. The app computes for the cosine similarity of the resume and job listings including their title and description, deployed on the Google cloud platform, the scraper updates the json list weekly.",
      tags: ["Next.js", "PyTorch", "FastAPI", "Docker", "Google Cloud Platform"],
      iconType: "Database",
      color: "from-blue-500/20 to-cyan-500/20",
      github: "https://github.com/mercadoCODING/training-arc",
      demo: "https://jobmatcherai.netlify.app"
    },
    {
      title: "Melanoma Classifier Mobile App",
      thumbnail: "/melanoma.png",
      description: "Mobile application that utilizes UNET segmentation and Convolutional Neural Networks to classifiy melanoma.",
      tags: ["React Native", "Express.js", "PyTorch", "FastAPI", "Supabase", "PostgreSQL"],
      iconType: "Cpu",
      color: "from-purple-500/20 to-pink-500/20",
      github: "https://github.com/thereal4th/Melanoma-Classification-Mobile-Application-complete-codebase-",
      demo: "https://drive.google.com/drive/folders/11qXqkxqIQx2SAvxU1_Ael771kvplCXPn?usp=sharing"
    },
    {
      title: "Property Management System",
      thumbnail: "/property manager.png",
      description: "A CI/CD enabled, property management system (work in progress)",
      tags: ["Next.js", "Express.js", "Github Actions", "Supabase"],
      iconType: "Globe",
      color: "from-green-500/20 to-emerald-500/20",
      github: "#",
    },

    {
      title: "Casa De Margarita Landing Page",
      thumbnail: "/casa de margarita.png",
      description: "One of the first websites I developed in 2022 using only vanilla Javascript, HTML, and CSS. Developed for a pool and events place Casa De Margarita.",
      tags: ["Javascript", "CSS", "HTML"],
      iconType: "Globe",
      color: "from-blue-500/20 to-cyan-500/20",
      github: "https://github.com/thereal4th/Casa-De-Margarita",
      demo: "https://casademargarita.netlify.app"
    },

    {
      title: "FashionMNIST Multiclass Classifier",
      thumbnail: "/fashionmnist.png",
      description: "OLD LEARNING PROJECT: Developed a wardrobe item classifier using the FashionMNIST dataset, PyTorch, and Matplotlib for visualization.",
      tags: ["PyTorch", "Jupyter", "Matplotlib"],
      iconType: "Cpu",
      color: "from-purple-500/20 to-pink-500/20",
      github: "https://github.com/thereal4th/FashionMNIST-multi-classifier.git"
    }
  ],
  experience: [
    { year: "2024", role: "Machine Learning Engineer", company: "Techstack", desc: "Developed the deep learning model and classification pipeline for our Thesis project." },
    { year: "2023", role: "Front End Developer", company: "Casa De Margarita", desc: "Developed a simple vanila javascript, html, and css landing page for Casa De Margarita, a pool and events place." },
    { year: "2022", role: "Programming Hobbyist", company: "", desc: "This was when I took up programming courses and started developing mini console projects." },
    { year: "2025", role: "Software Engineer Intern", company: "GlbalTek BPO INC.", desc: "Started a paid internship as a software engineer intern focusing on full stack web development with React, Next, and AWS."}
  ]
};

export default PORTFOLIO_DATA