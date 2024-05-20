import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  trainingCycles: [],
  loading: false,
  error: null,
};

const trainingCycleSlice = createSlice({
  name: "trainingCycle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMacrocycle.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMacrocycle.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingCycles = action.payload;
      })
      .addCase(createMacrocycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }, // Add a closing parenthesis here
});

export default trainingCycleSlice.reducer;
