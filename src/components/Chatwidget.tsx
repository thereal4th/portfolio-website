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
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 p-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={20} />
      </button>

      <div className={`fixed bottom-8 right-8 z-50 flex flex-col items-end transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}`}>
        
        <div className="mb-4 w-[340px] md:w-[400px] bg-white/70 dark:bg-black/40 backdrop-blur-3xl border border-gray-200/60 dark:border-white/10 rounded-[32px] overflow-hidden flex flex-col max-h-[600px] h-[80vh] shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="p-5 border-b border-gray-200/60 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-white bg-white dark:bg-white/5">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-xs tracking-widest uppercase">System Link</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-gray-500 dark:text-white/40 tracking-wider uppercase">Active</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 text-gray-400 dark:text-white/40">
              <button onClick={clearChat} className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Clear memory">
                  <Trash2 size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-6 scroll-smooth bg-gray-50/30 dark:bg-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-sm font-light leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl rounded-tr-sm shadow-md dark:shadow-none' 
                    : 'bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-2xl rounded-tl-sm shadow-sm dark:shadow-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-white/10 p-4 rounded-2xl rounded-tl-sm border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
                  <Loader2 size={16} className="animate-spin text-gray-400 dark:text-white/40" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200/60 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-full p-1 pl-4 focus-within:border-gray-400 dark:focus-within:border-white/30 transition-colors shadow-sm dark:shadow-none">
              <input
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query system..."
                className="flex-1 bg-transparent border-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="p-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full transition-all disabled:opacity-50 dark:disabled:opacity-30 flex items-center justify-center hover:bg-black dark:hover:bg-gray-200 hover:scale-105"
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