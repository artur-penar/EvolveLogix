import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userEndpoints from "./userEndpoints";

export const register = createAsyncThunk(
  "users/register",
  async ({ email, user_name, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      user_name,
      password,
    });

    console.log(body);
    try {
      const res = await fetch("api/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      console.log(data);

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

export const getUser = createAsyncThunk("users/me", async (_, thunkAPI) => {
  try {
    const res = await fetch("api/users/me", {
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
});

export const getUserDetail = createAsyncThunk(
  "users/detail",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`api/users/detail/${id}`, {
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

export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await fetch(userEndpoints.login, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();

      if (res.status === 200) {
        const { dispatch } = thunkAPI;

        dispatch(getUser());

        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    const res = await fetch(userEndpoints.logout, {
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
});

export const verifyAuth = createAsyncThunk(
  "users/verify",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/users/verify", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        const { dispatch } = thunkAPI;
        dispatch(getUser());
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
  isAuthenticated: false,
  user: null,
  userDetail: null,
  loading: false,
  registered: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.registered = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })

      // Get user
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      })

      // Get user detail
      .addCase(getUserDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(getUserDetail.rejected, (state) => {
        state.loading = false;
      })

      // Verify auth
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuth.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.loading = false;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.registered = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectIsUserAuthenticated = (state) => state.user.isAuthenticated;
export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
