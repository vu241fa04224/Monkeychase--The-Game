# MONKEY CHASE 🐒🍌

**"Run • Jump • Collect • Explore!"**

A complete, polished, child-friendly 2D cartoon adventure platformer game designed for **GDevelop 5** and **Instant Web Play**.

---

## 🌟 Highlights & Features

- 🐵 **Playable Character (Momo)**:
  - Full cartoon animation set: Idle, Run, Jump, Fall, Land, Double Jump, Hurt ("Oops!"), Celebrate, Victory.
  - Expressive cartoon face, big joyful eyes, curled tail, squash & stretch physics.
  - Responsive controls with **Coyote Time** (0.1s jump forgiveness) and **Jump Buffering**.
- 🌴 **5 Handcrafted Progressive Levels**:
  - **Level 1: Sunny Jungle** (Tutorial signs, gentle rolling hills, Sleepy Snake, easy banana trails).
  - **Level 2: Waterfall Woods** (Moving suspension platforms, water gaps, bounce mushrooms, Mischievous Parrots).
  - **Level 3: Monkey Mountain** (Vertical platforms, cliffs, Funny Wild Boar, Speed Banana boost).
  - **Level 4: Mystery Jungle** (Secret canopy trails, Jumping Frogs, Coconut Shield, hidden stars).
  - **Level 5: Golden Banana Temple** (Ancient stone ruins, Mega Banana 2X, grand finish altar with the Golden Banana).
- 🍌 **Bananas & Hidden Stars**:
  - Over 110 bananas placed in guiding trails across the 5 levels (+10 score popups, sparkles, chime sounds).
  - 3 Hidden Stars per level (15 total: Easy, Medium, and Secret locations).
- ⚡ **Fun Cartoon Power-Ups**:
  - 🍌 **Mega Banana**: 2X points multiplier for 10 seconds.
  - ⭐ **Star Power**: Temporary invincibility with rainbow aura.
  - 🛡️ **Coconut Shield**: Protects Momo from one hit without losing health.
  - ⚡ **Speed Banana**: 1.5x running speed with lightning trail.
  - ❤️ **Heart**: Restores 1 health point.
- 🐍 **Cute Cartoon Enemies**:
  - 🐍 **Sleepy Snake**: Gently patrols left and right.
  - 🐗 **Funny Wild Boar**: Chubby piggy boar that runs slowly toward Momo when close.
  - 🦜 **Mischievous Parrot**: Flaps horizontally with sine-wave swoop.
  - 🐸 **Jumping Frog**: Hops periodically with cheerful croak.
  - *Stomping an enemy or touching with Star Power pops them away safely!*
- ❤️ **Health, Checkpoints & Forgiving Design**:
  - 3 Hearts HUD.
  - Damage triggers funny "Oops!" knockback and 1.5s invincibility frames.
  - 🏁 Checkpoints save progress mid-level with fanfare; losing all health or falling respawns at the checkpoint with full hearts. No permanent game-overs or stuck states.
- 🎵 **Child-Friendly Audio Design**:
  - Pure zero-latency Web Audio cartoon synthesizer for boings, pops, chimes, fanfares, and wah-wahs.
  - Cheerful tropical background music (marimba, drums, playful melody) that loops seamlessly.
  - Settings options to mute/unmute Music and Sound Effects independently.
- 📱 **Responsive & Mobile Touch Controls**:
  - Automatic on-screen touch d-pad (◀ ▶ ⬆ ⏸) on tablets and phones.
  - Crisp scalable canvas that maintains correct aspect ratio on all screen sizes.
- 💾 **Persistent Save System**:
  - Automatically saves unlocked levels (1 through 5), high scores, stars collected, achievements, and audio settings in `localStorage`.
- 🏆 **Achievement System**:
  - 🍌 Banana Collector (100 bananas)
  - ⭐ Star Hunter (10 stars)
  - 🏃 Speed Runner (Level in under 45s)
  - 🌴 Jungle Explorer (Complete all 5 levels)
  - 🏆 Monkey Master (All 15 stars)

---

## 🎮 How to Play

### Option 1: Instant Browser Play (Recommended)
1. **Windows Quick Launch**: Double click `play.bat` in this folder.
   - Or open terminal in this folder and run:
     ```bash
     npm start
     ```
2. Open your web browser at:
   ```
   http://localhost:8080
   ```

### Option 2: Open in GDevelop 5
1. Launch **GDevelop 5** (Desktop application or web editor at [editor.gdevelop.io](https://editor.gdevelop.io)).
2. Click **"Open a project"**.
3. Select the file:
   ```
   c:\Users\Admin\Desktop\monkeychase\game.json
   ```
4. All 10 scenes, objects, behaviors (`PlatformerObject`, `Platform`), events, and resources will be loaded!

---

## 🕹️ Controls

| Action | Keyboard | Touch / Mobile |
|---|---|---|
| **Move Left** | `◀` or `A` | On-screen `◀` |
| **Move Right** | `▶` or `D` | On-screen `▶` |
| **Jump / Double Jump** | `Space` / `▲` / `W` | On-screen `⬆` |
| **Pause Game** | `ESC` / `P` | On-screen `⏸` |

---

## 📁 Project Structure

```
monkeychase/
├── game.json                  # Official GDevelop 5 project file
├── index.html                 # Standalone responsive playable HTML5 game
├── style.css                  # Cartoon styling, animations, and modal UI
├── server.js                  # Lightweight local development & play server
├── play.bat                   # 1-click Windows launcher
├── package.json               # Project manifest and test runner
├── assets/
│   ├── images/                # 31 cartoon SVG sprites & backgrounds
│   └── sounds/                # 11 child-friendly WAV sound effects
├── js/
│   ├── audio.js               # Web Audio cartoon SFX and tropical music
│   ├── camera.js              # 4-layer parallax camera with lookahead
│   ├── enemies.js             # Snake, Boar, Parrot, and Frog behaviors
│   ├── game.js                # 60fps main loop and state coordinator
│   ├── items.js               # Bananas, Stars, Power-ups, Checkpoints, Finish
│   ├── levels.js              # 5 handcrafted progressive levels
│   ├── particles.js           # Sparkles, dust, and victory confetti
│   ├── physics.js             # Platformer physics, coyote time & mushrooms
│   ├── player.js              # Momo player controller and animations
│   ├── sprites.js             # Asset caching and squash & stretch renderer
│   ├── storage.js             # Persistent save system for progress & settings
│   └── ui.js                  # Main Menu, Level Select, HUD, Victory screens
└── scripts/
    ├── build_assets.js        # Cartoon vector asset & sound generator
    ├── build_scenery.js       # Parallax layer generator
    ├── build_gdevelop_project.js # GDevelop 5 game.json generator
    ├── test_project.js        # 59-point automated verification suite
    └── test_server.js         # HTTP asset serving verification
```

---

## 🧪 Automated Tests

Run the full verification suite anytime:
```bash
npm test
```
All 59 automated integrity checks pass (GDevelop project schema, asset existence, audio headers, JavaScript syntax, and level configurations).
