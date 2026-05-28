import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Monitor, CheckCircle, Flame, ArrowUpRight, Sparkles } from "lucide-react";
import { CORE_VALUES, CoreValue } from "../data";
import { audioManager } from "../utils/audio";
import ParticleLayer from "./ParticleLayer";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function CoreValueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "diklat" | "webinar">("all");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide up text reveal from bottom
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".reveal-up"),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 70, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animating the headline custom underline
      gsap.fromTo(
        ".animated-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredValues = CORE_VALUES.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const handleCardHover = (freq: number) => {
    audioManager.playPluck(freq, 0.12, "triangle");
  };

  return (
    <div
      id="core-value-section"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 bg-transparent text-slate-850 overflow-hidden"
    >
      {/* Glow shapes background blur */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] bg-yellow-500/5 rounded-full filter blur-[100px] z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] bg-[#1E88E5]/5 rounded-full filter blur-[100px] z-0" />

      <ParticleLayer count={10} interactive={false} />

      <div className="relative w-full max-w-7xl mx-auto px-6 z-20 space-y-16">
        
        {/* Core Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center space-y-6">
          <div className="reveal-up inline-type-badge inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-mono uppercase font-bold tracking-[0.2em] text-[#1E88E5] rounded-full bg-[#1E88E5]/10 border border-[#1E88E5]/20">
            <Flame className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
            <span>03 — PILAR PEMBELAJARAN</span>
          </div>

          <h2 className="reveal-up text-4xl sm:text-5xl font-display font-black tracking-tight text-slate-800 leading-none">
            <span className="block text-slate-400 font-extrabold">Kurikulum Unggul & Praktis</span>
            <span className="relative inline-block mt-2">
              Diklat & Webinar Inovatif
              <span className="animated-line absolute bottom-[-8px] left-0 w-full h-[3px] bg-gradient-to-r from-[#F4C542] via-amber-400 to-[#1E88E5] rounded-full origin-left" />
            </span>
          </h2>

          <p className="reveal-up text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-light pt-4">
            Menggabungkan metode digital interaktif, bimbingan kolaboratif intensif, 
            serta materi aplikatif yang mengacu pada kurikulum nasional modern.
          </p>

          {/* Filtering buttons for interactive UX */}
          <div className="reveal-up pt-4 flex flex-wrap justify-center gap-3">
            {[
              { id: "all", label: "Tampilkan Semua" },
              { id: "diklat", label: "Program Diklat (Offline/Hybrid)" },
              { id: "webinar", label: "Webinar Premium (Live)" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  audioManager.playBubble();
                  setActiveCategory(cat.id as any);
                }}
                className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-sm ${
                  activeCategory === cat.id
                    ? "bg-[#1E88E5] text-white shadow-lg shadow-[#1E88E5]/20 scale-105 border border-[#1E88E5]"
                    : "bg-white/85 text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Value Cards Showcase Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full pt-6"
        >
          {filteredValues.map((val, idx) => {
            const isDiklat = val.category === "diklat";
            const chordFrequency = isDiklat ? 523.25 + idx * 80 : 349.23 + idx * 80;
            return (
              <div
                key={val.id}
                onMouseEnter={() => handleCardHover(chordFrequency)}
                className="group relative flex flex-col justify-between p-8 rounded-3xl border border-slate-200 bg-white hover:border-[#1E88E5]/30 hover:scale-[1.01] hover:shadow-2xl hover:shadow-[#1E88E5]/5 transition-all duration-300 shadow-xl shadow-slate-100/50 overflow-hidden backdrop-blur-md"
              >
                {/* Visual Glow Layer within the card on hover */}
                <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                  isDiklat ? "bg-[#F4C542]" : "bg-[#1E88E5]"
                }`} />

                <div className="space-y-6">
                  {/* Category icon indicator & Badge row */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-xl border ${
                      isDiklat ? "bg-[#F4C542]/10 text-[#F4C542] border-amber-200" : "bg-[#1E88E5]/10 text-[#1E88E5] border-blue-150"
                    }`}>
                      {isDiklat ? (
                        <BookOpen className="w-6 h-6" />
                      ) : (
                        <Monitor className="w-6 h-6" />
                      )}
                    </div>
                    
                    <span className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest rounded-full font-bold ${
                      isDiklat 
                        ? "bg-[#F4C542]/10 text-amber-600 border border-amber-300/30" 
                        : "bg-[#1E88E5]/10 text-[#1E88E5] border border-blue-200/30"
                    }`}>
                      {val.badge}
                    </span>
                  </div>

                  {/* Text titles */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold tracking-tight text-slate-800 group-hover:text-[#1E88E5] transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-mono">
                      {val.subtitle}
                    </p>
                    <p className="text-slate-500 text-sm font-light leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  {/* Bullet Benefits */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    {val.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2.5 text-xs text-slate-650">
                        <CheckCircle className={`w-4 h-4 shrink-0 ${
                          isDiklat ? "text-[#F4C542]" : "text-[#1E88E5]"
                        }`} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer action trigger */}
                <div className="pt-8 mt-6 border-t border-slate-100 flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 font-bold">KODE: PC-00{idx+1}</span>
                  <span className={`flex items-center gap-1 group-hover:gap-2 transition-all font-bold ${
                    isDiklat ? "text-amber-500" : "text-[#1E88E5]"
                  }`}>
                    Pelajari Detail
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Webinar Floating Live Preview simulation box */}
        <div className="max-w-4xl mx-auto p-5 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-slate-200/60 backdrop-blur-md">
          <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1E88E5]/30 via-transparent to-[#F4C542]/20" />
            <Sparkles className="w-8 h-8 text-[#F4C542] animate-spin [animation-duration:8s] opacity-80" />
            <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-600 font-mono text-[9px] uppercase tracking-widest text-white font-bold animate-pulse">
              ● LIVE
            </span>
          </div>
          <div className="flex-1 space-y-3 pb-4 md:pb-0">
            <span className="text-xs font-semibold font-mono tracking-widest text-[#1E88E5] uppercase">Fasilitas Ekstra Premium</span>
            <h4 className="text-lg font-display font-bold text-slate-800">Integrasi Webinar Interaktif Bersertifikat</h4>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Dapatkan akses langsung ke forum tanya jawab interaktif bersama praktisi nasional sebulan sekali, 
              dilengkapi materi rekaman eksklusif dan instrumen pembelajaran gratis.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
