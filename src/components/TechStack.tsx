import react from 'react'
import PORTFOLIO_DATA from '../data/PortfolioData';
import { Terminal } from 'lucide-react';

const TechStack: React.FC = () => {

    return(
        <div className = "w=full mb-12">
            <h3 className = "text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <Terminal size={24} className="text-blue-400" />    
                <span className="text-white-500">Tech Stack</span>
            </h3>

            <div className = "flex flex-wrap gap-3">
                {PORTFOLIO_DATA.skills.map((skill, index) => (
                    <div
                        key={index}
                        className="group relative px-5 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)] cursor-default"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                        <span className="relative z-10 text-slate-400 text-sm font-medium group-hover:text-blue-100 transition-colors duration-300">
                            {skill}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default TechStack;