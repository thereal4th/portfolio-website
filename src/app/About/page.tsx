"use client";

import PORTFOLIO_DATA from "@/src/data/PortfolioData";
import { motion, Variants } from "framer-motion";

const About: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto px-6 lg:px-12 py-12 relative z-10"
    >
      
      <motion.div variants={itemVariants} className="mb-20">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-4">About Me</h2>
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: 96 }} 
          transition={{ duration: 1, delay: 0.5 }} 
          className="h-1 bg-gray-200 dark:bg-white/20 rounded-full" 
        />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <motion.div variants={itemVariants} className="md:col-span-7 space-y-6 text-gray-500 dark:text-white/50 text-xl font-light leading-relaxed">
          <p>
            Hello. I'm <span className="text-gray-900 dark:text-white font-medium">{PORTFOLIO_DATA.name}</span>, operating under the alias <span className="text-gray-900 dark:text-white font-bold">{PORTFOLIO_DATA.nickname}</span>. 
            I focus on creating robust systems and seamless digital experiences as a <span className="text-gray-900 dark:text-white font-medium">{PORTFOLIO_DATA.role}</span>.
          </p>
          <p>
            My engineering philosophy centers around performance, simplicity, and attention to detail.
            Outside the digital realm, I've spent a decade mastering the piano and actively train in BJJ.
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="md:col-span-5 spatial-card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-white/5 rounded-full blur-[40px] pointer-events-none" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 tracking-wide uppercase">Core Toolkit</h3>
          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_DATA.skills.map((skill, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-3 py-1.5 bg-white dark:bg-white/[0.03] text-gray-600 dark:text-white/70 rounded-lg text-sm border border-gray-200 dark:border-white/10 hover:border-gray-900 dark:hover:border-white/30 hover:bg-gray-900 dark:hover:bg-white/10 hover:text-white transition-colors cursor-default shadow-sm dark:shadow-none"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mt-32">
        <h3 className="text-2xl font-bold tracking-wider uppercase text-gray-400 dark:text-white/40 mb-12">Trajectory</h3>
        <div className="space-y-12">
          {PORTFOLIO_DATA.experience.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
              className="relative pl-8 md:pl-0 group"
            >
              <div className="md:grid md:grid-cols-4 md:gap-8 items-baseline">
                
                {/* Mobile Dot */}
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20 group-hover:bg-gray-900 dark:group-hover:bg-white dark:group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all md:hidden" />
                
                {/* Desktop Line/Dot */}
                <div className="md:col-span-1 text-sm font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase mb-2 md:mb-0 md:text-right md:border-r border-gray-200 dark:border-white/10 md:pr-8 relative">
                   <span className="hidden md:block absolute -right-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20 group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:scale-150 dark:group-hover:scale-100 dark:group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all" />
                   {item.year}
                </div>
                
                <div className="md:col-span-3">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-all dark:group-hover:text-glow">{item.role}</h4>
                  <div className="text-gray-500 dark:text-white/60 font-medium mb-4">{item.company}</div>
                  <p className="text-gray-500 dark:text-white/40 font-light leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;