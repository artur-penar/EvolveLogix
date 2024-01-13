import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import trainingLogEndpoints from "./trainingLogEndpoints";

export const getTrainingLogs = createAsyncThunk(
  "log/getTrainingLog",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/training-log/", {
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

export const createTrainingLog = createAsyncThunk(
  "log/createTrainingLog",
  async (name, thunkAPI) => {
    try {
      const res = await fetch("/api/training-log/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // 'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(name),
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
  async ({ name, training_sessions, training_log_id }, thunkAPI) => {
    try {
      const res = await fetch("api/training-log/addTrainingSession", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // 'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ name, training_sessions, training_log_id }),
      });

      const data = await res.json();
      if (res.status === 200 || res.status === 201) {
        thunkAPI.dispatch(getTrainingLogs());
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
        `/api/training-log/training-session/${trainingSession.id}/update`,
        {
          method: "PATCH",
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
        thunkAPI.dispatch(getTrainingLogs());
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
        thunkAPI.dispatch(getTrainingLogs());
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
  selectedTrainingLog: null,
  loading: false,
  error: null,
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setSelectedTrainingLog: (state, action) => {
      state.selectedTrainingLog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrainingLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTrainingLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingLogs = action.payload;
      })
      .addCase(getTrainingLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTrainingLog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTrainingLog.fulfilled, (state, action) => {
        state.loading = false;
        const { trainingLog } = action.payload;
        state.trainingLogs.push(trainingLog);
      })
      .addCase(createTrainingLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTrainingSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTrainingSession.fulfilled, (state, action) => {
        state.loading = false;
        const newTrainingSession = action.payload;
        const trainingLog = state.trainingLogs.find(
          (log) => log.id === newTrainingSession.id
        );
        if (trainingLog) {
          trainingLog.training_sessions.push(newTrainingSession);
        }
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
        state.trainingLogs = state.trainingLogs.map((logData) => ({
          ...logData,
          training_sessions: logData.training_sessions.filter(
            (session) => session.id !== sessionId
          ),
        }));
      })
      .addCase(deleteTrainingSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedTrainingLog } = logSlice.actions;
export default logSlice.reducer;
