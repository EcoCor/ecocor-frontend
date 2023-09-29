import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { IdLink, Table } from '@dracor/react';
import { getCorpus, getCorpusEntities, getCorpusTexts } from './api';
import { CorpusData, Entity, Text } from './types';
import WordCloud from './WordCloud';

export default function Corpus() {
  const { id } = useParams<{ id: string }>();
  const [corpus, setCorpus] = useState<CorpusData>();
  const [texts, setTexts] = useState<Text[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingEntities, setLoadingEntities] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      setTexts([]);
      try {
        const resp = await getCorpus(id!);
        if (isMounted) {
          setCorpus(resp.data);
        }
      } catch (error) {
        alert('Cannot load corpus');
      }
      try {
        const resp = await getCorpusTexts(id!);
        if (isMounted) {
          setTexts(resp.data);
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
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoadingEntities(true);
      setEntities([]);
      try {
        const resp = await getCorpusEntities(id!);
        if (isMounted) {
          setEntities(resp.data);
        }
      } catch (error) {
        alert('Cannot load entities');
      }
      if (isMounted) {
        setLoadingEntities(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const words = entities.map(({ name, metrics: { overallFrequency } }) => ({
    text: name,
    value: overallFrequency,
  }));

  const columns = useMemo<ColumnDef<Text>[]>(
    () => [
      {
        accessorKey: 'authors',
        header: 'Author',
        accessorFn: (row) => {
          const { authors = [] } = row;
          return authors.map((a) => a.name).join(' ');
        },
        cell: (info) => (
          <div>
            {info.row.original.authors.map(({ name, ref }) => (
              <div key={name}>
                <span>{name}</span>
                <br />
                {ref && <IdLink>{ref}</IdLink>}
              </div>
            ))}
          </div>
        ),
      },
      {
        accessorKey: 'title',
        header: 'Title',
        cell: (info) => (
          <Link className="text-lg" to={info.row.original.name}>
            {`${info.getValue()}`}
          </Link>
        ),
      },
      {
        accessorKey: 'dates',
        header: 'Year',
        accessorFn: (row) => row.dates?.yearNormalized.toString() || '',
        cell: (info) => <span>{info.row.original.dates?.yearNormalized}</span>,
      },
      {
        accessorKey: 'chapters',
        header: 'Chapters',
        accessorFn: (row) => row.metrics?.numOfChapters || 0,
        cell: (info) => info.row.original.metrics?.numOfChapters,
        enableGlobalFilter: false,
      },
      {
        accessorKey: 'entities',
        header: 'Entities',
        accessorFn: (row) => row.metrics?.numOfEntities || 0,
        cell: (info) => (
          <>
            <span>{info.row.original.metrics?.numOfEntities}</span>{' '}
            <span title="number of entity types">
              ({info.row.original.metrics?.numOfEntityTypes})
            </span>
          </>
        ),
        enableGlobalFilter: false,
      },
    ],
    []
  );

  return (
    <div>
      <Helmet>
        <title>Corpus: {corpus?.title || 'loading...'}</title>
      </Helmet>
      {loading && <p>loading...</p>}
      {corpus && (
        <section>
          <h1>{corpus.title}</h1>
          {loadingEntities && (
            <div className="text-center">Loading entities...</div>
          )}
          {words.length > 0 && <WordCloud words={words} />}
          {texts.length > 0 && <Table data={texts} columns={columns} />}
        </section>
      )}
    </div>
  );
}
