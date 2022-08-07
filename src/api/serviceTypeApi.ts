import axios from "axios";
import url from "./baseUrl";

const serviceTypeUrl = `${url}/service-type`;

export interface TypeServiceType {
  _id?: string;
  serviceType: string;
  description: string;
  image: string
}

export const getServiceType = () => axios.get(serviceTypeUrl);

export const createServiceType = (serviceType: TypeServiceType) =>
  axios.post(serviceTypeUrl, serviceType);

export const updateServiceType = (serviceType: TypeServiceType) =>
  axios.put(serviceTypeUrl, serviceType);

export const deleteServiceType = (id: any) => axios.delete(`${serviceTypeUrl}/${id}`);
