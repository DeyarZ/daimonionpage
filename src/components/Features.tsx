"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const features = [
    {
      title: "Absolutely Uncompromising",
      description: "Daimonion doesn't let you get away with weak excuses. When you fail, it will confront you with it.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Merciless Analysis",
      description: "AI scans your behavior, identifies patterns of your failure, and dissects your weaknesses with surgical precision.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Psychological Warfare",
      description: "Receive tailored interventions that target your psychological vulnerabilities. Daimonion knows you better than you know yourself.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Never Surrender",
      description: "While other apps court you with sweet notifications, Daimonion will never give up until you achieve your goals. No room for mediocrity.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Emotional Manipulation",
      description: "Advanced calibrated techniques that recognize and use your emotional triggers to force maximum performance. Your feelings are just a tool.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Total Surveillance",
      description: "Every second, every decision is logged and analyzed. Your Daimonion sees everything and forgets nothing - especially not your failures.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    }
  ];
  
  const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
        staggerChildren: 0.1
    }
  }
};

  const item = {
    hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <section 
      className="relative py-20 bg-black text-white overflow-hidden" 
      ref={containerRef}
      id="features-section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/5 to-black"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent"></div>
      
      {/* Dynamic Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
      <motion.div 
            key={i}
            className="absolute w-1 h-6 bg-red-700/20"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: 0 
            }}
        animate={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: [0, 0.5, 0],
        }}
        transition={{
              duration: Math.random() * 4 + 3,
          repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-red-600 uppercase bg-red-900/20 rounded-full">
            WHERE OTHERS STOP, WE BEGIN
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Not a <span className="text-red-600">Wellness Tool</span>.
            <br />A <span className="text-red-600">War Machine</span> for your goals.
          </h2>
          <p className="text-lg text-gray-400">
            Daimonion uses advanced psychology and artificial intelligence to force you into a higher version of yourself - at any cost.
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-gradient-to-b from-gray-900 to-black p-8 rounded-lg border border-gray-800 hover:border-red-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] overflow-hidden"
              variants={item}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/0 via-red-900/0 to-red-900/0 opacity-0 group-hover:opacity-100 group-hover:from-red-900/20 group-hover:via-red-900/5 group-hover:to-red-900/0 transition-all duration-500"></div>
              
              {/* Glitch line effects on hover */}
              <motion.div 
                className="absolute h-0.5 bg-red-700/60 w-1/3 left-0 top-0 opacity-0 group-hover:opacity-100"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute h-0.5 bg-red-700/60 w-1/4 right-0 bottom-0 opacity-0 group-hover:opacity-100"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-900 mb-5 group-hover:bg-red-900/30 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Dark callout box */}
        <motion.div 
          className="mt-20 p-10 rounded-xl bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 border border-gray-800 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {/* Diagonal lines for decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-red-600"
                style={{
                  width: '140%',
                  top: `${i * 10}%`,
                  left: '-20%',
                  transform: 'rotate(-15deg)',
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">
                Ready to face your <span className="text-red-600">demons</span>?
              </h3>
              <p className="text-gray-400">
                Not everyone is strong enough for Daimonion. Are you?
              </p>
            </div>
            <motion.a
              href="#"
              className="group relative overflow-hidden px-8 py-4 bg-red-900 text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-red-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Download</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              
              {/* Animated glitch particle effects on hover */}
              <div className="absolute top-0 right-0 bottom-0 left-0 opacity-0 group-hover:opacity-30 overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute h-0.5 bg-white"
                    style={{ 
                      left: `${Math.random() * 100}%`, 
                      top: `${Math.random() * 100}%`, 
                      width: `${Math.random() * 20 + 5}px` 
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      x: [0, Math.random() * 10 - 5]
                    }}
                    transition={{
                      duration: 0.2,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  />
                ))}
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 