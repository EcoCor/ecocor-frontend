import { createFileRoute, useParams } from '@tanstack/react-router';
import Text from '../../../../Text';

export const Route = createFileRoute('/corpora/$corpusId/$textId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { corpusId, textId } = useParams({
    from: '/corpora/$corpusId/$textId',
  });
  return <Text corpusId={corpusId} textId={textId} />;
}
