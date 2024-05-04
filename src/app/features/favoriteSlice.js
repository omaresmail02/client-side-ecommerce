import { createSlice } from "@reduxjs/toolkit";
import { addItemToFavorite } from "../../utils";

const initialState = {
  favorite: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addItem(state, action) {
      state.favorite = addItemToFavorite(action.payload, state.favorite);
    },
    deleteItem(state, action) {
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload
      );
    },

    clearFavorite(state) {
      state.favorite = [];
    },
  },
});

export const { addItem, deleteItem, clearFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
