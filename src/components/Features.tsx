"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

// Animation variants with more intensity
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

// More brutal icon renderings
const featuresList = [
  {
    title: "Brutal ehrlicher Chatbot",
    description: "Kein Trost. Keine Lügen. Nur die Wahrheit, die dich stärker macht. Wähle zwischen \"Normal\", \"Hart\" oder \"Brutal Ehrlich\" – und lass dich transformieren.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3C7.58172 3 4 6.58172 4 11C4 13.3286 4.94427 15.4175 6.45006 16.9232C6.32795 17.4636 6.13616 17.9844 5.88323 18.4749C5.61344 18.9998 5.27609 19.4879 4.88323 19.9311C4.68861 20.157 4.66667 20.4783 4.83751 20.7294C5.00834 20.9805 5.32524 21.0957 5.61344 21.0089C6.58929 20.7461 7.48114 20.3052 8.24821 19.7192C9.38257 20.2334 10.6566 20.5231 12 20.5231C16.4183 20.5231 20 16.9414 20 12.5231C20 8.10478 16.4183 4.52306 12 4.52306" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11Z" stroke="url(#paint1_linear)" strokeWidth="2"/>
        <path d="M18 8.5C18 9.88071 16.8807 11 15.5 11C14.1193 11 13 9.88071 13 8.5C13 7.11929 14.1193 6 15.5 6C16.8807 6 18 7.11929 18 8.5Z" stroke="url(#paint2_linear)" strokeWidth="2"/>
        <defs>
          <linearGradient id="paint0_linear" x1="4" y1="3" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D2D" />
            <stop offset="1" stopColor="#D10000" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="10" y1="9" x2="14" y2="13" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D2D" />
            <stop offset="1" stopColor="#D10000" />
          </linearGradient>
          <linearGradient id="paint2_linear" x1="13" y1="6" x2="18" y2="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D2D" />
            <stop offset="1" stopColor="#D10000" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Militärisches Fokus-System",
    description: "Struktur erzeugt Disziplin. Klarheit erzeugt Resultate. Daimonion ist dein persönlicher Drill Sergeant für Aufgaben, Routinen und Gewohnheiten.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D2D" />
            <stop offset="1" stopColor="#D10000" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="6" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D2D" />
            <stop offset="1" stopColor="#D10000" />
          </linearGradient>
          <linearGradient id="paint2_linear" x1="10" y1="10" x2="14" y2="14" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D2D" />
            <stop offset="1" stopColor="#D10000" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Taktisches Flow & Journaling",
    description: "Finde den Kampfmodus. Jeder Krieger braucht Reflexion und Klarheit. Der Flow-Timer macht dich zur ultimativen Konzentrations-Maschine.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21H3.8C3.35817 21 3 20.6418 3 20.2V3" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 6L15.5 12L10.5 8L3 16" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 6H21V10" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D2D" />
            <stop offset="1" stopColor="#D10000" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="3" y1="6" x2="21" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D2D" />
            <stop offset="1" stopColor="#D10000" />
          </linearGradient>
          <linearGradient id="paint2_linear" x1="17" y1="6" x2="21" y2="10" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D2D" />
            <stop offset="1" stopColor="#D10000" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Dein volles Arsenal",
    description: "Das sind nur die sichtbaren Waffen. Entdecke ein komplettes Waffenarsenal für mentale Klarheit, Fokus und eine Disziplin, die dich unaufhaltbar macht.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L4.09344 12.6879C3.74463 13.1064 3.57023 13.3157 3.57055 13.491C3.57083 13.6425 3.67333 13.7787 3.8298 13.8458C4.01313 13.9231 4.30729 13.806 4.89561 13.5717L10.1493 11.4437C10.5231 11.2831 10.71 11.2028 10.9003 11.2054C11.0639 11.2077 11.2214 11.2744 11.3377 11.3907C11.471 11.524 11.5296 11.7263 11.6468 12.1308L13.4331 17.9133C13.6223 18.5423 13.7169 18.8569 13.8739 18.9442C14.0101 19.0199 14.1752 19.0203 14.3117 18.945C14.469 18.8583 14.5654 18.5446 14.7582 17.9172L19.9827 3.51584C20.1452 2.97968 20.2265 2.7116 20.1625 2.55451C20.1068 2.41982 19.996 2.31422 19.8585 2.26413C19.6983 2.20578 19.4272 2.28568 18.8852 2.44548L13 4" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear" x1="3.57" y1="2" x2="20.2" y2="19" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D2D" />
            <stop offset="1" stopColor="#D10000" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-black overflow-hidden py-24 text-white">
      {/* Dark, gritty background */}
      <div className="absolute inset-0 bg-[#050505] bg-[url('/images/noise.png')] bg-repeat opacity-40 mix-blend-multiply z-0" />
      
      {/* Aggressive grid pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10 z-0" />
      
      {/* Harsh diagonal accent */}
      <div className="absolute top-0 -right-20 bottom-0 w-[50%] bg-gradient-to-l from-red-950/20 to-transparent transform -skew-x-12 z-0" />
      
      {/* Animated glow element */}
      <motion.div 
        className="absolute -left-40 top-40 w-[500px] h-[500px] rounded-full blur-[150px] z-0"
        animate={{
          backgroundColor: ["rgba(153, 27, 27, 0.1)", "rgba(153, 27, 27, 0.15)", "rgba(153, 27, 27, 0.1)"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Pulsing accent in opposite corner */}
      <motion.div 
        className="absolute -right-40 bottom-40 w-[500px] h-[500px] rounded-full blur-[150px] z-0"
        animate={{
          backgroundColor: ["rgba(120, 10, 10, 0.1)", "rgba(120, 10, 10, 0.15)", "rgba(120, 10, 10, 0.1)"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      
      {/* Sharp accent lines */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-red-950/0 via-red-950/30 to-red-950/0"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-red-950/0 via-red-950/30 to-red-950/0"></div>
      </div>
      
      <div className="container relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center mb-3 px-3 py-1 rounded-sm bg-red-950/40 border-l-2 border-red-700 font-mono uppercase tracking-widest text-xs text-red-500">
            <span className="mr-2">⚔️</span> Dein Arsenal
          </span>
          
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Was Daimonion <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">tödlich effektiv</span> macht
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 font-medium">
            Keine Features zum Rumspielen. Nur <span className="text-white">Waffen für Disziplin.</span>
          </p>
        </motion.div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Aggressive highlight glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black/0 rounded-xl blur-lg z-0 opacity-0 group-hover:opacity-100"
                animate={hoveredIndex === index ? {
                  opacity: [0, 0.7, 0.3],
                } : {}}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
              />
              
              {/* Card with harsh black background and aggressive styling */}
              <div className="relative bg-[#0a0a0a] border border-red-950/30 p-8 rounded-xl shadow-xl shadow-red-950/10 hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Slash animation on hover */}
                <motion.div 
                  className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none"
                  animate={hoveredIndex === index ? {
                    opacity: [0, 0.8, 0],
                  } : {}}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent transform -translate-x-full"
                      style={{
                        animation: hoveredIndex === index ? 'slash 1.5s ease-out forwards' : 'none',
                      }}
                    />
                  </div>
                </motion.div>
                
                {/* Icon with dramatic lighting */}
                <div className="mb-6 text-red-600 relative">
                  <div className="absolute -inset-2 bg-red-600/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {feature.icon}
                </div>
                
                {/* Dramatic title with glowing effect */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-50 transition-colors duration-300">
                  {feature.title}
                  <div className="w-12 h-0.5 bg-gradient-to-r from-red-700 to-red-900 mt-2 rounded-full" />
                </h3>
                
                {/* Description with improved typography */}
                <p className="text-gray-400 mb-4 flex-grow font-medium leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Harsh accent line at bottom */}
                <div className="w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-red-700 to-red-900 rounded-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Brutal CTA button with animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <a 
            href="#download" 
            className="relative inline-flex items-center justify-center group"
          >
            {/* Button main body */}
            <span className="relative z-10 px-8 py-4 bg-gradient-to-br from-red-700 to-red-900 text-white font-medium rounded-md overflow-hidden flex items-center">
              <span className="mr-2">Daimonion Herunterladen</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H4.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {/* Subtle pulse animation inside button */}
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
            </span>
            
            {/* Button glow effect */}
            <span className="absolute -inset-3 rounded-xl bg-gradient-to-r from-red-600/0 via-red-600/40 to-red-600/0 opacity-0 blur-xl group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
            
            {/* Button shadow */}
            <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-red-800/40 to-red-900/40 blur group-hover:opacity-100 transition-opacity duration-500 animate-pulse opacity-0 group-hover:opacity-100" />
          </a>
        </motion.div>
      </div>
    </section>
  );
} 