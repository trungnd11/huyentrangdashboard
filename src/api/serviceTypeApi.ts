import axios from "axios";
import url from "./baseUrl";
import { TypeServiceModel } from "../model/TypeServiceModel";

const serviceTypeUrl = `${url}/service-type`;

export const getServiceType = () => axios.get(serviceTypeUrl);

export const createServiceType = (serviceType: TypeServiceModel) =>
  axios.post(serviceTypeUrl, serviceType);

export const updateServiceType = (serviceType: TypeServiceModel) =>
  axios.put(serviceTypeUrl, serviceType);

export const deleteServiceType = (id: any) => axios.delete(`${serviceTypeUrl}/${id}`);
