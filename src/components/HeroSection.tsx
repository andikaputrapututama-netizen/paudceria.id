import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Volume2, VolumeX, Sparkles, MoveDown } from "lucide-react";
import { audioManager } from "../utils/audio";
import ParticleLayer from "./ParticleLayer";

interface HeroSectionProps {
  onStartSound: () => void;
  isSoundOn: boolean;
}

export default function HeroSection({ onStartSound, isSoundOn }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const floatingLineRef = useRef<SVGSVGElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const videoMockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant GSAP Entry Timelines
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animate background abstract scaling
      tl.fromTo(
        ".gradient-bg",
        { scale: 1.15, filter: "blur(20px)" },
        { scale: 1, filter: "blur(0px)", duration: 2.2, ease: "power2.out" }
      );

      // Word reveal / line reveal animation for Title 1
      if (title1Ref.current) {
        const words = title1Ref.current.querySelectorAll(".word-reveal");
        tl.fromTo(
          words,
          { y: 80, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.15 },
          "-=1.5"
        );
      }

      // Transition Title 2 cue
      if (title2Ref.current) {
        const chars = title2Ref.current.querySelectorAll(".char-reveal");
        tl.fromTo(
          chars,
          { opacity: 0, scale: 0.8, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 1.0, stagger: 0.08, ease: "back.out(2)" },
          "-=0.5"
        );
      }

      // Video Mock Reveal
      if (videoMockRef.current) {
        tl.fromTo(
          videoMockRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4 },
          "-=0.8"
        );
      }

      // Floating Line Animation
      if (floatingLineRef.current) {
        gsap.fromTo(
          floatingLineRef.current.querySelector("path"),
          { strokeDashoffset: 1000 },
          { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut", repeat: -1, yoyo: true }
        );
      }

      // Bounce Scroll Cue
      if (scrollCueRef.current) {
        gsap.fromTo(
          scrollCueRef.current,
          { y: 0 },
          { y: 12, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleHoverEvent = () => {
    audioManager.playPluck(523.25, 0.15, "triangle"); // play happy warm tone on interactivity
  };

  return (
    <div
      id="hero-section"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-transparent text-slate-800 overflow-hidden"
    >
      {/* Background cinematic gradient with motion abstract shape */}
      <div className="absolute inset-0 gradient-bg overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-brand-blue/10 mix-blend-multiply filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-brand-yellow/10 mix-blend-multiply filter blur-[120px] animate-pulse [animation-duration:8s]" />
      </div>

      <ParticleLayer count={12} interactive={true} />

      {/* Floating vector designs reminiscent of professional Motion Graphics files */}
      <div className="absolute inset-0 pointer-events-none select-none z-10">
        <svg
          ref={floatingLineRef}
          className="absolute left-[-5%] top-1/3 w-[110%] h-[30%] opacity-20"
          viewBox="0 0 1200 120"
          fill="none"
        >
          <path
            d="M0,80 C150,110 300,50 450,40 C600,30 750,90 900,70 C1050,50 1150,20 1200,40"
            stroke="#1E88E5"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>
      </div>

      {/* Top Navbar HUD style of high-end cinematic profile */}
      <header className="relative w-full max-w-7xl mx-auto px-6 h-20 flex justify-between items-center z-30">
        <div className="flex items-center gap-2" onMouseEnter={handleHoverEvent}>
          <div className="w-10 h-10 bg-[#1E88E5] rounded-xl flex items-center justify-center text-white font-bold italic text-xl shadow-lg shadow-brand-blue/15">
            P
          </div>
          <span className="font-display font-extrabold tracking-tight text-lg text-[#1e293b]">
            PAUD <span className="text-[#1E88E5] font-black">CERIA</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              onStartSound();
              audioManager.playPluck(880, 0.1, "sine");
            }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:border-brand-blue hover:text-brand-blue transition-all text-xs font-mono tracking-widest uppercase cursor-pointer shadow-sm"
          >
            {isSoundOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#1E88E5] animate-bounce" />
                <span>Ambient On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span>Ambient Off</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Hero Core Content Layout */}
      <main className="relative flex-1 w-full max-w-5xl mx-auto px-6 flex flex-col justify-center items-center text-center z-20">
        <div className="space-y-4 max-w-3xl">
          {/* Sparkle Tag */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#1E88E5]/10 text-[#1E88E5] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-[#1E88E5]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
            <span>01 — THE HOOK</span>
          </div>

          {/* Primary Text Animation Word Reveal */}
          <h1
            ref={title1Ref}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter text-[#1e293b] leading-[0.95] text-mask select-none"
          >
            <span className="inline-block overflow-hidden h-fit">
              <span className="inline-block word-reveal pr-3">PAUD:</span>
            </span>{" "}
            <br />
            <span className="inline-block overflow-hidden h-fit">
              <span className="inline-block word-reveal text-stroke-blue-lg">Fondasi</span>
            </span>{" "}
            <br />
            <span className="inline-block overflow-hidden h-fit text-[#F4C542]">
              <span className="inline-block word-reveal">Masa Depan</span>
            </span>
          </h1>

          {/* Secondary Title Transition Stagger */}
          <h2
            ref={title2Ref}
            className="text-base sm:text-xl lg:text-2xl font-sans font-light tracking-wide text-slate-500 mt-6 max-w-2xl mx-auto flex items-center justify-center gap-1 flex-wrap"
          >
            {"Kunci: Kualitas Pendidik".split("").map((char, index) => (
              <span
                key={index}
                className={`char-reveal inline-block ${
                  char === " " ? "w-2" : ""
                } ${
                  "Kualitas Pendidik".includes(char) && index > 6
                    ? "text-[#1E88E5] font-bold"
                    : ""
                }`}
              >
                {char}
              </span>
            ))}
          </h2>
        </div>

        {/* Cinematic Video Profile Preview Box - Simulating high production */}
        <div
          ref={videoMockRef}
          className="w-full max-w-4xl mt-12 group relative rounded-3xl overflow-hidden border-4 border-white bg-white shadow-2xl shadow-slate-200/80 aspect-video md:aspect-[21/9]"
          onMouseEnter={handleHoverEvent}
        >
          {/* Animated Background Motion Graphics canvas placeholder */}
          <div className="absolute inset-0 overflow-hidden bg-slate-950 flex items-center justify-center">
            {/* Interactive moving overlay representing video content */}
            <div className="absolute w-[180%] h-[180%] top-[-40%] left-[-40%] animate-spin [animation-duration:40s] opacity-35 bg-[conic-gradient(from_0deg,_#1E88E5,_#F4C542,_#09090b,_#1E88E5)]" />
            <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-md" />

            <div className="relative text-center p-8 space-y-4 max-w-lg z-10 pointer-events-none">
              <div className="text-brand-yellow font-mono text-xs uppercase tracking-widest animate-pulse">
                • PLAYING MOTION INTERACTIVE VIDEO •
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                “Tawa Hari Ini, Pemimpin Esok Hari”
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Menyajikan lanskap dedikasi guru dalam mencerdaskan tunas bangsa lewat pendekatan kreatif.
              </p>
            </div>
            
            {/* Play Button micro interaction */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white text-xs hover:border-brand-yellow hover:scale-105 transition-all cursor-pointer z-10 pointer-events-auto shadow-md"
                 onClick={() => {
                   onStartSound();
                   audioManager.playSuccessChime();
                 }}>
              <Play className="w-3.5 h-3.5 fill-white text-zinc-950" />
              <span className="font-mono tracking-widest uppercase">Start Experience</span>
            </div>
          </div>

          {/* Fake timeline / seek bar at bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-zinc-800">
            <div className="h-full bg-gradient-to-r from-brand-yellow to-brand-blue w-2/5 animate-[pulse_3s_infinite]" />
          </div>
        </div>
      </main>

      {/* Downward Scroll Cue with GSAP triggers */}
      <footer className="relative w-full h-24 flex flex-col items-center justify-center z-20">
        <a
          href="#problem-section"
          className="group flex flex-col items-center gap-2 text-slate-400 hover:text-brand-blue transition-colors font-mono text-xs tracking-widest uppercase select-none cursor-pointer"
          onClick={() => audioManager.playBubble()}
        >
          <span>Eksplor Alur Kisah</span>
          <div ref={scrollCueRef} className="p-1 rounded-full border border-slate-200 group-hover:border-brand-blue/50 transition-colors bg-white shadow-sm">
            <MoveDown className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-colors" />
          </div>
        </a>
      </footer>
    </div>
  );
}
