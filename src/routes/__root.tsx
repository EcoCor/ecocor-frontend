import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import pkg from '../../package.json';
import { getApiInfo } from '../api';
import Topnav from '../Topnav';
import Footer from '../Footer';

async function loader() {
  const info = await getApiInfo();
  return info.data;
}

export const Route = createRootRoute({
  component: RootComponent,
  loader,
  staleTime: Infinity,
});

function RootComponent() {
  const { version, existdb } = Route.useLoaderData();
  return (
    <>
      <Topnav />
      <div className="p-4">
        <Outlet />
        <Footer
          frontendVersion={pkg.version}
          apiVersion={version}
          existVersion={existdb}
        />
        <TanStackRouterDevtools />
      </div>
    </>
  );
}
