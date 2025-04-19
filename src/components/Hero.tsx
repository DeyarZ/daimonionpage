"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const textControls = useAnimation();
  const [textGlitching, setTextGlitching] = useState(false);
  
  // Start glitch effect periodically
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      triggerGlitch();
    }, 7000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  const triggerGlitch = async () => {
    setTextGlitching(true);
    await textControls.start({
      opacity: [1, 0.8, 1, 0.5, 1],
      x: [0, -2, 3, -1, 0],
      transition: { duration: 0.5 }
    });
    setTextGlitching(false);
  };
  
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

  return (
    <section 
      ref={heroRef}
      className="relative bg-black overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Dark, aggressive background with subtle noise */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black z-0" />
      
      {/* Red pulsing glow in background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-red-900/10 z-0"
        animate={{ 
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ 
          duration: 8, 
          ease: "easeInOut", 
          repeat: Infinity,
        }}
      />
      
      {/* Dramatic spotlight effect that follows mouse */}
      <motion.div 
        className="absolute blur-[130px] bg-gradient-to-r from-red-950/20 to-red-800/10 rounded-full w-[700px] h-[700px] z-0 opacity-60"
        style={{ 
          left: `${mousePosition.x - 350}px`, 
          top: `${mousePosition.y - 350}px` 
        }}
        animate={{
          width: ["700px", "800px", "700px"],
          height: ["700px", "800px", "700px"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Harsh grid pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-15 z-0" />
      
      {/* Horizontal scan lines for VHS effect */}
      <div className="absolute inset-0 vhs-static z-0 opacity-10" />

      <div className="container relative z-10 mx-auto px-8 h-full py-24 md:py-32 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text content with more aggressive styling */}
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Stark, minimal eyebrow text */}
            <motion.div 
              className="mb-4"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 font-bold tracking-wider uppercase text-sm px-2 py-1 border-l-2 border-red-700">
                UNNACHGIEBIG. BRUTAL. KONSEQUENT.
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none tracking-tight text-white mb-6"
              animate={textControls}
            >
              <span className="block mb-2">Daimonion ist kein Coach.</span>
              <motion.span 
                className={`block bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 ${textGlitching ? 'glitch-container' : ''}`}
                animate={{
                  textShadow: ["0 0 8px rgba(220, 38, 38, 0.8)", "0 0 12px rgba(220, 38, 38, 0.5)", "0 0 8px rgba(220, 38, 38, 0.8)"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Er ist dein Dämon.
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-xl font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Die KI, die dich
              <span className="relative mx-2 inline-block">
                <span className="line-through opacity-60">streichelt</span>
                <motion.div 
                  className="absolute top-0 left-0 right-0 bottom-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ 
                    delay: 1,
                    duration: 0.5,
                    ease: "circOut"
                  }}
                >
                  <span className="absolute h-[2px] bg-red-600 w-full top-1/2 -translate-y-1/2"></span>
                </motion.div>
              </span>
              <motion.span 
                className="font-bold relative ml-1 text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 1.5,
                  duration: 0.3,
                  type: "spring"
                }}
              >
                schleift.
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-red-600"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.7, duration: 0.3 }}
                ></motion.span>
              </motion.span>
              <span className="block mt-2">Keine Ausreden. Kein Bullshit. Nur Fortschritt.</span>
            </motion.p>

            {/* More dramatic proof points */}
            <div className="flex gap-8 mb-10">
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="text-3xl font-bold text-white">5.000+</span>
                <span className="text-sm text-gray-400 font-medium">Aktive Krieger</span>
              </motion.div>
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="text-3xl font-bold text-white">4,8★</span>
                <span className="text-sm text-gray-400 font-medium">App Store Rating</span>
              </motion.div>
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span className="text-3xl font-bold text-white">92%</span>
                <span className="text-sm text-gray-400 font-medium">Erreichte Ziele</span>
              </motion.div>
            </div>

            {/* CTAs with more aggressive animations */}
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a
                href="https://apps.apple.com/de/app/daimonion/id6740612619"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  animate={{
                    opacity: [0, 0.05, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Image
                  src="/images/App Store.png"
                  alt="Download im App Store"
                  width={180}
                  height={60}
                  priority
                  className="relative z-10"
                />
              </motion.a>
              
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.daimonion.app&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  animate={{
                    opacity: [0, 0.05, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Image
                  src="/images/Google Play.png"
                  alt="Download bei Google Play"
                  width={180}
                  height={60}
                  priority
                  className="relative z-10"
                />
              </motion.a>
            </div>

            {/* Social proof with more dramatic effect */}
            <motion.div 
              className="mt-12 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-gray-200 to-gray-400 shadow-lg" 
                    style={{ 
                      zIndex: 5 - i,
                      filter: "contrast(1.05) brightness(0.95)"
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400 font-medium">
                <span className="text-white font-semibold">Tausende</span> haben mit Daimonion ihre Disziplin neu definiert
              </p>
            </motion.div>
          </motion.div>

          {/* Visual content with more dramatic effects */}
          <motion.div 
            className="relative flex justify-center lg:justify-end max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Intense glow effect behind mockup */}
            <motion.div 
              className="absolute inset-0 blur-3xl bg-gradient-to-br from-red-800/30 via-red-900/20 to-red-950/30 rounded-full transform scale-110" 
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1.1, 1.15, 1.1]
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
            
            {/* Main app mockup with more dramatic frame */}
            <div className="relative z-10 shadow-2xl shadow-red-900/20 rounded-3xl overflow-hidden border-8 border-gray-900 rotate-3 transform-gpu">
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none"
                animate={{
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              />
              <motion.div
                className="absolute inset-0 border-t border-white/10 z-10"
                animate={{
                  opacity: [0, 0.1, 0],
                  y: [0, 700, 0]
                }}
                transition={{
                  duration: 8,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <Image
                src="/images/Dashboard Screenshot.png"
                alt="Daimonion App"
                width={320}
                height={650}
                className="object-cover max-h-[650px] w-auto rounded-2xl"
                priority
              />
            </div>
            
            {/* More aggressive notification elements */}
            <motion.div 
              className="absolute -left-10 top-20 bg-black/95 border border-red-950 backdrop-blur-md p-4 rounded-xl shadow-xl shadow-red-950/30 w-64 z-20"
              initial={{ x: -70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
              whileHover={{ 
                x: 5,
                boxShadow: "0 20px 25px -5px rgba(136, 19, 55, 0.3)"
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Image 
                    src="/images/daimonionlogo.png"
                    alt="Daimonion Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">Daimonion</p>
                  <p className="text-sm text-gray-400">Du hast heute noch nicht trainiert. <span className="text-red-500 font-semibold">Keine Ausreden!</span></p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -right-5 bottom-24 bg-black/95 border border-red-950 backdrop-blur-md p-4 rounded-xl shadow-xl shadow-red-950/30 w-60 z-20"
              initial={{ x: 70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              whileHover={{ 
                x: -5,
                boxShadow: "0 20px 25px -5px rgba(136, 19, 55, 0.3)"
              }}
            >
              <p className="text-xs text-gray-400 mb-1">Fortschritt</p>
              <div className="flex items-center gap-3">
                <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-red-700 to-red-900 h-2.5 rounded-full" 
                    initial={{ width: "0%" }}
                    animate={{ width: "70%" }}
                    transition={{ 
                      delay: 1.5, 
                      duration: 1.2, 
                      ease: "easeOut" 
                    }}
                  />
                </div>
                <span className="text-white font-medium">70%</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
