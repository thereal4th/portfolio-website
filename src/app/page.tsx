'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import PORTFOLIO_DATA from '../data/PortfolioData';

export type Theme = 'light' | 'dark';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isClient]);

  const isDark = theme === 'dark';

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: isDark ? '#0a0a0a' : '#f4efe8',
        color: isDark ? '#e5e5e5' : '#252e1f',
        transition: 'background-color 1.5s ease-in-out, color 1.5s ease-in-out',
      }}
    >
      <DreamParticles isDark={isDark} />
      <HeroSection theme={theme} toggleTheme={toggleTheme} />

      <main
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '2rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            background: 'linear-gradient(180deg, rgba(250,245,237,1) 0%, rgba(250,245,237,0.82) 15%, rgba(250,245,237,0.76) 100%)',
            backdropFilter: 'blur(18px) saturate(145%)',
            WebkitBackdropFilter: 'blur(18px) saturate(145%)',
            opacity: isDark ? 0 : 1,
            transition: 'opacity 1.5s ease-in-out',
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            background: 'rgba(0, 0, 0, 0.85)',
            opacity: isDark ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
          aria-hidden="true"
        />
        <ProjectsSection isDark={isDark} />
        <ExperienceSection isDark={isDark} />
        <ConnectSection isDark={isDark} />
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}

/* ========== Dream Particles ========== */
const DreamParticles = ({ isDark }: { isDark: boolean }) => {
  const [motes, setMotes] = useState<any[]>([]);

  useEffect(() => {
    const MOTE_COUNT = 5;
    const newMotes = Array.from({ length: MOTE_COUNT }).map((_, i) => {
      const size = Math.floor(Math.random() * 3) + 3;
      const leftPos = Math.random() * 92 + 4;
      const duration = Math.random() * 12 + 14;
      const delay = Math.random() * 8;
      const maxOpacity = (Math.random() * 0.08 + 0.12).toFixed(2);
      return { id: i, size, leftPos, duration, delay, maxOpacity };
    });
    setMotes(newMotes);
  }, []);

  return (
    <div id="dream-particles-container" aria-hidden="true" style={{ opacity: isDark ? 0.3 : 1, transition: 'opacity 1.2s ease' }}>
      {motes.map((mote) => (
        <div
          key={mote.id}
          className="dream-mote"
          style={{
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            left: `${mote.leftPos}%`,
            animationDelay: `${mote.delay}s`,
            ['--float-duration' as string]: `${mote.duration}s`,
            ['--max-opacity' as string]: mote.maxOpacity,
          }}
        />
      ))}
    </div>
  );
};

/* ========== Seamless Video Loop Component ========== */
const SeamlessVideoLoop = ({ 
  src, 
  poster, 
  className, 
  baseOpacity, 
  isVisible, 
  style 
}: { 
  src: string; 
  poster: string; 
  className: string; 
  baseOpacity: number; 
  isVisible: boolean; 
  style: React.CSSProperties;
}) => {
  const [activeVid, setActiveVid] = useState(0);
  const vid0Ref = useRef<HTMLVideoElement>(null);
  const vid1Ref = useRef<HTMLVideoElement>(null);
  const isStarted = useRef(false);

  useEffect(() => {
    if (vid0Ref.current && !isStarted.current) {
      vid0Ref.current.play().catch(e => console.log('Autoplay prevented:', e));
      isStarted.current = true;
    }
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>, currentIndex: number) => {
    const vid = e.currentTarget;
    if (!vid.duration) return;
    const timeLeft = vid.duration - vid.currentTime;
    
    // Crossfade 1.5 seconds before the video ends
    if (timeLeft <= 1.5 && activeVid === currentIndex) {
       const nextIndex = currentIndex === 0 ? 1 : 0;
       const nextVid = nextIndex === 0 ? vid0Ref.current : vid1Ref.current;
       if (nextVid) {
         nextVid.currentTime = 0;
         nextVid.play().catch(e => console.log('Play prevented:', e));
         setActiveVid(nextIndex);
       }
    }
  };

  return (
    <div style={{ ...style, opacity: isVisible ? baseOpacity : 0, transition: 'opacity 1.5s ease-in-out' }}>
      <video
        ref={vid0Ref}
        src={src}
        poster={poster}
        className={className}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'fill',
          opacity: activeVid === 0 ? 1 : 0,
          transition: activeVid === 0 ? 'opacity 1.5s ease-in-out' : 'opacity 0s 1.5s',
          zIndex: activeVid === 0 ? 2 : 1
        }}
        muted playsInline
        onTimeUpdate={(e) => handleTimeUpdate(e, 0)}
      />
      <video
        ref={vid1Ref}
        src={src}
        poster={poster}
        className={className}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'fill',
          opacity: activeVid === 1 ? 1 : 0,
          transition: activeVid === 1 ? 'opacity 1.5s ease-in-out' : 'opacity 0s 1.5s',
          zIndex: activeVid === 1 ? 2 : 1
        }}
        muted playsInline
        onTimeUpdate={(e) => handleTimeUpdate(e, 1)}
      />
    </div>
  );
};

