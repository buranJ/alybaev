import { ArrowUpRight } from 'lucide-react';

import { Container } from '@/shared/ui';

const recoveryStages = [
  { period: 'В день операции', title: 'Сразу после операции', text: 'После наблюдения в течение примерно тридцати минут пациент может покинуть клинику. Иногородним рекомендуют остаться в Бишкеке минимум на сутки.' },
  { period: 'Шестой день', title: 'Снятие швов', text: 'Обычно швы снимают на шестой день. После эпикантопластики врач может увеличить этот срок до десяти дней.' },
  { period: 'Первые недели', title: 'Основное восстановление', text: 'В первую неделю может сохраняться выраженный отёк. Основной период восстановления обычно занимает около двух недель.' },
  { period: 'Через месяц', title: 'Возвращение к привычному', text: 'Косметика и наращивание ресниц возможны примерно через месяц; спорт, через полтора месяца; баня и парилка, через три месяца.' },
  { period: 'До полугода', title: 'Полное заживление', text: 'Ткани продолжают меняться от четырёх до шести месяцев, даже когда внешние следы восстановления уже незаметны.' },
] as const;

const importantNotes = [
  'Возраст пациента, от пятнадцати лет после очной консультации',
  'При поездке из другого города запланируйте минимум сутки в Бишкеке',
  'Сроки могут меняться в зависимости от объёма операции',
] as const;

export function RecoverySection() {
  return (
    <section id="recovery" className="scroll-mt-24 overflow-hidden border-t border-border-strong bg-surface py-(--spacing-section)" aria-labelledby="recovery-title">
      <Container>
        <div>
          <p className="type-eyebrow text-accent">Восстановление</p>
          <h2 id="recovery-title" className="mt-6 max-w-[24ch] font-display text-display-lg font-light text-text-strong">
            <span className="block">Понимать этапы,</span>
            <span className="block">значит меньше тревожиться</span>
          </h2>
        </div>

        <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="max-w-[19ch] font-display text-heading-2 font-light text-text-strong">Восстановление проходит постепенно</p>
            <p className="mt-5 max-w-[34ch] text-body text-text-muted lg:mt-6">Сроки ориентировочные. Точные рекомендации врач даёт после осмотра.</p>
            <a href="#faq-title" className="mt-8 inline-flex items-center gap-2 text-body-sm text-text-strong">
              Ответы на частые вопросы
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <ol className="mt-12 border-t border-border-strong lg:hidden">
            {recoveryStages.map((stage) => (
              <li key={stage.title} className="grid grid-cols-[5.5rem_1fr]">
                <p className="py-7 pr-4 type-eyebrow leading-relaxed text-accent">{stage.period}</p>
                <div className="border-b border-l border-border py-7 pl-5">
                  <h3 className="font-display text-heading-3 text-text-strong">{stage.title}</h3>
                  <p className="mt-3 text-body-sm text-text-muted">{stage.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <ol className="hidden border-t border-border-strong lg:col-span-7 lg:col-start-6 lg:block">
            {recoveryStages.map((stage) => (
              <li key={stage.title} className="grid gap-10 border-b border-border py-8 sm:grid-cols-[0.7fr_1.3fr]">
                <h3 className="font-display text-heading-3 text-text-strong">{stage.title}</h3>
                <p className="max-w-[52ch] text-body-sm text-text-muted">{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 rounded-[var(--radius-xl)] bg-text-strong p-6 text-on-dark lg:hidden">
          <p className="type-eyebrow text-on-dark/55">Что важно учесть</p>
          <ul className="mt-6 border-t border-on-dark/20">
            {importantNotes.map((note) => (
              <li key={note} className="border-b border-on-dark/20 py-5 text-body-sm text-on-dark/75">{note}</li>
            ))}
          </ul>
        </div>

        <div className="mt-14 hidden gap-8 border-t border-border pt-8 lg:grid lg:grid-cols-[0.55fr_1.45fr]">
          <p className="type-eyebrow text-accent">Что важно учесть</p>
          <ul className="grid gap-5 sm:grid-cols-3">
            {importantNotes.map((note) => (
              <li key={note} className="text-body-sm text-text-muted">{note}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
