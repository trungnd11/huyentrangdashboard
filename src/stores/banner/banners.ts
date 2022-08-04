import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBanners, createBanner, BannerType } from "../../api/banner";

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
    console.log(banner)
    const res = await createBanner(banner);
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
  }
});

export default banners.reducer