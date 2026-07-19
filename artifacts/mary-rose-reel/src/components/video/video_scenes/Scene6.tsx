import { motion } from 'framer-motion';

export function Scene6() {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full overflow-hidden bg-brand-charcoal flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-32 h-32 border-2 border-brand-gold/30 rounded-full flex items-center justify-center mb-8 relative"
        initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 border-t-2 border-brand-gold rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <span className="font-serif text-4xl text-brand-gold font-bold italic">H</span>
      </motion.div>

      <motion.h3
        className="font-sans text-xl tracking-[0.3em] text-brand-sand mb-3 font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        HISTORY
      </motion.h3>

      <motion.p
        className="font-serif text-brand-gold/70 italic text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Uncover the past.
      </motion.p>
      
      <motion.div
        className="mt-16 w-full max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
      />
    </motion.div>
  );
}
