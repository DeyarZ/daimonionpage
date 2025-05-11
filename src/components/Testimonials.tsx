"use client";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Lokalisierte Inhalte
interface LocalizedContent {
  voicesFromDarkness: string;
  realPeopleDescription: string;
  featured: string;
  testimonialsTitle: string;
  trustIndicators: {
    successRate: string;
    activeUsers: string;
    support: string;
  };
}

const translations: Record<string, LocalizedContent> = {
  de: {
    voicesFromDarkness: "Stimmen aus der Dunkelheit.",
    realPeopleDescription: "Kein Influencer-Schauspiel. Nur echte Menschen, die Daimonion genutzt haben – und dadurch verändert wurden.",
    featured: "Featured",
    testimonialsTitle: "Stimmen",
    trustIndicators: {
      successRate: "Erfolgsrate",
      activeUsers: "Aktive Nutzer",
      support: "Support"
    }
  },
  en: {
    voicesFromDarkness: "Voices from the Darkness.",
    realPeopleDescription: "No influencer acting. Just real people who used Daimonion – and were transformed by it.",
    featured: "Featured",
    testimonialsTitle: "Voices",
    trustIndicators: {
      successRate: "Success Rate",
      activeUsers: "Active Users",
      support: "Support"
    }
  }
};

// Warrior testimonials - translated to English
const testimonials = [
  {
    quote: "I was a dopamine junkie. TikTok, Instagram, Porn - the full package. Daimonion didn't comfort me. It messed me up. And that's exactly what saved me.",
    name: "Anonymous User",
    initials: "A",
    featured: true,
  },
  {
    quote: "I downloaded this app to motivate myself. Instead, it told me the truth. And made me stronger because of it.",
    name: "Tim S.",
    initials: "TS",
    featured: false,
  },
  {
    quote: "Daimonion caught me when I had lost myself. Not with nice words. But with reality.",
    name: "Mariam R.",
    initials: "MR",
    featured: false,
  },
  {
    quote: "After a month with Daimonion, Instagram motivational quotes feel like child's play. This app challenges you until you deliver.",
    name: "Daniel K.",
    initials: "DK",
    featured: false,
  },
  {
    quote: "I wanted comfort. I got fire. Now I have the discipline I always wanted. Thanks for the kick in the ass.",
    name: "Anonymous User",
    initials: "S",
    featured: false,
  },
];

