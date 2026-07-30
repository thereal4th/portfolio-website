"use client";

import { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { ChevronRight, Mail, Globe, ExternalLink, Terminal, RefreshCw, Command, Activity } from "lucide-react";
import { GitHubCalendar } from 'react-github-calendar';

type Page = 'home' | 'projects' | 'about' | 'contact';

interface HeroProps {
  setActivePage: (page: Page) => void;
}

interface JokeData {
  setup: string;
  punchline: string;
}

const Home: React.FC<HeroProps> = ({ setActivePage }) => {

  let isForHire = true;
  let isForHireClassName = isForHire ? "bg-[#3F5E46]" : "bg-[#C26344]"
  let isForHireText = isForHire ? "Available for hire" : "Not available for hire"
  let spotifyPlaylistID = "1ZqjTHeh9l4jz0KavDju8o"

  // --- API STATE ---
  const [joke, setJoke] = useState<JokeData | null>(null);
  const [loadingJoke, setLoadingJoke] = useState(true);

  // --- API FETCH FUNCTION ---
  const fetchJoke = async () => {
    setLoadingJoke(true);
    try {
      const res = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
      const data = await res.json();
      setJoke(data[0]); 
    } catch (error) {
      console.error("Failed to fetch joke", error);
    } finally {
      setLoadingJoke(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const calendarTheme = {
    light: ['#EAE2D3', '#C7D9B8', '#99C183', '#68A452', '#3F5E46'],
    dark: ['#EAE2D3', '#C7D9B8', '#99C183', '#68A452', '#3F5E46'], // Force light mode colors for calendar
  };

  return (
    <>
      {/* --- HERO SECTION --- */}
      <div className="min-h-screen flex items-center justify-center pt-16 relative overflow-visible z-10">

        <div className="max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
          
          <div className="mb-8 relative group cursor-default">
            <div className="absolute -inset-2 bg-gradient-to-br from-[#3F5E46]/20 to-[#C26344]/20 rounded-full blur-xl opacity-60 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-700"></div>
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white bg-white shadow-xl">
              <img
                src={`/myprofile.png`}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="mb-4 flex justify-center gap-8 text-[#2C3529]/60">
            <a href="https://github.com/thereal4th" target="_blank" rel="noopener noreferrer"><GithubIcon className="hover:text-[#3F5E46] cursor-pointer transition-colors" /></a>
            <a href="https://linkedin.com/in/alfredo-venturina-0475b532a" target="_blank" rel="noopener noreferrer"><LinkedinIcon className="hover:text-[#3F5E46] cursor-pointer transition-colors" /></a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=alfredoventurina@gmail.com" target="_blank" rel="noopener noreferrer"><Mail className="hover:text-[#3F5E46] cursor-pointer transition-colors" /></a>
          </div>

          <div className="inline-block mb-4 px-5 py-2 rounded-full bg-white border border-[#E6E1D6] shadow-sm">
            <span className="text-[#3F5E46] text-sm font-medium flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isForHireClassName} animate-pulse`} />
              {isForHireText}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#2C3529] mb-6 tracking-tight">
            Hi, I'm{' '}
            {/* animation wrapper*/}
            <span className="group relative inline-block overflow-hidden align-bottom cursor-pointer text-[#2C3529]">
              
              {/*(Slides Up) */}
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                {PORTFOLIO_DATA.name}.
              </span>

              {/* 2. Hover Text (Slides In) - Inherits font, overrides color */}
              <span className="absolute top-0 left-0 block w-full text-[#3F5E46] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0">
                4th.
              </span>
            </span>
            
            <span className="text-[#C26344] text-3xl md:text-5xl block mt-2 font-medium tracking-normal">
              {PORTFOLIO_DATA.role}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#2C3529]/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            {PORTFOLIO_DATA.bio}
          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center items-center mt-4">
            <button onClick={() => setActivePage('projects')} className="px-8 py-4 bg-[#3F5E46] hover:bg-[#2C3529] text-white rounded-2xl font-medium transition-all hover:scale-[1.02] flex items-center gap-2 shadow-[0_8px_20px_-5px_rgba(63,94,70,0.4)]">
              View Work <ChevronRight size={20} />
            </button>
            <button onClick={() => setActivePage('contact')} className="px-8 py-4 bg-white text-[#2C3529] border border-[#E6E1D6] rounded-2xl font-medium transition-all hover:bg-[#F4F0EA] hover:scale-[1.02] shadow-sm">
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* --- BENTO GRID SECTION --- */}
      <section className="py-15 px-6 max-w-6xl mx-auto">
        
        <h2 className="text-2xl font-bold text-[#2C3529] mb-8 flex items-center gap-2">
          <Terminal size={24} className="text-[#3F5E46]" />
          The Nitty Gritty
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: GitHub Contributions */}
          <div className="md:col-span-2 organic-card organic-card-hover p-8 relative group flex flex-col justify-center overflow-hidden bg-white">
            <div className="absolute top-0 right-0 p-5 opacity-50 group-hover:opacity-100 transition-opacity z-10">
              <a href="https://github.com/thereal4th" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 text-[#2C3529]/50 hover:text-[#3F5E46]" />
              </a>
            </div>
            <h3 className="text-[#2C3529] font-medium mb-6 flex items-center gap-2 text-lg"><GithubIcon className="w-5 h-5 text-[#3F5E46]" /> GitHub Activity</h3>
            <div className="w-full flex justify-center overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
               <GitHubCalendar username="thereal4th" colorScheme="light" theme={calendarTheme} blockSize={14} blockMargin={5} fontSize={12} labels={{ totalCount: '{{count}} contributions in the last year' }} />
            </div>
          </div>

          {/* Card 2: SYSTEM STATUS + JOKE (COMPACT VERSION) */}
          <div className="organic-card organic-card-hover p-6 flex flex-col gap-4 justify-between group bg-white">
            
            {/* Top Half: Terminal Status */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#2C3529] font-medium flex items-center gap-2 text-sm">
                  <Command size={14} className="text-[#C26344]" /> System Status
                </h3>
                <Activity size={14} className="text-[#3F5E46] animate-pulse" />
              </div>
              
              <div className="font-mono text-xs space-y-1 bg-[#F4F0EA] p-4 rounded-xl border border-[#E6E1D6]">
                <p className="text-[#2C3529]/60">
                  <span className="text-[#3F5E46]">➜</span>  ~ whoami
                </p>
                <p className="text-[#2C3529] pl-3">Alfredo '4th' V.</p>
                
                <p className="text-[#2C3529]/60 mt-3">
                  <span className="text-[#3F5E46]">➜</span>  ~ current-focus
                </p>
                <div className="pl-3 flex flex-col gap-0.5">
                   <span className="text-[#C26344]">▹ CI/CD</span>
                   <span className="text-[#C26344]">▹ DevOps</span>
                </div>
              </div>
            </div>

            {/* Bottom Half: API Data (The Joke) */}
            <div className="pt-4 border-t border-[#E6E1D6] mt-2">
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-[10px] font-bold text-[#2C3529]/50 uppercase tracking-wider">Funny Module</h3>
                 <button onClick={fetchJoke} disabled={loadingJoke} className="p-1.5 hover:bg-[#F4F0EA] rounded-full transition-colors">
                    <RefreshCw size={12} className={`text-[#3F5E46] ${loadingJoke ? 'animate-spin' : ''}`} />
                 </button>
               </div>
               
               <div className="text-xs text-[#2C3529]/70 min-h-[45px] font-medium">
                 {loadingJoke ? (
                   <span className="text-[#2C3529]/50 animate-pulse">Fetching joke...</span>
                 ) : joke ? (
                   <>
                    <p className="mb-1 leading-relaxed">"{joke.setup}"</p>
                    <p className="text-[#C26344] italic">{joke.punchline}</p>
                   </>
                 ) : (
                   <span className="text-red-500">Failed to load joke.</span>
                 )}
               </div>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="organic-card organic-card-hover p-6 relative overflow-hidden group bg-cover bg-center bg-no-repeat h-[180px]" style={{ backgroundImage: "url('/flag.png')" }}>
             <div className="absolute inset-0 bg-[#F4F0EA]/80 backdrop-blur-[4px] transition-all group-hover:bg-[#F4F0EA]/60 z-0" />
             <div className="relative z-10 flex flex-col justify-center h-full">
               <h3 className="text-[#2C3529]/60 text-sm font-medium mb-1">Based In</h3>
               <p className="text-2xl text-[#2C3529] font-bold flex items-center gap-2"><Globe size={22} className="text-[#3F5E46]" /> Manila, PH</p>
               <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E6E1D6] text-[#3F5E46] text-xs font-medium rounded-full w-fit shadow-sm">
                 <span className="w-2 h-2 bg-[#3F5E46] rounded-full animate-pulse"/> UTC+8
               </div>
             </div>
          </div>

          {/* Card 4: Spotify Embed */}
          <div className="md:col-span-2 organic-card organic-card-hover overflow-hidden h-[180px] p-0 flex items-center">
             <iframe style={{borderRadius: "32px"}} src={`https://open.spotify.com/embed/playlist/${spotifyPlaylistID}?utm_source=generator&theme=0`} width="100%" height="180" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="opacity-90 group-hover:opacity-100 transition-opacity duration-300 block scale-[1.01]"></iframe>
          </div>

        </div>
      </section>
    </>
  )
};

export default Home;