import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ReactWordcloud from 'react-wordcloud';
import { getCorpusEntities, getCorpus } from './api';
import { CorpusData, Entity } from './types';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

export default function CorpusEntities() {
  const { id } = useParams<{ id: string }>();
  const [corpus, setCorpus] = useState<CorpusData>();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
      try {
        const resp = await getCorpusEntities(id!);
        if (isMounted) {
          setEntities(resp.data);
        }
      } catch (error) {
        alert('Cannot load text');
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

  const words = entities.map((e) => ({ text: e.name, value: e.count }));

  const options = {
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [5, 60] as [number, number],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    // rotationAngles: [0, 90],
    // scale: 'sqrt',
    // spiral: 'archimedean',
    transitionDuration: 1000,
  };

  return (
    <div>
      <Helmet>
        <title>Corpus: {corpus?.title || 'loading...'}</title>
      </Helmet>
      {loading && <p>loading...</p>}
      {corpus && (
        <section>
          <h1>{corpus.title}</h1>
          <ReactWordcloud words={words} options={options} />
        </section>
      )}
    </div>
  );
}
