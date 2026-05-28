import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Sparkles, Award, GraduationCap, XCircle, CheckCircle, HelpCircle } from "lucide-react";
import { audioManager } from "../utils/audio";
import ParticleLayer from "./ParticleLayer";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const morphShapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Heading on Scroll
      if (textRef.current) {
        const lines = textRef.current.querySelectorAll(".reveal-line");
        gsap.fromTo(
          lines,
          { opacity: 0, y: 50, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 50%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Parallax-like horizontal slip trigger for cards
      const tlCards = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        }
      });

      if (card1Ref.current && card2Ref.current) {
        tlCards.fromTo(
          card1Ref.current,
          { x: -100, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" }
        )
        .fromTo(
          card2Ref.current,
          { x: 100, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
          "-=1.0"
        );
      }

      // Morph shape gentle scale + rotation background animation
      if (morphShapeRef.current) {
        gsap.to(morphShapeRef.current, {
          borderRadius: "45% 55% 60% 40% / 50% 40% 60% 50%",
          rotation: 360,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleHoverEvent = () => {
    audioManager.playPluck(587.33, 0.1, "sine"); // D5 pitch pluck on hover
  };

  return (
    <div
      id="problem-section"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 flex flex-col justify-center items-center bg-transparent text-slate-850 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(30,136,229,0.08),transparent_50%)]" />
      
      {/* Morphing shape helper backdrop */}
      <div
        ref={morphShapeRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-indigo-500/5 filter blur-3xl pointer-events-none select-none"
        style={{ borderRadius: "50% 40% 65% 35% / 40% 55% 45% 60%" }}
      />

      <ParticleLayer count={8} interactive={false} />

      {/* Content layout */}
      <div className="relative w-full max-w-7xl mx-auto px-6 z-20 flex flex-col justify-between h-full gap-16">
        
        {/* Cinematic Header Text Presentation */}
        <div ref={textRef} className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block text-[10px] font-mono font-bold tracking-[0.2em] text-[#1E88E5] uppercase px-4 py-1.5 bg-[#1E88E5]/10 border border-[#1E88E5]/20 rounded-full">
            02 — THE CHALLENGE & THE WORK
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight leading-tight select-none text-slate-800">
            <span className="block reveal-line text-slate-400 font-extrabold">Tantangan Kualitas Guru</span>
            <span className="block reveal-line mt-1">
              PAUD Ceria: Solusi Kompetensi Guru
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-light reveal-line">
            Mendidik anak usia dini bukan sekadar mengasuh. Dibutuhkan kurikulum yang memadai, 
            metode pengajaran yang menyenangkan, serta kematangan emosi pendidik yang terstandarisasi.
          </p>
        </div>

        {/* Dual Problem & Solution Cards - Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto w-full items-stretch animate-fade-in">
          
          {/* Card 1 — The Problem context */}
          <div
            ref={card1Ref}
            className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl border border-slate-200 bg-white/75 hover:border-red-500/20 hover:scale-[1.01] transition-all duration-300 shadow-xl shadow-slate-100/50 group backdrop-blur-md"
            onMouseEnter={handleHoverEvent}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-red-50 rounded-2xl border border-red-100">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <span className="font-mono text-xs font-bold text-red-500/80 select-none tracking-widest uppercase">
                  MASALAH UTAMA
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-800 group-hover:text-red-500 transition-colors">
                  Kesenjangan Metode & Kurikulum
                </h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  Banyak pendidik PAUD menghadapi tantangan besar karena kurangnya pelatihan berkualitas, modul ajar yang monoton, serta tingginya beban administrasi.
                </p>
              </div>

              {/* Broken checklist */}
              <ul className="space-y-2.5 pt-4">
                {[
                  "Metode belajar yang kaku dan menyalin buku",
                  "Kesulitan menangani dinamika perilaku & emosi anak",
                  "Akses pelatihan akademis bermutu yang mahal dan jauh"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-500 text-xs sm:text-sm">
                    <HelpCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-slate-100 mt-8 text-xs font-mono font-bold text-slate-400">
              STATUS GURU: MEMBUTUHKAN PENINGKATAN
            </div>
          </div>

          {/* Card 2 — The Solution (PAUD Cerial) */}
          <div
            ref={card2Ref}
            className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl border border-blue-100 bg-white hover:border-[#1E88E5]/30 hover:scale-[1.01] transition-all duration-300 shadow-xl shadow-blue-50/70 group backdrop-blur-xl"
            onMouseEnter={() => audioManager.playPluck(659.25, 0.1, "sine")}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-[#1E88E5]/10 rounded-2xl border border-blue-100">
                  <GraduationCap className="w-8 h-8 text-[#1E88E5]" />
                </div>
                <span className="font-mono text-xs font-bold text-[#1E88E5] select-none tracking-widest uppercase">
                  SOLUSI PAUD CERIA
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-800 group-hover:text-[#1E88E5] transition-colors">
                  Pemberdayaan Pendidik Inspiratif
                </h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  Kami hadir dengan ekosistem digital terintegrasi berupa modul siap ajar, bimbingan langsung, dan webinar nasional guna memicu lompatan kualitas mengajar.
                </p>
              </div>

              {/* Solutions checklist */}
              <ul className="space-y-2.5 pt-4">
                {[
                  "Pelatihan interaktif berbasis metode 'Bermain Bermakna'",
                  "Manajemen kelas & asesmen modern bebas ribet",
                  "Modul siap pakai yang mudah dipraktikkan langsung"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro Interaction Indicator */}
            <div className="pt-8 border-t border-slate-100 mt-8 flex justify-between items-center text-xs font-mono">
              <span className="text-emerald-600 font-bold">SOLUSI: AKTIF & TERPADU</span>
              <span className="text-[#1E88E5] flex items-center gap-1 font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Dukung Guru Ciptakan Karya
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
