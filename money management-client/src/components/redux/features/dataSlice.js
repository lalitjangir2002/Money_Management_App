import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:9090/api/money";

export const postMoney = createAsyncThunk('data/postData', async (newData) => {
  const response = await axios.post(`${BASE_URL}/upload`, newData);
  return response.data;
});

export const getMoney = createAsyncThunk('data/getData', async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
});

export const deleteMoney = createAsyncThunk('data/delete', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
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
        // state.items.push(action.payload);
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
