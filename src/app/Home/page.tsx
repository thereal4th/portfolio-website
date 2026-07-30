"use client";

import { GithubIcon, LinkedinIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

type Page = 'home' | 'projects' | 'about' | 'contact';

interface HeroProps {
  setActivePage: (page: Page) => void;
}

const Home: React.FC<HeroProps> = ({ setActivePage }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-[85vh] flex flex-col justify-center max-w-6xl mx-auto px-6 lg:px-12 relative z-10"
    >
      
      {/* Top Elements: Profile & Tag */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
        
        {/* Profile Photo */}
        <div className="relative group cursor-default inline-block">
          <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-white/5 rounded-full blur-xl opacity-60 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-700"></div>
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/20 bg-[#030303] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <img
              src={`/myprofile.png`}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            />
          </div>
        </div>

        {/* Status Tag */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full spatial-card w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-white/70 uppercase">Available for new opportunities</span>
        </div>
      </motion.div>

      {/* Massive Typography Hero */}
      <div className="relative overflow-hidden py-2">
        <motion.h1 variants={textRevealVariants} className="text-5xl md:text-7xl lg:text-[7rem] font-extrabold tracking-tighter leading-[0.9] text-white">
          <span className="block opacity-90">{PORTFOLIO_DATA.name.split(' ')[0]}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white/90 via-white/50 to-white/20">
            {PORTFOLIO_DATA.name.split(' ')[1] || PORTFOLIO_DATA.role}
          </span>
        </motion.h1>
      </div>

      {/* Description & CTA */}
      <motion.div variants={itemVariants} className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
        <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-lg">
          I build <strong className="text-white font-medium">immersive digital experiences</strong>.
          <br className="hidden md:block" /> {PORTFOLIO_DATA.bio}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center md:justify-end gap-6">
          <div className="flex items-center gap-5 text-white/40">
            <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="https://github.com/thereal4th" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><GithubIcon className="w-6 h-6" /></motion.a>
            <motion.a whileHover={{ scale: 1.2, rotate: -5 }} href="https://linkedin.com/in/alfredo-venturina-0475b532a" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><LinkedinIcon className="w-6 h-6" /></motion.a>
            <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="https://mail.google.com/mail/?view=cm&fs=1&to=alfredoventurina@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Mail className="w-6 h-6" /></motion.a>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage('projects')}
            className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Explore Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* Abstract Design Element */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute right-[5%] top-[10%] w-64 h-64 md:w-96 md:h-96 pointer-events-none mix-blend-screen animate-ambient-1"
      >
        <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-white/10 animate-[spin_30s_linear_infinite_reverse]" />
        <div className="absolute inset-12 rounded-full border border-white/5 animate-[spin_40s_linear_infinite]" />
      </motion.div>
      
    </motion.div>
  )
};

export default Home;