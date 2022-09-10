import axios from "axios";
import { UserModel } from "../model/UserModel";
import url from "./baseUrl";

export const loginApi = (user: UserModel) => axios.post(`${url}/user/login`, user);

export const getSession = () => axios.get(`${url}/get-session`);