import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => 'games',
      providesTags: ['Game']
    }),
    joinGame: builder.mutation({
      query: ({ gameId, seatId, userId, buyIn }) => ({
        url: `join/${gameId}/${seatId}`,
        method: 'POST',
        body: { userId, buyIn },
      }),
      // After successfully joining a game, invalidate the 'Game' tag to refetch games
      invalidatesTags: ['Game'],
    }),
    // ... other endpoints will come here ...
  }),
});

export const { useGetGamesQuery, useJoinGameMutation  } = api;