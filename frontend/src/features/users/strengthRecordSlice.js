import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const createStrengthRecord = createAsyncThunk(
  "users/strength-records/create",
  async (strengthRecord, thunkAPI) => {
    const body = JSON.stringify(strengthRecord);
    try {
      const res = await fetch(`api/users/strength-records/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      if (res.status === 201) {
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
  records: [],
  loading: false,
};

const strengthRecordSlice = createSlice({
  name: "strengthRecords",
  initialState,
  reducers: {
    clearStrengthRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStrengthRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStrengthRecords.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
      })
      .addCase(getAllStrengthRecords.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createStrengthRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStrengthRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
        state.loading = false;
      })
      .addCase(createStrengthRecord.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default strengthRecordSlice.reducer;
