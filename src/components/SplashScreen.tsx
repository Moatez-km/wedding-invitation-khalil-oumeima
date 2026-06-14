import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Lang, t } from '../translations';

interface SplashScreenProps {
  lang: Lang;
  onOpen: () => void;
  onPlayAudio: () => void;
}

export function SplashScreen({ lang, onOpen, onPlayAudio }: SplashScreenProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnmounting, setIsUnmounting] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    onPlayAudio();
    setTimeout(() => {
      setIsUnmounting(true);
    }, 1800); // Wait for open animation to finish
  };
  
  useEffect(() => {
    if (isUnmounting) {
      setTimeout(() => {
         onOpen();
      }, 1000); // Time for fade out
    }
  }, [isUnmounting, onOpen]);

  return (
    <AnimatePresence>
      {!isUnmounting && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream-900/40 backdrop-blur-sm overflow-hidden cursor-pointer selection:bg-transparent"
          style={{ perspective: '1200px' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
          onClick={handleOpen}
        >
           {/* 3D Envelope */}
           <motion.div 
              className="relative w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] drop-shadow-2xl"
              animate={isOpen ? { scale: 1.1, y: 30 } : { scale: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
           >
             {/* Envelope Back */}
             <div className="absolute inset-0 bg-[#e6ddd0] rounded-md shadow-inner" />
             
             {/* Letter inside */}
             <motion.div 
               className="absolute top-3 left-3 right-3 bottom-3 bg-cream-900 rounded-sm shadow-md flex flex-col items-center justify-start pt-16 px-6 border border-gold-300 pointer-events-none"
               initial={{ y: 0 }}
               animate={isOpen ? { y: -250, opacity: 0, scale: 0.95 } : { y: 0, opacity: 1, scale: 1 }}
               transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
             >
                <p className="uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold text-gold-600 mb-6 text-center">{t.splashPre[lang]}</p>
                <div className="flex flex-col items-center font-heading text-4xl sm:text-5xl text-text-main gap-2">
                  <span>Khalil</span>
                  <span className="font-light text-3xl sm:text-4xl text-gold-400">&</span>
                  <span>Oumeima</span>
                </div>
             </motion.div>
             
             {/* Left Flap */}
             <div className="absolute inset-0 bg-[#f1eade] rounded-md drop-shadow-[2px_0_4px_rgba(0,0,0,0.02)]" style={{ clipPath: 'polygon(0 0, 52% 51%, 0 100%)' }} />
             {/* Right Flap */}
             <div className="absolute inset-0 bg-[#f1eade] rounded-md drop-shadow-[-2px_0_4px_rgba(0,0,0,0.02)]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 48% 51%)' }} />
             {/* Bottom Flap */}
             <div className="absolute inset-0 bg-[#f6f0ea] rounded-md drop-shadow-[0_-2px_6px_rgba(0,0,0,0.03)]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 48%)' }} />
             
             {/* Top Flap */}
             <motion.div 
               className="absolute inset-0 bg-[#ebe3d5] rounded-md z-10 origin-top flex items-start justify-center pt-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]" 
               style={{ clipPath: 'polygon(0 0, 100% 0, 50% 54%)' }}
               initial={{ rotateX: 0 }}
               animate={isOpen ? { rotateX: -180, zIndex: 0 } : { rotateX: 0, zIndex: 10 }}
               transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
             >
               <div className="w-full h-full bg-gradient-to-b from-black/5 to-transparent opacity-30" />
             </motion.div>
             
             {/* Wax Seal */}
             <motion.div 
               className="absolute top-[51%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#dfa9a9] to-[#bf7e7e] border border-[#ae6f6f] shadow-[0_4px_10px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center z-20 pointer-events-none"
               animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
               transition={{ duration: 0.3 }}
             >
               <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#d29595] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                 <span className="font-heading text-lg sm:text-xl text-[#fefafa] tracking-widest leading-none mt-1 shadow-black/10 drop-shadow-sm">K<span className="text-sm px-1">&</span>O</span>
               </div>
             </motion.div>
           </motion.div>
           
           <motion.div
             className="flex flex-col items-center gap-3 text-gold-600 mt-16 pointer-events-none"
             initial={{ opacity: 0 }}
             animate={isOpen ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
             transition={isOpen ? { duration: 0.3 } : { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
           >
             <span className="font-heading text-lg italic text-text-muted">{t.splashSub[lang]}</span>
             <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em]">{t.splashHint[lang]}</span>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
