# 🏗️ Спринт 1: Основа (Инфраструктура + Layout)

> **Спринт:** 1 из 7
> **Даты:** ДД.ММ.ГГГГ — ДД.ММ.ГГГГ
> **Статус:** 📅 Запланировано

---

## 🎯 Цель спринта

Развернуть проект Next.js с полной конфигурацией (TypeScript, Tailwind CSS, ESLint, Prettier), настроить CI/CD через GitHub Actions для автоматического деплоя на GitHub Pages, создать корневой layout с адаптивным Header/Footer и набор базовых UI-компонентов. К концу спринта сайт должен собираться, деплоиться и отображать пустую, но стилизованную оболочку на всех устройствах.

---

## 📋 Задачи

### Инициализация проекта

- [ ] 📅 Запланировано — Создать проект Next.js 14+ с TypeScript (`npx create-next-app@latest --typescript --app`)
- [ ] 📅 Запланировано — Настроить `next.config.ts`: `output: 'export'`, `basePath` через env, `images: { unoptimized: true }`, `trailingSlash: true`
- [x] ✅ Выполнено — Настроить Tailwind CSS: кастомная палитра (шалфей `#7C9A8E`, синий `#6B8DAE`, терракот `#C4836A`, фоны, текст), брейкпоинты mobile-first
- [x] ✅ Выполнено — Подключить шрифты Manrope и Inter через `next/font/google`
- [x] ✅ Выполнено — Настроить `globals.css` с Tailwind directives и базовыми кастомными стилями
- [ ] 📅 Запланировано — Настроить ESLint (`eslint-config-next`) и Prettier (`prettier-plugin-tailwindcss`)
- [ ] 📅 Запланировано — Настроить `tsconfig.json` (strict mode, path aliases `@/`)

### Структура проекта

- [ ] 📅 Запланировано — Создать базовую структуру папок: `src/app`, `src/components`, `src/lib`, `src/types`, `src/styles`
- [ ] 📅 Запланировано — Создать папки для контента: `content/articles`, `data/tests`
- [ ] 📅 Запланировано — Создать папки для ассетов: `public/images/infographics`, `public/images/og`, `public/images/icons`

### CI/CD и деплой

- [ ] 📅 Запланировано — Создать GitHub-репозиторий
- [ ] 📅 Запланировано — Настроить `.github/workflows/deploy.yml` для автоматической сборки и деплоя на GitHub Pages при push в `main`
- [ ] 📅 Запланировано — Добавить `.gitignore`, `.env.example` (с `NEXT_PUBLIC_BASE_PATH`)
- [ ] 📅 Запланировано — Проверить успешный деплой пустой страницы на GitHub Pages

### Корневой Layout

- [ ] 📅 Запланировано — Создать `src/app/layout.tsx`: подключение шрифтов, глобальные метаданные (`title`, `description`), структура `<Header />` + `<main>` + `<Footer />`
- [ ] 📅 Запланировано — Создать `src/components/layout/Header.tsx`: логотип, навигация (ссылки на разделы), mobile-first
- [ ] 📅 Запланировано — Создать `src/components/layout/MobileMenu.tsx`: hamburger-кнопка, выдвижное меню с анимацией
- [ ] 📅 Запланировано — Создать `src/components/layout/Footer.tsx`: навигационные ссылки, копирайт
- [ ] 📅 Запланировано — Создать `src/components/layout/Breadcrumbs.tsx` (базовая версия)

### Базовые UI-компоненты

- [ ] 📅 Запланировано — Создать `src/components/ui/Button.tsx`: варианты (primary, secondary, outline), размеры, состояния
- [ ] 📅 Запланировано — Создать `src/components/ui/Card.tsx`: универсальная карточка с тенью, hover-эффектом
- [ ] 📅 Запланировано — Создать `src/components/ui/Tag.tsx`: компонент тега для фильтрации (активный/неактивный)
- [ ] 📅 Запланировано — Создать `src/components/ui/Toast.tsx`: уведомления (успех, ошибка, информация)
- [ ] 📅 Запланировано — Создать `src/components/ui/CopyButton.tsx`: кнопка копирования текста в буфер обмена

### Проверка

- [ ] 📅 Запланировано — Убедиться, что `next build` проходит без ошибок
- [ ] 📅 Запланировано — Проверить адаптивность Header/Footer на мобильных breakpoints
- [ ] 📅 Запланировано — Убедиться, что статический экспорт (`out/`) корректен

---

## 📦 Результаты спринта

_Раздел будет заполнен после завершения спринта._
