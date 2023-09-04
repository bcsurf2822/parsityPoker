import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => 'games',
      providesTags: ['Game']
    }),
    // ... other endpoints will come here ...
  }),
});

export const { useGetGamesQuery } = api;