"use client";

import { GithubIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const Projects: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 relative z-10">
      
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-4">Selected Work</h2>
        <div className="w-24 h-1 bg-white/20 rounded-full" />
      </div>
      
      <div className="space-y-32">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: index % 2 !== 0 ? 150 : -150, y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 12,
              mass: 1.2
            }}
            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-16 items-center group`}
          >
            {/* Image Container */}
            <div className="w-full md:w-3/5 spatial-card p-2 md:p-4 overflow-hidden">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/50">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none mix-blend-overlay" />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-2/5 flex flex-col justify-center">
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/10 rounded-full bg-white/[0.02]">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-glow transition-all">
                {project.title}
              </h3>
              
              <p className="text-lg text-white/50 font-light leading-relaxed mb-8">
                {project.description}
              </p>
              
              <div className="flex items-center gap-6">
                <a href={project.github} target="_blank" className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-white/80 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
                  <GithubIcon size={16} /> Source
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-white/80 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;