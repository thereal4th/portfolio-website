import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { Terminal } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-[#2C3529] mb-12">About Me</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-[#2C3529]/80 text-lg leading-relaxed font-light">
          <p className="text-justify">
            Hello! I'm <span className="text-[#2C3529] font-medium">{PORTFOLIO_DATA.name}</span>, but you can call me <span className="text-[#3F5E46] font-bold">{PORTFOLIO_DATA.nickname}</span>. 
            I am a <span className="text-[#C26344] font-medium">{PORTFOLIO_DATA.role}</span>.
          </p>
          <p className="text-justify">
            I code for my own enjoyment. I love the process of creation and problem-solving. Apart from coding, I've been playing the piano for 10 years, and I'm also a dedicated practitioner of the martial art BJJ.
          </p>
        </div>
        <div className="organic-card p-8">
          <h3 className="text-xl font-bold text-[#2C3529] mb-6 flex items-center gap-2">
            <Terminal size={20} className="text-[#3F5E46]" />
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_DATA.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-[#F4F0EA] text-[#3F5E46] rounded-full text-sm font-medium border border-[#E6E1D6] hover:border-[#3F5E46]/50 hover:bg-white hover:shadow-sm transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h3 className="text-2xl font-bold text-[#2C3529] mb-10">Experience</h3>
        <div className="space-y-10">
          {PORTFOLIO_DATA.experience.map((item, index) => (
            <div key={index} className="relative pl-10 border-l-2 border-[#E6E1D6] pb-2 last:pb-0 group">
              <div className="absolute left-[-7px] top-1.5 w-3 h-3 rounded-full bg-[#C26344] shadow-sm group-hover:scale-150 group-hover:bg-[#3F5E46] transition-all duration-300" />
              <div className="text-sm font-bold tracking-wider text-[#C26344] uppercase mb-2">{item.year}</div>
              <h4 className="text-xl font-bold text-[#2C3529] mb-1">{item.role}</h4>
              <div className="text-[#3F5E46] font-medium mb-4">{item.company}</div>
              <p className="text-[#2C3529]/70 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About