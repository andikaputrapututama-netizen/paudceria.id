import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Users, MapPin, Building, Sparkles } from "lucide-react";
import { PARTNERS } from "../data";
import { audioManager } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

export default function CollaborationSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      const stats = [
        { target: 154000, suffix: "+" },
        { target: 24700, suffix: "" },
        { target: 34, suffix: "" },
        { target: 480, suffix: "+" }
      ];

      const counterElements = countersRef.current?.querySelectorAll(".stat-counter");
      if (counterElements) {
        counterElements.forEach((el, index) => {
          const targetValue = stats[index].target;
          const obj = { value: 0 };
          
          gsap.to(obj, {
            value: targetValue,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: countersRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            onUpdate: () => {
              el.textContent = Math.floor(obj.value).toLocaleString("id-ID") + stats[index].suffix;
            }
          });
        });
      }

      // Infinite scrolling marquee left animation
      if (marqueeRef.current) {
        const row = marqueeRef.current.querySelector(".marquee-row");
        if (row) {
          // Clone items to ensure seamless loop
          const origContent = row.innerHTML;
          row.innerHTML = origContent + origContent + origContent; // repeat 3 times
          
          gsap.to(row, {
            xPercent: -33.3,
            ease: "none",
            duration: 22,
            repeat: -1
          });
        }
      }

      // Parallax effect on columns
      gsap.fromTo(
        ".parallax-layer",
        { y: 30 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="collaboration-section"
      ref={rootRef}
      className="relative w-full py-24 bg-transparent text-slate-850 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,197,66,0.04),transparent_50%)]" />

      <div className="relative w-full max-w-7xl mx-auto px-6 z-20 space-y-20">
        
        {/* Header Text */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold tracking-[0.2em] text-[#1E88E5] px-4 py-1.5 rounded-full bg-[#1E88E5]/10 border border-[#1E88E5]/20">
            <Compass className="w-3.5 h-3.5 text-brand-blue" />
            <span>04 — COLLABORATIVE IMPACT</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight select-none text-slate-800 leading-none">
            <span className="block text-slate-400 font-extrabold">Jejaring Edukasi Terpercaya</span>
            <span className="block mt-2">
              Kolaborasi Luas Menjangkau Nusantara
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-light">
            Kami bersinergi dengan lembaga riset, dinas pendidikan regional, dan universitas negeri 
            untuk merintis standarisasi pengajaran anak usia dini di seluruh nusantara.
          </p>
        </div>

        {/* Infographic Counters Frame */}
        <div
          ref={countersRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto w-full pt-6"
        >
          {[
            { label: "Pendidik Terbantu", icon: <Users className="w-5 h-5 text-[#F4C542]" />, initValue: "154.000+" },
            { label: "Modul Tersalurkan", icon: <Building className="w-5 h-5 text-[#1E88E5]" />, initValue: "24.700" },
            { label: "Provinsi Dijangkau", icon: <MapPin className="w-5 h-5 text-emerald-500" />, initValue: "34" },
            { label: "Sekolah PAUD Mitra", icon: <Sparkles className="w-5 h-5 text-amber-500" />, initValue: "480+" }
          ].map((stat, sIdx) => (
            <div
              key={sIdx}
              className="p-6 rounded-3xl border border-slate-200 bg-white/70 hover:bg-white hover:border-[#1E88E5]/30 hover:shadow-2xl hover:shadow-[#1E88E5]/5 hover:scale-[1.01] transition-all text-center space-y-3 cursor-default shadow-xl shadow-slate-100/50 backdrop-blur-md"
              onMouseEnter={() => audioManager.playPluck(196 * (sIdx + 1.2), 0.15, "triangle")}
            >
              <div className="mx-auto w-10 h-10 rounded-full bg-slate-50 border border-slate-150 flex items-center justify-center">
                {stat.icon}
              </div>
              <h3 className="stat-counter text-3xl sm:text-4xl font-mono font-bold text-slate-800 tracking-tight leading-none">
                {stat.initValue}
              </h3>
              <p className="text-slate-400 text-[10px] uppercase tracking-wider font-mono font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Marquee Partner Logos section */}
        <div className="space-y-6 pt-6">
          <div className="text-center font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            KERJASAMA RESMI LEMBAGA AKADEMIK & KEMENTERIAN
          </div>
          
          <div
            ref={marqueeRef}
            className="w-full overflow-hidden py-5 bg-white/75 border-y border-slate-200 flex items-center backdrop-blur-sm"
          >
            <div className="marquee-row flex items-center gap-12 whitespace-nowrap min-w-full">
              {PARTNERS.map((partner, pIdx) => (
                <div
                  key={partner.id}
                  className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F4C542] shrink-0" />
                  <span className="font-display font-bold text-sm text-slate-700">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#1E88E5] font-bold uppercase px-2.5 py-0.5 rounded bg-[#1E88E5]/10 border border-[#1E88E5]/15">
                    {partner.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Parallax Infographic Detail Grid */}
        <div className="parallax-layer grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full pt-4">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-100/55 space-y-4">
            <h4 className="text-lg font-display font-bold text-slate-800">Standar Penjamin Mutu</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              Setiap inovasi modul silabus dirancang bersama tim Penjaminan Mutu Akademik UNJ & UPI 
              agar senantiasa relevan dengan tuntutan dunia kependidikan modern Indonesia. Kami bertekad 
              mempersingkat gap kompetensi antara guru di kota besar dengan guru pos-pos daerah terpencil.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-100/55 space-y-4">
            <h4 className="text-lg font-display font-bold text-slate-800">Alumni Guru Berkarakter</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              Melalui kolaborasi masif bersama APGUDI, seluruh modul kami diadaptasikan ke dalam 
              kurikulum terjangkau sehingga materi berstandar nasional sanggup diterima oleh ribuan guru 
              relawan meskipun dengan penanganan fasilitas yang sangat terbatas sekalipun.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
