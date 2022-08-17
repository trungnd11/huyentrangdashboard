import axios from "axios";
import { ExpertModel } from "../model/ExpertModel";
import url from "./baseUrl";

const expertUrl = `${url}/expert`;

export const getExperts = () => axios.get(expertUrl);

export const createExperts = (expert: ExpertModel) => axios.post(expertUrl, expert);

export const updateExperts = (expert: ExpertModel) => axios.put(expertUrl, expert);

export const deleteExperts = (expertId: string) => axios.delete(`${expertUrl}/${expertId}`);