/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import ProblemSolutionSection from "./components/ProblemSolutionSection";
import CoreValueSection from "./components/CoreValueSection";
import CollaborationSection from "./components/CollaborationSection";
import CredibilitySection from "./components/CredibilitySection";
import SocialProofSection from "./components/SocialProofSection";
import ClosingCtaSection from "./components/ClosingCtaSection";
import { audioManager } from "./utils/audio";
import { Flame, Compass, GraduationCap, MessageSquare, Sparkles, HelpCircle, Layout } from "lucide-react";

export default function App() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");

  const handleStartSound = () => {
    const nextState = audioManager.toggleAmbient();
    setIsSoundOn(nextState);
  };

  // Track scroll activity to highlight HUD position indicators
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero-section",
        "problem-section",
        "core-value-section",
        "collaboration-section",
        "credibility-section",
        "social-proof-section",
        "cta-section"
      ];

      const currentScroll = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (currentScroll >= top && currentScroll < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hudSteps = [
    { id: "hero-section", label: "01. Hook Intro", icon: <Layout className="w-3.5 h-3.5" /> },
    { id: "problem-section", label: "02. Guru & Solusi", icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: "core-value-section", label: "03. Diklat & Webinar", icon: <Flame className="w-3.5 h-3.5" /> },
    { id: "collaboration-section", label: "04. Kolaborasi", icon: <Compass className="w-3.5 h-3.5" /> },
    { id: "credibility-section", label: "05. Pakar Kredibilitas", icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: "social-proof-section", label: "06. Suara Guru", icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: "cta-section", label: "07. Bertumbuh", icon: <Sparkles className="w-3.5 h-3.5" /> }
  ];

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      audioManager.playBubble();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-800 selection:bg-brand-yellow selection:text-slate-950 font-sans">
      
      {/* Cinematic HUD Section Rail Indicator on the right - Desktop exclusive layout helper */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-5 z-50">
        <div className="flex flex-col items-end gap-1 mb-2">
          <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase">STORY LINE</span>
          <div className="w-12 h-[1px] bg-slate-200" />
        </div>
        
        {hudSteps.map((step) => {
          const isActive = activeSection === step.id;
          return (
            <button
              key={step.id}
              onClick={() => handleScrollToSection(step.id)}
              className="group flex items-center gap-3 justify-end text-right cursor-pointer"
            >
              {/* Optional labels appearing on hover */}
              <span className={`font-mono text-[10px] tracking-wider uppercase transition-all duration-300 transform translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${
                isActive ? "text-brand-blue font-bold" : "text-slate-500"
              }`}>
                {step.label}
              </span>

              {/* Step indicator circle with visual active ring */}
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                isActive 
                  ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-110" 
                  : "bg-white/90 border-slate-200 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-600 shadow-sm"
              }`}>
                {step.icon}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Main Container rendering all storytelling slides based on user requested flow */}
      <div className="w-full flex flex-col">
        <HeroSection onStartSound={handleStartSound} isSoundOn={isSoundOn} />
        <ProblemSolutionSection />
        <CoreValueSection />
        <CollaborationSection />
        <CredibilitySection />
        <SocialProofSection />
        <ClosingCtaSection />
      </div>

    </div>
  );
}
