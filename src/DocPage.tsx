import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import axios, { AxiosHeaders } from 'axios';

export interface Props {
  url?: string;
  match?: () => string | null;
}

export default function DocPage({ url, match }: Props) {
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

    const source = url || (match ? match() : null);
    if (source) {
      fetchMarkdown(source);
    }
  }, [url, match]);

  return (
    <div>
      <Helmet titleTemplate="%s - EcoCor">
        <title>{title}</title>
      </Helmet>
      <ReactMarkdown children={markdown} />
    </div>
  );
}
