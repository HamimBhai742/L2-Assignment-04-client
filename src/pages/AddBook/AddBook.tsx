import { useAddBookMutation } from '@/redux/api/baseApi';
import type { IBook, IBook2 } from '@/redux/type';
import { useForm, type FieldValue } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const AddBook = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [AddNewBook, { isLoading }] = useAddBookMutation();

  const onSubmit = async (data: FieldValue<IBook>) => {
    const bookData: IBook  = {
      ...(data as IBook2),
      available: true,
    };

    const res = await AddNewBook(bookData);
    if (res.data) {
      toast.success(res.data.message);
      reset();
      navigate('/books');
    }
    if (res.error) {
      const err = res.error as { data: { message: string } };
      toast.error(err.data.message);
    }
  };

  return (
    <div className='max-w-4xl mx-auto mt-10 px-6 py-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg'>
      <h2 className='md:text-4xl text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8'>
        📚 Add New Book
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-6 md:grid-cols-2 max-sm:flex max-sm:flex-col'
      >
        {/* Book Title */}
        <div>
          <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
            Book Title
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            className='w-full px-4 h-12 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter book title'
          />
          {typeof errors.title?.message === 'string' && (
            <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
            Author
          </label>
          <input
            {...register('author', { required: 'Author is required' })}
            className='w-full h-12 px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter author name'
          />
          {typeof errors.author?.message === 'string' && (
            <p className='text-red-500 text-sm mt-1'>{errors.author.message}</p>
          )}
        </div>

        {/* Genre */}
        <div>
          <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
            Genre
          </label>
          <select
            {...register('genre', { required: 'Genre is required' })}
            className='w-full px-4 h-12 py-2 border select rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
            <p className='text-red-500 text-sm mt-1'>{errors.genre.message}</p>
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
            className='w-full h-12 px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter ISBN number'
          />
          {typeof errors.isbn?.message === 'string' && (
            <p className='text-red-500 text-sm mt-1'>{errors.isbn.message}</p>
          )}
        </div>

        {/* Description */}
        <div className='md:col-span-2'>
          <label className='block font-semibold text-gray-700 dark:text-gray-200 mb-1'>
            Description
          </label>
          <textarea
            {...register('description', {
              required: 'Description is required',
              minLength: {
                value: 30,
                message: 'Description must be at least 30 characters long',
              },
            })}
            className='w-full  px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
            className='w-full h-12 px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter total copies'
          />
          {typeof errors.copies?.message === 'string' && (
            <p className='text-red-500 text-sm mt-1'>{errors.copies.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className='text-center mt-3 col-span-2'>
          <button
            type='submit'
            className='bg-blue-600 h-12 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 w-full'
          >
            {isLoading ? (
              <FaSpinner className='animate-spin mx-auto' />
            ) : (
              <span>
                <span>📚 </span> Add Book
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
