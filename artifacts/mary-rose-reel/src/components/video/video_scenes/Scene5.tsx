import { motion } from 'framer-motion';

export function Scene5() {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1, x: "-2%" }}
        transition={{ duration: 6, ease: "linear" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/museum-hull.jpg`}
          alt="Museum hull display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-navy/30 to-brand-navy/60" />
      </motion.div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 pb-32">
        <motion.p
          className="font-serif text-3xl text-brand-sand/90 text-center text-shadow-strong leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Centuries later, her wreck was found—
        </motion.p>
        
        <motion.p
          className="font-serif text-4xl font-bold text-white text-center mt-4 text-shadow-strong"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2, ease: "easeOut" }}
        >
          perfectly preserved <br/>
          <span className="text-brand-gold italic font-normal text-3xl">in time.</span>
        </motion.p>
      </div>
    </motion.div>
  );
}
