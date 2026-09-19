/**
 * MONKEY CHASE - Child-Friendly Audio Engine
 * Real-time Web Audio API cartoon synthesizer with seamless background music and sound effects.
 */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.musicNode = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.isMutedMusic = !window.GameStorage.data.settings.music;
    this.isMutedSfx = !window.GameStorage.data.settings.sfx;
    this.musicPlaying = false;
    this.musicInterval = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.isMutedMusic ? 0 : 0.28, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.isMutedSfx ? 0 : 0.45, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);

      this.initialized = true;
    } catch (e) {
      console.warn('AudioContext failed to initialize:', e);
    }
  }

  ensureContext() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMusicMute(muted) {
    this.isMutedMusic = muted;
    window.GameStorage.updateSettings({ music: !muted });
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(muted ? 0 : 0.28, this.ctx.currentTime);
    }
  }

  setSfxMute(muted) {
    this.isMutedSfx = muted;
    window.GameStorage.updateSettings({ sfx: !muted });
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(muted ? 0 : 0.45, this.ctx.currentTime);
    }
  }

  // --- PROCEDURAL SOUND EFFECTS ---

  playJump() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.18);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  playLand() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playBanana() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.setValueAtTime(1200, now + 0.06);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1600, now);
    osc2.frequency.setValueAtTime(2400, now + 0.06);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.2);
    osc2.stop(now + 0.2);
  }

  playStar() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.28);
    });
  }

  playMushroom() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  playHurt() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.3);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  playPowerup() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const freqs = [392, 523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + i * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.22);
    });
  }

  playCheckpoint() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const fanfare = [440, 554.37, 659.25, 880];
    fanfare.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.12;

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + (idx === 3 ? 0.4 : 0.18));

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + (idx === 3 ? 0.45 : 0.2));
    });
  }

  playLevelComplete() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const tune = [
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.2 },
      { f: 783.99, d: 0.2 },
      { f: 659.25, d: 0.15 },
      { f: 1046.5, d: 0.5 }
    ];
    let offset = 0;
    tune.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + offset;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + note.d);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + note.d + 0.05);

      offset += note.d;
    });
  }

  playGameOver() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [329.63, 311.13, 293.66, 277.18];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.25;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.32);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.35);
    });
  }

  playClick() {
    if (this.isMutedSfx) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // --- CHEERFUL PROCEDURAL JUNGLE MUSIC ENGINE ---

  startMusic() {
    if (this.musicPlaying) return;
    this.ensureContext();
    if (!this.ctx) return;
    this.musicPlaying = true;

    // A cheerful tropical 8-bar loop with marimba, bass and playful rhythm
    const bpm = 124;
    const beatSec = 60 / bpm;
    const sixteenth = beatSec / 4;

    // Melody notes in C Major Pentatonic (C, D, E, G, A) - joyful and child-friendly
    const melody = [
      { beat: 0, note: 523.25, dur: 0.2 },  // C5
      { beat: 1, note: 659.25, dur: 0.2 },  // E5
      { beat: 2, note: 783.99, dur: 0.25 }, // G5
      { beat: 3.5, note: 880.0, dur: 0.15 },// A5
      { beat: 4, note: 783.99, dur: 0.3 },  // G5
      { beat: 6, note: 659.25, dur: 0.2 },  // E5
      { beat: 7, note: 587.33, dur: 0.25 }, // D5

      { beat: 8, note: 523.25, dur: 0.2 },  // C5
      { beat: 9, note: 659.25, dur: 0.2 },  // E5
      { beat: 10, note: 880.0, dur: 0.3 },  // A5
      { beat: 12, note: 1046.5, dur: 0.35 },// C6
      { beat: 14, note: 880.0, dur: 0.2 },  // A5
      { beat: 15, note: 783.99, dur: 0.25 } // G5
    ];

    const bass = [
      { beat: 0, note: 130.81 },  // C3
      { beat: 2, note: 196.0 },   // G3
      { beat: 4, note: 174.61 },  // F3
      { beat: 6, note: 196.0 },   // G3
      { beat: 8, note: 130.81 },  // C3
      { beat: 10, note: 220.0 },  // A3
      { beat: 12, note: 174.61 }, // F3
      { beat: 14, note: 196.0 }   // G3
    ];

    let loopBeat = 0;
    const totalBeats = 16;
    let nextNoteTime = this.ctx.currentTime + 0.1;

    const scheduleNotes = () => {
      if (!this.musicPlaying || !this.ctx) return;

      while (nextNoteTime < this.ctx.currentTime + 1.2) {
        const currentBeatInLoop = loopBeat % totalBeats;

        // Schedule melody note
        const mel = melody.find(m => m.beat === currentBeatInLoop);
        if (mel && !this.isMutedMusic) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(mel.note, nextNoteTime);

          gain.gain.setValueAtTime(0.18, nextNoteTime);
          gain.gain.exponentialRampToValueAtTime(0.005, nextNoteTime + mel.dur);

          osc.connect(gain);
          gain.connect(this.musicGain);

          osc.start(nextNoteTime);
          osc.stop(nextNoteTime + mel.dur + 0.05);
        }

        // Schedule Bass note
        const b = bass.find(item => item.beat === currentBeatInLoop);
        if (b && !this.isMutedMusic) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(b.note, nextNoteTime);

          gain.gain.setValueAtTime(0.22, nextNoteTime);
          gain.gain.exponentialRampToValueAtTime(0.01, nextNoteTime + beatSec * 0.9);

          osc.connect(gain);
          gain.connect(this.musicGain);

          osc.start(nextNoteTime);
          osc.stop(nextNoteTime + beatSec);
        }

        // Schedule subtle marimba/woodblock percussion on 2nd and 4th beats
        if ((currentBeatInLoop % 2 === 1) && !this.isMutedMusic) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(480, nextNoteTime);
          osc.frequency.exponentialRampToValueAtTime(180, nextNoteTime + 0.06);

          gain.gain.setValueAtTime(0.12, nextNoteTime);
          gain.gain.exponentialRampToValueAtTime(0.005, nextNoteTime + 0.07);

          osc.connect(gain);
          gain.connect(this.musicGain);

          osc.start(nextNoteTime);
          osc.stop(nextNoteTime + 0.08);
        }

        nextNoteTime += sixteenth * 4; // Advance 1 beat
        loopBeat++;
      }
    };

    this.musicInterval = setInterval(scheduleNotes, 200);
  }

  stopMusic() {
    this.musicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

window.GameAudio = new AudioManager();
