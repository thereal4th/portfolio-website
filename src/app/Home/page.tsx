"use client";

import { GithubIcon, LinkedinIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { ArrowRight, Mail } from "lucide-react";
import { motion, useScroll, useTransform, Variants, useMotionValue } from "framer-motion";
import MagneticElement from "@/src/components/MagneticElement";

type Page = 'home' | 'projects' | 'about' | 'contact';

interface HeroProps {
  setActivePage?: (page: Page) => void;
  scrollYProgress?: import('framer-motion').MotionValue<number>;
}

const LetterPullUp = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const letters = text.split("");
  return (
    <div className="flex">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: 100, opacity: 0, rotate: 20 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 200,
            delay: delay + i * 0.05,
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};

const Home: React.FC<HeroProps> = ({ setActivePage, scrollYProgress }) => {
  const fallbackScrollYProgress = useMotionValue(0);
  const activeScroll = scrollYProgress || fallbackScrollYProgress;
  const marqueeX = useTransform(activeScroll, [0, 1], [0, -2000]);
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: "blur(20px)", scale: 0.8 },
    show: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { type: "spring", damping: 20, stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen flex flex-col justify-center relative z-10 pt-20"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full">
        {/* Massive Typography Hero */}
        <div className="relative py-2 flex flex-col gap-2">
          <div className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-[0.85] text-gray-900 dark:text-white">
            <LetterPullUp text={PORTFOLIO_DATA.name.split(' ')[0]} delay={0.2} />
          </div>
          <div className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-cyan-400 dark:via-fuchsia-500 dark:to-yellow-400 dark:animate-pulse">
            <LetterPullUp text={PORTFOLIO_DATA.name.split(' ')[1] || PORTFOLIO_DATA.role} delay={0.6} />
          </div>
        </div>

        {/* Description & CTA */}
        <motion.div variants={itemVariants} className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          <p className="text-xl md:text-3xl text-gray-500 dark:text-white/70 font-light leading-relaxed max-w-lg">
            I build <strong className="text-gray-900 dark:text-white font-black dark:text-glow-intense">immersive digital experiences</strong>.
            <br className="hidden md:block" /> {PORTFOLIO_DATA.bio}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center md:justify-end gap-8">
            <div className="flex items-center gap-6 text-gray-400 dark:text-white/50">
              <MagneticElement><a href="https://github.com/thereal4th" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-cyan-400 dark:hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.8)] transition-all block p-2"><GithubIcon className="w-8 h-8" /></a></MagneticElement>
              <MagneticElement><a href="https://linkedin.com/in/alfredo-venturina-0475b532a" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-fuchsia-400 dark:hover:drop-shadow-[0_0_20px_rgba(255,0,255,0.8)] transition-all block p-2"><LinkedinIcon className="w-8 h-8" /></a></MagneticElement>
              <MagneticElement><a href="https://mail.google.com/mail/?view=cm&fs=1&to=alfredoventurina@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 dark:hover:text-yellow-400 dark:hover:drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] transition-all block p-2"><Mail className="w-8 h-8" /></a></MagneticElement>
            </div>
            
            <MagneticElement>
              <button 
                onClick={() => setActivePage?.('projects')}
                className="group flex items-center gap-3 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-black text-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:bg-black dark:hover:bg-black dark:hover:text-white dark:hover:border dark:hover:border-white hover:scale-105 transition-all"
              >
                EXPLORE WORK
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </MagneticElement>
          </div>
        </motion.div>
      </div>

      {/* Massive Scroll Marquee */}
      <div className="mt-32 pb-10 overflow-hidden w-full select-none pointer-events-none border-y border-gray-200 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md">
        <motion.div style={{ x: marqueeX }} className="flex whitespace-nowrap">
          <h2 className="text-[15vw] font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-violet-600/10 dark:from-cyan-500/50 dark:via-fuchsia-500/50 dark:to-yellow-500/50">
            {PORTFOLIO_DATA.role} {PORTFOLIO_DATA.role}
          </h2>
        </motion.div>
      </div>
      
    </motion.div>
  )
};

export default Home;