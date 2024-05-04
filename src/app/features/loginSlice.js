import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios.config";

import { createStandaloneToast } from "@chakra-ui/react";
import CookieServices from "../../services/CookieServices";

const { toast } = createStandaloneToast();

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const selectUserData = (state) => state.login.data;

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const { data } = await axiosInstance.post(`/api/auth/local`, user);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  initialState,
  name: "login",
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;

        const date = new Date();
        const EXPIRES_AT = 365 * 24 * 60 * 60 * 1000;
        date.setTime(date.getTime() + EXPIRES_AT);
        const options = { path: "/", expires: date };

        CookieServices.set("jwt", action.payload.jwt, options);

        toast({
          title: "Logged in successfully",
          status: "success",
          isClosable: true,
          position: "top",
        });
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload;
        console.log(action);

        toast({
          title: action.payload.response.data.error.message,
          status: "error",
          description: "Make sure you have the correct Email or Password",
          isClosable: true,
          position: "top",
        });
      });
  },
});

export const selectLogin = ({ login }) => login;
export default loginSlice.reducer;
