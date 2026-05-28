// Web Audio API custom synthesizer for cinematic ambient backdrop and button micro-interactions.

class CinematicAudioManager {
  private ctx: AudioContext | null = null;
  private primaryGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private isAmbientPlaying = false;
  private bpm = 60;
  private chordTimer: any = null;

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    
    // Create master compression and gain
    this.primaryGain = this.ctx.createGain();
    this.primaryGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // Connect sound chain
    this.filter.connect(this.primaryGain);
    this.primaryGain.connect(this.ctx.destination);
  }

  // Soft digital pluck for hover effects
  playPluck(freq = 600, duration = 0.15, type: OscillatorType = "sine") {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      // Exponential frequency decay for organic pluck style
      osc.frequency.exponentialRampToValueAtTime(freq / 2, this.ctx.currentTime + duration);

      gainNode.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + duration);

      osc.connect(gainNode);
      if (this.primaryGain) {
        gainNode.connect(this.primaryGain);
      } else {
        gainNode.connect(this.ctx.destination);
      }

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context block:", e);
    }
  }

  // Sparkly bubble pop for kid-friendly educational theme
  playBubble() {
    const randomFreq = 440 + Math.random() * 600;
    this.playPluck(randomFreq, 0.2, "triangle");
  }

  // Success chime
  playSuccessChime() {
    const now = this.ctx ? this.ctx.currentTime : 0;
    setTimeout(() => this.playPluck(523.25, 0.25, "sine"), 0); // C5
    setTimeout(() => this.playPluck(659.25, 0.25, "sine"), 100); // E5
    setTimeout(() => this.playPluck(783.99, 0.25, "sine"), 200); // G5
    setTimeout(() => this.playPluck(1046.50, 0.4, "sine"), 300); // C6
  }

  // Play ambient low chord loop
  toggleAmbient(force?: boolean) {
    this.init();
    if (!this.ctx) return false;

    const targetState = force !== undefined ? force : !this.isAmbientPlaying;
    
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (targetState) {
      if (this.isAmbientPlaying) return true;
      this.isAmbientPlaying = true;
      
      // Fade-in master gain gently
      if (this.primaryGain) {
        this.primaryGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.primaryGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 2.0);
      }
      
      // Start chord loop generator
      this.startChordLoop();
    } else {
      this.isAmbientPlaying = false;
      
      // Fade-out master gain gently
      if (this.primaryGain) {
        this.primaryGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);
      }
      
      // Stop chord loop
      if (this.chordTimer) {
        clearTimeout(this.chordTimer);
        this.chordTimer = null;
      }
      
      // Stop current oscillators
      setTimeout(() => {
        this.stopOscillators();
      }, 1600);
    }
    return this.isAmbientPlaying;
  }

  private stopOscillators() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    this.oscillators = [];
  }

  private startChordLoop() {
    if (!this.isAmbientPlaying || !this.ctx) return;

    // Define beautiful, warm Indonesian child-like modern chords (Key: G Major, C Major, D Major)
    const progressions = [
      [196.00, 246.94, 293.66, 392.00], // G Major (G3, B3, D4, G4)
      [130.81, 261.63, 329.63, 392.00], // C Major (C3, C4, E4, G4)
      [146.83, 293.66, 369.99, 440.00], // D Major (D3, D4, F#4, A4)
      [164.81, 246.94, 329.63, 392.00]  // E Minor (E3, B3, E4, G4)
    ];

    let currentChordIndex = 0;

    const playNextChord = () => {
      if (!this.isAmbientPlaying || !this.ctx) return;
      
      this.stopOscillators();
      
      const freqs = progressions[currentChordIndex];
      const now = this.ctx.currentTime;

      freqs.forEach((freq) => {
        if (!this.ctx || !this.filter) return;
        const osc = this.ctx.createOscillator();
        const chordGain = this.ctx.createGain();

        // High frequency content is filtered, giving a super mellow, cinematic background pad
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);
        
        // Gentlest LFO vibrato
        const vibrato = this.ctx.createOscillator();
        const vibratoGain = this.ctx.createGain();
        vibrato.frequency.value = 1.8; // 1.8Hz
        vibratoGain.gain.value = 1.2; // slight shift
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        vibrato.start();

        // Slow cinematic swelling envelope
        chordGain.gain.setValueAtTime(0, now);
        chordGain.gain.linearRampToValueAtTime(0.08, now + 1.2); // soft swell
        chordGain.gain.setValueAtTime(0.08, now + 5.5);
        chordGain.gain.linearRampToValueAtTime(0, now + 6.8); // gentle fade

        osc.connect(chordGain);
        chordGain.connect(this.filter);
        
        osc.start(now);
        this.oscillators.push(osc);
      });

      // Subtle LFO sweep for the filter
      if (this.filter) {
        this.filter.frequency.setValueAtTime(450, now);
        this.filter.frequency.exponentialRampToValueAtTime(800, now + 3.0);
        this.filter.frequency.exponentialRampToValueAtTime(450, now + 6.5);
      }

      currentChordIndex = (currentChordIndex + 1) % progressions.length;
      
      // Chords play every 6.8 seconds
      this.chordTimer = setTimeout(playNextChord, 6800);
    };

    playNextChord();
  }

  get isPlaying() {
    return this.isAmbientPlaying;
  }
}

export const audioManager = new CinematicAudioManager();
