const fs = require('fs');
const path = require('path');

const imgDir = path.resolve(__dirname, '..', 'assets', 'images');

// Sky Background with subtle sun gradient
const bgSkySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#80D8FF"/>
      <stop offset="45%" stop-color="#B3E5FC"/>
      <stop offset="100%" stop-color="#E1F5FE"/>
    </linearGradient>
    <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF59D" stop-opacity="1"/>
      <stop offset="50%" stop-color="#FFF176" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FFEE58" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#skyGrad)"/>
  <circle cx="1020" cy="180" r="160" fill="url(#sunGrad)"/>
  <circle cx="1020" cy="180" r="60" fill="#FFEE58"/>
</svg>`;

// Mountains Parallax Layer
const bgMountainsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="mountGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#80CBC4"/>
      <stop offset="100%" stop-color="#00897B"/>
    </linearGradient>
    <linearGradient id="mountGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A7FFEB"/>
      <stop offset="100%" stop-color="#26A69A"/>
    </linearGradient>
  </defs>
  <!-- Distant Peak silhouettes -->
  <polygon points="0,720 0,380 180,240 380,420 540,280 720,440 900,220 1080,390 1280,260 1280,720" fill="url(#mountGrad)" opacity="0.6"/>
  <polygon points="0,720 0,440 120,360 280,500 480,340 680,480 840,320 1040,490 1200,380 1280,430 1280,720" fill="url(#mountGrad2)" opacity="0.8"/>
</svg>`;

// Midground Jungle Canopy Trees
const bgTreesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="treeCanopy" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4CAF50"/>
      <stop offset="100%" stop-color="#2E7D32"/>
    </linearGradient>
  </defs>
  <!-- Repeated cartoon tree clusters -->
  <g fill="url(#treeCanopy)">
    <!-- Tree 1 -->
    <rect x="90" y="380" width="30" height="340" rx="10" fill="#5D4037"/>
    <circle cx="105" cy="340" r="90"/>
    <circle cx="60" cy="360" r="65"/>
    <circle cx="150" cy="360" r="65"/>
    <!-- Tree 2 -->
    <rect x="420" y="420" width="28" height="300" rx="8" fill="#5D4037"/>
    <circle cx="434" cy="380" r="80"/>
    <circle cx="390" cy="400" r="60"/>
    <circle cx="480" cy="400" r="60"/>
    <!-- Tree 3 -->
    <rect x="760" y="360" width="34" height="360" rx="10" fill="#5D4037"/>
    <circle cx="777" cy="310" r="95"/>
    <circle cx="720" cy="340" r="70"/>
    <circle cx="830" cy="340" r="70"/>
    <!-- Tree 4 -->
    <rect x="1100" y="400" width="30" height="320" rx="10" fill="#5D4037"/>
    <circle cx="1115" cy="350" r="85"/>
    <circle cx="1070" cy="380" r="65"/>
    <circle cx="1160" cy="380" r="65"/>
  </g>
</svg>`;

// Foreground Bushes & Flowers
const bgBushesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 200" width="1280" height="200">
  <defs>
    <linearGradient id="bushGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#76FF03"/>
      <stop offset="100%" stop-color="#388E3C"/>
    </linearGradient>
  </defs>
  <!-- Lush rounded cartoon bushes -->
  <g fill="url(#bushGrad)">
    <circle cx="60" cy="180" r="80"/>
    <circle cx="180" cy="190" r="60"/>
    <circle cx="340" cy="180" r="90"/>
    <circle cx="460" cy="195" r="55"/>
    <circle cx="640" cy="180" r="85"/>
    <circle cx="780" cy="190" r="65"/>
    <circle cx="960" cy="180" r="90"/>
    <circle cx="1100" cy="195" r="60"/>
    <circle cx="1220" cy="180" r="80"/>
  </g>
  <!-- Cute Jungle Flowers -->
  <g>
    <!-- Flower 1 -->
    <circle cx="120" cy="130" r="9" fill="#FF4081"/>
    <circle cx="120" cy="130" r="4" fill="#FFEB3B"/>
    <!-- Flower 2 -->
    <circle cx="390" cy="120" r="11" fill="#FF9100"/>
    <circle cx="390" cy="120" r="5" fill="#FFFFFF"/>
    <!-- Flower 3 -->
    <circle cx="700" cy="135" r="10" fill="#E040FB"/>
    <circle cx="700" cy="135" r="4.5" fill="#FFEB3B"/>
    <!-- Flower 4 -->
    <circle cx="1020" cy="125" r="11" fill="#FF5252"/>
    <circle cx="1020" cy="125" r="5" fill="#FFFF00"/>
  </g>
</svg>`;

