import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import authReducer from "./reducers/authReducer";
import categoryService from "./services/categoryService";
import productService from "./services/productService";
import globalReducer from "./reducers/globalReducer";
import homeProducts from "./services/HomeProducts";
import cartReducer from "./reducers/cartReducer";
import paymentService from "./services/paymentService";

const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProducts.reducerPath]: homeProducts.reducer,
    [paymentService.reducerPath]: paymentService.reducer,

    "authReducer": authReducer,
    "globalReducer": globalReducer,
    "cartReducer": cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      categoryService.middleware,
      productService.middleware,
      homeProducts.middleware,
      paymentService.middleware,
    ]),
});

export default store;
