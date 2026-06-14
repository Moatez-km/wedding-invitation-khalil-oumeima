import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Lang, t } from '../translations';
import { FloralDivider } from './Shared';

interface EventProps {
  label: string;
  venueName: string;
  date: string;
  time: string;
  location: string;
  mapQuery: string;
  lang: Lang;
}

function EventBlock({ label, venueName, date, time, location, mapQuery, lang }: EventProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center text-center w-full max-w-2xl mx-auto mb-24 last:mb-0"
    >
      {/* Tiny Header with Lines */}
      <div className="flex items-center justify-center gap-4 w-full mb-6">
        <div className="h-[1px] w-12 bg-text-muted/30"></div>
        <span className="uppercase tracking-[0.2em] text-[10px] sm:text-xs text-text-muted font-semibold">{label}</span>
        <div className="h-[1px] w-12 bg-text-muted/30"></div>
      </div>

      {/* Main Title (Venue Name) */}
      <h3 className="font-heading text-5xl sm:text-6xl text-text-main mb-8 leading-tight">{venueName}</h3>
      
      {/* Date */}
      <div className="uppercase tracking-[0.25em] text-sm sm:text-base text-text-main font-light mb-3">
        {date}
      </div>

      {/* Time */}
      <div className="uppercase tracking-[0.15em] text-[10px] sm:text-xs text-gold-600 font-semibold mb-3">
        {time}
      </div>

      {/* Location */}
      <div className="uppercase tracking-[0.1em] text-[10px] sm:text-xs text-text-muted font-light mb-10 w-full px-4">
        {location}
      </div>

      {/* Map Card */}
      <div className="w-full max-w-xl h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-gold-300 shadow-md bg-cream-900 mb-8 p-1">
        <div className="w-full h-full rounded-xl overflow-hidden pointer-events-none">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'saturate(0.5) contrast(1.1) brightness(1.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-auto"
          ></iframe>
        </div>
      </div>

      {/* Action Button */}
      <a 
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#e2bebe] hover:bg-[#d8a8a8] text-white px-8 py-3.5 rounded-full uppercase tracking-widest text-[10px] sm:text-xs font-semibold transition-colors duration-300 shadow-sm"
      >
        <MapPin className="w-4 h-4" strokeWidth={2.5} />
        {lang === 'fr' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'}
      </a>
    </motion.div>
  );
}

export function Schedule({ lang }: { lang: Lang }) {
  return (
    <section className="py-24 px-6 relative z-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header Wrapper matching the image style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 w-full mb-6">
            <div className="h-[1px] w-12 sm:w-20 bg-text-muted/30"></div>
            <h2 className="uppercase tracking-[0.2em] text-xs sm:text-sm text-text-muted font-semibold">{t.scheduleTitle[lang]}</h2>
            <div className="h-[1px] w-12 sm:w-20 bg-text-muted/30"></div>
          </div>
          <div className="mb-8">
             {/* Small abstract bell/arch icon similar to the image */}
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-500 mx-auto">
               <path d="M12 3L2 13H5C5 16.866 8.13401 20 12 20C15.866 20 19 16.866 19 13H22L12 3Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
               <path d="M12 24C13.6569 24 15 22.6569 15 21H9C9 22.6569 10.3431 24 12 24Z" fill="currentColor"/>
               <circle cx="12" cy="12" r="3" fill="currentColor"/>
             </svg>
          </div>
        </motion.div>

        <div className="w-full flex flex-col gap-8">
          <EventBlock 
            label={t.event1Title[lang]}
            venueName={t.event1Venue[lang]}
            date={t.event1Date[lang]}
            time={t.event1Time[lang]}
            location={t.event1Loc[lang]}
            mapQuery="Jardin de mariage de Madame Daoud Boumhal"
            lang={lang}
          />

          <EventBlock 
            label={t.event2Title[lang]}
            venueName={t.event2Venue[lang]}
            date={t.event2Date[lang]}
            time={t.event2Time[lang]}
            location={t.event2Loc[lang]}
            mapQuery="La Reine salle des fêtes Ain Zaghouen"
            lang={lang}
          />
        </div>
      </div>
    </section>
  );
}
