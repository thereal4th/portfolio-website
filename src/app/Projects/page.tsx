import { GithubIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { Code, Cpu, Database, ExternalLink, Globe } from "lucide-react";
import { JSX } from "react";

const Projects: React.FC = () => {
  const getIcon = (type: string): JSX.Element => {
    switch (type) {
      case 'Database': return <Database size={24} className="text-blue-400" />;
      case 'Cpu': return <Cpu size={24} className="text-purple-400" />;
      case 'Globe': return <Globe size={24} className="text-green-400" />;
      default: return <Code size={24} className="text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white">Featured Projects</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <div 
            key={index}
            className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-slate-500 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
          >
            {/* Color Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* THUMBNAIL SIZE FIX:
               Changed h-72 (18rem) -> h-48 (12rem). 
               Kept 'shrink-0' so it doesn't squish.
            */}
            <div className="relative h-48 w-full shrink-0 overflow-hidden border-b border-slate-700/50">
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Icon as Overlaid Badge */}
              <div className="absolute top-3 right-3 z-20 p-2.5 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-lg">
                {getIcon(project.iconType)}
              </div>
            </div>

            <div className="relative z-10 flex flex-col flex-1 p-5">
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed flex-grow line-clamp-3 mb-8">
                {project.description}
              </p>
              
              <div className="h-px w-full bg-slate-700/50 my-8" />

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <a href={project.github} target="_blank" className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                  <GithubIcon size={16} /> Code
                </a>
                <a href={project.demo} target="_blank" className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                  <ExternalLink size={16} /> Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;