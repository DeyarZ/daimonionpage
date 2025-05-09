"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

// Interface für mehrsprachige Inhalte
interface LocalizedContent {
  startTransformation: string;
  headline: string;
  tagline: string;
  transformText: string;
  notMotivating: string;
  transforming: string;
  appStore: string;
  downloadIn: string;
  googlePlay: string;
  downloadAt: string;
  statsTransformed: string;
  statsKompromisslos: string;
}

const translations: Record<string, LocalizedContent> = {
  de: {
    startTransformation: "Jetzt downloaden",
    headline: "Diese App zerstört deine Ausreden – in 7 Tagen.",
    tagline: "Die KI, die dich anschreit, bis du lieferst.",
    transformText: "Kein Bullshit.",
    notMotivating: "Keine Ausreden.",
    transforming: "Nur brutale Ergebnisse.",
    appStore: "App Store",
    downloadIn: "Download im",
    googlePlay: "Google Play",
    downloadAt: "Laden im",
    statsTransformed: "Veränderte Leben",
    statsKompromisslos: "Brutal ehrlich",
  },
  en: {
    startTransformation: "Download Now",
    headline: "This app destroys your excuses – in 7 days.",
    tagline: "The AI that screams at you until you deliver.",
    transformText: "No bullshit.",
    notMotivating: "No excuses.",
    transforming: "Only brutal results.",
    appStore: "App Store",
    downloadIn: "Download on",
    googlePlay: "Google Play",
    downloadAt: "GET IT NOW ON",
    statsTransformed: "Lives changed",
    statsKompromisslos: "Brutally honest",
  }
};

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showMask, setShowMask] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { locale, setLocale } = useLanguage();
  
  // Texte basierend auf Sprache
  const content = translations[locale] || translations.de;
  
  // Handle app store redirect based on device
  const handleAppStoreRedirect = (e: React.MouseEvent) => {
    // Don't block the reveal animation
    handleReveal();
    
    // Delay redirect to allow animation to play
    setTimeout(() => {
      // Check if window is defined (for SSR)
      if (typeof window !== 'undefined') {
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Check for iOS devices
        if (/iphone|ipad|ipod/.test(userAgent)) {
          window.location.href = 'https://apps.apple.com/de/app/daimonion/id6740612619';
        }
        // Check for Android devices
        else if (/android/.test(userAgent)) {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.daimonion.app';
        }
        // Fallback for other devices
        else {
          // Stay on the landing page or use a fallback URL
          // window.location.href = '/download';
        }
      }
    }, 1500); // Match the delay from handleReveal
  };
  
  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsRevealed(true), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 20);
      
      return () => clearInterval(interval);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Audio playback
  const toggleAudio = () => {
    if (!audioEnabled && audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.3;
      setAudioEnabled(true);
    } else if (audioRef.current) {
      audioRef.current.pause();
      setAudioEnabled(false);
    }
  };
  
  // Handle reveal effect  
  const handleReveal = () => {
    setShowMask(true);
    if (!audioEnabled && audioRef.current) {
      toggleAudio();
    }
    
    // Automatisch die rote Maske nach einer kurzen Verzögerung ausblenden
    // und zur nächsten Sektion scrollen
    setTimeout(() => {
      setShowMask(false);
      const featuresSection = document.getElementById('features-section');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    }, 1500);
  };
  
  return (
    <section 
      ref={heroRef}
      className="relative bg-black overflow-hidden hero-wrapper"
      style={{ 
        minHeight: "100vh", 
        paddingTop: "clamp(32px, 8vh, 72px)",
        paddingBottom: "clamp(32px, 5vh, 64px)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)"
      }}
    >
      {/* Dark, aggressive background with subtle noise */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black z-0" />
      
      {/* Darker overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60 z-1" />
      
      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src="/audio/heartbeat.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Audio toggle button */}
      {isRevealed && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={toggleAudio}
          className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-red-900/40 backdrop-blur-sm flex items-center justify-center hover:bg-red-900/60 transition-colors"
        >
          {audioEnabled ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </motion.button>
      )}
      
      {/* Loading sequence */}
      {!isRevealed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black">
          <div className="flex flex-col items-center max-w-lg">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full mb-4"
            >
              <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-red-600"
                  style={{ width: `${loadingProgress}%` }}
                  initial={{ width: "0%" }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-gray-500 uppercase tracking-wider text-sm font-mono mb-2">INITIATING DAEMON SEQUENCE</p>
              <p className="text-red-600 font-bold">{loadingProgress}%</p>
              <p className="text-xs text-gray-600 mt-8 font-mono">
                {loadingProgress < 50 ? "SCANNING MENTAL WEAKNESSES..." : 
                 loadingProgress < 75 ? "CALIBRATING PAIN THRESHOLD..." : 
                 loadingProgress < 90 ? "PREPARING TRANSFORMATION PROTOCOL..." : 
                 "DAEMON READY"}
              </p>
            </motion.div>
          </div>
        </div>
      )}
      
      {/* Main Hero Content - Revealed after loading */}
      <AnimatePresence>
        {isRevealed && (
          <>
            {/* Red pulsing glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black z-0"
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ 
                duration: 8, 
                ease: "easeInOut", 
                repeat: Infinity,
              }}
            />
            
            {/* Dynamic spotlight that follows cursor */}
            <motion.div 
              className="absolute blur-[180px] bg-gradient-to-r from-red-700/40 to-red-900/20 rounded-full w-[800px] h-[800px] z-0"
              style={{ 
                left: `${mousePosition.x - 400}px`, 
                top: `${mousePosition.y - 400}px` 
              }}
              animate={{
                width: ["800px", "900px", "800px"],
                height: ["800px", "900px", "800px"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Harsh grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20 z-0" />
            
            {/* Horizontal scan lines */}
            <div className="absolute inset-0 bg-scanlines opacity-15 z-1"></div>
            
            {/* Glitch particles */}
            <div className="absolute inset-0 z-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-1 h-6 bg-red-600/80"
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: Math.random() * 100 + '%',
                    opacity: 0 
                  }}
                  animate={{ 
                    x: Math.random() * 100 + '%',
                    y: Math.random() * 100 + '%',
                    opacity: [0, 1, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
            
            {/* Main content container */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="container relative z-10 mx-auto px-4 flex flex-col justify-center items-center"
              style={{ 
                minHeight: "calc(100vh - clamp(64px, 13vh, 136px))",
              }}
            >
              <div 
                className="flex flex-col items-center text-center max-w-4xl w-full"
                style={{ 
                  gap: "clamp(12px, 2.5vh, 28px)"
                }}
              >
                <motion.div 
                  className="mb-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span 
                    className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 font-bold tracking-widest uppercase px-6 py-1 max-w-full inline-block"
                    style={{ 
                      fontSize: "clamp(12px, 3vw + 2px, 16px)"
                    }}
                  >
                    {content.headline}
                  </span>
                </motion.div>
                
                <motion.h1 
                  className="font-bold tracking-tighter text-white leading-none"
                  style={{ 
                    fontSize: "clamp(35px, 7.7vw + 4px, 70px)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 1,
                    duration: 0.8
                  }}
                >
                  <span className="block">DAIMONION</span>
                </motion.h1>
                
                <motion.p 
                  className="text-white font-medium leading-tight"
                  style={{ 
                    fontSize: "clamp(16px, 3.2vw + 2px, 22px)"
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                >
                  <span className="block">Die KI, die dich anschreit,</span>
                  <span className="block">bis du lieferst.</span>
                </motion.p>
                
                {/* Interactive button */}
                <motion.button
                  className="group relative overflow-hidden bg-gradient-to-b from-red-600 to-red-900 hover:from-red-700 hover:to-red-950 text-white py-6 rounded-md uppercase tracking-wider font-bold w-[90%] max-w-[500px]"
                  style={{
                    minHeight: "48px",
                    fontSize: "clamp(16px, 4.2vw, 20px)"
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0)", "0 0 0 8px rgba(239, 68, 68, 0.3)", "0 0 0 0 rgba(239, 68, 68, 0)"]
                  }}
                  transition={{ 
                    delay: 1.6,
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }
                  }}
                  onClick={handleAppStoreRedirect}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">{content.startTransformation}</span>
                  <motion.div 
                    className="absolute inset-0 bg-red-600 z-0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute top-0 right-0 bottom-0 left-0 z-20 opacity-0 group-hover:opacity-30 overflow-hidden">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute h-0.5 bg-white"
                        style={{ 
                          left: `${Math.random() * 100}%`, 
                          top: `${Math.random() * 100}%`, 
                          width: `${Math.random() * 40 + 10}px` 
                        }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          x: [0, Math.random() * 20 - 10]
                        }}
                        transition={{
                          duration: 0.2,
                          repeat: Infinity,
                          repeatType: "mirror"
                        }}
                      />
                    ))}
                  </div>
                </motion.button>
                
                <motion.p
                  className="text-[#BFBFBF] text-xs download-note"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.65 }}
                  style={{ 
                    fontSize: "12px", 
                    fontWeight: "normal",
                    marginBottom: "clamp(10px, 2vh, 24px)"
                  }}
                >
                  Kostenlos im App Store oder Google Play
                </motion.p>
                
                <div className="flex flex-col items-center" style={{ 
                  gap: "clamp(6px, 1.2vh, 12px)",
                  marginTop: "clamp(0px, 0.5vh, 4px)" 
                }}>
                  <motion.p
                    className="text-[#FF4545] text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    Nur heute: 7-Tage-Free-Trial sichern
                  </motion.p>
                  
                  {/* Rating line with stars and user counts */}
                  <motion.div 
                    className="flex items-center justify-center gap-2 bg-black/30 backdrop-blur-sm rounded-full py-2 px-4 whitespace-nowrap text-center"
                    style={{ 
                      fontSize: "15px",
                      fontWeight: 500,
                      marginTop: "clamp(10px, 2vh, 16px)"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.9 }}
                  >
                    <div className="flex items-center star-rating" style={{ 
                      color: "#FFDD55", 
                      opacity: 1,
                      textShadow: "0 0 4px rgba(255, 221, 85, 0.5)",
                      fontSize: "18px",
                      marginRight: "2px"
                    }}>
                      <span>★★★★</span><span style={{ opacity: 0.5 }}>★</span>
                    </div>
                    <span className="text-white">4,8</span>
                    <span className="text-gray-400 mx-1">·</span>
                    <span className="text-white">5.000+ Nutzer</span>
                  </motion.div>
                  
                  {/* 100% Brutal ehrlich pill */}
                  <motion.div
                    className="px-2 py-0.5 text-[11px] bg-[#2a2a2a] rounded-full text-gray-200"
                    style={{
                      marginTop: "clamp(6px, 1.5vh, 12px)"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.95 }}
                  >
                    100% Brutal ehrlich
                  </motion.div>
                </div>
                
                {/* App Store Buttons */}
                <motion.div 
                  className="flex flex-row gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0 }}
                >
                  <motion.a
                    href="https://apps.apple.com/de/app/daimonion/id6740612619"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl bg-black/30 transition-all duration-300 transform scale-80"
                    whileHover={{ scale: 0.85, y: -2 }}
                    whileTap={{ scale: 0.78 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                    
                    {/* App Store Button */}
                    <div className="flex items-center px-5 py-3">
                      <svg viewBox="0 0 24 24" width="20" height="20" className="text-white mr-3">
                        <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.12 2.28-.84 3.76-.71 1.45.12 2.49.61 3.18 1.5-2.5 1.65-2.08 4.75-.08 6.19-.8 1.83-2.18 3.87-3.94 5.19zm-4.12-14.45c.1-1.95 1.63-3.57 3.36-3.83.31 2.08-.59 4.19-3.36 3.83z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-gray-400">{content.downloadIn}</div>
                        <div className="text-white font-semibold">{content.appStore}</div>
                      </div>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href="https://play.google.com/store/apps/details?id=com.daimonion.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl bg-black/30 transition-all duration-300 transform scale-80"
                    whileHover={{ scale: 0.85, y: -2 }}
                    whileTap={{ scale: 0.78 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                    
                    {/* Google Play Button */}
                    <div className="flex items-center px-5 py-3">
                      <svg viewBox="0 0 24 24" width="20" height="20" className="text-white mr-3">
                        <path fill="currentColor" d="M3.609 1.814L13.792 12 3.609 22.186c-.181.181-.29.423-.29.683v.063c0 .26.109.499.29.683.181.181.427.29.687.29.26 0 .506-.109.687-.29l10.875-10.875c.181-.181.29-.423.29-.683s-.109-.503-.29-.683L4.983.841C4.802.66 4.556.551 4.296.551c-.26 0-.506.109-.687.29-.181.181-.29.423-.29.683v.063c0 .26.109.502.29.683z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-gray-400">{content.downloadAt}</div>
                        <div className="text-white font-semibold">{content.googlePlay}</div>
                      </div>
                    </div>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Screen-mask transition effect */}
            <AnimatePresence>
              {showMask && (
                <motion.div 
                  className="fixed inset-0 bg-red-900 z-50 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div 
                    className="relative"
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="/images/daimonionlogo.png"
                      alt="Daimonion"
                      width={300}
                      height={300}
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
