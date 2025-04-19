"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Periodically trigger glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 10000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Navigation items
  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#screens", label: "Screens" },
    { href: "#testimonials", label: "Stimmen" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? "bg-[#0e0e0e] border-b border-neutral-800" 
          : "bg-black/50 backdrop-blur-sm"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      {/* Animated scan line that moves across the header */}
      <motion.div 
        className="absolute h-[1px] bg-white/10 w-full top-0 left-0 right-0"
        animate={{ 
          top: ["0%", "100%", "0%"],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 8, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "loop"
        }}
      />

      {/* Subtle noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo/Wordmark - Left */}
        <Link href="/" className="relative z-10 group">
          <motion.div
            className={`relative ${glitchActive ? 'glitch-element' : ''}`}
            whileHover={{ 
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
            }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/images/daimonionlogo.png"
              alt="Daimonion"
              width={56}
              height={11}
              className="relative"
            />
            
            {/* Glitch effect */}
            {glitchActive && (
              <>
                <motion.div 
                  className="absolute inset-0 opacity-70 text-red-500"
                  style={{ 
                    clipPath: "polygon(0 15%, 100% 15%, 100% 40%, 0 40%)",
                    transform: "translate(2px, 0)"
                  }}
                >
                  <Image
                    src="/images/daimonionlogo.png"
                    alt=""
                    width={56}
                    height={11}
                    className="relative"
                  />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 opacity-70 text-blue-500"
                  style={{ 
                    clipPath: "polygon(0 65%, 100% 65%, 100% 80%, 0 80%)",
                    transform: "translate(-2px, 0)"
                  }}
                >
                  <Image
                    src="/images/daimonionlogo.png"
                    alt=""
                    width={56}
                    height={11}
                    className="relative"
                  />
                </motion.div>
              </>
            )}
            
            {/* Subtle glow effect on hover */}
            <motion.div 
              className="absolute -inset-1 opacity-0 group-hover:opacity-20 rounded-md blur-md bg-gradient-to-r from-white via-white to-white transition-opacity duration-300"
              aria-hidden="true"
            />
          </motion.div>
        </Link>

        {/* Navigation - Right */}
        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex space-x-6 font-mono text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative"
                onMouseEnter={() => setHoverLink(item.label)}
                onMouseLeave={() => setHoverLink(null)}
              >
                <motion.span
                  className="text-white/80 hover:text-white transition-colors duration-300"
                  whileHover={{ y: -1 }}
                >
                  {item.label}
                </motion.span>
                
                {/* Bottom border cut effect on hover */}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white/70"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: hoverLink === item.label ? 1 : 0,
                    originX: 0
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </Link>
            ))}
          </nav>

          {/* Call to Action */}
          <motion.a
            href="https://apps.apple.com/de/app/daimonion/id6740612619"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/10 bg-white/5 hover:bg-white/10 rounded-md px-4 py-2 text-sm text-white transition-colors duration-300"
            whileHover={{ 
              y: -1, 
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ y: 0 }}
          >
            <span className="relative inline-flex items-center">
              <span className="relative z-10">Jetzt laden</span>
              
              {/* Optional: Subtle flame icon */}
              <motion.span 
                className="ml-1.5 text-xs"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔥
              </motion.span>
            </span>
          </motion.a>

          {/* Mobile menu toggle - only visible on mobile */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 focus:outline-none"
            aria-label="Open mobile menu"
          >
            <span className="sr-only">Menu</span>
            <div className="w-5 flex flex-col space-y-1.5">
              <span className="block h-px w-5 bg-white"></span>
              <span className="block h-px w-3.5 ml-1.5 bg-white"></span>
              <span className="block h-px w-5 bg-white"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Subtle bottom border/scanner effect */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent" />
            
            {/* Animated scanner dot */}
            <motion.div 
              className="absolute top-0 left-0 w-[40px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ 
                left: ["-40px", "calc(100% + 40px)"],
              }}
              transition={{ 
                duration: 4,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 