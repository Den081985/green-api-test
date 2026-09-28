# MAX Chat · GREEN-API

## Локальный запуск

Требуется Node.js 22.12+ и npm.

Установите зависимости:

```bash
npm ci
```

Запустите приложение в режиме разработки:

```bash
npm run dev
```

Откройте в браузере http://localhost:3000.

В форме авторизации укажите `apiUrl`, `idInstance` и `apiTokenInstance` из кабинета GREEN-API.

При необходимости перед запуском скопируйте `.env.example` в `.env`. Переменная `VITE_API_BASE_URL` задаёт начальное значение поля API URL, а `VITE_HTTP_BASE_TIMEOUT` — таймаут запроса.

## Локальный запуск через Docker

Требуется Docker с Compose.

```bash
docker compose up --build
```

Откройте в браузере http://localhost:3000. Остановить контейнер можно командой:

```bash
docker compose down
```
