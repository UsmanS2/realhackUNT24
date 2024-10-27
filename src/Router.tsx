import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { PMDashboard } from './pages/PMDashboard';
import { PMLandingPage } from './pages/PMLanding.page';
import { TenantDashboard } from './pages/TenantDashboard.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/propertymanager',
    element: <PMLandingPage />,
  },
  {
    path: '/tenant-dashboard',
    element: <TenantDashboard />,
  },
  {
    path: '/pm-dashboard',
    element: <PMDashboard />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
