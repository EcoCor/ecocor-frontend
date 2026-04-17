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

  return (
    <div>
      <title>EcoCor: Corpora</title>
      <section>
        {loading && <p>loading...</p>}
        <div className="flex flex-row justify-center pb-4">
          {corpora.map((corpus) => (
            <CorpusCard corpus={corpus} key={corpus.name} />
          ))}
        </div>
      </section>
    </div>
  );
}
