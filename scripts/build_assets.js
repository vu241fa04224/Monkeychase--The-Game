const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const imgDir = path.join(baseDir, 'assets', 'images');
const sndDir = path.join(baseDir, 'assets', 'sounds');

fs.mkdirSync(imgDir, { recursive: true });
fs.mkdirSync(sndDir, { recursive: true });

// --- CUTE CARTOON SVGs ---

// 1. Momo Idle
const momoIdleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <radialGradient id="faceGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE0B2"/>
      <stop offset="100%" stop-color="#FFCC80"/>
    </radialGradient>
    <radialGradient id="furGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#8D5524"/>
      <stop offset="100%" stop-color="#5C3317"/>
    </radialGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8D5524"/>
      <stop offset="100%" stop-color="#4E270A"/>
    </linearGradient>
    <radialGradient id="bellyGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF3E0"/>
      <stop offset="100%" stop-color="#FFE0B2"/>
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Ground Shadow -->
  <ellipse cx="64" cy="120" rx="34" ry="7" fill="#000000" opacity="0.22"/>

  <!-- Curled Tail -->
  <path d="M40,88 C20,95 10,75 14,60 C18,48 30,50 30,58 C30,66 22,66 20,62 C18,58 20,54 22,54" 
        fill="none" stroke="#5C3317" stroke-width="9" stroke-linecap="round"/>

  <!-- Left Arm -->
  <path d="M42,80 Q32,95 38,104" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <circle cx="38" cy="105" r="5.5" fill="#FFE0B2"/>

  <!-- Body -->
  <ellipse cx="64" cy="88" rx="26" ry="24" fill="url(#bodyGrad)" filter="url(#softShadow)"/>
  <!-- Belly -->
  <ellipse cx="65" cy="89" rx="17" ry="16" fill="url(#bellyGrad)"/>

  <!-- Feet -->
  <ellipse cx="50" cy="116" rx="9" ry="6" fill="#5C3317"/>
  <ellipse cx="50" cy="115" rx="7" ry="4.5" fill="#FFE0B2"/>
  <ellipse cx="78" cy="116" rx="9" ry="6" fill="#5C3317"/>
  <ellipse cx="78" cy="115" rx="7" ry="4.5" fill="#FFE0B2"/>

  <!-- Right Arm -->
  <path d="M86,80 Q96,95 90,104" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <circle cx="90" cy="105" r="5.5" fill="#FFE0B2"/>

  <!-- Head Group -->
  <g transform="translate(0, -2)">
    <!-- Ears -->
    <circle cx="32" cy="46" r="14" fill="#5C3317"/>
    <circle cx="32" cy="46" r="9" fill="#FFCC80"/>
    <circle cx="96" cy="46" r="14" fill="#5C3317"/>
    <circle cx="96" cy="46" r="9" fill="#FFCC80"/>

    <!-- Head base -->
    <ellipse cx="64" cy="46" rx="33" ry="29" fill="url(#furGrad)" filter="url(#softShadow)"/>

    <!-- Cute Monkey Face Mask -->
    <!-- Left face lobe -->
    <circle cx="53" cy="45" r="17" fill="url(#faceGrad)"/>
    <!-- Right face lobe -->
    <circle cx="75" cy="45" r="17" fill="url(#faceGrad)"/>
    <!-- Muzzle -->
    <ellipse cx="64" cy="56" rx="20" ry="14" fill="url(#faceGrad)"/>

    <!-- Big Shiny Anime/Cartoon Eyes -->
    <!-- Left Eye Outer -->
    <ellipse cx="53" cy="42" rx="7.5" ry="10" fill="#FFFFFF"/>
    <!-- Left Pupil -->
    <ellipse cx="54" cy="43" rx="5.5" ry="7.5" fill="#2E1A0F"/>
    <ellipse cx="55" cy="43" rx="4.5" ry="6.5" fill="#1A237E"/>
    <circle cx="56.5" cy="40" r="2.8" fill="#FFFFFF"/>
    <circle cx="52.5" cy="45.5" r="1.4" fill="#FFFFFF"/>

    <!-- Right Eye Outer -->
    <ellipse cx="75" cy="42" rx="7.5" ry="10" fill="#FFFFFF"/>
    <!-- Right Pupil -->
    <ellipse cx="74" cy="43" rx="5.5" ry="7.5" fill="#2E1A0F"/>
    <ellipse cx="73" cy="43" rx="4.5" ry="6.5" fill="#1A237E"/>
    <circle cx="75.5" cy="40" r="2.8" fill="#FFFFFF"/>
    <circle cx="71.5" cy="45.5" r="1.4" fill="#FFFFFF"/>

    <!-- Eyebrows -->
    <path d="M47,31 Q53,28 59,31" fill="none" stroke="#4E270A" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M69,31 Q75,28 81,31" fill="none" stroke="#4E270A" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Rosy Cheeks -->
    <circle cx="43" cy="53" r="5.5" fill="#FF8A80" opacity="0.6"/>
    <circle cx="85" cy="53" r="5.5" fill="#FF8A80" opacity="0.6"/>

    <!-- Cute Nose -->
    <ellipse cx="64" cy="53" rx="3.5" ry="2.2" fill="#4E270A"/>

    <!-- Cheerful Big Smile with tongue -->
    <path d="M56,58 Q64,68 72,58" fill="#D32F2F" stroke="#4E270A" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M60,63 Q64,67 68,63" fill="#FF8A80"/>

    <!-- Tuft of Hair on top -->
    <path d="M60,19 Q64,10 68,18 Q72,13 71,20" fill="#5C3317"/>
  </g>
