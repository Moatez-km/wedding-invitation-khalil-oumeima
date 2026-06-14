import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function FloralDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 20" className={`w-32 h-auto text-gold-500 fill-current mx-auto opacity-70 ${className || ''}`} xmlns="http://www.w3.org/2000/svg">
      <path d="M50 2C48 5 44 8 40 10C44 12 48 15 50 18C52 15 56 12 60 10C56 8 52 5 50 2Z" />
      <path d="M35 10H10" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <path d="M65 10H90" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="50" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="44" cy="10" r="1" fill="currentColor"/>
      <circle cx="56" cy="10" r="1" fill="currentColor"/>
    </svg>
  );
}

export function BokehBackground() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width === 0) return null; // Avoid hydration layout shifts

  // Generate 35 falling petals
  const particles = Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    x: Math.random() * windowSize.width,
    size: Math.random() * 8 + 6, // 6px to 14px
    duration: Math.random() * 15 + 15, // 15s to 30s
    delay: Math.random() * -30,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-gradient-to-br from-[#eecfcf] to-[#e6b9b9] opacity-[0.65]"
          style={{ 
            width: p.size, 
            height: p.size * 1.5, 
            borderRadius: '50% 0 50% 0', // Petal shape
            top: -20, 
            left: p.x 
          }}
          animate={{
            y: [0, windowSize.height + 50],
            x: [0, Math.random() * 150 - 75, Math.random() * 150 - 75],
            rotate: [p.rotation, p.rotation + 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-cream-800)_0%,_var(--color-cream-900)_100%)] opacity-50"></div>
    </div>
  );
}
