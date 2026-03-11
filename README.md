# AutoSalon Fullstack (Учебный проект)

Полноценный учебный fullstack-проект автосалона:
- Frontend: React + TypeScript + Vite + Tailwind
- Backend: Node.js + Express + TypeScript
- БД: PostgreSQL
- ORM: Prisma
- Auth: JWT

## Структура

```text
.
├── backend
│   ├── prisma
│   │   ├── migrations
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── types
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   │   ├── admin
│   │   │   └── public
│   │   ├── types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Возможности

### Публичная часть
- Главная страница и карточки авто
- Каталог с фильтрацией
- Страница отдельного автомобиля
- Форма заявки
- Форма записи на тест-драйв

### Админка
- Логин администратора
- Dashboard
- CRUD автомобилей
- Просмотр заявок
- Просмотр тест-драйвов

## Запуск

### 1. База данных
Создайте БД PostgreSQL, например `autosalon`.

### 2. Backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

Backend: `http://localhost:5000`

### 3. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Тестовый администратор
- login: `admin`
- password: `admin123`

> Пароль в БД хранится только в виде hash (см. `prisma/seed.ts`).
