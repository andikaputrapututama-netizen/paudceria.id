import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, MessageSquare, Award, ThumbsUp, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../data";
import { audioManager } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

export default function SocialProofSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  const scaleTextRef = useRef<HTMLParagraphElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation for statistics
      const stats = [98, 120000];
      const elements = containerRef.current?.querySelectorAll(".proof-counter");
      if (elements) {
        elements.forEach((el, index) => {
          const target = stats[index];
          const obj = { value: 0 };
          
          gsap.to(obj, {
            value: target,
            duration: 2.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            onUpdate: () => {
              if (index === 0) {
                el.textContent = Math.floor(obj.value) + "%";
              } else {
                el.textContent = Math.floor(obj.value).toLocaleString("id-ID") + "+";
              }
            }
          });
        });
      }

      // Continuous slow scaling effect for main text on scroll scrub
      if (scaleTextRef.current) {
        gsap.fromTo(
          scaleTextRef.current,
          { scale: 0.9, opacity: 0.8 },
          {
            scale: 1.05,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scaleTextRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    audioManager.playBubble();
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    audioManager.playBubble();
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div
      id="social-proof-section"
      ref={containerRef}
      className="relative w-full py-24 bg-transparent text-slate-800 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] bg-brand-blue/5 rounded-full filter blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[40vw] h-[40vw] bg-amber-500/5 rounded-full filter blur-[140px] pointer-events-none select-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 z-20 space-y-16">
        
        {/* Main Header with Scaling text */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#1E88E5] uppercase px-4 py-1.5 font-bold rounded-full bg-[#1E88E5]/10 border border-[#1E88E5]/20">
            <MessageSquare className="w-3.5 h-3.5 text-brand-blue" />
            <span>06 — IMPACT SURVEY & VOICES</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight select-none leading-none text-slate-800">
            <span className="block text-slate-400 font-extrabold">Dampak Nyata Di Penjuru Negeri</span>
            <span className="block mt-2">
              Dipercaya Ratusan Ribu Pendidik
            </span>
          </h2>
          <p
            ref={scaleTextRef}
            className="text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm font-mono tracking-wide uppercase pt-4 transition-transform origin-center font-bold"
          >
            • Rerata Penilaian Kelulusan Diklat 4.9 dari 5.0 Bintang •
          </p>
        </div>

        {/* Dual stat counters column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full pt-4">
          
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-100/50 text-center space-y-3 backdrop-blur-md">
            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-bold block">TINGKAT KEPUASAN PESERTA</span>
            <h3 className="proof-counter text-4xl sm:text-6xl font-mono font-black text-[#F4C542] leading-none">
              98%
            </h3>
            <p className="text-slate-500 text-sm font-light">
              Menyatakan bahwa materi ajar saku PAUD Ceria sangat memotong kerepotan kurikulum merdeka mereka sehari-hari.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-100/50 text-center space-y-3 backdrop-blur-md">
            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-bold block">TOTAL JAM KELAS TERLAKSANA</span>
            <h3 className="proof-counter text-4xl sm:text-6xl font-mono font-black text-[#1E88E5] leading-none">
              120.000+
            </h3>
            <p className="text-slate-500 text-sm font-light">
              Kumulatif bimbingan, webinar, diklat interaktif bersertifikat nasional yang terselesaikan dengan gemilang.
            </p>
          </div>

        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 space-y-8 overflow-hidden backdrop-blur-xl">
            
            {/* Visual design element inside testimonials */}
            <div className="absolute right-6 top-6 opacity-[0.03] pointer-events-none select-none">
              <Star className="w-64 h-64 text-[#F4C542] fill-[#F4C542]" />
            </div>

            {/* Testimonial Active Slide Frame */}
            <div className="space-y-6 relative z-10 min-h-[14rem] sm:min-h-[11rem] flex flex-col justify-between">
              
              {/* Rating stars */}
              <div className="flex items-center gap-1">
                {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#F4C542] fill-[#F4C542]" />
                ))}
              </div>

              {/* Quote text body */}
              <blockquote className="text-base sm:text-lg font-sans italic font-light tracking-wide text-slate-755 leading-relaxed">
                “{TESTIMONIALS[activeIndex].quote}”
              </blockquote>

              {/* Author info row */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-4">
                <div>
                  <h4 className="font-display font-bold text-slate-800 text-base">
                    {TESTIMONIALS[activeIndex].author}
                  </h4>
                  <p className="text-slate-400 text-xs font-mono font-semibold">
                    {TESTIMONIALS[activeIndex].role} — {TESTIMONIALS[activeIndex].institution}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#1E88E5] bg-[#1E88E5]/10 border border-[#1E88E5]/20 py-0.5 px-3 rounded-full font-bold">
                    ALUMNI DIKLAT
                  </span>
                </div>
              </div>

            </div>

            {/* Navigation buttons */}
            <div className="flex justify-end gap-3 pt-4 relative z-10 border-t border-slate-100">
              <button
                onClick={handlePrev}
                className="p-2 sm:p-3 rounded-full bg-slate-50 border border-slate-200 text-slate-400 hover:border-[#1E88E5]/30 hover:text-[#1E88E5] hover:bg-white transition-all cursor-pointer shadow-sm"
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 sm:p-3 rounded-full bg-slate-50 border border-slate-200 text-slate-400 hover:border-[#1E88E5]/30 hover:text-[#1E88E5] hover:bg-white transition-all cursor-pointer shadow-sm"
                aria-label="Next quote"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Floating Trust Badges in Indonesian education format */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto w-full pt-12 items-center">
          {[
            { tag: "TERLISENSI APGUDI", desc: "Sertifikasi Asosiasi" },
            { tag: "E-SERTIFIKAT RESMI", desc: "Akses Angka Kredit" },
            { tag: "DUKUNGAN 24/7", desc: "Pendampingan Grup WA" },
            { tag: "KURIKULUM MERDEKA", desc: "Selaras Program Kemdikbud" }
          ].map((badge, bIdx) => (
            <div key={bIdx} className="text-center p-4 border border-slate-200 rounded-2xl bg-white/60 shadow-sm backdrop-blur-md">
              <span className="text-[10px] font-mono tracking-wider text-[#1E88E5] block font-extrabold">
                {badge.tag}
              </span>
              <span className="text-slate-400 text-xs block font-light mt-1">
                {badge.desc}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
