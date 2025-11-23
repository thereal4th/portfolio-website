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
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      <Navigation activePage={activePage} setActivePage={setActivePage} isScrolled={isScrolled} />
      
      <main className="transition-opacity duration-500 ease-in-out">
        {activePage === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Home setActivePage={setActivePage} />
          </div>
        )}
        
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

      {/* Floating Chat Widget available on all pages */}
      <ChatWidget />
    </div>
  );
};

export default App;