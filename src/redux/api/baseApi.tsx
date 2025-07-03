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
    getBookById: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ['Book'],
    }),
    editBook: builder.mutation({
      query: ({book, id}) => {
        return {
          url: `/edit-book/${id}`,
          method: 'PATCH',
          body: book,
        };
      },
      invalidatesTags: ['Book'],
    }),
  }),
});

export const { useAddBookMutation, useGetAllBooksQuery ,useEditBookMutation} = baseApi;
