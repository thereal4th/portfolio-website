import { GithubIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { Code, Cpu, Database, ExternalLink, Globe } from "lucide-react";
import { JSX } from "react";

const Projects: React.FC = () => {
  const getIcon = (type: string): JSX.Element => {
    switch (type) {
      case 'Database': return <Database size={40} className="text-blue-400" />;
      case 'Cpu': return <Cpu size={40} className="text-purple-400" />;
      case 'Globe': return <Globe size={40} className="text-green-400" />;
      default: return <Code size={40} className="text-blue-400" />;
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
            className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-slate-500 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 p-4 bg-slate-900/50 rounded-xl w-fit backdrop-blur-sm border border-slate-700/50">
                {getIcon(project.iconType)}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate-400 mb-6 leading-relaxed flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <a href="#" className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                  <GithubIcon size={16} /> Code
                </a>
                <a href="#" className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                  <ExternalLink size={16} /> Live Demo
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