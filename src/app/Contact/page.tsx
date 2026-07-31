'use client'

import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [isPolishing, setIsPolishing] = useState<boolean>(false);
  
    const handlePolish = async () => {
      if (!message.trim()) return;
      setIsPolishing(true);
      setTimeout(() => {
         setMessage(message + "\n\n(Polished for brevity and professionalism)");
         setIsPolishing(false);
      }, 1000);
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
      }
    };
  
    const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
    };
  
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto px-6 lg:px-12 py-12 relative z-10"
      >
        
        <motion.div variants={itemVariants} className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-6">Initialize Contact</h2>
          <p className="text-gray-500 dark:text-white/50 text-xl font-light">
            I'm currently open for new opportunities. Let's build something exceptional.
          </p>
        </motion.div>
  
        <motion.form 
          variants={itemVariants} 
          className="spatial-card p-6 md:p-10 space-y-8" 
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="space-y-3 relative group">
              <label className="text-xs font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase">Name</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-gray-200 dark:border-white/20 px-0 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                placeholder="John Doe"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3 relative group">
              <label className="text-xs font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase">Email</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-gray-200 dark:border-white/20 px-0 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
                placeholder="john@domain.com"
              />
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="space-y-3 relative group">
            <label className="text-xs font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase">Subject</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-gray-200 dark:border-white/20 px-0 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
              placeholder="Project Details"
            />
          </motion.div>
  
          <motion.div variants={itemVariants} className="space-y-3 relative group">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase">Transmission</label>
              <button
                type="button"
                onClick={handlePolish}
                disabled={isPolishing || !message}
                className="text-xs flex items-center gap-1.5 text-blue-500 dark:text-white/40 hover:text-blue-600 dark:hover:text-white font-bold tracking-wider uppercase transition-colors disabled:opacity-50 dark:disabled:opacity-30"
              >
                {isPolishing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                {isPolishing ? 'Processing' : 'AI Polish'}
              </button>
            </div>
            <textarea 
              rows={4}
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              className="w-full bg-transparent border-b border-gray-200 dark:border-white/20 px-0 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors resize-none"
              placeholder="Detail your requirements..."
            />
          </motion.div>
  
          <motion.div variants={itemVariants} className="pt-4 flex justify-end">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold tracking-wider uppercase text-sm rounded-full shadow-lg dark:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Transmit
            </motion.button>
          </motion.div>
        </motion.form>
  
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-32 text-center"
        >
          <div className="w-px h-16 bg-gray-300 dark:bg-white/20 mx-auto mb-8" />
          <p className="text-gray-400 dark:text-white/30 text-xs font-bold tracking-widest uppercase">
            Designed & Engineered by 4th.
          </p>
        </motion.div>
      </motion.div>
    );
  };

export default Contact;