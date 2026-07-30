'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Loader2, MessageSquare, Send, X, Trash2 } from 'lucide-react';
import PORTFOLIO_DATA from '../data/PortfolioData';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: `Systems online. I am ${PORTFOLIO_DATA.nickname}'s virtual assistant. How may I assist you?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', text: inputValue }
    ];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', text: "Acknowledged. I am currently operating in offline demonstration mode. Neural link will be established soon." }]);
      setIsLoading(false);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', text: `Memory wiped. How may I assist you?` }]);
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 p-4 rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={20} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-8 right-8 z-50 flex flex-col items-end transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}`}>
        
        <div className="mb-4 w-[340px] md:w-[400px] spatial-card overflow-hidden flex flex-col max-h-[600px] h-[80vh]">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="font-bold text-white text-xs tracking-widest uppercase">System Link</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-white/50 tracking-wider uppercase">Active</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 text-white/40">
              <button onClick={clearChat} className="hover:text-white transition-colors" title="Clear memory">
                  <Trash2 size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto space-y-6 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-sm font-light leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white text-black rounded-2xl rounded-tr-sm' 
                    : 'bg-white/5 text-white border border-white/10 rounded-2xl rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-sm border border-white/10">
                  <Loader2 size={16} className="animate-spin text-white/50" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1 pl-4 focus-within:border-white/30 focus-within:bg-white/10 transition-colors">
              <input
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query system..."
                className="flex-1 bg-transparent border-none text-sm text-white placeholder-white/30 focus:outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="p-3 bg-white text-black rounded-full transition-all disabled:opacity-30 flex items-center justify-center hover:scale-105"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;