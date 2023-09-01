import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { getCorpusEntities, getCorpus } from './api';
import { CorpusData, Entity } from './types';
import WordCloud from './WordCloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

export default function CorpusEntities() {
  const { id } = useParams<{ id: string }>();
  const [corpus, setCorpus] = useState<CorpusData>();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingEntities, setLoadingEntities] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      try {
        const resp = await getCorpus(id!);
        if (isMounted) {
          setCorpus(resp.data);
        }
      } catch (error) {
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
        const resp = await getCorpusEntities(id!);
        if (isMounted) {
          setEntities(resp.data);
        }
      } catch (error) {
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

  const words = entities.map(({ name, metrics: { overallFrequency } }) => ({
    text: name,
    value: overallFrequency,
  }));

  return (
    <div>
      <Helmet>
        <title>Corpus: {corpus?.title || 'loading...'}</title>
      </Helmet>
      {loading && <p>loading...</p>}
      {corpus && (
        <section>
          <h1>{corpus.title}</h1>
          {loadingEntities && <div className="text-center">Loading...</div>}
          {words.length > 0 && <WordCloud words={words} />}
        </section>
      )}
    </div>
  );
}
