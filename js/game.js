/**
 * MONKEY CHASE - Main Game Engine
 * 60fps game loop, state machine, level loader, collision coordinator, and input processor.
 */

class GameEngine {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.baseW = 1280;
    this.baseH = 720;

    this.state = 'main_menu'; // 'main_menu', 'playing', 'paused', 'level_complete', 'victory'
    this.currentLevelIndex = 0;

    this.player = null;
    this.camera = new Camera(this.baseW, this.baseH);
    this.ui = new UIManager(this);

    // Current Level Entities
    this.platforms = [];
    this.movingPlatforms = [];
    this.mushrooms = [];
    this.bananas = [];
    this.stars = [];
    this.powerups = [];
    this.enemies = [];
    this.checkpoint = null;
    this.finishGate = null;
    this.levelBounds = { width: 2600, height: 720 };
    this.tutorialSigns = [];

    // Session Stats
    this.levelBananas = 0;
    this.levelStars = 0;
    this.levelScore = 0;
    this.startTime = 0;
    this.elapsedSeconds = 0;

    // Input States
    this.input = {
      left: false,
      right: false,
      jumpPressed: false,
      jumpHeld: false
    };

    this.initCanvas();
    this.bindInputs();
    this.bindTouchControls();
  }

  initCanvas() {
    const resize = () => {
      const windowW = window.innerWidth;
      const windowH = window.innerHeight;
      const scale = Math.min(windowW / this.baseW, windowH / this.baseH);

      this.canvas.width = this.baseW;
      this.canvas.height = this.baseH;

      this.canvas.style.width = `${Math.floor(this.baseW * scale)}px`;
      this.canvas.style.height = `${Math.floor(this.baseH * scale)}px`;

      this.camera.resize(this.baseW, this.baseH);
    };

    window.addEventListener('resize', resize);
    resize();
  }

  bindInputs() {
    window.addEventListener('keydown', (e) => {
      // First user interaction initializes audio
      window.GameAudio.ensureContext();
      if (!window.GameAudio.musicPlaying) {
        window.GameAudio.startMusic();
      }

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        this.input.left = true;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        this.input.right = true;
      }
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        if (!this.input.jumpHeld) {
          this.input.jumpPressed = true;
        }
        this.input.jumpHeld = true;
      }

      if (e.code === 'Escape' || e.code === 'KeyP') {
        if (this.state === 'playing') {
          this.pauseGame();
        } else if (this.state === 'paused') {
          this.resumeGame();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        this.input.left = false;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        this.input.right = false;
      }
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        this.input.jumpHeld = false;
        this.input.jumpPressed = false;
      }
    });

    // Start background music on user click or touch
    window.addEventListener('pointerdown', () => {
      window.GameAudio.ensureContext();
      if (!window.GameAudio.musicPlaying) {
        window.GameAudio.startMusic();
      }
    }, { once: true });
  }

  bindTouchControls() {
    const btnLeft = document.getElementById('touch-left');
    const btnRight = document.getElementById('touch-right');
    const btnJump = document.getElementById('touch-jump');
    const btnPause = document.getElementById('hud-pause-btn');

    if (btnLeft) {
      const setLeft = (val) => { this.input.left = val; };
      btnLeft.addEventListener('pointerdown', (e) => { e.preventDefault(); setLeft(true); });
      btnLeft.addEventListener('pointerup', (e) => { e.preventDefault(); setLeft(false); });
      btnLeft.addEventListener('pointercancel', (e) => { e.preventDefault(); setLeft(false); });
    }

    if (btnRight) {
      const setRight = (val) => { this.input.right = val; };
      btnRight.addEventListener('pointerdown', (e) => { e.preventDefault(); setRight(true); });
      btnRight.addEventListener('pointerup', (e) => { e.preventDefault(); setRight(false); });
      btnRight.addEventListener('pointercancel', (e) => { e.preventDefault(); setRight(false); });
    }

    if (btnJump) {
      btnJump.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.input.jumpPressed = true;
        this.input.jumpHeld = true;
      });
      btnJump.addEventListener('pointerup', (e) => {
        e.preventDefault();
        this.input.jumpHeld = false;
        this.input.jumpPressed = false;
      });
      btnJump.addEventListener('pointercancel', (e) => {
        e.preventDefault();
        this.input.jumpHeld = false;
        this.input.jumpPressed = false;
      });
    }

    if (btnPause) {
      btnPause.addEventListener('click', () => {
        window.GameAudio.playClick();
        if (this.state === 'playing') this.pauseGame();
        else if (this.state === 'paused') this.resumeGame();
      });
    }
  }

  start() {
    window.GameSprites.init(() => {
      console.log('All assets preloaded successfully.');
      this.showMainMenu();
      requestAnimationFrame((t) => this.loop(t));
    });
  }

  showMainMenu() {
    this.state = 'main_menu';
    this.ui.showMainMenu();
  }

  startLevel(lvlNum) {
    this.currentLevelIndex = lvlNum - 1;
    const lvl = window.LevelData[this.currentLevelIndex];
    if (!lvl) return;

    this.levelBounds = { width: lvl.width, height: lvl.height };
    this.levelBananas = 0;
    this.levelStars = 0;
    this.levelScore = 0;
    this.startTime = Date.now();
    this.elapsedSeconds = 0;

    // Build Player
    this.player = new Player(lvl.playerSpawn.x, lvl.playerSpawn.y);

    // Build Platforms
    this.platforms = lvl.platforms.map(p => new Platform(p.x, p.y, p.w, p.h, p.style, p.isSolid));

    // Build Moving Platforms
    this.movingPlatforms = lvl.movingPlatforms.map(mp => new MovingPlatform(mp.x, mp.y, mp.w, mp.h, mp.distX, mp.distY, mp.speed, mp.style));

    // Build Mushrooms
    this.mushrooms = lvl.mushrooms.map(m => new BounceMushroom(m.x, m.y));

    // Build Bananas
    this.bananas = lvl.bananas.map(b => new Banana(b.x, b.y));

    // Build Stars
    this.stars = lvl.stars.map(s => new Star(s.x, s.y, s.starId));

    // Build Power-ups
    this.powerups = lvl.powerups.map(pu => new PowerUp(pu.x, pu.y, pu.type));

    // Build Enemies
    this.enemies = lvl.enemies.map(e => {
      if (e.type === 'snake') return new SleepySnake(e.x, e.y, e.patrol);
      if (e.type === 'boar') return new FunnyBoar(e.x, e.y, e.patrol);
      if (e.type === 'parrot') return new MischievousParrot(e.x, e.y, e.dist);
      if (e.type === 'frog') return new JumpingFrog(e.x, e.y);
      return new SleepySnake(e.x, e.y, 100);
    });

    // Checkpoint & Finish
    this.checkpoint = new Checkpoint(lvl.checkpoint.x, lvl.checkpoint.y);
    this.finishGate = new FinishGate(lvl.finish.x, lvl.finish.y);

    this.tutorialSigns = lvl.tutorialTexts || [];

    window.GameParticles.reset();

    this.state = 'playing';
    this.ui.showHUD();
    this.ui.updateHUD(this.player, this.levelBananas, this.levelStars, this.levelScore, lvl.title);
  }

  pauseGame() {
    this.state = 'paused';
    this.ui.showPauseMenu();
  }

  resumeGame() {
    this.state = 'playing';
    this.ui.showHUD();
  }

  exitToMainMenu() {
    this.showMainMenu();
  }

  onLevelFinished() {
    this.state = 'level_complete';
    this.player.animState = 'celebrate';
    this.elapsedSeconds = Math.round((Date.now() - this.startTime) / 1000);

    // Save progress to persistent storage
    window.GameStorage.recordLevelCompletion(
      this.currentLevelIndex + 1,
      this.levelScore,
      this.levelStars,
      this.elapsedSeconds
    );
    window.GameStorage.addBananas(this.levelBananas);

    // Check if this was Level 5 (Final Victory!)
    if (this.currentLevelIndex + 1 === 5) {
      this.state = 'victory';
      this.ui.showFinalVictory();
    } else {
      this.ui.showLevelComplete({
        bananas: this.levelBananas,
        stars: this.levelStars,
        score: this.levelScore,
        time: this.elapsedSeconds
      });
    }
  }

  update() {
    if (this.state !== 'playing') return;

    this.elapsedSeconds = Math.round((Date.now() - this.startTime) / 1000);

    // Update Player
    this.player.update(this.input, this.levelBounds);

    // Reset single frame jump input
    this.input.jumpPressed = false;

    // Update Moving Platforms
    this.movingPlatforms.forEach(mp => mp.update());

    // Resolve Collisions: All solid and moving platforms
    const allPlatforms = [...this.platforms, ...this.movingPlatforms];
    Physics.resolvePlatformCollisions(this.player, allPlatforms);

    // Update and Resolve Mushrooms
    this.mushrooms.forEach(m => m.update());
    Physics.resolveMushroomBounces(this.player, this.mushrooms);

    // Update Collectibles & Power-ups
    this.bananas.forEach(b => {
      b.update();
      if (!b.collected && Physics.checkAABB(this.player, b)) {
        b.collected = true;
        const multiplier = this.player.megaTimer > 0 ? 2 : 1;
        const pts = 10 * multiplier;
        this.levelBananas += multiplier;
        this.levelScore += pts;
        window.GameAudio.playBanana();
        window.GameParticles.spawnBananaSparkles(b.x + b.w / 2, b.y + b.h / 2);
        window.GameParticles.spawnPopup(b.x + b.w / 2, b.y - 10, `+${pts}`, '#FFD600');
        if (Math.random() < 0.25) {
          window.GameParticles.spawnPopup(this.player.x + this.player.w / 2, this.player.y - 30, 'Yummy!', '#FFF59D');
        }
      }
    });

    this.stars.forEach(s => {
      s.update();
      if (!s.collected && Physics.checkAABB(this.player, s)) {
        s.collected = true;
        this.levelStars++;
        this.levelScore += 100;
        window.GameAudio.playStar();
        window.GameParticles.spawnStarBurst(s.x + s.w / 2, s.y + s.h / 2);
        window.GameParticles.spawnPopup(s.x + s.w / 2, s.y - 20, '+100 ⭐', '#FFD600');
      }
    });

    this.powerups.forEach(pu => {
      pu.update();
      if (!pu.collected && Physics.checkAABB(this.player, pu)) {
        pu.collected = true;
        window.GameAudio.playPowerup();
        window.GameParticles.spawnStarBurst(pu.x + pu.w / 2, pu.y + pu.h / 2);

        if (pu.type === 'heart') {
          if (this.player.hearts < this.player.maxHearts) this.player.hearts++;
          window.GameParticles.spawnPopup(pu.x + pu.w / 2, pu.y - 15, '+1 HEART ❤️', '#FF1744');
        } else if (pu.type === 'shield') {
          this.player.hasShield = true;
          window.GameParticles.spawnPopup(pu.x + pu.w / 2, pu.y - 15, 'COCONUT SHIELD! 🛡️', '#00E5FF');
        } else if (pu.type === 'speed') {
          this.player.speedTimer = 480; // 8 seconds
          window.GameParticles.spawnPopup(pu.x + pu.w / 2, pu.y - 15, 'SPEED BOOST! ⚡', '#FFD600');
        } else if (pu.type === 'mega') {
          this.player.megaTimer = 600; // 10 seconds
          window.GameParticles.spawnPopup(pu.x + pu.w / 2, pu.y - 15, 'MEGA BANANA! 2X 🍌', '#FF6D00');
        } else if (pu.type === 'star_power') {
          this.player.starPowerTimer = 480; // 8 seconds invincibility
          window.GameParticles.spawnPopup(pu.x + pu.w / 2, pu.y - 15, 'STAR POWER! ⭐', '#E040FB');
        }
      }
    });

    // Update Enemies & Collisions
    this.enemies.forEach(enemy => {
      enemy.update(this.player);
      if (enemy.alive && Physics.checkAABB(this.player, enemy)) {
        // Player stomping enemy from above
        if (this.player.vy > 0 && this.player.y + this.player.h <= enemy.y + enemy.h * 0.65) {
          enemy.stomp();
          this.player.vy = -11; // Bounce off enemy
          this.levelScore += 50;
        } else if (this.player.starPowerTimer > 0) {
          // Invincible star power touches enemy
          enemy.stomp();
          this.levelScore += 50;
        } else {
          // Player hurt by enemy
          const knockbackDir = Math.sign(this.player.x - enemy.x) || 1;
          this.player.takeDamage(knockbackDir);
        }
      }
    });

    // Checkpoint Trigger
    if (this.checkpoint && !this.checkpoint.activated && Physics.checkAABB(this.player, this.checkpoint)) {
      this.checkpoint.activate();
      this.player.setCheckpoint(this.checkpoint.x, this.checkpoint.y);
    }

    // Finish Gate Trigger
    if (this.finishGate && Physics.checkAABB(this.player, this.finishGate)) {
      this.onLevelFinished();
      return;
    }

    // Update Particles
    window.GameParticles.update();

    // Update Camera
    this.camera.update(this.player, this.levelBounds);

    // Update HUD display
    const lvlTitle = window.LevelData[this.currentLevelIndex].title;
    this.ui.updateHUD(this.player, this.levelBananas, this.levelStars, this.levelScore, lvlTitle);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.baseW, this.baseH);

    // 1. Draw Parallax Background
    this.camera.drawParallax(this.ctx, this.levelBounds);

    // Apply Camera Transform for World Objects
    this.ctx.save();
    this.ctx.translate(-Math.floor(this.camera.x), -Math.floor(this.camera.y));

    // 2. Draw Tutorial Signposts
    this.tutorialSigns.forEach(sign => {
      this.ctx.save();
      this.ctx.fillStyle = 'rgba(62, 39, 35, 0.85)';
      this.ctx.strokeStyle = '#FFD54F';
      this.ctx.lineWidth = 3;
      this.ctx.font = 'bold 16px "Comic Sans MS", "Fredoka One", cursive, sans-serif';
      const textW = this.ctx.measureText(sign.text).width;
      this.ctx.beginPath();
      this.ctx.roundRect(sign.x - textW / 2 - 12, sign.y - 24, textW + 24, 32, 8);
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(sign.text, sign.x, sign.y - 2);
      this.ctx.restore();
    });

    // 3. Draw Platforms & Moving Platforms
    this.platforms.forEach(p => p.draw(this.ctx));
    this.movingPlatforms.forEach(mp => mp.draw(this.ctx));

    // 4. Draw Mushrooms
    this.mushrooms.forEach(m => m.draw(this.ctx));

    // 5. Draw Checkpoint & Finish
    if (this.checkpoint) this.checkpoint.draw(this.ctx);
    if (this.finishGate) this.finishGate.draw(this.ctx);

    // 6. Draw Collectibles & Power-ups
    this.bananas.forEach(b => b.draw(this.ctx));
    this.stars.forEach(s => s.draw(this.ctx));
    this.powerups.forEach(pu => pu.draw(this.ctx));

    // 7. Draw Enemies
    this.enemies.forEach(e => e.draw(this.ctx));

    // 8. Draw Player Momo
    if (this.player) this.player.draw(this.ctx);

    // 9. Draw World Particles & Popups
    window.GameParticles.draw(this.ctx);

    this.ctx.restore();

    // 10. Draw Foreground Scenery
    this.camera.drawForeground(this.ctx);
  }

  loop(timestamp) {
    this.update();
    this.draw();
    requestAnimationFrame((t) => this.loop(t));
  }
}

// Instantiate Game Engine once DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.Game = new GameEngine();
  window.Game.start();
});
