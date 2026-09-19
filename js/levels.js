/**
 * MONKEY CHASE - 5 Handcrafted Progressive Levels
 * Complete level definitions with platforms, banana trails, 3 hidden stars, enemies, power-ups, checkpoints, and finish gates.
 */

const LevelData = [
  // ==========================================
  // LEVEL 1: SUNNY JUNGLE (Very Easy / Tutorial)
  // ==========================================
  {
    levelNum: 1,
    title: "Sunny Jungle",
    subtitle: "Level 1 • Learn to Run & Jump!",
    theme: "grass",
    width: 2600,
    height: 720,
    playerSpawn: { x: 100, y: 480 },
    tutorialTexts: [
      { x: 120, y: 430, text: "USE ◀ ▶ OR TOUCH TO MOVE" },
      { x: 480, y: 410, text: "PRESS ⬆ OR SPACE TO JUMP" },
      { x: 860, y: 380, text: "COLLECT 🍌 BANANAS FOR POINTS!" },
      { x: 1380, y: 380, text: "BOUNCE ON MUSHROOMS FOR BIG HOPS!" },
      { x: 1780, y: 410, text: "TOUCH 🏁 CHECKPOINTS TO SAVE!" },
      { x: 2360, y: 410, text: "REACH THE 🚪 FINISH TO WIN!" }
    ],
    platforms: [
      // Ground Sections
      { x: 0, y: 560, w: 900, h: 160, style: 'platform_grass', isSolid: true },
      { x: 980, y: 560, w: 750, h: 160, style: 'platform_grass', isSolid: true },
      { x: 1810, y: 560, w: 800, h: 160, style: 'platform_grass', isSolid: true },
      // Stepping Platforms
      { x: 380, y: 460, w: 140, h: 32, style: 'platform_wood', isSolid: false },
      { x: 580, y: 400, w: 140, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1150, y: 440, w: 160, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1420, y: 340, w: 180, h: 32, style: 'platform_wood', isSolid: false },
      { x: 2050, y: 450, w: 140, h: 32, style: 'platform_wood', isSolid: false }
    ],
    movingPlatforms: [],
    mushrooms: [
      { x: 1350, y: 512 }
    ],
    bananas: [
      // Easy arc over first jump
      { x: 260, y: 500 }, { x: 300, y: 460 }, { x: 340, y: 500 },
      // Bananas on wooden platform
      { x: 400, y: 410 }, { x: 440, y: 410 }, { x: 480, y: 410 },
      { x: 600, y: 350 }, { x: 640, y: 350 }, { x: 680, y: 350 },
      // Arc over pit
      { x: 910, y: 480 }, { x: 940, y: 450 }, { x: 970, y: 480 },
      // Jump trail
      { x: 1170, y: 390 }, { x: 1210, y: 390 }, { x: 1250, y: 390 },
      // High Mushroom arc
      { x: 1360, y: 380 }, { x: 1370, y: 300 }, { x: 1450, y: 280 }, { x: 1530, y: 280 },
      // Straight line to checkpoint
      { x: 1650, y: 510 }, { x: 1690, y: 510 }, { x: 1730, y: 510 },
      // Finish line bananas
      { x: 2150, y: 510 }, { x: 2200, y: 510 }, { x: 2250, y: 510 }
    ],
    stars: [
      { x: 640, y: 280, starId: 1 },  // Easy: atop first high wooden ledge
      { x: 1460, y: 220, starId: 2 }, // Medium: launched from mushroom
      { x: 2100, y: 380, starId: 3 }  // Secret: secret ledge before finish
    ],
    powerups: [
      { x: 1210, y: 510, type: 'heart' }
    ],
    enemies: [
      { type: 'snake', x: 1100, y: 526, patrol: 90 }
    ],
    checkpoint: { x: 1850, y: 472 },
    finish: { x: 2420, y: 435 }
  },

  // ==========================================
  // LEVEL 2: WATERFALL WOODS (Moving Platforms & Parrots)
  // ==========================================
  {
    levelNum: 2,
    title: "Waterfall Woods",
    subtitle: "Level 2 • Water Gaps & Fluttering Parrots!",
    theme: "waterfall",
    width: 2900,
    height: 720,
    playerSpawn: { x: 100, y: 480 },
    tutorialTexts: [
      { x: 150, y: 430, text: "WATCH OUT FOR WATER GAPS!" },
      { x: 780, y: 360, text: "RIDE THE MOVING PLATFORM!" },
      { x: 1420, y: 360, text: "DUCK OR JUMP OVER PARROTS!" }
    ],
    platforms: [
      { x: 0, y: 560, w: 600, h: 160, style: 'platform_grass', isSolid: true },
      { x: 1050, y: 560, w: 450, h: 160, style: 'platform_grass', isSolid: true },
      { x: 1750, y: 560, w: 400, h: 160, style: 'platform_grass', isSolid: true },
      { x: 2350, y: 560, w: 550, h: 160, style: 'platform_grass', isSolid: true },
      // Elevated wood walkways
      { x: 420, y: 440, w: 160, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1220, y: 430, w: 160, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1520, y: 400, w: 140, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1950, y: 440, w: 140, h: 32, style: 'platform_wood', isSolid: false },
      { x: 2150, y: 370, w: 140, h: 32, style: 'platform_wood', isSolid: false }
    ],
    movingPlatforms: [
      { x: 670, y: 500, w: 140, h: 30, distX: 160, distY: 0, speed: 1.1, style: 'platform_wood' },
      { x: 1560, y: 490, w: 130, h: 30, distX: 120, distY: 0, speed: 1.3, style: 'platform_wood' },
      { x: 2180, y: 480, w: 130, h: 30, distX: 0, distY: 80, speed: 1.2, style: 'platform_wood' }
    ],
    mushrooms: [
      { x: 1100, y: 512 }
    ],
    bananas: [
      { x: 200, y: 510 }, { x: 240, y: 510 }, { x: 280, y: 510 },
      { x: 440, y: 390 }, { x: 480, y: 390 }, { x: 520, y: 390 },
      // Arc on moving platform 1
      { x: 720, y: 440 }, { x: 770, y: 420 }, { x: 820, y: 440 },
      { x: 1110, y: 390 }, { x: 1120, y: 300 }, { x: 1180, y: 260 },
      { x: 1240, y: 380 }, { x: 1280, y: 380 },
      { x: 1540, y: 350 }, { x: 1580, y: 350 },
      // High trail near finish
      { x: 1970, y: 390 }, { x: 2010, y: 390 },
      { x: 2170, y: 320 }, { x: 2210, y: 320 },
      { x: 2450, y: 510 }, { x: 2500, y: 510 }, { x: 2550, y: 510 }
    ],
    stars: [
      { x: 800, y: 350, starId: 1 },  // Easy: over first moving platform
      { x: 1180, y: 190, starId: 2 }, // Medium: sky high bounce star
      { x: 2210, y: 250, starId: 3 }  // Secret: above vertical moving platform
    ],
    powerups: [
      { x: 1320, y: 510, type: 'shield' } // Coconut Shield
    ],
    enemies: [
      { type: 'snake', x: 380, y: 526, patrol: 80 },
      { type: 'parrot', x: 1380, y: 360, dist: 140 },
      { type: 'parrot', x: 2050, y: 320, dist: 120 }
    ],
    checkpoint: { x: 1780, y: 472 },
    finish: { x: 2750, y: 435 }
  },

  // ==========================================
  // LEVEL 3: MONKEY MOUNTAIN (Vertical Platforming & Boars)
  // ==========================================
  {
    levelNum: 3,
    title: "Monkey Mountain",
    subtitle: "Level 3 • High Cliffs & Speed Power!",
    theme: "mountain",
    width: 3100,
    height: 720,
    playerSpawn: { x: 100, y: 480 },
    tutorialTexts: [
      { x: 200, y: 430, text: "WATCH OUT! A WILD BOAR!" },
      { x: 850, y: 340, text: "GRAB THE ⚡ SPEED BANANA!" },
      { x: 1500, y: 260, text: "CLIMB THE MOUNTAIN LEDGES!" }
    ],
    platforms: [
      { x: 0, y: 560, w: 700, h: 160, style: 'platform_grass', isSolid: true },
      { x: 800, y: 560, w: 650, h: 160, style: 'platform_grass', isSolid: true },
      { x: 1600, y: 560, w: 600, h: 160, style: 'platform_grass', isSolid: true },
      { x: 2400, y: 560, w: 700, h: 160, style: 'platform_grass', isSolid: true },
      // Mountain cliffs
      { x: 450, y: 450, w: 140, h: 32, style: 'platform_wood', isSolid: false },
      { x: 950, y: 430, w: 150, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1150, y: 360, w: 150, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1350, y: 280, w: 160, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1750, y: 420, w: 160, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1950, y: 330, w: 160, h: 32, style: 'platform_wood', isSolid: false },
      { x: 2150, y: 250, w: 160, h: 32, style: 'platform_wood', isSolid: false }
    ],
    movingPlatforms: [
      { x: 1500, y: 450, w: 130, h: 30, distX: 100, distY: 0, speed: 1.4, style: 'platform_wood' },
      { x: 2260, y: 360, w: 130, h: 30, distX: 0, distY: 90, speed: 1.3, style: 'platform_wood' }
    ],
    mushrooms: [
      { x: 620, y: 512 },
      { x: 1650, y: 512 }
    ],
    bananas: [
      { x: 180, y: 510 }, { x: 220, y: 510 }, { x: 260, y: 510 },
      { x: 470, y: 400 }, { x: 510, y: 400 },
      { x: 840, y: 510 }, { x: 880, y: 510 }, { x: 920, y: 510 },
      { x: 970, y: 380 }, { x: 1010, y: 380 },
      { x: 1170, y: 310 }, { x: 1210, y: 310 },
      { x: 1370, y: 230 }, { x: 1410, y: 230 }, { x: 1450, y: 230 },
      { x: 1770, y: 370 }, { x: 1810, y: 370 },
      { x: 1970, y: 280 }, { x: 2010, y: 280 },
      { x: 2500, y: 510 }, { x: 2550, y: 510 }, { x: 2600, y: 510 }
    ],
    stars: [
      { x: 510, y: 320, starId: 1 },  // Easy: over first cliff
      { x: 1410, y: 150, starId: 2 }, // Medium: apex of mountain climb
      { x: 2190, y: 170, starId: 3 }  // Secret: high ledge above vertical platform
    ],
    powerups: [
      { x: 860, y: 370, type: 'speed' }, // Speed Banana
      { x: 1800, y: 510, type: 'heart' }
    ],
    enemies: [
      { type: 'boar', x: 400, y: 514, patrol: 130 },
      { type: 'snake', x: 1120, y: 526, patrol: 90 },
      { type: 'boar', x: 1900, y: 514, patrol: 120 }
    ],
    checkpoint: { x: 1680, y: 472 },
    finish: { x: 2850, y: 435 }
  },

  // ==========================================
  // LEVEL 4: MYSTERY JUNGLE (Jumping Frogs & Secret Paths)
  // ==========================================
  {
    levelNum: 4,
    title: "Mystery Jungle",
    subtitle: "Level 4 • Secret Trails & Hopping Frogs!",
    theme: "mystery",
    width: 3200,
    height: 720,
    playerSpawn: { x: 100, y: 480 },
    tutorialTexts: [
      { x: 200, y: 430, text: "TIMING IS KEY WITH FROGS!" },
      { x: 950, y: 330, text: "EXPLORE SECRET HIGH & LOW PATHS!" },
      { x: 1750, y: 380, text: "A HIDDEN STAR IS NEARBY..." }
    ],
    platforms: [
      { x: 0, y: 560, w: 750, h: 160, style: 'platform_grass', isSolid: true },
      { x: 900, y: 560, w: 700, h: 160, style: 'platform_grass', isSolid: true },
      { x: 1750, y: 560, w: 650, h: 160, style: 'platform_grass', isSolid: true },
      { x: 2500, y: 560, w: 700, h: 160, style: 'platform_grass', isSolid: true },
      // Tree house walkways
      { x: 380, y: 430, w: 160, h: 32, style: 'platform_wood', isSolid: false },
      { x: 600, y: 340, w: 160, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1050, y: 420, w: 150, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1250, y: 330, w: 160, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1450, y: 250, w: 160, h: 32, style: 'platform_wood', isSolid: false },
      { x: 1850, y: 440, w: 150, h: 32, style: 'platform_wood', isSolid: false },
      { x: 2050, y: 350, w: 150, h: 32, style: 'platform_wood', isSolid: false },
      { x: 2250, y: 270, w: 160, h: 32, style: 'platform_wood', isSolid: false }
    ],
    movingPlatforms: [
      { x: 760, y: 480, w: 130, h: 30, distX: 100, distY: 0, speed: 1.3, style: 'platform_wood' },
      { x: 1610, y: 460, w: 130, h: 30, distX: 80, distY: 60, speed: 1.2, style: 'platform_wood' }
    ],
    mushrooms: [
      { x: 500, y: 512 },
      { x: 1400, y: 512 }
    ],
    bananas: [
      { x: 180, y: 510 }, { x: 220, y: 510 }, { x: 260, y: 510 },
      { x: 400, y: 380 }, { x: 440, y: 380 },
      { x: 620, y: 290 }, { x: 660, y: 290 },
      { x: 940, y: 510 }, { x: 980, y: 510 },
      { x: 1070, y: 370 }, { x: 1110, y: 370 },
      { x: 1270, y: 280 }, { x: 1310, y: 280 },
      { x: 1870, y: 390 }, { x: 1910, y: 390 },
      { x: 2070, y: 300 }, { x: 2110, y: 300 },
      { x: 2600, y: 510 }, { x: 2650, y: 510 }, { x: 2700, y: 510 }
    ],
    stars: [
      { x: 660, y: 230, starId: 1 },  // Easy: tree top
      { x: 1490, y: 170, starId: 2 }, // Medium: high canopy leap
      { x: 2310, y: 190, starId: 3 }  // Secret: end of top secret path
    ],
    powerups: [
      { x: 1080, y: 510, type: 'shield' },
      { x: 1920, y: 510, type: 'star_power' } // Star Power invincibility!
    ],
    enemies: [
      { type: 'frog', x: 380, y: 520 },
      { type: 'snake', x: 1150, y: 526, patrol: 90 },
      { type: 'parrot', x: 1350, y: 220, dist: 100 },
      { type: 'frog', x: 2100, y: 520 }
    ],
    checkpoint: { x: 1800, y: 472 },
    finish: { x: 2950, y: 435 }
  },

  // ==========================================
  // LEVEL 5: GOLDEN BANANA TEMPLE (Grand Finale!)
  // ==========================================
  {
    levelNum: 5,
    title: "Golden Banana Temple",
    subtitle: "Level 5 • Ancient Ruins & The Grand Prize!",
    theme: "temple",
    width: 3500,
    height: 720,
    playerSpawn: { x: 100, y: 480 },
    tutorialTexts: [
      { x: 220, y: 430, text: "THE SACRED TEMPLE OF BANANAS!" },
      { x: 920, y: 360, text: "GRAB THE 🍌 MEGA BANANA FOR 2X POINTS!" },
      { x: 2200, y: 360, text: "FINAL STRETCH! CLAIM THE GOLDEN BANANA!" }
    ],
    platforms: [
      { x: 0, y: 560, w: 750, h: 160, style: 'platform_stone', isSolid: true },
      { x: 900, y: 560, w: 750, h: 160, style: 'platform_stone', isSolid: true },
      { x: 1800, y: 560, w: 750, h: 160, style: 'platform_stone', isSolid: true },
      { x: 2700, y: 560, w: 800, h: 160, style: 'platform_stone', isSolid: true },
      // Temple Pillars & Carved Steps
      { x: 350, y: 450, w: 150, h: 36, style: 'platform_stone', isSolid: false },
      { x: 550, y: 360, w: 150, h: 36, style: 'platform_stone', isSolid: false },
      { x: 1050, y: 440, w: 160, h: 36, style: 'platform_stone', isSolid: false },
      { x: 1250, y: 350, w: 160, h: 36, style: 'platform_stone', isSolid: false },
      { x: 1450, y: 260, w: 160, h: 36, style: 'platform_stone', isSolid: false },
      { x: 1950, y: 430, w: 160, h: 36, style: 'platform_stone', isSolid: false },
      { x: 2150, y: 330, w: 160, h: 36, style: 'platform_stone', isSolid: false },
      { x: 2350, y: 240, w: 180, h: 36, style: 'platform_stone', isSolid: false }
    ],
    movingPlatforms: [
      { x: 760, y: 490, w: 130, h: 32, distX: 110, distY: 0, speed: 1.4, style: 'platform_stone' },
      { x: 1660, y: 470, w: 130, h: 32, distX: 0, distY: 80, speed: 1.3, style: 'platform_stone' },
      { x: 2560, y: 480, w: 130, h: 32, distX: 110, distY: 0, speed: 1.5, style: 'platform_stone' }
    ],
    mushrooms: [
      { x: 420, y: 512 },
      { x: 1150, y: 512 },
      { x: 2020, y: 512 }
    ],
    bananas: [
      { x: 180, y: 510 }, { x: 220, y: 510 }, { x: 260, y: 510 },
      { x: 370, y: 400 }, { x: 410, y: 400 },
      { x: 570, y: 310 }, { x: 610, y: 310 },
      // Arch of bananas over moving platform
      { x: 780, y: 430 }, { x: 820, y: 410 }, { x: 860, y: 430 },
      { x: 1070, y: 390 }, { x: 1110, y: 390 },
      { x: 1270, y: 300 }, { x: 1310, y: 300 },
      { x: 1470, y: 210 }, { x: 1510, y: 210 },
      { x: 1970, y: 380 }, { x: 2010, y: 380 },
      { x: 2170, y: 280 }, { x: 2210, y: 280 },
      { x: 2370, y: 190 }, { x: 2410, y: 190 }, { x: 2450, y: 190 },
      { x: 2800, y: 510 }, { x: 2850, y: 510 }, { x: 2900, y: 510 }, { x: 2950, y: 510 }, { x: 3000, y: 510 }
    ],
    stars: [
      { x: 610, y: 250, starId: 1 },  // Easy: temple outer gate
      { x: 1510, y: 180, starId: 2 }, // Medium: sanctuary altar pillar
      { x: 2430, y: 150, starId: 3 }  // Secret: golden sanctuary roof
    ],
    powerups: [
      { x: 950, y: 510, type: 'mega' }, // Mega Banana (2x score)
      { x: 1300, y: 510, type: 'shield' },
      { x: 2200, y: 510, type: 'star_power' }
    ],
    enemies: [
      { type: 'boar', x: 480, y: 514, patrol: 100 },
      { type: 'snake', x: 1080, y: 526, patrol: 90 },
      { type: 'parrot', x: 1500, y: 330, dist: 130 },
      { type: 'frog', x: 2050, y: 520 },
      { type: 'boar', x: 2820, y: 514, patrol: 120 }
    ],
    checkpoint: { x: 1880, y: 472 },
    finish: { x: 3200, y: 435 }
  }
];

window.LevelData = LevelData;
