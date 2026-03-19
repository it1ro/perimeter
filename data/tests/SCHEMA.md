# Схема тестов v3 (UX-контракт)

Этот документ фиксирует единый контракт JSON-тестов и правила миграции.

## Обязательные поля

- `id: string` — уникальный идентификатор (совпадает с именем файла).
- `title: string` — название теста.
- `description: string` — краткое описание.
- `questions: QuizQuestion[]` — список вопросов.
- `results: QuizResult[]` — диапазоны итогов.

## Рекомендуемые поля

- `version: string` — версия теста для кэша/персиста.
- `instructions: string` — текст перед стартом.
- `scoring` — служебная информация по скорингу.
- `dimensionResults` — словарь описаний по уровням (`low`, `medium`, `high`).

## Новый UX-контракт

Поле `ux` задает единое поведение UI. Если поле не задано, применяются дефолты из загрузчика.

```json
{
  "ux": {
    "disclaimers": {
      "intro": "Полный дисклеймер до старта",
      "inProgress": "Короткая строка в процессе",
      "result": "Полный дисклеймер на результате",
      "resultNote": "Результат не является диагнозом..."
    },
    "optionOrder": {
      "lockGradatedScales": true,
      "defaultShuffleOptions": true
    },
    "resultLabels": {
      "weeklyActionsTitle": "Что сделать в ближайшую неделю",
      "strengthsTitle": "Сильные стороны",
      "growthZonesTitle": "Зоны роста",
      "dimensionsTitle": "Разрез по измерениям"
    }
  }
}
```

## Правила порядка опций

- Если `ux.optionOrder.lockGradatedScales = true`, градуированные шкалы (например, `0..3`) всегда показываются в исходном порядке.
- Для остальных вопросов `shuffleOptions` берется из вопроса.
- Если `shuffleOptions` в вопросе отсутствует, используется `ux.optionOrder.defaultShuffleOptions`.

## Миграция v2 -> v3

### Что можно сделать автоматически

- Перенести:
  - `disclaimer` -> `ux.disclaimers.intro` и `ux.disclaimers.result`;
  - `disclaimerShort` -> `ux.disclaimers.inProgress`.
- Добавить `ux.disclaimers.resultNote` со значением по умолчанию.
- Добавить блок `ux.resultLabels` со стандартными подписями.
- Добавить `ux.optionOrder` со значениями:
  - `lockGradatedScales: true`
  - `defaultShuffleOptions: true`

### Что проверяется вручную

- Тексты дисклеймеров и подписи блоков результата для конкретного теста.
- Семантика инверсных (`reverse`) вопросов после выравнивания порядка опций.
- Корректность диапазонов `results` и покрытие всей шкалы.

### Обратная совместимость

- Старые поля `disclaimer` и `disclaimerShort` пока поддерживаются как fallback.
- Для новых тестов используйте `ux` как основной источник настроек.
