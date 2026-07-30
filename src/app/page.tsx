'use client'

import React, { useState, useEffect} from 'react';

import Navigation from '../components/Navigation';
import About from './About/page';
import Home from './Home/page';
import Projects from './Projects/page';
import Contact from './Contact/page';
import ChatWidget from '../components/Chatwidget';

// --- TYPES ---

type Page = 'home' | 'projects' | 'about' | 'contact';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#3F5E46]/20 selection:text-[#3F5E46] font-sans relative overflow-hidden">
      
      {/* Soft Organic Background Elements */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[40rem] h-[40rem] bg-[#EAE2D3]/60 rounded-[40%_60%_70%_30%] filter blur-[80px] animate-float" />
        <div className="absolute top-[15%] right-[-5%] w-[35rem] h-[35rem] bg-[#D0D7CC]/40 rounded-[60%_40%_30%_70%] filter blur-[80px] animate-float animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[15%] w-[45rem] h-[45rem] bg-[#F2DDD7]/40 rounded-[50%_50%_60%_40%] filter blur-[100px] animate-float animation-delay-4000" />
      </div>

      <div className="relative z-10">
        <Navigation activePage={activePage} setActivePage={setActivePage} isScrolled={isScrolled} />
        
        <main className="transition-opacity duration-500 ease-in-out">
          
          <div className={activePage === 'home' ? 'block animate-in fade-in duration-700' : 'hidden'}>
             <Home setActivePage={setActivePage} />
          </div>
          
          {activePage === 'projects' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Projects />
            </div>
          )}
          
          {activePage === 'about' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <About />
            </div>
          )}
          
          {activePage === 'contact' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Contact />
            </div>
          )}
        </main>

        {/* Floating Chat Widget on all pages*/}
        <ChatWidget />
      </div>
    </div>
  );
};

export default App;