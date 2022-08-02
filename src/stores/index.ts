import { configureStore } from "@reduxjs/toolkit";
import { rooReducer } from "./reducers";

export const configStore = () => {
  const store = configureStore({
    reducer: rooReducer
  });
  return store;
}