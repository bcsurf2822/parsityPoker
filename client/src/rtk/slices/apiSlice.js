import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAction } from "@reduxjs/toolkit";

export const gameUpdated = createAction("api/gameUpdated");

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  tagTypes: ["Game"],
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => {
        console.log("Querying games endpoint"); // Added log
        return "games";
      },
      providesTags: ["Game"],
    }),
    joinGame: builder.mutation({
      query: ({ gameId, seatId, userId, buyIn }) => {
        console.log("Joining game with parameters:", { gameId, seatId, userId, buyIn }); // Added log
        return {
          url: `join/${gameId}/${seatId}`,
          method: "POST",
          body: { userId, buyIn },
        };
      },
      invalidatesTags: ["Game"],
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(gameUpdated, (state, action) => {
      console.log("gameUpdated action received with payload:", action.payload); // Added log
      console.log("Current state before updating:", state); // Added log

      if (state.queries["games"]) {
        state.queries["games"].data = action.payload;
      }

      console.log("Updated state after gameUpdated:", state); // Added log
    });
  },
});

export const { useGetGamesQuery, useJoinGameMutation } = api;
