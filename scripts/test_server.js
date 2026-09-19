const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(rootDir, reqPath);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found: ' + reqPath);
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  console.log(`Test server running at http://127.0.0.1:${port}`);

  const endpoints = [
    '/',
    '/style.css',
    '/js/storage.js',
    '/js/audio.js',
    '/js/sprites.js',
    '/js/particles.js',
    '/js/physics.js',
    '/js/player.js',
    '/js/enemies.js',
    '/js/items.js',
    '/js/camera.js',
    '/js/levels.js',
    '/js/ui.js',
    '/js/game.js',
    '/assets/images/logo.svg',
    '/assets/images/momo_idle.svg',
    '/assets/sounds/jump.wav',
    '/game.json'
  ];

  let failed = 0;
  for (const ep of endpoints) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}${ep}`);
      if (res.status === 200) {
        console.log(`  ✅ 200 OK: ${ep}`);
      } else {
        console.error(`  ❌ FAIL: ${ep} returned ${res.status}`);
        failed++;
      }
    } catch (e) {
      console.error(`  ❌ ERROR fetching ${ep}: ${e.message}`);
      failed++;
    }
  }

  server.close(() => {
    if (failed === 0) {
      console.log('\nAll server HTTP asset checks passed with 200 OK!');
      process.exit(0);
    } else {
      console.error(`\n${failed} endpoints failed.`);
      process.exit(1);
    }
  });
});
