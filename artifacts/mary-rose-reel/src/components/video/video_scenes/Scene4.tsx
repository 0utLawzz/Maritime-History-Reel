import { motion } from 'framer-motion';

export function Scene4() {
  return (
    <motion.div 
      className="absolute inset-0 w-full h-full overflow-hidden bg-brand-navy"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ y: "10%", scale: 1.1 }}
        animate={{ y: "-5%", scale: 1 }}
        transition={{ duration: 7, ease: "linear" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/underwater-nets.jpg`}
          alt="Underwater netting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-light/80 via-transparent to-brand-navy/90" />
      </motion.div>

      <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 py-20">
        <motion.p
          className="font-sans font-medium text-xl text-center text-brand-sand/90 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          A single gust of wind was all it took.
        </motion.p>

        <motion.div
          className="bg-black/40 backdrop-blur-sm p-6 border-l-4 border-brand-gold"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.8, type: "spring" }}
        >
          <p className="font-serif text-2xl md:text-3xl text-white leading-snug">
            Over <span className="text-brand-gold font-bold">400 men drowned</span> — trapped by anti-boarding nets meant to protect them.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
