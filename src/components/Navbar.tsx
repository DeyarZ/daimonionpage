"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  // Periodically trigger glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 8000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md py-3 shadow-md shadow-red-950/20"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      {/* Top border line with gradient */}
      {isScrolled && (
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-900/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
      )}
      
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        {/* Logo with glitch effect */}
        <Link href="/" className="relative z-10 group">
          <motion.div
            className={`logo-container ${glitchActive ? 'glitch-effect' : ''}`}
            whileHover={{ 
              filter: "drop-shadow(0 0 8px rgba(200, 0, 0, 0.5))",
            }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/images/daimonion-logo.png"
              alt="Daimonion Logo"
              width={150}
              height={30}
              className="relative z-10"
            />
            {/* Red accent line under logo that appears on hover */}
            <motion.div 
              className="absolute -bottom-1 left-0 h-[2px] bg-red-700 z-0"
              initial={{ width: 0, opacity: 0 }}
              whileHover={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </Link>

        {/* Desktop menu items */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { href: "#features", label: "Features" },
            { href: "#fuer-wen", label: "Für Wen" },
            { href: "#testimonials", label: "Testimonials" },
          ].map((link) => (
            <Link href={link.href} key={link.href} legacyBehavior>
              <motion.a
                className="text-gray-300 hover:text-white font-medium relative text-sm group cursor-pointer"
                whileHover={{ x: 1 }}
              >
                <span className="relative">
                  {link.label}
                  {/* Red underline animation */}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-red-700 block"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1, originX: 0 }}
                    transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                  />
                </span>
                {/* Subtle text glow effect on hover */}
                <motion.span
                  className="absolute inset-0 text-white -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 0.8,
                    filter: "blur(2px)",
                    textShadow: "0 0 8px rgba(200, 0, 0, 0.8)"
                  }}
                  aria-hidden="true"
                >
                  {link.label}
                </motion.span>
              </motion.a>
            </Link>
          ))}

          {/* CTA Button */}
          <motion.a
            href="https://apps.apple.com/de/app/daimonion/id6740612619"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-gradient-to-br from-red-800 to-red-950 hover:from-red-700 hover:to-red-900 font-medium text-sm ml-2 px-4 py-2 rounded-md relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <span className="relative z-10">Download</span>
            
            {/* Animated shimmer effect */}
            <motion.span 
              className="absolute inset-0 w-[40%] h-full bg-gradient-to-r from-transparent via-red-800/20 to-transparent -z-5"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop",
                duration: 2,
                ease: "linear",
                repeatDelay: 1
              }}
              style={{ 
                background: "linear-gradient(to right, transparent, rgba(200, 0, 0, 0.2), transparent)" 
              }}
            />
            
            {/* Button glow on hover */}
            <motion.span 
              className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ boxShadow: "inset 0 0 0 0 rgba(200, 0, 0, 0)" }}
              whileHover={{ boxShadow: "inset 0 0 8px 2px rgba(200, 0, 0, 0.3), 0 0 10px 2px rgba(200, 0, 0, 0.2)" }}
              transition={{ duration: 0.2 }}
            />
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden relative z-10 w-9 h-9 flex flex-col justify-center items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          <motion.span
            className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <motion.span
            className={`block w-6 h-[2px] bg-white mt-1.5 mb-1.5 transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <motion.span
            className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
          
          {/* Glowing border when active */}
          <motion.span 
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: mobileMenuOpen 
                ? "0 0 0 1px rgba(200, 0, 0, 0.5), 0 0 8px 2px rgba(200, 0, 0, 0.3)" 
                : "0 0 0 0 transparent"
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
} 