'use strict';

const { spawn } = require('node:child_process');
const http = require('node:http');

const child = spawn(process.execPath, ['server.js'], {
  cwd: __dirname,
  env: {
    ...process.env,
    HOST: '127.0.0.1',
    PORT: '4199',
    APP_NAME: 'ZTR Backend Smoke Test',
    NODE_ENV: 'test'
  },
  stdio: ['ignore', 'pipe', 'pipe']
});

let finished = false;

function done(code, message) {
  if (finished) return;
  finished = true;
  console.log(message);
  child.kill('SIGTERM');
  setTimeout(() => process.exit(code), 300);
}

setTimeout(() => {
  http.get('http://127.0.0.1:4199/health', (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      if (res.statusCode === 200 && body.includes('"status": "online"')) {
        done(0, 'Smoke test OK');
      } else {
        done(1, `Smoke test falhou: HTTP ${res.statusCode}`);
      }
    });
  }).on('error', (err) => done(1, `Smoke test falhou: ${err.message}`));
}, 500);

setTimeout(() => done(1, 'Smoke test expirou'), 5000);
