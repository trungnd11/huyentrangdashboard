import axios from "axios";
import url from "./baseUrl";

const bannerUrl = `${url}/banners`;
export interface BannerType {
  _id?: string,
  title?: string;
  content?: string;
  img?: string;
}
export const getBanners = () => axios.get(bannerUrl);

export const createBanner = (banner: BannerType) => axios.post(bannerUrl, banner);

export const updateBanner = (banner: BannerType) =>
  axios.put(bannerUrl, banner);

export const deleteBanner = (banner: BannerType) => axios.delete(`${bannerUrl}/${banner._id}`);