/* ========== Hero Section ========== */
const HeroSection = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
  const isDark = theme === 'dark';

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundColor: isDark ? '#0a0a0a' : '#f4efe8',
        transition: 'background-color 1.5s ease-in-out',
      }}
    >
      {/* Background Videos - both always mounted, crossfade via opacity */}
      <div className="video-background-wrapper">
        <SeamlessVideoLoop
          src="TrainScenery.mp4"
          poster="TrainSceneryPosterFrame.png"
          className="seamless-video"
          baseOpacity={1}
          isVisible={!isDark}
          style={{
            position: 'fixed', top: 0, left: 0,
            width: '100vw', height: '100vh',
            pointerEvents: 'none',
            filter: 'sepia(0.12) saturate(1.15) contrast(0.92) brightness(1.04)',
            zIndex: -2,
          }}
        />
        <SeamlessVideoLoop
          src="TrainSceneryDarkMode.mp4"
          poster="TrainSceneryDarkModePosterFrame.png"
          className="seamless-video"
          baseOpacity={0.4}
          isVisible={isDark}
          style={{
            position: 'fixed', top: 0, left: 0,
            width: '100vw', height: '100vh',
            pointerEvents: 'none',
            filter: 'none',
            zIndex: -1,
          }}
        />

        <div
          className="dream-cinema-overlay"
          style={{ opacity: isDark ? 0 : 0.4, transition: 'opacity 1.2s ease' }}
          aria-hidden="true"
        />
        <div className="mobile-readability-overlay" aria-hidden="true" />
        <div
          className="video-bottom-dissolve"
          style={{
            opacity: isDark ? 0 : 1,
            transition: 'opacity 1.5s ease-in-out',
          }}
          aria-hidden="true"
        />
        <div
          className="video-bottom-dissolve"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, #0a0a0a 100%)',
            opacity: isDark ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="hero-content-layer">
        <header className="navbar">
          <Link href="#hero" className="logo tracking-widest uppercase-styled" aria-label={PORTFOLIO_DATA.name}>
            <span className="logo-leaf">&#10022;</span> 4th
          </Link>
          <nav className="nav-island" aria-label="Main Navigation">
            <Link href="#projects" className="nav-item" style={{ color: isDark ? '#d1d5db' : undefined, transition: 'color 0.8s ease' }}>PROJECTS</Link>
            <Link href="#experience" className="nav-item" style={{ color: isDark ? '#d1d5db' : undefined, transition: 'color 0.8s ease' }}>EXPERIENCE</Link>
            <Link href="#connect" className="nav-item" style={{ color: isDark ? '#d1d5db' : undefined, transition: 'color 0.8s ease' }}>CONNECT</Link>
          </nav>
          <div className="social-header-group">
            <button
              onClick={toggleTheme}
              className="social-chip cursor-pointer"
              style={{
                color: isDark ? '#fff' : undefined,
                borderColor: isDark ? '#6b7280' : undefined,
                transition: 'all 0.8s ease',
              }}
              title="Toggle Theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="https://github.com/thereal4th" target="_blank" rel="noopener noreferrer" className="social-chip" style={{ color: isDark ? '#fff' : undefined, borderColor: isDark ? '#6b7280' : undefined, transition: 'all 0.8s ease' }} title="GitHub Profile">
              <span>GITHUB</span>
            </a>
            <a href="https://www.linkedin.com/in/alfredo-venturina-iv-0475b532a/" target="_blank" rel="noopener noreferrer" className="social-chip" style={{ color: isDark ? '#fff' : undefined, borderColor: isDark ? '#6b7280' : undefined, transition: 'all 0.8s ease' }} title="LinkedIn Profile">
              <span>LINKEDIN</span>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&to=alfredoventurina@gmail.com" target="_blank" className="social-chip chip-email" title="Direct Email">
              <span>EMAIL</span>
            </a>
          </div>
        </header>

        <div className="hero-center-container">
          <div className="hero-center-aura" style={{ opacity: isDark ? 0.15 : undefined, transition: 'opacity 1.2s ease' }} aria-hidden="true" />
          <div className="hero-center-content reveal-on-scroll">
            <h1
              className="hero-title-dramatic"
              style={{
                color: isDark ? '#ffffff' : undefined,
                textShadow: isDark ? '0 4px 50px rgba(255,255,255,0.15)' : undefined,
                transition: 'color 1.2s ease, text-shadow 1.2s ease',
              }}
            >
              {PORTFOLIO_DATA.name}
            </h1>
            <div
              className="hero-badge liquid-glass rounded-full"
              style={{
                background: isDark ? 'rgba(255,255,255,0.1)' : undefined,
                color: isDark ? '#fff' : undefined,
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : undefined,
                transition: 'all 1.2s ease',
              }}
            >
              <span className="badge-pulse-sun" />
              <span>{PORTFOLIO_DATA.role}</span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator-container">
          <Link
            href="#projects"
            className="scroll-indicator"
            style={{
              color: isDark ? '#fff' : undefined,
              borderColor: isDark ? 'rgba(255,255,255,0.4)' : undefined,
              background: isDark ? 'rgba(255,255,255,0.1)' : undefined,
              transition: 'all 0.8s ease',
            }}
            aria-label="Scroll down to explore Projects"
          >
            <span>&#8595;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ========== Projects Section ========== */
