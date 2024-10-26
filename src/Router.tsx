import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { PMLandingPage } from './pages/PMLanding.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/propertymanager',
    element: <PMLandingPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
