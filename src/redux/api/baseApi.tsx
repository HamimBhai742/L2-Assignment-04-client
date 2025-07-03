import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
  }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (newBook) => {
        return {
          url: '/create-book',
          method: 'POST',
          body: newBook,
        };
      },
      invalidatesTags: ['Book'],
    }),
    getAllBooks: builder.query({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    getSignleBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['Book'],
    }),
    editBook: builder.mutation({
      query: ({ book, id }) => {
        return {
          url: `/edit-book/${id}`,
          method: 'PATCH',
          body: book,
        };
      },
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete-book/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
    borrowBook: builder.mutation({
      query: ({ bookId, data }) => ({
        url: `/borrow/${bookId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),
    getBorrowSummary: builder.query({
      query: () => '/borrow-summary',
      providesTags: ['Book'],
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetAllBooksQuery,
  useEditBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
  useGetSignleBookByIdQuery
} = baseApi;
