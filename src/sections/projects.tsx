"use client";

import { GithubIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticElement from "@/src/components/MagneticElement";

const ProjectImage = ({ thumbnail, alt }: { thumbnail: string, alt: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <div ref={ref} className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-black/50">
      <motion.img 
        style={{ y }}
        src={thumbnail} 
        alt={alt}
        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 dark:opacity-80 group-hover:opacity-100"
      />
      <div className="absolute inset-0 border border-gray-200/50 dark:border-white/10 rounded-2xl pointer-events-none mix-blend-overlay" />
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 relative z-10">
      
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-4">Selected Work</h2>
        <div className="w-24 h-1 bg-gray-200 dark:bg-white/20 rounded-full" />
      </div>
      
      <div className="space-y-40">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <div key={index} className="relative [content-visibility:auto] [contain-intrinsic-size:500px]">
            
            {/* Animated Background Stripe */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-1/2 -translate-y-1/2 h-[130%] w-[120vw] -z-10 ${
                index % 2 === 0 
                  ? 'bg-gradient-to-r from-blue-100/50 via-indigo-50/30 dark:from-emerald-900/20 dark:via-emerald-800/5 to-transparent origin-left -left-[20vw]' 
                  : 'bg-gradient-to-l from-indigo-100/50 via-violet-50/30 dark:from-indigo-900/20 dark:via-indigo-800/5 to-transparent origin-right -right-[20vw]'
              }`}
            />

            {/* Project Content */}
            <motion.div 
              initial={{ opacity: 0, x: index % 2 !== 0 ? 150 : -150, y: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 12,
                mass: 1.2,
                delay: 0.2
              }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-16 items-center group`}
            >
              {/* Image Container with Parallax */}
              <div className="w-full md:w-3/5 spatial-card p-2 md:p-4 overflow-hidden dark:shadow-2xl">
                <ProjectImage thumbnail={project.thumbnail} alt={project.title} />
              </div>

              {/* Content */}
              <div className="w-full md:w-2/5 flex flex-col justify-center">
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/10 rounded-full bg-white/50 dark:bg-white/[0.02] backdrop-blur-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all dark:group-hover:text-glow">
                  {project.title}
                </h3>
                
                <p className="text-lg text-gray-500 dark:text-white/50 font-light leading-relaxed mb-8">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-6">
                  <MagneticElement>
                    <a href={project.github} target="_blank" className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-gray-900 dark:hover:border-white pb-1 p-2">
                      <GithubIcon size={16} /> Source
                    </a>
                  </MagneticElement>
                  {project.demo && (
                    <MagneticElement>
                      <a href={project.demo} target="_blank" className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-gray-900 dark:hover:border-white pb-1 p-2">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    </MagneticElement>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;