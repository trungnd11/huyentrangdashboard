import axios from "axios";
import url from "./baseUrl";

const servicesUrl = `${url}/service`;

export interface ServiceType {
  description: string;
  name: string;
  serviceType: string;
  image?: string
  _id?: string;
}

export const getServicesByType = (type: { serviceType?: string }) =>
  axios.post(`${servicesUrl}/type`, type);

export const createService = (service: ServiceType) => axios.post(servicesUrl, service);

export const updateService = (service: ServiceType) =>
  axios.put(servicesUrl, service);

export const deleteService = (service: ServiceType) => axios.delete(`${servicesUrl}/${service._id}`);