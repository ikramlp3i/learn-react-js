import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPage from './pages/user_pages/UserPage.jsx'
import HomePage from './pages/home_pages/HomePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/user",
    element: <UserPage />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
