import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Lang } from '../translations';

interface SplashScreenProps {
  lang: Lang;
  onOpen: () => void;
  onPlayAudio: () => void;
}

export function SplashScreen({ lang, onOpen, onPlayAudio }: SplashScreenProps) {
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleStartVideo = () => {
    if (hasStarted) return;
    setHasStarted(true);
    videoRef.current?.play().catch(err => {
      console.error("Video playback failed:", err);
    });
  };

  const handleVideoEnded = () => {
    setIsUnmounting(true);
    onPlayAudio();
  };
  
  useEffect(() => {
    if (isUnmounting) {
      const timer = setTimeout(() => {
         onOpen();
      }, 1200); // Match exit transition duration
      return () => clearTimeout(timer);
    }
  }, [isUnmounting, onOpen]);

  return (
    <AnimatePresence>
      {!isUnmounting && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden selection:bg-transparent cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
          onClick={handleStartVideo}
        >
          {/* Background Video - Click to start, transitions on end */}
          <video
            ref={videoRef}
            src="/splash.mp4"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            muted
            playsInline
            onEnded={handleVideoEnded}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}


