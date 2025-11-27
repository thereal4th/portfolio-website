import { useEffect, useRef, useState } from "react";
import PORTFOLIO_DATA from "../data/PortfolioData";
import { Bot, Loader2, MessageSquare, Send, X } from "lucide-react";

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([
      { role: 'assistant', text: "Hi! I'm Jarvis, 4th's AI Assistant. Ask me anything about his skills, experience, or projects!" }
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
  
        Your goal is to answer visitor questions about 4th's experience, skills, and projects based on this data.
        
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
                  <h3 className="text-sm font-bold text-white">Ask Jarvis</h3>
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

  export default ChatWidget;