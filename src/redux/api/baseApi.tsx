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
  }),
});

export const { useAddBookMutation, useGetAllBooksQuery } = baseApi;