const ProjectsSection = ({ isDark }: { isDark: boolean }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(PORTFOLIO_DATA.projects.length / cardsPerPage);

  const goToPage = (direction: 'left' | 'right') => {
    setCurrentPage(prev => {
      if (direction === 'right') return Math.min(prev + 1, totalPages - 1);
      return Math.max(prev - 1, 0);
    });
  };

  return (
    <section id="projects" style={{ padding: '8rem 0', transition: 'all 1.2s ease' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Section Header */}
        <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.6rem' }}>
            <span className="section-prefix" style={{ color: isDark ? '#eab308' : undefined }}>// STUFF I WORKED ON</span>
            <span className="animated-line" />
          </div>
          <h2
            className="section-title"
            style={{
              color: isDark ? '#ffffff' : undefined,
              textShadow: isDark ? 'none' : undefined,
              transition: 'color 1.2s ease',
            }}
          >
            Featured Projects
          </h2>
          <p
            className="section-subtitle"
            style={{
              color: isDark ? '#9ca3af' : undefined,
              textShadow: isDark ? 'none' : undefined,
              margin: '0 auto',
              transition: 'color 1.2s ease',
            }}
          >
            Learning projects, passion projects, stuff I worked on as a student.
          </p>
        </div>

        {/* Slider Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: isDark ? '#6b7280' : 'var(--sage-muted)', marginRight: 'auto', fontWeight: 700, letterSpacing: '0.08em' }}>
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() => goToPage('left')}
            disabled={currentPage === 0}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: `1px solid ${isDark ? '#4b5563' : 'var(--glass-border)'}`,
              background: 'transparent',
              color: isDark ? '#fff' : 'var(--olive-deep)',
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 0 ? 0.35 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
            }}
            aria-label="Previous projects"
          >
            &#8592;
          </button>
          <button
            onClick={() => goToPage('right')}
            disabled={currentPage === totalPages - 1}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: `1px solid ${isDark ? '#4b5563' : 'var(--glass-border)'}`,
              background: 'transparent',
              color: isDark ? '#fff' : 'var(--olive-deep)',
              cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages - 1 ? 0.35 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
            }}
            aria-label="Next projects"
          >
            &#8594;
          </button>
        </div>

        {/* Slider Track — transform-based animation */}
        <div className="reveal-on-scroll" style={{ overflow: 'hidden', padding: '2rem 1rem', margin: '-2rem -1rem' }}>
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              transform: `translateX(calc(-${currentPage} * (100% + 2rem)))`,
              transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            {PORTFOLIO_DATA.projects.map((project, index) => {
              const tagClasses = ['tag-peach', 'tag-sage', 'tag-gold'];
              return (
                <article
                  key={index}
                  className="liquid-card-dynamic"
                  style={{
                    flex: '0 0 calc((100% - 4rem) / 3)',
                    padding: '1.5rem 2rem',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                    background: isDark ? 'rgba(0,0,0,0.8)' : undefined,
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : undefined,
                    color: isDark ? '#d1d5db' : undefined,
                    transition: 'all 0.7s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1rem', fontSize: '0.78rem' }}>
                    <span className="project-id" style={{ color: isDark ? '#eab308' : undefined, letterSpacing: '0.1em', fontWeight: 800, fontSize: '0.75rem' }}>
                      MODULE_{String(index + 1).padStart(2, '0')}
                    </span>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" style={{ color: isDark ? '#fff' : undefined, background: isDark ? 'rgba(255,255,255,0.1)' : undefined, transition: 'all 0.3s ease' }}>
                          [DEMO]
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" style={{ color: isDark ? '#fff' : undefined, background: isDark ? 'rgba(255,255,255,0.1)' : undefined, transition: 'all 0.3s ease' }}>
                          [CODE]
                        </a>
                      )}
                    </div>
                  </div>

                  {project.thumbnail && (
                    <div style={{ width: '100%', height: 160, borderRadius: 8, overflow: 'hidden', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(200,200,200,0.5)'}`, marginBottom: '1rem' }}>
                      <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    </div>
                  )}

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: isDark ? '#fff' : 'var(--olive-deep)', marginBottom: '0.5rem', transition: 'color 1.2s ease' }}>
                    {project.title}
                  </h3>
                  <p className="custom-scrollbar" style={{ 
                    fontSize: '0.88rem', lineHeight: 1.7, 
                    color: isDark ? '#9ca3af' : 'var(--sage-muted)', 
                    flexGrow: 1, maxWidth: '100%', width: '100%',
                    transition: 'color 1.2s ease',
                    height: '7.5rem',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    paddingRight: '0.5rem',
                    textAlign: 'left'
                  }}>
                    {project.description}
                  </p>

                  <div style={{ marginTop: '1.25rem', width: '100%', paddingTop: '1rem', paddingBottom: '0.5rem', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(165,145,120,0.15)'}` }}>
                    <div className="tags-marquee-wrapper">
                      <div className="tags-marquee-content">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={`tag-a-${tagIndex}`}
                            className={`project-tag ${tagClasses[tagIndex % tagClasses.length]}`}
                            style={{
                              background: isDark ? 'rgba(255,255,255,0.1)' : undefined,
                              color: isDark ? '#d1d5db' : undefined,
                              borderColor: isDark ? '#4b5563' : undefined,
                              transition: 'all 0.5s ease',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {/* Duplicate tags for seamless loop */}
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={`tag-b-${tagIndex}`}
                            className={`project-tag ${tagClasses[tagIndex % tagClasses.length]}`}
                            style={{
                              background: isDark ? 'rgba(255,255,255,0.1)' : undefined,
                              color: isDark ? '#d1d5db' : undefined,
                              borderColor: isDark ? '#4b5563' : undefined,
                              transition: 'all 0.5s ease',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ========== Experience Section ========== */
const ExperienceSection = ({ isDark }: { isDark: boolean }) => {
  return (
    <section id="experience" style={{ padding: '4rem 0 8rem', transition: 'all 1.2s ease' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Section Header */}
        <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.6rem' }}>
            <span className="section-prefix" style={{ color: isDark ? '#eab308' : undefined }}>// WHAT I'VE BEEN DOING</span>
            <span className="animated-line" />
          </div>
          <h2
            className="section-title"
            style={{
              color: isDark ? '#ffffff' : undefined,
              textShadow: isDark ? 'none' : undefined,
              transition: 'color 1.2s ease',
            }}
          >
            Experience
          </h2>
          <p
            className="section-subtitle"
            style={{
              color: isDark ? '#9ca3af' : undefined,
              textShadow: isDark ? 'none' : undefined,
              margin: '0 auto',
              transition: 'color 1.2s ease',
            }}
          >
            A chronological overview of my journey and growth in software engineering.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 28,
              top: 8,
              bottom: 8,
              width: 2,
              background: isDark
                ? 'linear-gradient(180deg, #eab308 0%, rgba(234,179,8,0.1) 100%)'
                : 'linear-gradient(180deg, var(--sun-gold) 0%, rgba(212,154,66,0.1) 100%)',
              transition: 'background 1.2s ease',
            }}
            aria-hidden="true"
          />

          {PORTFOLIO_DATA.experience.map((exp, index) => (
            <div
              key={index}
              className="reveal-on-scroll"
              style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: index < PORTFOLIO_DATA.experience.length - 1 ? '2.5rem' : 0,
                position: 'relative',
              }}
            >
              {/* Year dot + badge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 56 }}>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: isDark ? '#eab308' : 'var(--sun-gold)',
                    border: `3px solid ${isDark ? '#0a0a0a' : '#f4efe8'}`,
                    boxShadow: `0 0 0 3px ${isDark ? 'rgba(234,179,8,0.3)' : 'rgba(212,154,66,0.3)'}`,
                    position: 'relative',
                    zIndex: 2,
                    transition: 'all 1.2s ease',
                  }}
                />
                <span
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: isDark ? '#eab308' : 'var(--sun-gold)',
                    background: isDark ? '#0a0a0a' : '#f4efe8',
                    padding: '0.15rem 0.35rem',
                    position: 'relative',
                    zIndex: 2,
                    whiteSpace: 'nowrap',
                    transition: 'all 1.2s ease',
                  }}
                >
                  {exp.year}
                </span>
              </div>

              {/* Content card */}
              <div
                className="liquid-card-dynamic"
                style={{
                  flex: 1,
                  padding: '1.25rem 1.5rem',
                  background: isDark ? 'rgba(0,0,0,0.6)' : undefined,
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : undefined,
                  transition: 'all 0.7s ease',
                  borderRadius: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <h3 style={{
                    fontSize: '1.05rem', fontWeight: 800, margin: 0,
                    color: isDark ? '#fff' : 'var(--olive-deep)',
                    transition: 'color 1.2s ease',
                  }}>
                    {exp.role}
                  </h3>
                  {exp.company && (
                    <span style={{
                      fontSize: '0.8rem', fontWeight: 700,
                      color: isDark ? '#eab308' : 'var(--sun-gold)',
                      transition: 'color 1.2s ease',
                    }}>
                      @ {exp.company}
                    </span>
                  )}
                </div>
                <p style={{
                  fontSize: '0.84rem', lineHeight: 1.7, margin: 0,
                  color: isDark ? '#9ca3af' : 'var(--sage-muted)',
                  transition: 'color 1.2s ease',
                }}>
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ========== Connect Section ========== */
const ConnectSection = ({ isDark }: { isDark: boolean }) => {
  const connectCards = [
    {
      label: '// REPOSITORIES & CODE',
      icon: '✦',
      title: 'GitHub Profile',
      desc: 'Dive into my messy, but mostly functional, codebases.',
      href: 'https://github.com',
      btnText: 'EXPLORE GITHUB // @ALFREDO',
      btnClass: 'btn-gh',
      labelColor: isDark ? '#22c55e' : undefined,
    },
    {
      label: '// PROFESSIONAL NETWORK',
      icon: '✤',
      title: 'LinkedIn Profile',
      desc: 'Connect for engineering career opportunities, technical architecture consulting, and professional networking.',
      href: 'https://www.linkedin.com/in/alfredo-venturina-iv-0475b532a/',
      btnText: 'CONNECT ON LINKEDIN',
      btnClass: 'btn-li',
      labelColor: isDark ? '#eab308' : undefined,
    },
    {
      label: '// EMAIL ME DIRECTLY!',
      icon: '☼',
      title: 'Direct Email Inbox',
      desc: 'Have a specific project idea, pipeline requirement, or general inquiry? My personal inbox is always open.',
      href: 'https://mail.google.com/mail/?view=cm&to=alfredoventurina@gmail.com',
      btnText: 'SEND DIRECT EMAIL',
      btnClass: 'btn-email',
      labelColor: isDark ? '#fb923c' : undefined,
    },
  ];

  return (
    <section id="connect" style={{ padding: '8rem 0 5rem', transition: 'all 1.2s ease' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Section Header */}
        <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.6rem' }}>
            <span className="section-prefix" style={{ color: isDark ? '#eab308' : undefined }}>// LET'S CONNECT!</span>
            <span className="animated-line" />
          </div>
          <h2
            className="section-title"
            style={{ color: isDark ? '#ffffff' : undefined, textShadow: isDark ? 'none' : undefined, transition: 'color 1.2s ease' }}
          >
            Let&apos;s Connect &amp; Collaborate
          </h2>
          <p
            className="section-subtitle"
            style={{ color: isDark ? '#9ca3af' : undefined, textShadow: isDark ? 'none' : undefined, margin: '0 auto', transition: 'color 1.2s ease' }}
          >
            Explore my open-source codebases, connect with me professionally, or drop a direct message into my personal inbox.
          </p>
        </div>

        {/* Connect Cards Grid */}
        <div className="reveal-on-scroll" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {connectCards.map((card, i) => (
            <div
              key={i}
              className="liquid-card-dynamic"
              style={{
                textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '2rem',
                background: isDark ? 'rgba(0,0,0,0.8)' : undefined,
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : undefined,
                transition: 'all 0.7s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', width: '100%' }}>
                <span className="connect-platform" style={{ color: card.labelColor, letterSpacing: '0.12em', fontWeight: 800, fontSize: '0.76rem' }}>{card.label}</span>
                <span className="connect-icon">{card.icon}</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: isDark ? '#fff' : 'var(--olive-deep)', marginBottom: '0.85rem', transition: 'color 1.2s ease' }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: isDark ? '#9ca3af' : 'var(--sage-muted)', lineHeight: 1.75, marginBottom: '2rem', flexGrow: 1, transition: 'color 1.2s ease' }}>
                {card.desc}
              </p>
              <a
                href={card.href}
                target={card.href.startsWith('mailto') ? undefined : '_blank'}
                rel={card.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={`connect-btn ${card.btnClass}`}
                style={{
                  width: '100%', justifyContent: 'center', gap: '0.75rem',
                  background: isDark ? 'rgba(255,255,255,0.1)' : undefined,
                  color: isDark ? '#fff' : undefined,
                  borderColor: isDark ? '#4b5563' : undefined,
                  transition: 'all 0.3s ease',
                }}
              >
                <span>{card.btnText}</span>
                <span>&#8594;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ========== Footer ========== */
const Footer = ({ isDark }: { isDark: boolean }) => {
  return (
    <footer
      className="footer"
      style={{
        background: isDark ? '#000000' : undefined,
        borderColor: isDark ? '#000000' : undefined,
        transition: 'all 1.2s ease',
      }}
    >
      <div className="footer-ambient" style={{ display: isDark ? 'none' : undefined }} />
      <div className="footer-content">
        <p className="footer-text" style={{ color: isDark ? '#6b7280' : undefined, transition: 'color 1.2s ease' }}>
          &copy; 2026 <strong style={{ color: isDark ? '#d1d5db' : undefined }}>ALFREDO VENTURINA</strong> // THANKS FOR VISITING.
        </p>
      </div>
    </footer>
  );
};