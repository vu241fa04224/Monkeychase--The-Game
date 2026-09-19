/**
 * MONKEY CHASE - User Interface & Menus Manager
 * Animated child-friendly Main Menu, Level Select, HUD, Pause, Level Complete, Victory, Achievements, and Settings.
 */

class UIManager {
  constructor(game) {
    this.game = game;
    this.overlay = document.getElementById('ui-overlay');
    this.hudElement = document.getElementById('hud');
    this.touchControlsElement = document.getElementById('touch-controls');
    this.currentModal = null;
  }

  showMainMenu() {
    this.clearModal();
    this.hudElement.style.display = 'none';
    this.updateTouchControlsVisibility(false);

    const html = `
      <div class="menu-container fade-in">
        <!-- Logo with Floating Bananas -->
        <div class="logo-box">
          <img src="assets/images/logo.svg" alt="Monkey Chase Logo" class="main-logo pulse-anim" />
          <div class="momo-mascot">
            <img src="assets/images/momo_celebrate.svg" alt="Momo Swinging" class="mascot-img swing-anim" />
          </div>
        </div>

        <!-- Menu Buttons -->
        <div class="button-group">
          <button class="btn btn-play" id="btn-play">
            <span class="btn-icon">▶</span> PLAY
          </button>
          <button class="btn btn-levels" id="btn-levels">
            <span class="btn-icon">⭐</span> LEVELS
          </button>
          <button class="btn btn-achievements" id="btn-achievements">
            <span class="btn-icon">🏆</span> ACHIEVEMENTS
          </button>
          <button class="btn btn-settings" id="btn-settings">
            <span class="btn-icon">⚙</span> SETTINGS
          </button>
        </div>
      </div>
    `;

    this.overlay.innerHTML = html;
    this.overlay.style.display = 'flex';

    document.getElementById('btn-play').onclick = () => {
      window.GameAudio.playClick();
      // Start at highest unlocked level
      const targetLvl = window.GameStorage.data.unlockedLevels || 1;
      this.game.startLevel(targetLvl);
    };

    document.getElementById('btn-levels').onclick = () => {
      window.GameAudio.playClick();
      this.showLevelSelect();
    };

    document.getElementById('btn-achievements').onclick = () => {
      window.GameAudio.playClick();
      this.showAchievements();
    };

    document.getElementById('btn-settings').onclick = () => {
      window.GameAudio.playClick();
      this.showSettings();
    };
  }

  showLevelSelect() {
    this.clearModal();
    const unlocked = window.GameStorage.data.unlockedLevels;
    const stars = window.GameStorage.data.levelStars;
    const scores = window.GameStorage.data.levelScores;

    let cardsHtml = '';
    window.LevelData.forEach(lvl => {
      const isUnlocked = lvl.levelNum <= unlocked;
      const starCount = stars[lvl.levelNum] || 0;
      const score = scores[lvl.levelNum] || 0;

      cardsHtml += `
        <div class="level-card ${isUnlocked ? 'unlocked' : 'locked'}" data-lvl="${lvl.levelNum}">
          <div class="level-badge">${lvl.levelNum}</div>
          <div class="level-info">
            <div class="level-title">${lvl.title}</div>
            <div class="level-stars">
              <span class="${starCount >= 1 ? 'star-gold' : 'star-gray'}">⭐</span>
              <span class="${starCount >= 2 ? 'star-gold' : 'star-gray'}">⭐</span>
              <span class="${starCount >= 3 ? 'star-gold' : 'star-gray'}">⭐</span>
            </div>
            <div class="level-score">Score: ${score}</div>
          </div>
          <div class="level-action">
            ${isUnlocked ? '<button class="btn btn-small btn-card">PLAY</button>' : '<span class="lock-icon">🔒</span>'}
          </div>
        </div>
      `;
    });

    const html = `
      <div class="menu-container modal-box fade-in">
        <h2 class="modal-title">⭐ SELECT LEVEL ⭐</h2>
        <div class="level-grid">
          ${cardsHtml}
        </div>
        <button class="btn btn-back" id="btn-level-back">◀ BACK</button>
      </div>
    `;

    this.overlay.innerHTML = html;
    this.overlay.style.display = 'flex';

    document.querySelectorAll('.level-card.unlocked').forEach(card => {
      card.onclick = () => {
        const lvlNum = parseInt(card.getAttribute('data-lvl'), 10);
        window.GameAudio.playClick();
        this.game.startLevel(lvlNum);
      };
    });

    document.getElementById('btn-level-back').onclick = () => {
      window.GameAudio.playClick();
      this.showMainMenu();
    };
  }

