/**
 * MONKEY CHASE - 2D Platformer Physics Engine
 * Responsive, forgiving physics with coyote time, jump buffering, and mushroom trampolines.
 */

class Physics {
  static checkAABB(r1, r2) {
    return (
      r1.x < r2.x + r2.w &&
      r1.x + r1.w > r2.x &&
      r1.y < r2.y + r2.h &&
      r1.y + r1.h > r2.y
    );
  }

  static resolvePlatformCollisions(entity, platforms) {
    let wasOnGround = entity.onGround;
    entity.onGround = false;

    for (const plat of platforms) {
      // Bounding box of platform
      const px = plat.x;
      const py = plat.y;
      const pw = plat.w;
      const ph = plat.h;

      // Check if entity overlaps with platform horizontally
      const overlapX = entity.x + entity.w > px && entity.x < px + pw;

      if (overlapX) {
        // Falling down onto top of platform
        if (entity.vy >= 0) {
          const prevBottom = entity.prevY + entity.h;
          // If entity was above or near top in previous frame, and now intersecting or below
          if (prevBottom <= py + 12 && entity.y + entity.h >= py) {
            entity.y = py - entity.h;
            entity.vy = 0;
            entity.onGround = true;

            // If platform is moving, transfer platform deltaX
            if (plat.vx) {
              entity.x += plat.vx;
            }

            // Just landed this frame!
            if (!wasOnGround) {
              entity.onLanded();
            }
            continue;
          }
        }

        // If it's a solid block (not a one-way platform)
        if (plat.isSolid) {
          // Hitting ceiling from below
          if (entity.vy < 0 && entity.prevY >= py + ph - 8 && entity.y < py + ph) {
            entity.y = py + ph;
            entity.vy = 0;
          }
        }
      }

      // Horizontal wall collision for solid blocks
      if (plat.isSolid && entity.y + entity.h > py + 4 && entity.y < py + ph - 4) {
        // Moving right into left wall
        if (entity.vx > 0 && entity.prevX + entity.w <= px + 6 && entity.x + entity.w >= px) {
          entity.x = px - entity.w;
          entity.vx = 0;
        }
        // Moving left into right wall
        else if (entity.vx < 0 && entity.prevX >= px + pw - 6 && entity.x <= px + pw) {
          entity.x = px + pw;
          entity.vx = 0;
        }
      }
    }
  }

  static resolveMushroomBounces(entity, mushrooms) {
    for (const mush of mushrooms) {
      if (Physics.checkAABB(entity, mush)) {
        // Landing on mushroom top
        if (entity.vy > 0 && entity.y + entity.h <= mush.y + mush.h * 0.75) {
          entity.y = mush.y - entity.h;
          entity.vy = -16.5; // High bounce
          entity.canDoubleJump = true;
          entity.isSquashing = true;
          entity.squashY = 1.4;
          entity.squashX = 0.7;
          mush.triggerBounce();
          window.GameAudio.playMushroom();
          window.GameParticles.spawnDust(entity.x + entity.w / 2, entity.y + entity.h);
        }
      }
    }
  }
}

window.Physics = Physics;
