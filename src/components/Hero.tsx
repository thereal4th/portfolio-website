import { GithubIcon, LinkedinIcon } from "@/src/components/ui/CustomIcons";
import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { ChevronRight, Mail } from "lucide-react";

type Page = 'home' | 'projects' | 'about' | 'contact';

interface HeroProps {
    setActivePage: (page: Page) => void;
  }
  
  const Hero: React.FC<HeroProps> = ({ setActivePage }) => {
  
    let isForHire = true;
    let isForHireClassName = isForHire? "bg-green-400":"bg-red-400"
    let isForHireText = isForHire? "Available for hire":"Not available for hire"
  
    return(
      <div className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
  
      <div className="max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        
        {/* Profile Picture Section */}
        <div className="mb-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-800">
            {/* Note: In Next.js, use the <Image> component here */}
            <img 
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${PORTFOLIO_DATA.nickname}&backgroundColor=b6e3f4`} 
              alt="Profile" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
  
        <div className="mb-4 flex justify-center gap-8 text-slate-500">
          <GithubIcon className="hover:text-white cursor-pointer transition-colors" />
          <LinkedinIcon className="hover:text-white cursor-pointer transition-colors" />
          <Mail className="hover:text-white cursor-pointer transition-colors" />
        </div>
  
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <span className="text-blue-400 text-sm font-medium flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isForHireClassName} animate-pulse`}/>
              {isForHireText}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Hi, I'm {PORTFOLIO_DATA.name}. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-3xl md:text-5xl block mt-2">
            {PORTFOLIO_DATA.role}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {PORTFOLIO_DATA.bio}
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => setActivePage('projects')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-500/25"
          >
            View Work <ChevronRight size={20} />
          </button>
          <button 
            onClick={() => setActivePage('contact')}
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all border border-slate-700 hover:border-slate-600"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
    )
  };

export default Hero;