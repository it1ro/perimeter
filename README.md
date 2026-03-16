# Периметр

Образовательный сайт о личных границах. Помогает разобраться в теме через статьи, интерактивные тесты и инфографику.

**Домен:** [периметр.рф](https://xn--e1afmkfd.xn--p1ai)

## Технологический стек

- **Next.js 14** (App Router, статический экспорт)
- **React 18**
- **TypeScript 5**
- **Tailwind CSS 3** + `@tailwindcss/typography`
- **Framer Motion** — анимации
- **gray-matter** + **react-markdown** + **remark-gfm** — рендеринг Markdown-статей
- **Lucide React** — иконки
- **GitHub Pages** — хостинг
- **GitHub Actions** — CI/CD

## Структура проекта

```
perimeter/
├── .github/workflows/deploy.yml   # CI/CD для GitHub Pages
├── content/articles/              # Markdown-статьи
├── data/tests/                    # JSON-тесты (квизы)
├── public/                        # Статические файлы (изображения, robots.txt)
├── src/
│   ├── app/                       # Страницы (Next.js App Router)
│   ├── components/                # React-компоненты
│   ├── lib/                       # Утилиты (загрузка статей и тестов)
│   └── types/                     # TypeScript-типы
├── next.config.mjs                # Конфигурация Next.js
├── tailwind.config.ts             # Конфигурация Tailwind CSS
└── package.json
```

## Локальная разработка

### Требования

- Node.js >= 18
- npm

### Установка и запуск

```bash
# Клонировать репозиторий
git clone https://github.com/<username>/perimeter.git
cd perimeter

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

Сайт будет доступен по адресу `http://localhost:3000`.

### Основные команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера с hot reload |
| `npm run build` | Сборка production-версии (статический экспорт в `out/`) |
| `npm run lint` | Проверка кода через ESLint |
| `npx serve out` | Локальный просмотр production-сборки |

### Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните:

```env
NEXT_PUBLIC_BASE_PATH=        # Префикс пути (для GitHub Pages, например /perimeter)
NEXT_PUBLIC_METRIKA_ID=       # ID счётчика Яндекс.Метрики
```

## Как добавить статью

Статьи хранятся в `content/articles/` как Markdown-файлы с YAML-frontmatter.

### 1. Создайте файл

```
content/articles/my-new-article.md
```

### 2. Добавьте frontmatter

```yaml
---
title: "Название статьи"
slug: "my-new-article"
date: "2026-03-16"
description: "Краткое описание статьи для SEO и карточки."
tags: ["Тег1", "Тег2"]
cover: ""
---
```

| Поле | Тип | Обязательное | Описание |
|------|-----|:------------:|----------|
| `title` | `string` | да | Заголовок статьи |
| `slug` | `string` | да | URL-слаг (должен совпадать с именем файла без `.md`) |
| `date` | `string` | да | Дата публикации в формате `YYYY-MM-DD` |
| `description` | `string` | да | Описание для SEO и превью |
| `tags` | `string[]` | да | Массив тегов для фильтрации |
| `cover` | `string` | нет | Путь к обложке |
| `readingTime` | `string` | нет | Время чтения (например, `"5 мин"`) |

### 3. Напишите контент

Под frontmatter пишите обычный Markdown. Поддерживается GFM (таблицы, зачёркивание, автоссылки).

```markdown
## Подзаголовок

Текст статьи с **жирным** и *курсивом*.

- Список
- Пунктов

> Цитата
```

### 4. Пересоберите сайт

```bash
npm run build
```

Новая статья автоматически появится на странице `/articles/` и в `sitemap.xml`.

## Как добавить тест

Тесты хранятся в `data/tests/` как JSON-файлы.

### 1. Создайте файл

```
data/tests/my-test-id.json
```

### 2. Заполните по схеме

```json
{
  "id": "my-test-id",
  "title": "Название теста",
  "description": "Описание теста.",
  "questions": [
    {
      "id": "q1",
      "text": "Текст вопроса?",
      "options": [
        { "id": "q1a", "text": "Вариант ответа A", "score": 0 },
        { "id": "q1b", "text": "Вариант ответа B", "score": 1 },
        { "id": "q1c", "text": "Вариант ответа C", "score": 2 }
      ]
    }
  ],
  "results": [
    {
      "minScore": 0,
      "maxScore": 5,
      "title": "Результат для низкого балла",
      "description": "Описание результата."
    },
    {
      "minScore": 6,
      "maxScore": 10,
      "title": "Результат для высокого балла",
      "description": "Описание результата."
    }
  ]
}
```

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | `string` | Уникальный идентификатор (совпадает с именем файла без `.json`) |
| `title` | `string` | Название теста |
| `description` | `string` | Описание теста |
| `questions` | `QuizQuestion[]` | Массив вопросов |
| `questions[].id` | `string` | Уникальный ID вопроса |
| `questions[].text` | `string` | Текст вопроса |
| `questions[].options` | `QuizOption[]` | Варианты ответа |
| `options[].id` | `string` | Уникальный ID варианта |
| `options[].text` | `string` | Текст варианта |
| `options[].score` | `number` | Баллы за выбор этого варианта |
| `results` | `QuizResult[]` | Массив результатов (диапазоны баллов) |
| `results[].minScore` | `number` | Минимальный балл диапазона |
| `results[].maxScore` | `number` | Максимальный балл диапазона |
| `results[].title` | `string` | Заголовок результата |
| `results[].description` | `string` | Описание результата |

Диапазоны `minScore`–`maxScore` должны покрывать все возможные суммы баллов без пересечений.

### 3. Пересоберите сайт

```bash
npm run build
```

Новый тест появится на `/tests/` и в `sitemap.xml`.

## Деплой

### Как работает GitHub Actions

Деплой автоматический: каждый push в ветку `main` запускает workflow `.github/workflows/deploy.yml`:

1. Checkout кода
2. Установка Node.js 20 и зависимостей (`npm ci`)
3. Сборка (`npm run build`) с передачей `NEXT_PUBLIC_BASE_PATH` из переменных репозитория
4. Загрузка содержимого `out/` как артефакта GitHub Pages
5. Деплой через `actions/deploy-pages@v4`

### Настройка basePath

Если репозиторий деплоится НЕ в корень домена (например, `username.github.io/perimeter`), нужно задать `basePath`:

1. Перейдите в **Settings** -> **Variables** -> **Repository variables** в GitHub
2. Создайте переменную `NEXT_PUBLIC_BASE_PATH` со значением `/perimeter` (ваш путь)
3. Все ссылки, изображения и ресурсы автоматически получат этот префикс

Для деплоя на собственный домен (например, периметр.рф) оставьте `NEXT_PUBLIC_BASE_PATH` пустой.

### Настройка GitHub Pages

1. В настройках репозитория перейдите в **Settings** -> **Pages**
2. В разделе **Source** выберите **GitHub Actions**
3. Для кастомного домена укажите его в поле **Custom domain** и добавьте CNAME-запись в DNS

## Дальнейшее развитие

- **Комментарии** — интеграция [Giscus](https://giscus.app/) для обсуждений под статьями через GitHub Discussions
- **Интерактивные сценарии** — пошаговые ситуации с ветвлением для практики установки границ
- **Поиск по сайту** — клиентский поиск через [Fuse.js](https://www.fusejs.io/) по статьям и тестам
- **Миграция на Flutter** — перенос проекта на Flutter Web для единой кодовой базы с мобильным приложением

## Лицензия

Проект создан в образовательных целях.