// Fluffy Cartoon Cloud
const cloudSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70" width="120" height="70">
  <path d="M25,55 C12,55 4,45 4,35 C4,25 15,20 22,22 C28,10 44,5 58,12 C68,4 86,6 94,18 C105,18 116,28 114,40 C118,50 108,55 98,55 Z" 
        fill="#FFFFFF" opacity="0.9" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.1))"/>
</svg>`;

// Fluttering Butterfly
const butterflySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <defs>
    <radialGradient id="wingGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFEB3B"/>
      <stop offset="100%" stop-color="#FF4081"/>
    </radialGradient>
  </defs>
  <!-- Left Wings -->
  <ellipse cx="14" cy="16" rx="12" ry="9" transform="rotate(-30 14 16)" fill="url(#wingGrad)"/>
  <ellipse cx="16" cy="32" rx="9" ry="7" transform="rotate(20 16 32)" fill="url(#wingGrad)"/>
  <!-- Right Wings -->
  <ellipse cx="34" cy="16" rx="12" ry="9" transform="rotate(30 34 16)" fill="url(#wingGrad)"/>
  <ellipse cx="32" cy="32" rx="9" ry="7" transform="rotate(-20 32 32)" fill="url(#wingGrad)"/>
  <!-- Body -->
  <ellipse cx="24" cy="24" rx="3" ry="12" fill="#3E2723"/>
  <circle cx="24" cy="12" r="3.5" fill="#3E2723"/>
</svg>`;

// Flying Bird
const birdSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="60" height="40">
  <!-- Cartoon swooping bird wings -->
  <path d="M4,20 Q16,4 30,18 Q44,4 56,20 Q44,14 30,24 Q16,14 4,20 Z" fill="#0288D1"/>
</svg>`;

// Hanging Jungle Vine
const vineSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 160" width="32" height="160">
  <path d="M16,0 Q8,40 20,80 Q8,120 16,160" fill="none" stroke="#2E7D32" stroke-width="6" stroke-linecap="round"/>
  <!-- Little leaves along vine -->
  <ellipse cx="10" cy="30" rx="8" ry="4" transform="rotate(-25 10 30)" fill="#76FF03"/>
  <ellipse cx="22" cy="70" rx="8" ry="4" transform="rotate(25 22 70)" fill="#76FF03"/>
  <ellipse cx="10" cy="110" rx="8" ry="4" transform="rotate(-25 10 110)" fill="#76FF03"/>
  <ellipse cx="22" cy="145" rx="8" ry="4" transform="rotate(25 22 145)" fill="#76FF03"/>
</svg>`;

const sceneryAssets = {
  'bg_sky.svg': bgSkySvg,
  'bg_mountains.svg': bgMountainsSvg,
  'bg_trees.svg': bgTreesSvg,
  'bg_bushes.svg': bgBushesSvg,
  'cloud.svg': cloudSvg,
  'butterfly.svg': butterflySvg,
  'bird.svg': birdSvg,
  'vine.svg': vineSvg
};

for (const [k, v] of Object.entries(sceneryAssets)) {
  fs.writeFileSync(path.join(imgDir, k), v.trim(), 'utf8');
}
console.log(`Added ${Object.keys(sceneryAssets).length} scenery assets to ${imgDir}`);
