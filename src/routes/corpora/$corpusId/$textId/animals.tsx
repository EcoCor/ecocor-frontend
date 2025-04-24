import { createFileRoute, useParams } from '@tanstack/react-router';
import TextEntities from '../../../../TextEntities';

export const Route = createFileRoute('/corpora/$corpusId/$textId/animals')({
  component: RouteComponent,
});

function RouteComponent() {
  const { corpusId, textId } = useParams({
    from: '/corpora/$corpusId/$textId/animals',
  });
  return <TextEntities corpusId={corpusId} textId={textId} type="Animal" />;
}
