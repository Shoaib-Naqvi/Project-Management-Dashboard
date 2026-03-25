import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import ProjectsList from './pages/ProjectsList';
import ProjectDetails from './pages/ProjectDetails';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'projects',
        element: <ProjectsList />,
      },
      {
        path: 'projects/:projectId',
        element: <ProjectDetails />,
      },
    ],
  },
]);


function App() {
  return (
    <>
      <Toaster position="top-center" duration={3000}/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
