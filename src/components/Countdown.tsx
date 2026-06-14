import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Lang, t } from '../translations';
import { FloralDivider } from './Shared';

export function Countdown({ lang }: { lang: Lang }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // 19 July 2026 21:00 UTC+1 (Tunisia)
    const targetDate = new Date('2026-07-19T21:00:00+01:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: t.countdownUnits[lang][0] },
    { value: timeLeft.hours, label: t.countdownUnits[lang][1] },
    { value: timeLeft.minutes, label: t.countdownUnits[lang][2] },
    { value: timeLeft.seconds, label: t.countdownUnits[lang][3] },
  ];

  return (
    <section className="py-24 px-6 relative z-10 bg-cream-800/50 backdrop-blur-sm border-y border-gold-400/20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto flex flex-col items-center"
      >
        <h2 className="font-heading text-3xl md:text-5xl text-gold-500 mb-6 italic">{t.countdownTitle[lang]}</h2>
        <FloralDivider className="mb-12 w-32 opacity-70 text-gold-400" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-6 bg-cream-900/80 border border-gold-300 rounded-sm shadow-xl shadow-gold-600/5">
              <span className="font-heading text-4xl sm:text-5xl lg:text-6xl text-gold-500 mb-2 leading-none">
                {unit.value.toString().padStart(2, '0')}
              </span>
              <span className="uppercase text-[10px] sm:text-xs tracking-widest text-text-muted">{unit.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
