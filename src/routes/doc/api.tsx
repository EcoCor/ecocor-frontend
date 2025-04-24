import { createFileRoute } from '@tanstack/react-router';
import { ApiDoc } from '@dracor/react';
import 'swagger-ui-react/swagger-ui.css';

export const Route = createFileRoute('/doc/api')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ApiDoc url="/api/openapi.yaml" title="EcoCor API" />;
}
