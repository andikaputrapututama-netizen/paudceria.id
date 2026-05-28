import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, GraduationCap, Quote, ShieldCheck, Heart } from "lucide-react";
import { EXPERTS, Expert } from "../data";
import { audioManager } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

export default function CredibilitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const rotatingTextRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const [activeExpert, setActiveExpert] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blur-to-sharp text reveal for heading
      if (titleGroupRef.current) {
        gsap.fromTo(
          titleGroupRef.current.querySelectorAll(".blur-reveal"),
          { filter: "blur(12px)", opacity: 0, y: 30 },
          {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleGroupRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Smooth rotate text reveal
      const items = rotatingTextRef.current?.querySelectorAll(".rotate-item");
      if (items && items.length > 0) {
        const wordTl = gsap.timeline({ repeat: -1 });
        items.forEach((item, index) => {
          wordTl
            .fromTo(
              item,
              { y: 30, opacity: 0, filter: "blur(4px)" },
              { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.7)" }
            )
            .to(item, { y: -30, opacity: 0, filter: "blur(4px)", duration: 0.5, delay: 1.8, ease: "power2.in" });
        });
      }

      // Card expert pop-up scale reveal on scroll
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { opacity: 0, scale: 0.9, filter: "blur(8px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="credibility-section"
      ref={containerRef}
      className="relative w-full py-24 bg-transparent text-slate-800 overflow-hidden"
    >
      {/* Visual background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,136,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,136,229,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-brand-yellow/5 filter blur-[100px] pointer-events-none select-none z-0" />

      <div className="relative w-full max-w-7xl mx-auto px-6 z-20 space-y-16">
        
        {/* Header containing the Rotating tag block & title */}
        <div ref={titleGroupRef} className="max-w-4xl mx-auto text-center space-y-6">
          <div className="blur-reveal inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-mono tracking-widest text-[#1E88E5] uppercase justify-center shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-[#1E88E5] shrink-0" />
            <span className="hidden sm:inline font-bold text-slate-500">05 — CREDENTIALS:</span>
            <div ref={rotatingTextRef} className="relative h-4 w-28 overflow-hidden inline-flex items-center text-center">
              <span className="rotate-item absolute w-full text-center text-amber-500 font-black">PRAKTISI</span>
              <span className="rotate-item absolute w-full text-center text-[#1E88E5] font-black opacity-0">AKADEMISI</span>
              <span className="rotate-item absolute w-full text-center text-emerald-500 font-black opacity-0">PAKAR</span>
            </div>
          </div>

          <h2 className="blur-reveal text-4xl sm:text-5xl font-display font-black tracking-tight text-slate-800 leading-none">
            <span className="block text-slate-400 font-extrabold">Kurasi Sains Tumbuh Kembang</span>
            <span className="block mt-2">Didukung Praktisi & Pakar Terbaik</span>
          </h2>

          <p className="blur-reveal text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Metodologi PAUD Ceria dirancang berlandaskan riset ilmiah, neurosains anak, serta pengalaman 
            nyata di lapangan kependidikan guna menyalurkan ilmu praktis ramah guru. Pentingnya validitas data 
            dan kredensial para pelatih merupakan prioritas utama.
          </p>
        </div>

        {/* Experts grid containing card popups */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full"
        >
          {EXPERTS.map((expert, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;
            
            // Choose colors elegantly
            const accentColor = isFirst 
              ? "border-slate-200 hover:border-amber-400/30" 
              : isSecond 
                ? "border-slate-200 hover:border-[#1E88E5]/30" 
                : "border-slate-200 hover:border-emerald-400/30";
            
            const badgeBg = isFirst 
              ? "bg-amber-50 text-amber-700 border border-amber-200" 
              : isSecond 
                ? "bg-[#1E88E5]/10 text-[#1E88E5] border border-blue-200/50" 
                : "bg-emerald-50 text-emerald-700 border border-emerald-200";

            return (
              <div
                key={expert.id}
                onMouseEnter={() => {
                  setActiveExpert(index);
                  audioManager.playPluck(392 * (index + 1), 0.1, "sine");
                }}
                className={`group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border ${accentColor} hover:scale-[1.01] transition-all duration-300 shadow-2xl shadow-slate-100/50 relative overflow-hidden cursor-default`}
              >
                <div className="space-y-6 relative">
                  
                  {/* Circle abstract profile mockup */}
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      {/* Inner avatar mockup circle */}
                      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center font-display font-bold text-slate-500 text-lg group-hover:scale-105 transition-transform">
                        {expert.name.split(" ").filter(w => !w.includes(".")).map(w => w[0]).join("").substring(0,2)}
                      </div>
                      
                      {/* Spark element profile circle */}
                      <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px]">
                        🎓
                      </span>
                    </div>

                    <span className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest rounded-full font-bold ${badgeBg}`}>
                      {expert.role}
                    </span>
                  </div>

                  {/* Profile info content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-display font-bold text-slate-800 group-hover:text-[#1E88E5] transition-colors leading-tight">
                      {expert.name}
                    </h3>
                    <p className="text-slate-400 text-xs font-mono font-semibold">
                      {expert.affiliation}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed pt-2">
                      {expert.description}
                    </p>
                  </div>
                </div>

                {/* Academic trust metrics footer inside card */}
                <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    Terverifikasi
                  </span>
                  <span className="text-[#1E88E5] font-black flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                    {expert.metrics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Academic trust quote callout */}
        <div className="max-w-4xl mx-auto text-center py-6 border-y border-slate-200 bg-white/45 relative rounded-xl backdrop-blur-sm">
          <Quote className="w-10 h-10 text-slate-200 absolute -top-5 left-1/2 -translate-x-1/2" />
          <p className="italic text-slate-500 font-serif font-light text-sm sm:text-base max-w-2xl mx-auto pt-4 leading-relaxed">
            "Semua gagasan kependidikan kaku di masa lalu disingkirkan di PAUD Ceria, digantikan oleh kerangka stimulasi saintifik yang menumbuhkan kemandirian anak dengan kebahagiaan seutuhnya."
          </p>
        </div>

      </div>
    </div>
  );
}
