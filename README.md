# ZTR Backend Test

Backend Node.js mínimo criado para testar a **ZTR Backend Cloud**.

## Rotas

- `GET /` — confirma que o deploy está funcionando
- `GET /health` — health check
- `GET /api/test` — informações básicas do runtime

## Configuração recomendada no painel

- **Nome:** ZTR Backend Test
- **Slug:** `ztr-backend-test`
- **Runtime:** Node.js
- **Branch:** `main`
- **Root directory:** `.`
- **Install command:** `npm ci --omit=dev`
- **Build command:** deixe vazio
- **Start command:** `npm start`
- **Health check:** `/health`

## Variáveis de ambiente

- `HOST=127.0.0.1`
- `APP_NAME=ZTR Backend Test`
- `NODE_ENV=production`

Não defina `PORT` manualmente se a ZTR Backend Cloud já atribuir a porta automaticamente.

## Teste local

```bash
npm ci --omit=dev
npm start
```

Depois:

```bash
curl http://127.0.0.1:4100/health
```
