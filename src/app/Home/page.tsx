"use client";

import { GithubIcon, LinkedinIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { ChevronRight, Mail, Cpu, Globe, ExternalLink, Terminal } from "lucide-react";
import { GitHubCalendar } from 'react-github-calendar';

type Page = 'home' | 'projects' | 'about' | 'contact';

interface HeroProps {
  setActivePage: (page: Page) => void;
}

const Home: React.FC<HeroProps> = ({ setActivePage }) => {

  let isForHire = true;
  let isForHireClassName = isForHire ? "bg-green-400" : "bg-red-400"
  let isForHireText = isForHire ? "Available for hire" : "Not available for hire"

  const calendarTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: [
      '#334155', // Level 0
      '#065f46', // Level 1
      '#059669', // Level 2
      '#10b981', // Level 3
      '#34d399', // Level 4
    ],
  };

  return (
    <>
      {/* --- HERO SECTION --- */}
      <div className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
          
          {/* Profile Pic */}
          <div className="mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-800">
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${PORTFOLIO_DATA.nickname}&backgroundColor=b6e3f4`}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-center gap-8 text-slate-500">
            <a href="https://github.com/thereal4th" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="hover:text-white cursor-pointer transition-colors" />
            </a>
            <a href="https://linkedin.com/in/alfredo-venturina-0475b532a" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon className="hover:text-white cursor-pointer transition-colors" />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alfredoventurina@gmail.com" target="_blank" rel="noopener noreferrer">
              <Mail className="hover:text-white cursor-pointer transition-colors" />
            </a>
          </div>

          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <span className="text-blue-400 text-sm font-medium flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isForHireClassName} animate-pulse`} />
              {isForHireText}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Hi, I'm {PORTFOLIO_DATA.name}. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-3xl md:text-5xl block mt-2">
              {PORTFOLIO_DATA.role}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {PORTFOLIO_DATA.bio}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setActivePage('projects')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              View Work <ChevronRight size={20} />
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all border border-slate-700 hover:border-slate-600"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* --- BENTO GRID SECTION --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <Terminal size={24} className="text-blue-400" />
          The Nitty Gritty
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: GitHub Contributions */}
          <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors relative group flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity z-10">
              <a href="https://github.com/thereal4th" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 text-slate-400 hover:text-white" />
              </a>
            </div>
            
            <h3 className="text-slate-200 font-medium mb-4 flex items-center gap-2">
              <GithubIcon className="w-5 h-5 text-slate-500" />
              GitHub Activity
            </h3>

            <div className="w-full flex justify-center overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
               <GitHubCalendar 
                 username="thereal4th" 
                 colorScheme="dark"
                 theme={calendarTheme}
                 blockSize={12}
                 blockMargin={4}
                 fontSize={12}
                 labels={{
                   totalCount: '{{count}} contributions in the last year',
                 }}
               />
            </div>
          </div>

          {/* Card 2: Tech Stack */}
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-200 font-medium">Daily Drivers</h3>
              <Cpu size={20} className="text-purple-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'Python'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Location (UPDATED WITH IMAGE BACKGROUND) */}
          <div 
            className="border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors relative overflow-hidden group bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/flag.png')" }}
          >
             {/* Dark Overlay to ensure text readability over the flag image */}
             <div className="absolute inset-0 bg-slate-950/60 transition-opacity group-hover:bg-slate-950/40 z-0" />
             
             <div className="relative z-10">
               <h3 className="text-slate-400 text-sm font-medium mb-1">Based In</h3>
               <p className="text-xl text-white font-semibold flex items-center gap-2">
                 <Globe size={18} className="text-blue-400" />
                 Manila, PH
               </p>
               <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                 UTC+8
               </div>
             </div>
          </div>

          {/* Card 4: Spotify Embed (Functional) */}
          <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors overflow-hidden h-[152px]">
             <iframe 
                style={{borderRadius: "12px"}} 
                // REPLACE THIS ID WITH YOUR PLAYLIST ID
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="opacity-90 hover:opacity-100 transition-opacity block"
              ></iframe>
          </div>

        </div>
      </section>
    </>
  )
};

export default Home;