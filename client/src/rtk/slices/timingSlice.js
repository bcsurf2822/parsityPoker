import { createSlice } from '@reduxjs/toolkit';

const timingSlice = createSlice({
  name: 'countdown',
  initialState: {
    value: 0,     
    isCounting: false
  },
  reducers: {
    setCountdown: (state, action) => {
      console.log("Setting countdown to", action.payload);
      state.value = action.payload;
      state.isCounting = true;
},
decrementCountdown: (state) => {
      console.log("Decrementing countdown. Current value:", state.value);
      state.value -= 1;
      if (state.value <= 0) {
        state.isCounting = false;
      }
},
    stopCountdown: (state) => {
      state.value = 0;
      state.isCounting = false;
    }
  }
});

export const { setCountdown, decrementCountdown, stopCountdown } = timingSlice.actions;

export default timingSlice.reducer;