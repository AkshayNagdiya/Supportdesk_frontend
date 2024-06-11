import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authservice from "./Authservice";
import authService from "./Authservice";

const usersExist = JSON.parse(localStorage.getItem("users"));
const initialState = {
  users: usersExist ? usersExist : null,
  allusers: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersRegister.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.users = null;
        state.isError = false;
      })
      .addCase(usersRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        state.isError = false;
      })
      .addCase(usersRegister.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.users = null;
        state.message = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.users = null;
        state.isError = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        state.isError = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isError = "User Not Registered";
        state.isLoading = false;
        state.isSuccess = false;
        state.users = null;
        state.message = action.payload;
      })
      .addCase(usersLogOut.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.users = null;
        state.isError = false;
      })
      .addCase(usersLogOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = null;
        state.isError = false;
      })
      .addCase(usersLogOut.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.users = null;
        state.message = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allusers = action.payload;
        state.isError = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(blockUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allusers = state.allusers.map((user) =>
          user._id === action.payload.userId
            ? { ...user, isBlocked: true }
            : user
        );
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export default AuthSlice.reducer;

export const usersRegister = createAsyncThunk(
  "REGISTER",
  async (formData, thunkAPI) => {
    try {
      return await authservice.register(formData);
    } catch (error) {
      const message = error || error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const userLogin = createAsyncThunk(
  "LOGIN",
  async (formData, thunkAPI) => {
    try {
      return await authservice.login(formData);
    } catch (error) {
      const message = error || error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const usersLogOut = createAsyncThunk("LOGOUT", async () => {
  return localStorage.removeItem("users");
});

export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      return await authservice.getAllUsers();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blockUser = createAsyncThunk(
  "auth/blockUser",
  async ({userId, isBlocked}, { rejectWithValue }) => {
    try {
      return await authService.BlockUser(userId , isBlocked)
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
