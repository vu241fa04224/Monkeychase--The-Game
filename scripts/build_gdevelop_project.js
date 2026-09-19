const fs = require('fs');
const path = require('path');

const projectFile = path.resolve(__dirname, '..', 'game.json');

// Helper to create Sprite Animation object in GDevelop format
function createSpriteObject(name, imageFiles) {
  return {
    name: name,
    type: "Sprite",
    variables: [],
    effects: [],
    behaviors: [],
    animations: [
      {
        name: "Default",
        useMultipleDirections: false,
        directions: [
          {
            looping: true,
            timeBetweenFrames: 0.1,
            sprites: imageFiles.map(img => ({
              hasCustomCollisionMask: false,
              image: img,
              points: [],
              originPoint: { name: "origine", x: 0, y: 0 },
              centerPoint: { automatic: true, name: "centre", x: 0, y: 0 },
              customCollisionMask: []
            }))
          }
        ]
      }
    ]
  };
}

// Player with PlatformerObject Behavior
function createPlayerObject() {
  const obj = createSpriteObject("Player_Momo", [
    "assets/images/momo_idle.svg",
    "assets/images/momo_run.svg",
    "assets/images/momo_jump.svg",
    "assets/images/momo_hurt.svg",
    "assets/images/momo_celebrate.svg"
  ]);

  obj.behaviors = [
    {
      name: "PlatformerObject",
      type: "PlatformBehavior::PlatformerObjectBehavior",
      gravity: 900,
      maxFallingSpeed: 700,
      acceleration: 1500,
      deceleration: 1500,
      maxSpeed: 350,
      jumpSpeed: 550,
      canGrabPlatforms: false,
      jumpSustainTime: 0.2,
      useDefaultControls: true,
      allowDiagonals: false,
      slopeMaxAngle: 45,
      hasSeveralSecondJumpFrames: true
    }
  ];

  return obj;
}

// Platform Object with Platform Behavior
function createPlatformObject(name, imgFile, isJumpthru = false) {
  const obj = createSpriteObject(name, [imgFile]);
  obj.behaviors = [
    {
      name: "Platform",
      type: "PlatformBehavior::PlatformBehavior",
      canBeGrabbed: false,
      platformType: isJumpthru ? "Jumpthru" : "NormalPlatform",
      yGrabOffset: 0
    }
  ];
  return obj;
}

