import type { IBook } from '@/redux/type';
import { MoreVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MdDelete  } from 'react-icons/md';
import { IoBook } from 'react-icons/io5';
import { EditBookModal } from '@/components/EditBookModal/EditBookModal';
import { BorrowBookModal } from '@/components/BorrowBookModal/BorrowBookModal';
export default function BooksRow({ book }: { book: IBook }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  console.log(book);
  return (
    <tr>
      <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
        <div className='inline-flex items-center gap-x-3'>
          <input
            type='checkbox'
            className='text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700'
          />

          <div className='flex items-center gap-x-2'>
            <div className='flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800'></div>

            <div>
              <h2 className='font-normal text-gray-800 dark:text-white '>
                The Absolute Basics.mp4
              </h2>
              <p className='text-xs font-normal text-gray-500 dark:text-gray-400'>
                720 MB
              </p>
            </div>
          </div>
        </div>
      </td>
      <td className='px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap'>
        720 MB
      </td>
      <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap'>
        Jan 8, 2022
      </td>
      <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap'>
        Jan 8, 2022
      </td>
      <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap'>
        Demi Wilkinson
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
                <EditBookModal/>
                <BorrowBookModal/>
                <button className='w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left'>
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
