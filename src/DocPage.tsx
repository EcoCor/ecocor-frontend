import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import axios, { AxiosHeaders } from 'axios';

export interface Props {
  url?: string;
  match?: (params: any) => string | null;
}

export default function DocPage({ url, match }: Props) {
  const params = useParams();
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('Foo Title');

  useEffect(() => {
    async function fetchMarkdown(source: string) {
      try {
        const { status, headers, data } = await axios.get(source);
        if (
          status === 200 &&
          headers instanceof AxiosHeaders &&
          headers.has('content-type') &&
          headers['content-type']?.match(/^text\/markdown/)
        ) {
          setMarkdown(data);
          const firstLine = data
            .replace(/^\s+/, '')
            .split(/(\n|\r|\r\n){2,}/)[0];
          const m = firstLine.match(/^#\s*(.+)/);
          setTitle(m ? m[1] : '...');
        } else {
          setMarkdown('Not Found');
          setTitle('Not Found');
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'Request failed with status code 404'
        ) {
          setMarkdown('Not Found');
          setTitle('Not Found');
        } else {
          console.error(error);
        }
      }
    }

    let source = url || (match ? match(params) : null);
    if (source) {
      source = `${process.env.PUBLIC_URL}${source}`;
      fetchMarkdown(source);
    }
  }, [url, match, params]);

  return (
    <div>
      <Helmet titleTemplate="%s - EcoCor">
        <title>{title}</title>
      </Helmet>
      <ReactMarkdown children={markdown} />
    </div>
  );
}
