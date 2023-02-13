import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import companyReducer from "../reducers/companyReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    company: companyReducer,
  },
});
