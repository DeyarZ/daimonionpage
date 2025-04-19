"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const menuLinks = [
    { href: "#features", label: "Features" },
    { href: "#fuer-wen", label: "Für Wen" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "https://apps.apple.com/de/app/daimonion/id6740612619", label: "Download" }
  ];

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md overflow-hidden"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      exit="closed"
    >
      {/* Red diagonal accent line */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900/40 to-transparent transform rotate-[1deg] origin-top-right" />
      
      {/* Brutal grid pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-5" 
           style={{
             backgroundImage: `repeating-linear-gradient(rgba(255,0,0,0.1) 0px, transparent 1px, transparent 5px),
                              repeating-linear-gradient(90deg, rgba(255,0,0,0.1) 0px, transparent 1px, transparent 5px)`,
             backgroundSize: '50px 50px'
           }}
      />
      
      {/* VHS-style scan lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: `linear-gradient(transparent 50%, rgba(255, 0, 0, 0.05) 50%)`,
             backgroundSize: '100% 4px'
           }}
      />
      
      {/* Pulsing red vignette */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 50%, rgba(100, 0, 0, 0.4) 100%)'
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto h-full px-6 flex flex-col justify-center items-start">
        <nav className="w-full max-w-sm py-10">
          <ul className="space-y-8">
            {menuLinks.map((link, index) => (
              <motion.li key={index} variants={itemVariants}>
                <Link 
                  href={link.href}
                  className="group relative"
                  onClick={onClose}
                >
                  <div className="overflow-hidden relative">
                    <motion.span
                      className="text-white text-3xl font-bold inline-block relative"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {link.label}
                      
                      {/* Red underline that animates on hover */}
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-red-700 block"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileHover={{ scaleX: 1, originX: 0 }}
                        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                      />
                    </motion.span>
                    
                    {/* Glitch/noise effect on hover */}
                    <motion.div
                      className="absolute inset-0 z-10 opacity-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.5 }}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        mixBlendMode: "overlay"
                      }}
                    />
                  </div>
                  
                  {/* Red glow on hover */}
                  <motion.span 
                    className="absolute inset-0 z-0 text-red-600 font-bold text-3xl opacity-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ 
                      opacity: 0.3,
                      filter: "blur(8px)",
                      textShadow: "0 0 8px rgba(200, 0, 0, 1)"
                    }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        {/* Close button */}
        <motion.button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex justify-center items-center text-white rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="sr-only">Close menu</span>
          <motion.span 
            className="absolute w-[2px] h-6 bg-red-600 rotate-45"
            initial={{ height: 0 }}
            animate={{ height: 24 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="absolute w-[2px] h-6 bg-red-600 -rotate-45"
            initial={{ height: 0 }}
            animate={{ height: 24 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
          
          {/* Glowing ring around close button */}
          <motion.span 
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: "0 0 0 1px rgba(200, 0, 0, 0.5), 0 0 8px 2px rgba(200, 0, 0, 0.3)" 
            }}
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
} 