const resourcesList = [
  // Images
  { file: "assets/images/momo_idle.svg", kind: "image", name: "assets/images/momo_idle.svg", metadata: "" },
  { file: "assets/images/momo_run.svg", kind: "image", name: "assets/images/momo_run.svg", metadata: "" },
  { file: "assets/images/momo_jump.svg", kind: "image", name: "assets/images/momo_jump.svg", metadata: "" },
  { file: "assets/images/momo_hurt.svg", kind: "image", name: "assets/images/momo_hurt.svg", metadata: "" },
  { file: "assets/images/momo_celebrate.svg", kind: "image", name: "assets/images/momo_celebrate.svg", metadata: "" },
  { file: "assets/images/banana.svg", kind: "image", name: "assets/images/banana.svg", metadata: "" },
  { file: "assets/images/star.svg", kind: "image", name: "assets/images/star.svg", metadata: "" },
  { file: "assets/images/mega_banana.svg", kind: "image", name: "assets/images/mega_banana.svg", metadata: "" },
  { file: "assets/images/coconut_shield.svg", kind: "image", name: "assets/images/coconut_shield.svg", metadata: "" },
  { file: "assets/images/speed_banana.svg", kind: "image", name: "assets/images/speed_banana.svg", metadata: "" },
  { file: "assets/images/heart.svg", kind: "image", name: "assets/images/heart.svg", metadata: "" },
  { file: "assets/images/checkpoint_off.svg", kind: "image", name: "assets/images/checkpoint_off.svg", metadata: "" },
  { file: "assets/images/checkpoint_on.svg", kind: "image", name: "assets/images/checkpoint_on.svg", metadata: "" },
  { file: "assets/images/finish_gate.svg", kind: "image", name: "assets/images/finish_gate.svg", metadata: "" },
  { file: "assets/images/mushroom.svg", kind: "image", name: "assets/images/mushroom.svg", metadata: "" },
  { file: "assets/images/platform_grass.svg", kind: "image", name: "assets/images/platform_grass.svg", metadata: "" },
  { file: "assets/images/platform_wood.svg", kind: "image", name: "assets/images/platform_wood.svg", metadata: "" },
  { file: "assets/images/platform_stone.svg", kind: "image", name: "assets/images/platform_stone.svg", metadata: "" },
  { file: "assets/images/enemy_snake.svg", kind: "image", name: "assets/images/enemy_snake.svg", metadata: "" },
  { file: "assets/images/enemy_boar.svg", kind: "image", name: "assets/images/enemy_boar.svg", metadata: "" },
  { file: "assets/images/enemy_parrot.svg", kind: "image", name: "assets/images/enemy_parrot.svg", metadata: "" },
  { file: "assets/images/enemy_frog.svg", kind: "image", name: "assets/images/enemy_frog.svg", metadata: "" },
  { file: "assets/images/logo.svg", kind: "image", name: "assets/images/logo.svg", metadata: "" },
  { file: "assets/images/bg_sky.svg", kind: "image", name: "assets/images/bg_sky.svg", metadata: "" },
  { file: "assets/images/bg_mountains.svg", kind: "image", name: "assets/images/bg_mountains.svg", metadata: "" },
  { file: "assets/images/bg_trees.svg", kind: "image", name: "assets/images/bg_trees.svg", metadata: "" },
  { file: "assets/images/bg_bushes.svg", kind: "image", name: "assets/images/bg_bushes.svg", metadata: "" },
  { file: "assets/images/cloud.svg", kind: "image", name: "assets/images/cloud.svg", metadata: "" },
  { file: "assets/images/butterfly.svg", kind: "image", name: "assets/images/butterfly.svg", metadata: "" },
  { file: "assets/images/bird.svg", kind: "image", name: "assets/images/bird.svg", metadata: "" },
  { file: "assets/images/vine.svg", kind: "image", name: "assets/images/vine.svg", metadata: "" },

  // Sounds
  { file: "assets/sounds/jump.wav", kind: "audio", name: "assets/sounds/jump.wav", metadata: "" },
  { file: "assets/sounds/land.wav", kind: "audio", name: "assets/sounds/land.wav", metadata: "" },
  { file: "assets/sounds/banana.wav", kind: "audio", name: "assets/sounds/banana.wav", metadata: "" },
  { file: "assets/sounds/star.wav", kind: "audio", name: "assets/sounds/star.wav", metadata: "" },
  { file: "assets/sounds/powerup.wav", kind: "audio", name: "assets/sounds/powerup.wav", metadata: "" },
  { file: "assets/sounds/hurt.wav", kind: "audio", name: "assets/sounds/hurt.wav", metadata: "" },
  { file: "assets/sounds/checkpoint.wav", kind: "audio", name: "assets/sounds/checkpoint.wav", metadata: "" },
  { file: "assets/sounds/levelcomplete.wav", kind: "audio", name: "assets/sounds/levelcomplete.wav", metadata: "" },
  { file: "assets/sounds/gameover.wav", kind: "audio", name: "assets/sounds/gameover.wav", metadata: "" },
  { file: "assets/sounds/mushroom.wav", kind: "audio", name: "assets/sounds/mushroom.wav", metadata: "" },
  { file: "assets/sounds/click.wav", kind: "audio", name: "assets/sounds/click.wav", metadata: "" }
];

const globalObjects = [
  createPlayerObject(),
  createPlatformObject("Platform_Grass", "assets/images/platform_grass.svg", false),
  createPlatformObject("Platform_Wood", "assets/images/platform_wood.svg", true),
  createPlatformObject("Platform_Stone", "assets/images/platform_stone.svg", false),
  createSpriteObject("Bounce_Mushroom", ["assets/images/mushroom.svg"]),
  createSpriteObject("Item_Banana", ["assets/images/banana.svg"]),
  createSpriteObject("Item_Star", ["assets/images/star.svg"]),
  createSpriteObject("Item_Heart", ["assets/images/heart.svg"]),
  createSpriteObject("Powerup_Shield", ["assets/images/coconut_shield.svg"]),
  createSpriteObject("Powerup_Speed", ["assets/images/speed_banana.svg"]),
  createSpriteObject("Powerup_Mega", ["assets/images/mega_banana.svg"]),
  createSpriteObject("Enemy_Snake", ["assets/images/enemy_snake.svg"]),
  createSpriteObject("Enemy_Boar", ["assets/images/enemy_boar.svg"]),
  createSpriteObject("Enemy_Parrot", ["assets/images/enemy_parrot.svg"]),
  createSpriteObject("Enemy_Frog", ["assets/images/enemy_frog.svg"]),
  createSpriteObject("Checkpoint_Totem", ["assets/images/checkpoint_off.svg", "assets/images/checkpoint_on.svg"]),
  createSpriteObject("Finish_Gate", ["assets/images/finish_gate.svg"]),
  createSpriteObject("Game_Logo", ["assets/images/logo.svg"]),
  createSpriteObject("Scenery_Cloud", ["assets/images/cloud.svg"]),
  createSpriteObject("Scenery_Bird", ["assets/images/bird.svg"]),
  createSpriteObject("Scenery_Butterfly", ["assets/images/butterfly.svg"])
];

