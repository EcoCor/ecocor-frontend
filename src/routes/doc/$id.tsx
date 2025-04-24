import { createFileRoute, useParams } from '@tanstack/react-router';
import DocPage from '../../DocPage';

export const Route = createFileRoute('/doc/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: '/doc/$id' });
  const url = `/doc/${id}.md`;
  return <DocPage url={url} />;
}
