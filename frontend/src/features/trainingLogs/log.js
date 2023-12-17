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

export const updateTrainingSession = createAsyncThunk(
  "log/updateTrainingSession",
  async (trainingSession, thunkAPI) => {
    try {
      const res = await fetch(
        `api/training-log/training-session/${trainingSession.id}/update`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // 'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify(trainingSession),
        }
      );
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
      })
      .addCase(addTrainingSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTrainingSession.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingLogs.push(action.payload);
      })
      .addCase(addTrainingSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTrainingSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTrainingSession.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTrainingSession = action.payload;
        const index = state.trainingLogs.findIndex(
          (trainingSession) => trainingSession.id === updatedTrainingSession.id
        );
        state.trainingLogs[index] = updatedTrainingSession;
      })
      .addCase(updateTrainingSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTrainingSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTrainingSession.fulfilled, (state, action) => {
        state.loading = false;
        const { sessionId } = action.payload;
        state.trainingLogs = state.trainingLogs.filter(
          (trainingSession) => trainingSession.id !== sessionId
        );
      })
      .addCase(deleteTrainingSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default logSlice.reducer;
