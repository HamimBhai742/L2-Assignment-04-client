import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useGetSignleBookByIdQuery } from '@/redux/api/baseApi';
import { Link, useParams } from 'react-router';
import {
  User,
  Tags,
  Barcode,
  FileText,
  CheckCircle,
  Layers,
  CalendarPlus,
  Clock,
} from 'lucide-react';
import { ImSpinner } from 'react-icons/im';
import { FaArrowLeft } from 'react-icons/fa';

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSignleBookByIdQuery(id);
  const book = data?.data;

  if (isLoading)
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <ImSpinner className='animate-spin text-9xl ' />
      </div>
    );
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6 sm:p-8'>
      <Card className='w-full max-w-3xl rounded-2xl shadow-2xl dark:bg-gray-900'>
        <CardContent className='p-6 sm:p-8'>
          <div>
            <div className='-mt-10'>
              <Link to='/books' className='flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400'><span><FaArrowLeft/></span> Go Back</Link>
            </div>
            <h1 className='text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-green-800 dark:text-green-300'>
              📚 {book.title}
            </h1>
          </div>

          <div className='grid grid-cols-1 mt-6 sm:grid-cols-2 gap-4 sm:gap-6 text-base sm:text-lg text-gray-700 dark:text-gray-300'>
            <div className='flex items-center gap-2'>
              <User className='w-5 h-5' />{' '}
              <span className='font-semibold'>Author:</span> {book.author}
            </div>
            <div className='flex items-center gap-2'>
              <Tags className='w-5 h-5' />{' '}
              <span className='font-semibold'>Genre:</span>{' '}
              <Badge className='p-2 font-medium' variant='outline'>
                {book.genre}
              </Badge>
            </div>
            <div className='flex items-center gap-2'>
              <Barcode className='w-5 h-5' />{' '}
              <span className='font-semibold'>ISBN:</span> {book.isbn}
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='w-5 h-5' />{' '}
              <span className='font-semibold'>Availability:</span>{' '}
              {book.available ? (
                <Badge className='bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 p-1 rounded-full px-2'>
                  Available
                </Badge>
              ) : (
                <Badge className='bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200 p-1 rounded-full px-2'>
                  Unavailable
                </Badge>
              )}
            </div>
            <div className='flex items-center gap-2'>
              <Layers className='w-5 h-5' />{' '}
              <span className='font-semibold'>Total Copies :</span>{' '}
              {book.copies}
            </div>

            <div className=' sm:col-span-2'>
              <div className='flex  items-center gap-2'>
                <FileText className='w-5 h-5' />{' '}
                <span className='font-semibold text-sm inline-block'>
                  Description:
                </span>
              </div>
              <p className='ml-8 text-gray-600 dark:text-gray-400'>
                {book.description}
              </p>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <CalendarPlus className='w-5 h-5' />{' '}
              <span className='font-semibold'>Created At:</span>{' '}
              {new Date(book.createdAt).toLocaleString()}
            </div>
            <div className='flex items-center gap-2  text-sm'>
              <Clock className='w-5 h-5' />{' '}
              <span className='font-semibold'>Last Updated:</span>{' '}
              {new Date(book.updatedAt).toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
