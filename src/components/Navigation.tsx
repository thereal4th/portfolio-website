import { HomeIcon, Briefcase, User, Mail } from "lucide-react";
import PORTFOLIO_DATA from "../data/PortfolioData";

type Page = 'home' | 'projects' | 'about' | 'contact';

interface NavigationProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}
  
const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage }) => {
  const navLinks: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={20} /> },
    { id: 'projects', label: 'Work', icon: <Briefcase size={20} /> },
    { id: 'about', label: 'About', icon: <User size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center gap-2 p-2 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActivePage(link.id)}
            className={`group relative flex items-center justify-center px-4 py-3 rounded-full transition-all duration-300 ${
              activePage === link.id 
                ? 'bg-white/10 text-white' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            {link.icon}
            <span className={`absolute -top-10 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none ${activePage === link.id ? 'font-bold' : ''}`}>
              {link.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;