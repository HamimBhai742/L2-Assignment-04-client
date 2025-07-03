import type { IBookWithId } from '@/redux/type';
import { MoreVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { BorrowBookModal } from '@/Components/BorrowBookModal/BorrowBookModal';
import { EditBookModal } from '@/Components/EditBookModal/EditBookModal';
import Swal from 'sweetalert2';
import { useDeleteBookMutation } from '@/redux/api/baseApi';
import { Link } from 'react-router';
export default function BooksRow({ book }: { book: IBookWithId }) {
  const [open, setOpen] = useState(false);
  const [deleteBook] = useDeleteBookMutation();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const handelDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteBook(id);
        setOpen(false);
        if (res.data) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Book deleted successfully',
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete book',
            icon: 'error',
          });
        }
      }
    });
  };
  return (
    <tr>
      <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
        <div className='inline-flex items-center gap-x-3'>
          <div className='flex items-center gap-x-2'>
            <div>
              <Link
                to={`/books/${book._id}`}
                className=' hover:underline hover:text-blue-600 font-medium  text-gray-800 dark:text-white '
              >
                {book.title}
              </Link>
            </div>
          </div>
        </div>
      </td>
      <td className='px-12 py-4 text-sm font-medium  text-gray-800 dark:text-white whitespace-nowrap'>
        {book.author}
      </td>
      <td className='px-4 py-4 text-sm font-medium  text-gray-800 dark:text-white whitespace-nowrap'>
        {book.genre}
      </td>
      <td className='px-4 py-4 text-sm font-medium  text-gray-800 dark:text-white  whitespace-nowrap'>
        {book.isbn}
      </td>
      <td className='px-4 py-4 text-sm font-medium  text-gray-800 dark:text-white whitespace-nowrap'>
        {book.copies}
      </td>
      <td className='px-4 py-4 text-sm font-medium  text-gray-800 dark:text-white whitespace-nowrap'>
        {book.available ? (
          <span className='text-green-500 bg-green-200 px-4 py-2 font-medium rounded-full'>
            Available
          </span>
        ) : (
          <span className='text-red-500 bg-red-200 px-4 py-2 font-medium rounded-full'>
            Unavailable
          </span>
        )}
      </td>
      <td className='px-4 py-4 text-sm whitespace-nowrap'>
        <div className='relative inline-block text-left' ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className='p-2 rounded hover:bg-gray-200 focus:outline-none'
          >
            <MoreVertical className='w-5 h-5 text-gray-600' />
          </button>

          {open && (
            <div className='absolute left-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1'>
              <div className='py-1 flex flex-col'>
                <EditBookModal book={book} setOpen={setOpen} />
                <BorrowBookModal bookId={book._id} setOpen={setOpen} />
                <button
                  onClick={() => handelDelete(book._id)}
                  className='w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left'
                >
                  <span>
                    <MdDelete className='inline mr-2' />
                  </span>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
