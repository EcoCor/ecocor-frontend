import { useEffect, useState } from 'react';
import { Outlet } from '@tanstack/react-router';
import { AuthorInfo, IdCopy, Tabs } from '@dracor/react';
import { getText } from './api';
import { Text as TextData } from './types';

export interface Props {
  corpusId: string;
  textId: string;
}

export default function Text({ corpusId, textId }: Props) {
  const [text, setText] = useState<TextData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      try {
        const resp = await getText(corpusId, textId);
        if (isMounted) {
          setText(resp.data);
        }
      } catch (error) {
        console.log(error);
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

  const p = `/corpora/${corpusId}/${textId}`;

  return (
    <div>
      <title>{authorTitle}</title>
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
          <Tabs
            data={[
              // @ts-expect-error - FIXME `to`
              { label: 'Entities', to: `${p}/entities`, active: false },
              // @ts-expect-error - FIXME `to`
              { label: 'Animals', to: `${p}/animals`, active: false },
              // @ts-expect-error - FIXME `to`
              { label: 'Plants', to: `${p}/plants`, active: false },
              // @ts-expect-error - FIXME `to`
              { label: 'Full text', to: `${p}/fulltext`, active: false },
            ]}
          />
          <Outlet />
        </section>
      )}
    </div>
  );
}