  showPauseMenu() {
    this.clearModal();
    const html = `
      <div class="menu-container modal-box fade-in">
        <h2 class="modal-title">PAUSED</h2>
        <div class="button-group">
          <button class="btn btn-play" id="btn-resume">▶ RESUME</button>
          <button class="btn btn-levels" id="btn-restart">🔄 RESTART</button>
          <button class="btn btn-settings" id="btn-pause-settings">⚙ SETTINGS</button>
          <button class="btn btn-back" id="btn-pause-menu">🏠 MAIN MENU</button>
        </div>
      </div>
    `;

    this.overlay.innerHTML = html;
    this.overlay.style.display = 'flex';

    document.getElementById('btn-resume').onclick = () => {
      window.GameAudio.playClick();
      this.game.resumeGame();
    };

    document.getElementById('btn-restart').onclick = () => {
      window.GameAudio.playClick();
      this.game.startLevel(this.game.currentLevelIndex + 1);
    };

    document.getElementById('btn-pause-settings').onclick = () => {
      window.GameAudio.playClick();
      this.showSettings(() => this.showPauseMenu());
    };

    document.getElementById('btn-pause-menu').onclick = () => {
      window.GameAudio.playClick();
      this.game.exitToMainMenu();
    };
  }

  showLevelComplete(stats) {
    this.clearModal();
    window.GameAudio.playLevelComplete();
    window.GameParticles.spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 80);

    const hasNext = this.game.currentLevelIndex + 1 < window.LevelData.length;

    const html = `
      <div class="menu-container modal-box fade-in">
        <h2 class="modal-title">🎉 LEVEL COMPLETE! 🎉</h2>
        <div class="momo-celebrate-box">
          <img src="assets/images/momo_celebrate.svg" alt="Celebrate" class="celebrate-img bounce-anim" />
        </div>
        <div class="stats-panel">
          <div class="stat-row"><span>🍌 Bananas:</span> <strong>${stats.bananas}</strong></div>
          <div class="stat-row">
            <span>⭐ Stars:</span> 
            <strong>
              <span class="${stats.stars >= 1 ? 'star-gold' : 'star-gray'}">⭐</span>
              <span class="${stats.stars >= 2 ? 'star-gold' : 'star-gray'}">⭐</span>
              <span class="${stats.stars >= 3 ? 'star-gold' : 'star-gray'}">⭐</span>
            </strong>
          </div>
          <div class="stat-row"><span>🏆 Score:</span> <strong>${stats.score}</strong></div>
          <div class="stat-row"><span>⏱ Time:</span> <strong>${stats.time}s</strong></div>
        </div>
        <div class="button-group horizontal-group">
          ${hasNext ? '<button class="btn btn-play" id="btn-next-level">NEXT LEVEL ▶</button>' : ''}
          <button class="btn btn-levels" id="btn-replay-level">🔄 REPLAY</button>
          <button class="btn btn-back" id="btn-complete-menu">🏠 MAIN MENU</button>
        </div>
      </div>
    `;

    this.overlay.innerHTML = html;
    this.overlay.style.display = 'flex';

    if (hasNext) {
      document.getElementById('btn-next-level').onclick = () => {
        window.GameAudio.playClick();
        this.game.startLevel(this.game.currentLevelIndex + 2);
      };
    }

    document.getElementById('btn-replay-level').onclick = () => {
      window.GameAudio.playClick();
      this.game.startLevel(this.game.currentLevelIndex + 1);
    };

