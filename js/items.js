/**
 * MONKEY CHASE - Collectibles, Power-Ups, and Level Objects
 * Bananas, Hidden Stars, Power-Ups, Checkpoints, and Finish Gate.
 */

// 1. Banana Collectible
class Banana {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 32;
    this.h = 32;
    this.collected = false;
    this.animTime = Math.random() * 10;
  }

  update() {
    this.animTime += 0.08;
  }

  draw(ctx) {
    if (this.collected) return;
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2 + Math.sin(this.animTime * 3) * 4;
    const spin = Math.cos(this.animTime * 2) * 0.15;

    window.GameSprites.draw(ctx, 'banana', centerX, centerY, 38, 38, {
      scaleX: 1 + spin,
      scaleY: 1 - spin
    });
  }
}

// 2. Hidden Star (3 per level)
class Star {
  constructor(x, y, starId = 1) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;
    this.starId = starId; // 1 = easy, 2 = medium, 3 = secret
    this.collected = false;
    this.animTime = Math.random() * 10;
  }

  update() {
    this.animTime += 0.08;
  }

  draw(ctx) {
    if (this.collected) return;
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2 + Math.sin(this.animTime * 2.5) * 6;
    const rot = Math.sin(this.animTime * 2) * 0.12;

    window.GameSprites.draw(ctx, 'star', centerX, centerY, 46, 46, {
      rotation: rot,
      scaleX: 1 + Math.sin(this.animTime * 4) * 0.08,
      scaleY: 1 + Math.sin(this.animTime * 4) * 0.08
    });
  }
}

// 3. Power-Up
class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.w = 36;
    this.h = 36;
    this.type = type; // 'mega', 'shield', 'speed', 'heart', 'star_power'
    this.collected = false;
    this.animTime = Math.random() * 10;
  }

  update() {
    this.animTime += 0.08;
  }

  draw(ctx) {
    if (this.collected) return;
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2 + Math.sin(this.animTime * 3) * 5;

    let spriteName = 'heart';
    if (this.type === 'mega') spriteName = 'mega_banana';
    else if (this.type === 'shield') spriteName = 'coconut_shield';
    else if (this.type === 'speed') spriteName = 'speed_banana';
    else if (this.type === 'star_power') spriteName = 'star';

    window.GameSprites.draw(ctx, spriteName, centerX, centerY, 44, 44, {
      scaleX: 1 + Math.sin(this.animTime * 4) * 0.1,
      scaleY: 1 + Math.sin(this.animTime * 4) * 0.1
    });
  }
}

// 4. Checkpoint Totem
class Checkpoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 48;
    this.h = 80;
    this.activated = false;
    this.animTime = 0;
  }

  activate() {
    if (!this.activated) {
      this.activated = true;
      window.GameAudio.playCheckpoint();
      window.GameParticles.spawnStarBurst(this.x + this.w / 2, this.y + 20);
      window.GameParticles.spawnPopup(this.x + this.w / 2, this.y - 25, 'CHECKPOINT!', '#00E676');
    }
  }

  draw(ctx) {
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2;
    const spriteName = this.activated ? 'checkpoint_on' : 'checkpoint_off';

    window.GameSprites.draw(ctx, spriteName, centerX, centerY, 56, 88);
  }
}

// 5. Finish Altar / Gate
class FinishGate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 90;
    this.h = 120;
    this.animTime = 0;
  }

  update() {
    this.animTime += 0.05;
  }

  draw(ctx) {
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2;
    window.GameSprites.draw(ctx, 'finish_gate', centerX, centerY, 100, 126);
  }
}

// 6. Bounce Mushroom
class BounceMushroom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 54;
    this.h = 50;
    this.squash = 1;
  }

  triggerBounce() {
    this.squash = 0.5; // squash down then bounce back
  }

  update() {
    this.squash += (1 - this.squash) * 0.15;
  }

  draw(ctx) {
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2;
    window.GameSprites.draw(ctx, 'mushroom', centerX, centerY, 58, 54, {
      scaleY: this.squash,
      scaleX: 1 + (1 - this.squash) * 0.6
    });
  }
}

// 7. Moving Platform
class MovingPlatform {
  constructor(x, y, w, h, distanceX, distanceY, speed = 1.2, style = 'platform_wood') {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.distX = distanceX;
    this.distY = distanceY;
    this.speed = speed;
    this.vx = 0;
    this.vy = 0;
    this.progress = 0;
    this.style = style; // 'platform_wood', 'platform_grass', 'platform_stone'
    this.isSolid = false; // One-way pass-through from below
  }

  update() {
    this.progress += 0.02 * this.speed;
    const nextX = this.startX + Math.sin(this.progress) * this.distX;
    const nextY = this.startY + Math.sin(this.progress) * this.distY;

    this.vx = nextX - this.x;
    this.vy = nextY - this.y;

    this.x = nextX;
    this.y = nextY;
  }

  draw(ctx) {
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2;
    window.GameSprites.draw(ctx, this.style, centerX, centerY, this.w, this.h);
  }
}

// 8. Static Platform
class Platform {
  constructor(x, y, w, h, style = 'platform_grass', isSolid = true) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.style = style;
    this.isSolid = isSolid;
  }

  draw(ctx) {
    // Draw segmented platform tiles
    const tileW = 64;
    const count = Math.ceil(this.w / tileW);
    for (let i = 0; i < count; i++) {
      const curX = this.x + i * tileW + tileW / 2;
      const curW = Math.min(tileW, this.x + this.w - (this.x + i * tileW));
      window.GameSprites.draw(ctx, this.style, curX, this.y + this.h / 2, curW + 2, this.h);
    }
  }
}

window.Banana = Banana;
window.Star = Star;
window.PowerUp = PowerUp;
window.Checkpoint = Checkpoint;
window.FinishGate = FinishGate;
window.BounceMushroom = BounceMushroom;
window.MovingPlatform = MovingPlatform;
window.Platform = Platform;
