import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPage from './pages/user-pages/UserPage.jsx'
import HomePage from './pages/home-pages/HomePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserDialogPage from './pages/user-dialog-pages/UserDialogPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/user",
    element: <UserPage />
  },
  {
    path: "/user-dialog",
    element: <UserDialogPage />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
