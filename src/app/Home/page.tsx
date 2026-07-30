"use client";

import { GithubIcon, LinkedinIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { ArrowRight, Mail } from "lucide-react";

type Page = 'home' | 'projects' | 'about' | 'contact';

interface HeroProps {
  setActivePage: (page: Page) => void;
}

const Home: React.FC<HeroProps> = ({ setActivePage }) => {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
      
      {/* Top Tag */}
      <div className="flex items-center gap-3 mb-8 animate-in slide-in-from-bottom-8 duration-1000 delay-100">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full spatial-card">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-white/70 uppercase">Available for new opportunities</span>
        </div>
      </div>

      {/* Massive Typography Hero */}
      <div className="relative animate-in slide-in-from-bottom-12 duration-1000 delay-300">
        <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-extrabold tracking-tighter leading-[0.9] text-white">
          <span className="block opacity-90">{PORTFOLIO_DATA.name.split(' ')[0]}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white/90 via-white/50 to-white/20">
            {PORTFOLIO_DATA.name.split(' ')[1] || PORTFOLIO_DATA.role}
          </span>
        </h1>
      </div>

      {/* Description & CTA */}
      <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-end animate-in slide-in-from-bottom-12 duration-1000 delay-500">
        <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-lg">
          I build <strong className="text-white font-medium">immersive digital experiences</strong>.
          <br className="hidden md:block" /> {PORTFOLIO_DATA.bio}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center md:justify-end gap-6">
          <div className="flex items-center gap-5 text-white/40">
            <a href="https://github.com/thereal4th" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform"><GithubIcon className="w-6 h-6" /></a>
            <a href="https://linkedin.com/in/alfredo-venturina-0475b532a" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform"><LinkedinIcon className="w-6 h-6" /></a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alfredoventurina@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform"><Mail className="w-6 h-6" /></a>
          </div>
          
          <button 
            onClick={() => setActivePage('projects')}
            className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Explore Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Abstract Design Element */}
      <div className="absolute right-[5%] top-[10%] w-64 h-64 md:w-96 md:h-96 pointer-events-none opacity-50 mix-blend-screen animate-ambient-1 delay-1000">
        <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-white/10 animate-[spin_30s_linear_infinite_reverse]" />
        <div className="absolute inset-12 rounded-full border border-white/5 animate-[spin_40s_linear_infinite]" />
      </div>
      
    </div>
  )
};

export default Home;