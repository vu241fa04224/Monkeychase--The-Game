/**
 * MONKEY CHASE - Local Storage & Persistence System
 * Handles saving and loading unlocked levels, high scores, stars, achievements, and settings.
 */

const STORAGE_KEY = 'monkey_chase_save_v1';

class StorageManager {
  constructor() {
    this.data = this.load();
  }

  getDefaults() {
    return {
      unlockedLevels: 1,
      levelStars: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      levelScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      totalBananas: 0,
      totalStars: 0,
      achievements: {
        banana_collector: false, // Collect 100 bananas
        star_hunter: false,      // Collect 10 stars
        speed_runner: false,     // Complete a level quickly (<45s)
        jungle_explorer: false,  // Complete all levels
        monkey_master: false     // Collect all 15 stars
      },
      settings: {
        music: true,
        sfx: true,
        touchControls: 'auto' // 'auto', 'on', 'off'
      }
    };
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this.getDefaults();
      const parsed = JSON.parse(raw);
      // Merge with defaults to guarantee all keys exist
      const defaults = this.getDefaults();
      return {
        ...defaults,
        ...parsed,
        levelStars: { ...defaults.levelStars, ...(parsed.levelStars || {}) },
        levelScores: { ...defaults.levelScores, ...(parsed.levelScores || {}) },
        achievements: { ...defaults.achievements, ...(parsed.achievements || {}) },
        settings: { ...defaults.settings, ...(parsed.settings || {}) }
      };
    } catch (e) {
      console.warn('Could not read from localStorage, using defaults:', e);
      return this.getDefaults();
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Could not write to localStorage:', e);
    }
  }

  unlockLevel(levelNum) {
    if (levelNum > this.data.unlockedLevels && levelNum <= 5) {
      this.data.unlockedLevels = levelNum;
      this.save();
    }
  }

  recordLevelCompletion(levelNum, score, starsCount, elapsedSeconds) {
    // Update score if higher
    if (score > (this.data.levelScores[levelNum] || 0)) {
      this.data.levelScores[levelNum] = score;
    }
    // Update stars if higher
    if (starsCount > (this.data.levelStars[levelNum] || 0)) {
      this.data.levelStars[levelNum] = starsCount;
    }
    // Unlock next level
    if (levelNum + 1 <= 5 && this.data.unlockedLevels < levelNum + 1) {
      this.data.unlockedLevels = levelNum + 1;
    }

    // Check Speed Runner achievement
    if (elapsedSeconds <= 45) {
      this.unlockAchievement('speed_runner');
    }

    // Recalculate total stars & bananas
    let allStars = 0;
    for (let l = 1; l <= 5; l++) {
      allStars += this.data.levelStars[l] || 0;
    }
    this.data.totalStars = allStars;

    if (allStars >= 10) {
      this.unlockAchievement('star_hunter');
    }
    if (allStars >= 15) {
      this.unlockAchievement('monkey_master');
    }
    if (this.data.unlockedLevels >= 5 && this.data.levelScores[5] > 0) {
      this.unlockAchievement('jungle_explorer');
    }

    this.save();
  }

  addBananas(count) {
    this.data.totalBananas += count;
    if (this.data.totalBananas >= 100) {
      this.unlockAchievement('banana_collector');
    }
    this.save();
  }

  unlockAchievement(id) {
    if (this.data.achievements[id] !== undefined && !this.data.achievements[id]) {
      this.data.achievements[id] = true;
      this.save();
      return true; // Newly unlocked
    }
    return false;
  }

  updateSettings(settings) {
    this.data.settings = { ...this.data.settings, ...settings };
    this.save();
  }

  resetProgress() {
    this.data = this.getDefaults();
    this.save();
  }
}

// Global storage instance
window.GameStorage = new StorageManager();
