/**
 * MONKEY CHASE - Sprite & Graphic Asset Manager
 * Preloads and renders cartoon SVGs with squash & stretch, rotation, and particle effects.
 */

class SpriteManager {
  constructor() {
    this.images = {};
    this.loaded = false;
    this.total = 0;
    this.loadedCount = 0;
  }

  init(onComplete) {
    const assetList = [
      'momo_idle', 'momo_run', 'momo_jump', 'momo_hurt', 'momo_celebrate',
      'enemy_snake', 'enemy_boar', 'enemy_parrot', 'enemy_frog',
      'banana', 'star', 'mega_banana', 'coconut_shield', 'speed_banana', 'heart',
      'checkpoint_off', 'checkpoint_on', 'finish_gate', 'mushroom',
      'platform_grass', 'platform_wood', 'platform_stone', 'logo',
      'bg_sky', 'bg_mountains', 'bg_trees', 'bg_bushes',
      'cloud', 'butterfly', 'bird', 'vine'
    ];

    this.total = assetList.length;

    assetList.forEach(name => {
      const img = new Image();
      img.src = `assets/images/${name}.svg`;
      img.onload = () => {
        this.images[name] = img;
        this.loadedCount++;
        if (this.loadedCount === this.total) {
          this.loaded = true;
          if (onComplete) onComplete();
        }
      };
      img.onerror = () => {
        console.warn(`Failed to load SVG: ${name}.svg, using procedural fallback.`);
        this.loadedCount++;
        if (this.loadedCount === this.total) {
          this.loaded = true;
          if (onComplete) onComplete();
        }
      };
    });
  }

  get(name) {
    return this.images[name] || null;
  }

  /**
   * Draw sprite with center anchor, optional flip, rotation, scale, squash & stretch
   */
  draw(ctx, name, x, y, width, height, options = {}) {
    const img = this.get(name);
    const flipX = options.flipX || false;
    const flipY = options.flipY || false;
    const rotation = options.rotation || 0;
    const scaleX = (options.scaleX !== undefined) ? options.scaleX : 1;
    const scaleY = (options.scaleY !== undefined) ? options.scaleY : 1;
    const alpha = (options.alpha !== undefined) ? options.alpha : 1;

    ctx.save();
    ctx.translate(x, y);

    if (rotation !== 0) {
      ctx.rotate(rotation);
    }

    ctx.scale(flipX ? -scaleX : scaleX, flipY ? -scaleY : scaleY);

    if (alpha !== 1) {
      ctx.globalAlpha = alpha;
    }

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, -width / 2, -height / 2, width, height);
    } else {
      // Clean fallback if image not ready
      ctx.fillStyle = '#FFA000';
      ctx.beginPath();
      ctx.roundRect(-width / 2, -height / 2, width, height, 8);
      ctx.fill();
    }

    ctx.restore();
  }
}

window.GameSprites = new SpriteManager();
