import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { IdLink, Table } from '@dracor/react';
import { getTextEntities } from './api';
import { Entity } from './types';
import WordCloud from './WordCloud';

export interface Props {
  type?: string;
}

export default function TextEntities({ type }: Props) {
  const { corpusId, textId } = useParams<{
    corpusId: string;
    textId: string;
  }>();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      setEntities([]);
      try {
        const resp = await getTextEntities(corpusId!, textId!, type);
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
  }, [type]);

  const columns = useMemo<ColumnDef<Entity>[]>(
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

  const words = entities.map(({ name, metrics: { overallFrequency } }) => ({
    text: name,
    value: overallFrequency,
  }));

  return (
    <div className="mt-2">
      {loading && <p>loading...</p>}
      {words.length > 0 && <WordCloud words={words} />}
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
