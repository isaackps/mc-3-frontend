import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../reducers/companyReducer";
import modalReducer from "../reducers/modalReducer";
import stockReducer from "../reducers/stockReducer";

export const store = configureStore({
  reducer: {
    companies: companyReducer,
    modal: modalReducer,
    stocks: stockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
