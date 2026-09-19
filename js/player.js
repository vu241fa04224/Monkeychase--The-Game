/**
 * MONKEY CHASE - Player Momo Character
 * Playable cartoon monkey with responsive controls, squash & stretch, and power-up states.
 */

class Player {
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.checkpointX = x;
    this.checkpointY = y;

    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.w = 46;
    this.h = 56;

    this.vx = 0;
    this.vy = 0;
    this.facing = 1; // 1 = right, -1 = left
    this.onGround = false;

    // Movement Tuning
    this.baseSpeed = 5.6;
    this.accel = 0.85;
    this.friction = 0.78;
    this.jumpForce = -13.2;
    this.gravity = 0.65;
    this.maxFall = 14;

    // Forgiving Jump Mechanics
    this.coyoteTimer = 0;
    this.jumpBuffer = 0;
    this.canDoubleJump = true;
    this.jumpHoldTimer = 0;

    // Animation & Polish
    this.animState = 'idle'; // 'idle', 'run', 'jump', 'fall', 'hurt', 'celebrate'
    this.animTime = 0;
    this.squashX = 1;
    this.squashY = 1;

    // Health & Invulnerability
    this.maxHearts = 3;
    this.hearts = 3;
    this.invulnerableTimer = 0; // Frames of invulnerability after hit
    this.isDead = false;
    this.deathTimer = 0;

