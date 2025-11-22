import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { Terminal } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">About Me</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
          <p className = "text-justify">
            Hello! I'm <span className = "text-white">{PORTFOLIO_DATA.name}</span>, but you can call me <span className="text-blue-400 font-bold">{PORTFOLIO_DATA.nickname}</span>. 
            I am a <span className = "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">{PORTFOLIO_DATA.role}</span>.
          </p>
          <p className = "text-justify">
            I code for my own enjoyment. I <span className="text-red-600 font-bold">love</span> the process of <span className = "text-white bg-white/10 px-1.5 py-0.5 rounded-md">creation and problem-solving</span>. Apart from coding, I've been playing the <span className="text-orange-400 font-bold">piano</span> for 10 years, and I'm also a dedicated practioner of the martial art <span className = "text-amber-400 font-bold">BJJ</span>.
          </p>
          <p className = "text-justify">
            If you're interested in the non-technical stuff about me, you can ask my AI assistant in the bottom-right corner :)
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Terminal size={20} className="text-blue-400" />
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_DATA.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-slate-700/50 text-slate-300 rounded-lg text-sm border border-slate-600 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h3 className="text-2xl font-bold text-white mb-8">Experience</h3>
        <div className="space-y-8">
          {PORTFOLIO_DATA.experience.map((item, index) => (
            <div key={index} className="relative pl-8 border-l border-slate-800 pb-8 last:pb-0">
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500" />
              <div className="text-sm text-blue-400 mb-1">{item.year}</div>
              <h4 className="text-xl font-bold text-white mb-2">{item.role}</h4>
              <div className="text-slate-500 mb-4">{item.company}</div>
              <p className="text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};