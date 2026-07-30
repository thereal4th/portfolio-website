'use client'

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Navigation from '../components/Navigation';
import About from './About/page';
import Home from './Home/page';
import Projects from './Projects/page';
import Contact from './Contact/page';
import ChatWidget from '../components/Chatwidget';

type Page = 'home' | 'projects' | 'about' | 'contact';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const pageVariants = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#FAFAFA] font-sans relative overflow-hidden selection:bg-white/20">
      
      {/* Spatial Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Mouse Glow */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-[120px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)` }}
        />
        
        {/* Animated Aurora Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] bg-emerald-500/10 rounded-full blur-[120px] animate-ambient-1 mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-blue-600/10 rounded-full blur-[100px] animate-ambient-2 mix-blend-screen" />
        <div className="absolute top-[20%] right-[20%] w-[40vw] h-[40vh] bg-purple-500/10 rounded-full blur-[100px] animate-ambient-3 mix-blend-screen" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10">
        <main className="pb-32 pt-16 px-4 md:px-0 min-h-screen">
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Home setActivePage={setActivePage} />
              </motion.div>
            )}
            
            {activePage === 'projects' && (
              <motion.div key="projects" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Projects />
              </motion.div>
            )}
            
            {activePage === 'about' && (
              <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <About />
              </motion.div>
            )}
            
            {activePage === 'contact' && (
              <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Contact />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Spatial Dock Navigation */}
        <Navigation activePage={activePage} setActivePage={setActivePage} />
        
        <ChatWidget />
      </div>
    </div>
  );
};

export default App;