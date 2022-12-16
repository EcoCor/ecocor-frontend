import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { getWork } from './api';
import { Work as WorkData } from './types';

export default function Work() {
  const { corpusId, workId } = useParams<{
    corpusId: string;
    workId: string;
  }>();
  const [work, setWork] = useState<WorkData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      try {
        const resp = await getWork(corpusId!, workId!);
        if (isMounted) {
          setWork(resp.data);
        }
      } catch (error) {
        alert('Cannot load work');
      }
      if (isMounted) {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const authors = work?.authors?.map((a) => a.name).join(', ');
  const authorTitle = work ? `${authors}: ${work.title}` : '';

  return (
    <div>
      <Helmet>
        <title>{authorTitle}</title>
      </Helmet>
      {loading && <p>loading...</p>}
      {work && (
        <section>
          <h2>{authors}</h2>
          <h1>{work.title}</h1>
          {work.source && (
            <p>
              Source: <a href={work.sourceUrl}>{work.source}</a>
            </p>
          )}
        </section>
      )}
    </div>
  );
}
