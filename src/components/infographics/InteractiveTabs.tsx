'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Shield, Heart, Lightbulb, Clock, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface BoundaryType {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
  examples: string[];
  tip: string;
}

const boundaryTypes: BoundaryType[] = [
  {
    id: 'physical',
    label: 'Физические',
    icon: Shield,
    color: 'text-sage',
    bgColor: 'bg-sage/15',
    borderColor: 'border-sage/30',
    title: 'Физические границы',
    description:
      'Касаются вашего тела, личного пространства и физического комфорта. Это самый базовый и понятный тип границ.',
    examples: [
      'Право решать, кто и когда может к вам прикасаться',
      'Комфортная дистанция при разговоре',
      'Потребность в личном пространстве дома',
      'Решения о своём здоровье и теле',
    ],
    tip: '«Мне некомфортно, когда...» — простая фраза, чтобы обозначить физическую границу.',
  },
  {
    id: 'emotional',
    label: 'Эмоциональные',
    icon: Heart,
    color: 'text-terracotta',
    bgColor: 'bg-terracotta/15',
    borderColor: 'border-terracotta/30',
    title: 'Эмоциональные границы',
    description:
      'Защищают ваши чувства, эмоциональную энергию и внутреннее состояние. Одни из самых сложных для установки.',
    examples: [
      'Право не брать на себя чужие эмоции',
      'Отказ от общения, которое истощает',
      'Защита от эмоционального давления и манипуляций',
      'Разрешение себе чувствовать то, что чувствуете',
    ],
    tip: '«Я понимаю твои чувства, но не могу нести за них ответственность» — здоровая эмоциональная граница.',
  },
  {
    id: 'intellectual',
    label: 'Интеллектуальные',
    icon: Lightbulb,
    color: 'text-blue',
    bgColor: 'bg-blue/15',
    borderColor: 'border-blue/30',
    title: 'Интеллектуальные границы',
    description:
      'Относятся к вашим мыслям, идеям и убеждениям. Право иметь собственное мнение и не соглашаться.',
    examples: [
      'Право на собственное мнение, даже если оно отличается',
      'Отказ от навязанных убеждений',
      'Уважительное несогласие без агрессии',
      'Защита от обесценивания ваших идей',
    ],
    tip: '«Я уважаю твою точку зрения, но у меня другое мнение» — пример интеллектуальной границы.',
  },
  {
    id: 'time',
    label: 'Временные',
    icon: Clock,
    color: 'text-sage',
    bgColor: 'bg-sage/15',
    borderColor: 'border-sage/30',
    title: 'Временные границы',
    description:
      'Защищают ваше время и энергию. Умение говорить «нет» лишним обязательствам и приоритизировать своё время.',
    examples: [
      'Отказ от встреч, которые не приносят радости',
      'Установление рабочих часов и времени отдыха',
      'Право не отвечать на сообщения мгновенно',
      'Планирование времени для себя',
    ],
    tip: '«Сейчас у меня нет возможности, давайте на следующей неделе» — граница без чувства вины.',
  },
  {
    id: 'social',
    label: 'Социальные',
    icon: Users,
    color: 'text-blue',
    bgColor: 'bg-blue/15',
    borderColor: 'border-blue/30',
    title: 'Социальные границы',
    description:
      'Определяют, как вы взаимодействуете с другими людьми и обществом. Кого вы впускаете в свою жизнь.',
    examples: [
      'Выбор круга общения',
      'Право покинуть некомфортную компанию',
      'Установление правил общения в отношениях',
      'Защита от социального давления',
    ],
    tip: '«Мне нужно побыть одному» — абсолютно нормальная социальная граница.',
  },
];

export function InteractiveTabs() {
  const [activeId, setActiveId] = useState(boundaryTypes[0].id);
  const active = boundaryTypes.find((b) => b.id === activeId)!;
  const Icon = active.icon;

  return (
    <section className="rounded-2xl border border-white/10 bg-background-soft p-6 sm:p-8">
      <h2 className="font-display mb-6 text-2xl font-bold text-text">
        Типы личных границ
      </h2>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {boundaryTypes.map((type) => {
          const isActive = type.id === activeId;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => setActiveId(type.id)}
              className={[
                'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50',
                isActive
                  ? `${type.bgColor} ${type.color} ring-1 ${type.borderColor}`
                  : 'bg-white/10 text-text-muted hover:bg-white/15 hover:text-text',
              ].join(' ')}
              aria-pressed={isActive}
            >
              <type.icon className="h-4 w-4" strokeWidth={1.75} />
              {type.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <m.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${active.bgColor}`}>
              <Icon className={`h-6 w-6 ${active.color}`} strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-text">{active.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">{active.description}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
              Примеры
            </h4>
            <ul className="space-y-2">
              {active.examples.map((example, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${active.bgColor} ring-1 ${active.borderColor}`} />
                  {example}
                </li>
              ))}
            </ul>
          </div>

          <div className={`rounded-xl ${active.bgColor} border ${active.borderColor} p-4`}>
            <p className={`text-sm font-medium ${active.color}`}>
              {active.tip}
            </p>
          </div>
        </m.div>
      </AnimatePresence>
    </section>
  );
}
