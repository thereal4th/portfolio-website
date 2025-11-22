'use client'

import React, { useState, useEffect, useRef, JSX } from 'react';
import { 
  Mail, 
  ExternalLink, 
  Code, 
  User, 
  Briefcase, 
  Terminal, 
  Menu, 
  X, 
  ChevronRight,
  Cpu,
  Globe,
  Database,
  MessageSquare,
  Sparkles,
  Send,
  Loader2,
  Bot,
  LucideProps
} from 'lucide-react';

import {GithubIcon, LinkedinIcon} from '../components/ui/CustomIcons'
import PORTFOLIO_DATA from '../data/PortfolioData';
import Navigation from '../components/Navigation'

// --- TYPES ---

type Page = 'home' | 'projects' | 'about' | 'contact';

// --- COMPONENTS ---

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



const Contact: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [isPolishing, setIsPolishing] = useState<boolean>(false);

  const handlePolish = async () => {
    if (!message.trim()) return;
    setIsPolishing(true);
    const polished = await generateContent(
      message, 
      "You are a professional editor. Rewrite the following contact form message to be more professional, concise, and clear. Maintain the original intent but improve the tone. Return ONLY the rewritten text."
    );
    setMessage(polished);
    setIsPolishing(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-2xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
        <p className="text-slate-400 text-lg">
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Name</label>
            <input 
              type="text" 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <input 
              type="email" 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Subject</label>
          <input 
            type="text" 
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="Project Inquiry"
          />
        </div>

        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-slate-300 flex justify-between items-center">
            Message
            <button
              type="button"
              onClick={handlePolish}
              disabled={isPolishing || !message}
              className="text-xs flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
            >
              {isPolishing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              {isPolishing ? 'Polishing...' : 'Polish with AI'}
            </button>
          </label>
          <textarea 
            rows={6}
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
            placeholder="Tell me about your project... (Type a draft and click Polish with AI)"
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-4 rounded-lg transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/25">
          Send Message
        </button>
      </form>

      <div className="mt-20 text-center pt-10 border-t border-slate-800">
        <p className="text-slate-500">
          Designed & Built by Dev.
        </p>
      </div>
    </div>
  );
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hi! I'm Dev's AI Assistant. Ask me anything about his skills, experience, or projects!" }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const systemPrompt = `
      You are an AI assistant for a portfolio website of a Full Stack Developer named "${PORTFOLIO_DATA.name}".
      
      Here is the developer's profile data:
      ${JSON.stringify(PORTFOLIO_DATA)}

      Your goal is to answer visitor questions about Dev's experience, skills, and projects based on this data.
      
      Guidelines:
      - Be professional, friendly, and concise (under 3 sentences unless asked for detail).
      - If asked about contact, direct them to the contact section or form.
      - If asked about skills not listed, honest say they aren't listed but suggest related skills if applicable.
      - Act as an enthusiastic agent representing the developer.
    `;

    const aiResponse = await generateContent(userMsg, systemPrompt);
    
    setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Ask DevBot</h3>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-slate-400">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/95 min-h-[300px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700">
                  <Loader2 size={16} className="animate-spin text-blue-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-800 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about my skills..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {/* Notification Dot if closed */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      <Navigation activePage={activePage} setActivePage={setActivePage} isScrolled={isScrolled} />
      
      <main className="transition-opacity duration-500 ease-in-out">
        {activePage === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Hero setActivePage={setActivePage} />
          </div>
        )}
        
        {activePage === 'projects' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Projects />
          </div>
        )}
        
        {activePage === 'about' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <About />
          </div>
        )}
        
        {activePage === 'contact' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Contact />
          </div>
        )}
      </main>

      {/* Floating Chat Widget available on all pages */}
      <ChatWidget />
    </div>
  );
};

export default App;