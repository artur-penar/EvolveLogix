import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import trainingLogEndpoints from "./trainingLogEndpoints";

export const getTrainingLog = createAsyncThunk(
  "log/getTrainingLog",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("api/training-log", {
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

export const addTrainingSession = createAsyncThunk(
  "log/addTrainingSession",
  async (trainingSession, thunkAPI) => {
    try {
      const res = await fetch("api/training-log/addTrainingSession", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // 'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(trainingSession),
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

export const deleteTrainingSession = createAsyncThunk(
  "log/deleteTrainingSession",
  async (sessionId, thunkAPI) => {
    try {
      const res = await fetch(
        `api/training-log/training-session/${sessionId}/delete`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (res.status === 200 || res.status === 204) {
        return { sessionId };
      } else {
        const data = await res.json();
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  trainingLogs: [],
  loading: false,
  error: null,
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrainingLog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTrainingLog.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingLogs = action.payload;
      })
      .addCase(getTrainingLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default logSlice.reducer;
