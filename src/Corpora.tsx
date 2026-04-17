import { useEffect, useState } from 'react';
import { getCorpora } from './api';
import { CorpusListEntry } from './types';
import CorpusCard from './CorpusCard';

export default function Corpora() {
  const [corpora, setCorpora] = useState<CorpusListEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      try {
        const resp = await getCorpora();
        if (isMounted) {
          setCorpora(resp.data);
        }
      } catch (error) {
        console.log(error);
        alert('Cannot load corpora');
      }
      if (isMounted) {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const featuredCorpora = corpora
    .filter((corpus) => corpus.name === 'de' || corpus.name === 'en')
    .sort((a, b) => {
      if (a.name === 'de') return -1;
      if (b.name === 'de') return 1;
      return a.title.localeCompare(b.title);
    });

  return (
    <main className="relative isolate overflow-hidden rounded-3xl px-4 py-10 text-slate-900 md:px-8 md:py-14">
      <title>EcoCor: Corpora</title>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.1),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.08),transparent_40%)]"
      />
      <section className="mx-auto w-full">
        {loading && (
          <p className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-200">
            Loading corpora...
          </p>
        )}

        <div className="corpora-stage">
          <header className="corpora-stage-copy mb-10 max-w-4xl space-y-4 lg:mb-0">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
              EcoCor Collections
            </p>
            <h1 className="text-balance text-4xl font-semibold uppercase tracking-[0.02em] leading-none text-slate-900 md:text-6xl">
              Two corpora.
              <br />
              One ambitious view of environmental storytelling.
            </h1>
            <p className="text-pretty text-lg text-slate-700">
              Explore German and English EcoCor side by side. Each card
              highlights the corpus scale first, then key biodiversity metrics.
            </p>
          </header>

          <div className="deck-layout corpora-stage-deck">
            {featuredCorpora.map((corpus, index) => (
              <div
                key={corpus.name}
                className={`deck-slot deck-slot--${index + 1}`}
                aria-hidden="false"
              >
                <CorpusCard corpus={corpus} />
              </div>
            ))}
          </div>
        </div>

        {!loading && featuredCorpora.length === 0 && (
          <p className="mt-4 rounded-xl border border-amber-400/40 bg-amber-100/10 px-4 py-3 text-sm text-amber-100">
            No featured corpora were found.
          </p>
        )}
      </section>
    </main>
  );
}
