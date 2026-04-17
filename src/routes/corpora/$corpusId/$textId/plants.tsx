import { createFileRoute, useParams } from '@tanstack/react-router';
import TextEntities from '../../../../TextEntities';

export const Route = createFileRoute('/corpora/$corpusId/$textId/plants')({
  component: RouteComponent,
});

function RouteComponent() {
  const { corpusId, textId } = useParams({
    from: '/corpora/$corpusId/$textId/plants',
  });
  return <TextEntities corpusId={corpusId} textId={textId} type="Plant" />;
}
