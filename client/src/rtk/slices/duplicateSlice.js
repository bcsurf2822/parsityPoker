
import { createSlice } from "@reduxjs/toolkit";

export const preventDublicateSlice = createSlice({
    name: 'duplicateActions/preventDublicate',
    initialState: null,
    reducers: {
        setLastAction: (state, action) => {
            return {
                type: action.payload.type,
                timestamp: action.payload.timestamp
            };
        }
    }
});

export const { setLastAction } = preventDublicateSlice.actions;
export default preventDublicateSlice.reducer;
