const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    testsFailed++;
  }
}

console.log('\n--- 1. Testing game.json GDevelop 5 Project File ---');
try {
  const gameJsonPath = path.join(rootDir, 'game.json');
  assert(fs.existsSync(gameJsonPath), 'game.json exists');

  const content = fs.readFileSync(gameJsonPath, 'utf8');
  const project = JSON.parse(content);
  assert(project.firstLayout === 'MainMenu', 'firstLayout is MainMenu');
  assert(project.properties && project.properties.name === 'MONKEY CHASE', 'Project name is MONKEY CHASE');
  assert(Array.isArray(project.layouts) && project.layouts.length === 10, 'All 10 layouts exist');
  assert(Array.isArray(project.objects) && project.objects.length >= 15, 'Global objects defined');

  // Verify resources on disk
  let missingFiles = 0;
  for (const res of project.resources.resources) {
    const fullPath = path.join(rootDir, res.file);
    if (!fs.existsSync(fullPath)) {
      console.error(`    Missing resource file: ${res.file}`);
      missingFiles++;
    }
  }
  assert(missingFiles === 0, `All ${project.resources.resources.length} project resources exist on disk`);
} catch (e) {
  assert(false, `game.json failed validation: ${e.message}`);
}

console.log('\n--- 2. Testing Asset Files Integrity ---');
const imgDir = path.join(rootDir, 'assets', 'images');
const sndDir = path.join(rootDir, 'assets', 'sounds');

const images = fs.readdirSync(imgDir);
assert(images.length >= 25, `At least 25 image assets found (${images.length} found)`);

let corruptSvgs = 0;
for (const f of images) {
  if (f.endsWith('.svg')) {
    const svgText = fs.readFileSync(path.join(imgDir, f), 'utf8');
    if (!svgText.includes('<svg') || !svgText.includes('</svg>')) {
      corruptSvgs++;
    }
  }
}
assert(corruptSvgs === 0, 'All SVGs are valid XML/SVG structures');

const sounds = fs.readdirSync(sndDir);
assert(sounds.length >= 10, `At least 10 WAV sound files found (${sounds.length} found)`);

let invalidWavs = 0;
for (const f of sounds) {
  if (f.endsWith('.wav')) {
    const buf = fs.readFileSync(path.join(sndDir, f));
    const header = buf.toString('ascii', 0, 4);
    const wave = buf.toString('ascii', 8, 12);
    if (header !== 'RIFF' || wave !== 'WAVE') {
      invalidWavs++;
    }
  }
}
assert(invalidWavs === 0, 'All WAV audio files have valid RIFF/WAVE headers');

console.log('\n--- 3. Testing JavaScript Code Syntax ---');
const jsDir = path.join(rootDir, 'js');
const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
assert(jsFiles.length >= 10, `Found ${jsFiles.length} JavaScript modules`);

for (const js of jsFiles) {
  try {
    execSync(`node -c "${path.join(jsDir, js)}"`);
    assert(true, `Syntax OK: js/${js}`);
  } catch (e) {
    assert(false, `Syntax error in js/${js}: ${e.message}`);
  }
}

console.log('\n--- 4. Testing 5 Handcrafted Levels in levels.js ---');
try {
  // Load LevelData in sandbox
  const levelsCode = fs.readFileSync(path.join(jsDir, 'levels.js'), 'utf8');
  const sandbox = { window: {} };
  const vm = require('vm');
  vm.createContext(sandbox);
  vm.runInContext(levelsCode, sandbox);

  const levels = sandbox.window.LevelData;
  assert(Array.isArray(levels) && levels.length === 5, 'Exactly 5 levels defined in LevelData');

  levels.forEach(lvl => {
    const num = lvl.levelNum;
    assert(lvl.title && lvl.title.length > 0, `Level ${num} has title: "${lvl.title}"`);
    assert(lvl.width >= 2400, `Level ${num} has ample length: ${lvl.width}px`);
    assert(lvl.platforms.length >= 5, `Level ${num} has at least 5 platforms (${lvl.platforms.length})`);
    assert(lvl.bananas.length >= 15, `Level ${num} has generous banana trails (${lvl.bananas.length})`);
    assert(lvl.stars.length === 3, `Level ${num} has exactly 3 hidden stars (${lvl.stars.length})`);
    assert(lvl.checkpoint && lvl.checkpoint.x > 500, `Level ${num} has valid checkpoint at x=${lvl.checkpoint.x}`);
    assert(lvl.finish && lvl.finish.x > lvl.checkpoint.x, `Level ${num} has finish line at x=${lvl.finish.x}`);
  });
} catch (e) {
  assert(false, `Level validation error: ${e.message}`);
}

console.log('\n=======================================');
console.log(`TEST RESULTS: ${testsPassed} Passed, ${testsFailed} Failed`);
console.log('=======================================\n');

if (testsFailed > 0) {
  process.exit(1);
}
