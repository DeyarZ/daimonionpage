"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FinalCTA() {
  // States for various dynamic effects
  const [isPulsing, setIsPulsing] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Track mouse position for spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1.0] }
      });
    }
  }, [isInView, controls]);

  useEffect(() => {
    // Toggle pulsing state at different intervals for organic feel
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
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

  return (
    <section className="relative bg-black py-28 overflow-hidden">
      {/* Dramatic dark background */}
      <div className="absolute inset-0 bg-[#050505] z-0" />
      
      {/* Dramatic pulsing red glow effect */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-0"
        animate={{
          opacity: isPulsing ? [0.25, 0.4, 0.25] : [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity
        }}
      >
        <div className="w-[90%] h-[80%] rounded-full blur-[200px] bg-red-900/15" />
      </motion.div>
      
      {/* Dynamic spotlight effect following mouse */}
      <motion.div 
        className="absolute blur-[150px] bg-gradient-to-r from-red-950/15 to-red-900/10 rounded-full w-[600px] h-[600px] z-0 opacity-70 transition-all duration-300 ease-out pointer-events-none"
        style={{ 
          left: `${mousePosition.x - 300}px`, 
          top: `${mousePosition.y - 300}px` 
        }}
      />
      
      {/* Harsh grid pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-8 z-0" />
      
      {/* VHS-style scan lines */}
      <div className="absolute inset-0 vhs-static opacity-10 z-0" />
      
      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-950/40 to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-950/40 to-transparent z-0"></div>

      <div className="relative z-10 container mx-auto px-8 text-center" ref={containerRef}>
        <div ref={ref}>
          {/* Main headline with dramatic animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            className="mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight relative"
              animate={{
                textShadow: ["0 0 10px rgba(200, 0, 0, 0)", "0 0 15px rgba(200, 0, 0, 0.3)", "0 0 10px rgba(200, 0, 0, 0)"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="block mb-2">Either you control your day.</span>
              <span className="block">Or your day controls you.</span>
              <motion.div 
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent"
                animate={{
                  width: ["96px", "192px", "96px"],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.h2>
            
            <motion.p 
              className="text-3xl md:text-4xl font-extrabold mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-white">Get Daimonion.</span>{" "}
              <span className="font-mono bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 relative">
                Become dangerously disciplined.
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-[2px] bg-red-700"
                  animate={{
                    scaleX: [0, 1, 1, 1, 0],
                    opacity: [0, 1, 1, 1, 0],
                    left: ["0%", "0%", "0%", "0%", "100%"]
                  }}
                  transition={{
                    duration: 5,
                    times: [0, 0.2, 0.8, 0.9, 1],
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              </span>
            </motion.p>
          </motion.div>

          {/* CTA Buttons with dramatic effects */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="https://apps.apple.com/de/app/daimonion/id6740612619"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-xl ${isPulsing ? 'shadow-lg shadow-red-950/30' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-950 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                animate={{
                  opacity: [0, isPulsing ? 0.08 : 0.05, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100"
                whileHover={{
                  background: "radial-gradient(circle at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.2) 100%)"
                }}
              />
              <Image
                src="/images/App Store.png"
                alt="Download on App Store"
                width={220}
                height={70}
                priority
                className="relative z-10"
              />
              <motion.div
                className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 z-0"
                animate={isHovered ? {
                  boxShadow: [
                    "0 0 10px 2px rgba(153, 27, 27, 0.3)",
                    "0 0 15px 3px rgba(153, 27, 27, 0.5)",
                    "0 0 10px 2px rgba(153, 27, 27, 0.3)"
                  ]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.a>
            
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.daimonion.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-xl ${isPulsing ? 'shadow-lg shadow-red-950/30' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-950 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                animate={{
                  opacity: [0, isPulsing ? 0.08 : 0.05, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100"
                whileHover={{
                  background: "radial-gradient(circle at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.2) 100%)"
                }}
              />
              <Image
                src="/images/Google Play.png"
                alt="Download on Google Play"
                width={220}
                height={70}
                priority
                className="relative z-10"
              />
              <motion.div
                className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 z-0"
                animate={{
                  boxShadow: [
                    "0 0 10px 2px rgba(153, 27, 27, 0)",
                    "0 0 15px 3px rgba(153, 27, 27, 0.3)",
                    "0 0 10px 2px rgba(153, 27, 27, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.a>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-gray-400 text-sm mb-20 font-mono tracking-wider"
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ delay: 0.6 }}
          >
            <span className="text-red-500 font-bold">FREE.</span> NO ADS. ONLY TRUTH.
          </motion.p>

          {/* Footer with enhanced design */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {/* Footer divider */}
            <div className="w-full max-w-4xl mx-auto h-px bg-red-950/30 mb-12" />

            {/* Footer links with hover effects */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 text-sm text-gray-500">
              <motion.a
                href="/legal-notice"
                className="text-neutral-300 hover:text-white text-sm px-4 py-1 transition-colors"
              >
                Legal Notice
              </motion.a>
              
              <span className="text-neutral-500 mx-2">•</span>
              
              <motion.a
                href="/privacy-policy"
                className="text-neutral-300 hover:text-white text-sm px-4 py-1 transition-colors"
              >
                Privacy Policy
              </motion.a>
              
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{
                    textShadow: ["0 0 5px rgba(200, 0, 0, 0)", "0 0 8px rgba(200, 0, 0, 0.3)", "0 0 5px rgba(200, 0, 0, 0)"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Wizard Dynamics
                </motion.span>
              </div>
              
              <p className="text-xs mt-4 md:mt-0 font-medium">Built with <span className="text-red-600">🔥</span> by two wild motherfuckers from Munich.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 