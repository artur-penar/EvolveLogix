import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userEndpoints from "./userEndpoints";

export const getAllStrengthRecords = createAsyncThunk(
  "strengthRecords/all",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`api/users/strength-records/all`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  strengthRecords: [],
  loading: false,
};

const strengthRecordSlice = createSlice({
  name: "strengthRecords",
  initialState,
  reducers: {
    clearStrengthRecords: (state) => {
      state.strengthRecords = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStrengthRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStrengthRecords.fulfilled, (state, action) => {
        state.strengthRecords = action.payload;
        state.loading = false;
      })
      .addCase(getAllStrengthRecords.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default strengthRecordSlice.reducer;