</svg>`;

// 2. Momo Run
const momoRunSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <radialGradient id="faceGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE0B2"/><stop offset="100%" stop-color="#FFCC80"/>
    </radialGradient>
    <radialGradient id="furGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#8D5524"/><stop offset="100%" stop-color="#5C3317"/>
    </radialGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8D5524"/><stop offset="100%" stop-color="#4E270A"/>
    </linearGradient>
  </defs>
  <ellipse cx="64" cy="120" rx="30" ry="6" fill="#000000" opacity="0.2"/>
  <!-- Tail animated high -->
  <path d="M38,82 C16,84 8,62 18,50 C26,40 34,48 30,56 C26,62 20,58 20,54" 
        fill="none" stroke="#5C3317" stroke-width="9" stroke-linecap="round"/>
  <!-- Back Leg -->
  <path d="M52,96 Q40,105 32,112" fill="none" stroke="#5C3317" stroke-width="9" stroke-linecap="round"/>
  <ellipse cx="30" cy="113" rx="8" ry="5" fill="#FFE0B2"/>
  <!-- Back Arm -->
  <path d="M46,78 Q30,70 28,60" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <circle cx="28" cy="59" r="5" fill="#FFE0B2"/>
  <!-- Leaning Body -->
  <ellipse cx="66" cy="85" rx="25" ry="23" transform="rotate(10 66 85)" fill="url(#bodyGrad)"/>
  <ellipse cx="67" cy="86" rx="16" ry="15" transform="rotate(10 67 86)" fill="#FFE0B2"/>
  <!-- Front Leg -->
  <path d="M74,96 Q88,104 96,110" fill="none" stroke="#5C3317" stroke-width="9" stroke-linecap="round"/>
  <ellipse cx="98" cy="111" rx="8" ry="5" fill="#FFE0B2"/>
  <!-- Front Arm pumped forward -->
  <path d="M82,78 Q98,72 104,82" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <circle cx="105" cy="83" r="5.5" fill="#FFE0B2"/>
  <!-- Head Leaning Forward -->
  <g transform="translate(6, 0) rotate(8 68 45)">
    <circle cx="34" cy="46" r="14" fill="#5C3317"/>
    <circle cx="34" cy="46" r="9" fill="#FFCC80"/>
    <circle cx="98" cy="46" r="14" fill="#5C3317"/>
    <circle cx="98" cy="46" r="9" fill="#FFCC80"/>
    <ellipse cx="66" cy="46" rx="33" ry="29" fill="url(#furGrad)"/>
    <circle cx="55" cy="45" r="17" fill="url(#faceGrad)"/>
    <circle cx="77" cy="45" r="17" fill="url(#faceGrad)"/>
    <ellipse cx="66" cy="56" rx="20" ry="14" fill="url(#faceGrad)"/>
    <!-- Joyful Eyes -->
    <ellipse cx="55" cy="42" rx="7.5" ry="10" fill="#FFFFFF"/>
    <ellipse cx="57" cy="43" rx="5" ry="7" fill="#1A237E"/>
    <circle cx="59" cy="40" r="2.5" fill="#FFFFFF"/>
    <ellipse cx="77" cy="42" rx="7.5" ry="10" fill="#FFFFFF"/>
    <ellipse cx="79" cy="43" rx="5" ry="7" fill="#1A237E"/>
    <circle cx="81" cy="40" r="2.5" fill="#FFFFFF"/>
    <circle cx="45" cy="53" r="5.5" fill="#FF8A80" opacity="0.6"/>
    <circle cx="87" cy="53" r="5.5" fill="#FF8A80" opacity="0.6"/>
    <ellipse cx="66" cy="53" rx="3.5" ry="2.2" fill="#4E270A"/>
    <!-- Excited Open Mouth -->
    <path d="M57,57 Q66,70 75,57" fill="#D32F2F" stroke="#4E270A" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M62,64 Q66,68 70,64" fill="#FF8A80"/>
    <path d="M62,19 Q66,10 70,18" fill="#5C3317"/>
  </g>
</svg>`;

