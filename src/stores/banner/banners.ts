import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBanners, createBanner, updateBanner ,BannerType } from "../../api/banner";

const Banners:any[] = []

const initialState = {
  loading: true,
  banners: Banners,
};

export const fetBanners = createAsyncThunk("banners/fetlist", async () => {
  const res = await getBanners();
  return res.data
});

export const createBanners = createAsyncThunk(
  "banners/create",
  async (banner: BannerType) => {
    const res = await createBanner(banner);
    return res.data;
  }
);

export const updateBanners = createAsyncThunk(
  "banners/update",
  async (banner: BannerType) => {
    const res = await updateBanner(banner);
    return res.data;
  }
);

const banners = createSlice({
  name: "banners",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetBanners.fulfilled, (state, action) => {
      state.loading = false;
      state.banners = action.payload;
    });
    builder.addCase(createBanners.fulfilled, (state, action) => {
      state.loading = false;
      state.banners = [ ...state.banners, action.payload ];
    });
    builder.addCase(updateBanners.fulfilled, (state, action) => {
      const filterBanner = state.banners.filter(item => item._id !== action.payload._id);
      state.loading = false;
      state.banners = [action.payload, ...filterBanner];
    });
  }
});

export default banners.reducer