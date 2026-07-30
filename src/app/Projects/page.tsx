import { GithubIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { Code, Cpu, Database, ExternalLink, Globe } from "lucide-react";
import { JSX } from "react";

const Projects: React.FC = () => {
  const getIcon = (type: string): JSX.Element => {
    switch (type) {
      case 'Database': return <Database size={24} className="text-[#C26344]" />;
      case 'Cpu': return <Cpu size={24} className="text-[#3F5E46]" />;
      case 'Globe': return <Globe size={24} className="text-[#3F5E46]" />;
      default: return <Code size={24} className="text-[#C26344]" />;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-[#2C3529]">Featured Projects</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <div 
            key={index}
            className="group relative organic-card organic-card-hover overflow-hidden flex flex-col h-full bg-white"
          >
            {/* Color Hover Effect */}
            <div className={`absolute inset-0 bg-[#3F5E46]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative h-48 w-full shrink-0 overflow-hidden border-b border-[#E6E1D6]">
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Icon as Overlaid Badge */}
              <div className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-[#E6E1D6] shadow-sm">
                {getIcon(project.iconType)}
              </div>
            </div>

            <div className="relative z-10 flex flex-col flex-1 p-6">
              <h3 className="text-xl font-bold text-[#2C3529] mb-3 group-hover:text-[#3F5E46] transition-colors">
                {project.title}
              </h3>
              
              <p className="text-[#2C3529]/70 text-sm leading-relaxed flex-grow line-clamp-3 mb-6">
                {project.description}
              </p>
              
              <div className="h-px w-full bg-[#E6E1D6] my-6" />

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F4F0EA] text-[#3F5E46] border border-[#E6E1D6]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-5 mt-auto">
                <a href={project.github} target="_blank" className="flex items-center gap-2 text-sm font-bold text-[#2C3529] hover:text-[#3F5E46] transition-colors">
                  <GithubIcon size={18} /> Code
                </a>
                {project.demo && (
                    <a href={project.demo} target="_blank" className="flex items-center gap-2 text-sm font-bold text-[#2C3529] hover:text-[#3F5E46] transition-colors">
                    <ExternalLink size={18} /> Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;