// 3. Momo Jump
const momoJumpSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <radialGradient id="faceGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE0B2"/><stop offset="100%" stop-color="#FFCC80"/>
    </radialGradient>
    <radialGradient id="furGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#8D5524"/><stop offset="100%" stop-color="#5C3317"/>
    </radialGradient>
  </defs>
  <path d="M52,90 C34,105 24,95 26,80 C28,70 38,72 36,80" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <!-- Arms Stretched High -->
  <path d="M42,66 Q30,42 34,26" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <circle cx="34" cy="25" r="6" fill="#FFE0B2"/>
  <path d="M86,66 Q98,42 94,26" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <circle cx="94" cy="25" r="6" fill="#FFE0B2"/>
  <!-- Stretched Body -->
  <ellipse cx="64" cy="76" rx="22" ry="26" fill="url(#furGrad)"/>
  <ellipse cx="64" cy="76" rx="14" ry="18" fill="#FFE0B2"/>
  <path d="M52,96 Q46,110 50,118" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <ellipse cx="50" cy="119" rx="8" ry="5" fill="#FFE0B2"/>
  <path d="M76,96 Q82,110 78,118" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <ellipse cx="78" cy="119" rx="8" ry="5" fill="#FFE0B2"/>
  <g transform="translate(0, -6)">
    <circle cx="32" cy="44" r="14" fill="#5C3317"/>
    <circle cx="32" cy="44" r="9" fill="#FFCC80"/>
    <circle cx="96" cy="44" r="14" fill="#5C3317"/>
    <circle cx="96" cy="44" r="9" fill="#FFCC80"/>
    <ellipse cx="64" cy="44" rx="33" ry="28" fill="url(#furGrad)"/>
    <circle cx="53" cy="43" r="17" fill="url(#faceGrad)"/>
    <circle cx="75" cy="43" r="17" fill="url(#faceGrad)"/>
    <ellipse cx="64" cy="54" rx="20" ry="14" fill="url(#faceGrad)"/>
    <ellipse cx="53" cy="40" rx="7.5" ry="9.5" fill="#FFFFFF"/>
    <ellipse cx="53" cy="37" rx="5" ry="6.5" fill="#1A237E"/>
    <circle cx="55" cy="35" r="2.8" fill="#FFFFFF"/>
    <ellipse cx="75" cy="40" rx="7.5" ry="9.5" fill="#FFFFFF"/>
    <ellipse cx="75" cy="37" rx="5" ry="6.5" fill="#1A237E"/>
    <circle cx="77" cy="35" r="2.8" fill="#FFFFFF"/>
    <circle cx="43" cy="50" r="5" fill="#FF8A80" opacity="0.6"/>
    <circle cx="85" cy="50" r="5" fill="#FF8A80" opacity="0.6"/>
    <ellipse cx="64" cy="50" rx="3" ry="2" fill="#4E270A"/>
    <ellipse cx="64" cy="60" rx="7" ry="9" fill="#D32F2F" stroke="#4E270A" stroke-width="2"/>
    <ellipse cx="64" cy="63" rx="5" ry="4" fill="#FF8A80"/>
  </g>
</svg>`;

// 4. Momo Hurt
const momoHurtSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <radialGradient id="faceGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE0B2"/><stop offset="100%" stop-color="#FFCC80"/>
    </radialGradient>
    <radialGradient id="furGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#8D5524"/><stop offset="100%" stop-color="#5C3317"/>
    </radialGradient>
  </defs>
  <ellipse cx="64" cy="120" rx="26" ry="6" fill="#000000" opacity="0.2"/>
  <ellipse cx="64" cy="86" rx="26" ry="24" fill="url(#furGrad)"/>
  <ellipse cx="64" cy="86" rx="16" ry="15" fill="#FFE0B2"/>
  <path d="M40,78 Q22,70 18,85" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <circle cx="18" cy="86" r="5.5" fill="#FFE0B2"/>
  <path d="M88,78 Q106,70 110,85" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <circle cx="110" cy="86" r="5.5" fill="#FFE0B2"/>
  <g transform="translate(0, 0)">
    <circle cx="32" cy="46" r="14" fill="#5C3317"/>
    <circle cx="32" cy="46" r="9" fill="#FFCC80"/>
    <circle cx="96" cy="46" r="14" fill="#5C3317"/>
    <circle cx="96" cy="46" r="9" fill="#FFCC80"/>
    <ellipse cx="64" cy="46" rx="33" ry="29" fill="url(#furGrad)"/>
    <circle cx="53" cy="45" r="17" fill="url(#faceGrad)"/>
    <circle cx="75" cy="45" r="17" fill="url(#faceGrad)"/>
    <ellipse cx="64" cy="56" rx="20" ry="14" fill="url(#faceGrad)"/>
    <path d="M47,37 L59,49 M59,37 L47,49" stroke="#3E2723" stroke-width="4" stroke-linecap="round"/>
    <path d="M69,37 L81,49 M81,37 L69,49" stroke="#3E2723" stroke-width="4" stroke-linecap="round"/>
    <path d="M54,63 Q59,57 64,63 T74,63" fill="none" stroke="#D32F2F" stroke-width="3" stroke-linecap="round"/>
    <path d="M26,30 Q24,20 28,18 Q32,20 30,30 Z" fill="#4FC3F7"/>
    <path d="M102,30 Q104,20 100,18 Q96,20 98,30 Z" fill="#4FC3F7"/>
  </g>
</svg>`;

// 5. Momo Celebrate
const momoCelebrateSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <radialGradient id="faceGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE0B2"/><stop offset="100%" stop-color="#FFCC80"/>
    </radialGradient>
    <radialGradient id="furGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#8D5524"/><stop offset="100%" stop-color="#5C3317"/>
    </radialGradient>
  </defs>
  <polygon points="20,20 23,26 29,29 23,32 20,38 17,32 11,29 17,26" fill="#FFD700"/>
  <polygon points="108,18 111,24 117,27 111,30 108,36 105,30 99,27 105,24" fill="#FFD700"/>
  <path d="M42,75 Q26,50 24,35" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <path d="M14,32 Q24,22 34,36 Q25,32 14,32" fill="#FFD700" stroke="#E65100" stroke-width="2"/>
  <path d="M86,75 Q102,50 104,35" fill="none" stroke="#5C3317" stroke-width="8" stroke-linecap="round"/>
  <path d="M114,32 Q104,22 94,36 Q103,32 114,32" fill="#FFD700" stroke="#E65100" stroke-width="2"/>
  <ellipse cx="64" cy="88" rx="26" ry="24" fill="url(#furGrad)"/>
  <ellipse cx="64" cy="89" rx="17" ry="16" fill="#FFE0B2"/>
  <g transform="translate(0, -2)">
    <circle cx="32" cy="46" r="14" fill="#5C3317"/>
    <circle cx="32" cy="46" r="9" fill="#FFCC80"/>
    <circle cx="96" cy="46" r="14" fill="#5C3317"/>
    <circle cx="96" cy="46" r="9" fill="#FFCC80"/>
    <ellipse cx="64" cy="46" rx="33" ry="29" fill="url(#furGrad)"/>
    <circle cx="53" cy="45" r="17" fill="url(#faceGrad)"/>
    <circle cx="75" cy="45" r="17" fill="url(#faceGrad)"/>
    <ellipse cx="64" cy="56" rx="20" ry="14" fill="url(#faceGrad)"/>
    <path d="M46,42 Q53,34 60,42" fill="none" stroke="#4E270A" stroke-width="4" stroke-linecap="round"/>
    <path d="M68,42 Q75,34 82,42" fill="none" stroke="#4E270A" stroke-width="4" stroke-linecap="round"/>
    <circle cx="43" cy="52" r="6" fill="#FF8A80" opacity="0.7"/>
    <circle cx="85" cy="52" r="6" fill="#FF8A80" opacity="0.7"/>
    <path d="M52,55 Q64,74 76,55 Z" fill="#D32F2F" stroke="#4E270A" stroke-width="2.5"/>
    <path d="M56,56 Q64,60 72,56" fill="#FFFFFF"/>
    <ellipse cx="64" cy="65" rx="7" ry="5" fill="#FF8A80"/>
  </g>
