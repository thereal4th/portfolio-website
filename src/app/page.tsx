'use client'

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useMotionTemplate, Variants } from 'framer-motion';

import Navigation from '../components/Navigation';
import About from './About/page';
import Home from './Home/page';
import Projects from './Projects/page';
import Contact from './Contact/page';
import ChatWidget from '../components/Chatwidget';
import CustomCursor from '../components/CustomCursor';

type Page = 'home' | 'projects' | 'about' | 'contact';
export type Theme = 'light' | 'dark';

const BackgroundGeometry = () => {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 2000], [0, -800]);
  const rotate1 = useTransform(scrollY, [0, 2000], [0, 360]);

  const y2 = useTransform(scrollY, [0, 2000], [0, 1000]);
  const rotate2 = useTransform(scrollY, [0, 2000], [45, -720]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-70">
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[20%] left-[5%] w-64 h-64 border-2 border-blue-200/50 dark:border-cyan-500/30 rounded-3xl dark:drop-shadow-[0_0_50px_rgba(0,255,255,0.3)]"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[50%] right-[5%] w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[170px] border-b-indigo-200/50 dark:border-b-fuchsia-500/30 dark:drop-shadow-[0_0_50px_rgba(255,0,255,0.3)]"
      />
    </div>
  );
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [theme, setTheme] = useState<Theme>('light');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Add or remove dark class on HTML element based on theme
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const pageVariants: Variants = {
    initial: { opacity: 0, y: 60, scale: 0.98, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
    exit: { opacity: 0, y: -60, scale: 0.98, filter: 'blur(10px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };
  
  const spotlightTransform = useMotionTemplate`translate(calc(${mouseX}px - 500px), calc(${mouseY}px - 500px))`;

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-black text-gray-900 dark:text-[#FAFAFA] font-sans relative overflow-hidden selection:bg-blue-500/20 dark:selection:bg-cyan-500/30 selection:text-blue-900 dark:selection:text-cyan-100 transition-colors duration-500">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Perspective Grid */}
        <div className="absolute inset-0 bg-perspective-grid mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-20" />
        
        {/* Soft Mouse Spotlight (Light) / Intense Spotlight (Dark) */}
        <motion.div 
          className="absolute w-[1000px] h-[1000px] rounded-full transition-transform duration-500 ease-out pointer-events-none mix-blend-multiply dark:mix-blend-normal"
          style={{ 
            background: theme === 'dark' 
              ? 'radial-gradient(circle, rgba(0,255,255,0.15) 0%, rgba(255,0,255,0.1) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)',
            transform: spotlightTransform 
          }}
        />
        
        {/* Ambient Orbs */}
        <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vh] bg-blue-200/40 dark:bg-cyan-500/20 rounded-full blur-[150px] animate-ambient-1 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[70vw] h-[70vh] bg-indigo-200/40 dark:bg-fuchsia-600/20 rounded-full blur-[150px] animate-ambient-2 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[30%] right-[30%] w-[60vw] h-[60vh] bg-violet-200/40 dark:bg-blue-600/20 rounded-full blur-[150px] animate-ambient-3 mix-blend-multiply dark:mix-blend-screen" />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.4] dark:opacity-30 mix-blend-overlay"></div>
      </div>

      <BackgroundGeometry />

      <div className="relative z-10">
        <main className="pb-32 pt-16 px-4 md:px-0 min-h-screen perspective-[1000px]">
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="transform-style-3d">
                <Home setActivePage={setActivePage} />
              </motion.div>
            )}
            
            {activePage === 'projects' && (
              <motion.div key="projects" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="transform-style-3d">
                <Projects />
              </motion.div>
            )}
            
            {activePage === 'about' && (
              <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="transform-style-3d">
                <About />
              </motion.div>
            )}
            
            {activePage === 'contact' && (
              <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="transform-style-3d">
                <Contact />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Navigation activePage={activePage} setActivePage={setActivePage} theme={theme} setTheme={setTheme} />
        
        <ChatWidget />
        <CustomCursor />
      </div>
    </div>
  );
};

export default App;