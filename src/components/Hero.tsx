import { motion } from 'motion/react';
import { Lang, t } from '../translations';
import { FloralDivider } from './Shared';

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-20">
      
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
        <motion.span 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } }
          }}
          className="uppercase tracking-[0.25em] text-xs font-semibold text-gold-500 mb-6"
        >
          {t.heroPre[lang]}
        </motion.span>

        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
          }}
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] shimmer-text mb-6 flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-4 pb-2"
        >
          <span>Khalil</span> <span className="font-light text-5xl sm:text-[7rem] text-gold-400 my-1 sm:-mt-2">&</span> <span>Oumeima</span>
        </motion.h1>

        <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 1 } } }}>
          <FloralDivider className="mb-8 w-40 text-gold-500" />
        </motion.div>

        <motion.div 
          className="flex flex-col gap-4 font-light tracking-[0.1em] text-text-main text-sm sm:text-base md:text-lg px-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } }
          }}
        >
          <p className="uppercase text-gold-600">{t.heroDate[lang]}</p>
          <p className="text-text-muted">{t.heroLoc[lang]}</p>
        </motion.div>
      </motion.div>

    </section>
  );
}
