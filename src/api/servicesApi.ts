import axios from "axios";
import url from "./baseUrl";
import { ServiceModel } from "../model/ServiceModel";
import { OptionPageModel } from "../model/components/OptionPageModel";

const servicesUrl = `${url}/service`;

export const getServicesByType = (type: { serviceType?: string }, params?: OptionPageModel) =>
  axios.post(`${servicesUrl}/type`, type, { params });

export const createService = (service: ServiceModel) => axios.post(servicesUrl, service);

export const updateService = (service: ServiceModel) =>
  axios.put(servicesUrl, service);

export const deleteService = (service: ServiceModel) => axios.delete(`${servicesUrl}/${service.id}`);