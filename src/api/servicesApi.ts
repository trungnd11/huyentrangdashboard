import axios from "axios";
import url from "./baseUrl";

const servicesUrl = `${url}/service`;

export const getServicesByType = (type: { serviceType?: string }) =>
  axios.post(`${servicesUrl}/type`, type);