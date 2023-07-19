// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";


// export const viewTable = createAsyncThunk(
//   "table/view",
//   async (gameId) => {
//     const response = await axios.get(`http://localhost:4000/games/view/${gameId}`);
//     console.log(response.data)
//     return response.data;
//   }
// );

// const tableSlice = createSlice({
//   name: "table",
//   initialState: { 
//     isJoined: false,
//     loading: false,
//     error: null,
//     joinedTable: null,
//     viewedTable: null,
//     gameId: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(viewTable.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(viewTable.fulfilled, (state, action) => {
//         state.loading = false;
//         state.viewedTable = action.payload;
//       })
//       .addCase(viewTable.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to view table';
//       });
//   },
// });

// export default tableSlice.reducer;