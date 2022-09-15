import axios from "axios";
import url from "./baseUrl";

export const getBlogs = (limit: string) => axios.get(`${url}/blogs?limit=${limit}`);