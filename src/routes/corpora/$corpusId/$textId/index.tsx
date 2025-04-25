import { createFileRoute } from '@tanstack/react-router';
import { Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/corpora/$corpusId/$textId/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate from="/corpora/$corpusId/$textId" to="entities" replace />;
}
