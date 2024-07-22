import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/common/authSlice";
import { VendorAPI } from "./slices/admin/GetAllVendor";
import { BusinessCategory } from "./slices/admin/BusinessCategorySlice";
import { ProductCategory } from "./slices/admin/ProductCategorySlice";
import { ProductAPI } from "./slices/vendor/ProductUpload";
import { GetProductAPI } from "./slices/user/GetAllProduct";
import { GetProductByIdAPI } from "./slices/user/GetSingleProduct";
import { reviewsApi } from "./slices/user/ProductReview";
import { addressApi } from "./slices/user/addressSlice";
import dialogReducer from "./slices/common/dialogSlice";
import sortReducer from "./slices/user/productFilterSortSlice";
import cartReducer from "./slices/user/cartSlice";
import wishlistReducer from "./slices/user/wishlistSlice";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from './slices/vendor/vendorSlice';
import storage from "redux-persist/lib/storage";
import authDataReducer from "./slices/common/authSlice";
import productReducer from "./slices/vendor/manageProduct";
import { authApi } from "./slices/user/authSlice";
import signupReducer from './slices/user/userSignupSLice';

const applyMiddlewareConditionally = (middlewares) => {
  const isAuthEnabled = true;
  const isVendorApiEnabled = true;
  const isBusinessCategoryEnabled = true;
  const isProductCategoryEnabled = true;
  const isProductApiEnabled = true;
  const isGetProductApiEnabled = true;
  const isGetProductByIdApiEnabled = true;
  const isReviewsApiEnabled = true;
  const isAddressApiEnabled = true;
  const isAuthApiEnabled = true;

  if (isAuthEnabled) {
    middlewares.push(authSlice.middleware);
  }
  if (isVendorApiEnabled) {
    middlewares.push(VendorAPI.middleware);
  }
  if (isBusinessCategoryEnabled) {
    middlewares.push(BusinessCategory.middleware);
  }
  if (isProductCategoryEnabled) {
    middlewares.push(ProductCategory.middleware);
  }
  if (isProductApiEnabled) {
    middlewares.push(ProductAPI.middleware);
  }
  if (isGetProductApiEnabled) {
    middlewares.push(GetProductAPI.middleware);
  }
  if (isGetProductByIdApiEnabled) {
    middlewares.push(GetProductByIdAPI.middleware);
  }
  if (isReviewsApiEnabled) {
    middlewares.push(reviewsApi.middleware);
  }
  if (isAddressApiEnabled) {
    middlewares.push(addressApi.middleware);
  }
  if (isAuthApiEnabled) {
    middlewares.push(authApi.middleware)
  }

  return middlewares;
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishlist", "auth"],
  blacklist: ["_persist"],
};

const rootReducer = combineReducers({
  product: productReducer,
  dialog: dialogReducer,
  auth: persistReducer(persistConfig, authDataReducer),
  authData: authReducer,
  sort: sortReducer,
  cart: cartReducer,
  signup: signupReducer,
  wishlist: wishlistReducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [VendorAPI.reducerPath]: VendorAPI.reducer,
  [BusinessCategory.reducerPath]: BusinessCategory.reducer,
  [ProductCategory.reducerPath]: ProductCategory.reducer,
  [ProductAPI.reducerPath]: ProductAPI.reducer,
  [GetProductAPI.reducerPath]: GetProductAPI.reducer,
  [GetProductByIdAPI.reducerPath]: GetProductByIdAPI.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    applyMiddlewareConditionally(
      getDefaultMiddleware({
        serializableCheck: false,
      })
    ),
});

export const persistor = persistStore(store);
