import { createBrowserRouter } from 'react-router';
import Root from '../layout/Root';
import Error from '../pages/Error/Error';
import Books from '../pages/Books/Books';
import AddBook from '../pages/AddBook/AddBook';
import BorrowSummry from '@/pages/BorrowSummry/BorrowSummry';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Books
      },
      {
        path: '/books',
        Component: Books
      },
      {
        path: '/create-book',
        element: <AddBook />,
      },
      {
        path: '/borrow-summary',
        element: <BorrowSummry />,
      }

    ],
  },
]);
export default router;
