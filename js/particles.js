/**
 * MONKEY CHASE - Particle Systems
 * Lightweight, colorful, child-friendly particles for sparkles, dust, and victory confetti.
 */

class Particle {
  constructor(x, y, vx, vy, color, size, life, shape = 'circle') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.maxLife = life;
    this.life = life;
    this.shape = shape; // 'circle', 'star', 'confetti'
    this.angle = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.2;
    this.gravity = 0.15;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.angle += this.rotSpeed;
    this.life--;
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;

    if (this.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.shape === 'confetti') {
      ctx.fillRect(-this.size, -this.size * 0.5, this.size * 2, this.size);
    } else if (this.shape === 'star') {
      // 4-pointed sparkle
      const s = this.size;
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.5);
      ctx.lineTo(s * 0.4, -s * 0.4);
      ctx.lineTo(s * 1.5, 0);
      ctx.lineTo(s * 0.4, s * 0.4);
      ctx.lineTo(0, s * 1.5);
      ctx.lineTo(-s * 0.4, s * 0.4);
      ctx.lineTo(-s * 1.5, 0);
      ctx.lineTo(-s * 0.4, -s * 0.4);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }
}

class ParticleManager {
  constructor() {
    this.particles = [];
    this.popups = [];
  }

  reset() {
    this.particles = [];
    this.popups = [];
  }

  // Banana Sparkle
  spawnBananaSparkles(x, y) {
    const colors = ['#FFEB3B', '#FFD600', '#FFF59D', '#FF9800'];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const speed = 1.5 + Math.random() * 2.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 1.2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const p = new Particle(x, y, vx, vy, color, 3.5, 25, 'star');
      p.gravity = 0.05;
      this.particles.push(p);
    }
  }

  // Star Collect Burst
  spawnStarBurst(x, y) {
    const colors = ['#FFD600', '#FF4081', '#00E5FF', '#76FF03', '#FFFFFF'];
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const speed = 2.5 + Math.random() * 3.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const p = new Particle(x, y, vx, vy, color, 4.5, 36, 'star');
      p.gravity = 0.08;
      this.particles.push(p);
    }
  }

  // Landing / Jump Dust
  spawnDust(x, y) {
    for (let i = 0; i < 6; i++) {
      const vx = (Math.random() - 0.5) * 2.5;
      const vy = -0.5 - Math.random() * 1.5;
      const p = new Particle(x + (Math.random() - 0.5) * 16, y, vx, vy, '#D7CCC8', 4 + Math.random() * 3, 18, 'circle');
      p.gravity = 0.08;
      this.particles.push(p);
    }
  }

  // Confetti celebration (Level complete / Victory)
  spawnConfetti(x, y, count = 50) {
    const colors = ['#FF1744', '#FFEA00', '#00E676', '#2979FF', '#E040FB', '#FF9100'];
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() - 0.5) * 9;
      const vy = -4 - Math.random() * 7;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const p = new Particle(x + (Math.random() - 0.5) * 60, y, vx, vy, color, 5 + Math.random() * 4, 70, 'confetti');
      p.gravity = 0.18;
      this.particles.push(p);
    }
  }

  // Floating text popup (+10, Yummy!, Great Job!)
  spawnPopup(x, y, text, color = '#FFD600') {
    this.popups.push({
      x,
      y,
      vy: -1.2,
      text,
      color,
      life: 40,
      maxLife: 40
    });
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    for (let i = this.popups.length - 1; i >= 0; i--) {
      const pop = this.popups[i];
      pop.y += pop.vy;
      pop.life--;
      if (pop.life <= 0) {
        this.popups.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    this.particles.forEach(p => p.draw(ctx));

    // Draw Popups
    this.popups.forEach(pop => {
      const alpha = Math.max(0, pop.life / pop.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = 'bold 22px "Comic Sans MS", "Fredoka One", cursive, sans-serif';
      ctx.textAlign = 'center';

      // Text stroke outline
      ctx.strokeStyle = '#3E2723';
      ctx.lineWidth = 4;
      ctx.strokeText(pop.text, pop.x, pop.y);

      ctx.fillStyle = pop.color;
      ctx.fillText(pop.text, pop.x, pop.y);
      ctx.restore();
    });
  }
}

window.GameParticles = new ParticleManager();
