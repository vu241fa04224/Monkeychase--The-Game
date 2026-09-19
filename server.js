/**
 * MONKEY CHASE - Local Web Server
 * Run `node server.js` and open http://localhost:8080 in any web browser to play!
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const rootDir = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(rootDir, reqPath);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log('       🐒🍌 MONKEY CHASE GAME IS RUNNING! 🐒🍌      ');
  console.log('====================================================');
  console.log(`\n👉 Open your browser at: http://localhost:${PORT}`);
  console.log('   Press Ctrl+C in this terminal to stop the server.\n');
});
