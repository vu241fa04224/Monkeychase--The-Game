/**
 * MONKEY CHASE - Smooth Parallax Camera Engine
 * 4-layer parallax scenery with moving clouds, butterflies, and gentle lookahead.
 */

class Camera {
  constructor(viewportWidth, viewportHeight) {
    this.viewW = viewportWidth;
    this.viewH = viewportHeight;
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.lookahead = 0;

    // Ambient entities in parallax
    this.clouds = [
      { x: 100, y: 80, speed: 0.25, scale: 1.1 },
      { x: 450, y: 140, speed: 0.18, scale: 0.8 },
      { x: 820, y: 60, speed: 0.3, scale: 1.3 },
      { x: 1200, y: 110, speed: 0.22, scale: 0.95 },
      { x: 1650, y: 90, speed: 0.28, scale: 1.2 }
    ];

    this.birds = [
      { x: 200, y: 160, vx: 2.2, flap: 0 },
      { x: 900, y: 120, vx: 1.8, flap: 1.5 }
    ];

    this.butterflies = [
      { x: 300, y: 400, baseTimer: 0 },
      { x: 750, y: 360, baseTimer: 2 }
    ];
  }

  resize(w, h) {
    this.viewW = w;
    this.viewH = h;
  }

  update(player, levelBounds) {
    // Target position centered on player with facing lookahead
    const targetLookahead = player.facing * 70;
    this.lookahead += (targetLookahead - this.lookahead) * 0.05;

    this.targetX = (player.x + player.w / 2) - this.viewW / 2 + this.lookahead;
    this.targetY = (player.y + player.h / 2) - this.viewH / 2 + 30;

    // Smooth Lerp
    this.x += (this.targetX - this.x) * 0.08;
    this.y += (this.targetY - this.y) * 0.06;

    // Clamp camera within level bounds
    const maxX = Math.max(0, levelBounds.width - this.viewW);
    const maxY = Math.max(0, levelBounds.height - this.viewH);

    if (this.x < 0) this.x = 0;
    if (this.x > maxX) this.x = maxX;
    if (this.y < 0) this.y = 0;
    if (this.y > maxY) this.y = maxY;

    // Update ambient clouds
    this.clouds.forEach(c => {
      c.x += c.speed;
      if (c.x > levelBounds.width + 200) {
        c.x = -200;
      }
    });

    // Update ambient birds
    this.birds.forEach(b => {
      b.x += b.vx;
      b.flap += 0.15;
      if (b.x > levelBounds.width + 100) {
        b.x = -150;
      }
    });

    // Update ambient butterflies
    this.butterflies.forEach(bf => {
      bf.baseTimer += 0.05;
    });
  }

  drawParallax(ctx, levelBounds) {
    // 1. Layer 1: Sky (Fixed to screen)
    const skyImg = window.GameSprites.get('bg_sky');
    if (skyImg && skyImg.complete) {
      ctx.drawImage(skyImg, 0, 0, this.viewW, this.viewH);
    } else {
      ctx.fillStyle = '#80D8FF';
      ctx.fillRect(0, 0, this.viewW, this.viewH);
    }

    // Draw ambient clouds (parallax 0.1)
    this.clouds.forEach(c => {
      const screenX = c.x - this.x * 0.1;
      const screenY = c.y - this.y * 0.05;
      if (screenX > -150 && screenX < this.viewW + 150) {
        window.GameSprites.draw(ctx, 'cloud', screenX, screenY, 120 * c.scale, 70 * c.scale, { alpha: 0.88 });
      }
    });

    // Draw ambient birds
    this.birds.forEach(b => {
      const screenX = b.x - this.x * 0.2;
      const screenY = b.y + Math.sin(b.flap) * 12 - this.y * 0.1;
      if (screenX > -100 && screenX < this.viewW + 100) {
        window.GameSprites.draw(ctx, 'bird', screenX, screenY, 52, 34, {
          rotation: Math.sin(b.flap) * 0.15
        });
      }
    });

    // 2. Layer 2: Mountains (Parallax 0.22)
    const mountImg = window.GameSprites.get('bg_mountains');
    if (mountImg && mountImg.complete) {
      const patternW = 1280;
      const offsetX = -(this.x * 0.22) % patternW;
      for (let px = offsetX - patternW; px < this.viewW + patternW; px += patternW) {
        ctx.drawImage(mountImg, px, this.viewH - 520, patternW, 520);
      }
    }

    // 3. Layer 3: Jungle Canopy Trees (Parallax 0.45)
    const treeImg = window.GameSprites.get('bg_trees');
    if (treeImg && treeImg.complete) {
      const patternW = 1280;
      const offsetX = -(this.x * 0.45) % patternW;
      for (let px = offsetX - patternW; px < this.viewW + patternW; px += patternW) {
        ctx.drawImage(treeImg, px, this.viewH - 560, patternW, 560);
      }
    }
  }

  drawForeground(ctx) {
    // Layer 4: Foreground Bushes & Flowers (Parallax 0.85)
    const bushImg = window.GameSprites.get('bg_bushes');
    if (bushImg && bushImg.complete) {
      const patternW = 1280;
      const offsetX = -(this.x * 0.85) % patternW;
      for (let px = offsetX - patternW; px < this.viewW + patternW; px += patternW) {
        ctx.drawImage(bushImg, px, this.viewH - 170, patternW, 170);
      }
    }

    // Draw ambient butterflies
    this.butterflies.forEach(bf => {
      const screenX = bf.x - this.x;
      const screenY = bf.y - this.y + Math.sin(bf.baseTimer * 3) * 16;
      if (screenX > -50 && screenX < this.viewW + 50) {
        window.GameSprites.draw(ctx, 'butterfly', screenX, screenY, 36, 36, {
          rotation: Math.sin(bf.baseTimer * 6) * 0.3
        });
      }
    });
  }
}

window.Camera = Camera;
