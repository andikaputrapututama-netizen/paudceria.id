import { useEffect, useRef, useState, FormEvent } from "react";
import { gsap } from "gsap";
import { Sparkles, Send, CheckCircle, ArrowRight, BookOpen, Lock } from "lucide-react";
import { audioManager } from "../utils/audio";

export default function ClosingCtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLParagraphElement>(null);
  const magneticButtonRef = useRef<HTMLButtonElement>(null);
  const magneticTriggerRef = useRef<HTMLDivElement>(null);
  
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant logo fade reveal + slow hover cycle
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { scale: 0.8, opacity: 0, filter: "blur(12px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: logoRef.current,
              start: "top 85%",
            }
          }
        );

        // Endless gentle float for logo
        gsap.to(logoRef.current, {
          y: -10,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Banner text zoom-out subtle reveal on enter
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { scale: 1.15, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 2.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 90%",
            }
          }
        );
      }

      // MAGNETIC HOVER EFFECT logic for CTA button
      const trigger = magneticTriggerRef.current;
      const button = magneticButtonRef.current;

      if (trigger && button) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = trigger.getBoundingClientRect();
          const triggerWidth = rect.width;
          const triggerHeight = rect.height;
          
          // Calculate relative mouse position inside trigger zone
          const relX = e.clientX - rect.left - triggerWidth / 2;
          const relY = e.clientY - rect.top - triggerHeight / 2;

          // Pull button with 35% magnetic strength
          gsap.to(button, {
            x: relX * 0.35,
            y: relY * 0.35,
            scale: 1.05,
            rotate: relX * 0.03, // Slight interactive tilt
            duration: 0.3,
            ease: "power1.out",
            overwrite: "auto"
          });
        };

        const handleMouseLeave = () => {
          // Snap back to absolute center with spring damping
          gsap.to(button, {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.45)",
            overwrite: "auto"
          });
        };

        trigger.addEventListener("mousemove", handleMouseMove);
        trigger.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          trigger.removeEventListener("mousemove", handleMouseMove);
          trigger.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = () => {
    audioManager.playSuccessChime();
    
    // Smooth particle burst on click using GSAP
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.9, filter: "brightness(1.5)" },
        { scale: 1, filter: "brightness(1)", duration: 0.6, ease: "power2.out" }
      );
    }
    
    alert("Selamat bergabung! Kami akan mengarahkan Anda ke portal pembelajaran guru hebat PAUD Ceria.");
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    audioManager.playSuccessChime();
    setIsSubmitted(true);
    setEmailInput("");
  };

  return (
    <div
      id="cta-section"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 flex flex-col justify-center items-center bg-transparent text-slate-800 overflow-hidden"
    >
      {/* Background radial gradient representing a cinematic slow zoom out on enter */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(30,136,229,0.06)_0%,transparent_70%)] animate-[pulse_6s_infinite]" />
      
      {/* Dynamic line vector art background */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0" />
      <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0" />

      <div className="relative w-full max-w-5xl mx-auto px-6 z-20 text-center space-y-12">
        
        {/* Rounded interactive elegant logo block */}
        <div className="flex justify-center">
          <div
            ref={logoRef}
            className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#F4C542] via-yellow-400 to-[#1E88E5] flex items-center justify-center shadow-2xl shadow-yellow-500/10 cursor-pointer"
            onClick={() => audioManager.playBubble()}
          >
            <span className="font-display font-black text-slate-900 text-3xl tracking-wider select-none">
              PC
            </span>
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <p
            ref={bannerRef}
            className="font-mono text-xs sm:text-sm tracking-widest text-[#1E88E5] font-black uppercase select-none"
          >
            07 — BELAJAR BERKESAN BERSAMA PAUD CERIA
          </p>

          <h2 className="text-5xl sm:text-7xl font-display font-black tracking-tight text-slate-800 leading-none">
            Mari Bertumbuh Bersama!
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-light font-sans leading-relaxed">
            Dapatkan bimbingan, modul, sertifikat pelatihan kependidikan nasional, serta 
            akses eksklusif ke komunitas guru kreatif Indonesia. Mulai evolusi mengajar Anda sekarang.
          </p>
        </div>

        {/* MAGNETIC HOVER CTA BUTTON */}
        <div className="flex justify-center py-6">
          <div
            ref={magneticTriggerRef}
            className="w-80 h-32 flex items-center justify-center relative cursor-pointer"
          >
            <button
              ref={magneticButtonRef}
              onClick={handleCtaClick}
              className="absolute px-8 py-4 rounded-full bg-gradient-to-r from-[#1E88E5] to-blue-600 hover:from-blue-600 hover:to-[#1E88E5] text-white font-display font-bold text-sm tracking-widest uppercase shadow-2xl shadow-[#1E88E5]/15 active:scale-95 transition-shadow flex items-center gap-3 select-none pointer-events-none"
            >
              <Sparkles className="w-5 h-5 text-white fill-white" />
              <span>Gabung Bersama PAUD Ceria</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Newsletter Signup form - High production value */}
        <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-100/60 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-mono select-none font-bold">
            <BookOpen className="w-4 h-4 text-[#1E88E5]" />
            <span>Kirim Panduan Saku Gratis Ke Email</span>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleFormSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Masukkan email guru Anda..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onFocus={() => audioManager.playPluck(440, 0.08, "sine")}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:border-[#1E88E5] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#1E88E5] hover:bg-blue-600 active:scale-95 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Kirim</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="py-2.5 text-emerald-600 text-sm font-mono flex items-center justify-center gap-2 font-bold animate-pulse">
              <CheckCircle className="w-4 h-4" />
              <span>Panduan berhasil dikirim! Silakan periksa inbox.</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 select-none font-semibold">
            <Lock className="w-3 h-3" />
            <span>Pemberitahuan Aman & Tanpa Spam</span>
          </div>
        </div>

        {/* Footer legalities */}
        <footer className="pt-12 border-t border-slate-200 text-slate-400 font-mono text-[10px] tracking-widest text-center flex flex-col justify-center items-center gap-2 font-semibold">
          <span>© 12026 PAUD CERIA INDONESIA. SELURUH HAK CIPTA DILINDUNGI.</span>
          <span className="text-[#1E88E5] text-[9px] font-extrabold uppercase">PAUD SEHAT, PAUD CERDAS, PAUD CERIA</span>
        </footer>

      </div>
    </div>
  );
}
