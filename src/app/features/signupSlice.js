import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios.config";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const userSignup = createAsyncThunk(
  "signup/userSignup",
  async ({ email, password, username, role }, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const { data } = await axiosInstance.post(`/api/auth/local/register`, {
        email,
        password,
        username,
        role,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const signupSlice = createSlice({
  initialState,
  name: "signup",
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;

        toast({
          title: "Signup successfully",
          status: "success",
          isClosable: true,
          position: "top",
        });
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload;

        toast({
          title: action.payload.response.data.error.message,
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  },
});

export const selectSignup = ({ signup }) => signup;
export default signupSlice.reducer;
