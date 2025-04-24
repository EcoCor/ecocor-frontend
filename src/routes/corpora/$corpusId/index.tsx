import { createFileRoute, useParams } from '@tanstack/react-router';
import Corpus from '../../../Corpus';

export const Route = createFileRoute('/corpora/$corpusId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { corpusId } = useParams({ from: '/corpora/$corpusId/' });

  return <Corpus id={corpusId} />;
}
