import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { getCorpus } from './api';
import { CorpusData } from './types';

export default function Corpus() {
  const { id } = useParams<{ id: string }>();
  const [corpus, setCorpus] = useState<CorpusData>();
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
      if (isMounted) {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>Corpus: {corpus?.title || 'loading...'}</title>
      </Helmet>
      {loading && <p>loading...</p>}
      {corpus && (
        <section>
          <h1>{corpus.title}</h1>
          <ol>
            {corpus.works.map((work) => (
              <li key={work.name}>
                <Link to={`/corpora/${id}/${work.name}`}>{work.title}</Link>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
