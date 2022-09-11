import axios from "axios";
import { UserModel } from "../model/UserModel";
import url from "./baseUrl";

export const loginApi = (user: UserModel) => axios.post(`${url}/user/login`, user);

export const logoutApi = (token: { refreshToken: string }) =>
  axios.post(`${url}/user/logout`, token);

export const getSession = () => axios.get(`${url}/get-session`);