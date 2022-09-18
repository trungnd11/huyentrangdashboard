import axios from "axios";
import { AboutModel } from "../model/AboutModel";
import url from "./baseUrl";

const aboutUrl = `${url}/about`;

export const getAbouts = () => axios.get(aboutUrl);

export const createAbout = (about: AboutModel) =>
  axios.post(aboutUrl, about);

export const updateAbout = (about: AboutModel) => axios.put(aboutUrl, about);

export const deleteAbout = (aboutId: string) => axios.delete(`${aboutUrl}/${aboutId}`);