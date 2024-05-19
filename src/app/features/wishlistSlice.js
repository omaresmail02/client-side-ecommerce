import { createSlice } from "@reduxjs/toolkit";
import { addItemToWishlist } from "../../utils";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItem(state, action) {
      state.wishlist = addItemToWishlist(action.payload, state.wishlist);
    },
    deleteItem(state, action) {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },

    clearWishlist(state) {
      state.wishlist = [];
    },
  },
});

export const { addItem, deleteItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