    document.getElementById('btn-complete-menu').onclick = () => {
      window.GameAudio.playClick();
      this.game.exitToMainMenu();
    };
  }

  showFinalVictory() {
    this.clearModal();
    window.GameAudio.playLevelComplete();
    window.GameParticles.spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 120);

    const html = `
      <div class="menu-container modal-box fade-in">
        <h2 class="modal-title gold-text">🏆 YOU DID IT! 🏆</h2>
        <div class="victory-subtitle">CONGRATULATIONS! YOU SAVED THE GOLDEN BANANA!</div>
        <div class="momo-celebrate-box">
          <img src="assets/images/momo_celebrate.svg" alt="Victory Dance" class="celebrate-img bounce-anim" />
        </div>
        <div class="button-group">
          <button class="btn btn-play" id="btn-victory-play">▶ PLAY AGAIN</button>
          <button class="btn btn-levels" id="btn-victory-levels">⭐ LEVELS</button>
          <button class="btn btn-back" id="btn-victory-menu">🏠 MAIN MENU</button>
        </div>
      </div>
    `;

    this.overlay.innerHTML = html;
    this.overlay.style.display = 'flex';

    document.getElementById('btn-victory-play').onclick = () => {
      window.GameAudio.playClick();
      this.game.startLevel(1);
    };

    document.getElementById('btn-victory-levels').onclick = () => {
      window.GameAudio.playClick();
      this.showLevelSelect();
    };

    document.getElementById('btn-victory-menu').onclick = () => {
      window.GameAudio.playClick();
      this.game.exitToMainMenu();
    };
  }

  showAchievements() {
    this.clearModal();
    const ach = window.GameStorage.data.achievements;

    const list = [
      { id: 'banana_collector', title: '🍌 Banana Collector', desc: 'Collect 100 bananas in total' },
      { id: 'star_hunter', title: '⭐ Star Hunter', desc: 'Collect 10 hidden stars' },
      { id: 'speed_runner', title: '🏃 Speed Runner', desc: 'Complete any level in under 45s' },
      { id: 'jungle_explorer', title: '🌴 Jungle Explorer', desc: 'Complete all 5 jungle levels' },
      { id: 'monkey_master', title: '🏆 Monkey Master', desc: 'Collect all 15 stars across all levels' }
    ];

    let itemsHtml = '';
    list.forEach(item => {
      const isUnlocked = ach[item.id];
      itemsHtml += `
        <div class="achievement-card ${isUnlocked ? 'ach-unlocked' : 'ach-locked'}">
          <div class="ach-icon">${isUnlocked ? '🏅' : '🔒'}</div>
          <div class="ach-details">
            <div class="ach-title">${item.title}</div>
            <div class="ach-desc">${item.desc}</div>
          </div>
          <div class="ach-status">${isUnlocked ? 'UNLOCKED!' : 'LOCKED'}</div>
        </div>
      `;
    });

    const html = `
      <div class="menu-container modal-box fade-in">
        <h2 class="modal-title">🏆 ACHIEVEMENTS 🏆</h2>
        <div class="achievements-list">
          ${itemsHtml}
        </div>
        <button class="btn btn-back" id="btn-ach-back">◀ BACK</button>
      </div>
    `;

    this.overlay.innerHTML = html;
    this.overlay.style.display = 'flex';

    document.getElementById('btn-ach-back').onclick = () => {
      window.GameAudio.playClick();
      this.showMainMenu();
    };
  }

  showSettings(onBack = null) {
    this.clearModal();
    const settings = window.GameStorage.data.settings;

    const html = `
      <div class="menu-container modal-box fade-in">
        <h2 class="modal-title">⚙ SETTINGS ⚙</h2>
        <div class="settings-form">
          <div class="setting-item">
            <span>🎵 Background Music</span>
            <button class="toggle-btn ${settings.music ? 'on' : 'off'}" id="toggle-music">
              ${settings.music ? 'ON' : 'OFF'}
            </button>
          </div>

          <div class="setting-item">
            <span>🔊 Sound Effects</span>
            <button class="toggle-btn ${settings.sfx ? 'on' : 'off'}" id="toggle-sfx">
              ${settings.sfx ? 'ON' : 'OFF'}
            </button>
          </div>

          <div class="setting-item">
            <span>📱 On-Screen Controls</span>
            <button class="toggle-btn ${settings.touchControls === 'on' ? 'on' : 'off'}" id="toggle-touch">
              ${settings.touchControls === 'on' ? 'ALWAYS ON' : 'AUTO / TOUCH'}
            </button>
          </div>

          <div class="setting-item danger-item">
            <span>🗑 Reset Progress</span>
            <button class="btn btn-danger btn-small" id="btn-reset-data">RESET</button>
          </div>
        </div>

        <button class="btn btn-back" id="btn-settings-back">◀ BACK</button>
      </div>
    `;

    this.overlay.innerHTML = html;
    this.overlay.style.display = 'flex';

    document.getElementById('toggle-music').onclick = (e) => {
      window.GameAudio.playClick();
      const current = window.GameStorage.data.settings.music;
      window.GameAudio.setMusicMute(current);
      e.target.textContent = !current ? 'ON' : 'OFF';
      e.target.className = `toggle-btn ${!current ? 'on' : 'off'}`;
    };

    document.getElementById('toggle-sfx').onclick = (e) => {
      window.GameAudio.playClick();
      const current = window.GameStorage.data.settings.sfx;
      window.GameAudio.setSfxMute(current);
      e.target.textContent = !current ? 'ON' : 'OFF';
      e.target.className = `toggle-btn ${!current ? 'on' : 'off'}`;
    };

    document.getElementById('toggle-touch').onclick = (e) => {
      window.GameAudio.playClick();
      const current = window.GameStorage.data.settings.touchControls;
      const next = current === 'on' ? 'auto' : 'on';
      window.GameStorage.updateSettings({ touchControls: next });
      e.target.textContent = next === 'on' ? 'ALWAYS ON' : 'AUTO / TOUCH';
      e.target.className = `toggle-btn ${next === 'on' ? 'on' : 'off'}`;
      this.updateTouchControlsVisibility(this.game.state === 'playing');
    };

    document.getElementById('btn-reset-data').onclick = () => {
      if (confirm('Are you sure you want to reset all game progress and achievements?')) {
        window.GameStorage.resetProgress();
        window.GameAudio.playClick();
        alert('Game progress has been reset!');
        this.showSettings(onBack);
      }
    };

    document.getElementById('btn-settings-back').onclick = () => {
      window.GameAudio.playClick();
      if (onBack) onBack();
      else this.showMainMenu();
    };
  }

  clearModal() {
    this.overlay.innerHTML = '';
    this.overlay.style.display = 'none';
  }

  showHUD() {
    this.clearModal();
    this.hudElement.style.display = 'flex';
    this.updateTouchControlsVisibility(true);
  }

  updateHUD(player, bananas, stars, score, levelTitle) {
    // Hearts display ❤️
    let heartsHtml = '';
    for (let i = 0; i < player.maxHearts; i++) {
      heartsHtml += `<span class="hud-heart ${i < player.hearts ? 'heart-full' : 'heart-empty'}">❤️</span>`;
    }
    document.getElementById('hud-hearts').innerHTML = heartsHtml;

    document.getElementById('hud-bananas').textContent = `🍌 ${bananas}`;
    document.getElementById('hud-stars').textContent = `⭐ ${stars}/3`;
    document.getElementById('hud-score').textContent = `🏆 ${score.toString().padStart(4, '0')}`;
    document.getElementById('hud-level-title').textContent = levelTitle;
  }

  updateTouchControlsVisibility(isPlaying) {
    if (!isPlaying) {
      this.touchControlsElement.style.display = 'none';
      return;
    }
    const setting = window.GameStorage.data.settings.touchControls;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (setting === 'on' || (setting === 'auto' && isTouchDevice)) {
      this.touchControlsElement.style.display = 'flex';
    } else {
      this.touchControlsElement.style.display = 'none';
    }
  }
}

window.UIManager = UIManager;
