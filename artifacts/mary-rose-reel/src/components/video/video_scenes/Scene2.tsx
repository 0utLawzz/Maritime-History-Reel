import { motion } from 'framer-motion';

export function Scene2() {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full overflow-hidden"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.2, y: "5%" }}
        animate={{ scale: 1, y: "0%" }}
        transition={{ duration: 6, ease: "easeOut" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/ship-tilting.jpg`}
          alt="Mary Rose Warship"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex flex-col justify-end h-full pb-24">
        <motion.h2
          className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight text-shadow-strong text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          The Ship That Sank<br />
          <motion.span 
            className="text-brand-gold italic text-shadow-gold block mt-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            in Front of the King
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
