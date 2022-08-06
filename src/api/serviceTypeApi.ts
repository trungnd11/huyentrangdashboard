import axios from "axios";
import url from "./baseUrl";

const serviceTypeUrl = `${url}/service-type`;

export const getServiceType = () => axios.get(serviceTypeUrl);
