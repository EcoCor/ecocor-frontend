import { useParams } from 'react-router-dom';
import { TEIText } from '@dracor/react';

const apiUrl = process.env.REACT_APP_ECOCOR_API;

export default function FullText() {
  const { corpusId, textId } = useParams<{
    corpusId: string;
    textId: string;
  }>();

  const url = `${apiUrl}/corpora/${corpusId}/texts/${textId}/tei`;

  return (
    <div>
      <TEIText url={url} />
    </div>
  );
}
