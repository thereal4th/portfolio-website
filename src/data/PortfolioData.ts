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
  aboutMe: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
}

// --- DATA ---

const PORTFOLIO_DATA: PortfolioData = {
  name: "Alfredo Venturina IV",
  nickname: "4th",
  role: "Full Stack Developer",
  bio: "I love to create, design, and solve problems. Coding is another outlet for me to do what I love.",
  aboutMe: "I love engineering and solving problems. I enjoy the small details and intricacies of software development. I utilize AI for efficiency, but I believe that the best way to learn is to do it yourself.",
  skills: [
    "Next.js", "React.js", "Node.js", "Express.js",
    "MongoDB", "PostgreSQL", "FastAPI", "Docker",
    "Python", "TypeScript", "Tailwind CSS"
  ],
  projects: [
    {
      title: "Arsenal",
      thumbnail: "/arsenal.png",
      description: "MMA and BJJ note taking app that has a visual mannequin editor to save techniques, and a graph based note taking system to connect techniques together into systems.",
      tags: ["React", "Visual Editor", "Graph Systems", "MongoDB", "Next.js", "TypeScript"],
      iconType: "Code",
      color: "from-blue-500/20 to-cyan-500/20",
      github: "https://github.com/thereal4th/Arsenal",
      //demo: "#"
    },
    {
      title: "Quizzy",
      thumbnail: "/quizzy.png",
      description: "A multiplayer quiz platform that allows users to create quizzes via json template or through the UI. The multiplayer lobby is hosted by a websocket server with proper authentication and fault tolerance.",
      tags: ["WebSockets", "Node.js", "React", "Next.js", "MongoDB", "TypeScript"],
      iconType: "Globe",
      color: "from-purple-500/20 to-pink-500/20",
      github: "https://github.com/thereal4th/QuizForge",
      demo: "https://drive.google.com/file/d/1AInRmduSEyUn7DDmMj1GFBS_lyV1jkmW/view?usp=sharing"
    },
    {
      title: "Melanoma Classifier Mobile App",
      thumbnail: "/melanoma.png",
      description: "Mobile application that utilizes UNET segmentation and Convolutional Neural Networks to classifiy melanoma.",
      tags: ["React Native", "Express.js", "PyTorch", "FastAPI", "Supabase", "PostgreSQL", "TypeScript", "Python"],
      iconType: "Cpu",
      color: "from-purple-500/20 to-pink-500/20",
      github: "https://github.com/thereal4th/Melanoma-Classification-Mobile-Application-complete-codebase-",
      demo: "https://drive.google.com/drive/folders/11qXqkxqIQx2SAvxU1_Ael771kvplCXPn?usp=sharing"
    },
    {
      title: "Car Rental Application",
      thumbnail: "/delscarrentals.png",
      description: "This is a car rental system built for a US client. It calculates prices, delivery fees, automated emails, etc. The complete production codebase is in a private repository owned by the client.",
      tags: ["Freelance", "Web App", "Production", "Next.js", "MongoDB", "Resend API"],
      iconType: "Globe",
      color: "from-emerald-500/20 to-teal-500/20",
      github: "https://github.com/thereal4th/dels-car-rental-app",
    },
    {
      title: "MRT Application",
      thumbnail: "/mrtapp.png",
      description: "A learning project for MRT price calculation and passenger utility application.",
      tags: ["Learning Project", "Next.js", "TypeScript", "Tailwind CSS"],
      iconType: "Cpu",
      color: "from-green-500/20 to-emerald-500/20",
      github: "https://github.com/thereal4th/MRT-system-web-app",
    },
    {
      title: "Gastos",
      thumbnail: "/gastos.png",
      description: "A learning project for gas prices calculation and calculating the nearest + cheapest gas prices along a planned travel route.",
      tags: ["Learning Project", "Next.js", "Utility", "Firebase"],
      iconType: "Globe",
      color: "from-blue-500/20 to-cyan-500/20",
      github: "https://github.com/alfagamez22/codekadahackathon",
      demo: "https://drive.google.com/file/d/1dpPzpCXc8yhmXBfTF4QvutwE_QaFSjXm/view?usp=sharing",
    },
    {
      title: "JobMatch.AI",
      thumbnail: "/image.png",
      description: "A simple web application that matches the user's resume to a json list of scraped jobs on the web. The app computes for the cosine similarity of the resume and job listings including their title and description, deployed on the Google cloud platform, the scraper updates the json list weekly.",
      tags: ["Next.js", "PyTorch", "FastAPI", "Docker", "Google Cloud Platform"],
      iconType: "Database",
      color: "from-blue-500/20 to-cyan-500/20",
      github: "https://github.com/mercadoCODING/training-arc",
    },
    {
      title: "Casa De Margarita Landing Page",
      thumbnail: "/casa de margarita.png",
      description: "One of the first websites I developed in 2022 using only vanilla Javascript, HTML, and CSS. Developed for a pool and events place Casa De Margarita.",
      tags: ["Javascript", "CSS", "HTML", "Freelance"],
      iconType: "Globe",
      color: "from-blue-500/20 to-cyan-500/20",
      github: "https://github.com/thereal4th/Casa-De-Margarita",
      demo: "https://casademargarita.netlify.app"
    },
    {
      title: "FashionMNIST Multiclass Classifier",
      thumbnail: "/fashionmnist.png",
      description: "OLD LEARNING PROJECT: Developed a wardrobe item classifier using the FashionMNIST dataset, PyTorch, and Matplotlib for visualization.",
      tags: ["PyTorch", "Jupyter", "Matplotlib", "Python"],
      iconType: "Cpu",
      color: "from-purple-500/20 to-pink-500/20",
      github: "https://github.com/thereal4th/FashionMNIST-multi-classifier.git"
    },
    {
      title: "Property Management System",
      thumbnail: "/property manager.png",
      description: "A CI/CD enabled, property management system (work in progress)",
      tags: ["Next.js", "Express.js", "Github Actions", "Supabase", "Javascript"],
      iconType: "Globe",
      color: "from-green-500/20 to-emerald-500/20",
      github: "#",
    },
  ],
  experience: [
    { year: "2025-2026", role: "Software Engineer Intern", company: "GlobalTek BPO INC.", desc: "GlobalTek serves as the Philippine Software Development team for Trajector Medical, a US-based company. Working as a paid software engineer intern focusing on full stack web development with React, Next, and AWS."},
    { year: "2024", role: "Machine Learning Engineer", company: "Techstack", desc: "Developed the deep learning model and classification pipeline for our Thesis project. Built a CNN from scratch, and retrained a UNET segmentation model to segment melanoma images." },
    { year: "2024", role: "Freelance Developer", company: "Del's Car Rentals", desc: "Built a working car rental web app for a US client with proper authentication, delivery calculation, price computation, automated emails, etc." },
    { year: "2023", role: "Freelance Developer", company: "Casa De Margarita", desc: "Developed a simple vanila javascript, html, and css landing page for Casa De Margarita, a pool and events place." },
    { year: "2022", role: "Computer Science Student", company: "FEU TECH", desc: "This is where I started taking programming seriously, enrolled into a university, and really started studying algorithmic problems and software design principles." },
    { year: "2020", role: "Programming Hobbyist", company: "", desc: "My first time learning about programming, I took up python and built a discord bot using discord.py. It was a simple utility bot that helped me manage my discord server with friends."}
  ]
};

export default PORTFOLIO_DATA