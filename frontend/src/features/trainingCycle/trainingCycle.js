import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTrainingCycles = createAsyncThunk(
  "trainingCycle/getTrainingCycles",
  async ({ training_log_id }, thunkAPI) => {
    try {
      const url = `/api/training-cycle/?training_log_id=${training_log_id}`;

      const res = await fetch(url, {
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

export const createMacrocycle = createAsyncThunk(
  "trainingCycle/createMacrocycle",
  async ({ name, training_log_id, start_date, end_date }, thunkAPI) => {
    try {
      const res = await fetch("/api/training-cycle/macrocycles/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          training_log_id: training_log_id,
          start_date: start_date,
          end_date: end_date,
        }),
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

export const addMesocycle = createAsyncThunk(
  "trainingCycle/addMesocycle",
  async ({ name, macrocycle, duration, start_date }, thunkAPI) => {
    try {
      const res = await fetch("/api/training-cycle/mesocycles/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, macrocycle, start_date, duration }),
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

export const addPhase = createAsyncThunk(
  "trainingCycle/addPhase",
  async (
    { mesocycle, type, start_date, end_date, duration, training_sessions },
    thunkAPI
  ) => {
    try {
      const res = await fetch("/api/training-cycle/phases/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mesocycle,
          type,
          start_date,
          end_date,
          duration,
          training_sessions,
        }),
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
  trainingCycles: [],
  selectedMacrocycle: null,
  selectedMesocycle: null,
  loading: false,
  error: null,
  updateTrigger: 0,
};

const trainingCycleSlice = createSlice({
  name: "trainingCycle",
  initialState,
  reducers: {
    setSelectedMacrocycle: (state, action) => {
      state.selectedMacrocycle = action.payload;
    },
    setSelectedMesocycle: (state, action) => {
      state.selectedMesocycle = action.payload;
    },
    updateUpdateTrigger: (state) => {
      state.updateTrigger += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTrainingCycles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrainingCycles.fulfilled, (state, action) => {
        state.trainingCycles = action.payload;
        state.loading = false;
      })
      .addCase(getTrainingCycles.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createMacrocycle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMacrocycle.fulfilled, (state, action) => {
        state.trainingCycles.push(action.payload);
        state.loading = false;
      })
      .addCase(createMacrocycle.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addMesocycle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMesocycle.fulfilled, (state, action) => {
        const { macrocycle, ...mesocycle } = action.payload;
        const macrocycleIndex = state.trainingCycles.findIndex(
          (cycle) => cycle.id === macrocycle
        );

        if (macrocycleIndex !== -1) {
          state.trainingCycles[macrocycleIndex].mesocycles.push(mesocycle);
        } else {
          console.error("Macrocycle not found");
        }
        state.loading = false;
      })
      .addCase(addMesocycle.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addPhase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPhase.fulfilled, (state, action) => {
        state.trainingCycles.push(action.payload);
        state.loading = false;
      })
      .addCase(addPhase.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }, // Add a closing parenthesis here
});

export const {
  setSelectedMacrocycle,
  setSelectedMesocycle,
  updateUpdateTrigger,
} = trainingCycleSlice.actions;

export default trainingCycleSlice.reducer;
