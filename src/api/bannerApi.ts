import axios from "axios";
import url from "./baseUrl";
import { BannerModel } from "../model/BannerModel";

const bannerUrl = `${url}/banners`;

export const getBanners = () => axios.get(bannerUrl);

export const createBanner = (banner: BannerModel) => axios.post(bannerUrl, banner);

export const updateBanner = (banner: BannerModel) =>
  axios.put(bannerUrl, banner);

export const deleteBanner = (banner: BannerModel) => axios.delete(`${bannerUrl}/${banner._id}`);