    // Power-ups
    this.hasShield = false;
    this.speedTimer = 0;
    this.megaTimer = 0;
    this.starPowerTimer = 0;
  }

  resetToCheckpoint() {
    this.x = this.checkpointX;
    this.y = this.checkpointY;
    this.prevX = this.x;
    this.prevY = this.y;
    this.vx = 0;
    this.vy = 0;
    this.hearts = this.maxHearts;
    this.isDead = false;
    this.deathTimer = 0;
    this.invulnerableTimer = 60; // 1 sec safe spawn
    this.animState = 'idle';
  }

  setCheckpoint(cpX, cpY) {
    this.checkpointX = cpX;
    this.checkpointY = cpY;
  }

  takeDamage(knockbackDir = 0) {
    if (this.invulnerableTimer > 0 || this.isDead || this.starPowerTimer > 0) return false;

    // Shield absorbs hit
    if (this.hasShield) {
      this.hasShield = false;
      this.invulnerableTimer = 45;
      window.GameAudio.playHurt();
      window.GameParticles.spawnPopup(this.x + this.w / 2, this.y - 20, 'SHIELD BROKE!', '#00E5FF');
      window.GameParticles.spawnStarBurst(this.x + this.w / 2, this.y + this.h / 2);
      return false;
    }

    this.hearts--;
    this.invulnerableTimer = 75; // 1.25 seconds invulnerability
    window.GameAudio.playHurt();
    window.GameParticles.spawnPopup(this.x + this.w / 2, this.y - 20, 'Oops!', '#FF5252');

    // Knockback
    this.vy = -7.5;
    this.vx = knockbackDir !== 0 ? knockbackDir * 5 : -this.facing * 5;
    this.animState = 'hurt';

    if (this.hearts <= 0) {
      this.hearts = 0;
      this.isDead = true;
      this.deathTimer = 60; // Wait 1 sec before respawn
      window.GameAudio.playGameOver();
      window.GameParticles.spawnPopup(this.x + this.w / 2, this.y - 30, 'OH NO!', '#FF1744');
    }

    return true;
  }

  onLanded() {
    this.canDoubleJump = true;
    this.squashX = 1.35;
    this.squashY = 0.65;
    window.GameAudio.playLand();
    window.GameParticles.spawnDust(this.x + this.w / 2, this.y + this.h);
  }

  update(input, levelBounds) {
    this.animTime += 0.16;

    // Recover squash & stretch towards 1
    this.squashX += (1 - this.squashX) * 0.2;
    this.squashY += (1 - this.squashY) * 0.2;

    // Decrement timers
    if (this.invulnerableTimer > 0) this.invulnerableTimer--;
    if (this.speedTimer > 0) this.speedTimer--;
    if (this.megaTimer > 0) this.megaTimer--;
    if (this.starPowerTimer > 0) {
      this.starPowerTimer--;
      // Spawn rainbow sparkle trail
      if (Math.random() < 0.4) {
        window.GameParticles.spawnBananaSparkles(this.x + Math.random() * this.w, this.y + Math.random() * this.h);
      }
    }

    // Death sequence
    if (this.isDead) {
      this.deathTimer--;
      this.vy += this.gravity * 0.8;
      this.y += this.vy;
      if (this.deathTimer <= 0) {
        this.resetToCheckpoint();
      }
      return;
    }

    // Check bottom void fall
    if (this.y > levelBounds.height + 120) {
      this.takeDamage();
      this.resetToCheckpoint();
      return;
    }

    // Cache previous position for physics sweep
    this.prevX = this.x;
    this.prevY = this.y;

    // Calculate maximum speed (boosted by Speed Banana)
    const currentMaxSpeed = this.speedTimer > 0 ? this.baseSpeed * 1.45 : this.baseSpeed;

    // Horizontal Input
    let moveDir = 0;
    if (input.left) moveDir -= 1;
    if (input.right) moveDir += 1;

    if (moveDir !== 0) {
      this.vx += moveDir * this.accel;
      if (Math.abs(this.vx) > currentMaxSpeed) {
        this.vx = Math.sign(this.vx) * currentMaxSpeed;
      }
      this.facing = moveDir;
    } else {
      this.vx *= this.friction;
      if (Math.abs(this.vx) < 0.2) this.vx = 0;
    }

    // Coyote time tracking
    if (this.onGround) {
      this.coyoteTimer = 7; // Frames
    } else if (this.coyoteTimer > 0) {
      this.coyoteTimer--;
    }

    // Jump buffering
    if (input.jumpPressed) {
      this.jumpBuffer = 7;
    } else if (this.jumpBuffer > 0) {
      this.jumpBuffer--;
    }

    // Execute Jump
    if (this.jumpBuffer > 0) {
      if (this.coyoteTimer > 0) {
        // Ground Jump
        this.vy = this.jumpForce;
        this.onGround = false;
        this.coyoteTimer = 0;
        this.jumpBuffer = 0;
        this.squashX = 0.7;
        this.squashY = 1.4;
        this.jumpHoldTimer = 12;
        window.GameAudio.playJump();
        window.GameParticles.spawnDust(this.x + this.w / 2, this.y + this.h);
      } else if (this.canDoubleJump) {
        // Double Jump Somersault
        this.vy = this.jumpForce * 0.95;
        this.canDoubleJump = false;
        this.jumpBuffer = 0;
        this.squashX = 0.65;
        this.squashY = 1.35;
        this.jumpHoldTimer = 10;
        window.GameAudio.playJump();
        window.GameParticles.spawnStarBurst(this.x + this.w / 2, this.y + this.h);
      }
    }

    // Variable jump height: holding jump extends upward impulse slightly
    if (input.jumpHeld && this.jumpHoldTimer > 0 && this.vy < 0) {
      this.vy -= 0.28;
      this.jumpHoldTimer--;
    } else {
      this.jumpHoldTimer = 0;
    }

    // Apply Gravity
    this.vy += this.gravity;
    if (this.vy > this.maxFall) this.vy = this.maxFall;

    // Apply Velocity
    this.x += this.vx;
    this.y += this.vy;

    // Clamp inside left level boundary
    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    }

    // Determine Animation State
    if (this.invulnerableTimer > 45) {
      this.animState = 'hurt';
    } else if (!this.onGround) {
      this.animState = this.vy < -1 ? 'jump' : 'fall';
    } else if (Math.abs(this.vx) > 0.4) {
      this.animState = 'run';
    } else {
      this.animState = 'idle';
    }
  }

  draw(ctx) {
    // Blinking effect during invulnerability
    if (this.invulnerableTimer > 0 && Math.floor(this.invulnerableTimer / 4) % 2 === 0) {
      return;
    }

    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2;

    // Star Power Rainbow Glow
    if (this.starPowerTimer > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 38, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${(this.animTime * 180) % 360}, 100%, 50%, 0.35)`;
      ctx.fill();
      ctx.restore();
    }

    // Coconut Shield Bubble
    if (this.hasShield) {
      window.GameSprites.draw(ctx, 'coconut_shield', centerX, centerY, 70, 70, {
        scaleX: 1 + Math.sin(this.animTime * 4) * 0.08,
        scaleY: 1 + Math.cos(this.animTime * 4) * 0.08,
        alpha: 0.85
      });
    }

    // Speed Trail lines
    if (this.speedTimer > 0 && Math.abs(this.vx) > 1) {
      ctx.save();
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX - this.facing * 20, centerY - 10);
      ctx.lineTo(centerX - this.facing * 40, centerY - 10);
      ctx.moveTo(centerX - this.facing * 25, centerY + 10);
      ctx.lineTo(centerX - this.facing * 45, centerY + 10);
      ctx.stroke();
      ctx.restore();
    }

    // Select SVG frame based on state
    let spriteName = 'momo_idle';
    if (this.animState === 'run') spriteName = 'momo_run';
    else if (this.animState === 'jump') spriteName = 'momo_jump';
    else if (this.animState === 'fall') spriteName = 'momo_jump';
    else if (this.animState === 'hurt') spriteName = 'momo_hurt';
    else if (this.animState === 'celebrate') spriteName = 'momo_celebrate';

    // Apply bounce while running or breathing while idle
    let drawScaleY = this.squashY;
    let drawScaleX = this.squashX;
    let drawRotation = 0;

    if (this.animState === 'run') {
      const bob = Math.abs(Math.sin(this.animTime * 8));
      drawScaleY *= (1 + bob * 0.12);
      drawRotation = this.facing * (Math.sin(this.animTime * 8) * 0.1);
    } else if (this.animState === 'idle') {
      const breath = Math.sin(this.animTime * 3) * 0.04;
      drawScaleY *= (1 + breath);
      drawScaleX *= (1 - breath * 0.5);
    }

    window.GameSprites.draw(ctx, spriteName, centerX, centerY, 68, 68, {
      flipX: this.facing === -1,
      scaleX: drawScaleX,
      scaleY: drawScaleY,
      rotation: drawRotation
    });
  }
}

window.Player = Player;
