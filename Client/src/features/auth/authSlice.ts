import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { any } from "prop-types";

export type USER = {
  _id?: string;
  name: string;
  email: string;
  password: string;
};

export interface UserAuth {
  user: USER | null;
  token: string;
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string;
}

const user: USER = JSON.parse(localStorage.getItem("user") || "null");
const token = localStorage.getItem("token");

const initialState: UserAuth = {
  error: false,
  loading: false,
  message: "",
  success: false,
  token: token ? token : "",
  user: user ? user : null,
};

export type registerUser = {
  name: string;
  email: string;
  password: string;
};

// Register User

export const register = createAsyncThunk(
  "auth/register",
  async (user: registerUser, thunkApi) => {
    try {
      const val = await authService.register(user);
      console.log("In register slice: ", val);
      return val;
    } catch (err: any) {
      console.log(err);
      const message =
        (err?.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Login User

export const login = createAsyncThunk(
  "auth/Login",
  async (userData: { email: string; password: string }, thunkApi) => {
    try {
      const val = await authService.login(userData);
      console.log("In login slice: ", val);

      if (val == null) {
        throw "Bad user input";
      }

      return val;
    } catch (err: any) {
      console.log(err);
      const message =
        (err?.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.loading = false;
      state.success = false;
      state.message = "";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log(action.payload);
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = <string>action.payload;
        state.user = null;
        state.token = "";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log(action.payload);
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = <string>action.payload;
        state.user = null;
        state.token = "";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = "";
      });
  },
});

export const { reset, setUser } = authSlice.actions;
export default authSlice.reducer;
