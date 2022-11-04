import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import authReducer from "./reducers/authReducer";
import categoryService from "./services/categoryService";
import productService from "./services/productService";
import globalReducer from "./reducers/globalReducer";

const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    "authReducer": authReducer,
    "globalReducer": globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      categoryService.middleware,
      productService.middleware,
    ]),
});

export default store;
