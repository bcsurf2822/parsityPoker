import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  tagTypes: ["Game"],
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => {
        console.log("Querying games endpoint");
        return "games";
      },
      providesTags: ["Game"],
    }),
  }),
});

export const { useGetGamesQuery, useJoinGameMutation } = api;
