import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { getText } from './api';
import { Text as TextData } from './types';

export default function Text() {
  const { corpusId, textId } = useParams<{
    corpusId: string;
    textId: string;
  }>();
  const [text, setText] = useState<TextData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      try {
        const resp = await getText(corpusId!, textId!);
        if (isMounted) {
          setText(resp.data);
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

  const authors = text?.authors?.map((a) => a.name).join(', ');
  const authorTitle = text ? `${authors}: ${text.title}` : '';

  return (
    <div>
      <Helmet>
        <title>{authorTitle}</title>
      </Helmet>
      {loading && <p>loading...</p>}
      {text && (
        <section>
          <h2>{authors}</h2>
          <h1>{text.title}</h1>
          {text.source && (
            <p>
              Source: <a href={text.sourceUrl}>{text.source}</a>
            </p>
          )}
        </section>
      )}
    </div>
  );
}
