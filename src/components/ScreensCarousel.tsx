"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView, useAnimation } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ScreenItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function ScreensCarousel() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(2); // Start with middle item
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Parallax effect for background with increased intensity
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.6, 1], [0, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  
  const springBgY = useSpring(bgY, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 120, damping: 30 });
  
  // Screen data
  const screens: ScreenItem[] = [
    { src: "/images/Flow Timer Screenshot.png", alt: "Flow Timer", title: "Flow Timer", description: "Dominate your productive zones" },
    { src: "/images/Chatbot Screenshot.png", alt: "Chatbot", title: "KI-Coach", description: "Your personal demon" },
    { src: "/images/Dashboard Screenshot.png", alt: "Dashboard", title: "Dashboard", description: "Command center of power" },
    { src: "/images/Habit Tracker Screenshot.png", alt: "Habit Tracker", title: "Habits", description: "Engineer your discipline" },
    { src: "/images/Traininsplan Screenshot.png", alt: "Trainingsplan", title: "Training", description: "Forge your limits" },
  ];
  
  // Update mouse position for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Handle automatic animation and user interaction
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const nextScreen = () => {
    setActiveIndex(prev => (prev + 1) % screens.length);
  };
  
  const prevScreen = () => {
    setActiveIndex(prev => (prev - 1 + screens.length) % screens.length);
  };
  
  // Auto-rotate carousel
  useEffect(() => {
    if (!isDragging) {
      const timer = setTimeout(() => nextScreen(), 5000);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, isDragging]);
  
  // Returns position and scale for each item based on its index relative to activeIndex
  const getItemStyles = (index: number) => {
    const diff = (index - activeIndex + screens.length) % screens.length;
    let normalizedDiff = diff;
    
    // Normalize diff to be between -2 and 2
    if (diff > 2) normalizedDiff = diff - screens.length;
    
    // Create a circular position effect
    const x = normalizedDiff * 120; // Base x offset - increased spacing
    const z = -Math.abs(normalizedDiff) * 120; // Items further away go behind
    const opacity = 1 - Math.min(1, Math.abs(normalizedDiff) * 0.6); // Fade out based on distance - more dramatic
    
    // Scale down items as they move away from center - more dramatic
    let scale = 1 - Math.min(0.3, Math.abs(normalizedDiff) * 0.2);
    
    // Rotation effect - tilt away from center - more dramatic
    const rotateY = normalizedDiff * 15;
    
    return {
      zIndex: 100 - Math.abs(normalizedDiff) * 10,
      x: `${x}%`,
      scale,
      opacity,
      rotateY: `${rotateY}deg`,
      filter: `blur(${Math.abs(normalizedDiff) * 2}px)`,
    };
  };

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#050505] py-32 text-white overflow-hidden"
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080808] to-black opacity-80 z-0" />
      
      {/* Animated background elements - more intense */}
      <motion.div 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ 
          y: springBgY,
          backgroundImage: "radial-gradient(circle at center, rgba(220, 30, 30, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
          backgroundSize: "150% 150%",
          backgroundPosition: "center",
        }}
      />
      
      {/* Dynamic spotlight effect following mouse */}
      <motion.div 
        className="absolute blur-[200px] bg-gradient-to-r from-red-950/20 to-red-900/10 rounded-full w-[500px] h-[500px] z-0 opacity-40"
        style={{ 
          left: `${mousePosition.x - 250}px`, 
          top: `${mousePosition.y - 250}px` 
        }}
        animate={{
          width: ["500px", "600px", "500px"],
          height: ["500px", "600px", "500px"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Glowing lines across background - more dramatic */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={`line-${i}`}
            className="absolute h-[1px] w-full left-0 bg-gradient-to-r from-transparent via-red-600/50 to-transparent"
            style={{ 
              top: `${10 + i * 12}%`,
              x: useTransform(scrollYProgress, [0, 1], ['-100%', '150%']),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.9, 0.2]),
            }}
          />
        ))}
      </div>
      
      {/* VHS scanlines effect */}
      <div className="absolute inset-0 bg-repeat-y z-0 vhs-static opacity-8" />

      {/* Harsh grid pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-8 z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          <div className="mb-16">
            <motion.span 
              className="inline-flex items-center px-4 py-1 mb-3 border-l-2 border-red-700 bg-red-950/30 text-red-500 text-sm font-mono tracking-wider uppercase"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              VISUALIZE THE WEAPON
            </motion.span>
            
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
              This Is Your Daimonion.
            </h2>
            
            <p className="text-gray-400 mt-6 text-xl max-w-2xl leading-relaxed font-medium">
              Brutal. Minimalist. Engineered for <span className="text-white font-bold">Devastating Focus & Uncompromising Accountability</span>.
              <span className="block mt-2 text-red-500">No Bullshit. Only Results.</span>
            </p>
          </div>
        </motion.div>

        {/* Main 3D carousel with increased dramatization */}
        <div className="relative h-[700px] perspective-[1500px] my-10">
          <motion.div 
            className="transform-3d h-full"
            style={{ scale: springScale }}
            animate={{ rotateX: "8deg" }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            {screens.map((screen, index) => (
              <motion.div
                key={screen.alt}
                className="absolute top-0 left-0 right-0 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0 }}
                animate={getItemStyles(index)}
                transition={{ 
                  type: "spring", 
                  stiffness: 350, 
                  damping: 30 
                }}
                onClick={() => setActiveIndex(index)}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, info) => {
                  setIsDragging(false);
                  if (info.offset.x > 100) {
                    prevScreen();
                  } else if (info.offset.x < -100) {
                    nextScreen();
                  }
                }}
                whileHover={index === activeIndex ? { scale: 1.08, transition: { duration: 0.3 } } : {}}
              >
                <motion.div 
                  className={`relative flex-shrink-0 w-[280px] sm:w-[320px] rounded-[32px] overflow-hidden ${index === activeIndex ? 'shadow-2xl shadow-red-900/30' : 'shadow-xl'}`}
                  animate={index === activeIndex ? {
                    boxShadow: ["0 25px 50px -12px rgba(153, 27, 27, 0.3)", "0 25px 50px -12px rgba(153, 27, 27, 0.5)", "0 25px 50px -12px rgba(153, 27, 27, 0.3)"]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Dramatic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-transparent to-black/90 opacity-70 z-10" />
                  
                  {/* Enhanced phone frame */}
                  <div className="absolute inset-0 rounded-[32px] border-[8px] border-[#0c0c0c] z-20 pointer-events-none" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0c0c0c] rounded-b-xl z-20 pointer-events-none" />
                  
                  {/* Screen content */}
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={320}
                    height={700}
                    quality={90}
                    priority={index === activeIndex}
                    className="object-cover w-full h-[700px]"
                  />
                  
                  {/* Dramatic highlight reflection */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-10"
                    animate={index === activeIndex ? {
                      opacity: [0.2, 0.5, 0.2]
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Harsh screen glitch effect - active only on active screen */}
                  {index === activeIndex && (
                    <motion.div 
                      className="absolute inset-0 bg-red-500/5 z-10 opacity-0"
                      animate={{ 
                        opacity: [0, 0.8, 0],
                        y: [0, 5, 0],
                        scaleY: [1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 0.15, 
                        repeat: Infinity, 
                        repeatDelay: 5,
                      }}
                    />
                  )}
                  
                  {/* VHS scan line that moves down active screen */}
                  {index === activeIndex && (
                    <motion.div 
                      className="absolute left-0 right-0 h-[2px] bg-white/10 z-20 pointer-events-none"
                      animate={{ 
                        y: [0, 700, 0],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "linear"
                      }}
                    />
                  )}
                </motion.div>
                
                {/* Enhanced caption with more dramatic styling */}
                {index === activeIndex && (
                  <motion.div 
                    className="mt-8 text-center relative z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-1">{screen.title}</h3>
                    <p className="text-red-500 font-medium uppercase tracking-wider text-sm">{screen.description}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Control buttons with more aggressive styling */}
          <div className="absolute left-0 right-0 bottom-0 flex justify-center gap-6 mt-8">
            <motion.button
              onClick={prevScreen}
              className="w-12 h-12 rounded-md flex items-center justify-center bg-black/70 backdrop-blur-sm border border-red-950/50 hover:bg-red-950/40 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <div className="flex space-x-3 items-center">
              {screens.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`w-3 h-3 rounded-sm ${idx === activeIndex ? 'bg-red-600' : 'bg-gray-800'}`}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0.6 }}
                  animate={idx === activeIndex ? {
                    opacity: 1,
                    boxShadow: "0 0 10px rgba(220, 38, 38, 0.5)"
                  } : { opacity: 0.6 }}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextScreen}
              className="w-12 h-12 rounded-md flex items-center justify-center bg-black/70 backdrop-blur-sm border border-red-950/50 hover:bg-red-950/40 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Enhanced bottom gradient fade */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"
        animate={{
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
} 