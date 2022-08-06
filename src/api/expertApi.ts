import axios from "axios";
import url from "./baseUrl";

const expertUrl = `${url}/expert`;

export const getExperts = () => axios.get(expertUrl);