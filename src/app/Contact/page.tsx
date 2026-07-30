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
         setMessage("Polished: " + message);
         setIsPolishing(false);
      }, 1000);
    };
  
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2C3529] mb-6">Get In Touch</h2>
          <p className="text-[#2C3529]/70 text-lg font-light">
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>
  
        <form className="space-y-6 bg-white p-8 rounded-[2rem] border border-[#E6E1D6] shadow-[0_8px_30px_rgba(0,0,0,0.03)]" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#2C3529]">Name</label>
              <input 
                type="text" 
                className="w-full bg-[#FDFBF7] border border-[#E6E1D6] rounded-xl px-4 py-3 text-[#2C3529] placeholder-[#2C3529]/30 focus:outline-none focus:border-[#3F5E46] focus:ring-2 focus:ring-[#3F5E46]/20 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#2C3529]">Email</label>
              <input 
                type="email" 
                className="w-full bg-[#FDFBF7] border border-[#E6E1D6] rounded-xl px-4 py-3 text-[#2C3529] placeholder-[#2C3529]/30 focus:outline-none focus:border-[#3F5E46] focus:ring-2 focus:ring-[#3F5E46]/20 transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#2C3529]">Subject</label>
            <input 
              type="text" 
              className="w-full bg-[#FDFBF7] border border-[#E6E1D6] rounded-xl px-4 py-3 text-[#2C3529] placeholder-[#2C3529]/30 focus:outline-none focus:border-[#3F5E46] focus:ring-2 focus:ring-[#3F5E46]/20 transition-all"
              placeholder="Project Inquiry"
            />
          </div>
  
          <div className="space-y-2 relative">
            <label className="text-sm font-semibold text-[#2C3529] flex justify-between items-center">
              Message
              <button
                type="button"
                onClick={handlePolish}
                disabled={isPolishing || !message}
                className="text-xs flex items-center gap-1.5 text-[#C26344] hover:text-[#3F5E46] font-medium transition-colors disabled:opacity-50"
              >
                {isPolishing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                {isPolishing ? 'Polishing...' : 'Polish with AI'}
              </button>
            </label>
            <textarea 
              rows={6}
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              className="w-full bg-[#FDFBF7] border border-[#E6E1D6] rounded-xl px-4 py-3 text-[#2C3529] placeholder-[#2C3529]/30 focus:outline-none focus:border-[#3F5E46] focus:ring-2 focus:ring-[#3F5E46]/20 transition-all resize-none"
              placeholder="Tell me about your project... (Type a draft and click Polish with AI)"
            />
          </div>
  
          <button className="w-full bg-[#3F5E46] hover:bg-[#2C3529] text-white font-medium py-4 rounded-xl transition-all hover:scale-[1.02] shadow-[0_8px_20px_-5px_rgba(63,94,70,0.4)]">
            Send Message
          </button>
        </form>
  
        <div className="mt-20 text-center pt-10 border-t border-[#E6E1D6]">
          <p className="text-[#2C3529]/60 font-medium">
            Designed & Built by 4th.
          </p>
        </div>
      </div>
    );
  };

export default Contact;