import axios from "axios";
import { AddressModel } from "../model/AddressModel";
import url from "./baseUrl";

const addressUrl = `${url}/address`;

export const getAddress = () => axios.get(addressUrl);

export const createAddress = (address: AddressModel) => axios.post(addressUrl, address);

export const updateAddress = (address: AddressModel) => axios.put(addressUrl, address);

export const deleteAddress = (addressId: string) => axios.delete(`${addressUrl}/${addressId}`);