// Enhanced aggressive glitch effect
const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [glitching, setGlitching] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  
  useEffect(() => {
    // Random glitching at different intervals for a more natural, violent effect
    const interval = setInterval(() => {
      setGlitching(true);
      setGlitchIntensity(Math.random() > 0.7 ? 2 : 1); // Occasionally more intense glitches
      
      setTimeout(() => setGlitching(false), 150 + Math.random() * 100);
    }, 4000 + Math.random() * 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <span className={`relative inline-block ${className}`}>
      <span className={glitching ? 'invisible' : ''}>{text}</span>
      {glitching && (
        <>
          <span 
            className="absolute left-0 top-0 text-red-600" 
            style={{ 
              clipPath: 'inset(0 0 50% 0)',
              transform: `translate(${glitchIntensity}px, ${-glitchIntensity}px)`,
              opacity: 0.8
            }}
          >
            {text}
          </span>
          <span 
            className="absolute left-0 top-0 text-cyan-500" 
            style={{ 
              clipPath: 'inset(50% 0 0 0)',
              transform: `translate(${-glitchIntensity}px, ${glitchIntensity}px)`,
              opacity: 0.8
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

// Dramatically enhanced testimonial card with more cinematic effects
const TestimonialCard = ({ quote, name, initials, index, featured = false, featuredLabel = "Featured" }: { quote: string; name: string; initials: string; index: number; featured?: boolean; featuredLabel?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // For 3D tilt effect with more dramatic values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse position to rotation values with more pronounced effect for featured cards
  const rotateXRange = featured ? [20, -20] : [12, -12];
  const rotateYRange = featured ? [-20, 20] : [-12, 12];
  
  const rotateX = useTransform(y, [-100, 100], rotateXRange);
  const rotateY = useTransform(x, [-100, 100], rotateYRange);

  // Smoothen the animation with more responsive values
  const springConfig = { damping: 15, stiffness: 200 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  // For highlight/glow effect with more intensity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);
  
  // More intense glow for featured card
  const glowIntensity = featured ? "0.25" : "0.15";
  const spotlightBackground = useMotionTemplate`radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, rgba(200, 10, 10, ${glowIntensity}), transparent 80%)`;
  
  // Edge lighting effect with increased intensity
  const edgeLight = useMotionTemplate`
    linear-gradient(
      to right,
      transparent,
      rgba(255, 30, 30, 0.1) ${spotlightX}px,
      transparent
    )
  `;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to card
      const cardX = e.clientX - rect.left;
      const cardY = e.clientY - rect.top;
      
      // Update motion values
      mouseX.set(cardX);
      mouseY.set(cardY);
      
      // Calculate the center point of the card
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate the distance from the center (-100 to 100)
      x.set(cardX - centerX);
      y.set(cardY - centerY);
    }
  };
  
  const handleMouseLeave = () => {
    // Reset to neutral position
    x.set(0);
    y.set(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`bg-gradient-to-br ${featured ? 'from-[#1a1010] to-[#0a0506] col-span-1 md:col-span-2' : 'from-[#151515] to-[#0a0a0a]'} 
                rounded-xl p-6 shadow-2xl relative overflow-hidden group perspective-1000 border border-transparent
                hover:border-red-950/30 transition-colors duration-500`}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: featured 
          ? "0 30px 60px -15px rgba(30, 0, 0, 0.5), 0 0 30px -5px rgba(80, 0, 0, 0.15) inset" 
          : "0 30px 60px -15px rgba(10, 0, 0, 0.4)",
        transformStyle: "preserve-3d",
        transform: "perspective(1200px)",
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
    >
      {/* Enhanced edge lighting effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: edgeLight }}
      />
      
      {/* Enhanced animated edge glow */}
      <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-800/30 to-red-950/0 animate-glow"></div>
      </div>
      
      {/* Enhanced inner shadow overlay */}
      <div className="absolute inset-0 rounded-xl shadow-inner opacity-80 z-1 pointer-events-none"></div>
      
      {/* Enhanced dynamic spotlight glow effect */}
      <motion.div 
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none z-10`}
        style={{ background: spotlightBackground, mixBlendMode: "soft-light" }}
        transition={{ duration: 0.3 }}
      />
      
      {/* More dramatic glowing background orb for featured card */}
      {featured && (
        <motion.div 
          className="absolute -right-20 -bottom-20 w-64 h-64 bg-red-950/15 rounded-full blur-3xl"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Enhanced dramatic high-contrast lighting effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60 rounded-xl opacity-70 z-1 pointer-events-none"></div>
      
      {/* Enhanced noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.04] mix-blend-overlay pointer-events-none"></div>
      
      {/* Enhanced animated particle effect */}
      <div className="absolute inset-0 overflow-hidden opacity-25 mix-blend-screen pointer-events-none">
        {[...Array(featured ? 12 : 7)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${featured ? 'w-2 h-2' : 'w-1 h-1'} bg-red-600 rounded-full`}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: 0.1 + Math.random() * 0.5,
              scale: 0.5 + Math.random(),
            }}
            animate={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: [0.1 + Math.random() * 0.5, 0, 0.1 + Math.random() * 0.5],
              scale: [0.5 + Math.random(), 1.5 + Math.random(), 0.5 + Math.random()],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8 + Math.random() * 15,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Enhanced quote mark */}
      <div className={`absolute top-4 left-4 text-red-950/30 ${featured ? 'text-8xl' : 'text-7xl'} font-serif -mt-8 -ml-4`}>❝</div>

      <div className="mb-6 flex items-center">
        <div className={`${featured ? 'w-14 h-14' : 'w-11 h-11'} bg-gradient-to-br from-[#252525] to-[#151515] rounded-full 
                      flex items-center justify-center mr-3 border ${featured ? 'border-red-950/40' : 'border-gray-800'} shadow-xl relative overflow-hidden`}>
          {/* Enhanced avatar lighting effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/10 via-transparent to-transparent"></div>
          <span className={`text-gray-400 ${featured ? 'text-lg' : 'text-sm'} font-mono relative z-10 font-bold`}>{initials}</span>
        </div>
        <span className={`font-medium text-gray-300 ${featured && 'text-lg'}`}>{name}</span>
        
        {/* Enhanced featured badge */}
        {featured && (
          <motion.span 
            className="ml-auto bg-gradient-to-r from-red-950/50 to-red-900/50 text-xs px-3 py-1 rounded-sm text-red-200/80 backdrop-blur-sm border border-red-900/30 font-mono tracking-wider uppercase"
            animate={{
              boxShadow: ['0 0 10px rgba(100, 0, 0, 0)', '0 0 15px rgba(100, 0, 0, 0.3)', '0 0 10px rgba(100, 0, 0, 0)']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {featuredLabel}
          </motion.span>
        )}
      </div>

      <p className={`text-gray-400 font-serif leading-relaxed relative z-10 ${featured && 'text-lg'}`}>{quote}</p>
      
      {/* Enhanced bottom highlight with animation */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-red-950/20 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

// Enhanced futuristic rings with more dynamic animations
const FuturisticRings = () => {
  return (
    <div className="absolute left-1/2 top-24 -translate-x-1/2 w-40 h-40 opacity-30 pointer-events-none z-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-40 h-40 rounded-full border border-red-800/40"
          animate={{ 
            rotateZ: 360,
            scale: [1, 1.08, 1],
          }}
          transition={{ 
            rotateZ: { repeat: Infinity, duration: 25, ease: "linear" },
            scale: { repeat: Infinity, duration: 8, ease: "easeInOut" },
          }}
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-32 h-32 rounded-full border border-red-900/30"
          animate={{ rotateZ: -360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-24 h-24 rounded-full border border-red-950/20"
          animate={{ rotateZ: 360, scale: [1, 0.95, 1] }}
          transition={{ 
            rotateZ: { repeat: Infinity, duration: 15, ease: "linear" },
            scale: { repeat: Infinity, duration: 10, ease: "easeInOut" }
          }}
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-16 h-16 rounded-full border border-gray-800/40"
          animate={{ rotateZ: -360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-4 h-4 rounded-full bg-red-950/60 blur-sm"
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { locale } = useLanguage();
  
  // Force English only
  const content = translations.en;
  
  // For background reveal effect
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Separate featured testimonial from regular ones
  const featuredTestimonial = testimonials.find(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-black" id="testimonials-section">
      {/* Dramatic angled divider at the top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-black via-black to-red-950/10 transform -skew-y-1 z-0" />
      
      {/* Dark, textured background with subtle noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#070707] opacity-95 z-0" />
      
      {/* Perspective scrolling grid lines */}
      <div 
        className="absolute inset-0 overflow-hidden opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, transparent 0%, #000 70%), 
                           repeating-linear-gradient(transparent, transparent 2px, rgba(40, 5, 5, 0.05) 2px, rgba(40, 5, 5, 0.05) 4px)`,
          backgroundSize: '100% 100%, 100px 100px',
          transform: `perspective(1000px) rotateX(60deg) translateY(${scrollY * 0.1}px)`,
          transformOrigin: 'center top',
        }}
      />
      
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-radial-gradient opacity-70 z-0"></div>
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none z-0" />
      
      {/* Abstract geometric shapes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg 
          className="absolute top-1/4 -left-24 w-64 h-64 text-red-900/5" 
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill="currentColor" 
            d="M39.5,-65.1C48.9,-55.1,52.6,-39.1,58.4,-24.5C64.3,-9.9,72.4,3.4,70.9,15.1C69.5,26.8,58.5,36.9,46.7,42.2C34.9,47.5,22.3,48.1,8.9,54.5C-4.5,60.9,-18.6,73.2,-31.4,72.9C-44.2,72.6,-55.6,59.7,-64.3,45.7C-73,31.7,-79,16.5,-79.9,0.5C-80.8,-15.4,-76.6,-31.8,-66.9,-42.9C-57.2,-54,-41.9,-59.9,-28,-65.1C-14.2,-70.3,-1.7,-74.8,9.7,-70.7C21.1,-66.6,30.1,-75.1,39.5,-65.1Z" 
            transform="translate(100 100)" 
          />
        </svg>
        
        <svg 
          className="absolute bottom-1/4 -right-24 w-64 h-64 text-red-900/5" 
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill="currentColor" 
            d="M30.4,-50.2C43.1,-43.2,59.5,-41.1,67.3,-32.4C75.1,-23.6,74.4,-8.1,66.1,1.5C57.8,11.1,41.8,14.8,31.6,21.8C21.4,28.9,17,39.4,8.2,44.5C-0.5,49.7,-13.6,49.5,-22.9,44.6C-32.3,39.6,-37.9,29.9,-44.2,19.7C-50.5,9.5,-57.4,-1.1,-57.4,-12C-57.4,-22.8,-50.6,-33.9,-41.2,-41.5C-31.9,-49.1,-20,-53.3,-8.3,-53.4C3.4,-53.5,17.7,-57.2,30.4,-50.2Z" 
            transform="translate(100 100)" 
          />
        </svg>
      </div>
      
      {/* Floating 3D elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 120 + 50 + 'px',
              height: Math.random() * 120 + 50 + 'px',
              background: `rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 10)}, ${Math.floor(Math.random() * 10)}, ${0.05 + Math.random() * 0.05})`,
              filter: 'blur(40px)',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              x: [Math.random() * 60 - 30, Math.random() * 60 - 30],
              y: [Math.random() * 60 - 30, Math.random() * 60 - 30],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + Math.random() * 20,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {/* Subtle spotlight that follows mouse */}
      <div 
        className="absolute blur-[150px] bg-gradient-to-r from-red-900/10 to-red-700/10 rounded-full w-[500px] h-[500px] z-0 opacity-60 transition-all duration-300 ease-out pointer-events-none"
        style={{ 
          left: `${mousePosition.x - 250}px`, 
          top: `${mousePosition.y - 250}px` 
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 relative"
        >
          <FuturisticRings />
          
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">
            <GlitchText text={content.testimonialsTitle} /> from the <GlitchText text={content.voicesFromDarkness} />
          </h2>
          <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto">
            {content.realPeopleDescription}
          </p>
          
          {/* Decorative separator */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-900/30"></div>
            <div className="text-red-800 opacity-30 text-xs">⟡</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-900/30"></div>
          </div>
        </motion.div>

        {/* Testimonial grid with featured testimonial */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTestimonial && (
            <TestimonialCard 
              key="featured"
              quote={featuredTestimonial.quote}
              name={featuredTestimonial.name}
              initials={featuredTestimonial.initials}
              index={0}
              featured={true}
              featuredLabel={content.featured}
            />
          )}
          
          {regularTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              initials={testimonial.initials}
              index={index + 1}
            />
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Glowing line above trust bar */}
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-10"></div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 backdrop-blur-md bg-gradient-to-br from-black/40 to-red-950/10 rounded-xl p-8 relative border border-red-950/20">
            {/* Subtle glow behind the trust bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-black/0 to-red-900/5 rounded-xl"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <span className="text-3xl font-bold text-white mb-1">4.8</span>
              <div className="flex mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400">App Store</span>
            </div>
            
            <div className="h-12 w-px bg-gradient-to-b from-gray-800/30 via-red-900/20 to-gray-800/30 hidden md:block"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <span className="text-3xl font-bold text-white mb-1">92%</span>
              <div className="text-xs text-gray-400">{content.trustIndicators.successRate}</div>
            </div>
            
            <div className="h-12 w-px bg-gradient-to-b from-gray-800/30 via-red-900/20 to-gray-800/30 hidden md:block"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <span className="text-3xl font-bold text-white mb-1">5K+</span>
              <div className="text-xs text-gray-400">{content.trustIndicators.activeUsers}</div>
            </div>
            
            <div className="h-12 w-px bg-gradient-to-b from-gray-800/30 via-red-900/20 to-gray-800/30 hidden md:block"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <span className="text-3xl font-bold text-white mb-1">24/7</span>
              <div className="text-xs text-gray-400">{content.trustIndicators.support}</div>
            </div>
          </div>
          
          {/* Glowing line below trust bar */}
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-10"></div>
        </motion.div>
      </div>
    </section>
  );
} 