const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

export const getExercises = createAsyncThunk(
  "exercises/getExercises",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/training_log/exercises/", {
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
  exercises: [],
  loading: false,
  error: null,
};

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExercises.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(getExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default exercisesSlice.reducer;
