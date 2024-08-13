import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://13.60.185.80:9090/api/v1/money";

export const postMoney = createAsyncThunk('data/postData', async (newData) => {
  const token = localStorage.getItem('authToken');
  const response = await axios.post(`${BASE_URL}/user/upload`, newData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const getMoney = createAsyncThunk('data/getData', async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteMoney = createAsyncThunk('data/delete', async (id) => {
  const token = localStorage.getItem('authToken');
  await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postMoney.pending, (state) => {
        state.loading = true;
      })
      .addCase(postMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(postMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMoney.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMoney.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default dataSlice.reducer;
