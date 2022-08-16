import axios from "axios";
import url from "./baseUrl";

const phoneUrl = `${url}/phone`;

export const getPhone = () => axios.get(phoneUrl);
