'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, type MotionValue } from 'framer-motion';
import dynamic from 'next/dynamic';

import Navigation from '../components/Navigation';
import Home from './Home/page';
import ChatWidget from '../components/Chatwidget';
import CustomCursor from '../components/CustomCursor';

const Projects = dynamic(() => import('./Projects/page'));
const About = dynamic(() => import('./About/page'));
const Contact = dynamic(() => import('./Contact/page'));

type Page = 'home' | 'projects' | 'about' | 'contact';
export type Theme = 'light' | 'dark';

const pageOrder: Page[] = ['home', 'projects', 'about', 'contact'];

const BackgroundGeometry = ({ scrollYProgress }: { scrollYProgress: import('framer-motion').MotionValue<number> }) => {

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -2000]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 720]);

  const y2 = useTransform(scrollYProgress, [0, 1], [0, 2500]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [45, -1080]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-70">
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[20%] left-[5%] w-64 h-64 border-2 border-blue-200/50 dark:border-cyan-500/30 rounded-3xl dark:drop-shadow-[0_0_50px_rgba(0,255,255,0.3)] will-change-transform"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[50%] right-[5%] w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[170px] border-b-indigo-200/50 dark:border-b-fuchsia-500/30 dark:drop-shadow-[0_0_50px_rgba(255,0,255,0.3)] will-change-transform"
      />
    </div>
  );
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [theme, setTheme] = useState<Theme>('light');
  
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActivePage(entry.target.id as Page);
        }
      });
    }, { threshold: 0.3 });

    pageOrder.forEach((page) => {
      const el = document.getElementById(page);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const goToPage = useCallback((page: Page) => {
    const el = document.getElementById(page);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const spotlightTransform = useMotionTemplate`translate(calc(${mouseX}px - 500px), calc(${mouseY}px - 500px))`;

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] dark:bg-black text-gray-900 dark:text-[#FAFAFA] font-sans relative selection:bg-blue-500/20 dark:selection:bg-cyan-500/30 selection:text-blue-900 dark:selection:text-cyan-100 transition-colors duration-500">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Perspective Grid */}
        <div className="absolute inset-0 bg-perspective-grid mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-20" />
        
        {/* Soft Mouse Spotlight (Light) / Intense Spotlight (Dark) */}
        <motion.div 
          className="absolute w-[1000px] h-[1000px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-normal will-change-transform"
          style={{ 
            background: theme === 'dark' 
              ? 'radial-gradient(circle, rgba(0,255,255,0.15) 0%, rgba(255,0,255,0.1) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)',
            transform: spotlightTransform 
          }}
        />
        
        {/* Ambient Orbs - Optimized without expensive CSS blur */}
        <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vh] rounded-full animate-ambient-1 mix-blend-multiply dark:hidden" style={{ background: 'radial-gradient(circle, rgba(191, 219, 254, 0.4) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[-20%] right-[-20%] w-[70vw] h-[70vh] rounded-full animate-ambient-2 mix-blend-multiply dark:hidden" style={{ background: 'radial-gradient(circle, rgba(199, 210, 254, 0.4) 0%, transparent 60%)' }} />
        <div className="absolute top-[30%] right-[30%] w-[60vw] h-[60vh] rounded-full animate-ambient-3 mix-blend-multiply dark:hidden" style={{ background: 'radial-gradient(circle, rgba(221, 214, 254, 0.4) 0%, transparent 60%)' }} />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.4] dark:opacity-30 mix-blend-overlay"></div>
      </div>

      <BackgroundGeometry scrollYProgress={scrollYProgress} />

      <div className="relative z-10 w-full">
        <main className="w-full flex flex-col">
          <section id="home" className="min-h-screen flex flex-col justify-center border-b border-gray-200/50 dark:border-white/10">
            <Home setActivePage={goToPage} scrollYProgress={scrollYProgress} />
          </section>
          
          <section id="projects" className="min-h-screen pt-20 pb-20 border-b border-gray-200/50 dark:border-white/10">
            <Projects />
          </section>

          <section id="about" className="min-h-screen pt-20 pb-20 border-b border-gray-200/50 dark:border-white/10">
            <About />
          </section>

          <section id="contact" className="min-h-screen pt-20 flex flex-col justify-center">
            <Contact />
          </section>
        </main>

        <Navigation activePage={activePage} setActivePage={goToPage} theme={theme} setTheme={setTheme} />
        
        <ChatWidget />
        <CustomCursor />
      </div>
    </div>
  );
};

export default App;