import { Link } from '@tanstack/react-router';
import { CorpusListEntry } from './types';

function formatValue(value?: number): string {
  if (value === undefined || value === null) {
    return 'n/a';
  }

  return value.toLocaleString('en');
}

function corpusTheme(name: string) {
  if (name === 'de') {
    return {
      label: 'German EcoCor',
      accent: 'text-cyan-50',
    };
  }

  return {
    label: 'English EcoCor',
    accent: 'text-blue-50',
  };
}

export default function CorpusCard({ corpus }: { corpus: CorpusListEntry }) {
  const { name, title, metrics, updated } = corpus;
  const theme = corpusTheme(name);

  return (
    <article
      className="relative flex min-h-[24rem] flex-col overflow-hidden rounded-3xl border bg-[var(--color-primary)] p-5 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.85)] transition-transform duration-300 motion-reduce:transition-none hover:-translate-y-1 motion-reduce:hover:translate-y-0 md:min-h-[27rem] md:p-6 xl:min-h-[31rem] xl:p-7"
      style={{ borderColor: 'var(--color-secondary-200)' }}
      aria-label={`${theme.label} corpus card`}
    >
      <header className="relative z-10 mb-4">
        <p
          className="mb-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-50"
          style={{ borderColor: 'var(--color-secondary-200)' }}
        >
          {theme.label}
        </p>
        <h2
          className={`text-2xl font-semibold ${theme.accent} md:text-3xl xl:text-4xl`}
        >
          {title}
        </h2>
      </header>

      <div className="relative z-10 mb-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
          Number of Texts
        </p>
        <p className="text-[clamp(3rem,8vw,6rem)] font-normal leading-none text-slate-50">
          {formatValue(metrics?.numOfTexts)}
        </p>
      </div>

      <dl className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-slate-50 md:text-sm">
        <div>
          <dt className="text-slate-300">Authors</dt>
          <dd className="font-semibold">
            {formatValue(metrics?.numOfAuthors)}
          </dd>
        </div>
        <div>
          <dt className="text-slate-300">Words</dt>
          <dd className="font-semibold">{formatValue(metrics?.numOfWords)}</dd>
        </div>
        <div>
          <dt className="text-slate-300">Entities</dt>
          <dd className="font-semibold">
            {formatValue(metrics?.numOfEntities)}
          </dd>
        </div>
        <div>
          <dt className="text-slate-300">Paragraphs</dt>
          <dd className="font-semibold">
            {formatValue(metrics?.numOfParagraphs)}
          </dd>
        </div>
        <div>
          <dt className="text-slate-300">Animals</dt>
          <dd className="font-semibold">
            {formatValue(metrics?.numOfAnimals)}
          </dd>
        </div>
        <div>
          <dt className="text-slate-300">Plants</dt>
          <dd className="font-semibold">{formatValue(metrics?.numOfPlants)}</dd>
        </div>
      </dl>

      <footer className="relative z-10 mt-auto flex flex-col gap-2 pt-6 sm:flex-row sm:items-center sm:justify-start sm:gap-4">
        <Link
          to={name}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold text-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:brightness-110 md:text-base"
          style={{
            backgroundColor: 'var(--color-secondary-200)',
            borderColor: 'var(--color-secondary-200)',
          }}
          aria-label={`Open ${title}`}
        >
          Open Corpus
        </Link>
        <p className="text-xs text-slate-300">
          Updated: {updated ? new Date(updated).toLocaleDateString() : 'n/a'}
        </p>
      </footer>
    </article>
  );
}
