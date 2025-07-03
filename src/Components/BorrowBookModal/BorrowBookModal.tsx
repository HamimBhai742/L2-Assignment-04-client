import { useBorrowBookMutation } from '@/redux/api/baseApi';
import type { BorroBook } from '@/redux/type';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { IoBook } from 'react-icons/io5';
import { useNavigate } from 'react-router';

export function BorrowBookModal({ bookId, setOpen }: { bookId: string, setOpen: (open: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data: BorroBook) => {
    console.log(bookId);
    const res = await borrowBook({ bookId, data });
    console.log(res);
    if (res.data) {
      toast.success(res.data.message);
      navigate('/borrow-summary');
      setIsOpen(false);
    }
    if (res.error) {
      const err = res.error as { data: { message: string } };
      toast.error(err.data.message);
      reset();
    }
  };
  const handelColseModal = () => {
    setIsOpen(false);
    setOpen(false);
  };
  return (
    <div className='flex items-center justify-centerbg-gradient-to-br from-blue-100 to-purple-200'>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className='w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left'
      >
        <span>
          <IoBook className='inline mr-2' />
        </span>
        Borrow
      </button>
      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 backdrop-blur-sm'>
          <div className='w-3xl fixed mx-auto mt-10 px-6 py-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg'>
            <h2 className='text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8'>
              📚 Borrow Book
            </h2>
            <span
              className='absolute top-4 right-4 text-gray-500 cursor-pointer'
              onClick={handelColseModal}
            >
              <X className='w-6 h-6' />{' '}
            </span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='grid gap-6 grid-cols-2'
            >
              {/* Book Quntity */}
              <div>
                <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
                  Book Quantity
                </label>
                <input
                  type='number'
                  {...register('quantity', {
                    required: 'Quantity is required',
                    min: {
                      value: 1,
                      message: 'Quantity must be at least 1',
                    },
                    valueAsNumber: true,
                  })}
                  className='w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter book quantity'
                />
                {typeof errors.quantity?.message === 'string' && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.quantity.message}
                  </p>
                )}
              </div>
              {/* Due  Date */}
              <div>
                <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
                  Due Date
                </label>
                <input
                  {...register('dueDate', { required: 'Due date is required' })}
                  className='w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter due date'
                  type='date'
                />
                {typeof errors.dueDate?.message === 'string' && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.dueDate.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className='text-center mt-3 col-span-2'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 h-12 px-6 rounded-lg transition duration-200 w-full'
                >
                  {isLoading ? (
                    <FaSpinner className='animate-spin mx-auto' />
                  ) : (
                    <span>
                      <span>📚 </span> Borrow Book
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
