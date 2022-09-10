import { combineReducers } from "@reduxjs/toolkit";
import banners from "./banner/banners";
import login from "./login/login";

export const rooReducer = combineReducers({
  banners,
  login,
});