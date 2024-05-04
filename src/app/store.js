import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import favoriteSlice from "./features/favoriteSlice";
import networkSlice from "./features/networkSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import signupSlice from "./features/signupSlice";
import averageRatingSlice from "./features/averageRatingSlice";

const persistCartConfig = {
  key: ["cart", "favorite"],
  storage,
};

const persistedCart = persistReducer(persistCartConfig, cartSlice);
const persistedFavorite = persistReducer(persistCartConfig, favoriteSlice);

export const store = configureStore({
  reducer: {
    network: networkSlice,
    signup: signupSlice,
    login: loginSlice,
    averageRating: averageRatingSlice,
    cart: persistedCart,
    favorite: persistedFavorite,
  },
});

export const persistor = persistStore(store);
