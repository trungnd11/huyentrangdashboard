import axios from "axios";
import { PhoneModel } from "../model/PhoneModel";
import url from "./baseUrl";

const phoneUrl = `${url}/phone`;

export const getPhone = () => axios.get(phoneUrl);

export const createPhone = (phone: PhoneModel) => axios.post(phoneUrl, phone);

export const updatePhone = (phone: PhoneModel) => axios.put(phoneUrl, phone);

export const deletePhone = (phoneId: string) => axios.delete(`${phoneUrl}/${phoneId}`);

