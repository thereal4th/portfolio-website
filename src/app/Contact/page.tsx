'use client'

import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

const Contact: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [isPolishing, setIsPolishing] = useState<boolean>(false);
  
    const handlePolish = async () => {
      if (!message.trim()) return;
      setIsPolishing(true);
      // Simulate polish
      setTimeout(() => {
         setMessage(message + "\n\n(Polished for brevity and professionalism)");
         setIsPolishing(false);
      }, 1000);
    };
  
    return (
      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 relative z-10">
        
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6">Initialize Contact</h2>
          <p className="text-white/50 text-xl font-light">
            I'm currently open for new opportunities. Let's build something exceptional.
          </p>
        </div>
  
        <form className="spatial-card p-6 md:p-10 space-y-8" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3 relative group">
              <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Name</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-3 relative group">
              <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Email</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                placeholder="john@domain.com"
              />
            </div>
          </div>
          
          <div className="space-y-3 relative group">
            <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Subject</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
              placeholder="Project Details"
            />
          </div>
  
          <div className="space-y-3 relative group">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Transmission</label>
              <button
                type="button"
                onClick={handlePolish}
                disabled={isPolishing || !message}
                className="text-xs flex items-center gap-1.5 text-white/40 hover:text-white font-bold tracking-wider uppercase transition-colors disabled:opacity-30"
              >
                {isPolishing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                {isPolishing ? 'Processing' : 'AI Polish'}
              </button>
            </div>
            <textarea 
              rows={4}
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors resize-none"
              placeholder="Detail your requirements..."
            />
          </div>
  
          <div className="pt-4 flex justify-end">
            <button className="px-10 py-4 bg-white text-black font-bold tracking-wider uppercase text-sm rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Transmit
            </button>
          </div>
        </form>
  
        <div className="mt-32 text-center">
          <div className="w-px h-16 bg-white/20 mx-auto mb-8" />
          <p className="text-white/30 text-xs font-bold tracking-widest uppercase">
            Designed & Engineered by 4th.
          </p>
        </div>
      </div>
    );
  };

export default Contact;