import axios from "axios";
import { ExperienceModel } from "../model/ExperienceModel";
import url from "./baseUrl";

const experienceUrl = `${url}/experience`;

export const getExperience = () => axios.get(experienceUrl);

export const createExperience = (experience: ExperienceModel) =>
  axios.post(experienceUrl, experience);

export const updateExperience = (experience: ExperienceModel) =>
  axios.put(experienceUrl, experience);

export const deleteExperience = (experienceId: string) =>
  axios.delete(`${experienceUrl}/${experienceId}`);
