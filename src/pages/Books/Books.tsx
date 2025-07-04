import { Button } from '@/components/ui/button';
import { useGetAllBooksQuery } from '@/redux/api/baseApi';
import { Link } from 'react-router';
import BooksRow from './BooksRow';
import type { IBookWithId } from '@/redux/type';
import { ImSpinner } from 'react-icons/im';

export default function Books() {
  const { data: books = [], isLoading } = useGetAllBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading)
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <ImSpinner className='animate-spin text-9xl ' />
      </div>
    );
  return (
    <div className='mb-10'>
      <section className='container px-4 mx-auto'>
        <div className='flex items-center justify-between mt-8'>
          <h2 className='md:text-2xl text-xl font-semibold text-gray-800 dark:text-white'>
            Books
          </h2>

          <Link to='/create-book'>
            <Button className=' font-semibold md:p-5 md:text-xl text-gray-800 transition-colors duration-200 bg-white border rounded-lg  dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-white dark:border-gray-700'>
              Add Book
            </Button>
          </Link>
        </div>

        <div className='flex flex-col mt-6'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div className='overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                  <thead className='bg-gray-50 dark:bg-gray-800'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 px-4  font-semibold text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        Title
                      </th>

                      <th
                        scope='col'
                        className='px-12 py-3.5  font-semibold text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        Author
                      </th>

                      <th
                        scope='col'
                        className='px-4 py-3.5  font-semibold text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        Genre
                      </th>

                      <th
                        scope='col'
                        className='px-4 py-3.5  font-semibold text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        ISBN
                      </th>

                      <th
                        scope='col'
                        className='px-4 py-3.5  font-semibold text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        Copies
                      </th>
                      <th
                        scope='col'
                        className='px-4 py-3.5  font-semibold text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        Availability
                      </th>
                      <th
                        scope='col'
                        className='px-4 py-3.5  font-semibold text-left rtl:text-right text-gray-500 dark:text-gray-400'
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900'>
                    {books?.data?.map((book: IBookWithId) => (
                      <BooksRow key={book._id} book={book} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
