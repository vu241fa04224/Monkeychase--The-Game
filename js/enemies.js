/**
 * MONKEY CHASE - Cute Cartoon Enemies
 * Friendly animal hazards: Sleepy Snake, Funny Boar, Mischievous Parrot, and Jumping Frog.
 */

class Enemy {
  constructor(x, y, w, h, type) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.vx = 0;
    this.vy = 0;
    this.facing = 1;
    this.alive = true;
    this.animTime = Math.random() * 10;
  }

  stomp() {
    this.alive = false;
    window.GameAudio.playBanana(); // Happy pop
    window.GameParticles.spawnStarBurst(this.x + this.w / 2, this.y + this.h / 2);
    window.GameParticles.spawnPopup(this.x + this.w / 2, this.y - 15, 'POOF!', '#76FF03');
  }
}

// 1. Sleepy Snake - Patrolling smoothly back and forth
class SleepySnake extends Enemy {
  constructor(x, y, patrolDistance = 120) {
    super(x, y, 52, 34, 'snake');
    this.patrolDist = patrolDistance;
    this.speed = 1.2;
    this.vx = this.speed;
  }

  update(player) {
    if (!this.alive) return;
    this.animTime += 0.08;
    this.x += this.vx;

    // Turn around at patrol limits
    if (this.x > this.startX + this.patrolDist) {
      this.vx = -this.speed;
      this.facing = -1;
    } else if (this.x < this.startX - this.patrolDist) {
      this.vx = this.speed;
      this.facing = 1;
    }
  }

  draw(ctx) {
    if (!this.alive) return;
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2;
    const wobble = Math.sin(this.animTime * 3) * 0.08;

    window.GameSprites.draw(ctx, 'enemy_snake', centerX, centerY, 62, 42, {
      flipX: this.facing === -1,
      scaleY: 1 + wobble,
      scaleX: 1 - wobble * 0.5
    });
  }
}

// 2. Funny Wild Boar - Runs slowly toward Momo when close
class FunnyBoar extends Enemy {
  constructor(x, y, patrolDistance = 160) {
    super(x, y, 60, 48, 'boar');
    this.patrolDist = patrolDistance;
    this.normalSpeed = 1.4;
    this.chargeSpeed = 2.4;
    this.vx = this.normalSpeed;
    this.isCharging = false;
  }

  update(player) {
    if (!this.alive) return;
    this.animTime += 0.12;

    const distToPlayer = Math.hypot(player.x - this.x, player.y - this.y);
    // Boar charges gently if player is within 250px and same elevation
    if (distToPlayer < 260 && Math.abs(player.y - this.y) < 80) {
      this.isCharging = true;
      const dir = Math.sign(player.x - this.x);
      this.vx = dir * this.chargeSpeed;
      this.facing = dir;
    } else {
      this.isCharging = false;
      this.x += this.vx;
      if (this.x > this.startX + this.patrolDist) {
        this.vx = -this.normalSpeed;
        this.facing = -1;
      } else if (this.x < this.startX - this.patrolDist) {
        this.vx = this.normalSpeed;
        this.facing = 1;
      }
    }

    if (this.isCharging) {
      this.x += this.vx;
    }
  }

  draw(ctx) {
    if (!this.alive) return;
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2;
    const bounce = Math.abs(Math.sin(this.animTime * 6)) * 0.15;

    window.GameSprites.draw(ctx, 'enemy_boar', centerX, centerY, 68, 56, {
      flipX: this.facing === 1,
      scaleY: 1 + bounce,
      scaleX: 1 - bounce * 0.5
    });
  }
}

// 3. Mischievous Parrot - Flying in a gentle wave
class MischievousParrot extends Enemy {
  constructor(x, y, distance = 180) {
    super(x, y, 48, 44, 'parrot');
    this.flyDist = distance;
    this.speed = 1.8;
    this.vx = this.speed;
  }

  update(player) {
    if (!this.alive) return;
    this.animTime += 0.1;
    this.x += this.vx;
    // Gentle sine wave altitude
    this.y = this.startY + Math.sin(this.animTime * 2.5) * 22;

    if (this.x > this.startX + this.flyDist) {
      this.vx = -this.speed;
      this.facing = -1;
    } else if (this.x < this.startX - this.flyDist) {
      this.vx = this.speed;
      this.facing = 1;
    }
  }

  draw(ctx) {
    if (!this.alive) return;
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2;
    const wingFlap = Math.sin(this.animTime * 8) * 0.18;

    window.GameSprites.draw(ctx, 'enemy_parrot', centerX, centerY, 56, 52, {
      flipX: this.facing === -1,
      rotation: wingFlap * 0.5,
      scaleY: 1 + wingFlap
    });
  }
}

// 4. Jumping Frog - Jumps periodically
class JumpingFrog extends Enemy {
  constructor(x, y) {
    super(x, y, 48, 42, 'frog');
    this.jumpTimer = 0;
    this.jumpInterval = 110; // ~1.8 seconds
    this.gravity = 0.55;
    this.onGround = true;
  }

  update(player) {
    if (!this.alive) return;
    this.animTime += 0.08;
    this.jumpTimer++;

    if (this.jumpTimer >= this.jumpInterval && this.onGround) {
      this.vy = -10.5;
      const dirToPlayer = Math.sign(player.x - this.x);
      this.vx = dirToPlayer * 2.2;
      this.facing = dirToPlayer || 1;
      this.onGround = false;
      this.jumpTimer = 0;
    }

    if (!this.onGround) {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;

      if (this.y >= this.startY) {
        this.y = this.startY;
        this.vy = 0;
        this.vx = 0;
        this.onGround = true;
      }
    }
  }

  draw(ctx) {
    if (!this.alive) return;
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2;
    let scaleX = 1;
    let scaleY = 1;

    if (!this.onGround) {
      scaleY = 1.25;
      scaleX = 0.85;
    } else {
      const breath = Math.sin(this.animTime * 4) * 0.08;
      scaleY = 1 + breath;
      scaleX = 1 - breath;
    }

    window.GameSprites.draw(ctx, 'enemy_frog', centerX, centerY, 56, 52, {
      flipX: this.facing === -1,
      scaleX,
      scaleY
    });
  }
}

window.SleepySnake = SleepySnake;
window.FunnyBoar = FunnyBoar;
window.MischievousParrot = MischievousParrot;
window.JumpingFrog = JumpingFrog;
