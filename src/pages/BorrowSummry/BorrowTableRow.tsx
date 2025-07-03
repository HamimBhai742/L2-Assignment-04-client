import type { IBorrow } from '@/redux/type';

export default function BorrowTableRow({ borrow }: { borrow: IBorrow }) {
  return (
    <tr>
      <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
        <div className='inline-flex items-center gap-x-3'>
          <div className='flex items-center gap-x-2'>
            <div>
              <h2 className='font-medium text-gray-800 dark:text-white '>
                {borrow.book.title}
              </h2>
            </div>
          </div>
        </div>
      </td>
      <td className='px-12 py-4 text-sm font-medium text-gray-800 dark:text-white whitespace-nowrap'>
        {borrow.book.isbn}
      </td>
      <td className='px-12 py-4 text-sm font-medium text-gray-800 dark:text-white whitespace-nowrap'>
        {borrow.totalQuantity}
      </td>
    </tr>
  );
}