</svg>`;

// 6. Sleepy Snake
const enemySnakeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64" width="96" height="64">
  <defs>
    <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#81C784"/>
      <stop offset="100%" stop-color="#388E3C"/>
    </linearGradient>
  </defs>
  <path d="M12,48 C16,36 32,36 40,46 C48,56 64,54 72,42 C76,34 84,36 86,44 C88,52 76,58 60,58 C38,58 20,58 12,48 Z" 
        fill="url(#snakeGrad)" stroke="#2E7D32" stroke-width="3"/>
  <ellipse cx="26" cy="46" rx="6" ry="3" fill="#FFF59D"/>
  <ellipse cx="54" cy="52" rx="7" ry="3.5" fill="#FFF59D"/>
  <circle cx="78" cy="34" r="14" fill="url(#snakeGrad)" stroke="#2E7D32" stroke-width="2.5"/>
  <path d="M74,32 Q79,37 84,32" fill="none" stroke="#1B5E20" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="76" cy="38" r="3.5" fill="#FF8A80" opacity="0.6"/>
  <text x="82" y="18" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#1E88E5">Z</text>
  <text x="74" y="10" font-family="Arial, sans-serif" font-weight="bold" font-size="10" fill="#42A5F5">z</text>
</svg>`;

// 7. Funny Wild Boar
const enemyBoarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 80" width="96" height="80">
  <defs>
    <radialGradient id="boarGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#BCAAA4"/><stop offset="100%" stop-color="#6D4C41"/>
    </radialGradient>
  </defs>
  <rect x="22" y="60" width="10" height="16" rx="4" fill="#4E342E"/>
  <rect x="36" y="62" width="10" height="14" rx="4" fill="#3E2723"/>
  <rect x="58" y="60" width="10" height="16" rx="4" fill="#4E342E"/>
  <rect x="70" y="62" width="10" height="14" rx="4" fill="#3E2723"/>
  <ellipse cx="48" cy="46" rx="36" ry="24" fill="url(#boarGrad)"/>
  <path d="M12,42 Q6,36 10,32 Q14,32 12,38" fill="none" stroke="#5D4037" stroke-width="4" stroke-linecap="round"/>
  <circle cx="72" cy="42" r="16" fill="url(#boarGrad)"/>
  <ellipse cx="84" cy="46" rx="10" ry="7" fill="#FFAB91" stroke="#D84315" stroke-width="2"/>
  <circle cx="82" cy="46" r="2" fill="#BF360C"/>
  <circle cx="86" cy="46" r="2" fill="#BF360C"/>
  <polygon points="76,46 79,52 82,46" fill="#FFFFFF" stroke="#D7CCC8" stroke-width="1"/>
  <polygon points="62,28 68,16 74,28" fill="#5D4037"/>
  <polygon points="65,28 68,20 71,28" fill="#FFAB91"/>
  <circle cx="70" cy="34" r="5" fill="#FFFFFF"/>
  <circle cx="72" cy="34" r="3" fill="#212121"/>
  <circle cx="73" cy="33" r="1" fill="#FFFFFF"/>
</svg>`;

// 8. Mischievous Parrot
const enemyParrotSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <defs>
    <radialGradient id="parrotGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FF5252"/><stop offset="100%" stop-color="#D50000"/>
    </radialGradient>
  </defs>
  <path d="M34,42 C20,20 40,16 50,32 Z" fill="#00E676" stroke="#00C853" stroke-width="2"/>
  <path d="M16,56 Q6,66 2,74 Q12,70 20,62 Z" fill="#2979FF"/>
  <path d="M18,54 Q10,64 6,70 Q16,66 22,58 Z" fill="#FFEA00"/>
  <ellipse cx="40" cy="46" rx="20" ry="16" fill="url(#parrotGrad)"/>
  <circle cx="56" cy="34" r="14" fill="url(#parrotGrad)"/>
  <path d="M52,20 Q56,10 60,18" fill="none" stroke="#FFD600" stroke-width="4" stroke-linecap="round"/>
  <circle cx="58" cy="32" r="7" fill="#FFFFFF"/>
  <circle cx="59" cy="32" r="4" fill="#212121"/>
  <circle cx="60" cy="31" r="1.5" fill="#FFFFFF"/>
  <path d="M68,32 Q78,36 70,44 Q66,40 68,32" fill="#FFC107" stroke="#FFA000" stroke-width="1.5"/>
</svg>`;

