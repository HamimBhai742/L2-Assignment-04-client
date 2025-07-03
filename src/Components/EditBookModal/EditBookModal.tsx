import { useAddBookMutation, useEditBookMutation } from '@/redux/api/baseApi';
import type { IBook, IBook2 } from '@/redux/type';
import { useForm, type FieldValue } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
export function EditBookModal({ book, setOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [editBook, { isLoading }] = useEditBookMutation();
  useEffect(() => {
    reset({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      description: book.description,
      copies: book.copies,
    });
  }, [book, reset]);
  const onSubmit = async (data: FieldValue<IBook>) => {
    console.log(data);
    const res = await editBook({
      book: data,
      id: book._id,
    });
    // const res = await AddNewBook(bookData);
    if (res.data) {
      toast.success(res.data.message);
      reset();
      setIsOpen(false);
      setOpen(false);
    }
    if (res.error) {
      const err = res.error as { data: { message: string } };
      toast.error(err.data.message);
    }
  };

  // const handelEditBookModal = () => {
  //   if (book.available === false) {
  //     setOpen(false);
  //     toast.error('This book is currently unavailable for editing.');
  //     return;
  //   }
  //   setIsOpen(true);
  // };
  return (
    <div className='flex items-center justify-centerbg-gradient-to-br from-blue-100 to-purple-200'>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className='w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left'
      >
        <span>
          <MdEdit className='inline mr-2' />
        </span>
        Edit
      </button>

      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 backdrop-blur-sm'>
          <div className='w-3xl mx-auto mt-10 px-6 py-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg'>
            <h2 className='text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8'>
              📚 Update Book
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='grid gap-6 grid-cols-2'
            >
              {/* Book Title */}
              <div>
                <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
                  Book Title
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className='w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter book title'
                />
                {typeof errors.title?.message === 'string' && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Author */}
              <div>
                <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
                  Author
                </label>
                <input
                  {...register('author', { required: 'Author is required' })}
                  className='w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter author name'
                />
                {typeof errors.author?.message === 'string' && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.author.message}
                  </p>
                )}
              </div>

              {/* Genre */}
              <div>
                <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
                  Genre
                </label>
                <select
                  {...register('genre', { required: 'Genre is required' })}
                  className='w-full px-4 py-2 h-11 border select rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>Select genre</option>
                  <option value='FICTION'>Fiction</option>
                  <option value='NON-FICTION'>Non-Fiction</option>
                  <option value='FANTASY'>Fantasy</option>
                  <option value='SCIENCE'>Science</option>
                  <option value='HISTORY'>History</option>
                  <option value='BIOGRAPHY'>Biography</option>
                </select>
                {typeof errors.genre?.message === 'string' && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.genre.message}
                  </p>
                )}
              </div>

              {/* ISBN */}
              <div>
                <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
                  ISBN
                </label>
                <input
                  {...register('isbn', {
                    required: 'ISBN is required',
                    minLength: {
                      value: 10,
                      message: 'ISBN must be at least 10 characters long',
                    },
                    maxLength: {
                      value: 10,
                      message: 'ISBN must be at most 10 characters long',
                    },
                  })}
                  className='w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter ISBN number'
                />
                {typeof errors.isbn?.message === 'string' && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.isbn.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className='col-span-2'>
                <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
                  Description
                </label>
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 30,
                      message:
                        'Description must be at least 30 characters long',
                    },
                  })}
                  className='w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter book description'
                  rows={4}
                ></textarea>
                {typeof errors.description?.message === 'string' && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Total Copies */}
              <div>
                <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
                  Total Copies
                </label>
                <input
                  type='number'
                  {...register('copies', {
                    required: 'Total copies is required',
                    min: {
                      value: 1,
                      message: 'Copies must be at least 1',
                    },
                    valueAsNumber: true,
                  })}
                  className='w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter total copies'
                />
                {typeof errors.copies?.message === 'string' && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.copies.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className='text-center mt-3 col-span-2'>
                <button
                  type='submit'
                  className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 h-12 px-6 rounded-lg transition duration-200 w-full'
                >
                  {isLoading ? (
                    <FaSpinner className='animate-spin mx-auto' />
                  ) : (
                    <span>
                      <span>📚 </span> Update Book
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    // <div>
    //   <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
    //     <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
    //       <h2 className='text-xl font-semibold mb-4'>This is a Modal</h2>
    //       <p className='mb-4'>You can add any content you want here.</p>
    //       <button
    //         onClick={() => setIsOpen(false)}
    //         className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
    //       >
    //         Close
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
