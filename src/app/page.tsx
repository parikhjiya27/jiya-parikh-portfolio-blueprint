"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Mail, Instagram, Sparkles, Search, Lightbulb, Users, Globe, BookOpen, Target, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="fixed top-6 left-6 z-50 flex items-center gap-3 bg-black/40 backdrop-blur-md p-1.5 pr-6 rounded-2xl border border-white/10 shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.a
        href="#"
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={isHovered ? { rotate: [0, -8, 8, -4, 4, 0], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#C4A7B3] flex items-center justify-center shadow-md">
          <span className="font-serif text-lg font-bold text-white tracking-tight">JP</span>
        </div>
      </motion.a>
      
      <nav className="hidden md:flex items-center gap-5 ml-2">
        <a href="#about" className="text-[10px] font-bold text-gray-400 hover:text-[#C4A7B3] transition-colors uppercase tracking-[0.2em]">About</a>
        <a href="#interests" className="text-[10px] font-bold text-gray-400 hover:text-[#C4A7B3] transition-colors uppercase tracking-[0.2em]">Interests</a>
        <a href="#work" className="text-[10px] font-bold text-gray-400 hover:text-[#C4A7B3] transition-colors uppercase tracking-[0.2em]">Work</a>
        <a href="#skills" className="text-[10px] font-bold text-gray-400 hover:text-[#C4A7B3] transition-colors uppercase tracking-[0.2em]">Skills</a>
        <a href="#availability" className="text-[10px] font-bold text-gray-400 hover:text-[#C4A7B3] transition-colors uppercase tracking-[0.2em]">Availability</a>
        <a href="#contact" className="text-[10px] font-bold text-gray-400 hover:text-[#C4A7B3] transition-colors uppercase tracking-[0.2em]">Connect</a>
      </nav>
    </motion.div>
  );
}

