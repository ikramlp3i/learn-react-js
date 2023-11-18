import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPage from './pages/user-pages/UserPage.jsx'
import HomePage from './pages/home-pages/HomePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserDialogPage from './pages/user-dialog-pages/UserDialogPage';
import UserReduxDialogPage from './pages/user-redux-dialog-pages/UserReduxDialogPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductReduxDialogPage from './pages/product-redux-dialog-pages/ProductReduxDialogPage';
import ProductDetailPage from './pages/product-pages/ProductDetailPage.jsx';

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
  },
  {
    path: "/user-redux-dialog",
    element: <UserReduxDialogPage />
  },
  {
    path: "/product-redux-dialog",
    element: <ProductReduxDialogPage />
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />
  },
  // {
  //   path: "*",
  //   element: <div>Page not found</div>
  // }
])

function App() {
  return (
    <Provider store={ store }>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
