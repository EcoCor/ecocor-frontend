import { createFileRoute, useParams } from '@tanstack/react-router';
import TextEntities from '../../../../TextEntities';

export const Route = createFileRoute('/corpora/$corpusId/$textId/entities')({
  component: RouteComponent,
});

function RouteComponent() {
  const { corpusId, textId } = useParams({
    from: '/corpora/$corpusId/$textId/entities',
  });
  return <TextEntities corpusId={corpusId} textId={textId} />;
}