function createLayout(name, backgroundColor = 8444159) {
  return {
    name: name,
    mangledName: name,
    r: 128,
    v: 216,
    b: 255,
    title: name,
    stopSoundsOnStartup: false,
    standardSortMethod: true,
    uiSettings: {
      grid: false,
      gridType: "isometric",
      gridWidth: 32,
      gridHeight: 32,
      gridOffsetX: 0,
      gridOffsetY: 0,
      gridColor: 10401023,
      gridAlpha: 0.8,
      snapToGrid: false,
      zoomFactor: 1,
      windowMask: false
    },
    objectsFolders: [],
    objects: [],
    layers: [
      {
        name: "",
        visibility: true,
        cameras: [{ defaultSize: true, defaultViewport: true, height: 0, viewportBottom: 1, viewportLeft: 0, viewportRight: 1, viewportTop: 0, width: 0 }],
        effects: []
      },
      {
        name: "GUI",
        visibility: true,
        cameras: [{ defaultSize: true, defaultViewport: true, height: 0, viewportBottom: 1, viewportLeft: 0, viewportRight: 1, viewportTop: 0, width: 0 }],
        effects: []
      }
    ],
    behaviorsSharedData: [],
    variables: [
      { name: "Score", value: 0 },
      { name: "Bananas", value: 0 },
      { name: "Stars", value: 0 },
      { name: "Hearts", value: 3 },
      { name: "CheckpointX", value: 100 },
      { name: "CheckpointY", value: 480 }
    ],
    instances: [
      {
        angle: 0,
        customSize: false,
        height: 64,
        layer: "",
        name: "Player_Momo",
        persistentUuid: "inst-player-1",
        width: 64,
        x: 100,
        y: 480,
        zOrder: 10,
        numberProperties: [],
        stringProperties: [],
        initialVariables: []
      },
      {
        angle: 0,
        customSize: true,
        height: 160,
        layer: "",
        name: "Platform_Grass",
        persistentUuid: "inst-plat-1",
        width: 800,
        x: 0,
        y: 560,
        zOrder: 1,
        numberProperties: [],
        stringProperties: [],
        initialVariables: []
      }
    ],
    events: [
      // Standard scene events
      {
        type: "BuiltinCommonInstructions::Standard",
        conditions: [
          {
            type: { inverted: false, value: "DepartScene" },
            parameters: []
          }
        ],
        actions: [
          // Center camera on Player
          {
            type: { inverted: false, value: "CameraX" },
            parameters: ["", "Player_Momo.PointX(\"centre\")", "", "0"]
          }
        ],
        events: []
      },
      // Player collision with Banana
      {
        type: "BuiltinCommonInstructions::Standard",
        conditions: [
          {
            type: { inverted: false, value: "CollisionNP" },
            parameters: ["Player_Momo", "Item_Banana", "", "1"]
          }
        ],
        actions: [
          {
            type: { inverted: false, value: "Delete" },
            parameters: ["Item_Banana"]
          },
          {
            type: { inverted: false, value: "ModVarScene" },
            parameters: ["Bananas", "+", "1"]
          },
          {
            type: { inverted: false, value: "ModVarScene" },
            parameters: ["Score", "+", "10"]
          },
          {
            type: { inverted: false, value: "PlaySound" },
            parameters: ["", "assets/sounds/banana.wav", "", "80", "100"]
          }
        ],
        events: []
      }
    ]
  };
}

const layouts = [
  createLayout("MainMenu"),
  createLayout("LevelSelect"),
  createLayout("Level1_SunnyJungle"),
  createLayout("Level2_WaterfallWoods"),
  createLayout("Level3_MonkeyMountain"),
  createLayout("Level4_MysteryJungle"),
  createLayout("Level5_GoldenBananaTemple"),
  createLayout("VictoryScene"),
  createLayout("AchievementsScene"),
  createLayout("SettingsScene")
];

const gdevelopProject = {
  firstLayout: "MainMenu",
  gdVersion: {
    build: 99,
    major: 5,
    minor: 0,
    revision: 0
  },
  properties: {
    adaptGameToKeepAspectRatio: true,
    folderProject: false,
    name: "MONKEY CHASE",
    packageName: "com.monkeychase.game",
    projectUuid: "e29bf44a-9b16-4c91-948f-410a8d7920ab",
    scaleMode: "linear",
    sizeOnStartupMode: "adaptWidth",
    templateSlug: "",
    version: "1.0.0",
    windowWidth: 1280,
    windowHeight: 720,
    author: "Monkey Chase Team",
    orientation: "landscape",
    watermark: { showWatermark: false }
  },
  resources: {
    resources: resourcesList
  },
  objectsFolders: [],
  objects: globalObjects,
  variables: [
    { name: "CurrentLevel", value: 1 },
    { name: "TotalScore", value: 0 },
    { name: "TotalBananas", value: 0 },
    { name: "TotalStars", value: 0 },
    { name: "UnlockedLevels", value: 1 },
    { name: "SoundEnabled", value: true },
    { name: "MusicEnabled", value: true }
  ],
  layouts: layouts,
  externalEvents: [],
  eventsFunctionsExtensions: [],
  externalLayouts: [],
  externalSourceFiles: []
};

fs.writeFileSync(projectFile, JSON.stringify(gdevelopProject, null, 2), 'utf8');
console.log(`Successfully generated valid GDevelop 5 project at ${projectFile}`);