// 9. Jumping Frog
const enemyFrogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <defs>
    <radialGradient id="frogGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#AEEA00"/><stop offset="100%" stop-color="#64DD17"/>
    </radialGradient>
  </defs>
  <ellipse cx="20" cy="62" rx="14" ry="8" transform="rotate(-20 20 62)" fill="#558B2F"/>
  <ellipse cx="60" cy="62" rx="14" ry="8" transform="rotate(20 60 62)" fill="#558B2F"/>
  <ellipse cx="40" cy="52" rx="24" ry="18" fill="url(#frogGrad)"/>
  <ellipse cx="40" cy="56" rx="14" ry="10" fill="#F4FF81"/>
  <circle cx="28" cy="32" r="10" fill="url(#frogGrad)"/>
  <circle cx="28" cy="31" r="7.5" fill="#FFFFFF"/>
  <circle cx="29" cy="31" r="4.5" fill="#212121"/>
  <circle cx="30" cy="29" r="1.8" fill="#FFFFFF"/>
  <circle cx="52" cy="32" r="10" fill="url(#frogGrad)"/>
  <circle cx="52" cy="31" r="7.5" fill="#FFFFFF"/>
  <circle cx="51" cy="31" r="4.5" fill="#212121"/>
  <circle cx="50" cy="29" r="1.8" fill="#FFFFFF"/>
  <path d="M26,48 Q40,58 54,48" fill="none" stroke="#33691E" stroke-width="3" stroke-linecap="round"/>
  <circle cx="24" cy="46" r="3.5" fill="#FF8A80" opacity="0.6"/>
  <circle cx="56" cy="46" r="3.5" fill="#FF8A80" opacity="0.6"/>
</svg>`;

// 10. Banana
const bananaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF176"/>
      <stop offset="60%" stop-color="#FFD600"/>
      <stop offset="100%" stop-color="#FFAB00"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#FFC107" flood-opacity="0.6"/>
    </filter>
  </defs>
  <path d="M14,16 C22,12 36,14 48,26 C58,36 56,52 48,54 C44,55 42,50 44,44 C46,36 40,26 30,22 C22,19 16,22 14,16 Z" 
        fill="url(#bananaGrad)" stroke="#FF8F00" stroke-width="2.5" filter="url(#glow)"/>
  <path d="M14,16 L10,12" stroke="#558B2F" stroke-width="4" stroke-linecap="round"/>
  <circle cx="48" cy="54" r="2" fill="#5D4037"/>
  <path d="M24,20 C32,20 42,28 46,36" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
</svg>`;

// 11. Star
const starSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="starGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFEE58"/><stop offset="100%" stop-color="#FFB300"/>
    </radialGradient>
    <filter id="starGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#FFA000" flood-opacity="0.8"/>
    </filter>
  </defs>
  <polygon points="32,4 40,22 59,23 44,36 50,55 32,43 14,55 20,36 5,23 24,22" 
           fill="url(#starGrad)" stroke="#FFA000" stroke-width="3" stroke-linejoin="round" filter="url(#starGlow)"/>
  <ellipse cx="26" cy="28" rx="2.5" ry="3.5" fill="#3E2723"/>
  <ellipse cx="38" cy="28" rx="2.5" ry="3.5" fill="#3E2723"/>
  <circle cx="27" cy="27" r="1" fill="#FFFFFF"/>
  <circle cx="39" cy="27" r="1" fill="#FFFFFF"/>
  <circle cx="22" cy="33" r="3" fill="#FF8A80" opacity="0.7"/>
  <circle cx="42" cy="33" r="3" fill="#FF8A80" opacity="0.7"/>
  <path d="M29,33 Q32,37 35,33" fill="none" stroke="#3E2723" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// 12. Mega Banana
const megaBananaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <defs>
    <radialGradient id="megaGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFEB3B" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#FF5722" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="40" cy="40" r="36" fill="url(#megaGlow)"/>
  <path d="M20,20 C32,15 50,18 64,34 C76,46 72,66 62,68 C58,69 54,62 56,54 C58,44 50,32 38,26 C28,22 22,26 20,20 Z" 
        fill="#FFD600" stroke="#FF6D00" stroke-width="3.5"/>
  <text x="40" y="52" font-family="'Comic Sans MS', cursive, sans-serif" font-weight="black" font-size="16" fill="#D50000" text-anchor="middle">2X</text>
</svg>`;

// 13. Coconut Shield
const coconutShieldSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="bubbleGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#E0F7FA" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="#80DEEA" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#00ACC1" stop-opacity="0.9"/>
    </radialGradient>
  </defs>
  <circle cx="32" cy="32" r="28" fill="url(#bubbleGrad)" stroke="#00E5FF" stroke-width="3"/>
  <circle cx="32" cy="34" r="16" fill="#6D4C41" stroke="#3E2723" stroke-width="2.5"/>
  <circle cx="28" cy="30" r="2.5" fill="#3E2723"/>
  <circle cx="36" cy="30" r="2.5" fill="#3E2723"/>
  <circle cx="32" cy="36" r="2.5" fill="#3E2723"/>
  <path d="M24,20 Q32,10 40,20 Q32,16 24,20" fill="#00E676" stroke="#00C853" stroke-width="1.5"/>
</svg>`;

