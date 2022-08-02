import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBanners } from "../../api/banner";

const initialState = {
  loading: true,
  banners: []
}

export const fetBanners = createAsyncThunk("banners/fetlist", async () => {
  const res = await getBanners();
  return res.data
});

const banners = createSlice({
  name: "banners",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetBanners.fulfilled, (state, action) => {
      state.loading = false;
      state.banners = action.payload;
    })
  }
});

export default banners.reducer