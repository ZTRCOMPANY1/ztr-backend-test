'use strict';

const http = require('node:http');
const os = require('node:os');

const PORT = Number(process.env.PORT || 4100);
const HOST = process.env.HOST || '127.0.0.1';
const APP_NAME = process.env.APP_NAME || 'ZTR Backend Test';

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);

  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });

  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'GET' && url.pathname === '/') {
    return sendJson(res, 200, {
      message: 'ZTR Backend Cloud deploy funcionando!',
      app: APP_NAME,
      version: '1.0.0',
      hostname: os.hostname(),
      port: PORT,
      uptimeSeconds: Math.floor(process.uptime())
    });
  }

  if (req.method === 'GET' && url.pathname === '/health') {
    return sendJson(res, 200, {
      status: 'online',
      app: APP_NAME,
      version: '1.0.0',
      uptimeSeconds: Math.floor(process.uptime())
    });
  }

  if (req.method === 'GET' && url.pathname === '/api/test') {
    return sendJson(res, 200, {
      ok: true,
      message: 'API de teste respondendo corretamente.',
      node: process.version,
      platform: process.platform,
      architecture: process.arch,
      environment: process.env.NODE_ENV || 'development'
    });
  }

  return sendJson(res, 404, {
    error: 'not_found',
    path: url.pathname
  });
});

server.listen(PORT, HOST, () => {
  console.log(`${APP_NAME} online em http://${HOST}:${PORT}`);
});

function shutdown(signal) {
  console.log(`${signal} recebido. Encerrando...`);

  server.close(() => {
    console.log('Servidor encerrado.');
    process.exit(0);
  });

  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