// 14. Speed Banana
const speedBananaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="speedGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFEB3B"/>
      <stop offset="100%" stop-color="#FF9800" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="32" cy="32" r="28" fill="url(#speedGlow)"/>
  <polygon points="34,6 18,34 32,34 26,58 48,26 34,26" fill="#00E5FF" stroke="#00B0FF" stroke-width="2"/>
  <polygon points="33,10 20,33 31,33 26,52 44,27 33,27" fill="#FFFFFF"/>
</svg>`;

// 15. Heart
const heartSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="heartGrad" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#FF5252"/>
      <stop offset="70%" stop-color="#D50000"/>
      <stop offset="100%" stop-color="#880E4F"/>
    </radialGradient>
    <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#B71C1C" flood-opacity="0.5"/>
    </filter>
  </defs>
  <path d="M32,56 C14,42 4,30 4,18 C4,9 11,4 19,4 C25,4 29,7 32,12 C35,7 39,4 45,4 C53,4 60,9 60,18 C60,30 50,42 32,56 Z" 
        fill="url(#heartGrad)" stroke="#B71C1C" stroke-width="2.5" filter="url(#heartShadow)"/>
  <ellipse cx="18" cy="14" rx="6" ry="3.5" transform="rotate(-30 18 14)" fill="#FFFFFF" opacity="0.7"/>
</svg>`;

// 16. Checkpoint
const checkpointOffSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 96" width="64" height="96">
  <rect x="28" y="10" width="8" height="80" rx="3" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
  <ellipse cx="32" cy="90" rx="18" ry="6" fill="#5D4037"/>
  <path d="M36,70 L56,76 L36,82 Z" fill="#9E9E9E" stroke="#616161" stroke-width="2"/>
  <circle cx="32" cy="10" r="6" fill="#BDBDBD" stroke="#757575" stroke-width="2"/>
</svg>`;

const checkpointOnSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 96" width="64" height="96">
  <defs>
    <filter id="chkGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#FFD600" flood-opacity="0.9"/>
    </filter>
  </defs>
  <rect x="28" y="10" width="8" height="80" rx="3" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
  <ellipse cx="32" cy="90" rx="18" ry="6" fill="#5D4037"/>
  <path d="M36,16 Q48,10 60,18 L60,42 Q48,34 36,40 Z" fill="#FFD600" stroke="#FF6D00" stroke-width="2" filter="url(#chkGlow)"/>
  <circle cx="48" cy="27" r="6" fill="#E65100"/>
  <circle cx="32" cy="10" r="7" fill="#00E676" stroke="#00B0FF" stroke-width="2.5" filter="url(#chkGlow)"/>
</svg>`;

// 17. Finish Gate
const finishGateSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 130" width="110" height="130">
  <defs>
    <linearGradient id="goldArch" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFEE58"/>
      <stop offset="50%" stop-color="#FFD600"/>
      <stop offset="100%" stop-color="#FF9100"/>
    </linearGradient>
  </defs>
  <rect x="10" y="30" width="22" height="95" rx="6" fill="url(#goldArch)" stroke="#E65100" stroke-width="3"/>
  <rect x="78" y="30" width="22" height="95" rx="6" fill="url(#goldArch)" stroke="#E65100" stroke-width="3"/>
  <path d="M5,35 Q55,-10 105,35 L95,48 Q55,10 15,48 Z" fill="url(#goldArch)" stroke="#E65100" stroke-width="3"/>
  <circle cx="55" cy="38" r="18" fill="#FFF9C4" stroke="#FF8F00" stroke-width="2.5"/>
  <path d="M46,30 C51,28 58,29 63,35 C67,40 65,48 62,49 C60,50 59,47 60,44 C61,40 58,35 53,33 Z" fill="#FFD600" stroke="#FF8F00" stroke-width="1.5"/>
  <ellipse cx="21" cy="24" rx="6" ry="10" fill="#FF3D00"/>
  <ellipse cx="21" cy="22" rx="4" ry="7" fill="#FFEA00"/>
  <ellipse cx="89" cy="24" rx="6" ry="10" fill="#FF3D00"/>
  <ellipse cx="89" cy="22" rx="4" ry="7" fill="#FFEA00"/>
</svg>`;

// 18. Mushroom
const mushroomSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect x="24" y="32" width="16" height="28" rx="6" fill="#FFF8E1" stroke="#FFE082" stroke-width="2.5"/>
  <path d="M6,36 C6,14 58,14 58,36 C58,39 6,39 6,36 Z" fill="#FF1744" stroke="#B71C1C" stroke-width="3"/>
  <circle cx="20" cy="24" r="5" fill="#FFFFFF"/>
  <circle cx="44" cy="24" r="5" fill="#FFFFFF"/>
  <circle cx="32" cy="20" r="4" fill="#FFFFFF"/>
  <circle cx="32" cy="32" r="3.5" fill="#FFFFFF"/>
</svg>`;

// 19. Platforms
const platformGrassSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 64" width="128" height="64">
  <defs>
    <linearGradient id="dirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8D6E63"/>
      <stop offset="100%" stop-color="#4E342E"/>
    </linearGradient>
    <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#76FF03"/>
      <stop offset="100%" stop-color="#388E3C"/>
    </linearGradient>
  </defs>
  <rect x="0" y="16" width="128" height="48" rx="4" fill="url(#dirtGrad)"/>
  <circle cx="24" cy="36" r="4" fill="#6D4C41"/>
  <circle cx="88" cy="44" r="5" fill="#6D4C41"/>
  <circle cx="56" cy="50" r="3.5" fill="#6D4C41"/>
  <circle cx="108" cy="32" r="4" fill="#6D4C41"/>
  <path d="M0,0 L128,0 L128,18 Q120,24 112,18 Q104,26 96,18 Q84,28 72,18 Q60,26 48,18 Q36,26 24,18 Q12,24 0,18 Z" 
        fill="url(#grassGrad)" stroke="#1B5E20" stroke-width="2"/>
