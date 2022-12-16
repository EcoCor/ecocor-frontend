import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getCorpora } from './api';
import { CorpusListEntry } from './types';

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

  return (
    <div>
      <Helmet>
        <title>Corpora</title>
      </Helmet>
      <section>
        <h1>Corpora</h1>
        {loading && <p>loading...</p>}
        <ul>
          {corpora.map((corpus) => (
            <li key={corpus.name}>
              <Link to={corpus.name}>{corpus.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
