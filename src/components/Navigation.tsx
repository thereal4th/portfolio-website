import { Menu, X } from "lucide-react";
import PORTFOLIO_DATA from "../data/PortfolioData";
import { useState } from "react";

type Page = 'home' | 'projects' | 'about' | 'contact';

interface NavigationProps {
    activePage: Page;
    setActivePage: (page: Page) => void;
    isScrolled: boolean;
  }
  
  const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage, isScrolled }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    
    const navLinks: { id: Page; label: string }[] = [
      { id: 'home', label: 'Home' },
      { id: 'projects', label: 'Projects' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' }
    ];
  
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer"
            onClick={() => setActivePage('home')}
          >
            {PORTFOLIO_DATA.nickname}.
          </div>
  
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-blue-400 ${
                  activePage === link.id ? 'text-blue-400' : 'text-slate-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
  
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
  
          {/* Mobile Nav */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 p-6 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-5 duration-200">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium ${
                    activePage === link.id ? 'text-blue-400' : 'text-slate-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  };

export default Navigation