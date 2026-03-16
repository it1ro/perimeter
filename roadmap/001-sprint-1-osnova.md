# 🏗️ Спринт 1: Основа (Инфраструктура + Layout)

> **Спринт:** 1 из 7
> **Даты:** ДД.ММ.ГГГГ — ДД.ММ.ГГГГ
> **Статус:** ✅ Завершено

---

## 🎯 Цель спринта

Развернуть проект Next.js с полной конфигурацией (TypeScript, Tailwind CSS, ESLint, Prettier), настроить CI/CD через GitHub Actions для автоматического деплоя на GitHub Pages, создать корневой layout с адаптивным Header/Footer и набор базовых UI-компонентов. К концу спринта сайт должен собираться, деплоиться и отображать пустую, но стилизованную оболочку на всех устройствах.

---

## 📋 Задачи

### Инициализация проекта

- [x] ✅ Выполнено — Создать проект Next.js 14+ с TypeScript (`npx create-next-app@latest --typescript --app`)
- [x] ✅ Выполнено — Настроить `next.config.mjs`: `output: 'export'`, `basePath` через env, `images: { unoptimized: true }`, `trailingSlash: true`
- [x] ✅ Выполнено — Настроить Tailwind CSS: кастомная палитра (шалфей `#7C9A8E`, синий `#6B8DAE`, терракот `#C4836A`, фоны, текст), брейкпоинты mobile-first
- [x] ✅ Выполнено — Подключить шрифты Manrope и Inter через `next/font/google`
- [x] ✅ Выполнено — Настроить `globals.css` с Tailwind directives и базовыми кастомными стилями
- [x] ✅ Выполнено — Настроить ESLint (`eslint-config-next`) и Prettier (`prettier-plugin-tailwindcss`)
- [x] ✅ Выполнено — Настроить `tsconfig.json` (strict mode, path aliases `@/`)

### Структура проекта

- [x] ✅ Выполнено — Создать базовую структуру папок: `src/app`, `src/components`, `src/lib`, `src/types`, `src/styles`
- [x] ✅ Выполнено — Создать папки для контента: `content/articles`, `data/tests`
- [x] ✅ Выполнено — Создать папки для ассетов: `public/images/infographics`, `public/images/og`, `public/images/icons`

### CI/CD и деплой

- [ ] 📅 Запланировано — Создать GitHub-репозиторий
- [x] ✅ Выполнено — Настроить `.github/workflows/deploy.yml` для автоматической сборки и деплоя на GitHub Pages при push в `main`
- [x] ✅ Выполнено — Добавить `.gitignore`, `.env.example` (с `NEXT_PUBLIC_BASE_PATH`)
- [ ] 📅 Запланировано — Проверить успешный деплой пустой страницы на GitHub Pages

### Корневой Layout

- [x] ✅ Выполнено — Создать `src/app/layout.tsx`: подключение шрифтов, глобальные метаданные (`title`, `description`), структура `<Header />` + `<main>` + `<Footer />`
- [x] ✅ Выполнено — Создать `src/components/layout/Header.tsx`: логотип, навигация (ссылки на разделы), mobile-first
- [x] ✅ Выполнено — Создать `src/components/layout/MobileMenu.tsx`: hamburger-кнопка, выдвижное меню с анимацией
- [x] ✅ Выполнено — Создать `src/components/layout/Footer.tsx`: навигационные ссылки, копирайт
- [x] ✅ Выполнено — Создать `src/components/layout/Breadcrumbs.tsx` (базовая версия)

### Базовые UI-компоненты

- [x] ✅ Выполнено — Создать `src/components/ui/Button.tsx`: варианты (primary, secondary, outline), размеры, состояния
- [x] ✅ Выполнено — Создать `src/components/ui/Card.tsx`: универсальная карточка с тенью, hover-эффектом
- [x] ✅ Выполнено — Создать `src/components/ui/Tag.tsx`: компонент тега для фильтрации (активный/неактивный)
- [x] ✅ Выполнено — Создать `src/components/ui/Toast.tsx`: уведомления (успех, ошибка, информация)
- [x] ✅ Выполнено — Создать `src/components/ui/CopyButton.tsx`: кнопка копирования текста в буфер обмена

### Проверка

- [x] ✅ Выполнено — Убедиться, что `next build` проходит без ошибок
- [x] ✅ Выполнено — Проверить адаптивность Header/Footer на мобильных breakpoints
- [x] ✅ Выполнено — Убедиться, что статический экспорт (`out/`) корректен

---

## 📦 Результаты спринта

- Проект Next.js 14 с TypeScript, Tailwind CSS, ESLint, Prettier полностью настроен
- Конфиг `next.config.mjs` с `output: 'export'` и `basePath` через переменную окружения
- CI/CD через GitHub Actions: автодеплой на GitHub Pages при push в `main`
- Корневой layout с адаптивным Header (sticky, backdrop blur), выдвижным MobileMenu и Footer
- Базовые UI-компоненты: Button (3 варианта), Card (hoverable), Tag (active/inactive), Toast (success/error/info), CopyButton
- `next build` проходит чисто — статический экспорт в `out/` корректен
- Осталось: создать GitHub-репозиторий и проверить реальный деплой на GitHub Pages
