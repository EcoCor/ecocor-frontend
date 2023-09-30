import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { AuthorInfo, IdCopy, Tabs } from '@dracor/react';
import { getText } from './api';
import { Text as TextData } from './types';

export default function Text() {
  const location = useLocation();
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
  const wikidataIds = text?.authors
    ?.map((a) => {
      const m = a.ref?.match(
        /https:\/\/www\.wikidata\.org\/(?:wiki|entity)\/(Q[0-9]+)/
      );
      return m ? m[1] : null;
    })
    .filter((id) => !!id);

  const tabs = [
    { label: 'Entities', href: 'entities', active: false },
    { label: 'Animals', href: 'animals', active: false },
    { label: 'Plants', href: 'plants', active: false },
    { label: 'Full text', href: 'fulltext', active: false },
  ];
  tabs.forEach((t) => {
    const tabUrl = `/corpora/${corpusId}/${textId}/${t.href}`;
    if (tabUrl === location.pathname) {
      t.active = true;
    }
  });

  return (
    <div>
      <Helmet>
        <title>{authorTitle}</title>
      </Helmet>
      {loading && <p>loading...</p>}
      {text && (
        <section>
          <div className="flex justify-between mb-4 flex-col gap-3 md:flex-row">
            <div>
              <h2 className="text-sm mb-1">{authors}</h2>
              <h1>{text.title}</h1>
              <IdCopy>{text.id}</IdCopy>
            </div>
            <div>
              {wikidataIds?.map((id) => (
                <AuthorInfo key={id} wikidataId={id!} name="" />
              ))}
            </div>
          </div>
          <Tabs data={tabs} />
          <Outlet />
        </section>
      )}
    </div>
  );
}
