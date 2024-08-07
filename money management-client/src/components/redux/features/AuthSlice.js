import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:9090/api/v1/auth";

export const loginUser = createAsyncThunk('/signin', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/signin`, { email, password });
    localStorage.setItem('authToken', response.data.token);
    // console.log(response);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const signupUser = createAsyncThunk('/signup', async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, { email, password, firstName, lastName });
    console.log(response)
    return response.data;
  } catch (err) {
    if (!err.response) {
      return rejectWithValue('Network error. Please try again later.');
    }
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  isAuthenticated: !!localStorage.getItem('authToken'),
  email: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('authToken');
      state.isAuthenticated = false;
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
