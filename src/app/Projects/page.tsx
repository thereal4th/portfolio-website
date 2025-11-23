import { GithubIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { Code, Cpu, Database, ExternalLink, Globe } from "lucide-react";
import { JSX } from "react";

const Projects: React.FC = () => {
  const getIcon = (type: string): JSX.Element => {
    switch (type) {
      case 'Database': return <Database size={20} className="text-blue-400" />;
      case 'Cpu': return <Cpu size={20} className="text-purple-400" />;
      case 'Globe': return <Globe size={20} className="text-green-400" />;
      default: return <Code size={20} className="text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white">Featured Projects</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <div 
            key={index}
            className="group relative h-full"
          >
            {/* Glow Effect Layer - appears on hover */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`} />
            
            {/* Main Card Container */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full hover:border-slate-700 transition-all duration-300">
              
              {/* Thumbnail Image Section */}
              <div className="relative h-52 w-full overflow-hidden">
                {/* Gradient Overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60" />
                
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                
                {/* Badge/Icon overlaid on image */}
                <div className="absolute top-4 right-4 z-20 p-2 bg-slate-950/50 backdrop-blur-md rounded-lg border border-slate-700/50 shadow-sm">
                   {getIcon(project.iconType)}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow relative z-20 bg-slate-900">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/50">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-800">
                  <a href={project.github} target="_blank" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                    <GithubIcon size={18} /> Code
                  </a>
                  <a href={project.demo} target="_blank" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                    <ExternalLink size={18} /> Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;