'use client'

import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

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
            Designed & Built by 4th.
          </p>
        </div>
      </div>
    );
  };

export default Contact;
  