</svg>`;

const platformWoodSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 48" width="128" height="48">
  <defs>
    <linearGradient id="plankGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#BCAAA4"/>
      <stop offset="100%" stop-color="#6D4C41"/>
    </linearGradient>
  </defs>
  <rect x="2" y="4" width="38" height="38" rx="5" fill="url(#plankGrad)" stroke="#4E342E" stroke-width="2.5"/>
  <circle cx="6" cy="23" r="2.5" fill="#3E2723"/>
  <circle cx="36" cy="23" r="2.5" fill="#3E2723"/>
  <rect x="44" y="4" width="40" height="38" rx="5" fill="url(#plankGrad)" stroke="#4E342E" stroke-width="2.5"/>
  <circle cx="48" cy="23" r="2.5" fill="#3E2723"/>
  <circle cx="80" cy="23" r="2.5" fill="#3E2723"/>
  <rect x="88" y="4" width="38" height="38" rx="5" fill="url(#plankGrad)" stroke="#4E342E" stroke-width="2.5"/>
  <circle cx="92" cy="23" r="2.5" fill="#3E2723"/>
  <circle cx="122" cy="23" r="2.5" fill="#3E2723"/>
  <path d="M0,8 L128,8" stroke="#D7CCC8" stroke-width="3" stroke-dasharray="6,4"/>
</svg>`;

const platformStoneSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 64" width="128" height="64">
  <defs>
    <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFE082"/>
      <stop offset="100%" stop-color="#FFA000"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="124" height="60" rx="6" fill="url(#stoneGrad)" stroke="#E65100" stroke-width="3"/>
  <rect x="14" y="14" width="30" height="36" rx="4" fill="none" stroke="#FF6F00" stroke-width="2.5"/>
  <rect x="49" y="14" width="30" height="36" rx="4" fill="none" stroke="#FF6F00" stroke-width="2.5"/>
  <rect x="84" y="14" width="30" height="36" rx="4" fill="none" stroke="#FF6F00" stroke-width="2.5"/>
  <circle cx="29" cy="32" r="6" fill="#FF8F00"/>
  <circle cx="64" cy="32" r="6" fill="#FF8F00"/>
  <circle cx="99" cy="32" r="6" fill="#FF8F00"/>
</svg>`;

// 20. Main Game Logo
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 160" width="500" height="160">
  <defs>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF176"/>
      <stop offset="50%" stop-color="#FFD600"/>
      <stop offset="100%" stop-color="#FF6D00"/>
    </linearGradient>
    <filter id="popShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#3E2723" flood-opacity="0.8"/>
    </filter>
  </defs>
  <rect x="10" y="20" width="480" height="120" rx="24" fill="#6D4C41" stroke="#3E2723" stroke-width="7" filter="url(#popShadow)"/>
  <rect x="16" y="26" width="468" height="108" rx="18" fill="#8D6E63" stroke="#4E342E" stroke-width="3"/>
  <path d="M10,20 Q-10,5 5,-10 Q30,-5 15,20" fill="#00E676" stroke="#00B0FF" stroke-width="2"/>
  <path d="M490,20 Q510,5 495,-10 Q470,-5 485,20" fill="#00E676" stroke="#00B0FF" stroke-width="2"/>
  <text x="250" y="85" font-family="'Comic Sans MS', 'Fredoka One', 'Arial Black', cursive, sans-serif" 
        font-weight="900" font-size="54" fill="url(#titleGrad)" stroke="#3E2723" stroke-width="6" 
        text-anchor="middle" letter-spacing="2">MONKEY CHASE</text>
  <text x="250" y="118" font-family="'Comic Sans MS', 'Fredoka One', cursive, sans-serif" 
        font-weight="bold" font-size="20" fill="#FFFFFF" stroke="#D84315" stroke-width="2" 
        text-anchor="middle" letter-spacing="1">Run • Jump • Collect • Explore!</text>
</svg>`;

// Write all SVGs
const svgFiles = {
  'momo_idle.svg': momoIdleSvg,
  'momo_run.svg': momoRunSvg,
  'momo_jump.svg': momoJumpSvg,
  'momo_hurt.svg': momoHurtSvg,
  'momo_celebrate.svg': momoCelebrateSvg,
  'enemy_snake.svg': enemySnakeSvg,
  'enemy_boar.svg': enemyBoarSvg,
  'enemy_parrot.svg': enemyParrotSvg,
  'enemy_frog.svg': enemyFrogSvg,
  'banana.svg': bananaSvg,
  'star.svg': starSvg,
  'mega_banana.svg': megaBananaSvg,
  'coconut_shield.svg': coconutShieldSvg,
  'speed_banana.svg': speedBananaSvg,
  'heart.svg': heartSvg,
  'checkpoint_off.svg': checkpointOffSvg,
  'checkpoint_on.svg': checkpointOnSvg,
  'finish_gate.svg': finishGateSvg,
  'mushroom.svg': mushroomSvg,
  'platform_grass.svg': platformGrassSvg,
  'platform_wood.svg': platformWoodSvg,
  'platform_stone.svg': platformStoneSvg,
  'logo.svg': logoSvg
};

for (const [filename, content] of Object.entries(svgFiles)) {
  fs.writeFileSync(path.join(imgDir, filename), content.trim(), 'utf8');
}
console.log(`Successfully wrote ${Object.keys(svgFiles).length} SVG assets to ${imgDir}`);

