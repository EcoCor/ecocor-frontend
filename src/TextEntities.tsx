import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IdLink, Table } from '@dracor/react';
import { getTextEntities } from './api';
import { Entity } from './types';
import WordCloud, { type CloudWord, type WordKind } from './WordCloud';

type TypedEntity = Entity & {
  kind: WordKind;
};

export interface Props {
  corpusId: string;
  textId: string;
  type?: string;
}

export default function TextEntities({ corpusId, textId, type }: Props) {
  const [entities, setEntities] = useState<TypedEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      setEntities([]);
      try {
        if (type === 'Animal' || type === 'Plant') {
          const resp = await getTextEntities(corpusId!, textId!, type);
          if (isMounted) {
            setEntities(
              resp.data.map((entity) => ({
                ...entity,
                kind: type,
              }))
            );
          }
        } else {
          const [animalsResp, plantsResp] = await Promise.all([
            getTextEntities(corpusId!, textId!, 'Animal'),
            getTextEntities(corpusId!, textId!, 'Plant'),
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
  }, [corpusId, textId, type]);

  const columns = useMemo<ColumnDef<TypedEntity>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        accessorFn: (row) => row.name,
        cell: (info) => info.row.original.name,
      },
      {
        accessorKey: 'frequency',
        header: 'Frequency',
        accessorFn: (row) => row.metrics.overallFrequency,
        cell: (info) => info.row.original.metrics.overallFrequency,
        enableGlobalFilter: false,
      },
      {
        accessorKey: 'id',
        header: 'Id',
        accessorFn: (row) => row.id,
        cell: (info) => <IdLink>{`wikidata:${info.row.original.id}`}</IdLink>,
      },
    ],
    []
  );

  const words: CloudWord[] = entities.map(
    ({ name, metrics: { overallFrequency }, kind }) => ({
      text: name,
      value: overallFrequency,
      kind,
    })
  );

  return (
    <div className="mt-2 space-y-6">
      {loading && <p>loading...</p>}
      {words.length > 0 && (
        <section className="rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200">
          <WordCloud words={words} />
        </section>
      )}
      {entities.length > 0 && (
        <Table
          data={entities}
          columns={columns}
          defaultSort={[{ id: 'name', desc: false }]}
        />
      )}
    </div>
  );
}
