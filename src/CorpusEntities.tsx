import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from '@tanstack/react-router';
import { getCorpusEntities, getCorpus } from './api';
import { CorpusData, Entity } from './types';
import WordCloud, { type CloudWord, type WordKind } from './WordCloud';

type TypedEntity = Entity & {
  kind: WordKind;
};

export default function CorpusEntities() {
  const { corpusId } = useParams({ from: '/corpora/$corpusId/' });
  const [corpus, setCorpus] = useState<CorpusData>();
  const [entities, setEntities] = useState<TypedEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingEntities, setLoadingEntities] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      try {
        const resp = await getCorpus(corpusId);
        if (isMounted) {
          setCorpus(resp.data);
        }
      } catch {
        alert('Cannot load corpus');
      }
      if (isMounted) {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoadingEntities(true);
      try {
        const [animalsResp, plantsResp] = await Promise.all([
          getCorpusEntities(corpusId, 'Animal'),
          getCorpusEntities(corpusId, 'Plant'),
        ]);
        if (isMounted) {
          setEntities([
            ...animalsResp.data.map((entity) => ({
              ...entity,
              kind: 'Animal' as const,
            })),
            ...plantsResp.data.map((entity) => ({
              ...entity,
              kind: 'Plant' as const,
            })),
          ]);
        }
      } catch {
        alert('Cannot load text');
      }
      if (isMounted) {
        setLoadingEntities(false);
      }
    })();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const words: CloudWord[] = entities.map(
    ({ name, metrics: { overallFrequency }, kind }) => ({
      text: name,
      value: overallFrequency,
      kind,
    })
  );

  return (
    <div>
      <Helmet>
        <title>Corpus: {corpus?.title || 'loading...'}</title>
      </Helmet>
      {loading && <p>loading...</p>}
      {corpus && (
        <section className="space-y-6">
          <h1>{corpus.title}</h1>
          {loadingEntities && <div className="text-center">Loading...</div>}
          {words.length > 0 && (
            <section className="rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
              <WordCloud words={words} />
            </section>
          )}
        </section>
      )}
    </div>
  );
}
