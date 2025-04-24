import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Topnav from '../Topnav';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Topnav />
      <div className="p-4">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </>
  );
}
