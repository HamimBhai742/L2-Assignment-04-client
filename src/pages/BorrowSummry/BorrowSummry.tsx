import { useGetBorrowSummaryQuery } from '@/redux/api/baseApi';
import BorrowTableRow from './BorrowTableRow';
import type { IBorrow } from '@/redux/type';
import { ImSpinner } from 'react-icons/im';

export default function BorrowSummry() {
  const { data: borrows = [],isLoading } = useGetBorrowSummaryQuery(undefined);

  if (isLoading)
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <ImSpinner className='animate-spin text-9xl ' />
      </div>
    );
  return (
    <section className='container px-4 mx-auto'>
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
                      Book Title
                    </th>

                    <th
                      scope='col'
                      className='px-12 py-3.5  font-semibold text-left rtl:text-right text-gray-500 dark:text-gray-400'
                    >
                      ISBN
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5  font-semibold text-left rtl:text-right text-gray-500 dark:text-gray-400'
                    >
                      Total Quantity Borrowed
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900'>
                  {borrows?.data?.map((borrow: IBorrow) => (
                    <BorrowTableRow key={borrow._id} borrow={borrow} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
