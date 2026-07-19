import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function SceneHook() {
  const [typedText, setTypedText] = useState('');
  const fullText = "July 19";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-brand-charcoal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full h-full absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,rgba(0,0,0,0)_60%)]"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      />
      
      <div className="z-10 flex flex-col items-center text-center">
        <motion.p
          className="text-brand-gold font-sans font-semibold tracking-[0.2em] text-sm mb-4"
          initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          ON THIS DAY
        </motion.p>
        
        <motion.h1
          className="font-serif text-6xl md:text-7xl font-bold text-white text-shadow-strong"
          initial={{ opacity: 0, y: -50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100, damping: 20 }}
        >
          {typedText}
          <motion.span 
            className="inline-block w-1 bg-brand-gold h-[0.8em] ml-1 align-baseline"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          />
        </motion.h1>
      </div>
    </motion.div>
  );
}
