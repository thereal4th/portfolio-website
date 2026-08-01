'use client'

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useMotionTemplate, Variants } from 'framer-motion';
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
  const [direction, setDirection] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const overscrollDelta = useRef(0);
  const globalScrollYProgress = useMotionValue(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    const progress = scrollHeight > 0 ? target.scrollTop / scrollHeight : 0;
    globalScrollYProgress.set(progress);
  };

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
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const container = document.getElementById('active-scroll-container');
      if (!container) return;

      const currentIndex = pageOrder.indexOf(activePage);
      
      const progress = globalScrollYProgress.get();
      const isAtBottom = progress >= 0.99;
      const isAtTop = progress <= 0.01;

      // Accumulate scroll intent if we are hitting a boundary
      if (e.deltaY > 0 && isAtBottom) {
        overscrollDelta.current += e.deltaY;
      } else if (e.deltaY < 0 && isAtTop) {
        overscrollDelta.current += e.deltaY; // will be negative
      } else {
        // Reset if we are scrolling normally in the middle of the container
        overscrollDelta.current = 0;
      }

      // Threshold required to trigger page transition (prevents accidental jumps)
      const OVERSCROLL_THRESHOLD = 150;

      if (overscrollDelta.current > OVERSCROLL_THRESHOLD && currentIndex < pageOrder.length - 1) {
        setDirection(1);
        setActivePage(pageOrder[currentIndex + 1]);
        overscrollDelta.current = 0;
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 1200);
      } else if (overscrollDelta.current < -OVERSCROLL_THRESHOLD && currentIndex > 0) {
        setDirection(-1);
        setActivePage(pageOrder[currentIndex - 1]);
        overscrollDelta.current = 0;
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 1200);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activePage, isScrolling]);

  const handleNavClick = (page: Page) => {
    const currentIndex = pageOrder.indexOf(activePage);
    const targetIndex = pageOrder.indexOf(page);
    if (currentIndex === targetIndex) return;
    
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setActivePage(page);
  };

  const pageVariants: Variants = {
    initial: (dir: number) => ({
      y: dir === 1 ? '50%' : '-100%',
      scale: dir === 1 ? 0.8 : 1,
      opacity: 0,
      zIndex: dir === 1 ? 1 : 10
    }),
    animate: {
      y: '0%',
      scale: 1,
      opacity: 1,
      zIndex: 5,
      transition: { type: 'spring', stiffness: 70, damping: 20, mass: 1 }
    },
    exit: (dir: number) => ({
      y: dir === 1 ? '-100%' : '50%',
      scale: dir === 1 ? 1 : 0.8,
      opacity: dir === 1 ? 1 : 0,
      zIndex: dir === 1 ? 10 : 1,
      transition: { type: 'spring', stiffness: 70, damping: 20, mass: 1 }
    })
  };

  const spotlightTransform = useMotionTemplate`translate(calc(${mouseX}px - 500px), calc(${mouseY}px - 500px))`;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F9FAFB] dark:bg-black text-gray-900 dark:text-[#FAFAFA] font-sans relative selection:bg-blue-500/20 dark:selection:bg-cyan-500/30 selection:text-blue-900 dark:selection:text-cyan-100 transition-colors duration-500">
      
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

      <BackgroundGeometry scrollYProgress={globalScrollYProgress} />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <main className="w-full h-full relative perspective-[2000px]">
          <AnimatePresence custom={direction} mode="sync">
            {activePage === 'home' && (
              <motion.div 
                id="active-scroll-container"
                key="home" 
                custom={direction}
                variants={pageVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                onScroll={handleScroll}
                className="absolute inset-0 w-full h-full bg-transparent rounded-b-[40px] border-b border-gray-200/50 dark:border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-y-auto scroll-smooth"
              >
                <div className="min-h-full flex flex-col justify-center">
                  <Home setActivePage={handleNavClick} scrollYProgress={globalScrollYProgress} />
                </div>
              </motion.div>
            )}
            
            {activePage === 'projects' && (
              <motion.div 
                id="active-scroll-container"
                key="projects" 
                custom={direction}
                variants={pageVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                onScroll={handleScroll}
                className="absolute inset-0 w-full h-full bg-transparent rounded-b-[40px] border-b border-gray-200/50 dark:border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-y-auto scroll-smooth pt-20"
              >
                <Projects />
              </motion.div>
            )}
            
            {activePage === 'about' && (
              <motion.div 
                id="active-scroll-container"
                key="about" 
                custom={direction}
                variants={pageVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                onScroll={handleScroll}
                className="absolute inset-0 w-full h-full bg-transparent rounded-b-[40px] border-b border-gray-200/50 dark:border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-y-auto scroll-smooth pt-20"
              >
                <About />
              </motion.div>
            )}
            
            {activePage === 'contact' && (
              <motion.div 
                id="active-scroll-container"
                key="contact" 
                custom={direction}
                variants={pageVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                onScroll={handleScroll}
                className="absolute inset-0 w-full h-full bg-transparent shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-y-auto scroll-smooth pt-20"
              >
                <div className="min-h-full flex flex-col justify-center">
                  <Contact />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Navigation activePage={activePage} setActivePage={handleNavClick} theme={theme} setTheme={setTheme} />
        
        <ChatWidget />
        <CustomCursor />
      </div>
    </div>
  );
};

export default App;