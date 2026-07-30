import { HomeIcon, Briefcase, User, Mail, Moon, Sun } from "lucide-react";
import PORTFOLIO_DATA from "../data/PortfolioData";
import MagneticElement from "./MagneticElement";
import { Theme } from "../app/page";

type Page = 'home' | 'projects' | 'about' | 'contact';

interface NavigationProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
  
const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage, theme, setTheme }) => {
  const navLinks: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={20} /> },
    { id: 'projects', label: 'Work', icon: <Briefcase size={20} /> },
    { id: 'about', label: 'About', icon: <User size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8 duration-1000 flex items-center gap-4">
      <div className="flex items-center gap-2 p-2 bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-colors duration-500">
        {navLinks.map((link) => (
          <MagneticElement key={link.id}>
            <button
              onClick={() => setActivePage(link.id)}
              className={`group relative flex items-center justify-center px-4 py-3 rounded-full transition-all duration-300 ${
                activePage === link.id 
                  ? 'bg-gray-900 dark:bg-white/10 text-white shadow-md dark:shadow-none' 
                  : 'text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/5'
              }`}
            >
              {link.icon}
              <span className={`absolute -top-10 px-3 py-1 bg-white dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none ${activePage === link.id ? 'font-bold' : ''}`}>
                {link.label}
              </span>
            </button>
          </MagneticElement>
        ))}
      </div>

      {/* Theme Toggle Button */}
      <MagneticElement>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-4 rounded-full bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group"
        >
          {theme === 'light' ? <Moon size={20} className="group-hover:-rotate-12 transition-transform" /> : <Sun size={20} className="group-hover:rotate-45 transition-transform" />}
        </button>
      </MagneticElement>
    </div>
  );
};

export default Navigation;