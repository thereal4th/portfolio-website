'use client'

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Trash2 } from 'lucide-react';
import PORTFOLIO_DATA from '../data/PortfolioData';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: `Hi! I'm an AI assistant trained on ${PORTFOLIO_DATA.nickname}'s portfolio. Ask me anything about their skills, experience, or projects!` }
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

    try {
      // Send request to backend api route
      const res = await fetch('../api/generate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userMsg: inputValue, 
          systemPrompt: `
            You are an AI assistant for a portfolio website of a Full Stack Developer named "${PORTFOLIO_DATA.name}".
            
            Here is the developer's profile data:
            ${JSON.stringify(PORTFOLIO_DATA)}
            
            Guidelines:
            - Be professional, friendly, and concise (under 3 sentences unless asked for detail).
            - If asked about contact, direct them to the contact section or form.
            - Act as an enthusiastic agent representing the developer.
            - Do not entertain questions not related to the developer or his projects.
          ` 
        })
      });

      const data = await res.json();
      
      setMessages([...newMessages, { role: 'assistant', text: data.text }]);
      setIsLoading(false);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', text: "Thanks for asking! I'm currently a demo widget, but I'll be fully connected to an LLM soon to answer all questions about my creator." }]);
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', text: `Chat cleared. What else would you like to know about ${PORTFOLIO_DATA.nickname}?` }]);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-[#3F5E46] text-white shadow-[0_8px_20px_-5px_rgba(63,94,70,0.4)] hover:bg-[#2C3529] hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window Container */}
      <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        
        {isOpen && (
          <div className="mb-4 w-80 md:w-96 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-[#E6E1D6] rounded-[2rem] overflow-hidden flex flex-col max-h-[500px]">
            {/* Header */}
            <div className="bg-[#FDFBF7] p-4 border-b border-[#E6E1D6] flex justify-between items-center rounded-t-[2rem]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3F5E46]/10 flex items-center justify-center text-[#3F5E46]">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#2C3529] text-sm">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#3F5E46] rounded-full animate-pulse"></div>
                    <span className="text-xs text-[#2C3529]/60 font-medium">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={clearChat} className="text-[#2C3529]/40 hover:text-[#C26344] transition-colors p-1" title="Clear chat">
                    <Trash2 size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-[#2C3529]/40 hover:text-[#2C3529] transition-colors p-1">
                  <X size={20} />
                </button>
              </div>
            </div>
  
            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#FDFBF7] min-h-[300px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#3F5E46] text-white rounded-br-none shadow-sm' 
                      : 'bg-white text-[#2C3529] rounded-bl-none border border-[#E6E1D6] shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3.5 rounded-2xl rounded-bl-none border border-[#E6E1D6] shadow-sm">
                    <Loader2 size={16} className="animate-spin text-[#3F5E46]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
  
            {/* Input */}
            <div className="p-4 bg-white border-t border-[#E6E1D6] rounded-b-[2rem]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about my skills..."
                  className="flex-1 bg-[#FDFBF7] border border-[#E6E1D6] rounded-xl px-4 py-2.5 text-sm text-[#2C3529] placeholder-[#2C3529]/40 focus:outline-none focus:border-[#3F5E46] focus:ring-2 focus:ring-[#3F5E46]/20 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2.5 bg-[#3F5E46] hover:bg-[#2C3529] text-white rounded-xl transition-all disabled:opacity-50 disabled:bg-[#E6E1D6] disabled:text-[#2C3529]/40 shadow-sm flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;