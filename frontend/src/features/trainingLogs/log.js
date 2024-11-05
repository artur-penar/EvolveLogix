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
  async ({ training_session, training_log_id }, thunkAPI) => {
    try {
      const res = await fetch("api/training-log/addTrainingSession", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // 'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          training_session,
          training_log_id,
        }),
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

const updateSelectedTrainingLog = (state, updatedLog) => {
  if (
    state.selectedTrainingLog &&
    state.selectedTrainingLog.id === updatedLog.id
  ) {
    state.selectedTrainingLog = updatedLog;
    saveSelectedTrainingLog(updatedLog);
  }
};

const saveSelectedTrainingLog = (trainingLog) => {
  localStorage.setItem("selectedTrainingLog", JSON.stringify(trainingLog));
};

const loadSelectedTrainingLog = () => {
  const savedTrainingLog = localStorage.getItem("selectedTrainingLog");
  if (!savedTrainingLog) {
    return null;
  }

  try {
    const parsedLog = JSON.parse(savedTrainingLog);
    console.log("Parsed training log:", parsedLog);
    return parsedLog;
  } catch (error) {
    console.error("Failed to parse saved training log:", error);
    return null;
  }
};

const initialState = {
  trainingLogs: [],
  selectedTrainingLog: loadSelectedTrainingLog(),
  loading: false,
  error: null,
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setSelectedTrainingLog: (state, action) => {
      state.selectedTrainingLog = action.payload;
      saveSelectedTrainingLog(action.payload);
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
          (log) => log.id === newTrainingSession.training_log
        );
        if (trainingLog) {
          trainingLog.training_sessions.push(newTrainingSession);
          updateSelectedTrainingLog(state, trainingLog);
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
        const trainingLog = state.trainingLogs.find(
          (log) => log.id === updatedTrainingSession.training_log
        );

        if (trainingLog) {
          const trainingSessionIndex = trainingLog.training_sessions.findIndex(
            (session) => session.id === updatedTrainingSession.id
          );
          trainingLog.training_sessions[trainingSessionIndex] =
            updatedTrainingSession;
          updateSelectedTrainingLog(state, trainingLog);
        }
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
        const trainingSession =
          state.selectedTrainingLog.training_sessions.find(
            (session) => session.id === sessionId
          );
        const trainingLog = state.trainingLogs.find(
          (log) => log.id === trainingSession.training_log
        );
        if (trainingLog) {
          trainingLog.training_sessions = trainingLog.training_sessions.filter(
            (session) => session.id !== sessionId
          );
          updateSelectedTrainingLog(state, trainingLog);
        }
      })
      .addCase(deleteTrainingSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedTrainingLog } = logSlice.actions;
export default logSlice.reducer;
