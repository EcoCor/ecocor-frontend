import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { getCorpus, getCorpusEntities, getCorpusTexts } from './api';
import { CorpusData, Entity, Text } from './types';
import Table from './Table';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoadingEntities(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const words = entities.map((e) => ({ text: e.name, value: e.count }));

  const columns = useMemo<ColumnDef<Text>[]>(
    () => [
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
        accessorKey: 'authors',
        header: 'Author',
        accessorFn: (row) => {
          const { authors = [] } = row;
          return authors.map((a) => a.name).join(' ');
        },
        cell: (info) => info.row.original.authors.map((a) => a.name).join(', '),
      },
      // {
      //   accessorKey: 'source',
      //   header: 'Source',
      //   cell: (info) =>
      //     info.row.original.sourceUrl ? (
      //       <Link to={info.row.original.sourceUrl}>{`${info.getValue()}`}</Link>
      //     ) : (
      //       info.getValue()
      //     ),
      // },
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