function AnimatedSection({ children, className = "", delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function InterestCard({ icon: Icon, text, delay }: { icon: React.ElementType; text: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#C4A7B3]/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[#C4A7B3]" />
        </div>
        <p className="text-gray-200 text-sm leading-relaxed pt-2">{text}</p>
      </div>
    </motion.div>
  );
}

function SkillPill({ text, delay }: { text: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      className="inline-block px-5 py-2.5 bg-white/5 backdrop-blur-sm rounded-full text-sm text-gray-200 border border-white/10 shadow-sm hover:shadow-md hover:border-[#C4A7B3] transition-all duration-300"
    >
      {text}
    </motion.span>
  );
}

function AreaCard({ text, delay }: { text: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/5 rounded-xl p-5 border border-white/10 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#C4A7B3]"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-green-400" />
        </div>
        <span className="text-gray-200">{text}</span>
      </div>
    </motion.div>
  );
}

function ToolIcon({ name, delay }: { name: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  
  const links: { [key: string]: string } = {
    "LinkedIn": "https://www.linkedin.com/in/jiya-parikh-2627jp",
    "Instagram": "https://instagram.com/i_m_jiya_parikh",
  };

  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -6 }}
      className="flex flex-col items-center gap-2 group cursor-pointer"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center group-hover:shadow-lg group-hover:border-[#C4A7B3] transition-all duration-300">
        {name === "LinkedIn" && (
          <svg className="w-7 h-7 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )}
        {name === "Google Sheets" && (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="#0F9D58"/>
            <rect x="6" y="7" width="5" height="3" fill="white"/>
            <rect x="13" y="7" width="5" height="3" fill="white"/>
            <rect x="6" y="11" width="5" height="3" fill="white"/>
            <rect x="13" y="11" width="5" height="3" fill="white"/>
            <rect x="6" y="15" width="5" height="2" fill="white"/>
            <rect x="13" y="15" width="5" height="2" fill="white"/>
          </svg>
        )}
        {name === "Excel" && (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="#217346"/>
            <path d="M7 8L12 16M12 8L7 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <rect x="14" y="8" width="4" height="2" fill="white"/>
            <rect x="14" y="11" width="4" height="2" fill="white"/>
            <rect x="14" y="14" width="4" height="2" fill="white"/>
          </svg>
        )}
        {name === "Instagram" && (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFDC80"/>
                <stop offset="25%" stopColor="#F77737"/>
                <stop offset="50%" stopColor="#E1306C"/>
                <stop offset="75%" stopColor="#C13584"/>
                <stop offset="100%" stopColor="#833AB4"/>
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#instagram-gradient)"/>
            <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
          </svg>
        )}
        {name === "Research" && (
          <Search className="w-7 h-7 text-[#C4A7B3]" />
        )}
      </div>
      <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{name}</span>
    </motion.div>
  );

  if (links[name]) {
    return (
      <a href={links[name]} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

function PhilosophyCard({ text, delay }: { text: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-4"
    >
      <div className="w-2 h-2 rounded-full bg-[#C4A7B3] flex-shrink-0" />
      <p className="text-gray-200 text-base italic">{text}</p>
    </motion.div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  const interests = [
    { icon: Search, text: "Researching founders and startups" },
    { icon: Globe, text: "Understanding how online businesses grow" },
    { icon: Sparkles, text: "Exploring digital tools and platforms" },
    { icon: Users, text: "Observing outreach and communication systems" },
    { icon: Target, text: "Building skills that work globally" },
    { icon: Heart, text: "Creating calm and meaningful digital work" },
  ];

  const areas = [
    "B2B research and founder discovery",
    "LinkedIn-based exploration",
    "Understanding outreach structures",
    "Digital presence and visibility",
    "Business documentation and workflow awareness",
    "Online professionalism and communication",
  ];

  const skills = [
    "Research mindset",
    "Analytical thinking",
    "Attention to detail",
    "Digital curiosity",
    "Written communication",
    "Consistency and discipline",
    "Learning by doing",
  ];

  const tools = ["LinkedIn", "Google Sheets", "Excel", "Instagram", "Research"];

  const philosophies = [
    "I believe good work feels calm, not chaotic.",
    "I value clarity over speed.",
    "Learning matters more than pretending.",
    "Consistency beats motivation.",
  ];

  const personalInterests = [
    "Digital business ecosystems",
    "Entrepreneurship",
    "Global work opportunities",
    "Self-growth and independence",
    "Creative yet practical systems",
  ];

  return (
    <main className="min-h-screen bg-[#050505] overflow-x-hidden text-gray-200">
      <Navbar />
      
      <section className="min-h-screen flex items-center justify-center px-6 py-20 lg:py-0">
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#C4A7B3] text-sm tracking-[0.3em] uppercase mb-4"
              >
                Lead Research • Digital Exploration
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-rose-600"
              >
                JIYA
                <br />
                PARIKH
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-400 text-lg"
              >
                Research-driven • Curious • Learning-focused
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-8"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C4A7B3] text-white rounded-full text-sm font-medium hover:bg-[#B39AA6] transition-colors duration-300 shadow-lg shadow-[#C4A7B3]/20"
                >
                  Let&apos;s Connect
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="order-2 flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#C4A7B3]/20 to-[#6B8E6B]/20 rounded-[2rem] blur-2xl opacity-60" />
                <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 ring-1 ring-white/10">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/jiya2-1767606576179.jpeg?width=8000&height=8000&resize=contain"
                    alt="Jiya Parikh"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-gradient-to-b from-[#050505] to-black">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-8 text-center">
              About Me
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                I&apos;m Jiya, a commerce student who genuinely enjoys exploring how businesses, founders, and digital systems work behind the scenes. I&apos;m deeply interested in research, understanding patterns, and learning how information turns into real opportunities.
              </p>
              <p>
                I don&apos;t rush to label myself as an expert. Instead, I focus on learning through action, observation, and consistent effort. I enjoy projects that involve thinking, exploring, and building clarity step by step.
              </p>
              <div className="pt-4 border-l-4 border-[#C4A7B3] pl-6 italic text-gray-200">
                <p>This portfolio is not about perfection.</p>
                <p>It&apos;s about growth, curiosity, and honest work.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="interests" className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-4 text-center">
              What Catches My Interest
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
              Areas that spark my curiosity and drive my learning journey
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {interests.map((interest, i) => (
              <InterestCard key={interest.text} icon={interest.icon} text={interest.text} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="py-24 px-6 bg-white/5">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-8 text-center">
              What I Work On
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                I currently work on research-based and digital support tasks that help me understand real business environments. My focus is on learning how information is gathered, how outreach works, and how digital presence supports growth.
              </p>
              <p>
                I enjoy projects where I can think, explore, and contribute thoughtfully rather than rushing through tasks.
              </p>
              <p>
                This includes working with founders, online creators, and small teams in a learning-oriented way.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="areas" className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-4 text-center">
              Areas I&apos;m Exploring
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
              Current focus areas in my learning journey
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-4">
            {areas.map((area, i) => (
              <AreaCard key={area} text={area} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-6 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-4 text-center">
              Skills I&apos;m Building
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
              Growing these capabilities every day
            </p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <SkillPill key={skill} text={skill} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <section id="availability" className="py-24 px-6 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="bg-black/50 rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4A7B3]/5 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative z-10 text-center">
                <span className="inline-block px-4 py-1.5 bg-[#C4A7B3]/10 text-[#C4A7B3] rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                  Collaboration
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
                  Open for Part-time Roles
                </h2>
                <div className="max-w-2xl mx-auto space-y-6">
                  <p className="text-lg text-gray-400 leading-relaxed">
                    I am actively seeking part-time opportunities where I can apply my skills in research, analysis, and digital support. I am ready to help you with the exact capabilities I&apos;ve built and listed in my skills section.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <p className="text-sm text-gray-200">Founder & startup research</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <p className="text-sm text-gray-200">Data organization (Sheets/Excel)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <p className="text-sm text-gray-200">Digital communication support</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <p className="text-sm text-gray-200">Detailed documentation</p>
                    </div>
                  </div>
                  <div className="pt-8">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-base font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg"
                    >
                      Hire Me Part-time
                      <Sparkles className="w-4 h-4 text-[#C4A7B3]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-4 text-center">
              Tools & Platforms
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
              What I use to get things done
            </p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-8">
            {tools.map((tool, i) => (
              <ToolIcon key={tool} name={tool} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>


      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-12 text-center">
              How I Think About Work
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {philosophies.map((philosophy, i) => (
              <PhilosophyCard key={philosophy} text={philosophy} delay={i * 0.15} />
            ))}
          </div>
          <AnimatedSection delay={0.8}>
            <p className="text-center text-gray-400 mt-12 text-lg">
              I&apos;m building skills for the long term, not shortcuts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80"
            alt="Workspace"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-4 text-center">
              Personal Interests
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
              What drives me beyond work
            </p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-4">
            {personalInterests.map((interest, i) => (
              <SkillPill key={interest} text={interest} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-12 text-center">
              Let&apos;s Connect
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <motion.a
                href="mailto:jiyaparikh2627@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm hover:shadow-lg hover:border-[#C4A7B3] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#EA4335]" />
                </div>
                <span className="text-gray-200">jiyaparikh2627@gmail.com</span>
              </motion.a>
              <motion.a
                href="https://instagram.com/i_m_jiya_parikh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm hover:shadow-lg hover:border-[#C4A7B3] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFDC80]/20 via-[#E1306C]/20 to-[#833AB4]/20 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-[#E1306C]" />
                </div>
                <span className="text-gray-200">@i_m_jiya_parikh</span>
              </motion.a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="bg-white/5 rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#C4A7B3]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl" />
              <div className="relative">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-4 text-center">
                  Send me a message
                </h3>
                <p className="text-gray-400 text-center mb-8 max-w-lg mx-auto">
                  I&apos;m open to learning-focused collaborations, research projects, and meaningful digital work.
                </p>
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      name: formData.get("name"),
                      email: formData.get("email"),
                      number: formData.get("number"),
                      message: formData.get("message"),
                    };
                    
                    try {
                      const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                      });
                      
                      if (response.ok) {
                        toast.success("Message sent successfully!");
                        (e.target as HTMLFormElement).reset();
                      } else {
                        const error = await response.json();
                        toast.error(error.error || "Failed to send message");
                      }
                    } catch (error) {
                      toast.error("An error occurred. Please try again.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="max-w-md mx-auto space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-[#C4A7B3] transition-colors text-white"
                    />
                    <input
                      type="tel"
                      name="number"
                      placeholder="Your Number"
                      required
                      className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-[#C4A7B3] transition-colors text-white"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-[#C4A7B3] transition-colors text-white"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message / Question"
                    required
                    rows={4}
                    className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-[#C4A7B3] transition-colors resize-none text-white"
                  />
                  <div className="flex justify-center pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-[#C4A7B3] text-white rounded-full text-base font-medium hover:bg-[#B39AA6] transition-all duration-300 shadow-lg shadow-[#C4A7B3]/30 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          Sending...
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="py-8 px-6 bg-black border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-[#C4A7B3] flex items-center justify-center">
              <span className="font-serif text-sm font-bold text-white">JP</span>
            </div>
            <span className="text-white font-medium">Jiya Parikh</span>
          </div>
          <p className="text-sm text-gray-400">
            Built with curiosity and intention
          </p>
        </div>
      </footer>
    </main>
  );
}