// --- SYNTHESIZE CARTOON WAV SOUNDS ---
function writeWav(filename, sampleRate, samples) {
  const numChannels = 1;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34);

  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(s < 0 ? s * 0x8000 : s * 0x7FFF, 44 + i * 2);
  }

  fs.writeFileSync(path.join(sndDir, filename), buffer);
}

const SR = 22050;

// 1. Jump Sound
(() => {
  const dur = 0.22;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    const progress = t / dur;
    const freq = 260 + 540 * Math.pow(progress, 0.7);
    const env = Math.sin(Math.PI * Math.pow(progress, 0.4));
    samples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.75;
  }
  writeWav('jump.wav', SR, samples);
})();

// 1b. Land Sound ("soft pat")
(() => {
  const dur = 0.12;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    const progress = t / dur;
    const freq = 140 - 80 * progress;
    const env = Math.exp(-progress * 25);
    samples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.7;
  }
  writeWav('land.wav', SR, samples);
})();

// 2. Banana Collect
(() => {
  const dur = 0.18;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    const progress = t / dur;
    const freq = 680 + (progress > 0.4 ? 400 : 0);
    const env = Math.exp(-progress * 9);
    samples[i] = (Math.sin(2 * Math.PI * freq * t) + 0.3 * Math.sin(2 * Math.PI * freq * 2 * t)) * env * 0.8;
  }
  writeWav('banana.wav', SR, samples);
})();

// 3. Star Collect
(() => {
  const dur = 0.45;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  const notes = [523.25, 659.25, 783.99, 1046.50];
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    const noteIdx = Math.min(3, Math.floor((t / dur) * 4));
    const noteFreq = notes[noteIdx];
    const env = Math.exp(-((t % (dur / 4)) / (dur / 4)) * 6);
    samples[i] = (Math.sin(2 * Math.PI * noteFreq * t) + 0.25 * Math.sin(2 * Math.PI * noteFreq * 3 * t)) * env * 0.7;
  }
  writeWav('star.wav', SR, samples);
})();

// 4. Hurt
(() => {
  const dur = 0.35;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    const progress = t / dur;
    const freq = 420 - 260 * progress;
    const env = Math.sin(Math.PI * progress);
    const wobble = Math.sin(2 * Math.PI * 18 * t);
    samples[i] = (Math.sin(2 * Math.PI * (freq + wobble * 20) * t)) * env * 0.75;
  }
  writeWav('hurt.wav', SR, samples);
})();

// 5. Mushroom Bounce
(() => {
  const dur = 0.32;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    const progress = t / dur;
    const freq = 180 + 380 * progress + Math.sin(2 * Math.PI * 30 * t) * 40;
    const env = Math.sin(Math.PI * Math.pow(progress, 0.3)) * Math.exp(-progress * 2.5);
    samples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.8;
  }
  writeWav('mushroom.wav', SR, samples);
})();

// 6. Checkpoint Fanfare
(() => {
  const dur = 0.55;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    const freq = t < 0.2 ? 440 : (t < 0.35 ? 554.37 : 659.25);
    const env = Math.exp(-((t % 0.2) / 0.2) * 3);
    samples[i] = (Math.sin(2 * Math.PI * freq * t) + 0.3 * Math.sin(2 * Math.PI * freq * 2 * t)) * env * 0.7;
  }
  writeWav('checkpoint.wav', SR, samples);
})();

// 7. Power-up
(() => {
  const dur = 0.4;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    const progress = t / dur;
    const freq = 350 + 650 * progress;
    const env = Math.sin(Math.PI * progress);
    samples[i] = (Math.sin(2 * Math.PI * freq * t) + 0.4 * Math.sin(2 * Math.PI * freq * 1.5 * t)) * env * 0.7;
  }
  writeWav('powerup.wav', SR, samples);
})();

// 8. Level Complete
(() => {
  const dur = 1.0;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  const notes = [523.25, 523.25, 659.25, 783.99, 1046.50];
  const times = [0, 0.18, 0.36, 0.54, 0.75];
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    let nIdx = 0;
    for (let k = 0; k < times.length; k++) {
      if (t >= times[k]) nIdx = k;
    }
    const freq = notes[nIdx];
    const localT = t - times[nIdx];
    const env = Math.exp(-localT * 4);
    samples[i] = (Math.sin(2 * Math.PI * freq * t) + 0.3 * Math.sin(2 * Math.PI * freq * 2 * t)) * env * 0.75;
  }
  writeWav('levelcomplete.wav', SR, samples);
})();

// 9. Button Click
(() => {
  const dur = 0.08;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    const freq = 700 - 300 * (t / dur);
    const env = Math.exp(-t * 40);
    samples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.8;
  }
  writeWav('click.wav', SR, samples);
})();

// 10. Game Over
(() => {
  const dur = 1.2;
  const count = Math.floor(dur * SR);
  const samples = new Float32Array(count);
  const freqs = [330, 311, 293, 277];
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    const step = Math.min(3, Math.floor((t / dur) * 4));
    const freq = freqs[step];
    const wobble = Math.sin(2 * Math.PI * 8 * t) * 6;
    const env = Math.sin(Math.PI * ((t % 0.3) / 0.3));
    samples[i] = Math.sin(2 * Math.PI * (freq + wobble) * t) * env * 0.7;
  }
  writeWav('gameover.wav', SR, samples);
})();

console.log(`Successfully generated 10 child-friendly WAV sound files in ${sndDir}`);
