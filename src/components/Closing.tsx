import { motion } from 'motion/react';
import { Lang, t } from '../translations';
import { FloralDivider } from './Shared';

export function Closing({ lang }: { lang: Lang }) {
  return (
    <section className="py-32 px-6 relative z-10 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <FloralDivider className="mb-10 w-40 opacity-70 text-gold-500" />
        
        <p className="font-heading text-2xl md:text-3xl lg:text-4xl leading-relaxed italic text-gold-600 mb-12 px-4 shadow-sm shadow-transparent">
          "{t.closingQuote[lang]}"
        </p>

        <p className="uppercase tracking-[0.3em] text-sm font-semibold text-text-main">
          {t.closingEnd[lang]}
        </p>
        
        <FloralDivider className="mt-10 w-40 opacity-70 rotate-180 text-gold-500" />
      </motion.div>
    </section>
  );
}
