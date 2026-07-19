import { motion } from 'framer-motion';

export function Scene3() {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full overflow-hidden"
      initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
      animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, rotate: -2 }}
        animate={{ scale: 1.05, rotate: 0 }}
        transition={{ duration: 5, ease: "linear" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/ship-deck.jpg`}
          alt="Ship deck extreme angle"
          className="w-full h-full object-cover origin-bottom"
        />
        <div className="absolute inset-0 bg-brand-charcoal/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
      </motion.div>

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center p-8">
        <motion.p
          className="font-serif text-3xl text-center text-brand-sand leading-snug text-shadow-strong"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          In 1545, Henry VIII's proudest warship sank in minutes—
        </motion.p>
        
        <motion.p
          className="font-serif text-4xl text-center text-brand-gold font-bold mt-6 text-shadow-gold"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 2, type: "spring", stiffness: 100 }}
        >
          right in front of him.
        </motion.p>
      </div>
    </motion.div>
  );
}
