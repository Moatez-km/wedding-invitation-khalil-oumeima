import { motion } from 'motion/react';
import { Lang, t } from '../translations';
import { FloralDivider } from './Shared';

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
      {/* Background Image with Elegant Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65"
        style={{ backgroundImage: "url('/bg-home.jpg')" }}
      />
      <div className="absolute inset-0 bg-cream-900/50 backdrop-blur-[1px]" />
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream-900 to-transparent pointer-events-none" />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
          hidden: {}
        }}
        className="flex flex-col items-center max-w-3xl z-10"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } }
          }}
          className="flex items-center gap-4 justify-center mb-6 w-full"
        >
          <div className="h-[0.5px] w-8 sm:w-16 bg-gold-400/40"></div>
          <span className="uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold text-gold-500">
            {t.heroPre[lang]}
          </span>
          <div className="h-[0.5px] w-8 sm:w-16 bg-gold-400/40"></div>
        </motion.div>

        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
          }}
          className="font-script text-7xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8rem] shimmer-text mb-6 flex flex-col items-center justify-center leading-none"
        >
          <span className="py-2">Khalil</span> 
          <span className="font-heading font-light text-4xl sm:text-5xl text-gold-400 -my-2 select-none">&</span> 
          <span className="py-2">Oumeima</span>
        </motion.h1>

        <motion.div 
          className="flex flex-col items-center px-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } }
          }}
        >
          <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-gold-600/70 font-medium">{t.heroDay[lang]}</p>
          <p className="font-heading text-4xl sm:text-5xl md:text-6xl text-gold-500 font-light tracking-wide mt-1.5">{t.heroDate[lang]}</p>
          
          <div className="flex items-center gap-3 justify-center my-6">
            <div className="h-[0.5px] w-8 bg-gold-400/40"></div>
            <svg className="w-2.5 h-2.5 text-gold-500 fill-gold-500" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-[0.5px] w-8 bg-gold-400/40"></div>
          </div>

          <p className="uppercase tracking-[0.2em] text-[10px] sm:text-xs text-gold-600/80 font-medium max-w-lg mx-auto leading-relaxed">{t.heroLoc[lang]}</p>
        </motion.div>
      </motion.div>

    </section>
  );
}
