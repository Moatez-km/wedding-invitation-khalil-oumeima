import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { Lang } from './translations';
import { BokehBackground } from './components/Shared';
import { SplashScreen } from './components/SplashScreen';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Schedule } from './components/Schedule';
import { Closing } from './components/Closing';

export default function App() {
  const [lang, setLang] = useState<Lang>('fr');
  const [splashOpen, setSplashOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio when splash is opened
  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.error("Audio playback failed:", err);
        });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  // Prevent scrolling when splash is open
  useEffect(() => {
    if (splashOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      window.scrollTo(0, 0);
    }
  }, [splashOpen]);

  return (
    <div className="relative min-h-screen font-body flex flex-col">
      {/* Background Layer */}
      <BokehBackground />

      {/* Controls Container (Fixed on top right) */}
      <div className="fixed top-6 right-6 lg:top-10 lg:right-10 z-50 flex items-center gap-3">
        {/* Audio Toggle Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="flex items-center justify-center bg-cream-900/60 backdrop-blur-md p-2.5 border border-gold-400/20 rounded-full shadow-sm text-gold-500 hover:text-gold-600 active:scale-95 transition-all cursor-pointer"
            title={isMuted ? "Unmute Music" : "Mute Music"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 animate-pulse" />
            )}
          </button>
        )}

        {/* Language Toggle */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase bg-cream-900/60 backdrop-blur-md px-3 py-2 border border-gold-400/20 rounded-full shadow-sm">
          <button 
            onClick={() => setLang('fr')} 
            className={`transition-colors px-2 cursor-pointer ${lang === 'fr' ? 'text-gold-500' : 'text-text-muted hover:text-text-main'}`}
          >
            FR
          </button>
          <div className="w-[1px] h-3 bg-gold-400/30"></div>
          <button 
            onClick={() => setLang('en')} 
            className={`transition-colors px-2 cursor-pointer ${lang === 'en' ? 'text-gold-500' : 'text-text-muted hover:text-text-main'}`}
          >
            EN
          </button>
        </div>
      </div>

      <AnimatePresence>
        {splashOpen && (
          <SplashScreen 
            lang={lang} 
            onOpen={() => setSplashOpen(false)} 
            onPlayAudio={handlePlayAudio}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`${splashOpen ? 'h-screen overflow-hidden' : ''}`}>
        <Hero lang={lang} />
        <Countdown lang={lang} />
        <Schedule lang={lang} />
        <Closing lang={lang} />
      </main>

      {/* Background audio */}
      <audio 
        ref={audioRef} 
        src="/music.mp3" 
        loop 
        preload="auto"
      />
    </div>
  );
}

