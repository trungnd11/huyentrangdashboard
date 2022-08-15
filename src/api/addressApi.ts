import axios from "axios";
import url from "./baseUrl";

const addressUrl = `${url}/address`;

export const getAddress = () => axios.get(addressUrl);
