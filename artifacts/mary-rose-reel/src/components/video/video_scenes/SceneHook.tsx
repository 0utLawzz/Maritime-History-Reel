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
      className="absolute inset-0 flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: '#1C1C1C' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
    >
      {/* Gold radial burst */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(212,175,55,0.18) 0%, rgba(0,0,0,0) 65%)',
        }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1.6, opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* ON THIS DAY label */}
        <motion.p
          className="text-brand-gold font-sans font-semibold tracking-[0.2em] text-sm mb-4"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          ON THIS DAY
        </motion.p>

        {/* Date with typewriter */}
        <motion.h1
          className="font-serif text-7xl font-bold text-white"
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {typedText}
          <motion.span
            style={{ display: 'inline-block', width: '4px', background: '#D4AF37', height: '0.8em', marginLeft: '4px', verticalAlign: 'baseline' }}
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          />
        </motion.h1>

        {/* Decorative gold line */}
        <motion.div
          style={{ height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37, transparent)', marginTop: '24px' }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '180px', opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        <motion.p
          className="font-sans text-sm tracking-widest mt-4"
          style={{ color: 'rgba(245,245,220,0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          1545
        </motion.p>
      </div>
    </motion.div>
  );
}
