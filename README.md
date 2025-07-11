# Notion Vibe

Notion Vibe — это современный веб-органайзер для управления списками дел и задачами с поддержкой аутентификации и
синхронизации данных для каждого пользователя.

## 🚀 Технологии

- **Next.js** (App Router)
- **TypeScript**
- **React**
- **Tailwind CSS**
- **Zustand** (глобальное состояние + persist)
- **Prisma** (ORM)
- **MongoDB** (база данных)
- **Clerk** (аутентификация)
- **react-hook-form** + **zod** (валидация форм)
- **Axios** (запросы к API)

## ✨ Возможности

- CRUD для списков и задач
- Каждый пользователь видит только свои списки и задачи
- Современный UI с адаптивной версткой
- Синхронизация данных между сервером и локальным хранилищем
- Валидация форм и удобное управление задачами

## ⚡️ Как запустить проект

1. **Клонируйте репозиторий:**
   ```bash
   git clone <repo-url>
   cd notion
   ```
2. **Установите зависимости:**
   ```bash
   npm install
   # или
   yarn install
   ```
3. **Настройте переменные окружения:**
   - Создайте файл `.env` на основе `.env.example` (если есть)
   - Укажите параметры подключения к MongoDB и Clerk

4. **Примените миграции Prisma:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. **Запустите dev-сервер:**
   ```bash
   npm run dev
   # или
   yarn dev
   ```
6. **Откройте приложение:** Перейдите в браузере по адресу [http://localhost:3000](http://localhost:3000)

---

## 📝 Структура проекта

- `app/` — страницы, API-роуты, layout
- `components/ui/` — UI-компоненты (Sidebar, Header, TaskList, Loader и др.)
- `hooks/` — кастомные хуки для работы с задачами и списками
- `lib/` — инициализация Prisma
- `prisma/` — схема базы данных
- `types/` — общие типы

---


