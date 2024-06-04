import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTrainingCycles = createAsyncThunk(
  "trainingCycle/getTrainingCycles",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/training-cycle/", {
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
  async (name, thunkAPI) => {
    console.log("Action dispatched");
    try {
      const res = await fetch("/api/training-cycle/macrocycles/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
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
  async ({ name, macrocycle }, thunkAPI) => {
    try {
      const res = await fetch("/api/training-cycle/mesocycles/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, macrocycle }),
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
  async ({ mesocycle, type, training_sessions }, thunkAPI) => {
    try {
      const res = await fetch("/api/training-cycle/phases/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mesocycle, type, training_sessions }),
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
  loading: false,
  error: null,
};

const trainingCycleSlice = createSlice({
  name: "trainingCycle",
  initialState,
  reducers: {
    setSelectedMacrocycle: (state, action) => {
      state.selectedMacrocycle = action.payload;
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
        state.trainingCycles.push(action.payload);
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

export const { setSelectedMacrocycle } = trainingCycleSlice.actions;

export default trainingCycleSlice.reducer;
