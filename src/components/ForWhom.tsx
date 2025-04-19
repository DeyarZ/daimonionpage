"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

// More dramatic animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.4 }
  }
};

const pillarVariants = {
  hidden: { opacity: 0, y: 120 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 1.8, 
      ease: [0.25, 0.1, 0.25, 1.0],
      delay: 0.2 * index
    }
  })
};

const glowVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: [0.3, 0.7, 0.3], 
    transition: { 
      duration: 8,
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatType: "mirror" as const
    }
  }
};

// More violent flame animation
const flameVariants = {
  hidden: { opacity: 0, scaleY: 0.7 },
  visible: {
    opacity: [0.4, 0.7, 0.4],
    scaleY: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const archetypes = [
  {
    id: "builder",
    emoji: "🧔",
    title: "Der Builder",
    description: "Du arbeitest an deinem Business, Sidehustle oder an dir selbst. Struktur, Fokus und radikale Ehrlichkeit sind keine Option – sondern Pflicht.",
    color: "from-red-700/90 to-red-900/90",
    textGlow: "text-red-500",
    accentGlow: "red-500",
    shadow: "shadow-red-900/40",
    topGlow: "#ff2a1f",
    iconFilter: "brightness(1.2) contrast(1.1)",
    offset: 0,
    borderColor: "border-red-900/30"
  },
  {
    id: "thinker",
    emoji: "🧠",
    title: "Der Denker im Chaos",
    description: "Du hast große Ideen, aber dein Alltag ist ein Schlachtfeld aus Dopamin. Daimonion bringt dich raus aus der Verzettelung – rein in die Umsetzung.",
    color: "from-blue-700/90 to-blue-900/90",
    textGlow: "text-blue-400",
    accentGlow: "blue-500",
    shadow: "shadow-blue-900/40",
    topGlow: "#0051ff",
    iconFilter: "brightness(1.2) saturate(1.2)",
    offset: -30,
    borderColor: "border-blue-900/30"
  },
  {
    id: "seeker",
    emoji: "🏋️",
    title: "Der Disziplin-Sucher",
    description: "Du willst fitter, klarer und mental stärker werden – aber kämpfst mit Ablenkung. Du brauchst eine Stimme, die dich accountable hält, wenn du schwach wirst.",
    color: "from-purple-700/90 to-purple-900/90",
    textGlow: "text-purple-400",
    accentGlow: "purple-500",
    shadow: "shadow-purple-900/40",
    topGlow: "#8000ff",
    iconFilter: "brightness(1.1) saturate(1.1)",
    offset: -60,
    borderColor: "border-purple-900/30"
  },
  {
    id: "warrior",
    emoji: "🥷",
    title: "Der Unsichtbare Krieger",
    description: "Du sagst nichts – aber du weißt, dass da mehr in dir steckt. Du brauchst keine Likes. Du brauchst Resultate.",
    color: "from-gray-800/90 to-black/90",
    textGlow: "text-gray-300",
    accentGlow: "gray-400",
    shadow: "shadow-gray-900/60",
    topGlow: "#333333",
    iconFilter: "brightness(0.9) contrast(1.2)",
    offset: -90,
    borderColor: "border-gray-700/30"
  }
];

export default function ForWhom() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const controls = useAnimationControls();

  // Trigger periodic flame animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (inView) {
        controls.start({
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
          transition: { duration: 3, ease: "easeInOut" }
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [inView, controls]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section 
      ref={ref} 
      className="relative bg-black min-h-screen overflow-hidden py-24 lg:py-32"
      id="for-whom"
    >
      {/* Dramatic noir background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080808] to-black z-0" />

      {/* Harsh texture overlays */}
      <div className="absolute inset-0 bg-[url('/images/stone-texture.svg')] bg-repeat opacity-10 mix-blend-overlay z-0" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-40 mix-blend-multiply z-0" />
      
      {/* Aggressive fire/flame effect */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        animate={controls}
      >
        <motion.div 
          className="absolute w-full h-full bg-[url('/images/flame-texture.svg')] bg-cover opacity-10 mix-blend-overlay transform scale-125 rotate-12 z-0"
          variants={flameVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
      </motion.div>

      {/* Altar-like glow in center */}
      <motion.div 
        variants={glowVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full opacity-20 blur-[150px] bg-gradient-to-r from-red-950 via-red-900 to-red-950 z-0"
      />

      {/* Harsh diagonal lines */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-950/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-950/70 to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-red-950/70 to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-red-950/70 to-transparent"></div>
        
        {/* Diagonal cross */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-full h-[1px] bg-red-800 transform rotate-45"></div>
          <div className="w-full h-[1px] bg-red-800 transform -rotate-45"></div>
        </div>
      </div>
      
      <div className="container relative z-10 max-w-7xl mx-auto px-6">
        {/* Main title section with more dramatic presentation */}
        <div className="relative">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center mb-8 relative"
          >
            {/* Main title with more dramatic shadow and effect */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white inline-block relative tracking-tight">
              <span className="relative z-10">Für wen ist Daimonion gemacht?</span>
              <span className="absolute -left-1 top-1 w-full h-full blur-lg opacity-80 bg-clip-text text-transparent bg-gradient-to-b from-red-600 to-red-900 z-0"></span>
            </h2>
            
            {/* More distinct graphic element */}
            <div className="mt-6 flex justify-center">
              <div className="relative">
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-red-700 to-transparent"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-900 rotate-45 transform -translate-y-1/2"></div>
              </div>
            </div>
          </motion.div>
          
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-xl md:text-2xl font-bold text-center max-w-3xl mx-auto mb-24 text-gray-200 drop-shadow-lg"
          >
            Nicht für Opfer. Nicht für Ausredenkünstler. 
            <span className="block text-red-500">
              Sondern für Krieger, die mehr vom Leben wollen.
            </span>
          </motion.p>
        </div>
        
        {/* Cards as 3D pillars in a temple-like arrangement with more dramatic lighting */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`relative grid ${isMobile ? 'grid-cols-1 gap-16' : 'grid-cols-4 gap-8'} mt-8`}
        >
          {archetypes.map((type, index) => (
            <motion.div
              key={type.id}
              custom={index}
              variants={pillarVariants}
              className="relative group"
              whileHover={{ y: -15, transition: { duration: 0.4, ease: "easeOut" } }}
              onMouseEnter={() => setHoveredCard(type.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ 
                perspective: "1200px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Top light beam with more intensity */}
              <motion.div 
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-1 h-24 opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(to bottom, ${type.topGlow}, transparent)`,
                  boxShadow: `0 0 30px 10px ${type.topGlow}`,
                  transform: isMobile ? 
                    `rotate3d(0, 0, 0, 0deg) translateY(${type.offset}px)` : 
                    `rotate3d(1, 0, 0, 25deg) translateY(${type.offset}px)`
                }}
                animate={hoveredCard === type.id ? {
                  opacity: [0, 0.6, 0.4],
                  height: ["24px", "100px", "96px"]
                } : {}}
                transition={{
                  duration: 0.8,
                  ease: "easeOut"
                }}
              />
              
              {/* Glow around card with more intensity */}
              <motion.div 
                className={`absolute inset-0 -m-1 rounded-xl opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-500 bg-gradient-to-b ${type.color}`}
                animate={hoveredCard === type.id ? {
                  opacity: [0, 0.7, 0.5],
                  scale: [0.9, 1.05, 1]
                } : {}}
                transition={{
                  duration: 0.8,
                  ease: "easeOut"
                }}
              />
              
              {/* Card with more dramatic 3D transformation */}
              <div 
                className={`h-full flex flex-col p-8 rounded-xl bg-gradient-to-b ${type.color} ${type.shadow} backdrop-blur-lg ${type.borderColor} border relative overflow-hidden`}
                style={{
                  transform: isMobile ? 
                    "rotateX(0deg)" : 
                    "rotateX(25deg)",
                  transformOrigin: "center bottom"
                }}
              >
                {/* Dramatic lighting effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
                
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 shadow-inner pointer-events-none" />
                
                {/* Enhanced glitch effects for Thinker */}
                {type.id === 'thinker' && (
                  <div className="absolute inset-0 glitch-overlay opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                )}
                
                {/* Emoji icon with more dramatic presentation */}
                <div className="mb-6 relative">
                  <motion.div 
                    className="text-5xl md:text-6xl relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                    style={{ filter: type.iconFilter }}
                    animate={hoveredCard === type.id ? {
                      scale: [1, 1.2, 1.1],
                      rotate: [0, 5, 0]
                    } : {}}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                  >
                    {type.emoji}
                  </motion.div>
                  <motion.div 
                    className={`absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-50 bg-${type.accentGlow}`}
                    animate={hoveredCard === type.id ? {
                      opacity: [0, 0.5, 0.3]
                    } : {}}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                  />
                </div>
                
                {/* Title with enhanced glow effect */}
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${type.textGlow} group-hover:text-white transition-colors duration-300 drop-shadow-lg`}>
                  {type.title}
                </h3>
                
                {/* Description with better readability */}
                <p className="text-gray-100 leading-relaxed mb-6 opacity-90 font-medium tracking-wide">
                  {type.description}
                </p>
                
                {/* Animated bottom light line */}
                <motion.div 
                  className="mt-auto w-20 h-[2px] bg-white/30 group-hover:bg-white/70 transition-all duration-300 rounded-full"
                  animate={hoveredCard === type.id ? {
                    width: ["20%", "60%", "20%"]
                  } : {}}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Enhanced shadow beneath card */}
              <motion.div 
                className="absolute -bottom-8 left-1/2 w-[80%] h-[20px] -translate-x-1/2 rounded-full blur-xl opacity-30 bg-black z-0"
                animate={hoveredCard === type.id ? {
                  opacity: [0.3, 0.6, 0.3],
                  width: ["80%", "90%", "80%"]
                } : {}}
                transition={{
                  duration: 0.8,
                  ease: "easeOut"
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Dramatic accent at the bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-24 flex justify-center"
        >
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 bg-red-900/20 rounded-full blur-xl pulse-highlight"></div>
            <div className="absolute inset-2 border-2 border-red-900/30 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-red-700 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 